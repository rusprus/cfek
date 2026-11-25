<script setup>
import { onMounted, ref } from 'vue'
import { fund, news } from '../data/site'
import { loadVkPosts, newsDate, newsImage } from '../vk'

const posts = ref([])

onMounted(async () => {
  posts.value = await loadVkPosts()
})
</script>

<template>
  <main>
    <header class="page-hero wrap">
      <h1>Новости</h1>
      <p class="lede">
        Записи подгружаются со стены
        <a class="text-link" :href="fund.vk" target="_blank" rel="noreferrer">vk.com/cfekru</a>.
        Сайт забирает их заново каждые шесть часов.
      </p>
    </header>
    <section class="section">
      <div v-if="posts.length" class="wrap news-cards">
        <a v-for="item in posts" :key="item.id" class="news-card" :href="item.url" target="_blank" rel="noreferrer">
          <span v-if="newsImage(item)" class="news-photo">
            <img :src="newsImage(item)" :alt="item.title" />
          </span>
          <div class="card-body">
            <p class="muted">{{ newsDate(item.date) }}</p>
            <h3>{{ item.title }}</h3>
          </div>
        </a>
      </div>
      <div v-else class="wrap card-grid">
        <article v-for="item in news" :key="item.slug" class="card">
          <RouterLink :to="`/news/${item.slug}`">
            <img :src="item.image" :alt="item.title" />
            <div class="card-body">
              <p class="muted">{{ item.date }}</p>
              <h3>{{ item.title }}</h3>
            </div>
          </RouterLink>
        </article>
      </div>
    </section>
  </main>
</template>
