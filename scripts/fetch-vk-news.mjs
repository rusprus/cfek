import { mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises'

const groupId = 212065019
const source = `https://vk.com/widget_community.php?gid=${groupId}&mode=4&width=600`
const target = new URL('../public/vk-news.json', import.meta.url)
const imageDir = new URL('../public/media/vk/', import.meta.url)

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

function dateOnly(value) {
  return value.replace(/\s+в\s+\d{1,2}:\d{2}\s*$/, '').trim()
}

function area(url) {
  const size = url.match(/(?:size|cs)=(\d+)x(\d+)/)
  if (!size) return url.includes('/s/v1/ig2/') ? 900000 : 0
  const width = Number(size[1])
  const height = Number(size[2]) || width
  return width * height
}

function larger(url) {
  const listed = url.match(/[?&]as=([0-9x,]+)/)
  if (!listed) return url
  const width = listed[1]
    .split(',')
    .map((item) => Number(item.split('x')[0]))
    .filter((item) => item > 0 && item <= 1280)
    .sort((a, b) => b - a)[0]
  if (!width) return url
  if (/[?&]cs=\d+x\d+/.test(url)) return url.replace(/cs=\d+x\d+/, `cs=${width}x0`)
  return `${url}${url.includes('?') ? '&' : '?'}cs=${width}x0`
}

function imageFrom(chunk) {
  const urls = [...chunk.matchAll(/https:\/\/sun[^"'()\s]+/g)]
    .map((match) => decodeEntities(match[0]))
    .filter((url) => !url.includes('type=audio') && !url.includes('/emoji/'))
    .map(larger)
  return urls.sort((a, b) => area(b) - area(a))[0] || ''
}

async function saveImage(id, url) {
  if (!url) return ''
  const response = await fetch(url, { headers: { 'User-Agent': 'cfek-site' } })
  if (!response.ok) return ''
  const bytes = Buffer.from(await response.arrayBuffer())
  if (bytes.length < 2000) return ''
  const file = `${id}.jpg`
  await mkdir(imageDir, { recursive: true })
  await writeFile(new URL(file, imageDir), bytes)
  return `media/vk/${file}`
}

async function postsFrom(html) {
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
    const image = await saveImage(id, imageFrom(chunk))
    posts.push({
      id,
      date: dateOnly(decodeEntities(link[2])),
      title: titleFrom(text),
      text,
      url: path,
      ...(image ? { image } : {}),
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
  const posts = (await postsFrom(html)).slice(0, 12)
  if (!posts.length) throw new Error('VK widget had no posts')
  await writeFile(target, JSON.stringify({ fetchedAt: new Date().toISOString(), posts }, null, 2))
  const keep = new Set(posts.map((post) => `${post.id}.jpg`))
  const stored = await readdir(imageDir).catch(() => [])
  await Promise.all(stored.filter((name) => !keep.has(name)).map((name) => rm(new URL(name, imageDir))))
  console.log(`Saved ${posts.length} VK posts`)
} catch (error) {
  console.warn(`VK news were not refreshed: ${error.message}`)
  if (!saved.posts?.length) process.exitCode = 0
}
