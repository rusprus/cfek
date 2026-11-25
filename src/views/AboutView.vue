<script setup>
import { asset, directions, reports, stats, team } from '../data/site'

const values = [
  { title: 'Быстро и вовремя', text: 'Фонд берётся за конкретную нехватку: лекарство, дорогу, средства ухода, а не за общую декларацию.' },
  { title: 'Прозрачность', text: 'Годовые отчёты о деятельности и о целях расходования денег опубликованы за 2022 и 2023 годы.' },
  { title: 'Живое участие', text: 'Кроме переводов есть волонтёры, флешмобы у клиники и мастер-классы для детей на лечении.' },
]

function initials(name) {
  return name.split(' ').slice(0, 2).map((part) => part[0]).join('')
}
</script>

<template>
  <main>
    <header class="page-hero wrap">
      <h1>Миссия и ценности</h1>
      <p class="lede">
        Благотворительный фонд «Энергия ДоброТы» поддерживает детей с онкологическими заболеваниями,
        развивает донорство костного мозга и помогает людям, которым нужна гуманитарная поддержка.
        На странице «О нас» фонда указано больше 13 лет благотворительной работы.
      </p>
    </header>
    <section class="section">
      <div class="wrap split">
        <div class="prose">
          <h2>Основные направления</h2>
          <p v-for="item in directions" :key="item">{{ item }}</p>
          <p style="margin-top: 22px">
            Под опекой фонда несколько социальных учреждений и более 300 подопечных.
            Ниже — показатели из раздела «О нас».
          </p>
        </div>
        <div class="figure">
          <img :src="asset('media/hero.jpg')" alt="Работа фонда" />
        </div>
      </div>
      <div class="wrap org-grid" style="margin-top: 28px">
        <article v-for="item in values" :key="item.title" class="dir-card">
          <h3>{{ item.title }}</h3>
          <p style="max-height: none; opacity: 1; margin-top: 8px">{{ item.text }}</p>
        </article>
      </div>
      <div class="wrap stats" style="margin-top: 28px">
        <article v-for="item in stats" :key="item.label" class="stat">
          <b>{{ item.value }}</b>
          <span>{{ item.label }}</span>
        </article>
      </div>
    </section>

    <section class="section" style="padding-top: 0">
      <div class="wrap">
        <div class="section-head">
          <h2>Отчётность</h2>
          <RouterLink class="text-link" to="/reports">Все отчёты</RouterLink>
        </div>
        <div class="doc-list">
          <a v-for="item in reports" :key="item.href" class="doc" :href="item.href" target="_blank" rel="noreferrer">
            <p class="muted">{{ item.year }}</p>
            <h3>{{ item.title }}</h3>
            <span class="text-link">Скачать</span>
          </a>
        </div>
      </div>
    </section>

    <section class="section" style="padding-top: 0">
      <div class="wrap">
        <div class="team-stage">
          <div class="section-head">
            <h2>Команда</h2>
            <RouterLink class="text-link" to="/team">Все люди фонда</RouterLink>
          </div>
          <div class="team-grid">
            <article v-for="person in team" :key="person.name" class="person">
              <div class="portrait">
                <img v-if="person.image" :src="person.image" :alt="person.name" :style="{ objectPosition: person.focus || 'center 18%' }" />
                <div v-else class="avatar">{{ initials(person.name) }}</div>
              </div>
              <strong>{{ person.name }}</strong>
              <span>{{ person.role }}</span>
            </article>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
