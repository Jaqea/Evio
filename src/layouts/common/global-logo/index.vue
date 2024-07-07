<template>
  <router-link :to="routeHomePath" class="flex-center h-17 nowrap-hidden">
    <system-logo class="text-8 text-primary"> </system-logo>
    <h2
      v-show="showTitle"
      class="pl-2 text-4 font-bold text-primary transition duration-100 ease-in-out"
    >
      {{ VITE_APP_NAME }}
    </h2>
  </router-link>
</template>

<script setup lang="ts">
import { routePath } from "@/router";

defineOptions({
  name: "GlobalLogo",
});

interface Props {
  showTitle?: boolean;
}

withDefaults(defineProps<Props>(), {
  showTitle: true,
});

const routeHomePath = routePath("root");
const { VITE_APP_NAME } = import.meta.env;
</script>
