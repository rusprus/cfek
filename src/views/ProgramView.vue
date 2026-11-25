<script setup>
import { computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { programs } from '../data/site'

const route = useRoute()
const router = useRouter()
const program = computed(() => programs.find((item) => item.slug === route.params.slug))

watch(program, (value) => {
  if (!value) router.replace('/programs')
})
</script>

<template>
  <main v-if="program">
    <header class="page-hero wrap">
      <p class="muted">Программа</p>
      <h1>{{ program.title }}</h1>
      <p class="lede">{{ program.lead }}</p>
    </header>
    <section class="section">
      <div class="wrap split">
        <div class="prose">
          <p v-for="(paragraph, index) in program.paragraphs" :key="index">{{ paragraph }}</p>
          <RouterLink class="btn" :to="`/donate?goal=${program.slug}`" style="margin-top: 18px">Помочь этой программе</RouterLink>
        </div>
        <div class="figure">
          <img :src="program.image" :alt="program.title" />
        </div>
      </div>
    </section>
  </main>
</template>
