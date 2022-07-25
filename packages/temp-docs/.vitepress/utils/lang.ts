import fs from 'fs'
import path from 'path'

export const languages = fs.readdirSync(
  path.resolve(__dirname, '../crowdin')
)

export const changeLang = (lang: string) => `/${lang}`
