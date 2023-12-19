import type { PropType } from "vue"
import { formatProxyMedia } from "@/client"
import { Popover, Select, SelectOption } from "ant-design-vue"

interface TOptions {
  value: string
  label: string
  thumbnail?: string
}

export default defineComponent({
  props: {
    modelValue: {
      type: String,
      default: "",
    },
    options: {
      type: Array as PropType<TOptions[]>,
      default: () => [],
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const selectedValue = ref(props.modelValue || "")

    watch(selectedValue, (newVal) => {
      emit("update:modelValue", newVal)
    })
    // console.log("selectedValue", selectedValue.value, props.options)

    return () => (
      <Select
        value={selectedValue.value}
        onUpdate:value={(v) => {
          selectedValue.value = v
        }}
        showSearch
      >
        {props.options.map((opt) => (
          <SelectOption
            key={opt.value}
            value={opt.value}
            label={opt.label}
            title={opt.label}
            style={{ width: "100%" }}
          >
            {opt.thumbnail ? (
              <Popover mouseEnterDelay={0.02} style={{ zIndex: 1000 }} class="rounded-xl p-0" placement="right">
                {{
                  content: () => <img class="max-w-[300px]" src={formatProxyMedia(opt.thumbnail)} />,
                  default: () => <span>{opt.label}</span>,
                }}
              </Popover>
            ) : (
              <span>{opt.label}</span>
            )}
          </SelectOption>
        ))}
      </Select>
    )
  },
})
