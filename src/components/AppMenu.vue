<script setup>
import { ui, closeMenu } from '../menu'

const main = [
  { to: '/about', label: 'Кто мы' },
  { to: '/projects', label: 'Что мы делаем' },
  { to: '/help', label: 'Помочь фонду' },
  { to: '/need-help', label: 'Получить помощь' },
  { to: '/news', label: 'Новости' },
  { to: '/contacts', label: 'Контакты' },
]
const side = [
  { to: '/reports', label: 'Отчёты' },
  { to: '/documents', label: 'Документы' },
  { to: '/team', label: 'Команда' },
  { to: '/volunteers', label: 'Волонтёрам' },
  { to: '/press', label: 'СМИ о нас' },
]
</script>

<template>
  <div v-if="ui.menuOpen" class="menu-layer">
    <header>
      <RouterLink to="/" @click="closeMenu">Энергия Доброты</RouterLink>
      <button type="button" @click="closeMenu">Закрыть</button>
    </header>
    <div class="menu-grid">
      <nav>
        <RouterLink v-for="item in main" :key="item.to" :to="item.to" @click="closeMenu">
          {{ item.label }}
        </RouterLink>
      </nav>
      <nav class="menu-side">
        <RouterLink v-for="item in side" :key="item.to" :to="item.to" @click="closeMenu">
          {{ item.label }}
        </RouterLink>
      </nav>
    </div>
  </div>
</template>
