<script setup>
import { fund, orgWays } from '../data/site'
</script>

<template>
  <main>
    <header class="page-hero wrap">
      <h1>Организациям</h1>
      <p class="lede">
        Фонд работает с компаниями, которые развивают корпоративную социальную ответственность.
        Участие показывает приоритеты компании, усиливает HR-бренд и даёт команде понятный способ помогать.
      </p>
    </header>

    <section class="section">
      <div class="wrap org-grid">
        <article v-for="way in orgWays" :key="way.title" class="way">
          <h3>{{ way.title }}</h3>
          <p>{{ way.text }}</p>
          <ul>
            <li v-for="point in way.points" :key="point">{{ point }}</li>
          </ul>
        </article>
      </div>
      <div class="wrap hotline">
        <div>
          <span>Написать о сотрудничестве</span>
          <a class="phone" :href="`mailto:${fund.email}`">{{ fund.email }}</a>
        </div>
        <a class="btn blue" :href="fund.phoneHref">{{ fund.phone }}</a>
      </div>
      <div class="wrap" style="margin-top: 22px">
        <RouterLink class="text-link" to="/reports">Отчёты</RouterLink>
        <RouterLink class="text-link" to="/documents" style="margin-left: 18px">Документы</RouterLink>
        <RouterLink class="text-link" to="/about" style="margin-left: 18px">Команда</RouterLink>
      </div>
    </section>
  </main>
</template>
