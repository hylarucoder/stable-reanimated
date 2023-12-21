import VTimelineToolbar from "@/components/VTimeline/Toolbar"
import VTimelineTrackLeftPanel from "@/components/VTimeline/TrackLeftPanel"
import VTimelineTracks from "@/components/VTimeline/Tracks"

export default defineComponent({
  setup() {
    const timeline = useTimelineStore()

    timeline.initBlocks()
    return () => (
      <div class="relative h-[--timeline-height] w-full border-x-[1px] border-b-[1px] border-zinc-100 bg-zinc-50 p-0">
        {/* VTimeToolbar */}
        <VTimelineToolbar />
        <div class="flex w-full  overflow-scroll">
          {/* VTimelineTrackLeftPanel */}
          <VTimelineTrackLeftPanel />
          {/* VTimelineTracks */}
          <VTimelineTracks />
        </div>
      </div>
    )
  },
})
