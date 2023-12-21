import { useActiveBlockStore } from "@/composables/block"
import VProjectSettingPanel from "./VProjectSettingPanel" // Assumed import
import VPromptPanel from "./VPromptPanel"
import { storeToRefs } from "pinia" // Assumed import

export default defineComponent({
  setup() {
    const panelView = usePanelView()
    const activeBlockStore = useActiveBlockStore()
    const { block: activeBlock } = storeToRefs(activeBlockStore)
    const { projectSetting } = storeToRefs(panelView)

    return () => (
      <div class="relative w-[400px] overflow-auto border-b-[1px] border-r-[1px] border-zinc-100 px-5">
        {projectSetting.value && <VProjectSettingPanel />}
        {activeBlock.value && <VPromptPanel class="absolute left-0 top-0 z-10 bg-white" />}
      </div>
    )
  },
})
