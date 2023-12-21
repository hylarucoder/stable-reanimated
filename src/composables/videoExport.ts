import { formatProxyMedia, getTaskStatus, interruptTask, submitTask } from "@/client"
import { message } from "ant-design-vue"

export enum TStatus {
  PENDING = "PENDING",
  RUNNING = "RUNNING",
  LOADING = "LOADING",
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
}

type TSubtask = {
  status: TStatus
  description: string
  completed: number
  total: number
}

type TOverallTask = {
  pid: number
  status: TStatus
  completed: number
  total: number
  videoPath: string
  interruptProcessing: boolean
  processingInterrupted: boolean
  subtasks: TSubtask[]
}

const defaultTask: TOverallTask = {
  pid: 0,
  status: TStatus.PENDING,
  completed: 0,
  total: 100,
  videoPath: "",
  subtasks: [],
  interruptProcessing: false,
  processingInterrupted: true,
}

export const useVideoExportStore = defineStore("videoExport", () => {
  const modalVisible = ref(false)
  const formStore = useFormStore()
  const timelineStore = useTimelineStore()
  const { promptBlocks } = timelineStore
  const videoPlayerStore = useVideoPlayer()
  const task = ref<TOverallTask>(defaultTask)
  const showModal = () => {
    modalVisible.value = true
  }
  const hideModal = () => {
    modalVisible.value = false
  }

  const { pause, resume, isActive } = useIntervalFn(async () => {
    try {
      const res = (await getTaskStatus({
        pid: task.value.pid,
      })) as TOverallTask
      console.log("resssw", res)
      if (!res?.pid) {
        console.log("error no pid", res)
        task.value.status = TStatus.ERROR
        pause()
        return
      }
      task.value.pid = res.pid
      task.value.status = res.status
      task.value.completed = res.completed
      task.value.total = res.total
      task.value.subtasks = res.subtasks.filter((x) => x.completed > 0)
      task.value.interruptProcessing = res.interruptProcessing
      task.value.processingInterrupted = res.processingInterrupted
      if (res.status == "ERROR") {
        console.log("status error pause", res.status)
        pause()
        return
      }

      if (!res?.videoPath) {
        return
      }
      task.value.videoPath = res.videoPath
      videoPlayerStore.loadVideo(formatProxyMedia(res.videoPath))
      hideModal()
      // player.reloadVideo()
      pause()
    } catch (e) {}
  }, 2000)
  onMounted(() => pause())

  const submitExport = async () => {
    task.value.pid = 0
    task.value.status = TStatus.PENDING
    task.value.completed = 0
    task.value.total = 100
    task.value.videoPath = ""

    const data = {
      project: formStore.project,
      performance: formStore.performance,
      aspectRatio: formStore.aspectRatio,
      prompt: formStore.prompt,
      negativePrompt: formStore.negativePrompt,
      checkpoint: formStore.checkpoint,
      loras: formStore.loras,
      motion: formStore.motion,
      cameraControl: formStore.cameraControl,
      highRes: formStore.highRes,
      fps: formStore.fps,
      duration: formStore.duration,
      seed: formStore.seed,
      promptBlocks: promptBlocks.map((x) => {
        return {
          start: x.start,
          prompt: x.prompt,
        }
      }),
    }
    try {
      const res = await submitTask(data)
      task.value.pid = res.pipeline.pid
      resume()
    } catch (e) {
      console.log("generate error", e)
      message.error(e.message)
      task.value.status = TStatus.ERROR
    }
  }

  const cancelExport = async () => {
    const data = {
      pid: task.value.pid,
    }
    try {
      await interruptTask(data)
    } catch (e) {
      console.log("generate error", e)
      message.error(e.message)
    }
  }

  return {
    task,
    isActive,
    modalVisible,
    cancelExport,
    submitExport,
    showModal,
    hideModal,
  }
})
