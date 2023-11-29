
<template>
    <div>
        <button @click="toggleSearch">{{ isSearchOpen ? 'Close' : "Open" }}</button>
        <SearchInput v-if="isSearchOpen" @toggle="toggleSearch" />
        <div v-for="city, idx of citiesList" :key="idx" v-if="citiesList.length">
            <Card :city="city" />
        </div>
        <DefaultCity v-else />
        <div>Store is: {{ citiesList }}</div>
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
    
</style>