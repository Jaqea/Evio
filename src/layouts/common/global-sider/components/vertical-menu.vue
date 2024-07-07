<template>
  <n-menu
    :dropdown-props="{
      menuProps,
    }"
    :options="menus"
    :value="activeKey"
    :expanded-keys="expandedKeys"
    :collapsed="app.siderCollapse"
    :collapsed-width="theme.sider.collapsedWidth"
    :collapsed-icon-size="24"
    :indent="18"
    @update:value="handleUpdateMenu"
    @update:expanded-keys="handleUpdateExpandKeys"
  />
</template>

<script lang="ts" setup>
import { ref, computed, watch } from "vue";
import { useRoute } from "vue-router";
import type { MenuOption, DropdownMenuProps } from "naive-ui";
import { useAppStore, useRouteStore, useThemeStore } from "@/store";
import { useRouterPush } from "@/composables";
import { getActiveKeyPathsOfMenus } from "@/utils";
import { HTMLAttributes } from "vue";

defineOptions({
  name: "VerticalMenu",
});

interface Props {
  /** 菜单类型 */
  type: "static" | "dynamic";
}

const props = defineProps<Props>();
const menus = computed(() => {
  if (props.type === "static") {
    return routeStore.staticMenus;
  } else {
    return routeStore.dynamicMenus;
  }
});

const route = useRoute();

const app = useAppStore();
const routeStore = useRouteStore();
const theme = useThemeStore();

const { routerPush } = useRouterPush();

const activeKey = computed(() =>
  route.meta.activeMenu ? route.meta.activeMenu : route.name
);
const expandedKeys = ref<string[]>([]);
const menuProps: DropdownMenuProps = () =>
  ({
    style: {
      maxHeight: "20rem",
      overflow: "auto",
    },
  } as unknown as HTMLAttributes & Record<string, string>);

function handleUpdateMenu(_key: string, item: MenuOption) {
  const menuItem = item as App.GlobalMenuOption;
  routerPush(menuItem.routePath);
}

function handleUpdateExpandKeys(keys: string[]) {
  expandedKeys.value = keys;
}

watch(
  () => route.name,
  () => {
    expandedKeys.value = getActiveKeyPathsOfMenus(
      activeKey.value,
      props.type === "static" ? routeStore.staticMenus : routeStore.dynamicMenus
    );
  },
  {
    immediate: true,
  }
);
</script>
