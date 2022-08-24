import { middlewareConfig } from "../config/middleware.js"

export type Config = {
    projectName: string
    rootPath: string
    middleware: MiddleWare
    port: number
    packageManager: string
}

export type MiddleWare = ReturnType<typeof middlewareConfig>['choices']
