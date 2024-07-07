<template>
  <n-flex class="h-full" :justify="'flex-end'" :vertical="true">
    <n-flex
      class="flex-1"
      :justify="'center'"
      :align="'center'"
      :vertical="true"
    >
      <system-logo class="text-primary text-size-6xl mb-4" />
      <n-gradient-text type="primary" class="text-size-2xl">
        <span ref="chatTitle"> </span>
      </n-gradient-text>
    </n-flex>
    <message-input />
  </n-flex>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import TypeIt from "typeit";
import { useChatStore } from "@/store";

defineOptions({
  name: "NewChat",
});

const chatTitle = ref("");
const chat = useChatStore();
chat.clearConversationRecords();

onMounted(() => {
  new TypeIt(chatTitle.value, {
    strings: "Do you want to ask something?",
    // cursorChar: "|",
    // cursor: {
    // 	animation: {
    // 		frames: '',
    // 		options:''
    // 	}
    // },
    speed: 50,
    lifeLike: true,
    loop: true,
    loopDelay: 2000,
  }).go();
});
</script>
