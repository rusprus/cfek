<script setup>
import { fund, news } from '../data/site'
</script>

<template>
  <main>
    <header class="page-hero wrap">
      <h1>Новости</h1>
      <p class="lede">
        Записи, которые уже опубликованы на сайте. Стена сообщества остаётся во
        <a class="text-link" :href="fund.vk" target="_blank" rel="noreferrer">ВКонтакте</a>
        и в
        <a class="text-link" :href="fund.telegram" target="_blank" rel="noreferrer">Telegram</a>.
        Автопостинг в админку сюда ещё не подключён: это витрина на Vue.
      </p>
    </header>
    <section class="section">
      <div class="wrap card-grid">
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
