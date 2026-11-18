<script setup>
import { team } from '../data/site'
</script>

<template>
  <main>
    <header class="page-hero wrap">
      <h1>Команда</h1>
      <p class="lede">Пять человек из раздела «Команда» на сайте фонда.</p>
    </header>
    <section class="section">
      <div class="wrap team-grid">
        <article v-for="person in team" :key="person.name" class="person">
          <img :src="person.image" :alt="person.name" />
          <strong>{{ person.name }}</strong>
          <span>{{ person.role }}</span>
        </article>
      </div>
    </section>
  </main>
</template>
