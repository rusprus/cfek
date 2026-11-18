<script setup>
import { reports } from '../data/site'

const periods2024 = [
  'Годовой отчёт',
  'Январь и февраль',
  'Март и апрель',
  'Май и июнь',
  'Июль и август',
  'Сентябрь и октябрь',
  'Ноябрь и декабрь',
]
const periods2023 = ['Годовой отчёт', 'Сентябрь', 'Ноябрь и декабрь']
</script>

<template>
  <main>
    <header class="page-hero wrap">
      <h1>Отчёты об использовании средств.</h1>
      <p class="lede">
        На действующем сайте за 2024 и 2023 годы выложены иллюстрированные отчёты по периодам.
        PDF ниже — те файлы, на которые ведут ссылки «Скачать».
      </p>
    </header>
    <section class="section">
      <div class="wrap split">
        <div class="paper">
          <h2>2024</h2>
          <p v-for="item in periods2024" :key="item">{{ item }}</p>
          <p style="margin-top: 12px">
            <a class="text-link" href="https://cfek.ru/reports/" target="_blank" rel="noreferrer">Смотреть развороты на cfek.ru</a>
          </p>
        </div>
        <div class="paper">
          <h2>2023, короткие периоды</h2>
          <p v-for="item in periods2023" :key="item">{{ item }}</p>
        </div>
      </div>
      <div class="wrap doc-list" style="margin-top: 18px">
        <a v-for="item in reports" :key="item.href" class="doc" :href="item.href" target="_blank" rel="noreferrer">
          <span class="muted">{{ item.year }}</span>
          <h3>{{ item.title }}</h3>
        </a>
      </div>
    </section>
  </main>
</template>
