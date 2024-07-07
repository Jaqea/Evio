<template>
  <hover-container
    v-if="isSupported"
    @click="copy(copyContent)"
    tooltip-content="复制"
    class="w-9 text-5"
  >
    <icon-radix-icons:copy v-if="!copied" />
    <icon-icon-park-outline:correct v-else />
  </hover-container>
  <p v-else>Your browser does not support Clipboard API</p>
</template>

<script setup lang="ts">
import { useClipboard } from "@vueuse/core";

defineOptions({
  name: "CopyMessage",
});

interface Props {
  copyContent: string;
}

const props = defineProps<Props>();
const { copy, copied, isSupported } = useClipboard({
  source: props.copyContent,
});
</script>
