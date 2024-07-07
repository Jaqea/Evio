import { ref } from "vue";

/**
 * boolean组合式函数
 * @param initValue - 初始值
 */
export default function useBoolean(initValue = false) {
  const bool = ref(initValue);

  function setBool(value: boolean) {
    bool.value = value;
  }

  function setTrue() {
    bool.value = true;
  }

  function setFalse() {
    bool.value = false;
  }

  function toggle() {
    setBool(!bool.value);
  }

  return {
    bool,
    setBool,
    setTrue,
    setFalse,
    toggle,
  };
}
