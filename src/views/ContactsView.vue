<script setup>
import { fund } from '../data/site'
</script>

<template>
  <main>
    <header class="page-hero wrap">
      <h1>Контакты</h1>
      <p class="lede">Фонд работает {{ fund.hours }}.</p>
    </header>
    <section class="section">
      <div class="wrap way-grid">
        <article class="way">
          <h3>Офис</h3>
          <p>{{ fund.address }}</p>
          <p><a :href="fund.phoneHref">{{ fund.phone }}</a></p>
          <p><a :href="`mailto:${fund.email}`">{{ fund.email }}</a></p>
        </article>
        <article class="way">
          <h3>По задачам</h3>
          <p>Нужна помощь — страница с алгоритмом заявки.</p>
          <p>Технические сбои сайта — {{ fund.techEmail }}.</p>
          <p>Пресса — {{ fund.pressName }}, <a :href="fund.pressPhoneHref">{{ fund.pressPhone }}</a>, {{ fund.pressEmail }}.</p>
          <p>
            <a class="text-link" :href="fund.vk" target="_blank" rel="noreferrer">ВКонтакте</a>
            ·
            <a class="text-link" :href="fund.telegram" target="_blank" rel="noreferrer">Telegram</a>
          </p>
        </article>
      </div>
    </section>
  </main>
</template>
