<script setup>
import { ref } from 'vue'
import { donorFaq, fund } from '../data/site'

const roles = [
  { title: 'Мероприятия', text: 'Помощь детям на акциях и мастер-классах: рисование, поздравления, участие во флешмобах.' },
  { title: 'Транспорт', text: 'Автоволонтёры возят помощь по городу: вещи, продукты, посылки для подопечных.' },
  { title: 'Медиа', text: 'Фото, видео, тексты и социальные сети. Отдельной вакансии психолога фонд на сайте не публикует.' },
]
const sent = ref(false)
const form = ref({ name: '', contact: '', role: 'Мероприятия', message: '' })

function submit() {
  const subject = encodeURIComponent('Заявка волонтёра')
  const body = encodeURIComponent(`${form.value.name}\n${form.value.contact}\nРоль: ${form.value.role}\n\n${form.value.message}`)
  window.location.href = `mailto:${fund.email}?subject=${subject}&body=${body}`
  sent.value = true
}
</script>

<template>
  <main>
    <header class="page-hero wrap">
      <h1>Донорам и волонтёрам</h1>
      <p class="lede">Как вступить в регистр костного мозга и какие задачи фонд уже отдаёт волонтёрам.</p>
    </header>

    <section class="section">
      <div class="wrap split">
        <div class="prose">
          <h2>Стать донором</h2>
          <p>Фонд рассказывает о регистре и проводит лекции. Сама запись в Национальный регистр идёт на rdkm.ru.</p>
          <details v-for="item in donorFaq" :key="item.q" class="faq">
            <summary>{{ item.q }}</summary>
            <p>{{ item.a }}</p>
          </details>
          <p>
            <a class="btn" href="https://rdkm.ru/donation-application" target="_blank" rel="noreferrer">Форма записи в регистр</a>
          </p>
          <p style="margin-top: 12px">
            <RouterLink class="text-link" to="/programs/blood">Программа донорства крови</RouterLink>
          </p>
        </div>
        <form class="paper" @submit.prevent="submit">
          <h2>Стать волонтёром</h2>
          <article v-for="role in roles" :key="role.title" style="margin-top: 14px">
            <h3>{{ role.title }}</h3>
            <p>{{ role.text }}</p>
          </article>
          <label class="field" style="margin-top: 16px">
            <span>Имя</span>
            <input v-model="form.name" required />
          </label>
          <label class="field">
            <span>Телефон или почта</span>
            <input v-model="form.contact" required />
          </label>
          <label class="field">
            <span>Задача</span>
            <select v-model="form.role">
              <option v-for="role in roles" :key="role.title">{{ role.title }}</option>
            </select>
          </label>
          <label class="field">
            <span>Комментарий</span>
            <textarea v-model="form.message" required></textarea>
          </label>
          <button class="btn" type="submit">Отправить заявку</button>
          <p v-if="sent" class="note">Открылось письмо на {{ fund.email }}.</p>
        </form>
      </div>
    </section>
  </main>
</template>
