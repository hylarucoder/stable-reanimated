import { RouterView } from "vue-router"
import "./assets/css/tailwind.css"
import "./assets/css/global.css"

export default defineComponent({
  name: "App",
  setup() {
    return () => <RouterView />
  },
})
