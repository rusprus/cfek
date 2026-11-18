<script setup>
import { projects } from '../data/site'
</script>

<template>
  <main>
    <header class="page-hero wrap">
      <h1>Что делает фонд</h1>
      <p class="lede">Шесть направлений, которые уже опубликованы на cfek.ru: от флешмобов до помощи в больнице.</p>
    </header>
    <section class="section">
      <div class="wrap card-grid">
        <article v-for="project in projects" :key="project.slug" class="card">
          <RouterLink :to="`/projects/${project.slug}`">
            <img :src="project.image" :alt="project.title" />
            <div class="card-body">
              <h3>{{ project.title }}</h3>
              <p>{{ project.lead }}</p>
            </div>
          </RouterLink>
        </article>
      </div>
    </section>
  </main>
</template>
