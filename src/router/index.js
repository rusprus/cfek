import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import ProjectsView from '../views/ProjectsView.vue'
import ProjectView from '../views/ProjectView.vue'
import HelpView from '../views/HelpView.vue'
import DonateView from '../views/DonateView.vue'
import NeedHelpView from '../views/NeedHelpView.vue'
import NewsView from '../views/NewsView.vue'
import NewsArticleView from '../views/NewsArticleView.vue'
import ReportsView from '../views/ReportsView.vue'
import ContactsView from '../views/ContactsView.vue'
import DocumentsView from '../views/DocumentsView.vue'
import VolunteersView from '../views/VolunteersView.vue'
import TeamView from '../views/TeamView.vue'
import PressView from '../views/PressView.vue'
import OrganizationsView from '../views/OrganizationsView.vue'
import ProgramsView from '../views/ProgramsView.vue'
import ProgramView from '../views/ProgramView.vue'
import WardsView from '../views/WardsView.vue'
import EventsView from '../views/EventsView.vue'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to) {
    if (to.hash) return { el: to.hash, top: 88, behavior: 'smooth' }
    return { top: 0 }
  },
  routes: [
    { path: '/', name: 'home', component: HomeView, meta: { title: 'Энергия Доброты — благотворительный фонд' } },
    { path: '/about', component: AboutView, meta: { title: 'О фонде — Энергия Доброты' } },
    { path: '/organizations', component: OrganizationsView, meta: { title: 'Организациям — Энергия Доброты' } },
    { path: '/programs', component: ProgramsView, meta: { title: 'Программы — Энергия Доброты' } },
    { path: '/programs/:slug', component: ProgramView, meta: { title: 'Программа — Энергия Доброты' } },
    { path: '/wards', component: WardsView, meta: { title: 'Подопечные — Энергия Доброты' } },
    { path: '/events', component: EventsView, meta: { title: 'События — Энергия Доброты' } },
    { path: '/projects', component: ProjectsView, meta: { title: 'Проекты — Энергия Доброты' } },
    { path: '/projects/:slug', component: ProjectView, meta: { title: 'Проект — Энергия Доброты' } },
    { path: '/help', component: HelpView, meta: { title: 'Как помочь — Энергия Доброты' } },
    { path: '/donate', component: DonateView, meta: { title: 'Помочь фонду — Энергия Доброты' } },
    { path: '/need-help', component: NeedHelpView, meta: { title: 'Нужна помощь — Энергия Доброты' } },
    { path: '/news', component: NewsView, meta: { title: 'Новости — Энергия Доброты' } },
    { path: '/news/:slug', component: NewsArticleView, meta: { title: 'Новость — Энергия Доброты' } },
    { path: '/reports', component: ReportsView, meta: { title: 'Отчёты — Энергия Доброты' } },
    { path: '/contacts', component: ContactsView, meta: { title: 'Контакты — Энергия Доброты' } },
    { path: '/documents', component: DocumentsView, meta: { title: 'Документы — Энергия Доброты' } },
    { path: '/volunteers', component: VolunteersView, meta: { title: 'Донорам и волонтёрам — Энергия Доброты' } },
    { path: '/team', component: TeamView, meta: { title: 'Команда — Энергия Доброты' } },
    { path: '/press', component: PressView, meta: { title: 'СМИ о нас — Энергия Доброты' } },
  ],
})

router.afterEach((to) => {
  document.title = to.meta.title || 'Энергия Доброты'
})
