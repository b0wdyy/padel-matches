import { Box, List, ThemeIcon } from '@mantine/core'
import type { Comment } from '@prisma/client'
import { MinusIcon, PlusIcon } from '@radix-ui/react-icons'

import { CommentType } from '~/models/comment'

type CommentListProps = {
  comments: Comment[]
  type: CommentType
}

export const CommentList: React.FC<CommentListProps> = ({ comments, type }) => {
  return (
    <List>
      {comments.map((comment) => (
        <List.Item
          icon={
            comment.type === CommentType.POSITIVE ? (
              <ThemeIcon color="teal" size={24} radius="xl">
                <PlusIcon />
              </ThemeIcon>
            ) : (
              <ThemeIcon color="red" size={24} radius="xl">
                <MinusIcon />
              </ThemeIcon>
            )
          }
          className="flex gap-4"
          key={comment.id}
        >
          <Box component="span">{comment.content}</Box>
        </List.Item>
      ))}
    </List>
  )
}
