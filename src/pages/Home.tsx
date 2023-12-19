import { useOptionsStore } from "@/composables/options"
import { useActiveBlockStore } from "@/composables/block"
import { Spin } from "ant-design-vue"
import VMenubar from "@/components/VMenubar"
import VMainPlayer from "@/components/VMainPlayer"
import VRightSidebar from "@/components/VRightSidebar"
import VTimeline from "@/components/VTimeline"

export default defineComponent({
  setup() {
    const optionsStore = useOptionsStore()
    const { optionLoaded } = toRefs(optionsStore)
    const activeBlock = useActiveBlockStore()

    // // Initialize options store
    // onMounted(async () => {
    //   await optionsStore.init()
    // })

    // Clean block handler
    const cleanBlock = useThrottleFn(() => {
      console.log("Clicked outside of .timetrack-block and .timetrack-block-editor")
      activeBlock.deleteBlock()
    }, 1000)

    // Click event handler
    const handleClickOutside = (event) => {
      const isClickInsideElement =
        event?.target?.closest(".timeline-track-block") || event?.target?.closest(".timeline-track-block-editor")

      if (!isClickInsideElement) {
        cleanBlock()
      }
    }

    // Add event listener
    onMounted(() => {
      document.addEventListener("click", handleClickOutside)
    })

    // Remove event listener
    onUnmounted(() => {
      document.removeEventListener("click", handleClickOutside)
    })
    optionsStore.init()

    return () => (
      <>
        <div>loading</div>

        {!optionLoaded.value ? (
          <Spin />
        ) : (
          <div class="h-screen w-full p-0 px-0">
            <VMenubar class="border-1" />
            <div class="border-x-1 border-b-1 flex h-[--workspace-height] justify-between">
              <VMainPlayer />
              <VRightSidebar />
            </div>
            <VTimeline />
          </div>
        )}
      </>
    )
  },
})
