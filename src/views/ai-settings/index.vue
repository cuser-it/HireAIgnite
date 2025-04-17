<template>
  <div class="ai-config-page">
    <!-- 页面标题 -->
    <div class="page-header">
      <h1 class="page-title">AI 配置</h1>
      <p class="page-description">配置和优化AI功能以满足您的招聘需求</p>
    </div>

    <!-- AI状态卡片 -->
    <div class="status-card">
      <div class="status-header">
        <div class="status-title-section">
          <div class="status-icon">
            <robot-outlined />
          </div>
          <div>
            <h2 class="status-title">AI系统状态</h2>
            <p class="status-subtitle">所有AI服务正常运行中</p>
          </div>
        </div>
        <div class="status-actions">
          <a-button type="primary"> <sync-outlined />重新训练模型 </a-button>
          <a-button> <history-outlined />查看更新日志 </a-button>
        </div>
      </div>

      <div class="status-metrics">
        <div class="metric-item success">
          <div class="metric-header">
            <span class="metric-label">简历解析引擎</span>
            <a-tag color="success">运行中</a-tag>
          </div>
          <div class="metric-value">98.5%</div>
          <div class="metric-description">识别准确率</div>
        </div>
        <div class="metric-item success">
          <div class="metric-header">
            <span class="metric-label">智能匹配算法</span>
            <a-tag color="success">运行中</a-tag>
          </div>
          <div class="metric-value">94.2%</div>
          <div class="metric-description">匹配准确率</div>
        </div>
        <div class="metric-item success">
          <div class="metric-header">
            <span class="metric-label">面试问题生成</span>
            <a-tag color="success">运行中</a-tag>
          </div>
          <div class="metric-value">92.8%</div>
          <div class="metric-description">相关性评分</div>
        </div>
        <div class="metric-item success">
          <div class="metric-header">
            <span class="metric-label">行业知识库</span>
            <a-tag color="success">最新</a-tag>
          </div>
          <div class="metric-value">14</div>
          <div class="metric-description">行业模型可用</div>
        </div>
      </div>
    </div>

    <!-- AI功能配置区域 -->
    <div class="config-grid">
      <!-- 简历解析配置 -->
      <div class="config-card">
        <div class="card-header">
          <div class="module-title">
            <div class="module-icon blue">
              <file-text-outlined />
            </div>
            <div>
              <h2 class="card-title">简历解析配置</h2>
              <p class="card-description">控制AI如何解析和处理简历数据</p>
            </div>
          </div>
          <a-switch :default-checked="true" />
        </div>

        <div class="card-content">
          <div class="form-item">
            <label>解析深度</label>
            <a-select default-value="standard" style="width: 100%">
              <a-select-option value="standard"
                >标准解析 (推荐)</a-select-option
              >
              <a-select-option value="deep"
                >深度解析 (更慢但更详细)</a-select-option
              >
              <a-select-option value="quick"
                >快速解析 (基础信息)</a-select-option
              >
            </a-select>
          </div>

          <div class="form-item">
            <label>技能提取级别</label>
            <div class="slider-container">
              <a-slider :min="1" :max="5" :default-value="3" />
              <div class="slider-labels">
                <span>基础</span>
                <span>专业</span>
              </div>
            </div>
          </div>

          <div class="toggle-item">
            <div class="toggle-info">
              <label>自动完善缺失信息</label>
              <p>使用AI推断简历中可能缺失的信息</p>
            </div>
            <a-switch :default-checked="true" />
          </div>

          <div class="toggle-item">
            <div class="toggle-info">
              <label>自定义字段映射</label>
              <p>针对特定格式的简历进行字段映射</p>
            </div>
            <a-button type="link">配置</a-button>
          </div>
        </div>
      </div>

      <!-- 匹配算法配置 -->
      <div class="config-card">
        <div class="card-header">
          <div class="module-title">
            <div class="module-icon purple">
              <apartment-outlined />
            </div>
            <div>
              <h2 class="card-title">匹配算法配置</h2>
              <p class="card-description">调整候选人与职位的匹配算法</p>
            </div>
          </div>
          <a-switch :default-checked="true" />
        </div>

        <div class="card-content">
          <div class="form-item">
            <label>匹配策略</label>
            <a-select default-value="balanced" style="width: 100%">
              <a-select-option value="balanced">平衡型 (推荐)</a-select-option>
              <a-select-option value="skills">技能优先</a-select-option>
              <a-select-option value="experience">经验优先</a-select-option>
              <a-select-option value="potential">潜力优先</a-select-option>
            </a-select>
          </div>

          <div class="form-item">
            <label>匹配因素权重</label>
            <div class="weight-factors">
              <div class="weight-item">
                <div class="weight-header">
                  <span>技术技能</span>
                  <span>40%</span>
                </div>
                <a-progress :percent="40" :show-info="false" status="normal" />
              </div>
              <div class="weight-item">
                <div class="weight-header">
                  <span>工作经验</span>
                  <span>30%</span>
                </div>
                <a-progress :percent="30" :show-info="false" status="normal" />
              </div>
              <div class="weight-item">
                <div class="weight-header">
                  <span>学历背景</span>
                  <span>15%</span>
                </div>
                <a-progress :percent="15" :show-info="false" status="normal" />
              </div>
              <div class="weight-item">
                <div class="weight-header">
                  <span>软技能评估</span>
                  <span>15%</span>
                </div>
                <a-progress :percent="15" :show-info="false" status="normal" />
              </div>
            </div>
            <a-button type="link" class="custom-weight-btn"
              >自定义权重</a-button
            >
          </div>
        </div>
      </div>

      <!-- 面试辅助配置 -->
      <div class="config-card">
        <div class="card-header">
          <div class="module-title">
            <div class="module-icon green">
              <message-outlined />
            </div>
            <div>
              <h2 class="card-title">面试辅助配置</h2>
              <p class="card-description">自定义AI生成的面试问题和评估标准</p>
            </div>
          </div>
          <a-switch :default-checked="true" />
        </div>

        <div class="card-content">
          <div class="form-item">
            <label>问题生成风格</label>
            <a-select default-value="structured" style="width: 100%">
              <a-select-option value="structured"
                >结构化问题 (推荐)</a-select-option
              >
              <a-select-option value="open">开放式问题</a-select-option>
              <a-select-option value="scenario">情景模拟问题</a-select-option>
              <a-select-option value="challenge"
                >技术挑战型问题</a-select-option
              >
            </a-select>
          </div>

          <div class="toggle-item">
            <div class="toggle-info">
              <label>包含行为测评问题</label>
              <p>基于职位特性生成相关行为面试问题</p>
            </div>
            <a-switch :default-checked="true" />
          </div>

          <div class="toggle-item">
            <div class="toggle-info">
              <label>自定义问题库</label>
              <p>添加公司特定的面试问题</p>
            </div>
            <a-button type="link">管理问题库</a-button>
          </div>

          <div class="toggle-item">
            <div class="toggle-info">
              <label>候选人反馈生成</label>
              <p>自动生成面试反馈和评估报告</p>
            </div>
            <a-switch :default-checked="false" />
          </div>
        </div>
      </div>

      <!-- 行业适应性配置 -->
      <div class="config-card">
        <div class="card-header">
          <div class="module-title">
            <div class="module-icon amber">
              <bank-outlined />
            </div>
            <div>
              <h2 class="card-title">行业适应性配置</h2>
              <p class="card-description">配置AI系统适应特定行业需求</p>
            </div>
          </div>
          <a-switch :default-checked="true" />
        </div>

        <div class="card-content">
          <div class="form-item">
            <label>主要行业</label>
            <a-select default-value="tech" style="width: 100%">
              <a-select-option value="tech">科技/IT</a-select-option>
              <a-select-option value="finance">金融/银行</a-select-option>
              <a-select-option value="health">医疗/健康</a-select-option>
              <a-select-option value="education">教育</a-select-option>
              <a-select-option value="manufacturing">制造业</a-select-option>
              <a-select-option value="retail">零售/电商</a-select-option>
              <a-select-option value="other">其他行业</a-select-option>
            </a-select>
          </div>

          <div class="form-item">
            <label>行业术语和技能库</label>
            <a-input-search placeholder="搜索行业术语库..." />
          </div>

          <div class="info-box">
            <a-alert
              type="info"
              show-icon
              :message="'您正在使用科技/IT行业模型，该模型包含5,200+行业术语和3,800+技能标签，针对技术招聘进行了优化。'"
            />
          </div>

          <div class="toggle-item">
            <div class="toggle-info">
              <label>自定义行业知识库</label>
              <p>上传公司特定的行业知识</p>
            </div>
            <a-button type="link">上传数据</a-button>
          </div>
        </div>
      </div>
    </div>

    <!-- 系统日志和性能 -->
    <div class="log-section">
      <div class="section-header">
        <h2 class="section-title">系统日志和性能</h2>
      </div>

      <div class="section-content">
        <a-table
          :columns="logColumns"
          :data-source="logData"
          :pagination="false"
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'status'">
              <a-tag :color="getStatusColor(record.status)">
                {{ record.status }}
              </a-tag>
            </template>
            <template v-else-if="column.key === 'action'">
              <a-button type="link">查看详情</a-button>
            </template>
          </template>
        </a-table>

        <div class="view-all">
          <a-button type="link">查看所有日志 <right-outlined /></a-button>
        </div>
      </div>
    </div>

    <!-- AI系统提示 -->
    <div class="ai-suggestion">
      <div class="suggestion-icon">
        <bulb-outlined />
      </div>
      <div class="suggestion-content">
        <h3 class="suggestion-title">AI系统建议</h3>
        <p class="suggestion-text">
          基于您最近的招聘活动分析，我们发现技术类职位的面试通过率较低（54%），低于行业平均水平（65%）。建议调整技术面试的匹配算法权重，将"工作经验"因素权重从30%提升至40%，并降低"学历背景"权重。这一调整可能会提高候选人质量和面试通过率。
        </p>
        <div class="suggestion-actions">
          <a-button type="primary">应用建议</a-button>
          <a-button>查看详细分析</a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import {
  RobotOutlined,
  SyncOutlined,
  HistoryOutlined,
  FileTextOutlined,
  ApartmentOutlined,
  MessageOutlined,
  BankOutlined,
  BulbOutlined,
  RightOutlined,
} from "@ant-design/icons-vue";

// 系统日志数据
const logColumns = [
  {
    title: "事件",
    dataIndex: "event",
    key: "event",
  },
  {
    title: "模块",
    dataIndex: "module",
    key: "module",
  },
  {
    title: "状态",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "时间",
    dataIndex: "time",
    key: "time",
  },
  {
    title: "详情",
    key: "action",
  },
];

const logData = [
  {
    key: "1",
    event: "模型更新完成",
    module: "简历解析引擎",
    status: "成功",
    time: "2025-04-08 10:23:45",
  },
  {
    key: "2",
    event: "行业知识库更新",
    module: "行业适应性模块",
    status: "成功",
    time: "2025-04-07 15:17:32",
  },
  {
    key: "3",
    event: "批量简历处理",
    module: "简历解析引擎",
    status: "部分成功",
    time: "2025-04-06 09:45:17",
  },
  {
    key: "4",
    event: "系统维护",
    module: "所有模块",
    status: "成功",
    time: "2025-04-05 01:12:08",
  },
];

// 辅助函数
const getStatusColor = (status) => {
  switch (status) {
    case "成功":
      return "success";
    case "部分成功":
      return "warning";
    case "失败":
      return "error";
    default:
      return "default";
  }
};
</script>

<style scoped>
.ai-config-page {
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

/* AI状态卡片 */
.status-card {
  background-color: var(--bg-color);
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border: 1px solid var(--border-color);
  padding: 24px;
  margin-bottom: 36px;
  transition: all 0.3s ease;
}

.status-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 20px -5px rgba(0, 0, 0, 0.15);
}

.status-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 16px;
}

.status-title-section {
  display: flex;
  align-items: center;
}

.status-icon {
  width: 48px;
  height: 48px;
  background-color: rgba(var(--primary-color-rgb), 0.1);
  color: var(--primary-color);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  margin-right: 16px;
  font-size: 24px;
}

.status-title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 6px;
  color: var(--text-primary);
}

.status-subtitle {
  color: var(--text-secondary);
  font-size: 14px;
}

.status-actions {
  display: flex;
  gap: 12px;
}

.status-metrics {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-top: 24px;
  border-top: 1px solid var(--border-color);
  padding-top: 24px;
}

@media (max-width: 1200px) {
  .status-metrics {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .status-metrics {
    grid-template-columns: 1fr;
  }
}

.metric-item {
  background-color: rgba(var(--primary-color-rgb), 0.03);
  border-radius: 10px;
  padding: 16px;
  border-left: 3px solid transparent;
}

.metric-item.success {
  border-left-color: var(--success-color);
}

.metric-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.metric-label {
  font-weight: 500;
  font-size: 14px;
  color: var(--text-primary);
}

.metric-value {
  font-size: 28px;
  font-weight: 700;
  color: var(--success-color);
  margin-bottom: 4px;
}

.metric-description {
  font-size: 13px;
  color: var(--text-secondary);
}

/* AI功能配置区域 */
.config-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  margin-bottom: 36px;
}

@media (max-width: 1200px) {
  .config-grid {
    grid-template-columns: 1fr;
  }
}

.config-card {
  background-color: var(--bg-color);
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border: 1px solid var(--border-color);
  overflow: hidden;
  transition: all 0.3s ease;
}

.config-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 20px -5px rgba(0, 0, 0, 0.15);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 20px 24px;
  border-bottom: 1px solid var(--border-color);
}

.module-title {
  display: flex;
  align-items: flex-start;
}

.module-icon {
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  margin-right: 16px;
  color: white;
  font-size: 18px;
  flex-shrink: 0;
}

.module-icon.blue {
  background-color: #1890ff;
}

.module-icon.purple {
  background-color: #722ed1;
}

.module-icon.green {
  background-color: #52c41a;
}

.module-icon.amber {
  background-color: #faad14;
}

.card-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 6px;
  color: var(--text-primary);
}

.card-description {
  color: var(--text-secondary);
  font-size: 14px;
}

.card-content {
  padding: 24px;
}

.form-item {
  margin-bottom: 20px;
}

.form-item label {
  display: block;
  font-weight: 500;
  margin-bottom: 8px;
  color: var(--text-primary);
}

.slider-container {
  position: relative;
}

.slider-labels {
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
  color: var(--text-secondary);
  font-size: 13px;
}

.toggle-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px dashed var(--border-color);
}

.toggle-item:last-child {
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: none;
}

.toggle-info label {
  display: block;
  font-weight: 500;
  margin-bottom: 4px;
  color: var(--text-primary);
}

.toggle-info p {
  color: var(--text-secondary);
  font-size: 13px;
  margin: 0;
}

.weight-factors {
  margin-top: 12px;
  margin-bottom: 12px;
}

.weight-item {
  margin-bottom: 16px;
}

.weight-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 6px;
  font-size: 13px;
  color: var(--text-secondary);
}

.custom-weight-btn {
  padding-left: 0;
  margin-top: 4px;
}

.info-box {
  margin-bottom: 20px;
}

/* 系统日志和性能 */
.log-section {
  background-color: var(--bg-color);
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border: 1px solid var(--border-color);
  margin-bottom: 36px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.log-section:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 20px -5px rgba(0, 0, 0, 0.15);
}

.section-header {
  padding: 20px 24px;
  border-bottom: 1px solid var(--border-color);
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
}

.section-content {
  padding: 0;
  overflow-x: auto;
}

.view-all {
  display: flex;
  justify-content: flex-end;
  padding: 12px 24px;
  border-top: 1px solid var(--border-color);
}

/* AI系统提示 */
.ai-suggestion {
  background-color: rgba(var(--primary-color-rgb), 0.05);
  border-radius: 12px;
  padding: 24px;
  display: flex;
  margin-bottom: 36px;
  border: 1px solid rgba(var(--primary-color-rgb), 0.1);
}

.suggestion-icon {
  width: 48px;
  height: 48px;
  background-color: rgba(var(--primary-color-rgb), 0.1);
  color: var(--primary-color);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  margin-right: 20px;
  font-size: 24px;
  flex-shrink: 0;
}

.suggestion-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 12px;
  color: var(--text-primary);
}

.suggestion-text {
  color: var(--text-secondary);
  font-size: 15px;
  line-height: 1.6;
  margin-bottom: 16px;
}

.suggestion-actions {
  display: flex;
  gap: 12px;
}

/* 暗黑模式适配 */
[data-theme="dark"] .status-card,
[data-theme="dark"] .config-card,
[data-theme="dark"] .log-section {
  background-color: rgba(255, 255, 255, 0.05);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
}

[data-theme="dark"] .metric-item,
[data-theme="dark"] .ai-suggestion {
  background-color: rgba(255, 255, 255, 0.04);
}

[data-theme="dark"] .metric-value {
  color: #52c41a;
}

[data-theme="dark"] .module-icon.blue {
  background-color: #177ddc;
}

[data-theme="dark"] .module-icon.purple {
  background-color: #642ab5;
}

[data-theme="dark"] .module-icon.green {
  background-color: #49aa19;
}

[data-theme="dark"] .module-icon.amber {
  background-color: #d89614;
}
</style>
