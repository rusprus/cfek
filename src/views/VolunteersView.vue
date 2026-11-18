<script setup>
import { fund } from '../data/site'
const roles = [
  { title: 'Автоволонтёр', text: 'Если есть машина: фонду постоянно нужно отвезти что-то из одной части города в другую.' },
  { title: 'Медиа', text: 'Фото, видеомонтаж, социальные сети, тексты, дизайн и соседние навыки.' },
  { title: 'Ассистент', text: 'Помощь детям на мероприятиях, мастер-классы и участие в акциях.' },
]
const gives = ['Благодарственное письмо', 'Знакомства', 'Мероприятия', 'Волонтёрские часы', 'Упоминание в социальных сетях']
</script>

<template>
  <main>
    <header class="page-hero wrap">
      <h1>Чем вы готовы помочь?</h1>
      <p class="lede">Детям во время лечения не хватает общения. Фонд ищет людей в эти роли.</p>
    </header>
    <section class="section">
      <div class="wrap card-grid">
        <article v-for="role in roles" :key="role.title" class="way">
          <h3>{{ role.title }}</h3>
          <p>{{ role.text }}</p>
        </article>
      </div>
      <div class="wrap" style="margin-top: 28px">
        <h2>Что фонд даёт взамен</h2>
        <div class="way-grid" style="margin-top: 16px">
          <p v-for="item in gives" :key="item" class="way">{{ item }}</p>
        </div>
        <p style="margin-top: 18px">
          <a class="btn" :href="fund.phoneHref">{{ fund.phone }}</a>
          <a class="text-link" :href="`mailto:${fund.email}`" style="margin-left: 16px">{{ fund.email }}</a>
        </p>
      </div>
    </section>
  </main>
</template>
