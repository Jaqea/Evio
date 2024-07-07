<template>
  <n-flex class="h-full" justify="flex-end" :vertical="true">
    <n-scrollbar class="flex-1">
      <div class="max-w-1/2 mx-auto">
        <n-divider />
        <div ref="msgs" v-for="item in chat.conversationRecords">
          <Message :content="item.content" :message-type="item.type" />
        </div>
      </div>
    </n-scrollbar>
    <message-input :chatId="chatId" />
  </n-flex>
</template>

<script setup lang="ts">
import type { Ref } from "vue";
import { ref, watch, nextTick } from "vue";
import { useChatStore } from "@/store";

interface Props {
  /** 聊天记录id */
  chatId: string;
}

defineOptions({
  name: "Chat",
});

defineProps<Props>();
const msgs = ref<HTMLAllCollection>();

const chat = useChatStore();
chat.getConversationRecords();

let unwatch;
const scrollToBottom = () => {
  unwatch = watch(
    () => chat.conversationRecords,
    (newValue) => {
      nextTick(() => {
        (msgs as Ref<HTMLAllCollection>).value[
          newValue.length - 1
        ].scrollIntoView();
      });
    },
    {
      deep: true,
    }
  );
};

scrollToBottom();

// let lastScrollTop = 0;
// const handleScroll = (e: Event) => {
//   const scrollTop = (e.target as HTMLElement).scrollTop;

//   if (scrollTop < lastScrollTop) {
//     unwatch();
//   }
//   lastScrollTop = scrollTop;
// };
</script>
