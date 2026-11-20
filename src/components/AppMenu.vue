<script setup>
import { ui, closeMenu } from '../menu'

const links = [
  { to: '/about', label: 'О фонде' },
  { to: '/projects', label: 'Проекты' },
  { to: '/help', label: 'Как помочь' },
  { to: '/donate', label: 'Поддержать фонд' },
  { to: '/volunteers', label: 'Волонтёрам' },
  { to: '/need-help', label: 'Нужна помощь' },
  { to: '/news', label: 'Новости' },
  { to: '/team', label: 'Команда' },
  { to: '/reports', label: 'Отчёты' },
  { to: '/documents', label: 'Документы' },
  { to: '/press', label: 'СМИ о нас' },
  { to: '/contacts', label: 'Контакты' },
]
</script>

<template>
  <div v-if="ui.menuOpen" class="menu-layer">
    <header>
      <strong>Энергия Доброты</strong>
      <button type="button" @click="closeMenu">Закрыть</button>
    </header>
    <nav class="menu-grid">
      <RouterLink v-for="item in links" :key="item.to" :to="item.to" @click="closeMenu">
        {{ item.label }}
      </RouterLink>
    </nav>
  </div>
</template>
