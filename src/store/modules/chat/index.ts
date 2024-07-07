import { defineStore } from "pinia";
import { useRouteStore } from "@/store";
import {
  fetchHistoryConversationRecords,
  fetchNewConversation,
} from "@/service";
import { useRouterPush } from "@/composables";
import { showErrorMsg } from "@/utils";

interface ChatState {
  question: string;
  conversationRecords: Record[];
  currentRecord: Record;
}

interface Record {
  type: "back" | "send";
  content: string;
}

export const useChatStore = defineStore("chat-store", {
  state: (): ChatState => ({
    question: "",
    conversationRecords: [],
    currentRecord: { type: "back", content: "" },
  }),
  actions: {
    /** 设置对话问题 */
    setQuestion(message: string) {
      this.question = message;
    },
    /** 清空对话问题 */
    clearQuestion() {
      this.question = "";
    },
    /**
     * 发送问题
     * @param chatId - 某一对话id
     */
    async sendQuestion(chatId?: string) {
      this.conversationRecords.push({
        type: "send",
        content: this.question,
      });
      const hasChatId = Boolean(chatId);

      const response = await fetchNewConversation(this.question, chatId);
      this.clearQuestion();
      if (response.status !== 200) {
        showErrorMsg({
          type: "http",
          code: response.status,
          msg: response.statusText,
        });
      } else {
        if (response.body) {
          if (hasChatId) {
            await this.handleBackConversationRecords(response.body);
          } else {
            const { clearDynamicMenus, initDynamicRoute } = useRouteStore();
            clearDynamicMenus();
            await initDynamicRoute();
            const router = useRouterPush(false);
            router.routerPush({
              name: "multi-chat_a7225d55-c1e7-42a0-b3be-095bea3aacd7",
            });
          }
        }
      }
    },
    /** 处理返回对话记录 */
    async handleBackConversationRecords(data: ReadableStream<Uint8Array>) {
      this.conversationRecords.push({
        type: "back",
        content: "",
      });
      const reader = data.getReader();
      while (true) {
        const { value, done } = await reader.read();
        if (done) {
          break;
        } else {
          const content = JSON.parse(new TextDecoder().decode(value));
          const newRecord =
            this.conversationRecords[this.conversationRecords.length - 1];
          newRecord.content = content.step;
        }
      }
    },
    /** 获取某一对话记录 */
    async getConversationRecords() {
      this.conversationRecords = (await fetchHistoryConversationRecords(
        ""
      )) as unknown as Record[];
    },
    /** 清空某一对话记录 */
    clearConversationRecords() {
      this.conversationRecords = [];
    },
  },
});
