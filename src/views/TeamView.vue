<script setup>
import { team } from '../data/site'
</script>

<template>
  <main>
    <header class="page-hero wrap">
      <h1>Команда</h1>
      <p class="lede">Люди, которых фонд указал на главной странице. У Виктора Андронова на странице «О нас» есть отдельная строка: двигатель фонда, добрый и отважный человек.</p>
    </header>
    <section class="section">
      <div class="wrap team-grid">
        <article v-for="person in team" :key="person.name" class="person">
          <strong>{{ person.name }}</strong>
          <span>{{ person.role }}</span>
        </article>
      </div>
    </section>
  </main>
</template>
