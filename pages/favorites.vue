<template>
    <div class="grid">
        <div class="block" v-for="city, idx in citiesList" :key="idx">
            <div class="block__item">
                <Card :city="city" />
                <div class="block__item__actions">
                    <button @click="removeFromFav(city)">{{ $t('removeFav') }}</button>
                </div>
            </div>
        </div>
    </div>
    <teleport to="body">
        <Transition name="fade">
            <Popup v-if="isPopupOpen">
                <template #head>
                    <h4 class="popup__title">Remove from Fav</h4>
                </template>
                <template #actions>
                    <button class="popup__action popup__action--success" @click="onOkClick">Ok</button>
                    <button class="popup__action popup__action--fail" @click="closePopup">Cancel</button>
                </template>
            </Popup>
        </Transition>

    </teleport>
</template>
    
<script setup lang='ts'>
const store = useCityStore();
const citiesList = computed(() => store.cities);
const isPopupOpen = ref(false);
const toDelete = ref(null);

const removeFromFav = (city: any) => {
    toDelete.value = city;
    isPopupOpen.value = true;
}
const onOkClick = () => {
    if (toDelete.value !== null) {
        store.removeCity(toDelete.value as ICity);
    }
    closePopup();
}
const closePopup = () => {
    toDelete.value = null;
    isPopupOpen.value = false;
}
</script>
    
<style>
    
    .grid {
        @apply -mx-2 flex flex-wrap;
    }

    .block {
        @apply px-2 w-full sm:w-1/2 lg:w-1/3 rounded-lg;

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

    .popup__title {
        @apply uppercase font-bold py-2;
    }
    .popup__action {
        @apply px-2 py-1 text-center rounded-lg mx-5;
        &:first-of-type {
            @apply ml-0;
        }

        &--success{
            @apply bg-green-300 hover:bg-green-200 mr-auto;
        }
        &--fail{
            @apply bg-red-300 hover:bg-red-200 mr-auto;
        }
    }
</style>