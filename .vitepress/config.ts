import { defineConfigWithTheme } from 'vitepress'
import type { VuetomThemeConfig } from 'vitepress-theme-vuetom'
import { mdPlugin } from './utils/plugins'
import nav from './config/nav'
import head from './config/head'
import sidebar from './config/sidebars'
import { languages } from './utils/lang'
import pkg from '../package.json'

// eslint-disable-next-line no-console
console.log(`DOC_ENV: ${process.env.DOC_ENV}`)

const locales = {
  '/zh-CN': {
    label: '简体中文',
    lang: 'zh-CN'
  },
  '/en-US': {
    label: 'English',
    lang: 'en-US'
  }
}

languages.forEach((lang) => {
  locales[`/${lang}`] = {
    label: lang,
    lang,
  }
})

export default defineConfigWithTheme<VuetomThemeConfig>({
  title: 'Vuetom',
  base: '/',
  head,
  themeConfig: {
    repo: pkg.repository,
    docsDir: 'docs',
    sidebar,
    nav,
    bgImg: '/imgs/homg-bg01.jpg',
    bgColor: '0,0,0',
    bgOpacity: 0.6,
    pageBgEnable: true,
    pageBgOpacity: 0.8,
    featuresColor: ['#06cdff30', 'rgba(223,7,107,.3)']
  },
  locales,
  markdown: {
    lineNumbers: false,
    config: (md) => mdPlugin(md)
  }
})