<script setup>
import { asset, fund } from '../data/site'
import { openMenu } from '../menu'

const links = [
  { to: '/about', label: 'О фонде' },
  { to: '/organizations', label: 'Организациям' },
  { to: '/projects', label: 'Проекты' },
  { to: '/news', label: 'Новости' },
]
</script>

<template>
  <header class="site-header">
    <RouterLink class="brand-lockup" to="/">
      <img :src="asset('media/logo.png')" alt="Энергия Доброты" />
      <span>
        <b>Энергия Доброты</b>
        <small>благотворительный фонд</small>
      </span>
    </RouterLink>
    <nav class="main-nav" aria-label="Разделы">
      <RouterLink v-for="item in links" :key="item.to" :to="item.to">{{ item.label }}</RouterLink>
    </nav>
    <div class="socials">
      <a :href="fund.vk" target="_blank" rel="noreferrer" aria-label="ВКонтакте">VK</a>
      <a :href="fund.telegram" target="_blank" rel="noreferrer" aria-label="Telegram">TG</a>
    </div>
    <RouterLink class="btn donate-btn" to="/donate">Поддержать фонд</RouterLink>
    <button class="menu-btn" type="button" aria-label="Меню" @click="openMenu"><span></span></button>
  </header>
</template>
