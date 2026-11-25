<script setup>
import { fund } from '../data/site'

const links = [
  { to: '/about', label: 'О фонде' },
  { to: '/programs', label: 'Программы' },
  { to: '/wards', label: 'Подопечные' },
  { to: '/organizations', label: 'Организациям' },
  { to: '/volunteers', label: 'Донорам и волонтёрам' },
  { to: '/events', label: 'События' },
  { to: '/reports', label: 'Отчёты' },
  { to: '/contacts', label: 'Контакты' },
]
</script>

<template>
  <footer class="footer">
    <div class="wrap">
      <div class="footer-row">
        <strong>{{ fund.legalName }}</strong>
        <nav>
          <RouterLink v-for="item in links" :key="item.to" :to="item.to">{{ item.label }}</RouterLink>
        </nav>
      </div>
      <div class="footer-row" style="margin-top: 18px">
        <p class="fine">
          {{ fund.address }}<br />
          <a :href="fund.phoneHref">{{ fund.phone }}</a> · <a :href="`mailto:${fund.email}`">{{ fund.email }}</a>
        </p>
        <p class="fine">
          ИНН {{ fund.inn }} · счёт {{ fund.account }}<br />
          {{ fund.bank }}, БИК {{ fund.bik }}
        </p>
        <p class="fine">
          <a :href="fund.vk" target="_blank" rel="noreferrer">ВКонтакте</a><br />
          <a :href="fund.telegram" target="_blank" rel="noreferrer">Telegram</a>
        </p>
      </div>
      <p class="fine">© {{ new Date().getFullYear() }} БФ «Энергия Доброты». 12+</p>
    </div>
    <div class="credit">Санкт-Петербург · {{ fund.hours }}</div>
  </footer>
</template>
