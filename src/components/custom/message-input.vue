<template>
  <n-flex :align="'center'" class="w-1/2 mx-auto">
    <div class="flex-1">
      <n-input
        class="text-4"
        type="textarea"
        placeholder="给ChatGPT发送消息"
        :value="chat.question"
        :clearable="true"
        :show-count="true"
        :autofocus="true"
        :maxlength="1000"
        :autosize="{ minRows: 1, maxRows: 5 }"
        @input="handleInput"
        @clear="handleClear"
      />
    </div>
    <n-button circle :loading="sendLoading" @click="handleSubmit">
      <template #icon>
        <icon-cil:send />
      </template>
    </n-button>
  </n-flex>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { Ref } from "vue";
import { useChatStore } from "@/store";

interface Props {
  /** 聊天记录id */
  chatId?: string;
}

defineOptions({
  name: "MessageInput",
});

const props = withDefaults(defineProps<Props>(), {
  chatId: "",
});

const chat = useChatStore();

const sendLoading: Ref<boolean> = ref(false);

const handleSubmit = async () => {
  sendLoading.value = true;
  await chat.sendQuestion(props.chatId);
  sendLoading.value = false;
};

function handleInput(value: string) {
  chat.setQuestion(value);
}

function handleClear() {
  chat.clearQuestion();
}
</script>
