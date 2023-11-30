
<template>
    <div class="cards">
        <div class="grid">
            <div v-for="cit, idx of cities" :key="idx" v-if="cities.length" class="block">
                <div class="block__item" :class="{ 'block__item--fav': isInFav(cit.city) }">
                    <SearchInput @addCity="(city) => addCity(idx, city)" />
                    <DefaultCity v-if="cit.city === null" />
                    <Card :city="cit.city" v-else />
                    <div class="block__item__actions">
                        <button @click="removeCity(idx)" v-if="!(idx === 0 && cit.city === null)">Remove</button>
                        <button @click="addToFav(cit.city)" v-if="cit.city !== null && !isInFav(cit.city)">Add to
                            fav</button>
                        <button @click="removeFromFav(cit.city)" v-if="cit.city !== null && isInFav(cit.city)">Remove from
                            fav</button>
                    </div>
                </div>

            </div>
            <button @click="addBlock" class="block">
                <div class="block__item">
                    +
                </div>
            </button>
        </div>
    </div>
</template>
    
<script setup lang='ts'>
import SearchInput from '~/components/SearchInput/SearchInput.vue';
import DefaultCity from '~/components/DefaultCity/DefaultCity.vue'
import Card from '~/components/Card/Card.vue'


import { useCityStore } from '~/stores/city';
const store = useCityStore();

const cities = ref([{
    city: null
}]);
const citiesLimit = ref(5);

const addBlock = () => {
    if (cities.value.length < citiesLimit.value) {
        cities.value.push({
            city: null
        });
    } else {
        alert('To continue remove city')
    }
}


const addCity = (index: number, city: Icity) => {
    cities.value[index] = {
        city
    }
}

const removeCity = (idx: number) => {
    // show popup
    if (cities.value.length - 1 === 0) {
        cities.value = [{
            city: null
        }]
    } else {
        cities.value.splice(idx, 1)
    }
}

const addToFav = (city: iCity) => {
    store.addCity(city);
}

const isInFav = (city: iCity | null) => {
    if (city === null) {
        return false
    }

    const index = store.cities.findIndex(el => el.lat === city.lat && el.lon === city.lon)

    return index !== -1
}

const removeFromFav = (city: iCity) => {
    store.removeCity(city);
}

</script>
    
<style>
    .cards {
        &__list {
            @apply flex flex-wrap -mx-2;
        }
        &__grid {
            @apply flex flex-wrap -mx-2;
            &__item {
                @apply w-1/3;
            }
        }
    }

    .grid {
        @apply -mx-2 flex flex-wrap;
    }

    .block {
        @apply px-2 w-1/3  rounded-lg;

        &__item {
            @apply w-full border-2 p-2 rounded-lg border-green-700 hover:bg-gray-400;
            &--fav {
                @apply border-blue-700
            }

            &__actions {
                @apply mt-2;
            }

            button {
                @apply bg-blue-500 text-white mr-2 p-2 rounded-lg text-sm hover:bg-blue-600;
            }
        }
    }
</style>