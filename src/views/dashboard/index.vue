<template>
  <div class="dashboard-page">
    <!-- 页面标题区域 -->
    <div class="page-header">
      <div class="header-content">
        <h1 class="title">{{ $t("dashboard.title") }}</h1>
        <p class="subtitle">
          {{ $t("dashboard.welcome", { name: "张晓华" }) }}
        </p>
      </div>
      <div class="header-actions">
        <a-select
          v-model:value="dateRange"
          style="width: 150px"
          class="date-range"
          :default-value="dateRange"
        >
          <a-select-option value="today">今日</a-select-option>
          <a-select-option value="week">本周</a-select-option>
          <a-select-option value="month">本月</a-select-option>
          <a-select-option value="30days">近30天</a-select-option>
          <a-select-option value="quarter">本季度</a-select-option>
        </a-select>
        <a-button type="primary" class="refresh-btn" @click="refreshData">
          <sync-outlined :spin="isRefreshing" />
          刷新数据
        </a-button>
      </div>
    </div>

    <!-- 统计卡片区域 -->
    <div class="stats-grid">
      <!-- 简历统计卡片 -->
      <a-card class="stat-card" :bordered="false">
        <div class="stat-content">
          <div class="stat-header">
            <div class="stat-icon resume-icon">
              <file-outlined />
            </div>
            <div class="stat-title">
              {{ $t("dashboard.stats.resumes.title") }}
            </div>
          </div>
          <div class="stat-value">1,284</div>
          <div class="stat-trend trend-up">
            <arrow-up-outlined />
            <span>18% vs {{ $t("dashboard.stats.resumes.trend") }}</span>
          </div>
          <div class="divider"></div>
          <div class="stat-footer">
            <div class="footer-label">
              {{ $t("dashboard.stats.resumes.thisWeek") }}
            </div>
            <div class="footer-value">78</div>
          </div>
        </div>
      </a-card>

      <!-- 职位统计卡片 -->
      <a-card class="stat-card" :bordered="false">
        <div class="stat-content">
          <div class="stat-header">
            <div class="stat-icon position-icon">
              <team-outlined />
            </div>
            <div class="stat-title">
              {{ $t("dashboard.stats.positions.title") }}
            </div>
          </div>
          <div class="stat-value">32</div>
          <div class="stat-trend trend-up">
            <arrow-up-outlined />
            <span>7% vs {{ $t("dashboard.stats.positions.trend") }}</span>
          </div>
          <div class="divider"></div>
          <div class="stat-footer">
            <div class="footer-label">
              {{ $t("dashboard.stats.positions.thisWeek") }}
            </div>
            <div class="footer-value">5</div>
          </div>
        </div>
      </a-card>

      <!-- 面试统计卡片 -->
      <a-card class="stat-card" :bordered="false">
        <div class="stat-content">
          <div class="stat-header">
            <div class="stat-icon interview-icon">
              <calendar-outlined />
            </div>
            <div class="stat-title">
              {{ $t("dashboard.stats.interviews.title") }}
            </div>
          </div>
          <div class="stat-value">45</div>
          <div class="stat-trend trend-up">
            <arrow-up-outlined />
            <span>12% vs {{ $t("dashboard.stats.interviews.trend") }}</span>
          </div>
          <div class="divider"></div>
          <div class="stat-footer">
            <div class="footer-label">
              {{ $t("dashboard.stats.interviews.upcoming") }}
            </div>
            <div class="footer-value">18</div>
          </div>
        </div>
      </a-card>

      <!-- 招聘周期统计卡片 -->
      <a-card class="stat-card" :bordered="false">
        <div class="stat-content">
          <div class="stat-header">
            <div class="stat-icon cycle-icon">
              <clock-circle-outlined />
            </div>
            <div class="stat-title">
              {{ $t("dashboard.stats.hiringCycle.title") }}
            </div>
          </div>
          <div class="stat-value">
            28<span class="unit">{{
              $t("dashboard.stats.hiringCycle.unit")
            }}</span>
          </div>
          <div class="stat-trend trend-down">
            <arrow-down-outlined />
            <span>5% vs {{ $t("dashboard.stats.hiringCycle.trend") }}</span>
          </div>
          <div class="divider"></div>
          <div class="stat-footer">
            <div class="footer-label">
              {{ $t("dashboard.stats.hiringCycle.target") }}
            </div>
            <div class="footer-value">
              25{{ $t("dashboard.stats.hiringCycle.unit") }}
            </div>
          </div>
        </div>
      </a-card>
    </div>

    <!-- 图表区域 -->
    <div class="charts-row">
      <!-- 效率趋势图表 -->
      <a-card class="chart-card">
        <div class="chart-header">
          <div class="chart-title">
            <bar-chart-outlined />
            <span>{{ $t("dashboard.charts.efficiency.title") }}</span>
          </div>
          <a-select
            v-model:value="timeRange"
            style="width: 120px"
            @change="handleTimeRangeChange"
            :default-value="timeRange"
          >
            <a-select-option value="30">{{
              $t("dashboard.charts.efficiency.timeRanges.30")
            }}</a-select-option>
            <a-select-option value="90">{{
              $t("dashboard.charts.efficiency.timeRanges.90")
            }}</a-select-option>
            <a-select-option value="365">{{
              $t("dashboard.charts.efficiency.timeRanges.365")
            }}</a-select-option>
          </a-select>
        </div>
        <div class="chart-body">
          <div class="chart-bars">
            <div
              v-for="item in efficiencyData"
              :key="item.date"
              class="chart-bar-item"
            >
              <div class="bar-tooltip">{{ item.value }}%</div>
              <div class="bar" :style="{ height: item.value + '%' }"></div>
              <div class="bar-label">{{ item.date }}</div>
            </div>
          </div>
        </div>
      </a-card>

      <!-- 来源分布图表 -->
      <a-card class="chart-card">
        <div class="chart-header">
          <div class="chart-title">
            <pie-chart-outlined />
            <span>{{ $t("dashboard.charts.sources.title") }}</span>
          </div>
          <a-select
            v-model:value="positionType"
            style="width: 120px"
            @change="handlePositionTypeChange"
            :default-value="positionType"
          >
            <a-select-option value="all">{{
              $t("dashboard.charts.sources.filters.all")
            }}</a-select-option>
            <a-select-option value="tech">{{
              $t("dashboard.charts.sources.filters.tech")
            }}</a-select-option>
            <a-select-option value="marketing">{{
              $t("dashboard.charts.sources.filters.marketing")
            }}</a-select-option>
          </a-select>
        </div>
        <div class="chart-body">
          <div class="source-chart">
            <div class="pie-container">
              <div class="pie-segments">
                <div
                  v-for="(item, index) in sourceData"
                  :key="item.name"
                  class="pie-segment"
                  :style="{
                    background: pieColors[index],
                    transform: `rotate(${getPieRotation(index)}deg)`,
                    clipPath: `inset(0 0 0 50%)`,
                  }"
                ></div>
              </div>
            </div>
            <div class="source-legend">
              <div
                v-for="(item, index) in sourceData"
                :key="item.name"
                class="legend-item"
              >
                <span
                  class="legend-color"
                  :style="{ background: pieColors[index] }"
                ></span>
                <span class="legend-text"
                  >{{ item.name }}: {{ item.value }}%</span
                >
              </div>
            </div>
          </div>
        </div>
      </a-card>
    </div>

    <!-- 数据表格区域 -->
    <div class="data-section">
      <a-card class="data-card">
        <div class="card-header">
          <div class="header-title">
            <table-outlined />
            <span>{{ $t("dashboard.tables.resumeStatus.title") }}</span>
          </div>
          <a-button type="link">
            {{ $t("dashboard.tables.resumeStatus.viewAll") }}
            <right-outlined />
          </a-button>
        </div>
        <div class="card-body">
          <a-table
            :columns="resumeColumns"
            :data-source="resumeData"
            :pagination="false"
          >
            <template #bodyCell="{ column, text }">
              <template v-if="column.key === 'completion'">
                <a-progress
                  :percent="Number(text)"
                  :stroke-color="getProgressColor(text)"
                />
              </template>
            </template>
          </a-table>
        </div>
      </a-card>
    </div>

    <!-- 活动记录区域 -->
    <div class="activity-section">
      <a-card class="activity-card">
        <div class="card-header">
          <div class="header-title">
            <notification-outlined />
            <span>{{ $t("dashboard.activities.title") }}</span>
          </div>
          <a-button type="link">
            {{ $t("dashboard.activities.viewAll") }}
            <right-outlined />
          </a-button>
        </div>
        <div class="card-body">
          <a-list :data-source="activities" class="activity-list">
            <template #renderItem="{ item }">
              <a-list-item>
                <div class="activity-item">
                  <div :class="['activity-icon', item.type]">
                    <component :is="item.icon" />
                  </div>
                  <div class="activity-content">
                    <div class="activity-title">{{ item.title }}</div>
                    <div class="activity-desc">{{ item.description }}</div>
                    <div class="activity-time">{{ item.time }}</div>
                  </div>
                </div>
              </a-list-item>
            </template>
          </a-list>
        </div>
      </a-card>
    </div>
  </div>
</template>

<style scoped>
/* RGB变量用于半透明背景 */
:root {
  --primary-color-rgb: 148, 73, 243;
  --success-color-rgb: 16, 185, 129;
  --warning-color-rgb: 245, 158, 11;
  --info-color-rgb: 59, 130, 246;
  --error-color-rgb: 239, 68, 68;
}

[data-theme="dark"] {
  --primary-color-rgb: 138, 124, 180;
  --success-color-rgb: 76, 175, 132;
  --warning-color-rgb: 230, 162, 60;
  --info-color-rgb: 107, 145, 205;
  --error-color-rgb: 219, 107, 110;
}

.dashboard-page {
  padding: 24px;
}

/* 页面标题区域 */
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  background: var(--component-bg);
  padding: 24px;
  border-radius: 8px;
  box-shadow: var(--card-shadow);
}

.title {
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 8px;
  color: var(--text-color);
}

.subtitle {
  color: var(--text-secondary);
}

.header-actions {
  display: flex;
  gap: 12px;
}

/* 统计卡片区域 */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  margin-bottom: 24px;
}

.stat-card {
  border-radius: 8px;
  transition: all 0.3s;
  overflow: hidden;
  background-color: var(--component-bg);
  box-shadow: none;
  border: none;
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.08);
}

[data-theme="dark"] .stat-card:hover {
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.15);
}

.stat-content {
  display: flex;
  flex-direction: column;
  padding: 24px;
  height: 100%;
}

.divider {
  height: 1px;
  background-color: var(--border-color);
  margin: 16px 0;
  width: 100%;
}

.stat-value {
  font-size: 32px;
  font-weight: 700;
  line-height: 1.2;
  color: var(--text-color);
  margin: 12px 0 0;
}

.unit {
  font-size: 14px;
  font-weight: normal;
  margin-left: 2px;
}

.stat-trend {
  display: flex;
  align-items: center;
  font-size: 13px;
  gap: 4px;
  margin-bottom: 16px;
}

.trend-up {
  color: var(--success-color);
}

.trend-down {
  color: var(--error-color);
}

.stat-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-label {
  color: var(--text-secondary);
  font-size: 13px;
}

.footer-value {
  font-weight: 600;
  font-size: 18px;
  color: var(--text-color);
}

/* 图表区域 */
.charts-row {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  margin-bottom: 24px;
}

.chart-card,
.data-card,
.activity-card {
  border-radius: 8px;
  overflow: hidden;
  background-color: var(--component-bg);
  box-shadow: none;
  border: none;
}

.chart-header,
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid var(--border-color);
}

.chart-title,
.header-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  color: var(--text-color);
}

.chart-body {
  height: 300px;
  padding: 24px;
}

/* 柱状图样式 */
.chart-bars {
  height: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
}

.chart-bar-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.bar {
  width: 70%;
  background: linear-gradient(to top, var(--primary-color), var(--info-color));
  border-radius: 4px 4px 0 0;
  transition: height 0.5s, opacity 0.3s;
}

[data-theme="dark"] .bar {
  opacity: 0.85;
  background: linear-gradient(to top, var(--primary-color), var(--info-color));
}

.chart-bar-item:hover .bar {
  opacity: 1;
  filter: brightness(1.05);
}

.bar-tooltip {
  position: absolute;
  top: -30px;
  background: var(--tooltip-bg);
  color: var(--tooltip-text);
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 12px;
  opacity: 0;
  transition: opacity 0.3s;
}

.chart-bar-item:hover .bar-tooltip {
  opacity: 1;
}

.bar-label {
  margin-top: 8px;
  font-size: 12px;
  color: var(--text-secondary);
}

/* 来源分布图表 */
.source-chart {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 20px 0;
}

.pie-container {
  width: 200px;
  height: 200px;
  position: relative;
  border-radius: 50%;
  overflow: hidden;
}

.source-legend {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.legend-color {
  width: 14px;
  height: 14px;
  border-radius: 4px;
}

.legend-text {
  color: var(--text-color);
}

/* 数据表格和活动区域 */
.data-section,
.activity-section {
  margin-bottom: 24px;
}

.card-body {
  background-color: var(--component-bg);
}

/* 活动列表 */
.activity-item {
  display: flex;
  padding: 16px 20px;
  transition: background-color 0.3s;
}

.activity-item:hover {
  background-color: var(--menu-item-hover);
}

.activity-icon {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
  flex-shrink: 0;
}

.activity-icon.new {
  background: rgba(var(--success-color-rgb), 0.15);
  color: var(--success-color);
}

.activity-content {
  flex: 1;
}

.activity-title {
  font-weight: 500;
  margin-bottom: 4px;
  color: var(--text-color);
}

.activity-desc {
  color: var(--text-secondary);
  font-size: 13px;
  margin-bottom: 4px;
}

.activity-time {
  color: var(--text-third);
  font-size: 12px;
}

/* 响应式布局 */
@media (max-width: 1200px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .charts-row {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .page-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .header-actions {
    margin-top: 16px;
    width: 100%;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }
}

/* 统计项样式 */
.stat-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.stat-icon {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  font-size: 18px;
  flex-shrink: 0;
}

.resume-icon {
  background: rgba(var(--primary-color-rgb), 0.15);
  color: var(--primary-color);
}

.position-icon {
  background: rgba(var(--success-color-rgb), 0.15);
  color: var(--success-color);
}

.interview-icon {
  background: rgba(var(--info-color-rgb), 0.15);
  color: var(--info-color);
}

.cycle-icon {
  background: rgba(var(--warning-color-rgb), 0.15);
  color: var(--warning-color);
}

.stat-title {
  font-size: 16px;
  color: var(--text-secondary);
  font-weight: normal;
}

/* 深层组件样式覆盖 */
:deep(.ant-table) {
  background-color: var(--component-bg);
}

:deep(.ant-table-thead > tr > th) {
  background-color: var(--component-bg);
  color: var(--text-color);
  border-bottom: 1px solid var(--border-color);
  font-weight: 600;
}

:deep(.ant-table-tbody > tr > td) {
  border-bottom: 1px solid var(--border-color);
  color: var(--text-color);
}

:deep(.ant-table-tbody > tr.ant-table-row:hover > td) {
  background-color: var(--menu-item-hover);
}

:deep(.ant-table-tbody > tr:last-child > td) {
  border-bottom: none;
}

:deep(.ant-progress-text) {
  color: var(--text-color) !important;
}

:deep(.ant-empty-description) {
  color: var(--text-secondary);
}

:deep(.ant-tabs-tab) {
  color: var(--text-secondary);
}

:deep(.ant-tabs-tab-active) {
  color: var(--primary-color);
}

:deep(.ant-tabs-ink-bar) {
  background-color: var(--primary-color);
}

:deep(.ant-btn-link) {
  color: var(--primary-color);
}

:deep(.ant-btn-link:hover) {
  color: var(--primary-color);
  opacity: 0.8;
}

/* 下拉框和菜单样式适配 */
:deep(.ant-select-dropdown) {
  background-color: var(--component-bg) !important;
  border: 1px solid var(--border-color);
  box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.18),
    0 6px 16px 0 rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.08);
}

:deep(.ant-select-selector) {
  background-color: var(--component-bg) !important;
  color: var(--text-color) !important;
  border-color: var(--border-color) !important;
}

:deep(.ant-select-selection-item) {
  color: var(--text-color) !important;
}

:deep(.ant-select-arrow) {
  color: var(--text-secondary) !important;
}

:deep(.ant-select-item) {
  color: var(--text-color);
}

:deep(.ant-select-item-option-content) {
  color: var(--text-color) !important;
}

:deep(.ant-select-item-option-selected:not(.ant-select-item-option-disabled)) {
  background-color: var(--menu-item-active) !important;
  color: var(--text-color) !important;
}

:deep(.ant-select-item-option-active:not(.ant-select-item-option-disabled)) {
  background-color: var(--menu-item-hover) !important;
}

:deep(
    .ant-select-focused:not(.ant-select-disabled).ant-select:not(
        .ant-select-customize-input
      )
      .ant-select-selector
  ) {
  border-color: var(--primary-color) !important;
  box-shadow: 0 0 0 2px rgba(var(--primary-color-rgb), 0.2) !important;
}

:deep(.ant-select:not(.ant-select-disabled):hover .ant-select-selector) {
  border-color: var(--primary-color) !important;
}

/* 按钮样式适配 */
:deep(.ant-btn-primary) {
  background-color: var(--primary-color) !important;
  border-color: var(--primary-color) !important;
}

:deep(.ant-btn-primary:hover) {
  background-color: rgba(var(--primary-color-rgb), 0.9) !important;
  border-color: rgba(var(--primary-color-rgb), 0.9) !important;
}

[data-theme="dark"] :deep(.ant-btn-primary:hover) {
  filter: brightness(1.1);
}

/* 卡片阴影优化 */
.chart-card,
.data-card,
.activity-card,
.stat-card {
  box-shadow: var(--card-shadow);
}

[data-theme="dark"] .chart-card,
[data-theme="dark"] .data-card,
[data-theme="dark"] .activity-card,
[data-theme="dark"] .stat-card {
  border: 1px solid var(--border-color);
}

/* 搜索框样式优化 */
:deep(.ant-input-affix-wrapper) {
  background-color: var(--input-bg) !important;
  border-color: var(--border-color) !important;
}

:deep(.ant-input) {
  background-color: var(--input-bg) !important;
  color: var(--text-color) !important;
}

:deep(.ant-input-affix-wrapper:hover) {
  border-color: var(--primary-color) !important;
}

:deep(.ant-input-affix-wrapper-focused) {
  border-color: var(--primary-color) !important;
  box-shadow: 0 0 0 2px rgba(var(--primary-color-rgb), 0.2) !important;
}
</style>

<script setup>
import { ref, onMounted, watch } from "vue";
import {
  FileOutlined,
  TeamOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  BarChartOutlined,
  PieChartOutlined,
  TableOutlined,
  NotificationOutlined,
  RightOutlined,
  SyncOutlined,
  UserOutlined,
  CheckCircleOutlined,
  BulbOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons-vue";
import { useAppStore } from "../../stores/app";

// 基础数据
const timeRange = ref("30");
const positionType = ref("all");
const dateRange = ref("30days");
const isRefreshing = ref(false);

// 获取应用主题状态
const appStore = useAppStore();

// 监听主题变化
watch(
  () => appStore.theme,
  (newTheme) => {
    console.log("Theme changed to:", newTheme);
  }
);

// 表格数据
const resumeColumns = [
  {
    title: "职位名称",
    dataIndex: "position",
    key: "position",
  },
  {
    title: "收到简历",
    dataIndex: "received",
    key: "received",
  },
  {
    title: "初筛通过",
    dataIndex: "screening",
    key: "screening",
  },
  {
    title: "面试中",
    dataIndex: "interviewing",
    key: "interviewing",
  },
  {
    title: "已录用",
    dataIndex: "offered",
    key: "offered",
  },
  {
    title: "完成率",
    dataIndex: "completion",
    key: "completion",
  },
];

const resumeData = [
  {
    key: "1",
    position: "高级前端开发工程师",
    received: 124,
    screening: 38,
    interviewing: 12,
    offered: 3,
    completion: "60",
  },
  {
    key: "2",
    position: "产品经理",
    received: 78,
    screening: 25,
    interviewing: 8,
    offered: 2,
    completion: "45",
  },
  {
    key: "3",
    position: "UX设计师",
    received: 65,
    screening: 20,
    interviewing: 7,
    offered: 1,
    completion: "35",
  },
  {
    key: "4",
    position: "后端开发工程师",
    received: 92,
    screening: 30,
    interviewing: 15,
    offered: 4,
    completion: "75",
  },
];

// 活动数据
const activities = [
  {
    type: "new",
    title: "新增候选人：李明",
    description: "职位：高级前端开发工程师",
    time: "10分钟前",
    icon: UserOutlined,
  },
  {
    type: "new",
    title: "面试安排：王芳",
    description: "职位：资深前端开发",
    time: "1小时前",
    icon: CalendarOutlined,
  },
  {
    type: "new",
    title: "面试通过：张伟",
    description: "职位：全栈开发工程师",
    time: "3小时前",
    icon: CheckCircleOutlined,
  },
  {
    type: "new",
    title: "新增职位：UI设计师",
    description: "部门：产品设计",
    time: "昨天",
    icon: BulbOutlined,
  },
  {
    type: "new",
    title: "候选人拒绝：赵小明",
    description: "职位：产品经理",
    time: "昨天",
    icon: CloseCircleOutlined,
  },
];

// 图表数据
const efficiencyData = [
  { date: "3/1", value: 65 },
  { date: "3/5", value: 72 },
  { date: "3/10", value: 68 },
  { date: "3/15", value: 75 },
  { date: "3/20", value: 82 },
  { date: "3/25", value: 78 },
  { date: "3/30", value: 85 },
];

const sourceData = [
  { name: "内部推荐", value: 30 },
  { name: "社交招聘", value: 25 },
  { name: "招聘网站", value: 35 },
  { name: "猎头推荐", value: 10 },
];

const pieColors = ref([
  "var(--primary-color)",
  "var(--info-color)",
  "var(--success-color)",
  "var(--warning-color)",
]);

// 方法
const refreshData = () => {
  isRefreshing.value = true;
  setTimeout(() => {
    isRefreshing.value = false;
  }, 1000);
};

const handleTimeRangeChange = (value) => {
  timeRange.value = value;
  loadChartData();
};

const handlePositionTypeChange = (value) => {
  positionType.value = value;
  loadChartData();
};

const loadChartData = () => {
  console.log("加载图表数据:", timeRange.value, positionType.value);
};

const getPieRotation = (index) => {
  let rotation = 0;
  for (let i = 0; i < index; i++) {
    rotation += sourceData[i].value * 3.6;
  }
  return rotation;
};

const getProgressColor = (percent) => {
  const value = parseInt(percent);
  if (value >= 70) return "var(--success-color)";
  if (value >= 50) return "var(--primary-color)";
  if (value >= 30) return "var(--warning-color)";
  return "var(--error-color)";
};

// 生命周期
onMounted(() => {
  loadChartData();
});
</script>
