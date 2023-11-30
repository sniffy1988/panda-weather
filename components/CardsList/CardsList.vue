
<template>
    <div class="cards">
        <div class="grid">
            <div v-for="cit, idx of cities" :key="idx" v-if="cities.length" class="block">
                <div class="block__item" :class="{ 'block__item--fav': isInFav(cit.city) }">
                    <SearchInput @addCity="(city) => addCity(idx, city)" />
                    <DefaultCity v-if="cit.city === null" />
                    <Card :city="cit.city" v-else />
                    <div class="block__item__actions">
                        <button @click="removeCity(idx)" v-if="!(idx === 0 && cit.city === null)">{{ $t('remove')
                        }}</button>
                        <button @click="addToFav(cit.city)" v-if="cit.city !== null && !isInFav(cit.city)">{{ $t('addFav')
                        }}</button>
                        <button @click="removeFromFav(cit.city)" v-if="cit.city !== null && isInFav(cit.city)">{{
                            $t('removeFav') }}</button>
                    </div>
                </div>

            </div>
            <button @click="addBlock" class="block">
                <div class="block__item">
                    +
                </div>
            </button>
        </div>
        <teleport to="body">
            <Transition name="fade">
                <Popup v-if="isDeletePopup">
                    <template #head>
                        <h4 class="popup__title">{{ $t('remove') }}</h4>
                    </template>
                    <template #actions>
                        <button class="popup__action popup__action--success" @click="onOkClick">{{ $t('ok') }}</button>
                        <button class="popup__action popup__action--fail" @click="closePopup">{{ $t('cancel') }}</button>
                    </template>
                </Popup>
            </Transition>
            <Transition name="fade">
                <Popup v-if="isDeleteFavPopup">
                    <template #head>
                        <h4 class="popup__title">{{ $t('removeFav') }}</h4>
                    </template>
                    <template #actions>
                        <button class="popup__action popup__action--success" @click="onOkFavClick">{{ $t('ok') }}</button>
                        <button class="popup__action popup__action--fail" @click="closePopup">{{ $t('cancel') }}</button>
                    </template>
                </Popup>
            </Transition>
            <Transition name="fade">
                <Popup v-if="isFullPopup">
                    <template #head>
                        <h4 class="popup__title">{{ $t('maxShow') }}</h4>
                    </template>
                    <template #actions>
                        <button class="popup__action popup__action--success" @click="isFullPopup = false">{{ $t('ok')
                        }}</button>
                    </template>
                </Popup>
            </Transition>
            <Transition name="fade">
                <Popup v-if="isFullFavPopup">
                    <template #head>
                        <h4 class="popup__title">{{ $t('maxFav') }}</h4>
                    </template>
                    <template #actions>
                        <button class="popup__action popup__action--success" @click="isFullFavPopup = false">{{ $t('ok')
                        }}</button>
                    </template>
                </Popup>
            </Transition>
        </teleport>
    </div>
</template>
    
<script setup lang='ts'>
import SearchInput from '~/components/SearchInput/SearchInput.vue';
import DefaultCity from '~/components/DefaultCity/DefaultCity.vue'
import Card from '~/components/Card/Card.vue'
import { useCityStore } from '~/stores/city';

const store = useCityStore();

const isDeleteFavPopup = ref(false);
const isDeletePopup = ref(false);
const isFullPopup = ref(false);
const isFullFavPopup = ref(false);
const toDelete = ref(null) as any;
const toDeleteFav = ref(null) as any;

const closePopup = () => {
    isDeleteFavPopup.value = false;
    isDeletePopup.value = false;
    toDelete.value = null;
    toDeleteFav.value = null;
}

const onOkClick = () => {
    if (cities.value.length - 1 === 0) {
        cities.value = [{
            city: null
        }]
    } else {
        cities.value.splice(toDelete.value, 1)
    }
    isDeletePopup.value = false;
}

const onOkFavClick = () => {
    store.removeCity(toDeleteFav.value);
    isDeleteFavPopup.value = false;
}
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
        isFullPopup.value = true;
    }
}


const addCity = (index: number, city: Icity) => {
    cities.value[index] = {
        city
    }
}

const removeCity = (idx: number) => {
    // show popup
    toDelete.value = idx;
    isDeletePopup.value = true;
}

const addToFav = (city: iCity) => {
    if (store.cities.length < store.limit) {
        store.addCity(city);
    } else {
        isFullFavPopup.value = true;
    }
}

const isInFav = (city: iCity | null) => {
    if (city === null) {
        return false
    }

    const index = store.cities.findIndex(el => el.lat === city.lat && el.lon === city.lon)

    return index !== -1
}

const removeFromFav = (city: iCity) => {
    isDeleteFavPopup.value = true;
    toDeleteFav.value = city;
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
        @apply px-2 w-full sm:w-1/2 lg:w-1/3 rounded-lg mb-2;

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