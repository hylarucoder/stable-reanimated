import { Button, Form, FormItem } from "ant-design-vue"
import VPromptInput from "@/components/VPromptInput"

export default defineComponent({
  setup() {
    const activeBlock = useActiveBlockStore()
    const { block, refInput } = toRefs(activeBlock)
    const { onFocus, onBlur, deleteBlock } = activeBlock

    onMounted(() => {
      if (refInput.value) {
        refInput.value.focus()
      }
    })

    return () => {
      if (!block.value) {
        return <div>error</div>
      } else {
        return (
          <div class="timeline-track-block-editor min-h-full w-full p-5">
            <Form layout="vertical">
              <FormItem label="Time"> {(block.value.start / 1000).toFixed(1)}s</FormItem>
              <FormItem label="Prompt">
                <VPromptInput
                  ref={refInput}
                  onFocus={onFocus}
                  onBlur={onBlur}
                  autoFocus
                  value={block.value.prompt}
                  onUpdate:value={(v) => {
                    block.value.prompt = v
                  }}
                />
              </FormItem>
              <Button onClick={deleteBlock}>Save</Button>
            </Form>
          </div>
        )
      }
    }
  },
})
