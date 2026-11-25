<script setup>
import { programs } from '../data/site'
</script>

<template>
  <main>
    <header class="page-hero wrap">
      <h1>Наши программы</h1>
      <p class="lede">Пять направлений фонда. В каждой карточке можно выбрать именно эту цель пожертвования.</p>
    </header>
    <section class="section">
      <div class="wrap" style="display: grid; gap: 28px">
        <article v-for="item in programs" :id="item.slug" :key="item.slug" class="split program-row">
          <div class="figure">
            <img :src="item.image" :alt="item.title" />
          </div>
          <div class="prose">
            <h2>{{ item.title }}</h2>
            <p v-for="(paragraph, index) in item.paragraphs" :key="index">{{ paragraph }}</p>
            <RouterLink class="btn" :to="`/donate?goal=${item.slug}`" style="margin-top: 18px">Помочь этой программе</RouterLink>
          </div>
        </article>
      </div>
    </section>
  </main>
</template>
