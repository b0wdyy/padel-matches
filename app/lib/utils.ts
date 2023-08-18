import { PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

import { s3Client } from '~/s3.server'

export const createPresignedUrlWithClient = ({
  bucket,
  key,
}: {
  bucket: string
  key: string
}) => {
  const command = new PutObjectCommand({ Bucket: bucket, Key: key })
  return getSignedUrl(s3Client, command, { expiresIn: 60 })
}

export const uploadFile = async ({
  file,
  presignedUrl,
}: {
  file: File
  presignedUrl: string
}) => {
  const response = await fetch(presignedUrl, {
    method: 'PUT',
    body: file,
  })

  if (response.ok) {
    return presignedUrl.split('?')[0]
  } else {
    throw new Error('Something went wrong uploading the file')
  }
}
