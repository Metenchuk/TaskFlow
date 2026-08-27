import 'dotenv/config'
import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { NestExpressApplication } from '@nestjs/platform-express'
import { createRouteHandler } from 'uploadthing/express'
import { uploadRouter } from './uploadthing.router'

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule, { rawBody: true })

    app.enableCors({
        origin: ['https://task-flow-bay-nu.vercel.app', 'https://task-flow-git-main-fanfotballon-6003s-projects.vercel.app', 'http://localhost:5173'],
        credentials: true,
    })

    app.use(
        '/api/uploadthing',
        createRouteHandler({
            router: uploadRouter,
            config: {
                token: process.env.UPLOADTHING_TOKEN,
            },
        }),
    )

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            transform: true,
        }),
    )

    await app.listen(process.env.PORT || 3001)
}
bootstrap()
