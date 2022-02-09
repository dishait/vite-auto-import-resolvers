<script setup lang="ts">
    console.log(useFoo)

    const n = counterStore()
</script>

<template>
    <div @click="n.inc()">{{n.counter}}</div>
</template>