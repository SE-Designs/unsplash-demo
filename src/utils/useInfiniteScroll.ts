import { ref, watchEffect, onMounted } from 'vue'

export function useInfiniteScroll(p: number = 1, s: string = '') {
  const page = ref(p)
  const loading = ref(false)
  const error = ref()
  const data = ref()
  const totalPages = ref(1)
  const scroll = ref(0)
  const search = ref(s)

  const PAGE_SIZE = import.meta.env.VITE_SHOW
  const API_URL = import.meta.env.VITE_API_URL

  async function fetchData(search: string = '') {
    const QUERY = search.length === 0 ? '' : `&query=${search}`

    try {
      loading.value = true
      const response = await fetch(
        `${API_URL}&client_id=${import.meta.env.VITE_API_KEY}&page=${
          page.value
        }&per_page=${PAGE_SIZE}&count=${PAGE_SIZE}${QUERY}`
      )
      const json = await response.json()

      if (page.value === 1) {
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
      window.scrollTo(0, scroll.value)
      loading.value = false
    }
  }

  let scrollTimeout: number

  const handleScroll = () => {
    if (scrollTimeout) {
      clearTimeout(scrollTimeout)
    }

    scrollTimeout = setTimeout(() => {
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight

      console.log(scrollY)
      console.log(windowHeight)
      console.log(documentHeight)

      if (scrollY + windowHeight >= documentHeight - 100 && !loading.value) {
        page.value++
        scroll.value = scrollY
        fetchData(s)
      }
    }, 200)
  }

  watch(search, () => {
    page.value = 1
  })

  watchEffect(() => {
    fetchData()
  })

  onMounted(() => {
    window.addEventListener('scroll', handleScroll)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll)
  })

  return {
    data,
    loading,
    error,
    page,
    refetch: fetchData
  }
}
