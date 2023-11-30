<template>
  <div class="app">
    <div class="app__header">
      <div class="container mx-auto">
        <div class="app__header__nav">
          <NuxtLink to="/" class="app__header__nav__link">Home</NuxtLink>
          <NuxtLink to="/favorites" class="app__header__nav__link">Favs</NuxtLink>
        </div>
      </div>
    </div>
    <div class="app__main">
      <div class="container mx-auto">
        <NuxtPage />
        <div>
          TODO: 1. I18n 2. date-fns 3. Favs
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