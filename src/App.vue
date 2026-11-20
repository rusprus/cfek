<script setup>
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
import AppMenu from './components/AppMenu.vue'
import { ui } from './menu'

const route = useRoute()
const cookieOn = ref(false)

onMounted(() => {
  cookieOn.value = localStorage.getItem('cfek-cookie') !== '1'
})

watch(
  () => route.fullPath,
  () => {
    ui.menuOpen = false
  },
)

function acceptCookies() {
  localStorage.setItem('cfek-cookie', '1')
  cookieOn.value = false
}
</script>

<template>
  <AppHeader />
  <RouterView />
  <AppFooter />
  <AppMenu />
  <div v-if="cookieOn" class="cookie">
    <p>Сайт использует файлы cookie, чтобы страницы открывались стабильнее.</p>
    <button class="btn" type="button" @click="acceptCookies">Хорошо</button>
  </div>
</template>
