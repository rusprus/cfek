<script setup>
import { computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { fund, projects } from '../data/site'

const route = useRoute()
const router = useRouter()
const project = computed(() => projects.find((item) => item.slug === route.params.slug))
const others = computed(() => projects.filter((item) => item.slug !== route.params.slug).slice(0, 3))

watch(project, (value) => {
  if (!value) router.replace('/projects')
})
</script>

<template>
  <main v-if="project">
    <header class="page-hero wrap">
      <p class="muted">Проект</p>
      <h1>{{ project.title }}</h1>
      <p class="lede">{{ project.lead }}</p>
    </header>
    <section class="section">
      <div class="wrap split">
        <div class="prose">
          <p v-for="(paragraph, index) in project.paragraphs" :key="index">{{ paragraph }}</p>
          <h2>Хотите помочь проекту</h2>
          <p>
            <a :href="fund.pressPhoneHref">{{ fund.pressPhone }}</a><br />
            <a :href="`mailto:${fund.email}`">{{ fund.email }}</a>
          </p>
          <p v-if="project.slug === 'angels'">
            Вступить в Национальный регистр доноров костного мозга можно на
            <a class="text-link" href="https://rdkm.ru/donation-application" target="_blank" rel="noreferrer">rdkm.ru</a>.
          </p>
          <RouterLink class="btn" to="/donate" style="margin-top: 18px">Помочь фонду</RouterLink>
        </div>
        <div class="figure">
          <img :src="project.image" :alt="project.title" />
        </div>
      </div>
    </section>
    <section class="section" style="padding-top: 0">
      <div class="wrap">
        <h2>Другие проекты</h2>
        <div class="card-grid" style="margin-top: 20px">
          <article v-for="item in others" :key="item.slug" class="card">
            <RouterLink :to="`/projects/${item.slug}`">
              <img :src="item.image" :alt="item.title" />
              <div class="card-body"><h3>{{ item.title }}</h3></div>
            </RouterLink>
          </article>
        </div>
      </div>
    </section>
  </main>
</template>
