<script setup>
import { ref } from 'vue'
import { fund } from '../data/site'

const sent = ref(false)
const form = ref({ name: '', contact: '', message: '' })

function submit() {
  const subject = encodeURIComponent('Сообщение с сайта')
  const body = encodeURIComponent(`${form.value.name}\n${form.value.contact}\n\n${form.value.message}`)
  window.location.href = `mailto:${fund.email}?subject=${subject}&body=${body}`
  sent.value = true
}
</script>

<template>
  <main>
    <header class="page-hero wrap">
      <h1>Контакты</h1>
      <p class="lede">Фонд работает {{ fund.hours }}.</p>
    </header>
    <section class="section">
      <div class="wrap contact-grid">
        <div>
          <p><a class="phone" :href="fund.phoneHref">{{ fund.phone }}</a></p>
          <p><a class="text-link" :href="`mailto:${fund.email}`">{{ fund.email }}</a></p>
          <p class="lede">{{ fund.address }}</p>
          <p class="lede">Пресса: {{ fund.pressName }}, {{ fund.pressPhone }}, {{ fund.pressEmail }}</p>
          <iframe
            class="map-frame"
            title="Карта проезда к офису фонда"
            src="https://www.openstreetmap.org/export/embed.html?bbox=30.228%2C60.011%2C30.241%2C60.017&layer=mapnik&marker=60.01397%2C30.23470"
          ></iframe>
          <p style="margin-top: 8px">
            <a class="text-link" href="https://www.openstreetmap.org/?mlat=60.01397&mlon=30.23470#map=17/60.01397/30.23470" target="_blank" rel="noreferrer">Открыть карту</a>
          </p>
        </div>
        <form class="paper" @submit.prevent="submit">
          <h2>Написать фонду</h2>
          <label class="field">
            <span>Имя</span>
            <input v-model="form.name" required />
          </label>
          <label class="field">
            <span>Телефон или почта</span>
            <input v-model="form.contact" required />
          </label>
          <label class="field">
            <span>Сообщение</span>
            <textarea v-model="form.message" required></textarea>
          </label>
          <button class="btn" type="submit">Отправить</button>
          <p v-if="sent" class="note">Открылось письмо на {{ fund.email }}.</p>
        </form>
      </div>
    </section>
  </main>
</template>
