import { Button, Form, FormItem, InputNumber, Modal, Radio, RadioGroup } from "ant-design-vue"

export default defineComponent({
  setup(props, { emit }) {
    const storeVideoExport = useVideoExportStore()
    const { task, isActive } = storeToRefs(storeVideoExport)
    const optionsStore = useOptionsStore()
    const { optPerformances } = optionsStore
    const formStore = useFormStore()
    const { sizeOpts, size, duration, performance } = storeToRefs(formStore)

    const handleCloseModal = () => emit("closeModal")
    console.log("task", task.value)

    return () => (
      <Modal centered open title="Export" onClose={handleCloseModal}>
        {{
          default: () => (
            <div class="flex h-[400px] w-[500px] select-none">
              <div class="flex w-1/2 pr-5 pt-2">
                <div class="flex h-full w-full items-center justify-center bg-zinc-300">
                  <div class="flex-col">
                    <div>renderaing</div>
                    <div>{JSON.stringify(task.value)}</div>
                  </div>
                </div>
              </div>
              <div class="flex w-1/2">
                <Form layout="vertical">
                  <FormItem label="Performance" required>
                    <RadioGroup value={performance.value} onUpdate:value={(val) => (performance.value = val)}>
                      {optPerformances.map((opt) => (
                        <Radio key={opt.value} value={opt.value} label={opt.label}>
                          {opt.label}
                        </Radio>
                      ))}
                    </RadioGroup>
                  </FormItem>
                  <FormItem label="Duration(s)" required>
                    <InputNumber
                      value={duration.value}
                      class="text-left"
                      onUpdate:value={(val) => (duration.value = val)}
                    />
                  </FormItem>
                  <FormItem label="Output Size" required>
                    <RadioGroup value={size.value} onUpdate:value={(val) => (size.value = val)}>
                      {sizeOpts.value.map((opt) => (
                        <Radio key={opt.value} value={opt.value} label={opt.label}>
                          {opt.label}
                        </Radio>
                      ))}
                    </RadioGroup>
                  </FormItem>
                </Form>
              </div>
            </div>
          ),
          footer: () => (
            <>
              <Button key="back" onClick={handleCloseModal}>
                Return
              </Button>
              <Button
                key="submit"
                type="primary"
                loading={isActive.value}
                onClick={() => {
                  console.log("oncli")
                  storeVideoExport.submitExport()
                }}
              >
                Export
              </Button>
            </>
          ),
        }}
      </Modal>
    )
  },
})
