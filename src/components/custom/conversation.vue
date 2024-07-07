<template>
  <n-flex class="h-full" justify="flex-end" :vertical="true">
    <n-scrollbar class="flex-1">
      <div class="max-w-1/2 mx-auto">
        <n-divider />
        <Message
          v-for="item in chat.conversation"
          :content="item.content"
          :message-type="item.type"
        />
      </div>
    </n-scrollbar>
    <MessageInput />
  </n-flex>
</template>

<script setup lang="ts">
import { useChatStore } from "@/store";

defineOptions({
  name: "conversation",
});

const chat = useChatStore();
</script>
