import { ref, watchEffect } from 'vue'

export function useFetch(url: string) {
  const data = ref()
  const error = ref()
  const loading = ref(false)

  async function fetchData() {
    try {
      loading.value = true
      const response = await fetch(url)
      const json = await response.json()
      data.value = json
    } catch (err) {
      error.value = err
    } finally {
      loading.value = false
    }
  }

  watchEffect(() => {
    fetchData()
  })

  return { data, loading, error }
}
