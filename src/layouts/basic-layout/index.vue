<template>
  <n-layout has-sider class="text-size-base h-full">
    <n-layout-sider
      collapse-mode="width"
      :native-scrollbar="true"
      :collapsed="app.siderCollapse"
      :collapsed-width="theme.sider.collapsedWidth"
      :width="theme.sider.width"
      bordered
    >
      <global-sider />
    </n-layout-sider>
    <n-layout>
      <n-layout-header
        bordered
        position="absolute"
        class="h-17 pl-3 pr-3 pt-4 pb-4"
      >
        <global-header />
      </n-layout-header>
      <n-layout-content class="absolute left-0 right-0 top-17 bottom-17">
        <global-content />
      </n-layout-content>
      <n-layout-footer bordered position="absolute" class="p-3">
        <global-footer />
      </n-layout-footer>
    </n-layout>
  </n-layout>
</template>

<script setup lang="ts">
import { useAppStore, useThemeStore } from "@/store/modules";
import {
  GlobalHeader,
  GlobalSider,
  GlobalContent,
  GlobalFooter,
} from "@/layouts/common";

defineOptions({
  name: "BasicLayout",
});

const app = useAppStore();
const theme = useThemeStore();
</script>

<style scoped>
.n-layout-sider {
  background: rgba(128, 128, 128, 0.1);
}
</style>
