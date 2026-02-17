const { cpSync, readFileSync } = require('node:fs')
const { resolve } = require('node:path')

const cwd = process.cwd()

const hooks = resolve(cwd, '.git', 'hooks', 'pre-push')
const content = readFileSync(hooks)
console.log(content.toString('utf-8'))