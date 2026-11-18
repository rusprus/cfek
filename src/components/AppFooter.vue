<script setup>
import { fund } from '../data/site'
</script>

<template>
  <footer class="footer">
    <div class="wrap footer-grid">
      <div>
        <h2>Энергия Доброты</h2>
        <p class="muted" style="color: #d9d0ca; margin-top: 10px">{{ fund.address }}</p>
        <p style="margin-top: 10px">
          <a :href="fund.phoneHref">{{ fund.phone }}</a><br />
          <a :href="`mailto:${fund.email}`">{{ fund.email }}</a>
        </p>
      </div>
      <div>
        <strong>Фонд</strong>
        <ul>
          <li><RouterLink to="/about">Кто мы</RouterLink></li>
          <li><RouterLink to="/projects">Проекты</RouterLink></li>
          <li><RouterLink to="/team">Команда</RouterLink></li>
          <li><RouterLink to="/reports">Отчёты</RouterLink></li>
          <li><RouterLink to="/documents">Документы</RouterLink></li>
        </ul>
      </div>
      <div>
        <strong>Участие</strong>
        <ul>
          <li><RouterLink to="/donate">Помочь деньгами</RouterLink></li>
          <li><RouterLink to="/volunteers">Стать волонтёром</RouterLink></li>
          <li><RouterLink to="/need-help">Нужна помощь</RouterLink></li>
          <li><RouterLink to="/news">Новости</RouterLink></li>
          <li><RouterLink to="/press">СМИ о нас</RouterLink></li>
        </ul>
      </div>
      <div>
        <strong>Соцсети</strong>
        <ul>
          <li><a :href="fund.vk" target="_blank" rel="noreferrer">ВКонтакте</a></li>
          <li><a :href="fund.telegram" target="_blank" rel="noreferrer">Telegram</a></li>
          <li><RouterLink to="/contacts">Контакты</RouterLink></li>
        </ul>
      </div>
    </div>
    <div class="wrap fine">
      <p>© {{ new Date().getFullYear() }} БФ «Энергия Доброты». ИНН {{ fund.inn }}. 12+</p>
      <p style="margin-top: 6px">Мы работаем {{ fund.hours }}.</p>
    </div>
  </footer>
</template>
