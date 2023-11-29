<!-- Switcher.vue -->
<template>
    <div class="relative inline-block w-10 h-6 rounded-2xl" :class="{ 'bg-blue-500': isChecked, 'bg-gray-300': !isChecked }"
        @click="toggleSwitch">
        <input type="checkbox" :checked="isChecked" class="hidden" @change.stop="toggleSwitch" />
        <div class="slider w-6 h-6 rounded-full cursor-pointer absolute top-0 left-0 transition-transform duration-300 ease-in-out transform"
            :class="{ 'translate-x-4': isChecked, 'translate-x-0': !isChecked }">
            <div class="indicator bg-white w-6 h-6 rounded-full shadow-md transition-transform duration-300 ease-in-out">
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';

const { checked: propChecked } = defineProps(['checked']);
const emit = defineEmits();

const isChecked = ref(propChecked);

const toggleSwitch = () => {
    isChecked.value = !isChecked.value;
    emit('change', isChecked.value);
};
</script>

<style scoped>
/* No need for styles here since Tailwind CSS classes are used directly */
</style>
