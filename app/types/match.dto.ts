import type { Location } from '@prisma/client'

import type { CommentDTO } from '~/types/comment.dto'
import type { PlayerDTO } from '~/types/player.dto'

export type CreateMatchDTO = {
  title: string
  comments: CommentDTO[]
  players: PlayerDTO[]
  location: Location
}
