<template>
  <div class="matching-page">
    <!-- 页面标题区域 -->
    <div class="page-header">
      <div class="header-content">
        <h1 class="title">{{ $t("matching.title") }}</h1>
        <p class="subtitle">{{ $t("matching.subtitle") }}</p>
      </div>
      <div class="header-actions">
        <a-button type="primary">
          {{ $t("matching.actions.advancedFilter") }}
        </a-button>
        <a-button>
          {{ $t("matching.actions.export") }}
        </a-button>
      </div>
    </div>

    <!-- 筛选条件 -->
    <div class="filters-section">
      <div class="filters-card">
        <div class="filters">
          <a-select
            v-model:value="filters.candidate"
            style="width: 200px"
            :placeholder="$t('matching.filters.allCandidates')"
            :default-value="filters.candidate"
          >
            <a-select-option value="all">{{
              $t("matching.filters.allCandidates")
            }}</a-select-option>
            <a-select-option value="new">{{
              $t("matching.filters.newCandidates")
            }}</a-select-option>
            <a-select-option value="interviewed">{{
              $t("matching.filters.interviewed")
            }}</a-select-option>
          </a-select>

          <a-select
            v-model:value="filters.requirement"
            style="width: 200px"
            :placeholder="$t('matching.filters.allSkills')"
            :default-value="filters.requirement"
          >
            <a-select-option value="all">{{
              $t("matching.filters.allSkills")
            }}</a-select-option>
            <a-select-option value="tech">{{
              $t("matching.filters.technical")
            }}</a-select-option>
            <a-select-option value="soft">{{
              $t("matching.filters.soft")
            }}</a-select-option>
          </a-select>
        </div>
      </div>
    </div>

    <!-- 候选人卡片列表 -->
    <div class="candidates-section">
      <a-row :gutter="24">
        <a-col
          :xs="24"
          :sm="24"
          :md="12"
          :lg="8"
          v-for="candidate in candidates"
          :key="candidate.id"
        >
          <!-- 候选人卡片 -->
          <a-card class="candidate-card" :bordered="false">
            <!-- 候选人头像 -->
            <div class="candidate-header">
              <div class="candidate-avatar">
                <user-outlined />
              </div>
              <!-- 候选人信息 -->
              <div class="candidate-info">
                <h3>{{ candidate.name }}</h3>
                <p>{{ candidate.title }} | {{ candidate.experience }}</p>
              </div>
              <!-- 匹配得分 -->
              <div class="match-score">{{ candidate.matchScore }}%</div>
            </div>

            <!-- 技能得分 -->
            <div class="skill-scores">
              <div
                class="skill-item"
                v-for="(score, skill) in candidate.skills"
                :key="skill"
              >
                <span class="skill-name">{{ skill }}</span>
                <a-progress
                  :percent="score"
                  :show-info="false"
                  :stroke-color="getScoreColor(score)"
                />
                <span class="skill-score">{{ score }}%</span>
              </div>
            </div>

            <!-- 候选人标签 -->
            <div class="candidate-tags">
              <a-tag
                v-for="tag in getDisplayTags(candidate.tags).displayTags"
                :key="tag"
              >
                {{ tag }}
              </a-tag>
              <a-tag
                v-if="getDisplayTags(candidate.tags).hasMore"
                class="more-tag"
              >
                +{{ getDisplayTags(candidate.tags).remaining }}
              </a-tag>
            </div>

            <!-- 卡片操作按钮 -->
            <div class="card-actions">
              <a-button type="primary" block>{{
                $t("matching.actions.viewDetails")
              }}</a-button>
              <a-button block>{{ $t("matching.actions.schedule") }}</a-button>
            </div>
          </a-card>
        </a-col>
      </a-row>
    </div>

    <!-- 加载更多候选人 -->
    <div class="load-more">
      <a-button type="link">加载更多候选人</a-button>
    </div>

    <!-- AI匹配分析报告 -->
    <div class="analysis-section">
      <a-card class="analysis-card">
        <div class="card-header">
          <div class="header-title">
            <bulb-outlined />
            <span>AI匹配分析报告</span>
          </div>
          <div class="report-meta">
            <span>最后更新: 今天 10:23</span>
            <a-button type="link">
              <template #icon><sync-outlined /></template>
              刷新分析
            </a-button>
          </div>
        </div>
        <div class="card-body">
          <!-- AI招聘建议 -->
          <div class="suggestion-card">
            <div class="suggestion-icon">
              <bulb-outlined />
            </div>
            <div class="suggestion-content">
              <h3>AI招聘建议</h3>
              <p>
                根据对当前候选人池的分析，建议优先考虑具有React和TypeScript经验的候选人。团队中缺乏微前端架构经验，这也应作为加分项。考虑放宽学历要求，因为有多位技术能力出色的候选人不满足当前学历条件。
              </p>
            </div>
          </div>

          <!-- 技能缺口分析 -->
          <div class="skill-analysis">
            <h3>技能缺口分析</h3>
            <div class="skill-item">
              <div class="skill-name">React</div>
              <a-progress :percent="85" status="success" />
              <div class="skill-status">充足</div>
            </div>
            <div class="skill-item">
              <div class="skill-name">TypeScript</div>
              <a-progress :percent="80" status="success" />
              <div class="skill-status">充足</div>
            </div>
          </div>
        </div>
      </a-card>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import {
  UserOutlined,
  BulbOutlined,
  SyncOutlined,
} from "@ant-design/icons-vue";
import { useAppStore } from "../../stores/app";

const filters = reactive({
  candidate: "all",
  requirement: "all",
});

const appStore = useAppStore();

const isDarkMode = computed(() => {
  return appStore.theme === "dark";
});

const candidates = ref([
  {
    id: 1,
    name: "李明",
    title: "前端开发工程师",
    experience: "5年经验",
    matchScore: 92,
    skills: {
      技术技能: 88,
      工作经验: 88,
      学历背景: 100,
    },
    tags: ["React", "Vue.js", "TypeScript", "前端架构", "+3"],
  },
  {
    id: 2,
    name: "王芳",
    title: "资深前端开发工程师",
    experience: "7年经验",
    matchScore: 86,
    skills: {
      技术技能: 90,
      工作经验: 96,
      学历背景: 70,
    },
    tags: ["React", "Next.js", "前端优化", "性能优化", "+5"],
  },
  {
    id: 3,
    name: "张伟",
    title: "全栈开发工程师",
    experience: "4年经验",
    matchScore: 78,
    skills: {
      技术技能: 75,
      工作经验: 72,
      学历背景: 90,
    },
    tags: ["Vue.js", "Node.js", "TypeScript", "Express", "+2"],
  },
]);

const getScoreColor = (score) => {
  if (score >= 90) return "var(--success-color)";
  if (score >= 75) return "var(--primary-color)";
  return "var(--warning-color)";
};

const getDisplayTags = (tags) => {
  if (tags.length <= 6)
    return { displayTags: tags, hasMore: false, remaining: 0 };
  return {
    displayTags: tags.slice(0, 6),
    hasMore: true,
    remaining: tags.length - 6,
  };
};
</script>

<style scoped>
.matching-page {
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

.header-content {
  flex: 1;
}

.title {
  margin: 0;
  font-size: 22px;
  font-weight: 600;
  color: var(--text-color);
}

.subtitle {
  color: var(--text-secondary);
  margin: 8px 0 0;
}

.header-actions {
  display: flex;
  gap: 12px;
}

/* 筛选条件区域 */
.filters-section {
  margin-bottom: 24px;
}

.filters-card {
  background: var(--component-bg);
  padding: 16px 24px;
  border-radius: 8px;
  box-shadow: var(--card-shadow);
  border: 1px solid var(--border-color);
}

.filters {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

/* 修复筛选器在暗黑模式下的样式 */
[data-theme="dark"] .filters-card,
[data-theme="dark"] :deep(.ant-select-selector) {
  border-color: var(--border-color);
  background-color: var(--component-bg);
}

[data-theme="dark"] :deep(.ant-select-selection-placeholder),
[data-theme="dark"] :deep(.ant-select-selection-item) {
  color: var(--text-color);
}

[data-theme="dark"] :deep(.ant-select-arrow) {
  color: var(--text-secondary);
}

[data-theme="dark"] :deep(.ant-select-dropdown) {
  background-color: var(--component-bg);
  border: 1px solid var(--border-color);
}

[data-theme="dark"] :deep(.ant-select-item) {
  color: var(--text-color);
}

[data-theme="dark"] :deep(.ant-select-item-option-active),
[data-theme="dark"] :deep(.ant-select-item-option-selected) {
  background-color: var(--menu-item-active);
}

/* 候选人列表区域 */
.candidates-section {
  margin-bottom: 24px;
}

.candidate-card {
  border-radius: 8px;
  background: var(--component-bg);
  border: 1px solid var(--border-color);
  box-shadow: var(--card-shadow);
  cursor: pointer;
  transition: all 0.3s ease;
  height: 100%;
}

.candidate-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08);
}

[data-theme="dark"] .candidate-card:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.16);
}

.card-top {
  display: flex;
  padding: 16px;
  border-bottom: 1px solid var(--border-color);
}

.avatar {
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background: var(--menu-item-hover);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: var(--primary-color);
  margin-right: 16px;
}

.basic-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.name {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 4px;
}

.title {
  font-size: 14px;
  color: var(--text-secondary);
  margin-bottom: 4px;
}

.match-score {
  display: inline-block;
  padding: 2px 8px;
  background: rgba(var(--success-color-rgb), 0.15);
  color: var(--success-color);
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
}

.high-match {
  background: rgba(var(--success-color-rgb), 0.15);
  color: var(--success-color);
}

.medium-match {
  background: rgba(var(--warning-color-rgb), 0.15);
  color: var(--warning-color);
}

.low-match {
  background: rgba(var(--error-color-rgb), 0.15);
  color: var(--error-color);
}

.card-content {
  padding: 16px;
}

.skill-tag {
  display: inline-flex;
  align-items: center;
  padding: 4px 8px;
  background: var(--menu-item-hover);
  color: var(--text-color);
  border-radius: 4px;
  font-size: 12px;
  margin-right: 8px;
  margin-bottom: 8px;
}

.exp-tag {
  background: rgba(var(--info-color-rgb), 0.15);
  color: var(--info-color);
}

.edu-tag {
  background: rgba(var(--primary-color-rgb), 0.15);
  color: var(--primary-color);
}

.view-detail {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 8px;
  color: var(--primary-color);
  cursor: pointer;
}

.view-detail:hover {
  text-decoration: underline;
}

/* 过滤器卡片样式 */
.filters-card {
  background: var(--component-bg);
  padding: 16px 20px;
  border-radius: 8px;
  box-shadow: var(--card-shadow);
  margin-bottom: 24px;
  border: 1px solid var(--border-color);
}

.filter-title {
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 16px;
  font-size: 16px;
}

.filter-row {
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

/* 加载更多区域 */
.load-more {
  text-align: center;
  padding: 16px;
  background: var(--component-bg);
  border-radius: 8px;
  margin-bottom: 24px;
  box-shadow: var(--card-shadow);
}

[data-theme="dark"] .load-more {
  border: 1px solid var(--border-color);
}

/* 分析报告区域 */
.analysis-section {
  margin-bottom: 24px;
}

.analysis-card {
  background: var(--component-bg);
  border-radius: 8px;
  box-shadow: var(--card-shadow);
  overflow: hidden;
}

[data-theme="dark"] .analysis-card {
  border: 1px solid var(--border-color);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid var(--border-color);
}

.header-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  color: var(--text-color);
  font-size: 16px;
}

.report-meta {
  display: flex;
  align-items: center;
  gap: 16px;
  color: var(--text-secondary);
  font-size: 14px;
}

.card-body {
  padding: 24px;
}

.suggestion-card {
  display: flex;
  gap: 16px;
  padding: 20px;
  background: var(--menu-item-hover);
  border-radius: 8px;
  margin-bottom: 24px;
  transition: all 0.3s;
}

.suggestion-card:hover {
  background: var(--menu-item-active);
}

.suggestion-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: rgba(var(--primary-color-rgb), 0.15);
  border-radius: 20px;
  color: var(--primary-color);
  font-size: 20px;
  flex-shrink: 0;
}

.suggestion-content h3 {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 600;
  color: var(--text-color);
}

.suggestion-content p {
  margin: 0;
  color: var(--text-secondary);
  line-height: 1.6;
}

.skill-analysis {
  padding: 20px;
  background: var(--component-bg);
  border-radius: 8px;
  border: 1px solid var(--border-color);
  transition: all 0.3s;
}

.skill-analysis:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

[data-theme="dark"] .skill-analysis:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.skill-analysis h3 {
  margin: 0 0 16px;
  font-size: 16px;
  font-weight: 600;
  color: var(--text-color);
}

.skill-item {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}

.skill-item:last-child {
  margin-bottom: 0;
}

.skill-name {
  width: 100px;
  color: var(--text-color);
}

.skill-status {
  width: 60px;
  text-align: right;
  color: var(--success-color);
}

:deep(.ant-progress) {
  flex: 1;
  margin: 0 16px;
}

:deep(.ant-progress-success-bg) {
  background: var(--success-color) !important;
}

/* 响应式布局 */
@media (max-width: 768px) {
  .page-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .header-actions {
    margin-top: 16px;
    width: 100%;
  }

  .filters {
    flex-direction: column;
    align-items: flex-start;
  }

  .filters > * {
    width: 100% !important;
  }

  .card-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .report-meta {
    margin-top: 12px;
  }
}

/* 避免全局滚动条样式 */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: var(--border-color);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--text-third);
}

/* 候选人卡片下的技能标签 */
:deep(.ant-tag) {
  background: var(--menu-item-hover);
  border-color: var(--border-color);
  color: var(--text-color);
  margin: 4px;
  white-space: nowrap;
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 暗黑模式下技能标签样式 */
[data-theme="dark"] :deep(.ant-tag) {
  background-color: rgba(255, 255, 255, 0.08);
  border-color: var(--border-color);
  color: var(--text-color);
}

:deep(.more-tag) {
  background: var(--primary-color);
  color: var(--text-light);
  border-color: var(--primary-color);
  cursor: pointer;
}

:deep(.more-tag:hover) {
  opacity: 0.9;
}

/* 卡片按钮样式优化 */
.card-actions {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 8px;
  margin-top: auto;
  padding-top: 16px;
}

:deep(.ant-btn-primary) {
  background: var(--primary-color);
  color: var(--text-light);
  border-color: var(--primary-color);
}

[data-theme="dark"] :deep(.ant-btn:not(.ant-btn-primary)) {
  background: var(--component-bg);
  color: var(--text-color);
  border-color: var(--border-color);
}

:deep(.ant-btn:hover) {
  transform: translateY(-2px);
  transition: all 0.3s;
}
</style>
