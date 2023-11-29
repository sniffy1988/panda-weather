<template>
    <div>This is {{ city }} card</div>
</template>
    
<script setup lang='ts'>
import type { PropType } from 'vue'
const props = defineProps({
    city: {
        required: true,
        type: Object as PropType<iCity>
    }
})
</script>
    
<style>
    
</style>