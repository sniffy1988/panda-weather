<template>
    <div class="search">
        <h4 class="search__title">Search your city:</h4>
        <div class="search__actions">
            <div class="search__autocomplete">
                <input type="text" class="search__input" v-model="city">
                <div class="search__autocomplete__list" v-if="isHaveList">
                    <TransitionGroup>
                        <div v-for="cityName, idx in citiesList" :key="idx" class="search__autocomplete__list__item">
                            <Transition name="fade">
                                <div class="search__autocomplete__list__item__text">
                                    {{ cityName }}
                                    <span class="search__autocomplete__list__item__icon" @click="addCity(cityName)"
                                        v-show="!isAlreadyHaveCity(cityName)">+</span>
                                    <span class="search__autocomplete__list__item__icon" @click="removeCity(cityName)"
                                        v-show="isAlreadyHaveCity(cityName)">-</span>
                                </div>
                            </Transition>
                        </div>
                    </TransitionGroup>
                </div>
            </div>
            <button class="search__button" @click="makeSearch">Search</button>
            <button class="search__button" @click="makeClear" v-if="city">Clear</button>
        </div>
    </div>
</template>
    
<script setup lang='ts'>
import { useCityStore } from '~/stores/city'

const PASSLIMIT = 3;
const { $api } = useNuxtApp();
const store = useCityStore();

const city = ref('');
const emits = defineEmits(['toggle'])

const makeSearch = async () => {
    if (city.value.length >= PASSLIMIT) {
        citiesList.value = await $api.getCity(city.value)
    }
}

const citiesList: Ref<any> = ref([]);

const isHaveList = computed(() => {
    return city.value && citiesList.value.length
});
const makeClear = () => {
    city.value = '';
}
const addCity = (city: string) => {
    store.addCity(city);
    emits('toggle');
}
const removeCity = (city: string) => {
    store.removeCity(city);
    emits('toggle');
}
const isAlreadyHaveCity = (name: string) => {
    return store.cities.find(el => el === name);
};
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

    .search__autocomplete__list {
        @apply border rounded-sm p-2;
    }
    .search__autocomplete__list__item {
        @apply border-b py-1 hover:bg-gray-400 px-0.5 text-sm;
        &:last-child {
            @apply border-none;
        }
    }

    .search__autocomplete__list__item__text {
        @apply flex justify-between items-center;
    }

    .search__autocomplete__list__item__icon {
        @apply p-1 bg-blue-200 rounded-lg w-5 h-5 text-center leading-none cursor-pointer hover:bg-blue-300;
    }

</style>