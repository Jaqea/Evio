<template>
  <n-config-provider
    class="h-full"
    :theme="theme.naiveTheme"
    :theme-overrides="theme.naiveThemeOverrides"
    :locale="zhCN"
    :date-locale="dateZhCN"
  >
    <naive-provider>
      <router-view />
    </naive-provider>
  </n-config-provider>
</template>

<script setup lang="ts">
import { zhCN, dateZhCN } from "naive-ui";
import { useThemeStore, subscribeStore } from "@/store";

const theme = useThemeStore();

subscribeStore();
</script>
