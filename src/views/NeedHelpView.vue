<script setup>
import { fund } from '../data/site'
</script>

<template>
  <main>
    <header class="page-hero wrap">
      <h1>Что сделать, чтобы получить помощь.</h1>
      <p class="lede">Так алгоритм описан на странице «Нужна помощь» действующего сайта.</p>
    </header>
    <section class="section">
      <div class="wrap prose paper">
        <p>1. Сделайте фото ребёнка.</p>
        <p>2. Отправьте подробный рассказ о себе и о своей ситуации на {{ fund.email }}.</p>
        <p>3. Прикрепите медицинские документы: справки, выписки, заключения врачей.</p>
        <p>4. Укажите диагноз.</p>
        <p>5. Если в течение двух дней нет ответа — позвоните {{ fund.phone }}.</p>
        <p style="margin-top: 18px">
          <a class="btn" :href="`mailto:${fund.email}`">Написать на почту</a>
        </p>
      </div>
    </section>
  </main>
</template>
