import { db, Prisma } from '@aviarymail/db';

export async function createProject(params: {
  userId: string;
  teamId: string;
  name: string;
  query?: Partial<Prisma.ProjectCreateArgs>;
}) {
  const teamMembership = await db.teamMembership.findUnique({
    where: {
      userId_teamId: {
        userId: params.userId!,
        teamId: params.teamId,
      },
    },
  });

  if (!teamMembership) {
    return { error: 'teamMembership/NOT_FOUND' } as const;
  }

  const project = await db.project.create({
    ...params.query,
    data: {
      name: params.name,
      team: {
        connect: { id: params.teamId },
      },
    },
  });

  return { project };
}
