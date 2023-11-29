<template>
    <div class="search">
        <h4 class="search__title">Search your city:</h4>
        <div class="search__actions">
            <div class="search__autocomplete">
                <input type="text" class="search__input" v-model="city">
                <Transition name="fade">
                    <div class="search__autocomplete__list" v-if="city">
                        <div v-for="city, idx in citiesList" :key="idx">{{ city }}</div>
                    </div>
                </Transition>

                {{ city }}
            </div>
            <button class="search__button" @click="makeSearch">Search</button>
        </div>
    </div>
</template>
    
<script setup lang='ts'>
const { $api } = useNuxtApp();
console.log($api.getCity('Kharkiv'))
const city = ref('');
const makeSearch = () => {
    console.log('searching')
}
const citiesList = ref(['City 1', 'City 2', 'City 3'])
</script>
    
<style>
    .search {
        @apply border mb-5 p-3;
    }
    .search__title {
        @apply mb-3 text-gray-900 font-bold;
    }
    .search__autocomplete {
        @apply mb-5;
    }
    .search__input {
        @apply px-3 py-2 border-2 mb-5 rounded-lg;
    }
    .search__button {
        @apply border-2 border-gray-800 text-black rounded-lg px-3 py-2 ml-3 bg-blue-300 hover:bg-blue-200 transition-colors;
    }
    .search__actions {
        @apply flex items-start;
    }
    .fade-enter-active,
    .fade-leave-active {
    transition: opacity 0.5s ease;
    }

    .fade-enter-from,
    .fade-leave-to {
    opacity: 0;
    }
</style>