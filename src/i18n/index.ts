import { computed, ref, watch } from 'vue'
import { locales, messages, type Locale, type Messages } from './messages'

export { locales, localeNames, type Locale } from './messages'

// Shared with the static project pages in public/, which read the same key.
const STORAGE_KEY = 'locale'

function initialLocale(): Locale {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved && (locales as readonly string[]).includes(saved)) return saved as Locale
  } catch {
    /* storage unavailable */
  }
  for (const lang of navigator.languages ?? [navigator.language]) {
    const code = lang.toLowerCase().slice(0, 2)
    if ((locales as readonly string[]).includes(code)) return code as Locale
  }
  return 'en'
}

const locale = ref<Locale>(initialLocale())

function applyLocale(l: Locale) {
  document.documentElement.lang = l
  document
    .querySelector('meta[name="description"]')
    ?.setAttribute('content', messages[l].meta.description)
  try {
    localStorage.setItem(STORAGE_KEY, l)
  } catch {
    /* storage unavailable */
  }
}

watch(locale, applyLocale, { immediate: true })

const t = computed<Messages>(() => messages[locale.value])

export function useI18n() {
  return {
    locale,
    t,
    setLocale: (l: Locale) => (locale.value = l),
  }
}
