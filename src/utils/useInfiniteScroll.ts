import { ref, watchEffect, onMounted } from 'vue'

export function useInfiniteScroll(page: number, search: string = '') {
  const loading = ref(false)
  const error = ref()
  const data = ref()
  const totalPages = ref(1)

  const PAGE_SIZE = import.meta.env.VITE_SHOW
  const API_URL = import.meta.env.VITE_API_URL

  async function fetchData(search: string = '') {
    const QUERY = search.length === 0 ? '' : `&query=${search}`

    try {
      loading.value = true
      const response = await fetch(
        `${API_URL}&page=${page}&per_page=${PAGE_SIZE}&count=${PAGE_SIZE}${QUERY}`
      )
      const json = await response.json()

      if (page === 1) {
        data.value = json
      } else {
        data.value = data.value.concat(json)
      }

      console.log(data.value)

      if (response) {
        const totalHeader = response.headers.get('x-total')
        if (totalHeader) {
          totalPages.value = Math.ceil(parseInt(totalHeader, 10) / PAGE_SIZE)
        }
      }
    } catch (err) {
      error.value = err
    } finally {
      loading.value = false
    }
  }

  function handleScroll() {
    const scrollY = window.scrollY
    const windowHeight = window.innerHeight
    const documentHeight = document.documentElement.scrollHeight

    if (
      scrollY + windowHeight >= documentHeight - 300 &&
      !loading.value &&
      page < totalPages.value
    ) {
      page++
      fetchData()
    }
  }

  watchEffect(() => {
    fetchData()
  })

  onMounted(() => {
    window.addEventListener('scroll', handleScroll)
  })

  return {
    data,
    loading,
    error,
    page,
    refetch: fetchData
  }
}
