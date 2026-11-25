<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { fund, programs } from '../data/site'

const route = useRoute()
const goals = [{ slug: 'fund', title: 'Уставные программы фонда' }, ...programs]
const goal = ref(goals.some((item) => item.slug === route.query.goal) ? route.query.goal : 'fund')
const goalTitle = computed(() => goals.find((item) => item.slug === goal.value)?.title)
const purpose = computed(() =>
  goal.value === 'fund' ? fund.purpose : `Благотворительное пожертвование. Программа: ${goalTitle.value}. НДС не облагается.`,
)

watch(
  () => route.query.goal,
  (value) => {
    if (goals.some((item) => item.slug === value)) goal.value = value
  },
)

const amounts = [300, 500, 1000, 3000]
const amount = ref(500)
const custom = ref('')
const monthly = ref(false)
const copied = ref(false)

function pick(value) {
  amount.value = value
  custom.value = ''
}

function onCustom(event) {
  custom.value = event.target.value.replace(/[^\d]/g, '')
  if (custom.value) amount.value = Number(custom.value)
}

async function copyPurpose() {
  const text = `${purpose.value} ИНН ${fund.inn}, счёт ${fund.account}`
  try {
    await navigator.clipboard.writeText(text)
    copied.value = true
  } catch {
    copied.value = false
  }
}
</script>

<template>
  <main>
    <header class="page-hero wrap">
      <h1>Помочь фонду деньгами.</h1>
      <p class="lede">
        Разовый перевод или регулярная поддержка. Деньги поступают на расчётный счёт фонда.
        Этот экран показывает реквизиты и сумму, карту здесь не списывают.
      </p>
    </header>
    <section class="section">
      <div class="wrap split">
        <form class="paper" @submit.prevent>
          <label class="field">
            <span>Цель сбора</span>
            <select v-model="goal">
              <option v-for="item in goals" :key="item.slug" :value="item.slug">{{ item.title }}</option>
            </select>
          </label>
          <div class="toggle">
            <button type="button" :class="{ on: !monthly }" @click="monthly = false">Один раз</button>
            <button type="button" :class="{ on: monthly }" @click="monthly = true">Каждый месяц</button>
          </div>
          <div class="amounts">
            <button
              v-for="value in amounts"
              :key="value"
              type="button"
              :class="{ on: amount === value && !custom }"
              @click="pick(value)"
            >
              {{ value }} ₽
            </button>
            <input :value="custom" inputmode="numeric" placeholder="Другая сумма" @input="onCustom" />
          </div>
          <p>
            <b>{{ amount || 0 }} ₽</b>
            {{ monthly ? 'в месяц на уставные программы фонда' : 'разовым пожертвованием' }}
          </p>
          <div class="requisites">
            <div><span>Получатель</span><b>{{ fund.legalName }}</b></div>
            <div><span>ИНН</span><b>{{ fund.inn }}</b></div>
            <div><span>Счёт</span><b>{{ fund.account }}</b></div>
            <div><span>Банк</span><b>{{ fund.bank }}</b></div>
            <div><span>БИК</span><b>{{ fund.bik }}</b></div>
            <div><span>Корр. счёт</span><b>{{ fund.corr }}</b></div>
            <div><span>Назначение</span><b>{{ purpose }}</b></div>
          </div>
          <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-top: 18px">
            <button class="btn" type="button" @click="copyPurpose">
              {{ copied ? 'Реквизиты скопированы' : 'Скопировать реквизиты' }}
            </button>
            <a class="btn ghost" href="https://cfek.ru/howtohelp/" target="_blank" rel="noreferrer">Онлайн-форма фонда</a>
          </div>
        </form>
        <div class="prose">
          <h2>Как проходит платёж</h2>
          <p>Карта, СБП и виджет donation.ru уже подключены на действующем сайте и списывают деньги в пользу фонда.</p>
          <p>В этом Vue-макете нет платёжного ключа, поэтому кнопка не проводит оплату. Для настоящего перевода откройте онлайн-форму или отправьте перевод по реквизитам.</p>
          <p>Счёт открыт {{ fund.accountOpened }}.</p>
          <p>
            <RouterLink class="text-link" to="/reports">Смотреть отчёты</RouterLink>
          </p>
        </div>
      </div>
    </section>
  </main>
</template>
