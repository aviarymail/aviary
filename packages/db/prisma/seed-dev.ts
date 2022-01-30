import { PrismaClient, TeamRoles, User } from '@prisma/client';
import task from 'tasuku';

const prisma = new PrismaClient();

async function main() {
  let user: User;

  await task('Seed development database', async ({ task }) => {
    await task('Create initial user with a personal team', async () => {
      user = await prisma.user.create({
        data: {
          email: 'asd@asd.com',
          firstName: 'Michael',
          lastName: 'Jordan',
          confirmedAt: new Date(),
          teamMemberships: {
            create: {
              role: TeamRoles.ADMIN,
              team: {
                create: {
                  name: 'Personal',
                },
              },
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
