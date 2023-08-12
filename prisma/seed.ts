import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { CommentType } from "../app/models/comment";

const prisma = new PrismaClient();

function createComment() {
  return {
    content: faker.lorem.paragraph(),
    type: faker.helpers.arrayElement<CommentType>([
      CommentType.POSITIVE,
      CommentType.NEGATIVE,
    ]),
  };
}

function createPlayer() {
  return {
    name: `${faker.person.firstName()} ${faker.person.lastName()}`,
    level: +faker.number.float({ min: 0, max: 10 }).toFixed(2),
  };
}

async function createPlayers() {
  await Promise.all(
    Array(4)
      .fill(null)
      .map(async () => {
        await prisma.player.create({
          data: createPlayer(),
        });
      }),
  );
}

async function createMatches() {
  const players = await prisma.player.findMany();

  await Promise.all(
    Array(3)
      .fill(null)
      .map(async () => {
        await prisma.match.create({
          data: {
            players: {
              create: players.map((player) => ({
                playerId: player.id,
              })),
            },
            comments: {
              create: [createComment(), createComment(), createComment()],
            },
          },
        });
      }),
  );
}

async function seed() {
  console.log("-------------- SEEDING 🌱 --------------");

  await createPlayers();
  await createMatches();

  console.log("-------------- DONE ✅ --------------");
}

seed().catch((e) => {
  console.error(e);
  prisma.$disconnect();
  process.exit(1);
});
