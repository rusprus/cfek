<script setup>
import { team } from '../data/site'
</script>

<template>
  <main>
    <header class="page-hero wrap">
      <h1>Команда</h1>
      <p class="lede">Люди, которые указаны в разделе «Команда» на сайте фонда.</p>
    </header>
    <section class="section">
      <div class="wrap team-grid">
        <article v-for="person in team" :key="person.name" class="person">
          <div class="portrait">
            <img v-if="person.image" :src="person.image" :alt="person.name" :style="{ objectPosition: person.focus || 'center 18%' }" />
            <div v-else class="avatar">{{ person.name.split(' ').slice(0, 2).map((part) => part[0]).join('') }}</div>
          </div>
          <strong>{{ person.name }}</strong>
          <span>{{ person.role }}</span>
        </article>
      </div>
    </section>
  </main>
</template>
