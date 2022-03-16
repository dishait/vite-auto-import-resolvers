<script setup lang="ts">
	console.log(useFoo)

	console.log(useBar)

	const n = counterStore()

	console.log(foo)
	console.log(bar)
</script>

<template>
	<div @click="n.inc()">{{ n.counter }}</div>
</template>
