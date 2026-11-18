<script setup>
import { fund, helpWays } from '../data/site'
</script>

<template>
  <main>
    <header class="page-hero wrap">
      <h1>Есть очень много разных способов помочь.</h1>
      <p class="lede">Пожертвование — только один из них. Выберите удобный формат.</p>
    </header>
    <section class="section">
      <div class="wrap way-grid">
        <article v-for="way in helpWays" :key="way.title" class="way">
          <h3>{{ way.title }}</h3>
          <p>{{ way.text }}</p>
          <RouterLink class="text-link" :to="way.to">Подробнее</RouterLink>
        </article>
        <article class="way">
          <h3>SMS и онлайн-форма</h3>
          <p>
            На действующем сайте уже стоит виджет donation.ru. Онлайн-оплата идёт через кабинеты фонда,
            а не через этот макет.
          </p>
          <a class="text-link" href="https://cfek.ru/howtohelp/" target="_blank" rel="noreferrer">Открыть форму на cfek.ru</a>
        </article>
        <article class="way">
          <h3>Передать вещи</h3>
          <p>Игрушки, одежда и канцелярия для подопечных. Созвонитесь перед передачей.</p>
          <p>
            <a :href="fund.pressPhoneHref">{{ fund.pressPhone }}</a><br />
            <a :href="`mailto:${fund.email}`">{{ fund.email }}</a>
          </p>
        </article>
      </div>
    </section>
  </main>
</template>
