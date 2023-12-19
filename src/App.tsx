import { defineComponent, Transition, KeepAlive } from "vue"
import { RouterLink, RouterView } from "vue-router"
import "./assets/css/tailwind.css"
import "./assets/css/global.scss"

export default defineComponent({
  name: "App",
  setup() {
    return () => <RouterView />
  },
})
