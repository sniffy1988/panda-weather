<template>
    <Card :city="city" v-if="ipData" />
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
</style>