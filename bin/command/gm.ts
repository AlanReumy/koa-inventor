import fs from 'fs'
import { createServiceTemplate } from '../util/createTemplate.js'

export function generateModule(moduleName: string) {
    // create service
    fs.writeFileSync(`service/${moduleName}.service.js`, createServiceTemplate(moduleName))
    // create controller
    fs.writeFileSync(`controller/${moduleName}.controller.js`, createServiceTemplate(moduleName))
}
