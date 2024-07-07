<template>
  <div class="flex-col-center h-full">
    <n-card
      :bordered="false"
      size="large"
      class="!w-auto z-1 rounded-2xl shadow-sm"
    >
      <div class="w-300px sm:w-360px">
        <header class="flex-y-center justify-between">
          <system-logo class="text-64px text-primary" />
          <n-gradient-text type="primary" :size="28">
            Ai Chat 云平台</n-gradient-text
          >
        </header>
        <main class="pt-24px">
          <h3 class="text-18px text-primary font-medium">
            {{ activeModule.label }}
          </h3>
          <div class="pt-24px">
            <transition name="slide-fade" mode="out-in" appear>
              <component :is="activeModule.component" />
            </transition>
          </div>
        </main>
      </div>
    </n-card>
    <login-bg />
  </div>
</template>

<script setup lang="ts">
import type { Component } from "vue";
import { computed } from "vue";
import { loginModuleLabels } from "@/constants";
import { LoginBg, CodeLogin, PwdLogin, Register, ResetPwd } from "./components";

defineOptions({
  name: "Login",
});

interface Props {
  /** 登录模块分类 */
  module: UnionKey.LoginModule;
}

interface LoginModule {
  key: UnionKey.LoginModule;
  label: string;
  component: Component;
}

const props = defineProps<Props>();
const modules: LoginModule[] = [
  {
    key: "pwd-login",
    label: loginModuleLabels["pwd-login"],
    component: PwdLogin,
  },
  {
    key: "code-login",
    label: loginModuleLabels["code-login"],
    component: CodeLogin,
  },
  {
    key: "register",
    label: loginModuleLabels["register"],
    component: Register,
  },
  {
    key: "reset-pwd",
    label: loginModuleLabels["reset-pwd"],
    component: ResetPwd,
  },
];

const activeModule = computed(() => {
  const active: LoginModule = { ...modules[0] };
  const findItem = modules.find((item) => item.key === props.module);
  if (findItem) {
    Object.assign(active, findItem);
  }
  return active;
});
</script>

<style lang="css" scoped>
.slide-fade-enter-active {
  transition: all 0.2s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
