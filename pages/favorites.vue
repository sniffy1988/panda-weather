<template>
    <div class="grid">
        <div class="block" v-for="city, idx in citiesList" :key="idx">
            <div class="block__item">
                <Card :city="city" />
                <div class="block__item__actions">
                    <button @click="removeFromFav(city)">Remove from
                        fav</button>
                </div>
            </div>
        </div>
    </div>
</template>
    
<script setup lang='ts'>
const store = useCityStore();
const citiesList = computed(() => store.cities);

const removeFromFav = (city: any) => {
    store.removeCity(city);
}
</script>
    
<style>
    
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