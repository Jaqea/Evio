<template>
  <n-space :vertical="true">
    <n-divider class="!mb-12px text-14px text-#666">其它账号登录</n-divider>
    <n-space justify="center">
      <n-button size="large" circle>
        <template #icon>
          <icon-logos:github-icon />
        </template>
      </n-button>
      <n-button size="large" circle>
        <template #icon>
          <icon-devicon:google />
        </template>
      </n-button>
    </n-space>
  </n-space>
</template>

<script setup lang="ts">
import { userRoleLabels } from "@/constants";

defineOptions({
  name: "OtherAccount",
});

interface Emits {
  (e: "login", param: { userName: string; password: string }): void;
}

interface Account {
  key: Auth.ThirdPartyLoginType;
  label: string;
  userName: string;
  password: string;
}

const emit = defineEmits<Emits>();

const accounts: Account[] = [
  {
    key: "github",
    label: userRoleLabels.github,
    userName: "github",
    password: "123456",
  },
  {
    key: "google",
    label: userRoleLabels.google,
    userName: "google",
    password: "123456",
  },
];
</script>
