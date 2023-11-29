<template>
    <div>This is {{ city }} card</div>
</template>
    
<script setup lang='ts'>
const props = defineProps({
    city: {
        required: true,
        type: String
    }
})
</script>
    
<style>
    
</style>