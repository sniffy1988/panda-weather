
<template>
    <div class="cards">
        <div>
            <button @click="toggleSearch">{{ isSearchOpen ? 'Close' : "Open" }}</button>
            <SearchInput v-if="isSearchOpen" @toggle="toggleSearch" />
        </div>
        <div v-if="citiesList.length" class="cards__list">
            <div v-for="city, idx of citiesList" :key="idx" class="px-2 w-1/2 mb-2">
                <Card :city="city" />

            </div>
        </div>
        <DefaultCity v-else />
    </div>
</template>
    
<script setup lang='ts'>
import SearchInput from '~/components/SearchInput/SearchInput.vue';
import DefaultCity from '~/components/DefaultCity/DefaultCity.vue'
import Card from '~/components/Card/Card.vue'


import { useCityStore } from '~/stores/city';
const store = useCityStore();

const citiesList = computed(() => store.cities);
const isSearchOpen = ref(false);
const toggleSearch = () => {
    isSearchOpen.value = !isSearchOpen.value;
}
</script>
    
<style>
    .cards {
        &__list {
            @apply flex flex-wrap -mx-2;
        }
    }
</style>