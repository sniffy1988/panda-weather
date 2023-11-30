<template>
  <div class="app">
    <div class="app__header">
      <div class="container mx-auto">
        <div class="app__header__nav">
          <NuxtLink to="/" class="app__header__nav__link">{{ $t('home') }}</NuxtLink>
          <NuxtLink to="/favorites" class="app__header__nav__link">{{ $t('favs') }}</NuxtLink>
          <a href="#" v-for="locale in availableLocales" :key="locale.code" class="hover:underline"
            @click.prevent.stop="changeLocale(locale.code)">{{ locale.name }}</a>
        </div>
      </div>
    </div>
    <div class="app__main">
      <div class="container mx-auto">
        <NuxtLayout>
          <NuxtPage />
        </NuxtLayout>
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
const { locale, locales, setLocale } = useI18n()

const availableLocales = computed(() => {
  return (locales.value).filter((i: any) => i.code !== locale.value)
});
const changeLocale = (locale: any) => {
  setLocale(locale);
}
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