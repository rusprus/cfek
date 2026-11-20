<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { asset, directions, documents, fund, news, partners, press, projects, reports, stats, team } from '../data/site'

const anchors = [
  { id: 'goals', label: 'Цели фонда' },
  { id: 'work', label: 'Наша работа' },
  { id: 'programs', label: 'Программы фонда' },
  { id: 'press', label: 'Признание' },
  { id: 'care', label: 'Кому помогаем' },
  { id: 'team', label: 'Команда' },
  { id: 'reports', label: 'Отчёты' },
  { id: 'documents', label: 'Документы' },
  { id: 'partners', label: 'Партнёры' },
  { id: 'contacts', label: 'Контакты' },
]

const active = ref('goals')
const teamTrack = ref(null)
const logoTrack = ref(null)
const sent = ref(false)
const form = ref({ email: '', phone: '', name: '', message: '', agree: false })
let observer

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (visible) active.value = visible.target.id
    },
    { rootMargin: '-30% 0px -55% 0px', threshold: [0.15, 0.4] },
  )
  anchors.forEach((item) => {
    const node = document.getElementById(item.id)
    if (node) observer.observe(node)
  })
})

onBeforeUnmount(() => observer?.disconnect())

function slide(track, direction) {
  track?.scrollBy({ left: direction * 280, behavior: 'smooth' })
}

function initials(name) {
  return name
    .split(' ')
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
}

function submitForm() {
  const subject = encodeURIComponent('Вопрос с сайта «Энергия Доброты»')
  const body = encodeURIComponent(
    `${form.value.name}\n${form.value.email}\n${form.value.phone}\n\n${form.value.message}`,
  )
  window.location.href = `mailto:${fund.email}?subject=${subject}&body=${body}`
  sent.value = true
}
</script>

<template>
  <main>
    <section class="hero">
      <div class="hero-copy">
        <p class="hero-kicker">Благотворительный фонд · Санкт-Петербург</p>
        <h1>Энергия доброты в каждом из нас</h1>
        <p>
          Фонд поддерживает детей с онкологическими заболеваниями, развивает донорство костного мозга
          и помогает людям в трудной жизненной ситуации.
        </p>
        <div class="hero-actions">
          <RouterLink class="btn" to="/donate">Поддержать фонд</RouterLink>
          <RouterLink class="text-link" to="/about">О нашей работе</RouterLink>
        </div>
      </div>
      <div class="hero-photo">
        <img :src="asset('media/hero.jpg')" alt="Команда и подопечные фонда «Энергия Доброты»" />
      </div>
    </section>

    <nav class="anchor-nav" aria-label="Разделы страницы">
      <ul class="wrap">
        <li v-for="item in anchors" :key="item.id">
          <a :href="`#${item.id}`" :class="{ on: active === item.id }">{{ item.label }}</a>
        </li>
      </ul>
    </nav>

    <section id="goals" class="section">
      <div class="wrap goals">
        <div>
          <h2>Цели фонда</h2>
          <ul class="goal-list">
            <li v-for="item in directions" :key="item">{{ item }}</li>
          </ul>
        </div>
        <div class="band">
          <h2>Для кого</h2>
          <p>
            Под опекой фонда несколько социальных учреждений и более 300 подопечных. Им постоянно нужны
            лекарства, расходные материалы, средства ухода и адресная помощь.
          </p>
          <p>
            <RouterLink class="text-link" to="/need-help">Получить помощь</RouterLink>
          </p>
        </div>
      </div>
      <div class="wrap stats">
        <article v-for="item in stats" :key="item.label" class="stat">
          <b>{{ item.value }}</b>
          <span>{{ item.label }}</span>
        </article>
      </div>
    </section>

    <section id="work" class="section" style="padding-top: 0">
      <div class="wrap">
        <div class="band">
          <h2>Что делаем</h2>
          <p>
            Обеспечиваем медицинские учреждения необходимыми материалами и оказываем адресную помощь детям.
            Флешмобы проходят у клиники им. Р. М. Горбачёвой, «Сундучок храбрости» — ещё и в онкоцентре
            им. Н. П. Напалкова в Песочном.
          </p>
          <p>Фонд работает в Санкт-Петербурге больше 13 лет. Часы работы: {{ fund.hours }}.</p>
        </div>
      </div>
    </section>

    <section id="programs" class="section" style="padding-top: 0">
      <div class="wrap">
        <div class="section-head">
          <h2>Программы фонда</h2>
          <RouterLink class="text-link" to="/projects">Все проекты</RouterLink>
        </div>
        <div class="program-grid">
          <article v-for="project in projects.slice(0, 2)" :key="project.slug" class="program">
            <RouterLink :to="`/projects/${project.slug}`">
              <img :src="project.image" :alt="project.title" />
              <div class="program-body">
                <h3>{{ project.title }}</h3>
                <p>{{ project.lead }}</p>
                <span class="btn light">Подробнее</span>
              </div>
            </RouterLink>
          </article>
        </div>
        <div class="card-grid" style="margin-top: 18px">
          <article v-for="project in projects.slice(2)" :key="project.slug" class="card">
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

    <section id="press" class="section" style="padding-top: 0">
      <div class="wrap">
        <div class="section-head">
          <h2>Признание</h2>
          <RouterLink class="text-link" to="/press">Все материалы</RouterLink>
        </div>
        <div class="doc-list">
          <a v-for="item in press.slice(0, 6)" :key="item.href" class="doc" :href="item.href" target="_blank" rel="noreferrer">
            <h3>{{ item.title }}</h3>
            <span class="text-link">Открыть</span>
          </a>
        </div>
        <article v-if="news[0]" class="way" style="margin-top: 16px">
          <p class="muted">{{ news[0].date }}</p>
          <h3>{{ news[0].title }}</h3>
          <RouterLink class="text-link" :to="`/news/${news[0].slug}`">Читать новость</RouterLink>
        </article>
      </div>
    </section>

    <section id="care" class="section" style="padding-top: 0">
      <div class="wrap">
        <h2>Кому помогаем</h2>
        <div class="care-grid">
          <article class="care">
            <h3>Детям в онкоклиниках</h3>
            <ul>
              <li>Лекарства, расходные материалы и средства гигиены</li>
              <li>«Сундучок храбрости» перед болезненными процедурами</li>
              <li>Мастер-классы, пока лечение идёт месяцами</li>
              <li>Флешмобы у окон клиники: «Бьющееся сердце» и новогоднее поздравление</li>
            </ul>
          </article>
          <article class="care">
            <h3>Людям в трудной ситуации</h3>
            <ul>
              <li>Вещи, продукты, лекарства и средства ухода</li>
              <li>Инвалидные коляски, подгузники, пелёнки</li>
              <li>Оплата проезда к месту лечения</li>
              <li>Помощь кризисным центрам, хосписам и многодетным семьям</li>
            </ul>
          </article>
        </div>
        <div class="hotline">
          <div>
            <span>Телефон фонда</span>
            <a class="phone" :href="fund.phoneHref">{{ fund.phone }}</a>
          </div>
          <RouterLink class="btn blue" to="/help">Как помочь</RouterLink>
        </div>
      </div>
    </section>

    <section id="team" class="section" style="padding-top: 0">
      <div class="wrap">
        <div class="slider-head">
          <h2>Команда фонда</h2>
          <div class="arrows">
            <button type="button" aria-label="Предыдущие" @click="slide(teamTrack, -1)">‹</button>
            <button type="button" aria-label="Следующие" @click="slide(teamTrack, 1)">›</button>
          </div>
        </div>
        <div ref="teamTrack" class="team-track">
          <article v-for="person in team" :key="person.name" class="person">
            <img v-if="person.image" :src="person.image" :alt="person.name" />
            <div v-else class="avatar" aria-hidden="true">{{ initials(person.name) }}</div>
            <strong>{{ person.name }}</strong>
            <span>{{ person.role }}</span>
          </article>
        </div>
        <p style="margin-top: 16px"><RouterLink class="text-link" to="/team">Вся команда</RouterLink></p>
      </div>
    </section>

    <section id="reports" class="section" style="padding-top: 0">
      <div class="wrap">
        <div class="section-head">
          <h2>Отчёты фонда</h2>
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

    <section id="documents" class="section" style="padding-top: 0">
      <div class="wrap">
        <h2>Документы</h2>
        <div class="doc-list" style="margin-top: 22px">
          <a v-for="item in documents" :key="item.href" class="doc" :href="item.href" target="_blank" rel="noreferrer">
            <h3>{{ item.title }}</h3>
            <span class="text-link">Открыть</span>
          </a>
        </div>
      </div>
    </section>

    <section id="partners" class="section" style="padding-top: 0">
      <div class="wrap">
        <div class="logo-head">
          <h2>Наши партнёры</h2>
          <div class="arrows">
            <button type="button" aria-label="Предыдущие" @click="slide(logoTrack, -1)">‹</button>
            <button type="button" aria-label="Следующие" @click="slide(logoTrack, 1)">›</button>
          </div>
        </div>
        <div ref="logoTrack" class="logo-track">
          <article v-for="item in partners" :key="item.name" class="logo-card">
            <img :src="item.image" :alt="item.name" />
          </article>
        </div>
      </div>
    </section>

    <section id="contacts" class="section" style="padding-top: 0">
      <div class="wrap contact-grid">
        <div>
          <h2>Контакты</h2>
          <p class="lede">
            Если есть вопрос или хотите участвовать в работе фонда, напишите — откроется письмо на {{ fund.email }}.
          </p>
          <p style="margin-top: 16px">
            <a class="phone" :href="fund.phoneHref" style="color: var(--blue); font-size: 28px; font-weight: 600; text-decoration: none">{{ fund.phone }}</a><br />
            <a class="text-link" :href="`mailto:${fund.email}`">{{ fund.email }}</a>
          </p>
          <p class="lede">{{ fund.address }}</p>
          <p class="lede">Пресса: {{ fund.pressName }}, {{ fund.pressPhone }}, {{ fund.pressEmail }}</p>
        </div>
        <form class="paper" @submit.prevent="submitForm">
          <label class="field">
            <span>Эл. почта для ответа</span>
            <input v-model="form.email" type="email" required placeholder="name@example.com" />
          </label>
          <label class="field">
            <span>Телефон</span>
            <input v-model="form.phone" type="tel" placeholder="+7 900 000-00-00" />
          </label>
          <label class="field">
            <span>Имя</span>
            <input v-model="form.name" required placeholder="Иван Иванов" />
          </label>
          <label class="field">
            <span>Сообщение</span>
            <textarea v-model="form.message" required placeholder="Введите текст"></textarea>
          </label>
          <label class="check">
            <input v-model="form.agree" type="checkbox" required />
            <span>
              Соглашаюсь с
              <a class="text-link" href="https://cfek.ru/privacy-policy/" target="_blank" rel="noreferrer">политикой обработки персональных данных</a>
            </span>
          </label>
          <button class="btn" type="submit" :disabled="!form.agree">Отправить</button>
          <p v-if="sent" class="note">Открылось письмо. Если почтовая программа не запустилась, напишите на {{ fund.email }}.</p>
        </form>
      </div>
      <div class="wrap requisites">
        <div><span>Получатель</span><b>{{ fund.legalName }}</b></div>
        <div><span>ИНН</span><b>{{ fund.inn }}</b></div>
        <div><span>Расчётный счёт</span><b>{{ fund.account }}</b></div>
        <div><span>Банк</span><b>{{ fund.bank }}</b></div>
        <div><span>БИК</span><b>{{ fund.bik }}</b></div>
        <div><span>Корр. счёт</span><b>{{ fund.corr }}</b></div>
        <div><span>Назначение</span><b>{{ fund.purpose }}</b></div>
      </div>
    </section>
  </main>
</template>
