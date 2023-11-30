<template>
    <div class="weather">
        <Card :city="city" v-if="ipData" />
    </div>
</template>
    
<script setup lang='ts'>
import Card from '~/components/Card/Card.vue'

const ipData = ref(null) as unknown;
const { $api } = useNuxtApp();

onMounted(async () => {
    try {
        const res = await $api.getIpData()
        const data = await res.json();
        ipData.value = data;
    } catch (error) {
        console.log(error)
    }
});

const city = computed(() => {
    return {
        name: ipData.value.city,
        lat: ipData.value.latitude,
        lon: ipData.value.longitude
    }
})
</script>
    
<style>
    .weather {
        @apply border-2 rounded-lg p-2 border-blue-800;
        &__city {
            @apply font-bold italic text-lg text-gray-800;
        }
        &__temp {
            @apply text-sm text-gray-700 font-semibold;
        }
    }
</style>