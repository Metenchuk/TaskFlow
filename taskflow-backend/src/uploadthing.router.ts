import { createUploadthing, type FileRouter } from 'uploadthing/express';

const f = createUploadthing();

export const uploadRouter = {
  chatAttachment: f({
    image: { maxFileSize: '16MB' },
    video: { maxFileSize: '32MB' },
    audio: { maxFileSize: '16MB' },
    blob: { maxFileSize: '16MB' },
  }).onUploadComplete(({ file }) => {
    console.log('✅ Uploaded to UploadThing:', file.url);
  }),
} satisfies FileRouter;

export type OurFileRouter = typeof uploadRouter;