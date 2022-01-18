import { PrismaClient, Team, TeamRoles, User } from '@prisma/client';
import task from 'tasuku';

const prisma = new PrismaClient();

async function main() {
  let user: User;

  await task('Seed development database', async ({ task }) => {
    await task('Create initial user', async () => {
      user = await prisma.user.create({
        data: {
          email: 'asd@asd.com',
          firstName: 'Michael',
          lastName: 'Jordan',
          confirmedAt: new Date(),
        },
      });
    });

    await task("Create user's initial team", async () => {
      await prisma.team.create({
        data: {
          name: 'Personal',
          memberships: {
            create: {
              userId: user.id,
              role: TeamRoles.ADMIN,
            },
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
