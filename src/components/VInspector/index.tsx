import VProjectSettingPanel from "./VProjectSettingPanel.tsx" // Assumed import
import VPromptPanel from "./VPromptPanel.tsx"

export default defineComponent({
  setup() {
    const panelView = useStoreLayout()
    const activeBlockStore = useActiveClip()
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
