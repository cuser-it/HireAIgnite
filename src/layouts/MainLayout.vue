<template>
  <a-layout class="main-layout">
    <!-- 左侧菜单 -->
    <a-layout-sider class="sider" v-model="collapsed" v-if="!collapsed">
      <div class="logo">
        <img src="../assets/vue.svg" alt="Logo" />
        <span>TalentMatch AI</span>
      </div>
      <a-menu
        :selectedKeys="store.selectedKeys"
        :openKeys="openKeys"
        @select="handleMenuSelect"
        @openChange="(keys) => (openKeys = keys)"
        theme="light"
        mode="inline"
      >
        <div class="menu-title">招聘管理</div>
        <a-menu-item key="dashboard">
          <template #icon>
            <dashboard-outlined />
          </template>
          <span>仪表盘概览</span>
        </a-menu-item>
        <a-menu-item key="resume">
          <router-link to="/resume">
            <file-outlined />
            <span>{{ $t("menu.resume") }}</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="positions">
          <template #icon>
            <solution-outlined />
          </template>
          <span>职位管理</span>
        </a-menu-item>
        <a-menu-item key="matching">
          <router-link to="/matching">
            <api-outlined />
            <span>{{ $t("menu.matching") }}</span>
          </router-link>
        </a-menu-item>

        <div class="menu-title">候选人管理</div>
        <a-menu-item key="candidates">
          <template #icon>
            <team-outlined />
          </template>
          <span>候选人池</span>
        </a-menu-item>
        <a-menu-item key="interviews">
          <template #icon>
            <calendar-outlined />
          </template>
          <span>面试安排</span>
        </a-menu-item>
        <a-menu-item key="talent-pool">
          <template #icon>
            <star-outlined />
          </template>
          <span>人才库</span>
        </a-menu-item>

        <div class="menu-title">分析与设置</div>
        <a-menu-item key="analytics">
          <template #icon>
            <BarChartOutlined />
          </template>
          <span>{{ $t("menu.analytics") }}</span>
        </a-menu-item>
        <a-menu-item key="settings">
          <template #icon>
            <setting-outlined />
          </template>
          <span>系统设置</span>
        </a-menu-item>
        <a-menu-item key="ai-settings">
          <template #icon>
            <experiment-outlined />
          </template>
          <span>AI配置</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <!-- 头部 -->
      <a-layout-header class="header">
        <menu-fold-outlined
          v-if="!collapsed"
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
        <menu-unfold-outlined
          v-else
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
        <div class="header-right">
          <a-input-search
            v-model="store.searchText"
            :placeholder="$t('header.search')"
            class="search-input"
          />
          <div class="header-actions">
            <a-dropdown>
              <a-button>
                <template #icon>
                  <translation-outlined />
                </template>
                {{
                  $t(
                    "header.language." +
                      (store.locale === "zh-CN" ? "zh" : "en")
                  )
                }}
              </a-button>
              <template #overlay>
                <a-menu @click="handleLocaleChange">
                  <a-menu-item key="zh-CN">
                    {{ $t("header.language.zh") }}
                  </a-menu-item>
                  <a-menu-item key="en-US">
                    {{ $t("header.language.en") }}
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
            <a-button class="theme-toggle" @click="toggleTheme">
              {{
                $t(
                  store.theme === "light"
                    ? "header.theme.dark"
                    : "header.theme.light"
                )
              }}
            </a-button>
            <a-badge count="3">
              <bell-outlined class="action-icon" />
            </a-badge>
            <a-dropdown>
              <a-avatar>
                <template #icon><user-outlined /></template>
              </a-avatar>
              <template #overlay>
                <a-menu>
                  <a-menu-item>{{ $t("header.profile") }}</a-menu-item>
                  <a-menu-item>{{ $t("header.settings") }}</a-menu-item>
                  <a-menu-item>{{ $t("header.logout") }}</a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </div>
        </div>
      </a-layout-header>
      <!-- 内容 -->
      <a-layout-content class="content">
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup>
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { useAppStore } from "../stores/app";
import {
  UserOutlined,
  BellOutlined,
  TranslationOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DashboardOutlined,
  ProfileOutlined,
  SolutionOutlined,
  ClusterOutlined,
  TeamOutlined,
  CalendarOutlined,
  StarOutlined,
  BarChartOutlined,
  SettingOutlined,
  ExperimentOutlined,
  FileOutlined,
  ApiOutlined,
} from "@ant-design/icons-vue";

const { locale } = useI18n();
const store = useAppStore();
const router = useRouter();
const collapsed = ref(false);
const openKeys = ref(["sub1"]);

const handleMenuSelect = ({ key }) => {
  store.selectedKeys = [key];
  router.push({ name: key });
};

const handleLocaleChange = ({ key }) => {
  store.setLocale(key);
  locale.value = key;
};

const toggleTheme = () => {
  store.setTheme(store.theme === "light" ? "dark" : "light");
};
</script>

<style scoped>
.main-layout {
  min-height: 100vh;
  background-color: var(--bg-color);
}

.sider {
  background: var(--sider-bg);
  box-shadow: var(--card-shadow);
  overflow: hidden;
  position: fixed;
  top: 64px;
  left: 0;
  bottom: 0;
  z-index: 10;
  width: 200px !important;
  height: calc(100vh - 64px) !important;
}

.logo {
  height: 64px;
  padding: 16px 8px;
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--primary-color);
  font-size: 20px;
  font-weight: 600;
  /* 禁止复制 */
  user-select: none;
}

.logo img {
  height: 32px;
  /* 禁止拖拽 */
  -webkit-user-drag: none;
}

.header {
  background: var(--header-bg);
  padding: 0 24px;
  display: flex;
  align-items: center;
  box-shadow: var(--card-shadow);
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 20;
  width: 100%;
  height: 64px;
}

.trigger {
  font-size: 18px;
  cursor: pointer;
  transition: all 0.3s;
  padding: 0 24px;
  color: var(--text-color);
}

.trigger:hover {
  color: var(--primary-color);
  transform: scale(1.1);
}

.header-right {
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.search-input {
  width: 320px;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

.action-icon {
  color: var(--text-color);
  font-size: 20px;
  cursor: pointer;
  transition: all 0.3s;
}

.action-icon:hover {
  color: var(--primary-color);
  transform: scale(1.1);
}

.content {
  background: var(--component-bg);
  color: var(--text-color);
  box-shadow: var(--card-shadow);
  margin-top: 64px;
  margin-left: 200px;
  padding: 24px;
  overflow: auto;
  min-height: calc(100vh - 64px);
  height: calc(100vh - 64px);
}

:deep(.ant-menu) {
  background: var(--sider-bg);
  color: var(--text-color);
  border-right: none;
  padding: 8px;
}

:deep(.ant-menu-item) {
  color: var(--text-color) !important;
  border-radius: 8px;
  margin: 4px 0;
}

:deep(.ant-menu-item:hover) {
  background-color: var(--menu-item-hover);
}

:deep(.ant-menu-item-selected) {
  background-color: var(--menu-item-active) !important;
  color: var(--primary-color) !important;
  font-weight: 600;
}

:deep(.ant-input) {
  background: var(--input-bg);
  color: var(--text-color);
  border-color: var(--border-color);
  border-radius: 8px;
  transition: all 0.3s;
}

:deep(.ant-input:hover),
:deep(.ant-input:focus) {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 2px var(--shadow-color);
}

:deep(.ant-input::placeholder) {
  color: var(--input-placeholder);
}

:deep(.ant-input-search .ant-input) {
  background: var(--input-bg);
}

:deep(.ant-input-search .ant-input-search-button) {
  border-color: var(--border-color);
  border-radius: 0 8px 8px 0;
  width: 50px;
  background: var(--primary-color);
}

:deep(.ant-input-search .ant-input-search-button:hover) {
  border-color: var(--primary-color);
  /* color: var(--text-light); */
}

:deep(.ant-btn) {
  background: var(--component-bg);
  color: var(--text-color);
  border-color: var(--border-color);
  border-radius: 8px;
  transition: all 0.3s;
}

:deep(.ant-btn:hover) {
  background: var(--primary-color);
  color: var(--text-light);
  border-color: var(--primary-color);
  transform: translateY(-2px);
}

:deep(.ant-dropdown-menu) {
  background: var(--component-bg);
  border: none;
  border-radius: 8px;
  box-shadow: var(--card-shadow);
  padding: 4px;
}

:deep(.ant-dropdown-menu-item) {
  color: var(--text-color);
  border-radius: 4px;
  margin: 4px 0;
}

:deep(.ant-dropdown-menu-item:hover) {
  background: var(--menu-item-hover);
  color: var(--primary-color);
}

:deep(.ant-badge-count) {
  background: var(--primary-color);
  box-shadow: 0 0 0 2px var(--component-bg);
}

:deep(.ant-avatar) {
  background: var(--tag-bg);
  color: var(--primary-color);
  cursor: pointer;
  transition: all 0.3s;
}

:deep(.ant-avatar:hover) {
  transform: scale(1.1);
}
:deep(.ant-menu-item) {
  user-select: none;
}

.theme-toggle {
  min-width: 64px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.theme-toggle:hover {
  background: var(--menu-item-hover);
  border-color: var(--primary-color);
  color: var(--primary-color);
}

.menu-title {
  padding: 8px 16px;
  color: var(--text-secondary);
  font-size: 12px;
  user-select: none;
  margin-top: 8px;
}

:deep(.ant-menu-item) {
  margin: 4px 8px !important;
  border-radius: 6px;
}

:deep(.ant-menu-item .anticon) {
  font-size: 18px;
}

:deep(.ant-menu-item-selected) {
  background-color: var(--menu-item-active) !important;
}

:deep(.ant-menu-inline) {
  border-right: none;
}
</style>
