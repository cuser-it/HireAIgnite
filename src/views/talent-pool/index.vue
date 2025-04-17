<template>
  <div class="talent-pool-page">
    <!-- 页面标题 -->
    <div class="page-header">
      <h1 class="page-title">{{ $t("talentPool.title") }}</h1>
      <p class="page-description">{{ $t("talentPool.subtitle") }}</p>
    </div>

    <!-- 统计卡片 -->
    <div class="stats-section">
      <div class="stats-grid">
        <div class="stat-item primary">
          <div class="stat-header">
            <span class="stat-label">{{
              $t("talentPool.stats.totalTalents")
            }}</span>
            <star-outlined class="stat-icon" />
          </div>
          <div class="stat-value">428</div>
          <div class="stat-trend positive">
            <arrow-up-outlined class="trend-icon" />8%
            <span class="trend-text">{{
              $t("talentPool.stats.vsLastMonth")
            }}</span>
          </div>
        </div>
        <div class="stat-item success">
          <div class="stat-header">
            <span class="stat-label">{{
              $t("talentPool.stats.techTalents")
            }}</span>
            <code-outlined class="stat-icon" />
          </div>
          <div class="stat-value">245</div>
          <div class="stat-trend">
            <span class="trend-text">{{
              $t("talentPool.stats.techTalentPercent", { percent: 57.2 })
            }}</span>
          </div>
        </div>
        <div class="stat-item info">
          <div class="stat-header">
            <span class="stat-label">{{
              $t("talentPool.stats.activeContacts")
            }}</span>
            <message-outlined class="stat-icon" />
          </div>
          <div class="stat-value">62</div>
          <div class="stat-trend negative">
            <arrow-down-outlined class="trend-icon" />5%
            <span class="trend-text">{{
              $t("talentPool.stats.vsLastMonth")
            }}</span>
          </div>
        </div>
        <div class="stat-item warning">
          <div class="stat-header">
            <span class="stat-label">{{
              $t("talentPool.stats.intentionTracking")
            }}</span>
            <like-outlined class="stat-icon" />
          </div>
          <div class="stat-value">35</div>
          <div class="stat-trend">
            <span class="trend-text">{{
              $t("talentPool.stats.nextFollow", { count: 12 })
            }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 人才库分组 -->
    <div class="groups-section">
      <h2 class="section-title">{{ $t("talentPool.groups.title") }}</h2>
      <div class="groups-list">
        <a-button type="primary" class="group-btn">{{
          $t("talentPool.groups.allTalents")
        }}</a-button>
        <a-button class="group-btn">{{
          $t("talentPool.groups.techElite")
        }}</a-button>
        <a-button class="group-btn">{{
          $t("talentPool.groups.productDesign")
        }}</a-button>
        <a-button class="group-btn">{{
          $t("talentPool.groups.management")
        }}</a-button>
        <a-button class="group-btn">{{
          $t("talentPool.groups.marketing")
        }}</a-button>
        <a-button class="group-btn">{{
          $t("talentPool.groups.dataScientist")
        }}</a-button>
        <a-button class="group-btn add-group-btn">
          <plus-outlined />{{ $t("talentPool.groups.addGroup") }}
        </a-button>
      </div>
    </div>

    <!-- 筛选工具栏 -->
    <div class="talent-list-section">
      <div class="list-toolbar">
        <div class="filters">
          <a-select
            v-model="filterStatus"
            style="width: 200px"
            class="mb-3 sm:mb-0"
            :default-value="filterStatus"
          >
            <a-select-option value="all">{{
              $t("talentPool.filter.allTalents")
            }}</a-select-option>
            <a-select-option value="recent">{{
              $t("talentPool.filter.recentContact")
            }}</a-select-option>
            <a-select-option value="long-no-contact">{{
              $t("talentPool.filter.longNoContact")
            }}</a-select-option>
            <a-select-option value="has-intention">{{
              $t("talentPool.filter.hasIntention")
            }}</a-select-option>
            <a-select-option value="eliminated">{{
              $t("talentPool.filter.eliminated")
            }}</a-select-option>
          </a-select>
          <a-select
            v-model="filterCategory"
            style="width: 200px"
            :default-value="filterCategory"
          >
            <a-select-option value="all">{{
              $t("talentPool.filter.allCategories")
            }}</a-select-option>
            <a-select-option value="frontend">{{
              $t("talentPool.filter.frontend")
            }}</a-select-option>
            <a-select-option value="backend">{{
              $t("talentPool.filter.backend")
            }}</a-select-option>
            <a-select-option value="product">{{
              $t("talentPool.filter.productManager")
            }}</a-select-option>
            <a-select-option value="design">{{
              $t("talentPool.filter.designer")
            }}</a-select-option>
            <a-select-option value="data">{{
              $t("talentPool.filter.dataAnalyst")
            }}</a-select-option>
          </a-select>
          <a-input-search
            v-model="searchText"
            :placeholder="$t('talentPool.filter.searchPlaceholder')"
            style="width: 250px"
          />
        </div>
        <div class="actions">
          <a-button type="primary">
            <plus-outlined />{{ $t("talentPool.createGroup") }}
          </a-button>
          <a-button>
            <filter-outlined />{{ $t("talentPool.filter.filter") }}
          </a-button>
          <a-button>
            <sort-ascending-outlined />{{ $t("talentPool.filter.sort") }}
          </a-button>
        </div>
      </div>

      <!-- 人才卡片列表 -->
      <div class="talent-cards">
        <a-row :gutter="24">
          <a-col
            v-for="talent in talents"
            :key="talent.id"
            :xs="24"
            :md="12"
            :lg="8"
            class="mb-6"
          >
            <a-card class="talent-card">
              <div class="talent-header">
                <div class="talent-info">
                  <a-avatar
                    :src="talent.avatar"
                    :size="56"
                    class="talent-avatar"
                  />
                  <div class="talent-details">
                    <h3 class="talent-name">{{ talent.name }}</h3>
                    <p class="talent-position">{{ talent.position }}</p>
                    <div class="talent-location">
                      <environment-outlined class="location-icon" />
                      <span>{{ talent.location }}</span>
                    </div>
                  </div>
                </div>
                <a-tag :color="getStatusColor(talent.status)">
                  {{ $t(`talentPool.talentCard.status.${talent.status}`) }}
                </a-tag>
              </div>

              <div class="talent-skills">
                <a-tag
                  v-for="skill in talent.skills"
                  :key="skill"
                  color="blue"
                  >{{ skill }}</a-tag
                >
              </div>

              <div class="talent-details-grid">
                <div class="detail-item">
                  <span class="detail-label">{{
                    $t("talentPool.talentCard.workExperience")
                  }}</span>
                  <p class="detail-value">{{ talent.experience }}</p>
                </div>
                <div class="detail-item">
                  <span class="detail-label">{{
                    $t("talentPool.talentCard.education")
                  }}</span>
                  <p class="detail-value">{{ talent.education }}</p>
                </div>
                <div class="detail-item">
                  <span class="detail-label">{{
                    $t("talentPool.talentCard.currentCompany")
                  }}</span>
                  <p class="detail-value">{{ talent.company }}</p>
                </div>
                <div class="detail-item">
                  <span class="detail-label">{{
                    $t("talentPool.talentCard.lastContact")
                  }}</span>
                  <p class="detail-value">{{ talent.lastContact }}</p>
                </div>
              </div>

              <div class="talent-actions">
                <a-button type="primary" block>
                  <user-add-outlined />{{ $t("talentPool.talentCard.recruit") }}
                </a-button>
                <a-button>
                  <mail-outlined />{{ $t("talentPool.talentCard.contact") }}
                </a-button>
                <a-button>
                  <more-outlined />
                </a-button>
              </div>
            </a-card>
          </a-col>
        </a-row>
      </div>

      <!-- 分页 -->
      <div class="pagination-container">
        <span class="pagination-info">
          {{
            $t("talentPool.pagination.showing", {
              start: 1,
              end: 6,
              total: 428,
            })
          }}
        </span>
        <a-pagination
          v-model="currentPage"
          :total="428"
          :page-size="6"
          show-quick-jumper
          :show-total="
            (total) =>
              $t('talentPool.pagination.showing', {
                start: (currentPage - 1) * 6 + 1,
                end: Math.min(currentPage * 6, total),
                total,
              })
          "
        />
      </div>
    </div>

    <!-- AI人才洞察 -->
    <div class="ai-insights-section">
      <div class="section-header">
        <h2 class="section-title">{{ $t("talentPool.aiInsights.title") }}</h2>
        <a-button type="link">
          {{ $t("talentPool.aiInsights.viewReport") }}
          <right-outlined />
        </a-button>
      </div>

      <a-alert class="ai-tip" type="info" show-icon>
        <template #icon><bulb-outlined /></template>
        <template #message>
          <h3 class="ai-tip-title">{{ $t("talentPool.aiInsights.aiTip") }}</h3>
        </template>
        <template #description>
          <p class="ai-tip-text">
            {{ $t("talentPool.aiInsights.tipContent") }}
          </p>
        </template>
      </a-alert>

      <div class="insights-grid">
        <div class="insight-card">
          <h3 class="subsection-title">
            {{ $t("talentPool.aiInsights.distribution") }}
          </h3>
          <div class="chart-placeholder">
            <pie-chart-outlined class="chart-icon" />
            <p>{{ $t("talentPool.aiInsights.distributionChart") }}</p>
          </div>
        </div>
        <div class="insight-card">
          <h3 class="subsection-title">
            {{ $t("talentPool.aiInsights.followUpActivity") }}
          </h3>
          <div class="chart-placeholder">
            <line-chart-outlined class="chart-icon" />
            <p>{{ $t("talentPool.aiInsights.activityChart") }}</p>
          </div>
        </div>
        <div class="insight-card">
          <h3 class="subsection-title">
            {{ $t("talentPool.aiInsights.skillsHeat") }}
          </h3>
          <div class="chart-placeholder">
            <heat-map-outlined class="chart-icon" />
            <p>{{ $t("talentPool.aiInsights.skillsChart") }}</p>
          </div>
        </div>
      </div>

      <div class="follow-up-section">
        <h3 class="subsection-title">
          {{ $t("talentPool.aiInsights.followUpSuggestions") }}
        </h3>
        <a-table
          :columns="followUpColumns"
          :data-source="followUpData"
          :pagination="false"
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'name'">
              <div class="candidate-cell">
                <a-avatar :src="record.avatar" :size="32" class="mr-3" />
                <span>{{ record.name }}</span>
              </div>
            </template>
            <template v-else-if="column.key === 'matchingDegree'">
              <span class="match-value">{{ record.matchingDegree }}%</span>
            </template>
            <template v-else-if="column.key === 'actions'">
              <a-button type="link">{{
                $t("talentPool.talentCard.contact")
              }}</a-button>
            </template>
          </template>
        </a-table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";
import {
  PlusOutlined,
  StarOutlined,
  CodeOutlined,
  MessageOutlined,
  LikeOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  FilterOutlined,
  SortAscendingOutlined,
  EnvironmentOutlined,
  UserAddOutlined,
  MailOutlined,
  MoreOutlined,
  RightOutlined,
  BulbOutlined,
  PieChartOutlined,
  LineChartOutlined,
  HeatMapOutlined,
} from "@ant-design/icons-vue";

const { t } = useI18n();

// 筛选状态
const filterStatus = ref("all");
const filterCategory = ref("all");
const searchText = ref("");
const currentPage = ref(1);

// 模拟人才数据
const talents = ref([
  {
    id: 1,
    name: "王天明",
    position: "高级前端工程师",
    location: "北京",
    status: "hasIntention",
    avatar: "/api/placeholder/56/56",
    skills: ["React", "TypeScript", "Node.js", "微前端", "+3"],
    experience: "7年",
    education: "本科 · 清华大学",
    company: "腾讯",
    lastContact: "2025-03-15",
  },
  {
    id: 2,
    name: "李晓琳",
    position: "产品经理",
    location: "上海",
    status: "longTracking",
    avatar: "/api/placeholder/56/56",
    skills: ["产品设计", "用户研究", "数据分析", "敏捷开发"],
    experience: "5年",
    education: "硕士 · 复旦大学",
    company: "阿里巴巴",
    lastContact: "2025-04-02",
  },
  {
    id: 3,
    name: "张俊杰",
    position: "资深后端工程师",
    location: "深圳",
    status: "recentContact",
    avatar: "/api/placeholder/56/56",
    skills: ["Java", "Spring Boot", "微服务", "分布式系统"],
    experience: "8年",
    education: "本科 · 浙江大学",
    company: "字节跳动",
    lastContact: "2025-04-08",
  },
]);

// 状态颜色映射
const getStatusColor = (status) => {
  const colorMap = {
    hasIntention: "yellow",
    longTracking: "blue",
    recentContact: "green",
    longNoContact: "gray",
  };
  return colorMap[status];
};

// 重点跟进建议表格列定义
const followUpColumns = [
  {
    title: t("talentPool.aiInsights.table.name"),
    key: "name",
    dataIndex: "name",
  },
  {
    title: t("talentPool.aiInsights.table.currentPosition"),
    key: "currentPosition",
    dataIndex: "currentPosition",
  },
  {
    title: t("talentPool.aiInsights.table.matchingPosition"),
    key: "matchingPosition",
    dataIndex: "matchingPosition",
  },
  {
    title: t("talentPool.aiInsights.table.matchingDegree"),
    key: "matchingDegree",
    dataIndex: "matchingDegree",
  },
  {
    title: t("talentPool.aiInsights.table.suggestion"),
    key: "suggestion",
    dataIndex: "suggestion",
  },
  {
    title: t("talentPool.aiInsights.table.actions"),
    key: "actions",
  },
];

// 重点跟进建议数据
const followUpData = [
  {
    key: "1",
    name: "王天明",
    avatar: "/api/placeholder/40/40",
    currentPosition: "高级前端工程师",
    matchingPosition: "前端架构师",
    matchingDegree: 91,
    suggestion: "立即联系 - 有明确入职意向",
  },
  {
    key: "2",
    name: "赵明宇",
    avatar: "/api/placeholder/40/40",
    currentPosition: "技术总监",
    matchingPosition: "研发负责人",
    matchingDegree: 87,
    suggestion: "本周内安排线下沟通",
  },
  {
    key: "3",
    name: "李晓琳",
    avatar: "/api/placeholder/40/40",
    currentPosition: "产品经理",
    matchingPosition: "高级产品经理",
    matchingDegree: 83,
    suggestion: "近期有职位空缺，优先联系",
  },
];
</script>

<style scoped>
.talent-pool-page {
  padding: 32px;
}

.page-header {
  margin-bottom: 36px;
}

.page-title {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 12px;
  color: var(--text-primary);
}

.page-description {
  color: var(--text-secondary);
  font-size: 16px;
}

.section-title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 20px;
  color: var(--text-primary);
}

.subsection-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 16px;
  color: var(--text-primary);
}

/* 统计区域 */
.stats-section {
  margin-bottom: 36px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  margin-bottom: 36px;
}

@media (max-width: 1200px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 576px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
}

.stat-item {
  background-color: var(--bg-color);
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.stat-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 20px -5px rgba(0, 0, 0, 0.15);
}

.stat-item.primary {
  background-color: rgba(var(--primary-color-rgb), 0.1);
  border-left: 4px solid var(--primary-color);
}

.stat-item.success {
  background-color: rgba(var(--success-color-rgb), 0.1);
  border-left: 4px solid var(--success-color);
}

.stat-item.info {
  background-color: rgba(var(--info-color-rgb), 0.1);
  border-left: 4px solid var(--info-color);
}

.stat-item.warning {
  background-color: rgba(var(--warning-color-rgb), 0.1);
  border-left: 4px solid var(--warning-color);
}

.stat-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
}

.stat-label {
  color: var(--text-secondary);
  font-weight: 600;
  font-size: 15px;
}

.stat-icon {
  color: var(--primary-color);
  font-size: a18px;
}

.stat-item.success .stat-icon {
  color: var(--success-color);
}

.stat-item.info .stat-icon {
  color: var(--info-color);
}

.stat-item.warning .stat-icon {
  color: var(--warning-color);
}

.stat-value {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 12px;
}

.stat-trend {
  font-size: 14px;
  display: flex;
  align-items: center;
  font-weight: 500;
}

.trend-icon {
  margin-right: 6px;
}

.trend-text {
  margin-left: 6px;
  color: var(--text-third);
}

.stat-trend.positive {
  color: #52c41a;
}

.stat-trend.negative {
  color: #f5222d;
}

/* 分组区域 */
.groups-section {
  background-color: var(--bg-color);
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  padding: 28px;
  margin-bottom: 36px;
  border: 1px solid var(--border-color);
  transition: all 0.3s ease;
}

.groups-section:hover {
  box-shadow: 0 10px 20px -5px rgba(0, 0, 0, 0.15);
}

.groups-list {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  overflow-x: auto;
  margin: 8px 0;
  padding: 4px 0;
}

.group-btn {
  transition: all 0.3s ease;
  padding: 5px 16px;
  height: auto;
}

.group-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.add-group-btn {
  color: var(--primary-color);
  border-style: dashed;
  border-color: var(--primary-color);
}

/* 人才列表区域 */
.talent-list-section {
  background-color: var(--bg-color);
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  margin-bottom: 36px;
  border: 1px solid var(--border-color);
  transition: all 0.3s ease;
}

.talent-list-section:hover {
  box-shadow: 0 10px 20px -5px rgba(0, 0, 0, 0.15);
}

.list-toolbar {
  padding: 20px 24px;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 20px;
}

.filters {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.actions {
  display: flex;
  gap: 12px;
}

.talent-cards {
  padding: 24px;
}

.talent-card {
  transition: all 0.3s ease;
  margin-bottom: 20px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  border: 1px solid var(--border-color);
}

.talent-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px -8px rgba(0, 0, 0, 0.15);
  border-color: var(--primary-color);
}

.talent-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
}

.talent-info {
  display: flex;
  align-items: flex-start;
}

.talent-avatar {
  margin-right: 16px;
  border: 2px solid var(--primary-color);
}

.talent-details {
  display: flex;
  flex-direction: column;
}

.talent-name {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 6px;
  color: var(--text-primary);
}

.talent-position {
  color: var(--text-secondary);
  margin-bottom: 6px;
  font-weight: 500;
}

.talent-location {
  display: flex;
  align-items: center;
  color: var(--text-secondary);
  font-size: 14px;
}

.location-icon {
  margin-right: 6px;
  color: var(--primary-color);
}

.talent-skills {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
}

.talent-skills .ant-tag {
  padding: 4px 10px;
  font-size: 13px;
  border-radius: 6px;
}

.talent-details-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-bottom: 20px;
  background-color: rgba(var(--primary-color-rgb), 0.03);
  padding: 16px;
  border-radius: 8px;
}

.detail-item {
  display: flex;
  flex-direction: column;
}

.detail-label {
  color: var(--text-secondary);
  font-size: 14px;
  margin-bottom: 6px;
  font-weight: 500;
}

.detail-value {
  color: var(--text-primary);
  font-weight: 600;
}

.talent-actions {
  display: flex;
  gap: 12px;
  margin-top: 8px;
}

.talent-actions .ant-btn {
  padding: 6px 16px;
  height: auto;
}

.pagination-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-top: 1px solid var(--border-color);
}

.pagination-info {
  color: var(--text-secondary);
  font-weight: 500;
}

/* AI洞察区域 */
.ai-insights-section {
  background-color: var(--bg-color);
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  padding: 28px;
  border: 1px solid var(--border-color);
  transition: all 0.3s ease;
}

.ai-insights-section:hover {
  box-shadow: 0 10px 20px -5px rgba(0, 0, 0, 0.15);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.ai-tip {
  margin-bottom: 28px;
  border-width: 2px;
}

.ai-tip-title {
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 16px;
}

.ai-tip-text {
  color: var(--text-secondary);
  font-size: 15px;
  line-height: 1.6;
}

.insights-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-bottom: 28px;
}

@media (max-width: 992px) {
  .insights-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .insights-grid {
    grid-template-columns: 1fr;
  }
}

.insight-card {
  background-color: var(--bg-color);
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border: 1px solid var(--border-color);
}

.insight-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px -8px rgba(0, 0, 0, 0.15);
  border-color: var(--primary-color);
}

.chart-placeholder {
  height: 220px;
  background-color: rgba(var(--primary-color-rgb), 0.03);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--text-third);
  border: 1px dashed var(--border-color);
}

.chart-icon {
  font-size: 40px;
  color: var(--primary-color);
  margin-bottom: 12px;
  opacity: 0.7;
}

.chart-placeholder p {
  margin-top: 12px;
  font-size: 15px;
  font-weight: 500;
}

.follow-up-section {
  margin-top: 28px;
}

.candidate-cell {
  display: flex;
  align-items: center;
}

.match-value {
  color: var(--success-color);
  font-weight: 600;
  font-size: 16px;
}

/* 暗黑模式适配 */
[data-theme="dark"] .stat-item,
[data-theme="dark"] .groups-section,
[data-theme="dark"] .talent-list-section,
[data-theme="dark"] .ai-insights-section,
[data-theme="dark"] .insight-card {
  background-color: rgba(255, 255, 255, 0.05);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
}

[data-theme="dark"] .chart-placeholder {
  background-color: rgba(255, 255, 255, 0.04);
  border-color: rgba(255, 255, 255, 0.1);
}

[data-theme="dark"] .talent-details-grid {
  background-color: rgba(255, 255, 255, 0.04);
}

[data-theme="dark"] .chart-icon {
  opacity: 0.8;
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
