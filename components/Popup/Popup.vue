<template>
    <div class="popup">
        <div class="popup__wrapper">
            <div class="popup__head">
                <slot name="head"></slot>
            </div>
            <div class="popup__body">
                <slot name="body"></slot>
            </div>
            <div class="popup__actions">
                <slot name="actions"></slot>
            </div>
        </div>
    </div>
</template>
    
<script setup lang='ts'>

</script>
    
<style>
    .popup {
        @apply fixed z-50 w-screen h-screen inset-0 bg-black bg-opacity-50 flex items-center;
        &__wrapper {
            @apply w-72 mx-auto my-auto bg-white p-3 rounded-xl;
        }
    }
</style>