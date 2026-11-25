<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { asset, events, fund, news, programs, stats, wards } from '../data/site'
import { loadVkPosts, newsDate, newsImage } from '../vk'

const story = ref(0)
const vkPosts = ref([])
let timer

const slides = [asset('media/hero.jpg'), asset('media/flash.jpg'), asset('media/pharmacy.jpg'), asset('media/help.jpg')]

onMounted(async () => {
  vkPosts.value = await loadVkPosts()
  timer = setInterval(() => {
    story.value = (story.value + 1) % wards.length
  }, 7000)
})
onBeforeUnmount(() => clearInterval(timer))

function showStory(index) {
  story.value = index
}
</script>

<template>
  <main>
    <section class="hero">
      <div class="hero-copy">
        <p class="hero-kicker">Благотворительный фонд · Санкт-Петербург</p>
        <h1>Энергия Доброты: больше 13 лет меняем жизни к лучшему</h1>
        <p>
          Поддерживаем детей с онкологическими заболеваниями, развиваем донорство костного мозга
          и помогаем людям в трудной жизненной ситуации.
        </p>
        <div class="hero-actions">
          <RouterLink class="btn" to="/donate">Помочь сейчас</RouterLink>
          <RouterLink class="btn ghost" to="/about">Узнать больше</RouterLink>
        </div>
      </div>
      <div class="hero-film" aria-hidden="true">
        <img v-for="(src, index) in slides" :key="src" :src="src" alt="" :style="{ animationDelay: `${index * 6}s` }" />
      </div>
    </section>

    <section class="section">
      <div class="wrap">
        <h2>Цифры доверия</h2>
        <p class="lede">Показатели из раздела «О нас» на cfek.ru.</p>
        <div class="stats">
          <article v-for="item in stats" :key="item.label" class="stat">
            <b>{{ item.value }}</b>
            <span>{{ item.label }}</span>
          </article>
        </div>
      </div>
    </section>

    <section class="section" style="padding-top: 0">
      <div class="wrap">
        <div class="section-head">
          <h2>Направления работы</h2>
          <RouterLink class="text-link" to="/programs">Все программы</RouterLink>
        </div>
        <div class="dir-grid">
          <RouterLink v-for="item in programs" :key="item.slug" class="dir-card" :to="`/programs/${item.slug}`">
            <h3>{{ item.title }}</h3>
            <p>{{ item.lead }}</p>
          </RouterLink>
        </div>
      </div>
    </section>

    <section class="section" style="padding-top: 0">
      <div class="wrap">
        <div class="section-head">
          <h2>Истории</h2>
          <RouterLink class="text-link" to="/wards">Все подопечные</RouterLink>
        </div>
        <article class="story">
          <img :src="wards[story].image" :alt="wards[story].name" />
          <div>
            <p class="muted">Подопечный фонда</p>
            <h3>{{ wards[story].name }}</h3>
            <p>
              Карточка опубликована на cfek.ru. Отдельного текста о диагнозе и сумме сбора на той странице нет,
              поэтому здесь только имя и фотография.
            </p>
            <RouterLink class="btn" :to="`/donate?goal=oncology`">Помочь</RouterLink>
          </div>
        </article>
        <div class="story-dots">
          <button
            v-for="(item, index) in wards"
            :key="item.slug"
            type="button"
            :class="{ on: index === story }"
            :aria-label="item.name"
            @click="showStory(index)"
          ></button>
        </div>
      </div>
    </section>

    <section class="section" style="padding-top: 0">
      <div class="wrap">
        <h2>Новости</h2>
        <div class="news-cards" style="margin-top: 16px">
          <component
            :is="item.url ? 'a' : 'RouterLink'"
            v-for="item in (vkPosts.length ? vkPosts : news).slice(0, 5)"
            :key="item.id || item.slug"
            class="news-card"
            :href="item.url || undefined"
            :to="item.url ? undefined : `/news/${item.slug}`"
            :target="item.url ? '_blank' : undefined"
            :rel="item.url ? 'noreferrer' : undefined"
          >
            <span v-if="newsImage(item)" class="news-photo">
              <img :src="newsImage(item)" :alt="item.title" />
            </span>
            <div class="card-body">
              <p class="muted">{{ newsDate(item.date) }}</p>
              <h3>{{ item.title }}</h3>
            </div>
          </component>
        </div>
        <p class="news-more">
          <RouterLink class="text-link" to="/news">Все новости</RouterLink>
        </p>
      </div>
      <div class="wrap news-grid" style="margin-top: 36px">
        <div>
          <h2>События</h2>
          <article v-for="item in events.filter((event) => event.upcoming)" :key="item.id" class="way" style="margin-top: 16px">
            <p class="muted">{{ item.when }}</p>
            <h3>{{ item.title }}</h3>
            <p>{{ item.text }}</p>
            <RouterLink class="text-link" :to="`/events#${item.id}`">Регистрация</RouterLink>
          </article>
        </div>
        <div>
          <h2>ВКонтакте</h2>
          <p class="lede">Анонсы акций совпадают с лентой сообщества, а не с отдельной редакцией сайта.</p>
          <iframe
            class="vk-frame"
            title="Записи сообщества Энергия Доброты"
            :src="`https://vk.com/widget_community.php?gid=${fund.vkGroup}&mode=4`"
          ></iframe>
          <p style="margin-top: 12px">
            <a class="text-link" :href="fund.vk" target="_blank" rel="noreferrer">Открыть vk.com/cfekru</a>
          </p>
        </div>
      </div>
    </section>
  </main>
</template>
