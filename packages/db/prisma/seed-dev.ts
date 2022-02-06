import { PrismaClient, TeamRoles } from '@prisma/client';
import task from 'tasuku';

const prisma = new PrismaClient();

async function main() {
  await task('Seed development database', async ({ task }) => {
    const { result: user } = await task('Create initial user', async () => {
      return prisma.user.create({
        data: {
          email: 'asd@asd.com',
          firstName: 'Michael',
          lastName: 'Jordan',
          confirmedAt: new Date(),
        },
      });
    });

    const { result: membership } = await task('Add user to personal team', async () => {
      return prisma.teamMembership.create({
        data: {
          user: {
            connect: { id: user.id },
          },
          role: TeamRoles.Admin,
          team: {
            create: {
              name: 'Personal',
            },
          },
        },
        include: {
          team: true,
        },
      });
    });

    await task('Create initial team project', async () => {
      return prisma.project.create({
        data: {
          name: 'Some Project Name',
          team: {
            connect: { id: membership.teamId },
          },
        },
      });
    });
  });
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
