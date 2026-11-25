<script setup>
import { ref } from 'vue'
import { events, fund } from '../data/site'

const sent = ref('')

function register(event) {
  const subject = encodeURIComponent(`Запись на событие: ${event.title}`)
  const body = encodeURIComponent(`Хочу участвовать: ${event.title}, ${event.when}.`)
  window.location.href = `mailto:${fund.email}?subject=${subject}&body=${body}`
  sent.value = event.id
}
</script>

<template>
  <main>
    <header class="page-hero wrap">
      <h1>События</h1>
      <p class="lede">Повторяющиеся акции фонда и фотоотчёты, которые уже опубликованы в архиве cfek.ru.</p>
    </header>
    <section class="section">
      <div class="wrap">
        <h2>Календарь</h2>
        <div class="doc-list" style="margin-top: 18px">
          <article v-for="event in events.filter((item) => item.upcoming)" :id="event.id" :key="event.id" class="way">
            <p class="muted">{{ event.when }} · {{ event.place }}</p>
            <h3>{{ event.title }}</h3>
            <p>{{ event.text }}</p>
            <button class="btn" type="button" style="margin-top: 14px" @click="register(event)">Зарегистрироваться</button>
            <p v-if="sent === event.id" class="note">Открылось письмо на {{ fund.email }}.</p>
          </article>
        </div>
      </div>
    </section>
    <section class="section" style="padding-top: 0">
      <div class="wrap">
        <h2>Фотоотчёты</h2>
        <div class="card-grid" style="margin-top: 18px">
          <article v-for="event in events.filter((item) => !item.upcoming)" :key="event.id" class="card">
            <a :href="event.href" target="_blank" rel="noreferrer">
              <img :src="event.image" :alt="event.title" />
              <div class="card-body">
                <p class="muted">{{ event.when }}</p>
                <h3>{{ event.title }}</h3>
                <p>{{ event.text }}</p>
              </div>
            </a>
          </article>
        </div>
      </div>
    </section>
  </main>
</template>
