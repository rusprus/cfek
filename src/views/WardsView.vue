<script setup>
import { computed, ref } from 'vue'
import { wards } from '../data/site'

const filter = ref('all')
const filters = [
  { id: 'all', label: 'Все' },
  { id: 'child', label: 'Дети' },
  { id: 'adult', label: 'Взрослые' },
  { id: 'urgent', label: 'Срочный сбор' },
  { id: 'long', label: 'Долгосрочная помощь' },
]

const visible = computed(() => {
  if (filter.value === 'all' || filter.value === 'child' || filter.value === 'long') return wards
  return []
})
</script>

<template>
  <main>
    <header class="page-hero wrap">
      <h1>Подопечные</h1>
      <p class="lede">
        Девять детей из раздела «Подопечные» на cfek.ru. На тех страницах есть имя и фотография.
        Диагнозы и суммы отдельных сборов фонд там не публикует, поэтому прогресс сбора здесь не рисуется.
      </p>
    </header>
    <section class="section">
      <div class="wrap">
        <div class="toggle">
          <button v-for="item in filters" :key="item.id" type="button" :class="{ on: filter === item.id }" @click="filter = item.id">
            {{ item.label }}
          </button>
        </div>
        <p v-if="!visible.length" class="lede">
          Таких карточек на сайте фонда нет. Помощь можно направить на программу целиком.
        </p>
        <div v-else class="card-grid" style="margin-top: 18px">
          <article v-for="item in visible" :key="item.slug" class="card">
            <img :src="item.image" :alt="item.name" />
            <div class="card-body">
              <h3>{{ item.name }}</h3>
              <p>Ребёнок, подопечный фонда. Долгосрочная помощь программам, а не отдельный сбор с указанной суммой.</p>
              <a class="text-link" :href="item.source" target="_blank" rel="noreferrer">Страница на cfek.ru</a>
              <RouterLink class="btn" to="/donate?goal=oncology" style="margin-top: 14px">Помочь</RouterLink>
            </div>
          </article>
        </div>
      </div>
    </section>
  </main>
</template>
