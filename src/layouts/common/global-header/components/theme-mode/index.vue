<template>
  <hover-container
    class="w-10 text-5"
    @click="theme.changeNaiveTheme"
    tooltip-content="主题模式"
  >
    <icon-mdi-moon-waning-crescent v-if="theme.darkMode" />
    <icon-mdi-white-balance-sunny v-else />
  </hover-container>
</template>

<script lang="ts" setup>
import { useThemeStore } from "@/store/modules";

defineOptions({
  name: "ThemeMode",
});

const theme = useThemeStore();
</script>
