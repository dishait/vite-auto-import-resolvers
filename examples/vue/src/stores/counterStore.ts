export default defineStore("counter", () => {
  const counter = ref(100);
  const inc = () => counter.value++;
  return {
    inc,
    counter,
  };
});
