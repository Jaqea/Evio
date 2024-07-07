<template>
  <hover-container
    class="w-10 text-5"
    @click="app.toggleSiderCollapse"
    tooltip-content="折叠菜单"
  >
    <icon-line-md-menu-fold-right v-if="app.siderCollapse" />
    <icon-line-md-menu-unfold-left v-else />
  </hover-container>
</template>

<script lang="ts" setup>
import { useAppStore } from "@/store/modules";

defineOptions({
  name: "MenuCollapse",
});

const app = useAppStore();
</script>
