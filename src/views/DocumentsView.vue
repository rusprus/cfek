<script setup>
import { documents } from '../data/site'
</script>

<template>
  <main>
    <header class="page-hero wrap">
      <h1>Документы фонда</h1>
    </header>
    <section class="section">
      <div class="wrap doc-list">
        <a v-for="item in documents" :key="item.href" class="doc" :href="item.href" target="_blank" rel="noreferrer">
          <h3>{{ item.title }}</h3>
          <span class="text-link">Скачать PDF</span>
        </a>
        <RouterLink class="doc" to="/reports">
          <h3>Отчёты о расходовании средств</h3>
          <span class="text-link">Открыть раздел</span>
        </RouterLink>
      </div>
    </section>
  </main>
</template>
