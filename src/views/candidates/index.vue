<!-- 页面：候选人管理 -->
<template>
  <div class="candidates-page">
    <!-- 页面标题 -->
    <div class="page-header">
      <div class="header-content">
        <h1 class="title">{{ $t("candidates.title") }}</h1>
        <p class="subtitle">{{ $t("candidates.subtitle") }}</p>
      </div>
      <div class="header-actions">
        <a-button type="primary">
          <template #icon><user-add-outlined /></template>
          {{ $t("candidates.actions.addCandidate") }}
        </a-button>
      </div>
    </div>

    <!-- 候选人统计卡片 -->
    <div class="stats-section">
      <!-- 总候选人数 -->
      <div class="stat-card">
        <div class="stat-card-header">
          <h2 class="stat-title">
            {{ $t("candidates.statistics.totalCandidates") }}
          </h2>
          <div class="stat-icon-bg blue">
            <team-outlined />
          </div>
        </div>
        <div class="stat-values">
          <span class="stat-value">1,284</span>
          <span class="stat-trend positive">
            <arrow-up-outlined class="trend-icon" />12%
          </span>
        </div>
        <div class="stat-desc">
          {{ $t("candidates.statistics.vsLastMonth") }}
        </div>
      </div>

      <!-- 新增候选人 -->
      <div class="stat-card">
        <div class="stat-card-header">
          <h2 class="stat-title">
            {{ $t("candidates.statistics.newThisWeek") }}
          </h2>
          <div class="stat-icon-bg green">
            <user-add-outlined />
          </div>
        </div>
        <div class="stat-values">
          <span class="stat-value">78</span>
          <span class="stat-trend positive">
            <arrow-up-outlined class="trend-icon" />18%
          </span>
        </div>
        <div class="stat-desc">
          {{ $t("candidates.statistics.vsLastWeek") }}
        </div>
      </div>

      <!-- 面试中候选人 -->
      <div class="stat-card">
        <div class="stat-card-header">
          <h2 class="stat-title">
            {{ $t("candidates.statistics.inInterview") }}
          </h2>
          <div class="stat-icon-bg purple">
            <calendar-outlined />
          </div>
        </div>
        <div class="stat-values">
          <span class="stat-value">45</span>
          <span class="stat-trend positive">
            <arrow-up-outlined class="trend-icon" />7%
          </span>
        </div>
        <div class="stat-desc">
          {{ $t("candidates.statistics.vsLastMonth") }}
        </div>
      </div>

      <!-- 高匹配候选人 -->
      <div class="stat-card">
        <div class="stat-card-header">
          <h2 class="stat-title">
            {{ $t("candidates.statistics.highMatch") }}
          </h2>
          <div class="stat-icon-bg yellow">
            <trophy-outlined />
          </div>
        </div>
        <div class="stat-values">
          <span class="stat-value">63</span>
        </div>
        <div class="stat-desc">
          {{ $t("candidates.statistics.matchAbove") }}
        </div>
      </div>
    </div>

    <!-- 候选人池管理工具栏 -->
    <div class="toolbar-section">
      <div class="select-section">
        <div class="filter-group">
          <a-select
            v-model:value="statusFilter"
            style="min-width: 9.375rem"
            :placeholder="$t('candidates.filter.allCandidates')"
          >
            <a-select-option value="all">{{
              $t("candidates.filter.allCandidates")
            }}</a-select-option>
            <a-select-option value="interviewing">{{
              $t("candidates.filter.interviewing")
            }}</a-select-option>
            <a-select-option value="offered">{{
              $t("candidates.filter.offered")
            }}</a-select-option>
            <a-select-option value="onboarded">{{
              $t("candidates.filter.onboarded")
            }}</a-select-option>
            <a-select-option value="rejected">{{
              $t("candidates.filter.rejected")
            }}</a-select-option>
            <a-select-option value="pending">{{
              $t("candidates.filter.pending")
            }}</a-select-option>
          </a-select>

          <a-select
            v-model:value="positionFilter"
            style="min-width: 9.375rem"
            :placeholder="$t('candidates.filter.allPositions')"
          >
            <a-select-option value="all">{{
              $t("candidates.filter.allPositions")
            }}</a-select-option>
            <a-select-option value="frontend">{{
              $t("candidates.filter.frontend")
            }}</a-select-option>
            <a-select-option value="backend">{{
              $t("candidates.filter.backend")
            }}</a-select-option>
            <a-select-option value="product">{{
              $t("candidates.filter.product")
            }}</a-select-option>
            <a-select-option value="design">{{
              $t("candidates.filter.design")
            }}</a-select-option>
            <a-select-option value="data">{{
              $t("candidates.filter.data")
            }}</a-select-option>
          </a-select>
        </div>

        <div class="search-group">
          <a-input-search
            v-model:value="searchText"
            :placeholder="$t('candidates.filter.searchPlaceholder')"
            style="width: 15.625rem"
          />
          <a-button>
            <template #icon><filter-outlined /></template>
            {{ $t("candidates.actions.advancedFilter") }}
          </a-button>
          <a-button>
            <template #icon><sort-ascending-outlined /></template>
            {{ $t("candidates.actions.sort") }}
          </a-button>
        </div>
      </div>
    </div>

    <!-- 标签筛选 -->
    <div class="tag-filters" v-if="activeTags.length > 0">
      <a-tag
        v-for="tag in activeTags"
        :key="tag"
        closable
        @close="removeTag(tag)"
        class="filter-tag"
      >
        {{ tag }}
      </a-tag>
      <a-button type="link" @click="clearAllTags">
        {{ $t("candidates.filter.clearAll") }}
      </a-button>
    </div>

    <!-- 候选人列表视图 -->
    <a-card class="candidate-list-card">
      <a-table
        :dataSource="candidateList"
        :columns="columns"
        :rowSelection="{
          selectedRowKeys: selectedRowKeys,
          onChange: onSelectChange,
        }"
        :scroll="{ x: 1200 }"
      >
        <!-- 候选人信息列 -->
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'candidate'">
            <div class="candidate-info-cell">
              <a-avatar :size="40" v-if="record.avatar">
                <img :src="record.avatar" :alt="record.name" />
              </a-avatar>
              <a-avatar :size="40" v-else>
                <template #icon><user-outlined /></template>
              </a-avatar>
              <div class="candidate-info-text">
                <div class="candidate-name">{{ record.name }}</div>
                <div class="candidate-email">{{ record.email }}</div>
              </div>
            </div>
          </template>

          <!-- 职位列 -->
          <template v-if="column.key === 'position'">
            <div class="position-cell">
              <div class="position-title">{{ record.position }}</div>
              <div class="position-department">{{ record.department }}</div>
            </div>
          </template>

          <!-- 技能列 -->
          <template v-if="column.key === 'skills'">
            <div class="skills-cell">
              <a-tag
                v-for="skill in record.skills"
                :key="skill"
                class="skill-tag"
              >
                {{ skill }}
              </a-tag>
            </div>
          </template>

          <!-- 匹配度列 -->
          <template v-if="column.key === 'match'">
            <div class="match-cell">
              <span :class="getMatchClass(record.matchScore)"
                >{{ record.matchScore }}%</span
              >
              <a-progress
                :percent="record.matchScore"
                :showInfo="false"
                :strokeColor="getMatchColor(record.matchScore)"
                size="small"
              />
            </div>
          </template>

          <!-- 状态列 -->
          <template v-if="column.key === 'status'">
            <a-tag :color="getStatusColor(record.status)">{{
              getStatusText(record.status)
            }}</a-tag>
          </template>

          <!-- 操作列 -->
          <template v-if="column.key === 'action'">
            <div class="action-cell">
              <a @click="viewCandidate(record.id)">{{
                $t("candidates.actions.view")
              }}</a>
              <a-divider type="vertical" />
              <a @click="interviewCandidate(record.id)">{{
                $t("candidates.actions.interview")
              }}</a>
              <a-divider type="vertical" />
              <a-dropdown>
                <template #overlay>
                  <a-menu>
                    <a-menu-item @click="addToTalentPool(record.id)">
                      {{ $t("candidates.actions.addToPool") }}
                    </a-menu-item>
                    <a-menu-item @click="sendEmail(record.id)">
                      {{ $t("candidates.actions.sendEmail") }}
                    </a-menu-item>
                    <a-menu-item @click="rejectCandidate(record.id)">
                      {{ $t("candidates.actions.reject") }}
                    </a-menu-item>
                  </a-menu>
                </template>
                <a-button type="text">
                  <more-outlined />
                </a-button>
              </a-dropdown>
            </div>
          </template>
        </template>
      </a-table>
    </a-card>

    <!-- 批量操作栏 -->
    <div class="batch-actions" v-if="selectedRowKeys.length > 0">
      <span class="selected-count">
        {{
          $t("candidates.batchActions.selected", {
            count: selectedRowKeys.length,
          })
        }}
      </span>
      <div class="action-buttons">
        <a-button>
          <template #icon><tag-outlined /></template>
          {{ $t("candidates.batchActions.addTag") }}
        </a-button>
        <a-button>
          <template #icon><calendar-outlined /></template>
          {{ $t("candidates.batchActions.scheduleInterview") }}
        </a-button>
        <a-button>
          <template #icon><mail-outlined /></template>
          {{ $t("candidates.batchActions.sendEmail") }}
        </a-button>
        <a-button>
          <template #icon><user-add-outlined /></template>
          {{ $t("candidates.batchActions.addToTalentPool") }}
        </a-button>
        <a-button danger>
          <template #icon><delete-outlined /></template>
          {{ $t("candidates.batchActions.delete") }}
        </a-button>
      </div>
    </div>

    <!-- AI候选人推荐 -->
    <a-card class="ai-recommendation">
      <template #title>
        <div class="ai-section-header">
          <h2 class="ai-section-title">
            {{ $t("candidates.aiRecommendation.title") }}
          </h2>
          <a-button type="link">
            {{ $t("candidates.aiRecommendation.viewAll") }}
            <right-outlined />
          </a-button>
        </div>
      </template>

      <!-- AI提示框 -->
      <div class="ai-insight-box">
        <div class="ai-insight-icon">
          <bulb-outlined />
        </div>
        <div class="ai-insight-content">
          <h3 class="ai-insight-title">
            {{ $t("candidates.aiRecommendation.insightTitle") }}
          </h3>
          <p class="ai-insight-text">
            {{ $t("candidates.aiRecommendation.insightContent") }}
          </p>
        </div>
      </div>

      <!-- 推荐候选人卡片 -->
      <a-row :gutter="24" class="recommendation-cards">
        <a-col
          :xs="24"
          :sm="24"
          :md="8"
          v-for="candidate in recommendedCandidates"
          :key="candidate.id"
        >
          <div
            class="recommendation-card"
            :class="{ 'high-match': candidate.matchScore >= 90 }"
          >
            <div class="rec-card-header">
              <div class="rec-candidate-info">
                <a-avatar :size="48" v-if="candidate.avatar">
                  <img :src="candidate.avatar" :alt="candidate.name" />
                </a-avatar>
                <a-avatar :size="48" v-else>
                  <template #icon><user-outlined /></template>
                </a-avatar>
                <div class="rec-text-info">
                  <h3 class="rec-name">{{ candidate.name }}</h3>
                  <p class="rec-position">
                    {{ candidate.position }} | {{ candidate.experience }}
                  </p>
                </div>
              </div>
              <div class="rec-match-score">
                {{ candidate.matchScore }}% 匹配
              </div>
            </div>

            <div class="rec-scores">
              <div
                class="rec-score-item"
                v-for="(score, skill) in candidate.scores"
                :key="skill"
              >
                <div class="rec-score-label">{{ skill }}</div>
                <a-progress
                  :percent="score"
                  :showInfo="false"
                  :strokeColor="getMatchColor(score)"
                  size="small"
                />
                <div class="rec-score-value">{{ score }}%</div>
              </div>
            </div>

            <div class="rec-tags">
              <a-tag v-for="tag in candidate.tags" :key="tag">{{ tag }}</a-tag>
            </div>

            <div class="rec-actions">
              <a-button type="primary" block>
                {{ $t("candidates.aiRecommendation.viewDetails") }}
              </a-button>
              <a-button>
                {{ $t("candidates.aiRecommendation.contact") }}
              </a-button>
            </div>
          </div>
        </a-col>
      </a-row>
    </a-card>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import {
  UserOutlined,
  UserAddOutlined,
  TeamOutlined,
  CalendarOutlined,
  TrophyOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  FilterOutlined,
  SortAscendingOutlined,
  MoreOutlined,
  TagOutlined,
  MailOutlined,
  DeleteOutlined,
  BulbOutlined,
  RightOutlined,
} from "@ant-design/icons-vue";

// 筛选和搜索
const statusFilter = ref("all");
const positionFilter = ref("all");
const searchText = ref("");
const activeTags = ref(["前端开发", "3年以上经验", "React", "北京"]);

// 表格相关
const selectedRowKeys = ref([]);
const columns = [
  {
    title: "候选人",
    dataIndex: "name",
    key: "candidate",
    fixed: "left",
    width: 220,
  },
  {
    title: "应聘职位",
    dataIndex: "position",
    key: "position",
    width: 150,
  },
  {
    title: "技能",
    dataIndex: "skills",
    key: "skills",
    width: 250,
  },
  {
    title: "匹配度",
    dataIndex: "matchScore",
    key: "match",
    width: 120,
    sorter: (a, b) => a.matchScore - b.matchScore,
  },
  {
    title: "状态",
    dataIndex: "status",
    key: "status",
    width: 120,
    filters: [
      { text: "简历筛选", value: "screening" },
      { text: "面试进行中", value: "interviewing" },
      { text: "已发Offer", value: "offered" },
      { text: "已淘汰", value: "rejected" },
    ],
    onFilter: (value, record) => record.status === value,
  },
  {
    title: "最后更新",
    dataIndex: "lastUpdate",
    key: "lastUpdate",
    width: 120,
    sorter: (a, b) => new Date(a.lastUpdate) - new Date(b.lastUpdate),
  },
  {
    title: "操作",
    key: "action",
    fixed: "right",
    width: 180,
  },
];

// 候选人列表数据
const candidateList = reactive([
  {
    id: 1,
    name: "李明",
    email: "liming@example.com",
    avatar: "",
    position: "高级前端开发工程师",
    department: "技术部",
    skills: ["React", "TypeScript", "微前端"],
    matchScore: 92,
    status: "interviewing",
    lastUpdate: "2025-04-06",
  },
  {
    id: 2,
    name: "王芳",
    email: "wangfang@example.com",
    avatar: "",
    position: "资深前端开发",
    department: "技术部",
    skills: ["React", "Next.js", "性能优化"],
    matchScore: 86,
    status: "screening",
    lastUpdate: "2025-04-05",
  },
  {
    id: 3,
    name: "张伟",
    email: "zhangwei@example.com",
    avatar: "",
    position: "全栈开发工程师",
    department: "技术部",
    skills: ["Vue.js", "Node.js", "Express"],
    matchScore: 78,
    status: "offered",
    lastUpdate: "2025-04-04",
  },
  {
    id: 4,
    name: "赵小明",
    email: "zhaoxm@example.com",
    avatar: "",
    position: "产品经理",
    department: "产品部",
    skills: ["用户研究", "产品设计", "数据分析"],
    matchScore: 65,
    status: "rejected",
    lastUpdate: "2025-04-03",
  },
  {
    id: 5,
    name: "陈静",
    email: "chenjing@example.com",
    avatar: "",
    position: "数据分析师",
    department: "数据部",
    skills: ["Python", "SQL", "数据可视化"],
    matchScore: 82,
    status: "interviewing",
    lastUpdate: "2025-04-02",
  },
]);

// AI推荐候选人数据
const recommendedCandidates = reactive([
  {
    id: 101,
    name: "李远",
    position: "前端开发工程师",
    experience: "4年经验",
    avatar: "",
    matchScore: 95,
    scores: {
      技术技能: 96,
      工作经验: 92,
      教育背景: 94,
    },
    tags: ["React", "TypeScript", "微前端", "+4"],
  },
  {
    id: 102,
    name: "郑明华",
    position: "前端开发工程师",
    experience: "5年经验",
    avatar: "",
    matchScore: 93,
    scores: {
      技术技能: 95,
      工作经验: 90,
      教育背景: 90,
    },
    tags: ["React", "Node.js", "Webpack", "+5"],
  },
  {
    id: 103,
    name: "林佳怡",
    position: "前端开发工程师",
    experience: "3年经验",
    avatar: "",
    matchScore: 90,
    scores: {
      技术技能: 92,
      工作经验: 88,
      教育背景: 95,
    },
    tags: ["Vue.js", "React", "CSS3", "+3"],
  },
]);

// 表格选择处理
const onSelectChange = (keys) => {
  selectedRowKeys.value = keys;
};

// 处理标签
const removeTag = (tag) => {
  const index = activeTags.value.indexOf(tag);
  if (index !== -1) {
    activeTags.value.splice(index, 1);
  }
};

const clearAllTags = () => {
  activeTags.value = [];
};

// 获取匹配分数样式
const getMatchClass = (score) => {
  if (score >= 85) return "match-high";
  if (score >= 70) return "match-medium";
  return "match-low";
};

const getMatchColor = (score) => {
  if (score >= 85) return "var(--success-color)";
  if (score >= 70) return "var(--primary-color)";
  return "var(--warning-color)";
};

// 获取状态颜色和文本
const getStatusColor = (status) => {
  const colors = {
    screening: "blue",
    interviewing: "green",
    offered: "purple",
    rejected: "red",
    onboarded: "cyan",
  };
  return colors[status] || "default";
};

const getStatusText = (status) => {
  const texts = {
    screening: "简历筛选",
    interviewing: "面试进行中",
    offered: "已发Offer",
    rejected: "已淘汰",
    onboarded: "已入职",
  };
  return texts[status] || status;
};

// 操作方法
const viewCandidate = (id) => {
  // 查看候选人详情
  console.log("查看候选人:", id);
};

const interviewCandidate = (id) => {
  // 安排面试
  console.log("安排面试:", id);
};

const addToTalentPool = (id) => {
  // 添加到人才库
  console.log("添加到人才库:", id);
};

const sendEmail = (id) => {
  // 发送邮件
  console.log("发送邮件:", id);
};

const rejectCandidate = (id) => {
  // 淘汰候选人
  console.log("淘汰候选人:", id);
};
</script>

<style scoped>
.candidates-page {
  padding: 1.5rem;
  background-color: var(--bg-color);
}

/* 页面标题区域 */
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  background: var(--component-bg);
  padding: 1.5rem;
  border-radius: .5rem;
  box-shadow: var(--card-shadow);
}

.header-content {
  flex: 1;
}

.title {
  margin: 0;
  font-size: 1.375rem;
  font-weight: 600;
  color: var(--text-color);
}

.subtitle {
  color: var(--text-secondary);
  margin: .5rem 0 0;
}

.header-actions {
  display: flex;
  gap: .75rem;
}

/* 统计卡片样式 */
.stats-section {
  display: flex;
  flex-wrap: wrap;
  gap: 1.25rem;
  margin-bottom: 1.5rem;
}

.stat-card {
  background-color: var(--component-bg);
  border-radius: .5rem;
  box-shadow: var(--card-shadow);
  padding: 1.5rem;
  border: .0625rem solid var(--border-color);
  flex: 1;
  min-width: 15.625rem;
}

.stat-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.stat-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-color);
}

.stat-icon-bg {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: .5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
}

.stat-icon-bg.blue {
  background-color: rgba(var(--info-color-rgb), 0.15);
  color: var(--info-color);
}

.stat-icon-bg.green {
  background-color: rgba(var(--success-color-rgb), 0.15);
  color: var(--success-color);
}

.stat-icon-bg.purple {
  background-color: rgba(var(--primary-color-rgb), 0.15);
  color: var(--primary-color);
}

.stat-icon-bg.yellow {
  background-color: rgba(var(--warning-color-rgb), 0.15);
  color: var(--warning-color);
}

.stat-values {
  display: flex;
  align-items: flex-end;
}

.stat-value {
  font-size: 1.75rem;
  font-weight: 600;
  color: var(--text-color);
  line-height: 1;
  margin-right: .5rem;
}

.stat-trend {
  display: flex;
  align-items: center;
  font-size: .875rem;
  margin-bottom: .25rem;
}

.trend-icon {
  margin-right: .25rem;
}

.stat-trend.positive {
  color: var(--success-color);
}

.stat-trend.negative {
  color: var(--error-color);
}

.stat-desc {
  font-size: .875rem;
  color: var(--text-secondary);
  margin-top: .5rem;
}

/* 工具栏样式 */
.toolbar-section {
  background-color: var(--component-bg);
  border-radius: .5rem;
  box-shadow: var(--card-shadow);
  padding: 1rem;
  margin-bottom: 1.5rem;
  border: .0625rem solid var(--border-color);
}

.select-section {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.filter-group {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.search-group {
  display: flex;
  gap: 1rem;
}

/* 暗黑模式适配 */
[data-theme="dark"] .stat-card {
  background-color: var(--component-bg);
  border-color: var(--border-color);
}

[data-theme="dark"] .stat-card .stat-icon-bg.blue {
  background-color: rgba(var(--info-color-rgb), 0.25) !important;
  color: var(--info-color);
}

[data-theme="dark"] .stat-card .stat-icon-bg.green {
  background-color: rgba(var(--success-color-rgb), 0.25) !important;
  color: var(--success-color);
}

[data-theme="dark"] .stat-card .stat-icon-bg.purple {
  background-color: rgba(var(--primary-color-rgb), 0.25) !important;
  color: var(--primary-color);
}

[data-theme="dark"] .stat-card .stat-icon-bg.yellow {
  background-color: rgba(var(--warning-color-rgb), 0.25) !important;
  color: var(--warning-color);
}

/* 筛选器暗黑模式适配 */
[data-theme="dark"] :deep(.ant-select-selector) {
  background-color: var(--component-bg) !important;
  border-color: var(--border-color) !important;
  color: var(--text-color) !important;
}

[data-theme="dark"] :deep(.ant-select-selection-placeholder),
[data-theme="dark"] :deep(.ant-select-selection-item) {
  color: var(--text-color) !important;
}

[data-theme="dark"] :deep(.ant-select-arrow) {
  color: var(--text-secondary) !important;
}

[data-theme="dark"] :deep(.ant-select-dropdown) {
  background-color: var(--component-bg) !important;
  border: .0625rem solid var(--border-color);
}

[data-theme="dark"] :deep(.ant-select-item) {
  color: var(--text-color) !important;
}

[data-theme="dark"] :deep(.ant-select-item-option-active),
[data-theme="dark"] :deep(.ant-select-item-option-selected) {
  background-color: var(--menu-item-active) !important;
}

/* 响应式布局 */
@media (max-width: 48rem) {
  .page-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .header-actions {
    margin-top: 1rem;
    width: 100%;
  }

  .stats-section {
    flex-direction: column;
  }

  .select-section {
    flex-direction: column;
  }

  .filter-group,
  .search-group {
    width: 100%;
  }
}

/* 添加标签筛选样式 */
.tag-filters {
  display: flex;
  flex-wrap: wrap;
  gap: .5rem;
  margin-bottom: 1rem;
  align-items: center;
}

.filter-tag {
  background-color: var(--menu-item-hover);
  border-color: var(--border-color);
  color: var(--text-color);
  padding: .25rem .625rem;
  cursor: pointer;
  transition: all 0.3s;
}

.filter-tag:hover {
  transform: translateY(-0.125rem);
}

/* 候选人列表样式 */
.candidate-list-card {
  margin-bottom: 1.5rem;
}

/* 候选人信息单元格样式 */
.candidate-info-cell {
  display: flex;
  align-items: center;
  gap: .75rem;
}

.candidate-info-text {
  display: flex;
  flex-direction: column;
}

.candidate-name {
  font-weight: 500;
  color: var(--text-color);
}

.candidate-email {
  font-size: .75rem;
  color: var(--text-secondary);
}

/* 职位单元格样式 */
.position-cell {
  display: flex;
  flex-direction: column;
}

.position-title {
  font-weight: 500;
  color: var(--text-color);
}

.position-department {
  font-size: .75rem;
  color: var(--text-secondary);
}

/* 技能标签样式 */
.skills-cell {
  display: flex;
  flex-wrap: wrap;
  gap: .25rem;
}

.skill-tag {
  margin: 0;
}

/* 匹配度样式 */
.match-cell {
  display: flex;
  flex-direction: column;
}

.match-high {
  color: var(--success-color);
  font-weight: 500;
}

.match-medium {
  color: var(--primary-color);
  font-weight: 500;
}

.match-low {
  color: var(--warning-color);
  font-weight: 500;
}

/* 操作单元格样式 */
.action-cell {
  display: flex;
  align-items: center;
}

/* 批量操作栏样式 */
.batch-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(var(--primary-color-rgb), 0.1);
  padding: .75rem 1rem;
  border-radius: .5rem;
  margin-bottom: 1.5rem;
}

.selected-count {
  font-weight: 500;
  color: var(--primary-color);
}

.action-buttons {
  display: flex;
  gap: .5rem;
  flex-wrap: wrap;
}

/* 暗黑模式下的表格样式 */
[data-theme="dark"] :deep(.ant-table) {
  background-color: var(--component-bg);
  color: var(--text-color);
}

[data-theme="dark"] :deep(.ant-table-thead > tr > th) {
  background-color: var(--bg-color);
  color: var(--text-color);
  border-bottom: .0625rem solid var(--border-color);
}

[data-theme="dark"] :deep(.ant-table-tbody > tr > td) {
  border-bottom: .0625rem solid var(--border-color);
}

[data-theme="dark"] :deep(.ant-table-tbody > tr.ant-table-row:hover > td) {
  background-color: rgba(255, 255, 255, 0.08);
}

[data-theme="dark"] :deep(.ant-pagination-item) {
  background-color: var(--component-bg);
  border-color: var(--border-color);
}

[data-theme="dark"] :deep(.ant-pagination-item a) {
  color: var(--text-color);
}

[data-theme="dark"] :deep(.ant-pagination-item-active) {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
}

[data-theme="dark"] :deep(.ant-pagination-item-active a) {
  color: var(--text-light);
}

/* 暗黑模式下的标签样式 */
[data-theme="dark"] .filter-tag {
  background-color: rgba(255, 255, 255, 0.08);
  border-color: var(--border-color);
}

/* AI推荐区域样式 */
.ai-recommendation {
  margin-bottom: 1.5rem;
}

.ai-section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.ai-section-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-color);
  margin: 0;
}

.ai-insight-box {
  display: flex;
  background-color: rgba(var(--primary-color-rgb), 0.08);
  border-radius: .5rem;
  padding: 1rem;
  margin-bottom: 1.5rem;
}

.ai-insight-icon {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background-color: rgba(var(--primary-color-rgb), 0.15);
  color: var(--primary-color);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  flex-shrink: 0;
  font-size: 1.25rem;
}

.ai-insight-title {
  font-weight: 600;
  color: var(--text-color);
  margin-top: 0;
  margin-bottom: .5rem;
}

.ai-insight-text {
  color: var(--text-secondary);
  margin: 0;
  line-height: 1.6;
}

.recommendation-cards {
  margin-top: 1rem;
}

.recommendation-card {
  background-color: var(--bg-color);
  border-radius: .5rem;
  padding: 1rem;
  margin-bottom: 1rem;
  border-left: .25rem solid var(--success-color);
  transition: all 0.3s;
}

.recommendation-card:hover {
  transform: translateY(-0.25rem);
  box-shadow: var(--card-shadow);
}

.high-match {
  border-left-color: var(--primary-color);
}

.rec-card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.rec-candidate-info {
  display: flex;
  align-items: center;
  gap: .75rem;
}

.rec-text-info {
  display: flex;
  flex-direction: column;
}

.rec-name {
  font-weight: 600;
  color: var(--text-color);
  margin: 0;
  margin-bottom: .25rem;
}

.rec-position {
  font-size: .75rem;
  color: var(--text-secondary);
  margin: 0;
}

.rec-match-score {
  padding: .25rem .5rem;
  background-color: rgba(var(--success-color-rgb), 0.15);
  color: var(--success-color);
  border-radius: 1rem;
  font-size: .75rem;
  font-weight: 600;
}

.rec-scores {
  margin-bottom: 1rem;
}

.rec-score-item {
  display: flex;
  align-items: center;
  margin-bottom: .5rem;
}

.rec-score-label {
  width: 5rem;
  font-size: .75rem;
  color: var(--text-secondary);
}

.rec-score-value {
  width: 2.5rem;
  text-align: right;
  font-size: .75rem;
  color: var(--success-color);
  font-weight: 500;
}

:deep(.ant-progress) {
  flex: 1;
  margin: 0 .5rem;
}

.rec-tags {
  display: flex;
  flex-wrap: wrap;
  gap: .25rem;
  margin-bottom: 1rem;
}

.rec-actions {
  display: flex;
  gap: .5rem;
}

.rec-actions button:first-child {
  flex: 1;
}

/* 暗黑模式适配 */
[data-theme="dark"] .recommendation-card {
  background-color: var(--component-bg);
  border-left-color: var(--success-color);
}

[data-theme="dark"] .high-match {
  border-left-color: var(--primary-color);
}

[data-theme="dark"] .ai-insight-box {
  background-color: rgba(var(--primary-color-rgb), 0.15);
}

/* 响应式适配 */
@media (max-width: 48rem) {
  .rec-card-header {
    flex-direction: column;
  }

  .rec-match-score {
    margin-top: .5rem;
  }

  .rec-actions {
    flex-direction: column;
  }
}
</style>
