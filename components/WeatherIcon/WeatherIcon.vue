<template>
    <img :src="url" />
</template>
    
<script setup lang='ts'>
const props = defineProps({
    name: {
        type: String,
        default: '04n'
    }
});
const url = computed(() => {
    return 'http://openweathermap.org/img/w/' + props.name + '.png';
})
</script>
    
<style>
    
</style>