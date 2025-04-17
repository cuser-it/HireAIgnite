import { defineStore } from "pinia";
import { ref } from "vue";

export const useAppStore = defineStore("app", () => {
  const selectedKeys = ref(["matching"]);
  const searchText = ref("");
  const theme = ref(localStorage.getItem("theme") || "light");
  const locale = ref(localStorage.getItem("locale") || "zh-CN");

  const setTheme = (newTheme) => {
    theme.value = newTheme;
    localStorage.setItem("theme", newTheme);

    // 将主题应用到 HTML 元素上
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  const setLocale = (newLocale) => {
    locale.value = newLocale;
    localStorage.setItem("locale", newLocale);
  };

  // 初始化主题
  setTheme(theme.value);

  return {
    selectedKeys,
    searchText,
    theme,
    locale,
    setTheme,
    setLocale,
  };
});
