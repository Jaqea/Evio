<template>
  <hover-container
    class="w-10 text-5"
    tooltip-content="新建聊天"
    @click="toNewChat"
  >
    <icon-solar:pen-new-square-broken />
  </hover-container>
</template>

<script setup lang="ts">
import { useRouterPush } from "@/composables";

defineOptions({
  name: "NewChat",
});

const { routerPush } = useRouterPush();

function toNewChat() {
  routerPush({ name: "model" });
}
</script>
