<template>
  <div class="settings-page">
    <!-- 页面标题 -->
    <div class="page-header">
      <h1 class="page-title">系统设置</h1>
      <p class="page-description">配置和自定义系统以满足您的招聘流程需求</p>
    </div>

    <!-- 设置导航选项卡 -->
    <div class="tabs-section">
      <a-tabs default-active-key="general">
        <a-tab-pane key="general" tab="常规设置">
          <template #tab> <setting-outlined />常规设置 </template>
        </a-tab-pane>
        <a-tab-pane key="users" tab="用户管理">
          <template #tab> <user-outlined />用户管理 </template>
        </a-tab-pane>
        <a-tab-pane key="permissions" tab="权限设置">
          <template #tab> <safety-outlined />权限设置 </template>
        </a-tab-pane>
        <a-tab-pane key="integrations" tab="集成服务">
          <template #tab> <api-outlined />集成服务 </template>
        </a-tab-pane>
        <a-tab-pane key="notifications" tab="通知设置">
          <template #tab> <notification-outlined />通知设置 </template>
        </a-tab-pane>
      </a-tabs>
    </div>

    <!-- 常规设置区域 -->
    <div class="settings-grid">
      <!-- 公司信息 -->
      <div class="setting-card">
        <div class="card-header">
          <div>
            <h2 class="card-title">公司信息</h2>
            <p class="card-description">管理您的公司基本信息</p>
          </div>
          <a-button type="link" class="edit-button">
            <edit-outlined />
          </a-button>
        </div>

        <div class="card-content">
          <div class="company-logo">
            <a-avatar :size="80" src="/api/placeholder/80/80" />
            <a-button type="primary" class="ml-4">更换Logo</a-button>
          </div>

          <div class="form-item">
            <label>公司名称</label>
            <a-input value="科技未来有限公司" />
          </div>

          <div class="form-item">
            <label>官方网站</label>
            <a-input value="https://www.techfuture.com" />
          </div>

          <div class="form-item">
            <label>行业</label>
            <a-select default-value="tech" style="width: 100%">
              <a-select-option value="tech">科技/IT</a-select-option>
              <a-select-option value="finance">金融/银行</a-select-option>
              <a-select-option value="education">教育</a-select-option>
              <a-select-option value="healthcare">医疗健康</a-select-option>
              <a-select-option value="manufacturing">制造业</a-select-option>
              <a-select-option value="retail">零售/电商</a-select-option>
            </a-select>
          </div>

          <div class="form-item">
            <label>公司规模</label>
            <a-select default-value="201-500" style="width: 100%">
              <a-select-option value="1-50">1-50人</a-select-option>
              <a-select-option value="51-200">51-200人</a-select-option>
              <a-select-option value="201-500">201-500人</a-select-option>
              <a-select-option value="501-1000">501-1000人</a-select-option>
              <a-select-option value="1000+">1000+人</a-select-option>
            </a-select>
          </div>

          <div class="action-buttons">
            <a-button type="primary">保存更改</a-button>
          </div>
        </div>
      </div>

      <!-- 招聘流程设置 -->
      <div class="setting-card">
        <div class="card-header">
          <div>
            <h2 class="card-title">招聘流程设置</h2>
            <p class="card-description">配置标准招聘流程和阶段</p>
          </div>
          <a-button type="link" class="edit-button">
            <edit-outlined />
          </a-button>
        </div>

        <div class="card-content">
          <div class="form-item">
            <label>默认招聘流程</label>
            <a-select default-value="standard" style="width: 100%">
              <a-select-option value="standard">标准五步流程</a-select-option>
              <a-select-option value="simplified">简化三步流程</a-select-option>
              <a-select-option value="tech">技术岗位流程</a-select-option>
              <a-select-option value="management">管理岗位流程</a-select-option>
              <a-select-option value="intern">实习生流程</a-select-option>
            </a-select>
          </div>

          <div class="form-item">
            <label>招聘阶段顺序</label>
            <div class="recruitment-stages">
              <div
                class="stage-item"
                v-for="(stage, index) in recruitmentStages"
                :key="index"
              >
                <div class="stage-info">
                  <div class="stage-number">{{ index + 1 }}</div>
                  <span class="stage-name">{{ stage }}</span>
                </div>
                <div class="stage-actions">
                  <a-button
                    type="text"
                    :disabled="index === 0"
                    class="stage-action-btn"
                  >
                    <arrow-up-outlined />
                  </a-button>
                  <a-button
                    type="text"
                    :disabled="index === recruitmentStages.length - 1"
                    class="stage-action-btn"
                  >
                    <arrow-down-outlined />
                  </a-button>
                </div>
              </div>
            </div>
          </div>

          <div class="form-item">
            <a-button type="link" class="add-stage-btn">
              <plus-outlined />添加招聘阶段
            </a-button>
          </div>

          <div class="action-buttons">
            <a-button type="primary">保存更改</a-button>
          </div>
        </div>
      </div>

      <!-- 自定义字段 -->
      <div class="setting-card">
        <div class="card-header">
          <div>
            <h2 class="card-title">自定义字段</h2>
            <p class="card-description">为简历和候选人添加自定义信息字段</p>
          </div>
          <a-button type="link" class="edit-button">
            <plus-outlined />
          </a-button>
        </div>

        <div class="card-content">
          <a-table
            :columns="customFieldColumns"
            :data-source="customFieldData"
            :pagination="false"
          >
            <template #bodyCell="{ column, record }">
              <template v-if="column.key === 'required'">
                <a-tag :color="record.required ? 'success' : 'error'">
                  {{ record.required ? "是" : "否" }}
                </a-tag>
              </template>
              <template v-else-if="column.key === 'actions'">
                <a-button type="link">编辑</a-button>
                <a-button type="link" danger>删除</a-button>
              </template>
            </template>
          </a-table>

          <div class="action-buttons">
            <a-button type="primary">添加自定义字段</a-button>
          </div>
        </div>
      </div>

      <!-- 邮件模板设置 -->
      <div class="setting-card">
        <div class="card-header">
          <div>
            <h2 class="card-title">邮件模板设置</h2>
            <p class="card-description">管理招聘流程中使用的邮件模板</p>
          </div>
          <a-button type="link" class="edit-button">
            <plus-outlined />
          </a-button>
        </div>

        <div class="card-content">
          <div class="email-templates">
            <div
              class="email-template-item"
              v-for="(template, index) in emailTemplates"
              :key="index"
            >
              <div class="template-info">
                <h3>{{ template.name }}</h3>
                <p>{{ template.description }}</p>
              </div>
              <div class="template-actions">
                <a-button type="link" class="action-btn">
                  <edit-outlined />
                </a-button>
                <a-button type="link" class="action-btn">
                  <eye-outlined />
                </a-button>
              </div>
            </div>
          </div>

          <div class="action-buttons">
            <a-button type="primary">创建新模板</a-button>
          </div>
        </div>
      </div>
    </div>

    <!-- 系统功能开关 -->
    <div class="setting-card full-width">
      <div class="card-header">
        <div>
          <h2 class="card-title">系统功能开关</h2>
          <p class="card-description">启用或禁用系统功能</p>
        </div>
      </div>

      <div class="card-content">
        <div class="feature-toggles">
          <div
            class="feature-toggle-item"
            v-for="(feature, index) in featureToggles"
            :key="index"
          >
            <div class="feature-info">
              <h3>{{ feature.name }}</h3>
              <p>{{ feature.description }}</p>
            </div>
            <a-switch :default-checked="feature.enabled" />
          </div>
        </div>
      </div>
    </div>

    <!-- 安全设置 -->
    <div class="setting-card full-width">
      <div class="card-header">
        <div>
          <h2 class="card-title">安全设置</h2>
          <p class="card-description">配置系统安全和数据保护选项</p>
        </div>
      </div>

      <div class="card-content">
        <div class="security-settings">
          <div class="form-item">
            <label>数据保留策略</label>
            <a-select default-value="2years" style="width: 100%">
              <a-select-option value="6months">6个月</a-select-option>
              <a-select-option value="1year">1年</a-select-option>
              <a-select-option value="2years">2年</a-select-option>
              <a-select-option value="3years">3年</a-select-option>
              <a-select-option value="forever">永久保留</a-select-option>
            </a-select>
            <p class="helper-text">设置淘汰候选人数据的保留时长</p>
          </div>

          <div class="form-item">
            <label>登录安全</label>
            <div class="checkbox-group">
              <a-checkbox>启用两步验证</a-checkbox>
              <a-checkbox :default-checked="true"
                >30分钟无操作自动登出</a-checkbox
              >
              <a-checkbox :default-checked="true"
                >强制密码复杂度要求</a-checkbox
              >
            </div>
          </div>

          <div class="form-item">
            <label>数据访问审计</label>
            <div class="checkbox-group">
              <a-checkbox :default-checked="true"
                >启用敏感数据访问审计</a-checkbox
              >
            </div>
          </div>

          <div class="form-item">
            <label>候选人数据隐私</label>
            <div class="checkbox-group">
              <a-checkbox>自动匿名化淘汰候选人数据</a-checkbox>
              <a-checkbox :default-checked="true">限制敏感数据导出</a-checkbox>
            </div>
          </div>

          <div class="action-buttons">
            <a-button type="primary">保存安全设置</a-button>
          </div>
        </div>
      </div>
    </div>

    <!-- 系统信息 -->
    <div class="setting-card full-width">
      <div class="card-header">
        <div>
          <h2 class="card-title">系统信息</h2>
          <p class="card-description">查看系统版本和许可信息</p>
        </div>
      </div>

      <div class="card-content">
        <div class="system-info">
          <div class="system-info-grid">
            <div
              class="system-info-item"
              v-for="(item, index) in systemInfo"
              :key="index"
            >
              <p class="info-label">{{ item.label }}</p>
              <p class="info-value" :class="item.highlight ? 'highlight' : ''">
                {{ item.value }}
              </p>
            </div>
          </div>

          <div class="system-actions">
            <a-button type="primary"> <sync-outlined />检查更新 </a-button>
            <a-button> <customer-service-outlined />联系支持 </a-button>
          </div>

          <div class="copyright-info">
            <p>
              © 2025 TalentMatch AI. 保留所有权利。使用本软件受
              <a href="#">服务条款</a> 和 <a href="#">隐私政策</a> 约束。
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import {
  PlusOutlined,
  EditOutlined,
  EyeOutlined,
  SettingOutlined,
  UserOutlined,
  SafetyOutlined,
  ApiOutlined,
  NotificationOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  SyncOutlined,
  CustomerServiceOutlined,
} from "@ant-design/icons-vue";

// 招聘阶段
const recruitmentStages = reactive([
  "简历筛选",
  "电话初筛",
  "技术面试",
  "主管面试",
  "Offer发放",
]);

// 自定义字段表格
const customFieldColumns = [
  {
    title: "字段名称",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "应用对象",
    dataIndex: "object",
    key: "object",
  },
  {
    title: "字段类型",
    dataIndex: "type",
    key: "type",
  },
  {
    title: "是否必填",
    dataIndex: "required",
    key: "required",
  },
  {
    title: "操作",
    key: "actions",
  },
];

const customFieldData = [
  {
    key: "1",
    name: "期望薪资",
    object: "候选人",
    type: "数字范围",
    required: true,
  },
  {
    key: "2",
    name: "到岗时间",
    object: "候选人",
    type: "下拉选择",
    required: false,
  },
  {
    key: "3",
    name: "加班意愿",
    object: "候选人",
    type: "单选",
    required: false,
  },
  {
    key: "4",
    name: "技术博客",
    object: "简历",
    type: "URL链接",
    required: false,
  },
];

// 邮件模板
const emailTemplates = [
  {
    name: "面试邀请",
    description: "用于向候选人发送面试邀请",
  },
  {
    name: "面试确认",
    description: "确认候选人面试时间和地点",
  },
  {
    name: "Offer发放",
    description: "向候选人发送正式录用通知",
  },
  {
    name: "婉拒通知",
    description: "告知未通过筛选的候选人",
  },
];

// 功能开关
const featureToggles = [
  {
    name: "候选人自动提醒",
    description: "自动向候选人发送面试提醒和跟进通知",
    enabled: true,
  },
  {
    name: "数据分析和报告",
    description: "生成招聘效率和候选人质量分析报告",
    enabled: true,
  },
  {
    name: "数据导出功能",
    description: "允许用户导出招聘和候选人数据",
    enabled: true,
  },
  {
    name: "候选人反馈收集",
    description: "向候选人发送面试体验反馈表单",
    enabled: true,
  },
  {
    name: "招聘官协作功能",
    description: "允许多个招聘官共同管理职位和候选人",
    enabled: true,
  },
  {
    name: "候选人匿名化",
    description: "初步筛选时隐藏候选人的性别、年龄等信息",
    enabled: false,
  },
  {
    name: "面试评分标准化",
    description: "使用统一的评分标准对候选人进行评估",
    enabled: true,
  },
];

// 系统信息
const systemInfo = [
  {
    label: "系统版本",
    value: "TalentMatch AI v3.5.2",
  },
  {
    label: "许可状态",
    value: "企业版 (有效期至: 2026-12-31)",
    highlight: true,
  },
  {
    label: "最后更新",
    value: "2025-03-25",
  },
  {
    label: "授权用户数",
    value: "38 / 50",
  },
  {
    label: "数据中心",
    value: "亚太区 (北京)",
  },
  {
    label: "支持服务等级",
    value: "高级支持 (24×7)",
  },
];
</script>

<style scoped>
.settings-page {
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

.tabs-section {
  margin-bottom: 36px;
  background-color: var(--bg-color);
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border: 1px solid var(--border-color);
}

.settings-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  margin-bottom: 36px;
}

@media (max-width: 1200px) {
  .settings-grid {
    grid-template-columns: 1fr;
  }
}

.setting-card {
  background-color: var(--bg-color);
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border: 1px solid var(--border-color);
  transition: all 0.3s ease;
  overflow: hidden;
  margin-bottom: 24px;
}

.setting-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 20px -5px rgba(0, 0, 0, 0.15);
}

.full-width {
  grid-column: 1 / -1;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 20px 24px;
  border-bottom: 1px solid var(--border-color);
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

.helper-text {
  color: var(--text-secondary);
  font-size: 12px;
  margin-top: 4px;
}

.company-logo {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.recruitment-stages {
  margin-top: 12px;
}

.stage-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(var(--primary-color-rgb), 0.03);
  padding: 12px 16px;
  border-radius: 8px;
  margin-bottom: 8px;
}

.stage-info {
  display: flex;
  align-items: center;
}

.stage-number {
  width: 24px;
  height: 24px;
  background-color: rgba(var(--primary-color-rgb), 0.1);
  color: var(--primary-color);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  margin-right: 12px;
  font-weight: 600;
}

.stage-name {
  font-weight: 500;
}

.stage-actions {
  display: flex;
  gap: 8px;
}

.stage-action-btn {
  color: var(--text-secondary);
}

.add-stage-btn {
  color: var(--primary-color);
  padding-left: 0;
}

.action-buttons {
  margin-top: 24px;
  display: flex;
  justify-content: flex-end;
}

.email-templates {
  margin-top: 12px;
}

.email-template-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(var(--primary-color-rgb), 0.03);
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 12px;
}

.template-info h3 {
  font-weight: 500;
  margin-bottom: 4px;
  color: var(--text-primary);
}

.template-info p {
  color: var(--text-secondary);
  font-size: 13px;
}

.template-actions {
  display: flex;
  gap: 8px;
}

.action-btn {
  color: var(--text-secondary);
}

.feature-toggles {
  display: grid;
  gap: 20px;
}

.feature-toggle-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--border-color);
}

.feature-toggle-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.feature-info h3 {
  font-weight: 500;
  margin-bottom: 4px;
  color: var(--text-primary);
}

.feature-info p {
  color: var(--text-secondary);
  font-size: 13px;
  max-width: 600px;
}

.checkbox-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.system-info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  background-color: rgba(var(--primary-color-rgb), 0.03);
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 24px;
}

@media (max-width: 768px) {
  .system-info-grid {
    grid-template-columns: 1fr;
  }
}

.system-info-item {
  display: flex;
  flex-direction: column;
}

.info-label {
  color: var(--text-secondary);
  font-size: 14px;
  margin-bottom: 4px;
}

.info-value {
  color: var(--text-primary);
  font-weight: 500;
}

.info-value.highlight {
  color: var(--success-color);
}

.system-actions {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
}

.copyright-info {
  color: var(--text-secondary);
  font-size: 14px;
}

.copyright-info a {
  color: var(--primary-color);
}

/* 暗黑模式适配 */
[data-theme="dark"] .setting-card,
[data-theme="dark"] .tabs-section {
  background-color: rgba(255, 255, 255, 0.05);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
}

[data-theme="dark"] .stage-item,
[data-theme="dark"] .email-template-item,
[data-theme="dark"] .system-info-grid {
  background-color: rgba(255, 255, 255, 0.04);
}
</style>
