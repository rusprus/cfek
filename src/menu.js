import { reactive } from 'vue'

export const ui = reactive({
  menuOpen: false,
})

export function openMenu() {
  ui.menuOpen = true
}

export function closeMenu() {
  ui.menuOpen = false
}
