<script setup>
import { openMenu } from '../menu'
</script>

<template>
  <header class="site-header">
    <RouterLink class="brand-lockup" to="/">
      <img src="/media/logo.png" alt="Энергия Доброты" />
      <span>
        <b>Энергия Доброты</b>
        <small>благотворительный фонд</small>
      </span>
    </RouterLink>
    <button class="icon-btn menu-btn" type="button" @click="openMenu">
      <span class="burger" aria-hidden="true"><span></span><span></span><span></span></span>
      Меню
    </button>
    <RouterLink class="help-link" to="/donate"><span class="heart" aria-hidden="true">♡</span> Помочь</RouterLink>
  </header>
</template>
