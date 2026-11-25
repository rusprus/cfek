import { readFile, writeFile } from 'node:fs/promises'

const groupId = 212065019
const source = `https://vk.com/widget_community.php?gid=${groupId}&mode=4`
const target = new URL('../public/vk-news.json', import.meta.url)

function decode(text) {
  return text
    .replace(/<button[\s\S]*?<\/button>/gi, '')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<img[^>]*alt="([^"]*)"[^>]*>/gi, (_, alt) => decodeEntities(alt))
    .replace(/<[^>]+>/g, '')
    .replace(/\u00a0/g, ' ')
}

function decodeEntities(text) {
  return text
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
}

function plain(html) {
  return decodeEntities(decode(html)).replace(/[ \t]+\n/g, '\n').replace(/\n{3,}/g, '\n\n').trim()
}

function titleFrom(text) {
  const line = text.split('\n').map((item) => item.trim()).find(Boolean) || 'Запись сообщества'
  return line.length > 140 ? `${line.slice(0, 137)}…` : line
}

function postsFrom(html) {
  const chunks = html.split('<div class="wcommunity_post">').slice(1)
  const posts = []
  for (const chunk of chunks) {
    const link = chunk.match(/class="wcommunity_post_date" href="([^"]+)"[^>]*>([^<]+)/)
    const body = chunk.match(/class="wall_post_text"[^>]*>([\s\S]*?)<\/div>/)
    if (!link || !body) continue
    const text = plain(body[1])
    if (!text) continue
    const path = link[1].startsWith('http') ? link[1] : `https://vk.com${link[1]}`
    const id = (path.match(/_(\d+)/) || [])[1] || path
    posts.push({
      id,
      date: decodeEntities(link[2]).trim(),
      title: titleFrom(text),
      text,
      url: path,
    })
  }
  return posts
}

async function previous() {
  try {
    return JSON.parse(await readFile(target, 'utf8'))
  } catch {
    return { fetchedAt: null, posts: [] }
  }
}

const saved = await previous()
try {
  const response = await fetch(source, {
    headers: { 'User-Agent': 'cfek-site', 'Accept-Language': 'ru' },
  })
  if (!response.ok) throw new Error(`VK answered ${response.status}`)
  const html = new TextDecoder('windows-1251').decode(await response.arrayBuffer())
  const posts = postsFrom(html).slice(0, 12)
  if (!posts.length) throw new Error('VK widget had no posts')
  await writeFile(target, JSON.stringify({ fetchedAt: new Date().toISOString(), posts }, null, 2))
  console.log(`Saved ${posts.length} VK posts`)
} catch (error) {
  console.warn(`VK news were not refreshed: ${error.message}`)
  if (!saved.posts?.length) process.exitCode = 0
}
