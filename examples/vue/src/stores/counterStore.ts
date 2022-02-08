const counter = ref(100)

export default () => {
	const inc = (v: number = 1) => (counter.value += v)
	return {
		inc,
		counter
	}
}
