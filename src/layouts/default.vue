<script setup lang="ts">
const menus = [
  {
    name: "首页",
    link: "/",
  },
  {
    name: "项目",
    link: "/projects",
  },
  {
    name: "模型",
    link: "/models",
  },
]
</script>
<template>
  <div class="m-0 flex h-full w-full flex-row bg-white p-0">
    <div class="flex w-[100px] min-w-[100px] flex-col items-center justify-between bg-zinc-500">
      <div class="flex w-full flex-col">
        <nuxt-link :to="menu.link" v-for="menu in menus">{{ menu.name }}</nuxt-link>
      </div>
      <div class="mb-3">
        <nuxt-link to="/help">帮助</nuxt-link>
      </div>
    </div>
    <div class="pt-15 mt-28 w-full bg-white pb-5 sm:mt-0 sm:py-5 sm:pb-4 sm:pt-5 dark:bg-zinc-800">
      <slot />
    </div>
  </div>
</template>
