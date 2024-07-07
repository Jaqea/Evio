<template>
  <n-form
    ref="formRef"
    :model="model"
    :rules="rules"
    size="large"
    :show-label="false"
  >
    <n-form-item path="phone">
      <n-input v-model:value="model.phone" placeholder="请输入电话号码" />
    </n-form-item>
    <n-form-item path="code">
      <div class="flex-y-center justify-between w-full">
        <n-input v-model:value="model.code" placeholder="请输入验证码" />
        <div class="pr-18px"></div>
        <n-button
          type="primary"
          size="large"
          :disabled="isCounting"
          :loading="smsLoading"
          @click="handleSmsCode"
        >
          {{ label }}
        </n-button>
      </div>
    </n-form-item>
    <n-form-item path="imgCode">
      <n-input v-model:value="model.imgCode" placeholder="请输入图片验证码" />
      <div class="pl-8px">
        <image-vertify v-model:code="imgCode" />
      </div>
    </n-form-item>
    <n-space :vertical="true" :size="18">
      <n-button
        type="primary"
        size="large"
        :block="true"
        :round="true"
        :loading="auth.loginLoading"
        @click="handleSubmit"
      >
        确认
      </n-button>
      <n-button
        size="large"
        :block="true"
        :round="true"
        @click="toLoginModule('pwd-login')"
      >
        返回
      </n-button>
    </n-space>
  </n-form>
</template>

<script setup lang="ts">
import type { FormInst, FormRules } from "naive-ui";
import { reactive, ref } from "vue";
import { formRules, getImgCodeRule } from "@/utils";
import { useAuthStore } from "@/store";
import { useRouterPush } from "@/composables";
import { ImageVertify } from "./components";

defineOptions({
  name: "CodeLogin",
});

const auth = useAuthStore();
const { toLoginModule } = useRouterPush();

const formRef = ref<HTMLElement & FormInst>();

const model = reactive({
  phone: "",
  code: "",
  imgCode: "",
});
const imgCode = ref("");
const rules: FormRules = {
  phone: formRules.phone,
  code: formRules.code,
  imgCode: getImgCodeRule(imgCode),
};

const isCounting = ref(false);
const smsLoading = ref(false);
const label = ref("获取验证码");
let count = ref(0);

function handleSmsCode() {
  new Promise((resolve) => {
    smsLoading.value = true;
    label.value = "";
    setTimeout(() => {
      resolve(true);
    }, 2000);
  }).then(() => {
    return new Promise((resolve) => {
      smsLoading.value = false;
      isCounting.value = true;
      count.value = 30;
      label.value = `${count.value}秒后重新发送`;
      const timer = setInterval(() => {
        if (count.value > 0) {
          --count.value;
          label.value = `${count.value}秒后重新发送`;
        } else {
          clearInterval(timer);
          resolve(true);
        }
      }, 1000);
    }).then(() => {
      label.value = "获取验证码";
      isCounting.value = false;
      smsLoading.value = false;
      label.value = "获取验证码";
    });
  });
}

async function handleSubmit() {
  await formRef.value?.validate();
  window.$message?.success("验证成功");
}
</script>
