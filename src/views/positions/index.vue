<template>
  <div class="positions-page">
    <!-- 页面标题 -->
    <div class="page-header">
      <div class="header-content">
        <h1 class="title">{{ $t("positions.title") }}</h1>
        <p class="subtitle">{{ $t("positions.description") }}</p>
      </div>
      <div class="header-actions">
        <a-button type="primary">
          <plus-outlined />
          {{ $t("positions.createButton") }}
        </a-button>
      </div>
    </div>

    <!-- 职位概况卡片 -->
    <div class="stats-section">
      <!-- 总职位数 -->
      <div class="stat-card">
        <div class="stat-card-header">
          <h2 class="stat-title">
            {{ $t("positions.statistics.totalJobs") }}
          </h2>
          <div class="stat-icon-bg blue">
            <briefcase-outlined />
          </div>
        </div>
        <div class="stat-values">
          <span class="stat-value">32</span>
          <span class="stat-trend positive">
            <arrow-up-outlined class="trend-icon" />12%
          </span>
        </div>
        <div class="stat-desc">
          {{ $t("positions.statistics.vsLastMonth", { value: 4 }) }}
        </div>
      </div>

      <!-- 开放职位 -->
      <div class="stat-card">
        <div class="stat-card-header">
          <h2 class="stat-title">
            {{ $t("positions.statistics.openJobs") }}
          </h2>
          <div class="stat-icon-bg green">
            <folder-open-outlined />
          </div>
        </div>
        <div class="stat-values">
          <span class="stat-value">18</span>
          <span class="stat-trend positive">
            <arrow-up-outlined class="trend-icon" />5%
          </span>
        </div>
        <div class="stat-desc">56.3%</div>
      </div>

      <!-- 已收到简历 -->
      <div class="stat-card">
        <div class="stat-card-header">
          <h2 class="stat-title">
            {{ $t("positions.statistics.receivedResumes") }}
          </h2>
          <div class="stat-icon-bg purple">
            <file-outlined />
          </div>
        </div>
        <div class="stat-values">
          <span class="stat-value">847</span>
          <span class="stat-trend positive">
            <arrow-up-outlined class="trend-icon" />18%
          </span>
        </div>
        <div class="stat-desc">平均每个职位47份简历</div>
      </div>

      <!-- 完成率 -->
      <div class="stat-card">
        <div class="stat-card-header">
          <h2 class="stat-title">
            {{ $t("positions.statistics.completionRate") }}
          </h2>
          <div class="stat-icon-bg yellow">
            <pie-chart-outlined />
          </div>
        </div>
        <div class="stat-values">
          <span class="stat-value">65%</span>
          <span class="stat-trend negative">
            <arrow-down-outlined class="trend-icon" />3%
          </span>
        </div>
        <div class="stat-desc">
          {{ $t("positions.statistics.target") }}: 70%
        </div>
      </div>
    </div>

    <!-- 职位管理工具栏 -->
    <div class="toolbar-section">
      <div class="select-section">
        <div class="filter-group">
          <a-select
            v-model:value="jobStatusFilter"
            style="min-width: 120px"
            :placeholder="$t('positions.filter.allJobs')"
          >
            <a-select-option value="all">{{
              $t("positions.filter.allJobs")
            }}</a-select-option>
            <a-select-option value="open">{{
              $t("positions.filter.openJobs")
            }}</a-select-option>
            <a-select-option value="paused">{{
              $t("positions.filter.pausedJobs")
            }}</a-select-option>
            <a-select-option value="completed">{{
              $t("positions.filter.completedJobs")
            }}</a-select-option>
            <a-select-option value="draft">{{
              $t("positions.filter.draft")
            }}</a-select-option>
          </a-select>
          <a-select
            v-model:value="departmentFilter"
            style="min-width: 120px"
            :placeholder="$t('positions.filter.allDepartments')"
          >
            <a-select-option value="all">{{
              $t("positions.filter.allDepartments")
            }}</a-select-option>
            <a-select-option value="tech">{{
              $t("positions.filter.tech")
            }}</a-select-option>
            <a-select-option value="product">{{
              $t("positions.filter.product")
            }}</a-select-option>
            <a-select-option value="design">{{
              $t("positions.filter.design")
            }}</a-select-option>
            <a-select-option value="marketing">{{
              $t("positions.filter.marketing")
            }}</a-select-option>
            <a-select-option value="sales">{{
              $t("positions.filter.sales")
            }}</a-select-option>
          </a-select>
        </div>
        <div class="search-group">
          <a-input-search
            v-model:value="searchText"
            :placeholder="$t('positions.filter.searchPlaceholder')"
            style="width: 250px"
          />
          <a-button>
            <filter-outlined />{{ $t("positions.actions.filter") }}
          </a-button>
          <a-button>
            <sort-ascending-outlined />{{ $t("positions.actions.sort") }}
          </a-button>
        </div>
      </div>
    </div>

    <!-- 职位卡片列表 -->
    <div class="job-cards-container">
      <a-row :gutter="24">
        <a-col :xs="24" :sm="24" :md="12" :lg="8">
          <!-- 职位卡片1 - 高级前端开发工程师 -->
          <div class="job-card">
            <div class="job-card-header">
              <div>
                <h3 class="job-title">高级前端开发工程师</h3>
                <p class="job-subtitle">
                  {{
                    $t("positions.jobCard.department", {
                      department: "技术部",
                      location: "北京",
                    })
                  }}
                </p>
              </div>
              <a-tag color="success">{{
                $t("positions.jobCard.status.open")
              }}</a-tag>
            </div>
            <div class="job-card-tags">
              <a-tag class="job-tag">React</a-tag>
              <a-tag class="job-tag">TypeScript</a-tag>
              <a-tag class="job-tag">微前端</a-tag>
              <a-tag class="job-tag">5年+</a-tag>
            </div>
            <div class="job-card-content">
              <div class="job-progress">
                <div class="progress-header">
                  <span class="progress-label">{{
                    $t("positions.jobCard.progress")
                  }}</span>
                  <span class="progress-value">60%</span>
                </div>
                <a-progress :percent="60" :showInfo="false" />
              </div>

              <div class="job-stats">
                <div class="job-stat-item">
                  <div class="job-stat-value">124</div>
                  <div class="job-stat-label">
                    {{ $t("positions.jobCard.resumes") }}
                  </div>
                </div>
                <div class="job-stat-item">
                  <div class="job-stat-value">38</div>
                  <div class="job-stat-label">
                    {{ $t("positions.jobCard.interviewing") }}
                  </div>
                </div>
                <div class="job-stat-item">
                  <div class="job-stat-value">3/5</div>
                  <div class="job-stat-label">
                    {{ $t("positions.jobCard.hired") }}
                  </div>
                </div>
              </div>

              <div class="job-card-actions">
                <a-button type="primary" block>
                  {{ $t("positions.actions.viewDetails") }}
                </a-button>
                <a-button>
                  <ellipsis-outlined />
                </a-button>
              </div>
            </div>
          </div>
        </a-col>

        <!-- 职位卡片2 - 产品经理 -->
        <a-col :xs="24" :sm="24" :md="12" :lg="8">
          <div class="job-card">
            <div class="job-card-header">
              <div>
                <h3 class="job-title">产品经理</h3>
                <p class="job-subtitle">
                  {{
                    $t("positions.jobCard.department", {
                      department: "产品部",
                      location: "上海",
                    })
                  }}
                </p>
              </div>
              <a-tag color="success">{{
                $t("positions.jobCard.status.open")
              }}</a-tag>
            </div>
            <div class="job-card-tags">
              <a-tag class="job-tag">用户体验</a-tag>
              <a-tag class="job-tag">数据分析</a-tag>
              <a-tag class="job-tag">项目管理</a-tag>
              <a-tag class="job-tag">3年+</a-tag>
            </div>
            <div class="job-card-content">
              <div class="job-progress">
                <div class="progress-header">
                  <span class="progress-label">{{
                    $t("positions.jobCard.progress")
                  }}</span>
                  <span class="progress-value">45%</span>
                </div>
                <a-progress :percent="45" :showInfo="false" />
              </div>

              <div class="job-stats">
                <div class="job-stat-item">
                  <div class="job-stat-value">78</div>
                  <div class="job-stat-label">
                    {{ $t("positions.jobCard.resumes") }}
                  </div>
                </div>
                <div class="job-stat-item">
                  <div class="job-stat-value">25</div>
                  <div class="job-stat-label">
                    {{ $t("positions.jobCard.interviewing") }}
                  </div>
                </div>
                <div class="job-stat-item">
                  <div class="job-stat-value">2/3</div>
                  <div class="job-stat-label">
                    {{ $t("positions.jobCard.hired") }}
                  </div>
                </div>
              </div>

              <div class="job-card-actions">
                <a-button type="primary" block>
                  {{ $t("positions.actions.viewDetails") }}
                </a-button>
                <a-button>
                  <ellipsis-outlined />
                </a-button>
              </div>
            </div>
          </div>
        </a-col>

        <!-- 职位卡片3 - UX设计师 -->
        <a-col :xs="24" :sm="24" :md="12" :lg="8">
          <div class="job-card">
            <div class="job-card-header">
              <div>
                <h3 class="job-title">UX设计师</h3>
                <p class="job-subtitle">
                  {{
                    $t("positions.jobCard.department", {
                      department: "设计部",
                      location: "深圳",
                    })
                  }}
                </p>
              </div>
              <a-tag color="success">{{
                $t("positions.jobCard.status.open")
              }}</a-tag>
            </div>
            <div class="job-card-tags">
              <a-tag class="job-tag">Figma</a-tag>
              <a-tag class="job-tag">用户研究</a-tag>
              <a-tag class="job-tag">原型设计</a-tag>
              <a-tag class="job-tag">2年+</a-tag>
            </div>
            <div class="job-card-content">
              <div class="job-progress">
                <div class="progress-header">
                  <span class="progress-label">{{
                    $t("positions.jobCard.progress")
                  }}</span>
                  <span class="progress-value">35%</span>
                </div>
                <a-progress :percent="35" :showInfo="false" />
              </div>

              <div class="job-stats">
                <div class="job-stat-item">
                  <div class="job-stat-value">65</div>
                  <div class="job-stat-label">
                    {{ $t("positions.jobCard.resumes") }}
                  </div>
                </div>
                <div class="job-stat-item">
                  <div class="job-stat-value">20</div>
                  <div class="job-stat-label">
                    {{ $t("positions.jobCard.interviewing") }}
                  </div>
                </div>
                <div class="job-stat-item">
                  <div class="job-stat-value">1/2</div>
                  <div class="job-stat-label">
                    {{ $t("positions.jobCard.hired") }}
                  </div>
                </div>
              </div>

              <div class="job-card-actions">
                <a-button type="primary" block>
                  {{ $t("positions.actions.viewDetails") }}
                </a-button>
                <a-button>
                  <ellipsis-outlined />
                </a-button>
              </div>
            </div>
          </div>
        </a-col>

        <!-- 职位卡片4 - 后端开发工程师 -->
        <a-col :xs="24" :sm="24" :md="12" :lg="8">
          <div class="job-card">
            <div class="job-card-header">
              <div>
                <h3 class="job-title">后端开发工程师</h3>
                <p class="job-subtitle">
                  {{
                    $t("positions.jobCard.department", {
                      department: "技术部",
                      location: "北京",
                    })
                  }}
                </p>
              </div>
              <a-tag color="success">{{
                $t("positions.jobCard.status.open")
              }}</a-tag>
            </div>
            <div class="job-card-tags">
              <a-tag class="job-tag">Java</a-tag>
              <a-tag class="job-tag">Spring Boot</a-tag>
              <a-tag class="job-tag">微服务</a-tag>
              <a-tag class="job-tag">3年+</a-tag>
            </div>
            <div class="job-card-content">
              <div class="job-progress">
                <div class="progress-header">
                  <span class="progress-label">{{
                    $t("positions.jobCard.progress")
                  }}</span>
                  <span class="progress-value">75%</span>
                </div>
                <a-progress :percent="75" :showInfo="false" />
              </div>

              <div class="job-stats">
                <div class="job-stat-item">
                  <div class="job-stat-value">92</div>
                  <div class="job-stat-label">
                    {{ $t("positions.jobCard.resumes") }}
                  </div>
                </div>
                <div class="job-stat-item">
                  <div class="job-stat-value">30</div>
                  <div class="job-stat-label">
                    {{ $t("positions.jobCard.interviewing") }}
                  </div>
                </div>
                <div class="job-stat-item">
                  <div class="job-stat-value">4/4</div>
                  <div class="job-stat-label">
                    {{ $t("positions.jobCard.hired") }}
                  </div>
                </div>
              </div>

              <div class="job-card-actions">
                <a-button type="primary" block>
                  {{ $t("positions.actions.viewDetails") }}
                </a-button>
                <a-button>
                  <ellipsis-outlined />
                </a-button>
              </div>
            </div>
          </div>
        </a-col>

        <!-- 职位卡片5 - 数据分析师 -->
        <a-col :xs="24" :sm="24" :md="12" :lg="8">
          <div class="job-card">
            <div class="job-card-header">
              <div>
                <h3 class="job-title">数据分析师</h3>
                <p class="job-subtitle">
                  {{
                    $t("positions.jobCard.department", {
                      department: "数据部",
                      location: "上海",
                    })
                  }}
                </p>
              </div>
              <a-tag color="warning">{{
                $t("positions.jobCard.status.reviewing")
              }}</a-tag>
            </div>
            <div class="job-card-tags">
              <a-tag class="job-tag">Python</a-tag>
              <a-tag class="job-tag">SQL</a-tag>
              <a-tag class="job-tag">数据可视化</a-tag>
              <a-tag class="job-tag">2年+</a-tag>
            </div>
            <div class="job-card-content">
              <div class="job-progress">
                <div class="progress-header">
                  <span class="progress-label">{{
                    $t("positions.jobCard.progress")
                  }}</span>
                  <span class="progress-value">10%</span>
                </div>
                <a-progress :percent="10" :showInfo="false" />
              </div>

              <div class="job-stats">
                <div class="job-stat-item">
                  <div class="job-stat-value">--</div>
                  <div class="job-stat-label">
                    {{ $t("positions.jobCard.resumes") }}
                  </div>
                </div>
                <div class="job-stat-item">
                  <div class="job-stat-value">--</div>
                  <div class="job-stat-label">
                    {{ $t("positions.jobCard.interviewing") }}
                  </div>
                </div>
                <div class="job-stat-item">
                  <div class="job-stat-value">0/2</div>
                  <div class="job-stat-label">
                    {{ $t("positions.jobCard.hired") }}
                  </div>
                </div>
              </div>

              <div class="job-card-actions">
                <a-button type="primary" block>
                  {{ $t("positions.actions.viewDetails") }}
                </a-button>
                <a-button>
                  <ellipsis-outlined />
                </a-button>
              </div>
            </div>
          </div>
        </a-col>

        <!-- 职位卡片6 - 市场营销专员 -->
        <a-col :xs="24" :sm="24" :md="12" :lg="8">
          <div class="job-card">
            <div class="job-card-header">
              <div>
                <h3 class="job-title">市场营销专员</h3>
                <p class="job-subtitle">
                  {{
                    $t("positions.jobCard.department", {
                      department: "市场部",
                      location: "广州",
                    })
                  }}
                </p>
              </div>
              <a-tag color="error">{{
                $t("positions.jobCard.status.paused")
              }}</a-tag>
            </div>
            <div class="job-card-tags">
              <a-tag class="job-tag">内容营销</a-tag>
              <a-tag class="job-tag">社交媒体</a-tag>
              <a-tag class="job-tag">市场分析</a-tag>
              <a-tag class="job-tag">1年+</a-tag>
            </div>
            <div class="job-card-content">
              <div class="job-progress">
                <div class="progress-header">
                  <span class="progress-label">{{
                    $t("positions.jobCard.progress")
                  }}</span>
                  <span class="progress-value">20%</span>
                </div>
                <a-progress :percent="20" :showInfo="false" />
              </div>

              <div class="job-stats">
                <div class="job-stat-item">
                  <div class="job-stat-value">42</div>
                  <div class="job-stat-label">
                    {{ $t("positions.jobCard.resumes") }}
                  </div>
                </div>
                <div class="job-stat-item">
                  <div class="job-stat-value">5</div>
                  <div class="job-stat-label">
                    {{ $t("positions.jobCard.interviewing") }}
                  </div>
                </div>
                <div class="job-stat-item">
                  <div class="job-stat-value">0/3</div>
                  <div class="job-stat-label">
                    {{ $t("positions.jobCard.hired") }}
                  </div>
                </div>
              </div>

              <div class="job-card-actions">
                <a-button type="primary" block>
                  {{ $t("positions.actions.viewDetails") }}
                </a-button>
                <a-button>
                  <ellipsis-outlined />
                </a-button>
              </div>
            </div>
          </div>
        </a-col>
      </a-row>
    </div>

    <!-- 分页 -->
    <div class="pagination-section">
      <div class="pagination-info">
        {{ $t("positions.pagination.total", { start: 1, end: 6, total: 32 }) }}
      </div>
      <a-pagination
        v-model:value="currentPage"
        :total="32"
        :pageSize="6"
        show-less-items
      />
    </div>

    <!-- AI职位分析 -->
    <div class="ai-analysis-section">
      <h2 class="section-title">{{ $t("positions.analysis.title") }}</h2>

      <div class="analysis-cards">
        <!-- 左侧: 职位市场分析 -->
        <div class="market-analysis-card">
          <div class="analysis-header">
            <h3 class="subsection-title">
              {{ $t("positions.analysis.marketAnalysis") }}
            </h3>
            <a-select v-model:value="analysisFilter" style="width: 160px">
              <a-select-option value="tech">{{
                $t("positions.analysis.techJobs")
              }}</a-select-option>
              <a-select-option value="nonTech">{{
                $t("positions.analysis.nonTechJobs")
              }}</a-select-option>
              <a-select-option value="all">{{
                $t("positions.analysis.allJobs")
              }}</a-select-option>
            </a-select>
          </div>

          <div class="chart-placeholder">
            <chart-outlined />
            <p>市场需求与薪资趋势图表</p>
          </div>

          <div class="ai-insight">
            <div class="insight-content">
              <div class="insight-icon">
                <bulb-outlined />
              </div>
              <div>
                <h4 class="insight-title">
                  {{ $t("positions.analysis.insight.title") }}
                </h4>
                <p class="insight-text">
                  {{ $t("positions.analysis.insight.content") }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- 右侧: 职位优化建议 -->
        <div class="optimization-card">
          <h3 class="subsection-title">
            {{ $t("positions.analysis.optimization.title") }}
          </h3>
          <ul class="optimization-list">
            <li class="optimization-item">
              <div class="optimization-icon success">
                <check-outlined />
              </div>
              <div>
                <h4 class="optimization-job-title">
                  {{
                    $t("positions.analysis.optimization.jobs.frontend.title")
                  }}
                </h4>
                <p class="optimization-feedback">
                  {{
                    $t("positions.analysis.optimization.jobs.frontend.feedback")
                  }}
                </p>
              </div>
            </li>
            <li class="optimization-item">
              <div class="optimization-icon warning">
                <exclamation-outlined />
              </div>
              <div>
                <h4 class="optimization-job-title">
                  {{ $t("positions.analysis.optimization.jobs.product.title") }}
                </h4>
                <p class="optimization-feedback">
                  {{
                    $t("positions.analysis.optimization.jobs.product.feedback")
                  }}
                </p>
              </div>
            </li>
            <li class="optimization-item">
              <div class="optimization-icon error">
                <close-outlined />
              </div>
              <div>
                <h4 class="optimization-job-title">
                  {{ $t("positions.analysis.optimization.jobs.design.title") }}
                </h4>
                <p class="optimization-feedback">
                  {{
                    $t("positions.analysis.optimization.jobs.design.feedback")
                  }}
                </p>
              </div>
            </li>
          </ul>

          <div class="optimization-templates">
            <h3 class="subsection-title">
              {{ $t("positions.analysis.optimization.templates") }}
            </h3>
            <div class="template-items">
              <div class="template-item">
                <div class="template-header">
                  <h4 class="template-title">
                    {{
                      $t(
                        "positions.analysis.optimization.recommendedTemplates.frontend.title"
                      )
                    }}
                  </h4>
                  <span class="template-rate">
                    {{
                      $t(
                        "positions.analysis.optimization.recommendedTemplates.frontend.rate"
                      )
                    }}
                  </span>
                </div>
              </div>
              <div class="template-item">
                <div class="template-header">
                  <h4 class="template-title">
                    {{
                      $t(
                        "positions.analysis.optimization.recommendedTemplates.product.title"
                      )
                    }}
                  </h4>
                  <span class="template-rate">
                    {{
                      $t(
                        "positions.analysis.optimization.recommendedTemplates.product.rate"
                      )
                    }}
                  </span>
                </div>
              </div>
            </div>
            <a-button type="link" class="one-click-button">
              <magic-outlined />
              {{ $t("positions.analysis.optimization.oneClickOptimize") }}
            </a-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import {
  PlusOutlined,
  FilterOutlined,
  SortAscendingOutlined,
  FolderOpenOutlined,
  FileOutlined,
  PieChartOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  EllipsisOutlined,
  BulbOutlined,
  CheckOutlined,
  ExclamationOutlined,
  CloseOutlined,
} from "@ant-design/icons-vue";

// 筛选和搜索
const jobStatusFilter = ref("all");
const departmentFilter = ref("all");
const searchText = ref("");
const analysisFilter = ref("tech");

// 分页
const currentPage = ref(1);
</script>

<style scoped>
.positions-page {
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
  font-size: 24px;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 8px;
}

.subtitle {
  color: var(--text-secondary);
  margin: 8px 0 0;
}

.header-actions {
  display: flex;
  gap: 12px;
}

/* 统计卡片部分 */
.stats-section {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 24px;
}

.stat-card {
  background-color: var(--component-bg);
  border-radius: 8px;
  box-shadow: var(--card-shadow);
  padding: 24px;
  border: 1px solid var(--border-color);
  flex: 1;
  min-width: 250px;
}

.stat-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.stat-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-color);
}

.stat-icon-bg {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
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
  font-size: 28px;
  font-weight: 600;
  color: var(--text-color);
  line-height: 1;
  margin-right: 8px;
}

.stat-trend {
  display: flex;
  align-items: center;
  font-size: 14px;
  margin-bottom: 4px;
}

.trend-icon {
  margin-right: 4px;
}

.stat-trend.positive {
  color: var(--success-color);
}

.stat-trend.negative {
  color: var(--error-color);
}

.stat-desc {
  font-size: 14px;
  color: var(--text-secondary);
  margin-top: 8px;
}

/* 工具栏样式 */
.toolbar-section {
  background-color: var(--component-bg);
  border-radius: 8px;
  box-shadow: var(--card-shadow);
  padding: 16px;
  margin-bottom: 24px;
  border: 1px solid var(--border-color);
}

.select-section {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.filter-group {
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
}

.search-group {
  display: flex;
  gap: 16px;
}

/* 修复暗黑模式下的筛选器样式 */
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
  border: 1px solid var(--border-color);
}

[data-theme="dark"] :deep(.ant-select-item) {
  color: var(--text-color) !important;
}

[data-theme="dark"] :deep(.ant-select-item-option-active),
[data-theme="dark"] :deep(.ant-select-item-option-selected) {
  background-color: var(--menu-item-active) !important;
}

/* 职位卡片样式 */
.job-card {
  background-color: var(--component-bg);
  border-radius: 8px;
  box-shadow: var(--card-shadow);
  border: 1px solid var(--border-color);
  overflow: hidden;
  transition: all 0.3s ease;
  margin: 10px 0;
}

.job-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
}

.job-card-header {
  padding: 20px;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.job-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 4px;
}

.job-subtitle {
  font-size: 14px;
  color: var(--text-secondary);
}

.job-card-tags {
  padding: 0 20px;
  margin-top: 16px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.job-tag {
  margin: 0;
  transition: all 0.2s ease;
  color: var(--text-color);
}

.job-tag:hover {
  transform: translateY(-2px);
}

/* 修复暗黑模式下的标签样式 */
[data-theme="dark"] :deep(.ant-tag) {
  background-color: rgba(255, 255, 255, 0.08) !important;
  border-color: var(--border-color) !important;
  color: var(--text-color) !important;
}

[data-theme="dark"] :deep(.ant-tag.ant-tag-success) {
  background-color: rgba(var(--success-color-rgb), 0.2) !important;
  border-color: var(--success-color) !important;
  color: var(--success-color) !important;
}

[data-theme="dark"] :deep(.ant-tag.ant-tag-warning) {
  background-color: rgba(var(--warning-color-rgb), 0.2) !important;
  border-color: var(--warning-color) !important;
  color: var(--warning-color) !important;
}

[data-theme="dark"] :deep(.ant-tag.ant-tag-error) {
  background-color: rgba(var(--error-color-rgb), 0.2) !important;
  border-color: var(--error-color) !important;
  color: var(--error-color) !important;
}

.job-card-content {
  padding: 20px;
}

.job-progress {
  margin-bottom: 16px;
}

.progress-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.progress-label {
  font-size: 14px;
  font-weight: 500;
}

.progress-value {
  font-size: 14px;
  color: var(--text-secondary);
}

.job-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  text-align: center;
  margin-bottom: 16px;
}

.job-stat-value {
  font-weight: 600;
  color: var(--text-color);
}

.job-stat-label {
  font-size: 13px;
  color: var(--text-secondary);
}

.job-card-actions {
  display: flex;
}

.job-card-actions button:first-child {
  flex: 1;
}

/* 分页样式 */
.pagination-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 24px;
  margin-bottom: 24px;
}

.pagination-info {
  font-size: 14px;
  color: var(--text-secondary);
}

/* AI分析部分样式 */
.ai-analysis-section {
  margin-top: 40px;
}

.section-title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 24px;
  color: var(--text-color);
}

.analysis-cards {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;
}

.subsection-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 16px;
}

.market-analysis-card,
.optimization-card {
  background-color: var(--component-bg);
  border-radius: 8px;
  box-shadow: var(--card-shadow);
  padding: 24px;
  border: 1px solid var(--border-color);
}

.analysis-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.chart-placeholder {
  height: 250px;
  background-color: var(--bg-color);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--text-third);
  font-size: 32px;
  margin-bottom: 16px;
}

.chart-placeholder p {
  margin-top: 12px;
  font-size: 14px;
}

.ai-insight {
  background-color: rgba(var(--primary-color-rgb), 0.08);
  border-radius: 8px;
  padding: 16px;
}

.insight-content {
  display: flex;
}

.insight-icon {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: rgba(var(--primary-color-rgb), 0.15);
  color: var(--primary-color);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
  flex-shrink: 0;
  font-size: 18px;
}

.insight-title {
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 8px;
}

.insight-text {
  color: var(--text-secondary);
  font-size: 14px;
  line-height: 1.5;
}

.optimization-list {
  margin-bottom: 24px;
  padding: 0;
  list-style: none;
}

.optimization-item {
  display: flex;
  margin-bottom: 16px;
}

.optimization-icon {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  flex-shrink: 0;
  font-size: 12px;
}

.optimization-icon.success {
  background-color: rgba(var(--success-color-rgb), 0.15);
  color: var(--success-color);
}

.optimization-icon.warning {
  background-color: rgba(var(--warning-color-rgb), 0.15);
  color: var(--warning-color);
}

.optimization-icon.error {
  background-color: rgba(var(--error-color-rgb), 0.15);
  color: var(--error-color);
}

.optimization-job-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 4px;
}

.optimization-feedback {
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.4;
}

.template-items {
  margin-bottom: 16px;
}

.template-item {
  padding: 12px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  margin-bottom: 8px;
  transition: all 0.2s ease;
  cursor: pointer;
}

.template-item:hover {
  background-color: var(--menu-item-hover);
}

.template-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.template-title {
  font-size: 14px;
  font-weight: 500;
  color: var(--text-color);
  margin: 0;
}

.template-rate {
  font-size: 13px;
  color: var(--success-color);
}

.one-click-button {
  padding-left: 0;
  margin-top: 8px;
  color: var(--primary-color);
}

/* 响应式布局 */
@media (max-width: 768px) {
  .stats-section {
    flex-direction: column;
  }

  .select-section {
    flex-direction: column;
  }

  .analysis-cards {
    grid-template-columns: 1fr;
  }

  .filter-group,
  .search-group {
    width: 100%;
  }
}

/* 暗黑模式适配 */
[data-theme="dark"] .job-card {
  border-color: var(--border-color);
}

[data-theme="dark"] .job-card-header {
  border-color: var(--border-color);
}

[data-theme="dark"] .market-analysis-card,
[data-theme="dark"] .optimization-card {
  border-color: var(--border-color);
}

[data-theme="dark"] .chart-placeholder {
  background-color: rgba(255, 255, 255, 0.03);
}

[data-theme="dark"] .template-item {
  border-color: var(--border-color);
}

[data-theme="dark"] .template-item:hover {
  background-color: rgba(255, 255, 255, 0.05);
}

/* 修复暗黑模式下的按钮样式 */
[data-theme="dark"] :deep(.ant-btn) {
  border-color: var(--border-color);
  color: var(--text-color);
}

[data-theme="dark"] :deep(.ant-btn-primary) {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
  color: var(--text-light);
}

[data-theme="dark"] :deep(.ant-input-search),
[data-theme="dark"] :deep(.ant-input) {
  background-color: var(--component-bg);
  border-color: var(--border-color);
  color: var(--text-color);
}

/* 修复统计卡片在暗黑模式下的样式 */
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

/* 修复进度条在暗黑模式下的问题 */
[data-theme="dark"] :deep(.ant-progress-bg) {
  background-color: var(--primary-color) !important;
}

/* 修复卡片在暗黑模式下的阴影 */
[data-theme="dark"] .job-card:hover {
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.3) !important;
}

/* 修复分页控件在暗黑模式下的样式 */
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

[data-theme="dark"] :deep(.ant-pagination-prev .ant-pagination-item-link),
[data-theme="dark"] :deep(.ant-pagination-next .ant-pagination-item-link) {
  background-color: var(--component-bg);
  border-color: var(--border-color);
  color: var(--text-color);
}

/* 修复搜索框在暗黑模式下的样式 */
[data-theme="dark"] :deep(.ant-input-search .ant-input-group-addon) {
  background-color: var(--primary-color) !important;
  border-color: var(--primary-color) !important;
}

[data-theme="dark"] :deep(.ant-input-search-button) {
  background-color: var(--primary-color) !important;
  border-color: var(--primary-color) !important;
}

/* 修复状态标签在暗黑模式下的颜色鲜明度 */
[data-theme="dark"] :deep(.ant-tag.ant-tag-success) {
  background-color: rgba(var(--success-color-rgb), 0.25) !important;
  border-color: var(--success-color) !important;
  color: var(--success-color) !important;
}

[data-theme="dark"] :deep(.ant-tag.ant-tag-warning) {
  background-color: rgba(var(--warning-color-rgb), 0.25) !important;
  border-color: var(--warning-color) !important;
  color: var(--warning-color) !important;
}

[data-theme="dark"] :deep(.ant-tag.ant-tag-error) {
  background-color: rgba(var(--error-color-rgb), 0.25) !important;
  border-color: var(--error-color) !important;
  color: var(--error-color) !important;
}
</style>
