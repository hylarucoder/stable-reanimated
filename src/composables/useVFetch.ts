import { createFetch } from "@vueuse/core"
import { API_URL, MEDIA_URL } from "@/consts"

const useVFetch = createFetch({
  baseUrl: API_URL,
  options: {
    async beforeFetch({ options }) {
      // const myToken = await getMyToken()
      // options.headers.Authorization = `Bearer ${myToken}`

      return { options }
    },
  },
  fetchOptions: {
    mode: "cors",
  },
})
