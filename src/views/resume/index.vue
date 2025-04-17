<template>
  <div class="resume-page">
    <!-- 页面标题 -->
    <div class="page-header">
      <h1 class="page-title">{{ $t("resume.title") }}</h1>
      <p class="page-description">{{ $t("resume.description") }}</p>
    </div>

    <!-- 上传区域和统计 -->
    <div class="upload-stats-section">
      <!-- 简历上传区域 -->
      <div class="upload-card">
        <h2 class="section-title">{{ $t("resume.upload.title") }}</h2>
        <div class="dropzone">
          <upload-outlined class="upload-icon" />
          <p class="dropzone-text">{{ $t("resume.upload.dragText") }}</p>
          <p class="dropzone-subtext">{{ $t("resume.upload.supportText") }}</p>
          <a-button type="primary" class="upload-button">
            <upload-outlined />{{ $t("resume.upload.selectFile") }}
          </a-button>
        </div>
        <div class="upload-settings">
          <a-button block>
            <setting-outlined />{{ $t("resume.upload.batchImportSettings") }}
          </a-button>
        </div>
      </div>

      <!-- 简历统计卡片 -->
      <div class="stats-card">
        <h2 class="section-title">{{ $t("resume.stats.title") }}</h2>
        <div class="stats-grid">
          <div class="stat-item primary">
            <div class="stat-header">
              <span class="stat-label">{{
                $t("resume.stats.totalResumes")
              }}</span>
              <file-outlined class="stat-icon" />
            </div>
            <div class="stat-value">1,284</div>
            <div class="stat-trend positive">
              {{ $t("resume.stats.vsLastMonth", { value: "+18%" }) }}
            </div>
          </div>
          <div class="stat-item success">
            <div class="stat-header">
              <span class="stat-label">{{
                $t("resume.stats.thisWeekNew")
              }}</span>
              <user-add-outlined class="stat-icon" />
            </div>
            <div class="stat-value">78</div>
            <div class="stat-trend positive">
              {{ $t("resume.stats.vsLastWeek", { value: "+5%" }) }}
            </div>
          </div>
          <div class="stat-item info">
            <div class="stat-header">
              <span class="stat-label">{{
                $t("resume.stats.pendingResumes")
              }}</span>
              <profile-outlined class="stat-icon" />
            </div>
            <div class="stat-value">45</div>
            <div class="stat-trend negative">
              {{ $t("resume.stats.vsYesterday", { value: "-12%" }) }}
            </div>
          </div>
        </div>

        <div class="parse-status">
          <h3 class="subsection-title">{{ $t("resume.stats.parseStatus") }}</h3>
          <a-progress :percent="85" :showInfo="false" status="success" />
          <div class="parse-status-info">
            <span>{{ $t("resume.stats.parseSuccess", { value: "85%" }) }}</span>
            <span>{{
              $t("resume.stats.parseNeedsReview", { value: "15%" })
            }}</span>
          </div>
        </div>

        <div class="stats-actions">
          <a-button type="primary">
            <experiment-outlined />{{ $t("resume.stats.batchAiParse") }}
          </a-button>
          <a-button>
            <bar-chart-outlined />{{ $t("resume.stats.detailedReport") }}
          </a-button>
        </div>
      </div>
    </div>

    <!-- 简历列表 -->
    <div class="resume-list-section">
      <!-- 工具栏 -->
      <div class="list-toolbar">
        <div class="filters">
          <a-select
            v-model:value="statusFilter"
            style="min-width: 120px"
            :default-value="'all'"
          >
            <a-select-option value="all">{{
              $t("resume.filter.allStatuses")
            }}</a-select-option>
            <a-select-option value="processed">{{
              $t("resume.filter.processed")
            }}</a-select-option>
            <a-select-option value="pending">{{
              $t("resume.filter.pending")
            }}</a-select-option>
            <a-select-option value="approved">{{
              $t("resume.filter.approved")
            }}</a-select-option>
            <a-select-option value="rejected">{{
              $t("resume.filter.rejected")
            }}</a-select-option>
          </a-select>
          <a-select
            v-model:value="positionFilter"
            style="min-width: 150px"
            :default-value="'all'"
          >
            <a-select-option value="all">{{
              $t("resume.filter.allPositions")
            }}</a-select-option>
            <a-select-option value="frontend">{{
              $t("resume.filter.frontendDev")
            }}</a-select-option>
            <a-select-option value="backend">{{
              $t("resume.filter.backendDev")
            }}</a-select-option>
            <a-select-option value="product">{{
              $t("resume.filter.productManager")
            }}</a-select-option>
            <a-select-option value="design">{{
              $t("resume.filter.uiuxDesigner")
            }}</a-select-option>
          </a-select>
          <a-input-search
            v-model:value="searchText"
            :placeholder="$t('resume.filter.searchPlaceholder')"
            style="width: 250px"
          />
        </div>
        <div class="actions">
          <a-button type="primary">
            <plus-outlined />{{ $t("resume.actions.addResume") }}
          </a-button>
          <a-button>
            <filter-outlined />{{ $t("resume.actions.advancedFilter") }}
          </a-button>
          <a-button>
            <download-outlined />{{ $t("resume.actions.export") }}
          </a-button>
        </div>
      </div>

      <!-- 简历表格 -->
      <a-table
        :dataSource="resumeData"
        :columns="columns"
        :rowSelection="rowSelection"
        :pagination="pagination"
        :scroll="{ x: 1100 }"
      >
        <!-- 候选人列 -->
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'candidate'">
            <div class="candidate-cell">
              <a-avatar :size="40">{{ record.name.charAt(0) }}</a-avatar>
              <div class="candidate-info">
                <div class="candidate-name">{{ record.name }}</div>
                <div class="candidate-email">{{ record.email }}</div>
              </div>
            </div>
          </template>

          <!-- 技能匹配列 -->
          <template v-if="column.key === 'skillMatch'">
            <div class="skill-match">
              <div class="match-value">{{ record.matchScore }}%</div>
              <a-progress
                :percent="record.matchScore"
                :showInfo="false"
                :strokeColor="getMatchColor(record.matchScore)"
                size="small"
              />
            </div>
          </template>

          <!-- 来源列 -->
          <template v-if="column.key === 'source'">
            <a-tag :color="getSourceColor(record.source)">{{
              record.source
            }}</a-tag>
          </template>

          <!-- 状态列 -->
          <template v-if="column.key === 'status'">
            <a-tag :color="getStatusColor(record.status)">{{
              record.status
            }}</a-tag>
          </template>

          <!-- 操作列 -->
          <template v-if="column.key === 'actions'">
            <a-button type="link" size="small">{{
              $t("resume.actions.view")
            }}</a-button>
            <a-button type="link" size="small">{{
              $t("resume.actions.match")
            }}</a-button>
          </template>
        </template>
      </a-table>
    </div>

    <!-- AI解析质量反馈 -->
    <div class="ai-feedback-section">
      <h2 class="section-title">{{ $t("resume.aiFeedback.title") }}</h2>
      <div class="ai-tip">
        <div class="ai-tip-icon">
          <bulb-outlined />
        </div>
        <div class="ai-tip-content">
          <h3 class="ai-tip-title">{{ $t("resume.aiFeedback.aiTip") }}</h3>
          <p class="ai-tip-text">{{ $t("resume.aiFeedback.tipContent") }}</p>
        </div>
      </div>

      <div class="feedback-grid">
        <div class="chart-container">
          <h3 class="subsection-title">
            {{ $t("resume.aiFeedback.accuracyTrend") }}
          </h3>
          <div class="chart-placeholder">
            <line-chart-outlined />
            <p>{{ $t("resume.aiFeedback.accuracyChart") }}</p>
          </div>
        </div>
        <div class="issues-container">
          <h3 class="subsection-title">
            {{ $t("resume.aiFeedback.commonIssues") }}
          </h3>
          <div class="issues-list">
            <div class="issue-item">
              <div class="issue-rank error">1</div>
              <span class="issue-text">{{
                $t("resume.aiFeedback.issue1", { percent: "32%" })
              }}</span>
            </div>
            <div class="issue-item">
              <div class="issue-rank warning">2</div>
              <span class="issue-text">{{
                $t("resume.aiFeedback.issue2", { percent: "24%" })
              }}</span>
            </div>
            <div class="issue-item">
              <div class="issue-rank warning">3</div>
              <span class="issue-text">{{
                $t("resume.aiFeedback.issue3", { percent: "18%" })
              }}</span>
            </div>
            <div class="issue-item">
              <div class="issue-rank success">4</div>
              <span class="issue-text">{{
                $t("resume.aiFeedback.issue4", { percent: "15%" })
              }}</span>
            </div>
          </div>
          <a-button type="link" class="optimize-link">
            <setting-outlined />{{ $t("resume.aiFeedback.optimizeSettings") }}
          </a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";
import {
  UploadOutlined,
  SettingOutlined,
  FileOutlined,
  UserAddOutlined,
  ProfileOutlined,
  ExperimentOutlined,
  BarChartOutlined,
  PlusOutlined,
  FilterOutlined,
  DownloadOutlined,
  BulbOutlined,
  LineChartOutlined,
} from "@ant-design/icons-vue";

// 国际化
const { t } = useI18n();

// 筛选状态
const statusFilter = ref("all");
const positionFilter = ref("all");
const searchText = ref("");

// 表格配置 - 使用computed保证i18n正确加载
const columns = computed(() => [
  {
    title: t("resume.columns.candidate"),
    key: "candidate",
    fixed: "left",
    width: 220,
  },
  {
    title: t("resume.columns.position"),
    dataIndex: "position",
    key: "position",
    width: 180,
  },
  {
    title: t("resume.columns.skillMatch"),
    key: "skillMatch",
    width: 150,
  },
  {
    title: t("resume.columns.source"),
    key: "source",
    width: 120,
  },
  {
    title: t("resume.columns.receiveDate"),
    dataIndex: "receiveDate",
    key: "receiveDate",
    width: 120,
  },
  {
    title: t("resume.columns.status"),
    key: "status",
    width: 100,
  },
  {
    title: t("resume.columns.actions"),
    key: "actions",
    fixed: "right",
    width: 150,
  },
]);

// 表格数据
const resumeData = [
  {
    key: "1",
    name: "李明",
    email: "liming@example.com",
    position: "高级前端开发工程师",
    matchScore: 92,
    source: "官网申请",
    receiveDate: "2023-06-10",
    status: "已解析",
  },
  {
    key: "2",
    name: "王芳",
    email: "wangfang@example.com",
    position: "资深前端开发",
    matchScore: 86,
    source: "猎头推荐",
    receiveDate: "2023-06-09",
    status: "已解析",
  },
  {
    key: "3",
    name: "张伟",
    email: "zhangwei@example.com",
    position: "全栈开发工程师",
    matchScore: 78,
    source: "内部推荐",
    receiveDate: "2023-06-08",
    status: "处理中",
  },
  {
    key: "4",
    name: "赵小明",
    email: "zhaoxm@example.com",
    position: "产品经理",
    matchScore: 65,
    source: "官网申请",
    receiveDate: "2023-06-07",
    status: "需修正",
  },
];

// 行选择配置
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
  },
};

// 分页配置
const pagination = {
  total: 265,
  current: 1,
  pageSize: 10,
  showSizeChanger: true,
  showQuickJumper: true,
  showTotal: (total) => `共 ${total} 条`,
};

// 获取匹配分数对应的颜色
const getMatchColor = (score) => {
  if (score >= 85) return "var(--success-color)";
  if (score >= 70) return "var(--info-color)";
  return "var(--warning-color)";
};

// 获取来源对应的颜色
const getSourceColor = (source) => {
  switch (source) {
    case "官网申请":
      return "blue";
    case "猎头推荐":
      return "purple";
    case "内部推荐":
      return "orange";
    default:
      return "default";
  }
};

// 获取状态对应的颜色
const getStatusColor = (status) => {
  switch (status) {
    case "已解析":
      return "success";
    case "处理中":
      return "processing";
    case "需修正":
      return "error";
    default:
      return "default";
  }
};
</script>

<style scoped>
.resume-page {
  padding: 24px;
}

.page-header {
  margin-bottom: 24px;
}

.page-title {
  font-size: 24px;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 8px;
}

.page-description {
  color: var(--text-secondary);
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 16px;
}

.subsection-title {
  font-size: 16px;
  font-weight: 500;
  color: var(--text-color);
  margin-bottom: 12px;
}

/* 上传和统计区域 */
.upload-stats-section {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 24px;
  margin-bottom: 24px;
}

@media (max-width: 992px) {
  .upload-stats-section {
    grid-template-columns: 1fr;
  }
}

.upload-card,
.stats-card {
  background: var(--component-bg);
  border-radius: 8px;
  box-shadow: var(--card-shadow);
  padding: 24px;
  border: 1px solid var(--border-color);
}

/* 上传区域样式 */
.dropzone {
  border: 2px dashed var(--border-color);
  border-radius: 8px;
  padding: 32px 24px;
  margin-bottom: 16px;
  text-align: center;
  transition: all 0.3s ease;
  cursor: pointer;
}

.dropzone:hover {
  border-color: var(--primary-color);
  background-color: var(--menu-item-hover);
}

.upload-icon {
  font-size: 32px;
  color: var(--primary-color);
  margin-bottom: 12px;
}

.dropzone-text {
  color: var(--text-color);
  margin-bottom: 8px;
}

.dropzone-subtext {
  color: var(--text-secondary);
  font-size: 14px;
  margin-bottom: 16px;
}

.upload-button {
  margin-bottom: 8px;
}

/* 统计区域样式 */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 24px;
}

@media (max-width: 1200px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
}

.stat-item {
  border-radius: 8px;
  padding: 16px;
}

.stat-item.primary {
  background-color: rgba(var(--primary-color-rgb), 0.1);
}

.stat-item.success {
  background-color: rgba(var(--success-color-rgb), 0.1);
}

.stat-item.info {
  background-color: rgba(var(--info-color-rgb), 0.1);
}

.stat-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.stat-label {
  color: var(--text-color);
  font-weight: 500;
}

.stat-icon {
  color: var(--primary-color);
}

.stat-item.success .stat-icon {
  color: var(--success-color);
}

.stat-item.info .stat-icon {
  color: var(--info-color);
}

.stat-value {
  font-size: 24px;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 4px;
}

.stat-trend {
  font-size: 13px;
}

.stat-trend.positive {
  color: var(--success-color);
}

.stat-trend.negative {
  color: var(--error-color);
}

.parse-status {
  margin-bottom: 20px;
}

.parse-status-info {
  display: flex;
  justify-content: space-between;
  margin-top: 4px;
  font-size: 13px;
  color: var(--text-secondary);
}

.stats-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

/* 简历列表区域 */
.resume-list-section {
  background: var(--component-bg);
  border-radius: 8px;
  box-shadow: var(--card-shadow);
  margin-bottom: 24px;
  border: 1px solid var(--border-color);
}

.list-toolbar {
  padding: 16px;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 16px;
}

.filters {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.actions {
  display: flex;
  gap: 8px;
}

.candidate-cell {
  display: flex;
  align-items: center;
}

.candidate-info {
  margin-left: 12px;
}

.candidate-name {
  font-weight: 500;
  color: var(--text-color);
}

.candidate-email {
  font-size: 13px;
  color: var(--text-secondary);
}

.skill-match {
  width: 100%;
}

.match-value {
  margin-bottom: 8px;
}

/* AI反馈区域 */
.ai-feedback-section {
  background: var(--component-bg);
  border-radius: 8px;
  box-shadow: var(--card-shadow);
  padding: 24px;
  border: 1px solid var(--border-color);
}

.ai-tip {
  background-color: rgba(var(--primary-color-rgb), 0.08);
  border-radius: 8px;
  padding: 16px;
  display: flex;
  margin-bottom: 24px;
}

.ai-tip-icon {
  width: 40px;
  height: 40px;
  background-color: rgba(var(--primary-color-rgb), 0.15);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
  font-size: 20px;
  color: var(--primary-color);
}

.ai-tip-title {
  font-weight: 500;
  color: var(--text-color);
  margin-bottom: 8px;
}

.ai-tip-text {
  color: var(--text-secondary);
  font-size: 14px;
}

.feedback-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

@media (max-width: 992px) {
  .feedback-grid {
    grid-template-columns: 1fr;
  }
}

.chart-placeholder {
  height: 200px;
  background-color: var(--bg-color);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--text-third);
  font-size: 24px;
}

.chart-placeholder p {
  margin-top: 8px;
  font-size: 14px;
}

.issues-list {
  margin-bottom: 16px;
}

.issue-item {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}

.issue-rank {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
  margin-right: 12px;
}

.issue-rank.error {
  background-color: rgba(var(--error-color-rgb), 0.15);
  color: var(--error-color);
}

.issue-rank.warning {
  background-color: rgba(var(--warning-color-rgb), 0.15);
  color: var(--warning-color);
}

.issue-rank.success {
  background-color: rgba(var(--success-color-rgb), 0.15);
  color: var(--success-color);
}

.issue-text {
  color: var(--text-color);
  font-size: 14px;
}

.optimize-link {
  padding-left: 0;
}

/* 暗黑模式适配 */
[data-theme="dark"] .dropzone {
  background-color: rgba(255, 255, 255, 0.02);
}

[data-theme="dark"] .dropzone:hover {
  background-color: rgba(255, 255, 255, 0.05);
}

[data-theme="dark"] .chart-placeholder {
  background-color: rgba(255, 255, 255, 0.03);
}

[data-theme="dark"] :deep(.ant-pagination-item) {
  background-color: var(--component-bg);
  border-color: var(--border-color);
}

[data-theme="dark"] :deep(.ant-pagination-item-active) {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
}

[data-theme="dark"] :deep(.ant-pagination-item-active a) {
  color: var(--text-light);
}

[data-theme="dark"] :deep(.ant-pagination-prev .ant-pagination-item-link),
[data-theme="dark"] :deep(.ant-pagination-next .ant-pagination-item-link) {
  background-color: var(--component-bg);
  border-color: var(--border-color);
  color: var(--text-color);
}
</style>
