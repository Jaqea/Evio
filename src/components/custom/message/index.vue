<template>
  <transition name="slide-fade" mode="out-in" :appear="true">
    <div :class="msgClass.containerClass">
      <n-avatar
        :class="msgClass.avatarClass"
        :lazy="true"
        :round="true"
        :size="'medium'"
        src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
      />
      <div v-if="messageType === 'send'" :class="msgClass.contentClass">
        <div v-if="isEdit">
          <popover-container placement="bottom-end">
            <template #trigger>
              <n-input
                class="text-4"
                type="textarea"
                :value="reviseContent"
                :clearable="true"
                :maxlength="1000"
                :autosize="{ minRows: 1, maxRows: 5 }"
                @input="handleInput"
                @clear="handleClear"
              />
            </template>
            <template #content>
              <cancel-revise @handle-cancel="handleCancel" />
              <send-revise />
            </template>
          </popover-container>
        </div>
        <popover-container
          placement="bottom-end"
          :show-popover="!isEdit"
          v-else
        >
          <template #trigger>
            <n-card size="small" content-style="font-size:1rem;">
              {{ content }}
            </n-card>
          </template>
          <template #content>
            <edit-message @handle-edit="handleEdit" />
          </template>
        </popover-container>
      </div>
      <popover-container :class="msgClass.contentClass" v-else>
        <template #trigger>
          {{ content }}
        </template>
        <template #content>
          <copy-message :copy-content="content" />
        </template>
      </popover-container>
    </div>
  </transition>
</template>

<script setup lang="ts">
import type { Ref } from "vue";
import { ref, computed } from "vue";

defineOptions({
  name: "Message",
});

interface Props {
  /** 消息类型 */
  messageType: "send" | "back";
  /** 消息内容 */
  content: any;
}

const props = defineProps<Props>();

const isEdit: Ref<boolean> = ref(false);

const reviseContent: Ref<string> = ref(props.content);

const msgClass = computed(() => {
  const defaultClass = {
    containerClass: "flex mb-4",
    avatarClass: "mr-5",
    contentClass: "rd-6 font-medium ",
  };
  if (props.messageType === "back") {
    defaultClass.contentClass = `${defaultClass.containerClass} flex-1`;
  } else {
    defaultClass.containerClass = `${defaultClass.containerClass} flex-row-reverse`;
    defaultClass.avatarClass = "ml-5";
    defaultClass.contentClass = `${defaultClass.contentClass} max-w-7/10`;
  }

  return defaultClass;
});

const handleEdit = () => {
  isEdit.value = true;
};
const handleCancel = () => {
  isEdit.value = false;
};

const handleInput = (value: string) => {
  reviseContent.value = value;
};

const handleClear = () => {
  reviseContent.value = "";
};
</script>

<style lang="css" scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.4s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>
