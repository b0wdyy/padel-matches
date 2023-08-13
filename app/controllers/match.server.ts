import { prisma } from '~/db.server'
import type { CreateMatchDTO } from '~/types/match.dto'

export async function getMatches(id: number) {
  const match = await prisma.match.findMany({
    where: {
      id,
    },
    include: {
      comments: true,
      players: true,
    },
  })

  return match
}

export async function getMatch(id: number) {
  const match = await prisma.match.findUnique({
    where: {
      id,
    },
    include: {
      comments: true,
      players: {
        select: {
          player: true,
        },
      },
    },
  })

  return match
}

export async function createMatch(data: CreateMatchDTO) {
  const match = await prisma.match.create({
    data: {
      title: data.title,
      comments: {
        create: data.comments,
      },
      players: {
        connectOrCreate: data.players.map((player) => ({
          where: {
            id: player.id,
          },
          create: {
            player: {
              create: {
                ...player,
              },
            },
          },
        })),
      },
    },
  })

  return match
}
