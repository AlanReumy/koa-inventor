import fs from 'fs'
import { createServiceTemplate } from '../util/createTemplate.js'

export function generateModule(moduleName: string) {
    // 创建service
    fs.writeFileSync(`service/${moduleName}.service.js`, createServiceTemplate(moduleName))
}
