<script setup>
import { fund, press } from '../data/site'
</script>

<template>
  <main>
    <header class="page-hero wrap">
      <h1>СМИ о нас</h1>
      <p class="lede">
        Материалы, которые фонд собрал на своей странице. Для новой публикации пишите {{ fund.pressName }}:
        <a :href="fund.pressPhoneHref">{{ fund.pressPhone }}</a>, {{ fund.pressEmail }}.
      </p>
    </header>
    <section class="section">
      <div class="wrap doc-list">
        <a v-for="item in press" :key="item.href" class="doc" :href="item.href" target="_blank" rel="noreferrer">
          <h3>{{ item.title }}</h3>
        </a>
      </div>
    </section>
  </main>
</template>
