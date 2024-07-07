<template>
  <div
    v-if="showTooltip"
    class="h-full flex-center cursor-pointer transition-duration-150 border-rd-2"
    :class="contentClassName"
  >
    <n-tooltip :placement="placement" trigger="hover">
      <template #trigger>
        <div>
          <slot></slot>
        </div>
      </template>
      {{ tooltipContent }}
    </n-tooltip>
  </div>
  <div
    v-else
    class="h-full flex-center cursor-pointer transition-duration-150 border-rd-2"
    :class="contentClassName"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { PopoverPlacement } from "naive-ui";
import { useThemeStore } from "@/store/modules";

defineOptions({
  name: "HoverContainer",
});

interface Props {
  tooltipContent: string;
  placement?: PopoverPlacement;
  contentClass?: string;
}

const props = withDefaults(defineProps<Props>(), {
  tooltipContent: "",
  placement: "bottom",
  contentClass: "",
});

const theme = useThemeStore();
const showTooltip = computed(() => Boolean(props.tooltipContent));
const contentClassName = computed(
  () =>
    `${props.contentClass} ${
      theme.darkMode ? "hover:bg-#333" : "hover:bg-#f6f6f6"
    }`
);
</script>
