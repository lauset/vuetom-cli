import { changeLang } from '../utils/lang'
import sidebarLocale from '../i18n/pages/sidebar.json'

function getGuideSidebar() {
  return Object.fromEntries(
    Object.entries(sidebarLocale).map(([lang, val]) => [
      lang,
      Object.values(val).map((item) => mapPrefix(item, lang, item.link))
    ])
  )
}

const getSidebars = () => ({
  '/': getGuideSidebar()
})

type Item = {
  text: string
  children?: Item[]
  link?: string
}

function mapPrefix(item: Item, lang: string, prefix = '') {
  if (item.children && item.children.length > 0) {
    return {
      ...item,
      link: `${changeLang(lang)}${item.link}/`,
      children: item.children.map((child) => mapPrefix(child, lang, prefix))
    }
  }

  return {
    ...item,
    link: `${changeLang(lang)}${prefix}${item.link}`
  }
}

const sidebar = getSidebars()

export default sidebar
