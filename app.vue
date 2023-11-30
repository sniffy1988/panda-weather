<template>
  <div class="app">
    <div class="app__header">
      <div class="container mx-auto">
        <div class="app__header__nav">
          <NuxtLink to="/" class="app__header__nav__link">{{ $t('home') }}</NuxtLink>
          <NuxtLink to="/favorites" class="app__header__nav__link">{{ $t('favs') }}</NuxtLink>
          <NuxtLink v-for="locale in availableLocales" :key="locale.code" :to="switchLocalePath(locale.code)">{{
            locale.name
          }}</NuxtLink>
        </div>
      </div>
    </div>
    <div class="app__main">
      <div class="container mx-auto">
        <NuxtLayout>
          <NuxtPage />
        </NuxtLayout>
        <div>
          TODO: 1. I18n 4. responsive 3. Popups
        </div>
      </div>
    </div>
    <div class="app__footer">
      <div class="container mx-auto">
        &copy; 2023 A.Lobodenko
      </div>
    </div>
  </div>
</template>
  
<script setup lang='ts'>
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const availableLocales = computed(() => {
  return (locales.value).filter(i => i.code !== locale.value)
})
</script>
  
<style>
html, body, #__nuxt {
  @apply min-h-screen;
}
  .app {
    @apply flex flex-col h-full min-h-screen;
    &__header {
      @apply bg-gray-400 text-white px-2 py-4 mb-5;
      &__nav {
        @apply flex;
        &__link {
          @apply mr-2 hover:underline px-2;
          &.router-link-exact-active {
            @apply text-gray-50 underline;
          }
        }
      }
    }
    &__footer {
      @apply mt-auto px-2 py-4 bg-gray-600 text-white;
    }
  }
</style>