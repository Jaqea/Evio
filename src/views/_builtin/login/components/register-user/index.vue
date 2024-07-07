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
    <n-form-item path="pwd">
      <n-input
        v-model:value="model.pwd"
        type="password"
        show-password-on="click"
        placeholder="请输入密码"
      />
    </n-form-item>
    <n-form-item path="confirmPwd">
      <n-input
        v-model:value="model.confirmPwd"
        type="password"
        show-password-on="click"
        placeholder="请再次输入密码"
      />
    </n-form-item>
    <n-space :vertical="true" :size="18">
      <n-button
        type="primary"
        size="large"
        :block="true"
        :round="true"
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
import { reactive, ref, toRefs } from "vue";
import type { FormInst, FormRules } from "naive-ui";
import { useRouterPush } from "@/composables";
import { formRules, getConfirmPwdRule } from "@/utils";

defineOptions({
  name: "RegisterUser",
});

const { toLoginModule } = useRouterPush();

const formRef = ref<HTMLElement & FormInst>();

const model = reactive({
  phone: "",
  code: "",
  pwd: "",
  confirmPwd: "",
});

const rules: FormRules = {
  phone: formRules.phone,
  code: formRules.code,
  pwd: formRules.pwd,
  confirmPwd: getConfirmPwdRule(toRefs(model).pwd),
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
