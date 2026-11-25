import { asset } from './data/site'

export function newsDate(value) {
  return String(value || '').replace(/\s+в\s+\d{1,2}:\d{2}\s*$/, '')
}

export function newsImage(item) {
  if (!item?.image) return ''
  return item.image.startsWith('media/') ? asset(item.image) : item.image
}

export async function loadVkPosts() {
  try {
    const response = await fetch(`${import.meta.env.BASE_URL}vk-news.json`, { cache: 'no-cache' })
    if (!response.ok) return []
    const data = await response.json()
    return Array.isArray(data.posts) ? data.posts : []
  } catch {
    return []
  }
}
