const { defineStore } = Pinia;
import { ref } from "vue";

export const useMessagesStore = defineStore('messages', () => {
  const queue = ref<any[]>([])
  function add (message: any) {
    queue.value.push(message)
  }

  return { queue, add }
})