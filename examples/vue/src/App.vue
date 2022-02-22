<script setup lang="ts">
console.log(useFoo)

console.log(useBar)

console.log(kk)
const n = counterStore()
</script>

<template>
    <div @click="n.inc()">{{ n.counter }}</div>
</template>