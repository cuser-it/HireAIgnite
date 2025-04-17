<template>
  <div class="interview-schedule">
    <!-- 页面内容区域 -->
    <div class="content-wrapper">
      <!-- 页面标题 -->
      <div class="page-header">
        <div class="title-section">
          <h1>{{ $t("interviews.title") || "面试安排" }}</h1>
          <p>{{ $t("interviews.subtitle") || "管理和安排候选人面试" }}</p>
        </div>
        <div class="actions">
          <a-button type="primary" @click="showAddInterviewModal">
            <template #icon><plus-outlined /></template>
            {{ $t("interviews.addInterview") || "安排新面试" }}
          </a-button>
        </div>
      </div>

      <!-- 概览卡片 -->
      <div class="stats-cards">
        <a-row :gutter="16">
          <a-col :xs="24" :sm="12" :md="6">
            <a-card class="stat-card">
              <div class="stat-header">
                <h3>{{ $t("interviews.todayInterviews") || "今日面试" }}</h3>
                <div class="stat-icon blue">
                  <calendar-outlined />
                </div>
              </div>
              <div class="stat-content">
                <div class="stat-value">{{ stats.today.total }}</div>
                <div class="stat-details">
                  <span
                    >{{ stats.today.completed }}
                    {{ $t("interviews.completed") || "已完成" }}</span
                  >
                  <span
                    >{{ stats.today.upcoming }}
                    {{ $t("interviews.upcoming") || "待进行" }}</span
                  >
                </div>
              </div>
            </a-card>
          </a-col>
          <a-col :xs="24" :sm="12" :md="6">
            <a-card class="stat-card">
              <div class="stat-header">
                <h3>{{ $t("interviews.weekInterviews") || "本周面试" }}</h3>
                <div class="stat-icon purple">
                  <calendar-outlined />
                </div>
              </div>
              <div class="stat-content">
                <div class="stat-value">{{ stats.week.total }}</div>
                <div class="stat-details">
                  <span
                    >{{ stats.week.completed }}
                    {{ $t("interviews.completed") || "已完成" }}</span
                  >
                  <span
                    >{{ stats.week.upcoming }}
                    {{ $t("interviews.upcoming") || "待进行" }}</span
                  >
                </div>
              </div>
            </a-card>
          </a-col>
          <a-col :xs="24" :sm="12" :md="6">
            <a-card class="stat-card">
              <div class="stat-header">
                <h3>{{ $t("interviews.passRate") || "面试通过率" }}</h3>
                <div class="stat-icon green">
                  <check-circle-outlined />
                </div>
              </div>
              <div class="stat-content">
                <div class="stat-value">{{ stats.passRate.value }}%</div>
                <div class="stat-trend">
                  <span
                    :class="
                      stats.passRate.trend > 0 ? 'trend-up' : 'trend-down'
                    "
                  >
                    <arrow-up-outlined v-if="stats.passRate.trend > 0" />
                    <arrow-down-outlined v-else />
                    {{ Math.abs(stats.passRate.trend) }}%
                  </span>
                  <span>{{ $t("common.vsLastMonth") || "较上月" }}</span>
                </div>
              </div>
            </a-card>
          </a-col>
          <a-col :xs="24" :sm="12" :md="6">
            <a-card class="stat-card">
              <div class="stat-header">
                <h3>{{ $t("interviews.avgDuration") || "平均面试时长" }}</h3>
                <div class="stat-icon yellow">
                  <clock-circle-outlined />
                </div>
              </div>
              <div class="stat-content">
                <div class="stat-value">
                  {{ stats.avgDuration.value
                  }}<span class="stat-unit">{{
                    $t("interviews.minutes") || "分钟"
                  }}</span>
                </div>
                <div class="stat-trend">
                  <span
                    :class="
                      stats.avgDuration.trend > 0 ? 'trend-up' : 'trend-down'
                    "
                  >
                    <arrow-up-outlined v-if="stats.avgDuration.trend > 0" />
                    <arrow-down-outlined v-else />
                    {{ Math.abs(stats.avgDuration.trend)
                    }}{{ $t("interviews.minutes") || "分钟" }}
                  </span>
                  <span>{{ $t("common.vsLastMonth") || "较上月" }}</span>
                </div>
              </div>
            </a-card>
          </a-col>
        </a-row>
      </div>

      <!-- 视图切换选项卡 -->
      <a-card class="view-tabs">
        <a-tabs v-model="activeView">
          <a-tab-pane
            key="calendar"
            :tab="$t('interviews.calendarView') || '日历视图'"
          >
            <div class="calendar-toolbar">
              <div class="calendar-nav">
                <a-button-group>
                  <a-button @click="prevMonth">
                    <template #icon><left-outlined /></template>
                  </a-button>
                  <a-button @click="nextMonth">
                    <template #icon><right-outlined /></template>
                  </a-button>
                </a-button-group>
                <span class="current-month">{{ currentMonthDisplay }}</span>
                <a-button size="small" @click="goToToday">
                  {{ $t("interviews.today") || "今天" }}
                </a-button>
              </div>
              <div class="calendar-filters">
                <a-button size="small">
                  <template #icon><filter-outlined /></template>
                  {{ $t("interviews.filter") || "筛选" }}
                </a-button>
                <a-select
                  v-model="calendarFilter"
                  style="width: 140px"
                  size="small"
                >
                  <a-select-option value="all">{{
                    $t("interviews.allPositions") || "所有职位"
                  }}</a-select-option>
                  <a-select-option value="frontend">{{
                    $t("interviews.frontend") || "前端开发"
                  }}</a-select-option>
                  <a-select-option value="backend">{{
                    $t("interviews.backend") || "后端开发"
                  }}</a-select-option>
                  <a-select-option value="product">{{
                    $t("interviews.product") || "产品经理"
                  }}</a-select-option>
                  <a-select-option value="design">{{
                    $t("interviews.design") || "UI设计师"
                  }}</a-select-option>
                </a-select>
              </div>
            </div>

            <!-- 日历视图 -->
            <div class="calendar-container">
              <!-- 星期标题 -->
              <div class="calendar-header">
                <div
                  v-for="day in weekDays"
                  :key="day"
                  class="calendar-header-cell"
                >
                  {{ day }}
                </div>
              </div>

              <!-- 日历内容 -->
              <div class="calendar-body">
                <div
                  v-for="(day, index) in calendarDays"
                  :key="index"
                  class="calendar-day"
                  :class="{
                    'prev-month': day.isPrevMonth,
                    'next-month': day.isNextMonth,
                    'current-day': day.isToday,
                    weekend: day.isWeekend,
                  }"
                >
                  <div class="day-number">{{ day.date }}</div>
                  <div class="day-events">
                    <div
                      v-for="event in day.events"
                      :key="event.id"
                      class="calendar-event"
                      :class="event.type"
                      @click="showEventDetails(event)"
                    >
                      <div class="event-time">{{ event.time }}</div>
                      <div class="event-title">{{ event.title }}</div>
                      <div class="event-description">
                        {{ event.description }}
                      </div>
                    </div>
                    <div
                      v-if="day.moreEvents"
                      class="more-events"
                      @click="showMoreEvents(day)"
                    >
                      +{{ day.moreEvents }}
                      {{ $t("interviews.more") || "更多" }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </a-tab-pane>
          <a-tab-pane key="list" :tab="$t('interviews.listView') || '列表视图'">
            <!-- 列表视图内容 -->
            <a-table
              :dataSource="interviewList"
              :columns="listColumns"
              :loading="loading"
              :pagination="tablePagination"
              @change="handleTableChange"
            />
          </a-tab-pane>
          <a-tab-pane
            key="interviewer"
            :tab="$t('interviews.interviewerView') || '面试官视图'"
          >
            <!-- 面试官视图内容 -->
            <div class="interviewer-view">
              <a-empty :description="$t('common.comingSoon') || '即将上线'" />
            </div>
          </a-tab-pane>
        </a-tabs>
      </a-card>

      <!-- 今日待面试列表 -->
      <div class="section-heading">
        <h2>{{ $t("interviews.todayUpcoming") || "今日待面试" }}</h2>
      </div>
      <a-row :gutter="16" class="interview-cards">
        <a-col
          :xs="24"
          :sm="12"
          :md="8"
          v-for="interview in todayInterviews"
          :key="interview.id"
        >
          <a-card
            class="interview-card"
            :class="{ warning: interview.needsAttention }"
          >
            <div class="card-time-badge" :class="interview.status">
              {{ interview.timeDisplay }}
            </div>
            <div class="card-content">
              <div class="candidate-info">
                <a-avatar :src="interview.candidateAvatar || ''" size="large" />
                <div class="info">
                  <h3>{{ interview.candidateName }}</h3>
                  <p>{{ interview.position }} ({{ interview.round }})</p>
                  <div class="interview-mode">
                    <video-camera-outlined v-if="interview.mode === 'online'" />
                    <bank-outlined v-else-if="interview.mode === 'onsite'" />
                    <phone-outlined v-else />
                    <span>{{ interview.location }}</span>
                  </div>
                </div>
              </div>
              <div class="card-actions">
                <a-button type="primary">
                  <template #icon><file-text-outlined /></template>
                  {{ $t("interviews.resume") || "简历" }}
                </a-button>
                <a-button>
                  <template #icon><calendar-outlined /></template>
                  {{
                    interview.needsAttention
                      ? $t("interviews.schedule") || "安排时间"
                      : $t("interviews.reschedule") || "重新安排"
                  }}
                </a-button>
              </div>
            </div>
            <a-dropdown
              :trigger="['click']"
              overlay-class-name="interview-card-dropdown"
            >
              <template #overlay>
                <a-menu>
                  <a-menu-item key="view">
                    <eye-outlined />
                    {{ $t("common.view") || "查看" }}
                  </a-menu-item>
                  <a-menu-item key="reschedule">
                    <calendar-outlined />
                    {{ $t("interviews.reschedule") || "重新安排" }}
                  </a-menu-item>
                  <a-menu-item key="cancel" danger>
                    <close-outlined />
                    {{ $t("interviews.cancel") || "取消" }}
                  </a-menu-item>
                </a-menu>
              </template>
              <more-outlined class="card-more-actions" />
            </a-dropdown>
          </a-card>
        </a-col>
      </a-row>

      <!-- AI推荐面试问题 -->
      <a-card class="ai-questions">
        <template #title>
          <h2>
            {{ $t("interviews.aiRecommendedQuestions") || "AI推荐面试问题" }}
          </h2>
        </template>

        <!-- AI智能提示 -->
        <div class="ai-insight">
          <div class="insight-icon">
            <bulb-outlined />
          </div>
          <div class="insight-content">
            <h3>{{ $t("interviews.aiInsight") || "智能提示" }}</h3>
            <p>{{ aiInsight }}</p>
          </div>
        </div>

        <!-- 问题列表 -->
        <a-card class="question-list">
          <template #title>
            <div class="question-list-header">
              <h3>
                {{ selectedPosition }} -
                {{ $t("interviews.technicalQuestions") || "技术能力评估问题" }}
              </h3>
              <span>{{ selectedCandidate }} ({{ selectedTime }})</span>
            </div>
          </template>

          <div class="question-items">
            <div
              v-for="(question, index) in recommendedQuestions"
              :key="index"
              class="question-item"
            >
              <div class="question-number">{{ index + 1 }}</div>
              <div class="question-content">
                <p>{{ question.text }}</p>
                <div class="question-tags">
                  <a-tag color="blue">{{ question.category }}</a-tag>
                  <span class="question-target"
                    >{{ $t("interviews.targetingSkill") || "针对性" }}:
                    {{ question.target }}</span
                  >
                </div>
              </div>
            </div>
          </div>

          <template #actions>
            <div class="question-actions">
              <span class="generation-info">{{
                $t("interviews.generatedFrom") || "基于候选人简历和职位要求生成"
              }}</span>
              <a-button type="link">
                <download-outlined />
                {{ $t("interviews.exportQuestions") || "导出问题清单" }}
              </a-button>
            </div>
          </template>
        </a-card>

        <div class="more-questions">
          <a-button type="link">
            <plus-circle-outlined />
            {{ $t("interviews.viewMoreQuestions") || "查看更多候选人问题推荐" }}
          </a-button>
        </div>
      </a-card>

      <!-- 添加面试弹窗 -->
      <a-modal
        v-model="addInterviewVisible"
        :title="$t('interviews.addInterview') || '安排新面试'"
        @ok="handleAddInterview"
        @cancel="addInterviewVisible = false"
        :okText="$t('common.confirm') || '确认'"
        :cancelText="$t('common.cancel') || '取消'"
        width="700px"
      >
        <a-form
          :model="interviewForm"
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 18 }"
        >
          <a-form-item
            :label="$t('interviews.candidate') || '候选人'"
            name="candidateId"
          >
            <a-select
              v-model="interviewForm.candidateId"
              :placeholder="$t('interviews.selectCandidate') || '选择候选人'"
              show-search
              option-filter-prop="children"
            >
              <a-select-option
                v-for="candidate in candidates"
                :key="candidate.id"
                :value="candidate.id"
              >
                {{ candidate.name }} - {{ candidate.title }}
              </a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item
            :label="$t('interviews.position') || '职位'"
            name="positionId"
          >
            <a-select
              v-model="interviewForm.positionId"
              :placeholder="$t('interviews.selectPosition') || '选择职位'"
            >
              <a-select-option
                v-for="position in positions"
                :key="position.id"
                :value="position.id"
              >
                {{ position.title }}
              </a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item
            :label="$t('interviews.interviewers') || '面试官'"
            name="interviewers"
          >
            <a-select
              v-model="interviewForm.interviewers"
              mode="multiple"
              :placeholder="$t('interviews.selectInterviewers') || '选择面试官'"
            >
              <a-select-option
                v-for="interviewer in interviewers"
                :key="interviewer.id"
                :value="interviewer.id"
              >
                {{ interviewer.name }} - {{ interviewer.department }}
              </a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item
            :label="$t('interviews.dateTime') || '面试时间'"
            name="dateTime"
          >
            <a-date-picker
              v-model="interviewForm.date"
              :placeholder="$t('interviews.selectDate') || '选择日期'"
              style="width: 50%"
            />
            <a-time-picker
              v-model="interviewForm.time"
              :placeholder="$t('interviews.selectTime') || '选择时间'"
              format="HH:mm"
              style="width: 50%"
            />
          </a-form-item>

          <a-form-item
            :label="$t('interviews.duration') || '时长'"
            name="duration"
          >
            <a-input-number
              v-model="interviewForm.duration"
              :min="15"
              :step="15"
              style="width: 100%"
              addon-after="分钟"
            />
          </a-form-item>

          <a-form-item
            :label="$t('interviews.location') || '地点'"
            name="location"
          >
            <a-input
              v-model="interviewForm.location"
              :placeholder="
                $t('interviews.locationPlaceholder') ||
                '输入面试地点或线上会议链接'
              "
            />
          </a-form-item>

          <a-form-item :label="$t('interviews.type') || '类型'" name="type">
            <a-radio-group v-model="interviewForm.type">
              <a-radio value="online">{{
                $t("interviews.typeOnline") || "远程视频面试"
              }}</a-radio>
              <a-radio value="onsite">{{
                $t("interviews.typeOnsite") || "线下面试"
              }}</a-radio>
              <a-radio value="phone">{{
                $t("interviews.typePhone") || "电话面试"
              }}</a-radio>
            </a-radio-group>
          </a-form-item>

          <a-form-item :label="$t('interviews.notes') || '备注'" name="notes">
            <a-textarea
              v-model="interviewForm.notes"
              :placeholder="
                $t('interviews.notesPlaceholder') ||
                '添加关于此次面试的备注信息'
              "
              :rows="4"
            />
          </a-form-item>
        </a-form>
      </a-modal>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import {
  format,
  addMonths,
  subMonths,
  setDate,
  getDay,
  getDaysInMonth,
  startOfMonth,
  endOfMonth,
  addDays,
  isSameMonth,
  isToday,
  isWeekend,
  parseISO,
  eachDayOfInterval,
} from "date-fns";
import {
  PlusOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  LeftOutlined,
  RightOutlined,
  FilterOutlined,
  EyeOutlined,
  CloseOutlined,
  MoreOutlined,
  BulbOutlined,
  DownloadOutlined,
  PlusCircleOutlined,
  VideoCameraOutlined,
  BankOutlined,
  PhoneOutlined,
  FileTextOutlined,
} from "@ant-design/icons-vue";

const { t } = useI18n();

// 状态管理
const loading = ref(false);
const activeView = ref("calendar");
const addInterviewVisible = ref(false);
const currentMonth = ref(new Date());
const calendarFilter = ref("all");

// 统计数据
const stats = reactive({
  today: {
    total: 5,
    completed: 3,
    upcoming: 2,
  },
  week: {
    total: 18,
    completed: 8,
    upcoming: 10,
  },
  passRate: {
    value: 68,
    trend: 5,
  },
  avgDuration: {
    value: 45,
    trend: -3,
  },
});

// 日历相关计算属性
const weekDays = computed(() => [
  "周一",
  "周二",
  "周三",
  "周四",
  "周五",
  "周六",
  "周日",
]);

const currentMonthDisplay = computed(() => {
  return format(currentMonth.value, "yyyy年M月");
});

const calendarDays = computed(() => {
  // 获取当前月的第一天
  const firstDayOfMonth = startOfMonth(currentMonth.value);
  // 获取当前月的最后一天
  const lastDayOfMonth = endOfMonth(currentMonth.value);
  // 获取当前月的天数
  const daysInMonth = getDaysInMonth(currentMonth.value);

  // 确定日历起始日期（从第一天所在的周的周一开始）
  let startDate = firstDayOfMonth;
  const dayOfWeek = getDay(firstDayOfMonth);
  // 如果不是周一（在JS中，0是周日），则调整到前一个周一
  if (dayOfWeek !== 1) {
    startDate = addDays(firstDayOfMonth, dayOfWeek === 0 ? -6 : 1 - dayOfWeek);
  }

  // 生成日历天数数组（6周，共42天）
  const days = [];
  for (let i = 0; i < 42; i++) {
    const currentDate = addDays(startDate, i);
    const isCurrentMonth = isSameMonth(currentDate, currentMonth.value);

    // 获取当天的事件（这里是模拟数据）
    let events = [];
    if (isCurrentMonth) {
      // 模拟一些事件数据
      if (Math.random() > 0.7) {
        const eventTypes = ["frontend", "backend", "product", "design"];
        const eventCount = Math.floor(Math.random() * 3) + 1;

        for (let j = 0; j < eventCount; j++) {
          const hour = Math.floor(Math.random() * 8) + 9;
          const type =
            eventTypes[Math.floor(Math.random() * eventTypes.length)];

          events.push({
            id: `event-${i}-${j}`,
            time: `${hour}:00`,
            title: `${
              type === "frontend"
                ? "张三"
                : type === "backend"
                ? "李四"
                : type === "product"
                ? "王五"
                : "赵六"
            }`,
            description: `${
              type === "frontend"
                ? "前端开发"
                : type === "backend"
                ? "后端开发"
                : type === "product"
                ? "产品经理"
                : "UI设计师"
            } (${Math.random() > 0.5 ? "初面" : "复试"})`,
            type,
          });
        }
      }
    }

    // 如果事件超过3个，显示+更多
    let moreEvents = 0;
    if (events.length > 3) {
      moreEvents = events.length - 2;
      events = events.slice(0, 2);
    }

    days.push({
      date: format(currentDate, "d"),
      fullDate: currentDate,
      isPrevMonth: !isCurrentMonth && currentDate < firstDayOfMonth,
      isNextMonth: !isCurrentMonth && currentDate > lastDayOfMonth,
      isToday: isToday(currentDate),
      isWeekend: isWeekend(currentDate),
      events,
      moreEvents,
    });
  }

  return days;
});

// 今日面试列表
const todayInterviews = ref([
  {
    id: 1,
    candidateName: "刘洋",
    position: "前端开发工程师",
    round: "复试",
    timeDisplay: "11:00 - 11:45",
    status: "upcoming",
    mode: "online",
    location: "远程视频面试",
    candidateAvatar: "",
  },
  {
    id: 2,
    candidateName: "陈静",
    position: "数据分析师",
    round: "初面",
    timeDisplay: "14:00 - 15:00",
    status: "upcoming",
    mode: "onsite",
    location: "线下面试 - 会议室A",
    candidateAvatar: "",
  },
  {
    id: 3,
    candidateName: "林晓",
    position: "UX设计师",
    round: "初面",
    timeDisplay: "待安排时间",
    status: "pending",
    mode: "online",
    location: "需确认面试官",
    needsAttention: true,
    candidateAvatar: "",
  },
]);

// 表格列定义
const listColumns = computed(() => [
  {
    title: t("interviews.candidateName") || "候选人",
    dataIndex: "candidateName",
    key: "candidateName",
    sorter: true,
  },
  {
    title: t("interviews.position") || "职位",
    dataIndex: "position",
    key: "position",
  },
  {
    title: t("interviews.interviewTime") || "面试时间",
    dataIndex: "timeDisplay",
    key: "timeDisplay",
    sorter: true,
  },
  {
    title: t("interviews.type") || "类型",
    dataIndex: "mode",
    key: "mode",
  },
  {
    title: t("interviews.status") || "状态",
    dataIndex: "status",
    key: "status",
  },
  {
    title: t("common.actions") || "操作",
    key: "action",
  },
]);

// 表格分页
const tablePagination = reactive({
  current: 1,
  pageSize: 10,
  total: 30,
  showSizeChanger: true,
  showTotal: (total) =>
    `${t("common.total") || "共"} ${total} ${t("common.items") || "条"}`,
});

// 表格数据
const interviewList = ref([
  // 表格数据将使用todayInterviews的数据和其他生成的数据
]);

// AI推荐面试问题
const aiInsight = computed(() => {
  return (
    t("interviews.aiInsightText") ||
    "基于刘洋的简历分析，该候选人在React和微前端方面经验丰富，但在性能优化方面可能存在经验不足。建议面试时深入探讨其在大型项目中的性能优化经验。"
  );
});

const selectedPosition = ref("前端开发工程师");
const selectedCandidate = ref("刘洋");
const selectedTime = ref("11:00");

const recommendedQuestions = ref([
  {
    text: "请详细描述一下你在腾讯实现的微前端架构，包括遇到的挑战和解决方案。",
    category: "架构设计",
    target: "微前端经验",
  },
  {
    text: "在企业级中台系统项目中，你是如何优化大数据表格渲染性能的？",
    category: "性能优化",
    target: "大数据渲染经验",
  },
  {
    text: "你如何平衡技术债务和新功能开发的关系？请举例说明。",
    category: "项目管理",
    target: "工程经验",
  },
]);

// 候选人数据
const candidates = ref([
  { id: 1, name: "张三", title: "前端开发工程师" },
  { id: 2, name: "李四", title: "产品经理" },
  { id: 3, name: "王五", title: "UI设计师" },
  { id: 4, name: "赵六", title: "后端开发工程师" },
  { id: 5, name: "钱七", title: "数据分析师" },
]);

// 职位数据
const positions = ref([
  { id: 1, title: "高级前端开发工程师" },
  { id: 2, title: "资深产品经理" },
  { id: 3, title: "用户体验设计师" },
  { id: 4, title: "高级后端工程师" },
  { id: 5, title: "数据分析师" },
]);

// 面试官数据
const interviewers = ref([
  { id: 1, name: "赵总监", department: "技术部" },
  { id: 2, name: "钱经理", department: "产品部" },
  { id: 3, name: "孙主管", department: "设计部" },
  { id: 4, name: "李总监", department: "数据部" },
]);

// 表单数据
const interviewForm = reactive({
  candidateId: undefined,
  positionId: undefined,
  interviewers: [],
  date: null,
  time: null,
  duration: 60,
  location: "",
  type: "online",
  notes: "",
});

// 方法
function showAddInterviewModal() {
  // 重置表单
  Object.keys(interviewForm).forEach((key) => {
    if (Array.isArray(interviewForm[key])) {
      interviewForm[key] = [];
    } else if (typeof interviewForm[key] === "boolean") {
      interviewForm[key] = false;
    } else {
      interviewForm[key] = undefined;
    }
  });
  interviewForm.duration = 60;
  interviewForm.type = "online";

  addInterviewVisible.value = true;
}

function handleAddInterview() {
  // 这里应该是API调用，现在先模拟成功
  interviewForm.candidateId = undefined;
  interviewForm.positionId = undefined;
  addInterviewVisible.value = false;
}

function prevMonth() {
  currentMonth.value = subMonths(currentMonth.value, 1);
}

function nextMonth() {
  currentMonth.value = addMonths(currentMonth.value, 1);
}

function goToToday() {
  currentMonth.value = new Date();
}

function showEventDetails(event) {
  console.log("显示事件详情", event);
  // TODO: 实现显示事件详情的逻辑
}

function showMoreEvents(day) {
  console.log("显示更多事件", day);
  // TODO: 实现显示更多事件的逻辑
}

function handleTableChange(pagination, filters, sorter) {
  console.log("表格变化", pagination, filters, sorter);
  tablePagination.current = pagination.current;
  tablePagination.pageSize = pagination.pageSize;
  // TODO: 更新表格数据
}

// 生命周期钩子
onMounted(() => {
  // 初始化数据
  interviewList.value = [
    ...todayInterviews.value,
    // 添加更多模拟数据
    {
      id: 4,
      candidateName: "王星",
      position: "后端开发工程师",
      round: "初面",
      timeDisplay: "明天 10:00 - 11:00",
      status: "scheduled",
      mode: "online",
      location: "腾讯会议",
      candidateAvatar: "",
    },
    {
      id: 5,
      candidateName: "李小明",
      position: "产品经理",
      round: "终面",
      timeDisplay: "后天 14:30 - 16:00",
      status: "scheduled",
      mode: "onsite",
      location: "总部大楼 - 会议室B",
      candidateAvatar: "",
    },
  ];
});
</script>

<style lang="scss" scoped>
.interview-schedule {
  min-height: 100%;

  .content-wrapper {
    padding: 24px;
    background-color: var(--bg-color, #f0f2f5);
  }

  // 页面标题
  .page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;

    @media (max-width: 768px) {
      flex-direction: column;
      align-items: flex-start;

      .actions {
        margin-top: 16px;
      }
    }

    .title-section {
      h1 {
        font-size: 24px;
        margin-bottom: 8px;
        font-weight: 600;
      }

      p {
        font-size: 14px;
        color: rgba(0, 0, 0, 0.45);
      }
    }
  }

  // 统计卡片
  .stats-cards {
    margin-bottom: 24px;

    .stat-card {
      transition: all 0.3s ease;
      height: 100%;

      &:hover {
        transform: translateY(-3px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      }

      .stat-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 12px;

        h3 {
          font-size: 16px;
          margin: 0;
          color: rgba(0, 0, 0, 0.65);
        }

        .stat-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;

          &.blue {
            background-color: #e6f7ff;
            color: #1890ff;
          }

          &.purple {
            background-color: #f9f0ff;
            color: #722ed1;
          }

          &.green {
            background-color: #f6ffed;
            color: #52c41a;
          }

          &.yellow {
            background-color: #fffbe6;
            color: #faad14;
          }
        }
      }

      .stat-content {
        .stat-value {
          font-size: 28px;
          font-weight: 600;
          line-height: 1.2;
          color: rgba(0, 0, 0, 0.85);
          margin-bottom: 4px;

          .stat-unit {
            font-size: 16px;
            margin-left: 4px;
            font-weight: normal;
          }
        }

        .stat-details,
        .stat-trend {
          display: flex;
          justify-content: space-between;
          font-size: 13px;
          color: rgba(0, 0, 0, 0.45);
        }

        .trend-up {
          color: #52c41a;
        }

        .trend-down {
          color: #f5222d;
        }
      }
    }
  }

  // 视图选项卡
  .view-tabs {
    margin-bottom: 24px;

    .calendar-toolbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;

      @media (max-width: 576px) {
        flex-direction: column;
        align-items: flex-start;

        .calendar-filters {
          margin-top: 12px;
        }
      }

      .calendar-nav {
        display: flex;
        align-items: center;
        gap: 8px;

        .current-month {
          font-size: 15px;
          font-weight: 500;
          margin: 0 12px;
          min-width: 100px;
          text-align: center;
        }
      }

      .calendar-filters {
        display: flex;
        align-items: center;
        gap: 8px;
      }
    }

    // 日历视图
    .calendar-container {
      border: 1px solid #f0f0f0;
      border-radius: 2px;

      .calendar-header {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        background-color: #fafafa;
        border-bottom: 1px solid #f0f0f0;

        .calendar-header-cell {
          padding: 12px;
          text-align: center;
          font-weight: 500;
          color: rgba(0, 0, 0, 0.65);
          font-size: 14px;
        }
      }

      .calendar-body {
        display: grid;
        grid-template-columns: repeat(7, 1fr);

        .calendar-day {
          min-height: 120px;
          border-right: 1px solid #f0f0f0;
          border-bottom: 1px solid #f0f0f0;
          padding: 8px;
          position: relative;

          &:nth-child(7n) {
            border-right: none;
          }

          &.prev-month,
          &.next-month {
            background-color: #fafafa;

            .day-number {
              color: rgba(0, 0, 0, 0.25);
            }
          }

          &.current-day {
            background-color: #e6f7ff;

            .day-number {
              color: #1890ff;
              font-weight: 600;
            }
          }

          &.weekend {
            .day-number {
              color: #ff4d4f;
            }
          }

          .day-number {
            font-size: 14px;
            margin-bottom: 8px;
            font-weight: 500;
          }

          .day-events {
            display: flex;
            flex-direction: column;
            gap: 4px;

            .calendar-event {
              padding: 4px 8px;
              border-radius: 4px;
              font-size: 12px;
              cursor: pointer;
              transition: all 0.2s;

              &:hover {
                transform: translateY(-2px);
                box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
              }

              &.frontend {
                background-color: #e6f7ff;
                color: #1890ff;
              }

              &.backend {
                background-color: #f6ffed;
                color: #52c41a;
              }

              &.product {
                background-color: #fff7e6;
                color: #fa8c16;
              }

              &.design {
                background-color: #f9f0ff;
                color: #722ed1;
              }

              .event-time {
                font-weight: 600;
              }

              .event-title {
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }

              .event-description {
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }
            }

            .more-events {
              font-size: 12px;
              color: #1890ff;
              cursor: pointer;
              margin-top: 4px;
              text-align: center;

              &:hover {
                color: #40a9ff;
                text-decoration: underline;
              }
            }
          }
        }
      }
    }
  }

  // 面试卡片
  .section-heading {
    margin: 32px 0 16px;

    h2 {
      font-size: 20px;
      font-weight: 600;
      margin: 0;
    }
  }

  .interview-cards {
    margin-bottom: 24px;

    .interview-card {
      position: relative;
      transition: all 0.3s ease;
      margin-bottom: 24px;

      &:hover {
        transform: translateY(-3px);
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
      }

      &.warning {
        border-left: 3px solid #faad14;
      }

      .card-time-badge {
        display: inline-block;
        padding: 4px 8px;
        border-radius: 12px;
        font-size: 12px;
        font-weight: 500;
        margin-bottom: 12px;

        &.upcoming {
          background-color: #fff1f0;
          color: #f5222d;
        }

        &.scheduled {
          background-color: #e6f7ff;
          color: #1890ff;
        }

        &.pending {
          background-color: #fff7e6;
          color: #faad14;
        }
      }

      .card-content {
        .candidate-info {
          display: flex;
          align-items: flex-start;
          margin-bottom: 16px;

          .info {
            margin-left: 12px;

            h3 {
              font-size: 16px;
              margin: 0 0 4px;
              font-weight: 500;
            }

            p {
              font-size: 14px;
              color: rgba(0, 0, 0, 0.65);
              margin: 0 0 6px;
            }

            .interview-mode {
              font-size: 13px;
              color: rgba(0, 0, 0, 0.45);
              display: flex;
              align-items: center;
              gap: 6px;
            }
          }
        }

        .card-actions {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
        }
      }

      .card-more-actions {
        position: absolute;
        top: 16px;
        right: 16px;
        color: rgba(0, 0, 0, 0.45);
        cursor: pointer;

        &:hover {
          color: rgba(0, 0, 0, 0.65);
        }
      }
    }
  }

  // AI推荐问题
  .ai-questions {
    margin-bottom: 24px;

    .ai-insight {
      display: flex;
      background-color: #f0f5ff;
      padding: 16px;
      border-radius: 8px;
      margin-bottom: 24px;

      .insight-icon {
        width: 40px;
        height: 40px;
        background-color: #d6e4ff;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        color: #2f54eb;
        margin-right: 16px;
        flex-shrink: 0;
      }

      .insight-content {
        h3 {
          font-size: 16px;
          font-weight: 500;
          margin: 0 0 8px;
          color: #2f54eb;
        }

        p {
          font-size: 14px;
          color: rgba(0, 0, 0, 0.65);
          margin: 0;
          line-height: 1.6;
        }
      }
    }

    .question-list {
      margin-bottom: 16px;

      .question-list-header {
        display: flex;
        justify-content: space-between;
        align-items: center;

        h3 {
          font-size: 16px;
          margin: 0;
          font-weight: 500;
        }

        span {
          font-size: 14px;
          color: #1890ff;
        }
      }

      .question-items {
        padding: 8px 0;

        .question-item {
          display: flex;
          margin-bottom: 16px;

          &:last-child {
            margin-bottom: 0;
          }

          .question-number {
            width: 24px;
            height: 24px;
            background-color: #f0f5ff;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            font-weight: 600;
            color: #2f54eb;
            margin-right: 12px;
            flex-shrink: 0;
          }

          .question-content {
            p {
              font-size: 14px;
              margin: 0 0 8px;
              line-height: 1.5;
            }

            .question-tags {
              display: flex;
              align-items: center;
              gap: 8px;

              .question-target {
                font-size: 12px;
                color: rgba(0, 0, 0, 0.45);
              }
            }
          }
        }
      }

      .question-actions {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .generation-info {
          font-size: 12px;
          color: rgba(0, 0, 0, 0.45);
        }
      }
    }

    .more-questions {
      text-align: center;
      margin-top: 16px;
    }
  }

  // 黑暗模式
  :deep(.dark) & {
    .title-section p {
      color: rgba(255, 255, 255, 0.45);
    }

    .stat-card .stat-header h3 {
      color: rgba(255, 255, 255, 0.65);
    }

    .stat-card .stat-content .stat-value {
      color: rgba(255, 255, 255, 0.85);
    }

    .stat-card .stat-content .stat-details,
    .stat-card .stat-content .stat-trend {
      color: rgba(255, 255, 255, 0.45);
    }

    .calendar-container .calendar-header .calendar-header-cell {
      color: rgba(255, 255, 255, 0.65);
    }

    .interview-card .card-content .candidate-info .info p {
      color: rgba(255, 255, 255, 0.65);
    }

    .interview-card .card-content .candidate-info .info .interview-mode {
      color: rgba(255, 255, 255, 0.45);
    }

    .interview-card .card-more-actions {
      color: rgba(255, 255, 255, 0.45);

      &:hover {
        color: rgba(255, 255, 255, 0.65);
      }
    }

    .ai-insight .insight-content p {
      color: rgba(255, 255, 255, 0.65);
    }

    .question-items .question-item .question-content p {
      color: rgba(255, 255, 255, 0.85);
    }

    .question-items
      .question-item
      .question-content
      .question-tags
      .question-target {
      color: rgba(255, 255, 255, 0.45);
    }

    .question-actions .generation-info {
      color: rgba(255, 255, 255, 0.45);
    }
  }
}
</style>
