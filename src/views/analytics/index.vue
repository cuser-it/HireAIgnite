<template>
  <div class="analytics-page">
    <!-- 页面标题和筛选 -->
    <div class="page-header">
      <div class="title-section">
        <h1 class="page-title">数据分析</h1>
        <p class="page-description">分析和可视化您的招聘数据</p>
      </div>
      <div class="action-section">
        <a-select
          default-value="30days"
          style="width: 120px"
          class="time-filter"
        >
          <a-select-option value="30days">过去30天</a-select-option>
          <a-select-option value="90days">过去90天</a-select-option>
          <a-select-option value="6months">过去6个月</a-select-option>
          <a-select-option value="12months">过去12个月</a-select-option>
          <a-select-option value="all">全部时间</a-select-option>
        </a-select>
        <a-button type="primary">
          <template #icon><download-outlined /></template>
          导出报告
        </a-button>
      </div>
    </div>

    <!-- 数据概览卡片 -->
    <div class="stats-section">
      <!-- 简历处理量 -->
      <div class="stat-card">
        <div class="stat-header">
          <h2 class="stat-title">简历处理量</h2>
          <div class="stat-icon blue">
            <file-outlined />
          </div>
        </div>
        <div class="stat-value">3,724</div>
        <div class="stat-trend positive">
          <arrow-up-outlined />
          <span>15%</span>
          <span class="trend-label">较上期</span>
        </div>
      </div>

      <!-- 招聘效率 -->
      <div class="stat-card">
        <div class="stat-header">
          <h2 class="stat-title">招聘效率</h2>
          <div class="stat-icon green">
            <dashboard-outlined />
          </div>
        </div>
        <div class="stat-value">27<span class="stat-unit">天</span></div>
        <div class="stat-trend positive">
          <arrow-down-outlined />
          <span>4天</span>
          <span class="trend-label">较上期</span>
        </div>
      </div>

      <!-- 面试通过率 -->
      <div class="stat-card">
        <div class="stat-header">
          <h2 class="stat-title">面试通过率</h2>
          <div class="stat-icon purple">
            <user-outlined />
          </div>
        </div>
        <div class="stat-value">68.2%</div>
        <div class="stat-trend positive">
          <arrow-up-outlined />
          <span>5.3%</span>
          <span class="trend-label">较上期</span>
        </div>
      </div>

      <!-- Offer接受率 -->
      <div class="stat-card">
        <div class="stat-header">
          <h2 class="stat-title">Offer接受率</h2>
          <div class="stat-icon amber">
            <like-outlined />
          </div>
        </div>
        <div class="stat-value">85.7%</div>
        <div class="stat-trend negative">
          <arrow-down-outlined />
          <span>2.1%</span>
          <span class="trend-label">较上期</span>
        </div>
      </div>
    </div>

    <!-- 图表区域 -->
    <div class="charts-section">
      <!-- 招聘漏斗分析 -->
      <div class="chart-card">
        <div class="card-header">
          <h2 class="card-title">招聘漏斗分析</h2>
          <div class="card-actions">
            <a-select default-value="all" style="width: 120px" size="small">
              <a-select-option value="all">所有职位</a-select-option>
              <a-select-option value="tech">技术职位</a-select-option>
              <a-select-option value="product">产品职位</a-select-option>
              <a-select-option value="design">设计职位</a-select-option>
            </a-select>
            <a-button type="text">
              <more-outlined />
            </a-button>
          </div>
        </div>
        <div class="chart-container">
          <div class="chart-placeholder">
            <funnel-plot-outlined />
            <p>招聘漏斗图表</p>
          </div>
        </div>
        <div class="funnel-summary">
          <div class="funnel-stage">
            <div class="stage-value">3,724</div>
            <div class="stage-label">收到简历</div>
          </div>
          <div class="funnel-stage">
            <div class="stage-value">1,246</div>
            <div class="stage-label">筛选通过</div>
          </div>
          <div class="funnel-stage">
            <div class="stage-value">428</div>
            <div class="stage-label">面试邀请</div>
          </div>
          <div class="funnel-stage">
            <div class="stage-value">152</div>
            <div class="stage-label">发放Offer</div>
          </div>
          <div class="funnel-stage">
            <div class="stage-value">128</div>
            <div class="stage-label">成功入职</div>
          </div>
        </div>
      </div>

      <!-- 招聘效率趋势 -->
      <div class="chart-card">
        <div class="card-header">
          <h2 class="card-title">招聘效率趋势</h2>
          <div class="card-actions">
            <a-select default-value="month" style="width: 120px" size="small">
              <a-select-option value="month">按月查看</a-select-option>
              <a-select-option value="quarter">按季度查看</a-select-option>
              <a-select-option value="year">按年查看</a-select-option>
            </a-select>
            <a-button type="text">
              <more-outlined />
            </a-button>
          </div>
        </div>
        <div class="chart-container">
          <div class="chart-placeholder">
            <line-chart-outlined />
            <p>招聘效率趋势图表</p>
          </div>
        </div>
        <div class="chart-summary">
          过去6个月内，招聘周期从31天减少到27天，提升了12.9%。主要改进来自简历筛选阶段（减少2天）和面试安排阶段（减少1.5天）。
        </div>
      </div>

      <!-- 候选人来源分析 -->
      <div class="chart-card">
        <div class="card-header">
          <h2 class="card-title">候选人来源分析</h2>
          <div class="card-actions">
            <a-select default-value="all" style="width: 120px" size="small">
              <a-select-option value="all">所有候选人</a-select-option>
              <a-select-option value="hired">录用候选人</a-select-option>
            </a-select>
            <a-button type="text">
              <more-outlined />
            </a-button>
          </div>
        </div>
        <div class="chart-container">
          <div class="chart-placeholder">
            <pie-chart-outlined />
            <p>候选人来源饼图</p>
          </div>
        </div>
        <div class="source-analysis">
          <div class="source-conversion">
            <h3>来源转化率</h3>
            <div class="conversion-item">
              <div class="conversion-header">
                <span>内部推荐</span>
                <span class="conversion-rate">32.6%</span>
              </div>
              <a-progress :percent="32.6" :show-info="false" status="normal" />
            </div>
            <div class="conversion-item">
              <div class="conversion-header">
                <span>招聘网站</span>
                <span class="conversion-rate">18.4%</span>
              </div>
              <a-progress :percent="18.4" :show-info="false" status="normal" />
            </div>
            <div class="conversion-item">
              <div class="conversion-header">
                <span>猎头推荐</span>
                <span class="conversion-rate">25.7%</span>
              </div>
              <a-progress :percent="25.7" :show-info="false" status="normal" />
            </div>
          </div>
          <div class="best-sources">
            <h3>效果最佳来源</h3>
            <div class="source-item">
              <span class="source-name"
                ><span class="dot primary"></span>内部推荐</span
              >
              <span class="source-value">42%</span>
            </div>
            <div class="source-item">
              <span class="source-name"
                ><span class="dot blue"></span>猎头推荐</span
              >
              <span class="source-value">28%</span>
            </div>
            <div class="source-item">
              <span class="source-name"
                ><span class="dot green"></span>官网申请</span
              >
              <span class="source-value">15%</span>
            </div>
            <div class="source-item">
              <span class="source-name"
                ><span class="dot amber"></span>招聘网站</span
              >
              <span class="source-value">10%</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 技能需求热度分析 -->
      <div class="chart-card">
        <div class="card-header">
          <h2 class="card-title">技能需求热度分析</h2>
          <div class="card-actions">
            <a-select default-value="tech" style="width: 120px" size="small">
              <a-select-option value="tech">技术部</a-select-option>
              <a-select-option value="product">产品部</a-select-option>
              <a-select-option value="design">设计部</a-select-option>
              <a-select-option value="all">所有部门</a-select-option>
            </a-select>
            <a-button type="text">
              <more-outlined />
            </a-button>
          </div>
        </div>
        <div class="chart-container">
          <div class="chart-placeholder">
            <fire-outlined />
            <p>技能热度图表</p>
          </div>
        </div>
        <div class="skill-tags">
          <a-tag color="blue">React (85)</a-tag>
          <a-tag color="blue">TypeScript (72)</a-tag>
          <a-tag color="blue">微前端 (68)</a-tag>
          <a-tag color="blue">Node.js (63)</a-tag>
          <a-tag color="blue">Java (58)</a-tag>
          <a-tag color="blue">Spring Boot (55)</a-tag>
          <a-tag color="blue">微服务 (52)</a-tag>
          <a-tag color="blue">SQL (48)</a-tag>
          <a-tag color="blue">Python (45)</a-tag>
          <a-tag color="blue">+18 更多</a-tag>
        </div>
      </div>
    </div>

    <!-- 部门招聘效率对比 -->
    <div class="department-section">
      <div class="card-header">
        <h2 class="card-title">部门招聘效率对比</h2>
        <div class="card-actions">
          <a-select default-value="30days" style="width: 120px" size="small">
            <a-select-option value="30days">过去30天</a-select-option>
            <a-select-option value="90days">过去90天</a-select-option>
            <a-select-option value="6months">过去6个月</a-select-option>
          </a-select>
          <a-button type="text">
            <more-outlined />
          </a-button>
        </div>
      </div>
      <div class="table-container">
        <a-table
          :columns="departmentColumns"
          :data-source="departmentData"
          :pagination="false"
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'progress'">
              <div class="progress-cell">
                <a-progress :percent="record.progress" :show-info="false" />
                <span>{{ record.progress }}%</span>
              </div>
            </template>
          </template>
        </a-table>
      </div>
    </div>

    <!-- AI分析洞察 -->
    <div class="insights-section">
      <div class="card-header">
        <h2 class="card-title">AI分析洞察</h2>
        <div class="last-updated">最后更新: 今天 08:45</div>
      </div>

      <div class="key-findings">
        <div class="insight-icon">
          <bulb-outlined />
        </div>
        <div class="insight-content">
          <h3>关键发现</h3>
          <p>
            技术部的面试通过率（62.3%）低于公司平均水平（68.2%），但招聘需求量最大。建议对面试环节进行优化，特别是技术面试阶段的评估标准和流程。内部推荐是最有效的候选人来源，建议加强内部推荐激励机制。
          </p>
        </div>
      </div>

      <div class="insights-grid">
        <div class="insight-card">
          <h3><chart-outlined /> 效率优化机会</h3>
          <ul class="insight-list">
            <li>技术部简历筛选阶段可缩短2-3天</li>
            <li>优化前端开发面试流程，减少冗余评估环节</li>
            <li>加快产品部面试决策时间，平均可节省4天</li>
          </ul>
        </div>

        <div class="insight-card">
          <h3><aim-outlined /> 候选人质量提升</h3>
          <ul class="insight-list">
            <li>调整职位描述中的技能要求优先级</li>
            <li>增加对微前端和TypeScript经验的筛选权重</li>
            <li>提高猎头渠道质量控制标准</li>
          </ul>
        </div>

        <div class="insight-card">
          <h3><fire-outlined /> 市场趋势预测</h3>
          <ul class="insight-list">
            <li>React和微前端人才竞争加剧，建议提前储备</li>
            <li>数据分析师招聘周期预计将延长15%</li>
            <li>产品经理人才市场供应增加，调整薪资策略</li>
          </ul>
        </div>
      </div>

      <div class="generate-report">
        <a-button type="primary">
          <template #icon><experiment-outlined /></template>
          生成完整AI分析报告
        </a-button>
      </div>
    </div>

    <!-- 定制报告 -->
    <div class="reports-section">
      <div class="card-header">
        <h2 class="card-title">定制报告</h2>
        <a-button type="link">管理保存的报告</a-button>
      </div>

      <div class="reports-grid">
        <div class="report-card">
          <div class="report-header">
            <team-outlined />
            <h3>招聘经理周报</h3>
          </div>
          <p>包含关键招聘指标、团队效率对比和候选人流量分析</p>
          <div class="report-footer">
            <span>周度自动生成</span>
            <a-button type="text">
              <download-outlined />
            </a-button>
          </div>
        </div>

        <div class="report-card">
          <div class="report-header">
            <pie-chart-outlined />
            <h3>部门绩效对比</h3>
          </div>
          <p>各部门招聘效率、成本和质量的详细对比分析</p>
          <div class="report-footer">
            <span>月度自动生成</span>
            <a-button type="text">
              <download-outlined />
            </a-button>
          </div>
        </div>

        <div class="report-card">
          <div class="report-header">
            <plus-outlined />
            <h3>创建新报告</h3>
          </div>
          <p>根据您的需求定制专属分析报告</p>
          <div class="report-footer">
            <span>按需创建</span>
            <a-button type="text">
              <plus-outlined />
            </a-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import {
  DownloadOutlined,
  FileOutlined,
  DashboardOutlined,
  UserOutlined,
  LikeOutlined,
  MoreOutlined,
  FunnelPlotOutlined,
  LineChartOutlined,
  PieChartOutlined,
  FireOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  BulbOutlined,
  AimOutlined,
  ExperimentOutlined,
  TeamOutlined,
  PlusOutlined,
} from "@ant-design/icons-vue";

// 部门招聘效率对比表格
const departmentColumns = [
  {
    title: "部门",
    dataIndex: "department",
    key: "department",
  },
  {
    title: "职位数",
    dataIndex: "positions",
    key: "positions",
  },
  {
    title: "简历量",
    dataIndex: "resumes",
    key: "resumes",
  },
  {
    title: "面试邀请率",
    dataIndex: "interviewRate",
    key: "interviewRate",
  },
  {
    title: "面试通过率",
    dataIndex: "passRate",
    key: "passRate",
  },
  {
    title: "平均招聘周期",
    dataIndex: "hireCycle",
    key: "hireCycle",
  },
  {
    title: "完成率",
    key: "progress",
  },
];

const departmentData = [
  {
    key: "1",
    department: "技术部",
    positions: 18,
    resumes: 1256,
    interviewRate: "24.8%",
    passRate: "62.3%",
    hireCycle: "28天",
    progress: 72,
  },
  {
    key: "2",
    department: "产品部",
    positions: 8,
    resumes: 682,
    interviewRate: "18.6%",
    passRate: "71.5%",
    hireCycle: "32天",
    progress: 65,
  },
  {
    key: "3",
    department: "设计部",
    positions: 5,
    resumes: 421,
    interviewRate: "22.3%",
    passRate: "68.9%",
    hireCycle: "25天",
    progress: 85,
  },
  {
    key: "4",
    department: "市场部",
    positions: 7,
    resumes: 548,
    interviewRate: "20.1%",
    passRate: "75.2%",
    hireCycle: "22天",
    progress: 90,
  },
  {
    key: "5",
    department: "运营部",
    positions: 6,
    resumes: 482,
    interviewRate: "25.7%",
    passRate: "70.6%",
    hireCycle: "24天",
    progress: 82,
  },
];
</script>

<style scoped>
.analytics-page {
  padding: 32px;
}

/* 页面标题 */
.page-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 36px;
  flex-wrap: wrap;
  gap: 16px;
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

.action-section {
  display: flex;
  gap: 12px;
  align-items: center;
}

/* 数据概览卡片 */
.stats-section {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  margin-bottom: 36px;
}

@media (max-width: 1200px) {
  .stats-section {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 576px) {
  .stats-section {
    grid-template-columns: 1fr;
  }
}

.stat-card {
  background-color: var(--bg-color);
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border: 1px solid var(--border-color);
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 20px -5px rgba(0, 0, 0, 0.15);
}

.stat-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
  align-items: center;
}

.stat-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-secondary);
}

.stat-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  color: white;
}

.stat-icon.blue {
  background-color: #1890ff;
}

.stat-icon.green {
  background-color: #52c41a;
}

.stat-icon.purple {
  background-color: #722ed1;
}

.stat-icon.amber {
  background-color: #faad14;
}

.stat-value {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 12px;
  color: var(--text-primary);
}

.stat-unit {
  font-size: 18px;
  margin-left: 4px;
}

.stat-trend {
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 500;
}

.stat-trend.positive {
  color: #52c41a;
}

.stat-trend.negative {
  color: #f5222d;
}

.trend-label {
  margin-left: 6px;
  color: var(--text-third);
}

/* 图表区域 */
.charts-section {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  margin-bottom: 36px;
}

@media (max-width: 1200px) {
  .charts-section {
    grid-template-columns: 1fr;
  }
}

.chart-card {
  background-color: var(--bg-color);
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  transition: all 0.3s ease;
  border: 1px solid var(--border-color);
}

.chart-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 20px -5px rgba(0, 0, 0, 0.15);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid var(--border-color);
}

.card-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
}

.card-actions {
  display: flex;
  gap: 8px;
  align-items: center;
}

.chart-container {
  height: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(var(--primary-color-rgb), 0.02);
}

.chart-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--text-third);
  font-size: 20px;
}

.chart-placeholder p {
  margin-top: 8px;
  font-size: 14px;
}

.funnel-summary {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  padding: 16px 24px;
  gap: 12px;
  text-align: center;
}

.stage-value {
  font-weight: 600;
  margin-bottom: 4px;
  color: var(--text-primary);
}

.stage-label {
  font-size: 13px;
  color: var(--text-secondary);
}

.chart-summary {
  padding: 16px 24px;
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.6;
}

.source-analysis {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  padding: 16px 24px;
  gap: 20px;
}

.source-conversion h3,
.best-sources h3 {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 12px;
  color: var(--text-primary);
}

.conversion-item {
  margin-bottom: 12px;
}

.conversion-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 6px;
  font-size: 13px;
}

.conversion-rate {
  color: var(--success-color);
  font-weight: 500;
}

.source-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 13px;
  align-items: center;
}

.source-name {
  display: flex;
  align-items: center;
}

.dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-right: 6px;
}

.dot.primary {
  background-color: var(--primary-color);
}

.dot.blue {
  background-color: #1890ff;
}

.dot.green {
  background-color: #52c41a;
}

.dot.amber {
  background-color: #faad14;
}

.source-value {
  font-weight: 500;
}

.skill-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 16px 24px;
}

/* 部门招聘效率对比 */
.department-section {
  background-color: var(--bg-color);
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  margin-bottom: 36px;
  transition: all 0.3s ease;
  border: 1px solid var(--border-color);
}

.department-section:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 20px -5px rgba(0, 0, 0, 0.15);
}

.table-container {
  overflow-x: auto;
}

.progress-cell {
  display: flex;
  align-items: center;
  gap: 12px;
}

/* AI分析洞察 */
.insights-section {
  background-color: var(--bg-color);
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  padding: 24px;
  margin-bottom: 36px;
  transition: all 0.3s ease;
  border: 1px solid var(--border-color);
}

.insights-section:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 20px -5px rgba(0, 0, 0, 0.15);
}

.last-updated {
  font-size: 14px;
  color: var(--text-secondary);
}

.key-findings {
  background-color: rgba(var(--primary-color-rgb), 0.05);
  border-radius: 12px;
  padding: 20px;
  margin: 20px 0;
  display: flex;
  align-items: flex-start;
  gap: 16px;
}

.insight-icon {
  width: 48px;
  height: 48px;
  background-color: rgba(var(--primary-color-rgb), 0.1);
  color: var(--primary-color);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  font-size: 24px;
  flex-shrink: 0;
}

.insight-content h3 {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
  color: var(--primary-color);
}

.insight-content p {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.6;
  margin: 0;
}

.insights-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin: 24px 0;
}

@media (max-width: 992px) {
  .insights-grid {
    grid-template-columns: 1fr;
  }
}

.insight-card {
  background-color: rgba(var(--primary-color-rgb), 0.02);
  border-radius: 12px;
  padding: 20px;
}

.insight-card h3 {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 16px;
  color: var(--text-primary);
}

.insight-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.insight-list li {
  position: relative;
  padding-left: 24px;
  margin-bottom: 12px;
  font-size: 14px;
  color: var(--text-secondary);
}

.insight-list li::before {
  content: "";
  position: absolute;
  left: 0;
  top: 5px;
  width: 16px;
  height: 16px;
  background-color: rgba(var(--success-color-rgb), 0.1);
  border-radius: 50%;
}

.insight-list li::after {
  content: "✓";
  position: absolute;
  left: 4px;
  top: 1px;
  color: var(--success-color);
  font-size: 10px;
}

.generate-report {
  display: flex;
  justify-content: center;
  margin-top: 24px;
}

/* 定制报告 */
.reports-section {
  background-color: var(--bg-color);
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  padding: 24px;
  margin-bottom: 36px;
  transition: all 0.3s ease;
  border: 1px solid var(--border-color);
}

.reports-section:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 20px -5px rgba(0, 0, 0, 0.15);
}

.reports-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-top: 20px;
}

@media (max-width: 992px) {
  .reports-grid {
    grid-template-columns: 1fr;
  }
}

.report-card {
  border: 1px solid var(--border-color);
  border-radius: 10px;
  padding: 20px;
  transition: all 0.2s ease;
}

.report-card:hover {
  border-color: var(--primary-color);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.report-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
}

.report-header h3 {
  font-size: 16px;
  font-weight: 600;
  margin: 0;
  color: var(--text-primary);
}

.report-card p {
  font-size: 14px;
  color: var(--text-secondary);
  margin-bottom: 16px;
  line-height: 1.5;
}

.report-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  color: var(--text-third);
}

/* 暗黑模式适配 */
[data-theme="dark"] .stat-card,
[data-theme="dark"] .chart-card,
[data-theme="dark"] .department-section,
[data-theme="dark"] .insights-section,
[data-theme="dark"] .reports-section {
  background-color: rgba(255, 255, 255, 0.05);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
}

[data-theme="dark"] .chart-container {
  background-color: rgba(255, 255, 255, 0.02);
}

[data-theme="dark"] .key-findings {
  background-color: rgba(255, 255, 255, 0.03);
}

[data-theme="dark"] .insight-card {
  background-color: rgba(255, 255, 255, 0.04);
}

[data-theme="dark"] .report-card {
  border-color: rgba(255, 255, 255, 0.1);
}

[data-theme="dark"] .report-card:hover {
  border-color: var(--primary-color);
}
</style>
