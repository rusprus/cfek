<script setup>
import { asset, directions, stats, team } from '../data/site'

function initials(name) {
  return name.split(' ').slice(0, 2).map((part) => part[0]).join('')
}
</script>

<template>
  <main>
    <header class="page-hero wrap">
      <h1>Быстро и вовремя помогать людям в сложной ситуации.</h1>
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
      <div class="wrap stats" style="margin-top: 28px">
        <article v-for="item in stats" :key="item.label" class="stat">
          <b>{{ item.value }}</b>
          <span>{{ item.label }}</span>
        </article>
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
