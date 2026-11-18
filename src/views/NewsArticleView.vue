<script setup>
import { computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { news } from '../data/site'

const route = useRoute()
const router = useRouter()
const article = computed(() => news.find((item) => item.slug === route.params.slug))
watch(article, (value) => {
  if (!value) router.replace('/news')
})
</script>

<template>
  <main v-if="article">
    <header class="page-hero wrap">
      <p class="muted">{{ article.date }}</p>
      <h1>{{ article.title }}</h1>
    </header>
    <section class="section">
      <div class="wrap split">
        <div class="prose">
          <p v-for="(paragraph, index) in article.paragraphs" :key="index">{{ paragraph }}</p>
          <p>
            <a class="text-link" :href="article.source" target="_blank" rel="noreferrer">Запись на действующем сайте</a>
          </p>
        </div>
        <div class="figure">
          <img :src="article.image" :alt="article.title" />
        </div>
      </div>
    </section>
  </main>
</template>
