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
