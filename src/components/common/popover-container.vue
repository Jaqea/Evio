<template>
  <div>
    <n-popover
      style="padding: 8px 10px"
      content-class="flex"
      :disabled="!showPopover"
      :placement="placement"
      :trigger="'hover'"
    >
      <template #trigger>
        <slot name="trigger"></slot>
      </template>
      <slot name="content"></slot>
    </n-popover>
  </div>
</template>

<script setup lang="ts">
import type { PopoverPlacement } from "naive-ui";

defineOptions({
  name: "PopoverContainer",
});

interface Props {
  showPopover?: boolean;
  placement?: PopoverPlacement;
}

withDefaults(defineProps<Props>(), {
  showPopover: true,
  placement: "bottom-start",
});
</script>
