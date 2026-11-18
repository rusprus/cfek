<script setup>
import { openMenu } from '../menu'
import { fund, projects, stats, helpWays, news } from '../data/site'
</script>

<template>
  <section class="hero">
    <div class="hero-copy">
      <RouterLink class="hero-brand" to="/">
        <img src="/media/logo.png" alt="" />
        <span>
          <b>Энергия Доброты</b>
          <span>благотворительный фонд</span>
        </span>
      </RouterLink>
      <h1>Энергия доброты в каждом из нас.</h1>
      <p>
        Любой человек может участвовать в добрых делах и помочь тем, кому это необходимо:
        детям с онкологическими заболеваниями, донорам костного мозга и людям в трудной ситуации.
      </p>
      <div class="hero-actions">
        <RouterLink class="btn light" to="/donate">Помочь</RouterLink>
        <RouterLink class="text-link plain" to="/about" style="color: white">Кто мы</RouterLink>
      </div>
    </div>
    <div class="hero-side">
      <div class="hero-tools">
        <button class="icon-btn menu-btn" type="button" @click="openMenu">
          <span class="burger" aria-hidden="true"><span></span><span></span><span></span></span>
          Меню
        </button>
        <RouterLink class="help-link" to="/donate"><span class="heart" aria-hidden="true">♡</span> Помочь</RouterLink>
      </div>
      <div class="hero-photo">
        <img src="/media/hero.jpg" alt="Команда и подопечные фонда «Энергия Доброты»" />
      </div>
    </div>
  </section>

  <section class="section">
    <div class="wrap">
      <div class="section-head">
        <h2>Сейчас фонду нужна поддержка этих проектов</h2>
        <RouterLink class="text-link" to="/projects">Все проекты</RouterLink>
      </div>
      <div class="card-grid">
        <article v-for="project in projects.slice(0, 3)" :key="project.slug" class="card">
          <RouterLink :to="`/projects/${project.slug}`">
            <img :src="project.image" :alt="project.title" />
            <div class="card-body">
              <h3>{{ project.title }}</h3>
              <p>{{ project.lead }}</p>
            </div>
          </RouterLink>
        </article>
      </div>
    </div>
  </section>

  <section class="section" style="padding-top: 0">
    <div class="wrap">
      <div class="section-head">
        <div>
          <h2>Как помочь</h2>
          <p class="lede">Пожертвование — один из способов. Можно приехать, привезти вещи или рассказать о фонде.</p>
        </div>
      </div>
      <div class="way-grid">
        <article v-for="way in helpWays" :key="way.title" class="way">
          <h3>{{ way.title }}</h3>
          <p>{{ way.text }}</p>
          <RouterLink class="text-link" :to="way.to">Выбрать</RouterLink>
        </article>
      </div>
    </div>
  </section>

  <section class="section" style="padding-top: 0">
    <div class="wrap">
      <h2>Цифры с сайта фонда</h2>
      <div class="stats" style="margin-top: 24px">
        <article v-for="item in stats" :key="item.label" class="stat">
          <b>{{ item.value }}</b>
          <span>{{ item.label }}</span>
        </article>
      </div>
    </div>
  </section>

  <section class="section" style="padding-top: 0">
    <div class="wrap split">
      <div>
        <h2 class="serif" style="font-size: clamp(32px, 4vw, 52px); letter-spacing: -0.03em">Новости</h2>
        <article v-for="item in news" :key="item.slug" class="home-news" style="margin-top: 22px">
          <p class="muted">{{ item.date }}</p>
          <h3 class="serif" style="font-size: 34px; margin: 6px 0 10px">{{ item.title }}</h3>
          <RouterLink class="text-link" :to="`/news/${item.slug}`">Читать</RouterLink>
        </article>
        <p style="margin-top: 22px">
          <a class="text-link" :href="fund.vk" target="_blank" rel="noreferrer">Стена ВКонтакте</a>
        </p>
      </div>
      <RouterLink to="/news" class="figure">
        <img :src="news[0].image" alt="Иллюстрация к новости" />
      </RouterLink>
    </div>
  </section>
</template>
