import type { CommentType } from '~/models/comment'

export type CommentDTO = {
  id?: number
  type: CommentType
  content: string
}
