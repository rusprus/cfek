<script setup>
import { fund } from '../data/site'

const links = [
  { to: '/about', label: 'О фонде' },
  { to: '/organizations', label: 'Организациям' },
  { to: '/projects', label: 'Проекты' },
  { to: '/volunteers', label: 'Волонтёрам' },
  { to: '/news', label: 'Новости' },
  { to: '/reports', label: 'Отчёты' },
  { to: '/documents', label: 'Документы' },
  { to: '/contacts', label: 'Контакты' },
]
</script>

<template>
  <footer class="footer">
    <div class="wrap">
      <div class="footer-row">
        <strong>{{ fund.legalName }}</strong>
        <nav>
          <RouterLink v-for="item in links" :key="item.to" :to="item.to">{{ item.label }}</RouterLink>
        </nav>
      </div>
      <p class="fine">© {{ new Date().getFullYear() }} БФ «Энергия Доброты». ИНН {{ fund.inn }}. 12+</p>
    </div>
    <div class="credit">Санкт-Петербург · {{ fund.hours }}</div>
  </footer>
</template>
