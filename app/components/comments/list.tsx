import type { Comment } from '@prisma/client'
import { MinusIcon, PlusIcon } from '@radix-ui/react-icons'

import { CommentType } from '~/models/comment'

type CommentListProps = {
  comments: Comment[]
  type: CommentType
}

export const CommentList: React.FC<CommentListProps> = ({ comments, type }) => {
  return (
    <ul>
      {comments.map((comment) => (
        <li className="flex gap-4" key={comment.id}>
          <div
            className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full ${
              type === CommentType.POSITIVE ? 'bg-green-200' : 'bg-red-200'
            }`}
          >
            {type === CommentType.POSITIVE ? (
              <PlusIcon className="text-green-600" />
            ) : (
              <MinusIcon className="text-red-600" />
            )}
          </div>

          <span>{comment.content}</span>
        </li>
      ))}
    </ul>
  )
}
