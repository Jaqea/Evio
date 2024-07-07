<template>
  <img v-if="url" :src="url" alt="验证码" class="h-40px cursor-pointer" />
</template>

<script setup lang="ts">
defineOptions({
  name: "ImageVertify",
});

const url =
  "https://th.bing.com/th/id/OIP.rZTIuKMpfArWHhzptCT3zgAAAA?rs=1&pid=ImgDetMain";
</script>
