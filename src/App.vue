<template>
  <router-view></router-view>
</template>

<style>
@import "./styles/theme.css";

/* 全局样式重置 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body {
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, "Noto Sans", sans-serif;
}

#app {
  width: 100%;
  height: 100%;
}

/* 移除列表样式 */
ul,
ol {
  list-style: none;
}

/* 移除链接下划线 */
a {
  text-decoration: none;
}
</style>
