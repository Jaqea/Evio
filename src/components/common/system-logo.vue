<template>
  <icon-local-logo-fill v-if="fill" />
  <icon-local-logo v-else />
</template>

<script setup lang="ts">
defineOptions({
  name: "SystemLogo",
});

interface Props {
  fill?: boolean;
}

withDefaults(defineProps<Props>(), {
  fill: false,
});
</script>
