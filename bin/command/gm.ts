import fs from 'fs'
import { createControllerTemplate, createRouterTemplate, createServiceTemplate } from '../util/createTemplate.js'

export function generateModule(moduleName: string) {
    // create service
    fs.writeFileSync(`service/${moduleName}.service.js`, createServiceTemplate(moduleName))
    // create controller
    fs.writeFileSync(`controller/${moduleName}.controller.js`, createControllerTemplate(moduleName))
    // create router
    fs.writeFileSync(`router/${moduleName}.router.js`, createRouterTemplate(moduleName))
}
