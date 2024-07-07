<template>
  <n-form
    ref="formRef"
    :model="model"
    :rules="rules"
    :show-label="false"
    size="large"
  >
    <n-form-item path="userName">
      <n-input v-model:value="model.userName" :placeholder="'请输入用户名'" />
    </n-form-item>
    <n-form-item part="password">
      <n-input
        v-model:value="model.password"
        type="password"
        show-password-on="click"
        :placeholder="'请输入密码'"
      />
    </n-form-item>
    <n-space :vertical="true" :size="24">
      <div class="flex-y-center justify-between">
        <n-checkbox v-model:checked="rememberMe">
          {{ "记住密码" }}
        </n-checkbox>
        <n-button :text="true" @click="toLoginModule('reset-pwd')">
          {{ "忘记密码？" }}
        </n-button>
      </div>
      <n-button
        type="primary"
        size="large"
        :block="true"
        :round="true"
        :loading="auth.loginLoading"
        @click="handleSubmit"
      >
        {{ "确认" }}
      </n-button>
      <div class="flex-y-center justify-between">
        <n-button
          class="flex-1"
          :block="true"
          @click="toLoginModule('code-login')"
        >
          {{ loginModuleLabels["code-login"] }}
        </n-button>
        <div class="w-12px"></div>
        <n-button
          class="flex-1"
          :block="true"
          @click="toLoginModule('register')"
        >
          {{ loginModuleLabels["register"] }}
        </n-button>
      </div>
    </n-space>
    <other-account @login="handleLoginOtherAccount" />
  </n-form>
</template>

<script setup lang="ts">
import type { FormInst, FormRules } from "naive-ui";
import { reactive, ref } from "vue";
import { loginModuleLabels } from "@/constants";
import { useAuthStore } from "@/store";
import { useRouterPush } from "@/composables";
import { formRules } from "@/utils";
import { OtherAccount } from "./components";

defineOptions({
  name: "PwdLogin",
});

const auth = useAuthStore();
const { login } = useAuthStore();
const { toLoginModule } = useRouterPush();

const formRef = ref<HTMLElement & FormInst>();
const rememberMe = ref(false);

const model = reactive({
  userName: "Jaqea",
  password: "123456",
});

const rules: FormRules = {
  password: formRules.pwd,
};

async function handleSubmit() {
  await formRef.value?.validate();

  const { userName, password } = model;

  login(userName, password);
}

function handleLoginOtherAccount() {}
</script>
