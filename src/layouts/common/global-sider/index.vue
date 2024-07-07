<template>
  <div class="flex-col-stretch h-full">
    <global-logo :show-title="showTitle" />
    <vertical-menu type="static" />
    <n-divider />
    <n-scrollbar class="flex-1-hidden"
      ><vertical-menu type="dynamic" />
    </n-scrollbar>
    <n-divider />
    <n-flex justify="center" align="center" class="h-12 overflow-hidden">
      <icon-meteocons:star-fill class="text-10" />
      <span v-if="showTitle" class="text-3"> 喜欢就点个Star吧~ </span>
    </n-flex>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useAppStore } from "@/store";
import { GlobalLogo } from "@/layouts/common";
import { VerticalMenu } from "./components";

defineOptions({
  name: "GlobalSider",
});

const app = useAppStore();
const showTitle = computed(() => !app.siderCollapse);
</script>

<style scoped>
.n-divider {
  margin-bottom: 0;
  margin-top: 0;
}
</style>
