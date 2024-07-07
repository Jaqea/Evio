<template>
  <div class="flex-col-center gap-6 min-h-lg h-full overflow-hidden">
    <div class="flex text-400px text-primary">
      <icon-local-no-permission v-if="type === '403'" />
      <icon-local-not-found v-if="type === '404'" />
      <icon-local-service-error v-if="type === '500'" />
    </div>
    <router-link :to="{ name: routerHomeName }">
      <n-button type="primary">回到首页</n-button>
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { routeName } from "@/router";

defineOptions({
  name: "ExceptionBase",
});

type ExceptionType = "403" | "404" | "500";

interface Props {
  /** 异常类型 */
  type: ExceptionType;
}

defineProps<Props>();

const routerHomeName = routeName("root");
</script>
