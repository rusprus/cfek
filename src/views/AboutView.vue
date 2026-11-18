<script setup>
import { directions, stats } from '../data/site'
</script>

<template>
  <main>
    <header class="page-hero wrap">
      <h1>Быстро и вовремя помогать людям в сложной ситуации.</h1>
      <p class="lede">
        Благотворительный фонд «Энергия ДоброТы» поддерживает детей с онкологическими заболеваниями,
        развивает донорство костного мозга и помогает людям, которым нужна гуманитарная поддержка.
        Каждый день на протяжении 11 лет фонд делает полезные дела.
      </p>
    </header>
    <section class="section">
      <div class="wrap split">
        <div class="prose">
          <h2>Основные направления</h2>
          <p v-for="item in directions" :key="item">{{ item }}</p>
          <p style="margin-top: 22px">
            На главной странице действующего сайта сказано, что под опекой фонда несколько социальных учреждений
            и более 300 подопечных. В разделе «О нас» опубликованы такие показатели:
          </p>
        </div>
        <div class="figure">
          <img src="/media/hero.jpg" alt="Работа фонда" />
        </div>
      </div>
      <div class="wrap stats" style="margin-top: 28px">
        <article v-for="item in stats" :key="item.label" class="stat">
          <b>{{ item.value }}</b>
          <span>{{ item.label }}</span>
        </article>
      </div>
    </section>
  </main>
</template>
