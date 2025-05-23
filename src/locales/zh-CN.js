export default {
  menu: {
    dashboard: "仪表盘",
    resume: "简历管理",
    positions: "职位管理",
    candidates: "候选人",
    interviews: "面试管理",
    matching: "智能匹配",
    talentPool: "人才库",
    analytics: "数据分析",
    settings: "系统设置",
  },
  header: {
    search: "搜索候选人...",
    profile: "个人信息",
    settings: "系统设置",
    logout: "退出登录",
    theme: {
      light: "浅色主题",
      dark: "深色主题",
    },
    language: {
      zh: "中文",
      en: "English",
    },
  },
  matching: {
    title: "智能职位匹配",
    subtitle: '查看"高级前端开发工程师"的智能匹配结果',
    filters: {
      allCandidates: "全部候选人",
      newCandidates: "新候选人",
      interviewed: "已面试",
      allSkills: "所有技能要求",
      technical: "技术能力",
      soft: "软技能",
    },
    actions: {
      advancedFilter: "高级筛选",
      export: "导出结果",
      viewDetails: "查看详情",
      schedule: "安排面试",
    },
    skills: {
      technical: "技术技能",
      experience: "工作经验",
      education: "学历背景",
    },
  },
  resume: {
    title: "简历管理",
    description: "上传、管理和分析您收到的简历",
    upload: {
      title: "上传简历",
      dragText: "拖拽文件到此处或点击上传",
      supportText: "支持 PDF, Word, HTML 格式",
      selectFile: "选择文件",
      batchImportSettings: "批量导入设置",
    },
    stats: {
      title: "简历统计",
      totalResumes: "总简历数",
      thisWeekNew: "本周新增",
      pendingResumes: "待处理简历",
      vsLastMonth: "较上月 {value}",
      vsLastWeek: "较上周 {value}",
      vsYesterday: "较昨天 {value}",
      parseStatus: "最近解析状态",
      parseSuccess: "成功解析: {value}",
      parseNeedsReview: "需要修正: {value}",
      batchAiParse: "批量AI解析",
      detailedReport: "详细分析报告",
    },
    filter: {
      allStatuses: "全部简历",
      processed: "已处理",
      pending: "待处理",
      approved: "已通过",
      rejected: "已拒绝",
      allPositions: "所有职位",
      frontendDev: "前端开发",
      backendDev: "后端开发",
      productManager: "产品经理",
      uiuxDesigner: "UI/UX设计师",
      searchPlaceholder: "搜索简历...",
    },
    columns: {
      candidate: "候选人",
      position: "应聘职位",
      skillMatch: "技能匹配",
      source: "简历来源",
      receiveDate: "接收日期",
      status: "状态",
      actions: "操作",
    },
    actions: {
      addResume: "添加简历",
      advancedFilter: "高级筛选",
      export: "导出",
      view: "查看",
      match: "匹配",
    },
    aiFeedback: {
      title: "AI解析质量反馈",
      aiTip: "AI智能提示",
      tipContent:
        "系统检测到部分技术类简历在解析技能经验年限时出现偏差，建议在系统设置中调整技能提取参数,可提高约15%的解析准确率。",
      accuracyTrend: "解析准确率趋势",
      accuracyChart: "解析准确率趋势图",
      commonIssues: "常见解析问题",
      issue1: "技能经验年限识别偏差 ({percent})",
      issue2: "项目经验时间段解析错误 ({percent})",
      issue3: "教育经历学位识别不准 ({percent})",
      issue4: "工作职责与技能匹配度低 ({percent})",
      optimizeSettings: "优化解析设置",
    },
  },
  dashboard: {
    title: "仪表盘概览",
    welcome: "欢迎回来，{name}！这是您的实时招聘数据概览",
    stats: {
      resumes: {
        title: "简历总数",
        thisWeek: "本周新增",
        trend: "较上月",
      },
      positions: {
        title: "活跃职位",
        thisWeek: "本周新增",
        trend: "较上月",
      },
      interviews: {
        title: "面试安排",
        upcoming: "未来7天",
        trend: "较上月",
      },
      hiringCycle: {
        title: "平均招聘周期",
        target: "目标天数",
        trend: "较上月",
        unit: "天",
      },
    },
    charts: {
      efficiency: {
        title: "招聘效率趋势",
        timeRanges: {
          30: "近30天",
          90: "近90天",
          365: "今年",
        },
      },
      sources: {
        title: "候选人来源分布",
        filters: {
          all: "全部职位",
          tech: "技术类职位",
          marketing: "市场类职位",
        },
      },
    },
    tables: {
      resumeStatus: {
        title: "简历处理状态",
        columns: {
          position: "职位名称",
          received: "收到简历",
          screening: "初筛通过",
          interviewing: "面试中",
          offered: "已录用",
          completion: "完成率",
        },
        viewAll: "查看所有职位",
      },
    },
    activities: {
      title: "最近活动",
      types: {
        newCandidate: "新增候选人",
        interview: "面试安排",
        pass: "面试通过",
        newPosition: "新增职位",
        reject: "候选人拒绝",
      },
      timeAgo: {
        justNow: "刚刚",
        minutesAgo: "{n}分钟前",
        hoursAgo: "{n}小时前",
        yesterday: "昨天",
        daysAgo: "{n}天前",
      },
      viewAll: "查看所有活动",
    },
  },
  positions: {
    title: "职位管理",
    description: "创建、管理和跟踪所有职位",
    createButton: "创建新职位",
    statistics: {
      totalJobs: "总职位数",
      openJobs: "开放职位",
      receivedResumes: "已收到简历",
      completionRate: "完成率",
      target: "目标",
      vsLastMonth: "较上月增加{value}个职位",
    },
    filter: {
      allJobs: "所有职位",
      openJobs: "开放中",
      pausedJobs: "暂停招聘",
      completedJobs: "已完成",
      draft: "草稿",
      allDepartments: "所有部门",
      tech: "技术部",
      product: "产品部",
      design: "设计部",
      marketing: "市场部",
      sales: "销售部",
      searchPlaceholder: "搜索职位...",
    },
    actions: {
      filter: "筛选",
      sort: "排序",
      viewDetails: "查看详情",
    },
    jobCard: {
      department: "{department} · {location}",
      progress: "招聘进度",
      resumes: "收到简历",
      interviewing: "面试中",
      hired: "已录用",
      status: {
        open: "开放中",
        paused: "已暂停",
        reviewing: "审核中",
      },
    },
    pagination: {
      total: "显示 {start} - {end} 条，共 {total} 条",
      prev: "上一页",
      next: "下一页",
    },
    analysis: {
      title: "AI职位分析",
      marketAnalysis: "职位市场分析",
      techJobs: "技术类职位",
      nonTechJobs: "非技术类职位",
      allJobs: "所有职位",
      insight: {
        title: "AI市场洞察",
        content:
          "根据最新市场数据分析，前端开发岗位的需求持续增长，特别是具有React和TypeScript经验的工程师。建议优化高级前端开发工程师岗位的薪资范围，增加竞争力。同时，UX设计师岗位的应聘数量低于行业平均，可考虑扩大招聘渠道。",
      },
      optimization: {
        title: "职位优化建议",
        templates: "职位模板推荐",
        oneClickOptimize: "一键优化所有职位",
        jobs: {
          frontend: {
            title: "高级前端开发工程师",
            status: "good",
            feedback: "职位描述清晰完整，关键词匹配度高，已获得较高曝光率。",
          },
          product: {
            title: "产品经理",
            status: "warning",
            feedback:
              "职位要求过于宽泛，建议明确产品方向与所需技能，增加具体项目经验要求。",
          },
          design: {
            title: "UX设计师",
            status: "bad",
            feedback:
              "职位吸引力不足，建议调整薪资范围，增加成长空间描述，突出公司设计文化。",
          },
        },
        recommendedTemplates: {
          frontend: {
            title: "高转化率前端开发职位模板",
            rate: "+42% 匹配率",
          },
          product: {
            title: "产品经理职位优化模板",
            rate: "+28% 申请率",
          },
        },
      },
    },
  },
  candidates: {
    title: "候选人池",
    subtitle: "管理、筛选和分类所有潜在候选人",
    actions: {
      addCandidate: "添加候选人",
      advancedFilter: "高级筛选",
      sort: "排序",
      view: "查看",
      interview: "面试",
      addToPool: "添加到人才库",
      sendEmail: "发送邮件",
      reject: "淘汰",
    },
    statistics: {
      totalCandidates: "总候选人",
      newThisWeek: "本周新增",
      inInterview: "面试进行中",
      highMatch: "高匹配候选人",
      vsLastMonth: "较上月",
      vsLastWeek: "较上周",
      matchAbove: "匹配度 > 85%",
    },
    filter: {
      allCandidates: "所有候选人",
      interviewing: "正在面试",
      offered: "已收到Offer",
      onboarded: "已入职",
      rejected: "已淘汰",
      pending: "待处理",
      allPositions: "所有职位",
      frontend: "前端开发",
      backend: "后端开发",
      product: "产品经理",
      design: "UI/UX设计师",
      data: "数据分析师",
      searchPlaceholder: "搜索候选人...",
      clearAll: "清除全部筛选",
    },
    batchActions: {
      selected: "已选择 {count} 位候选人",
      addTag: "添加标签",
      scheduleInterview: "安排面试",
      sendEmail: "发送邮件",
      addToTalentPool: "添加到人才库",
      delete: "删除",
    },
    aiRecommendation: {
      title: "AI候选人推荐",
      viewAll: "查看全部推荐",
      insightTitle: "AI智能提示",
      insightContent:
        "根据目前技术部岗位的招聘需求，我们找到了5位高匹配度的潜在候选人，他们在React和TypeScript方面都有丰富经验。建议优先考虑下方的李远，他匹配度最高且拥有微前端架构经验。",
      viewDetails: "查看详情",
      contact: "联系",
    },
  },
  interviews: {
    title: "面试管理",
    subtitle: "管理和安排候选人面试",
    addInterview: "安排新面试",
    todayInterviews: "今日面试",
    weekInterviews: "本周面试",
    completed: "已完成",
    upcoming: "待进行",
    passRate: "面试通过率",
    avgDuration: "平均面试时长",
    minutes: "分钟",
    calendarView: "日历视图",
    listView: "列表视图",
    interviewerView: "面试官视图",
    today: "今天",
    filter: "筛选",
    allPositions: "所有职位",
    frontend: "前端开发",
    backend: "后端开发",
    product: "产品经理",
    design: "UI设计师",
    more: "更多",
    todayUpcoming: "今日待面试",
    resume: "简历",
    schedule: "安排时间",
    reschedule: "重新安排",
    cancel: "取消",
    aiRecommendedQuestions: "AI推荐面试问题",
    aiInsight: "智能提示",
    technicalQuestions: "技术能力评估问题",
    targetingSkill: "针对性",
    generatedFrom: "基于候选人简历和职位要求生成",
    exportQuestions: "导出问题清单",
    viewMoreQuestions: "查看更多候选人问题推荐",
    candidate: "候选人",
    position: "职位",
    interviewers: "面试官",
    dateTime: "面试时间",
    duration: "时长",
    location: "地点",
    type: "类型",
    notes: "备注",
    selectCandidate: "选择候选人",
    selectPosition: "选择职位",
    selectInterviewers: "选择面试官",
    selectDate: "选择日期",
    selectTime: "选择时间",
    locationPlaceholder: "输入面试地点或线上会议链接",
    notesPlaceholder: "添加关于此次面试的备注信息",
    typeOnline: "远程视频面试",
    typeOnsite: "线下面试",
    typePhone: "电话面试",
    candidateName: "候选人",
    interviewTime: "面试时间",
    status: "状态",
  },
  common: {
    total: "共",
    items: "条",
    view: "查看",
    actions: "操作",
    confirm: "确认",
    cancel: "取消",
    comingSoon: "即将上线",
    vsLastMonth: "较上月",
  },
  talentPool: {
    title: "人才库",
    subtitle: "管理和跟踪优质人才资源库",
    createGroup: "创建人才分组",
    stats: {
      totalTalents: "总人才数",
      techTalents: "技术人才",
      activeContacts: "活跃联系",
      intentionTracking: "意向跟踪",
      vsLastMonth: "较上月",
      techTalentPercent: "占总人才{percent}%",
      nextFollow: "下次跟进: {count}位",
    },
    groups: {
      title: "人才分组",
      allTalents: "全部人才库",
      techElite: "技术精英",
      productDesign: "产品设计",
      management: "管理层人才",
      marketing: "营销专家",
      dataScientist: "数据科学家",
      addGroup: "添加分组",
    },
    filter: {
      allTalents: "所有人才",
      recentContact: "近期接触",
      longNoContact: "长期未联系",
      hasIntention: "有意向加入",
      eliminated: "已淘汰",
      allCategories: "所有类别",
      frontend: "前端开发",
      backend: "后端开发",
      productManager: "产品经理",
      designer: "设计师",
      dataAnalyst: "数据分析",
      searchPlaceholder: "搜索人才...",
      filter: "筛选",
      sort: "排序",
    },
    talentCard: {
      workExperience: "工作经验",
      education: "学历",
      currentCompany: "当前公司",
      lastContact: "最后联系",
      recruit: "招聘",
      contact: "联系",
      status: {
        hasIntention: "有意向",
        longTracking: "长期跟踪",
        recentContact: "近期接触",
        longNoContact: "长期未联系",
      },
    },
    pagination: {
      showing: "显示 {start} - {end} 条，共 {total} 条",
      prev: "上一页",
      next: "下一页",
    },
    aiInsights: {
      title: "AI人才洞察",
      viewReport: "查看详细报告",
      aiTip: "AI智能提示",
      tipContent:
        "根据分析，您的人才库中前端开发人才整体跟进频率低于平均水平。建议优先联系未接触超过3个月的高价值人才，尤其是王天明和刘思佳，他们都表示有加入意向。您的技术总监职位即将开放，赵明宇可能是合适人选。",
      distribution: "人才类型分布",
      followUpActivity: "跟进活跃度",
      skillsHeat: "技能热度分析",
      followUpSuggestions: "重点跟进建议",
      distributionChart: "人才类型分布图",
      activityChart: "跟进活跃度图",
      skillsChart: "技能热度分析图",
      table: {
        name: "人才名称",
        currentPosition: "当前职位",
        matchingPosition: "匹配职位",
        matchingDegree: "匹配度",
        suggestion: "跟进建议",
        actions: "操作",
      },
    },
  },
  analytics: {
    title: "数据分析",
    subtitle: "分析和可视化您的招聘数据",
    timeRange: {
      last30Days: "过去30天",
      last90Days: "过去90天",
      last6Months: "过去6个月",
      last12Months: "过去12个月",
      allTime: "全部时间",
    },
    exportReport: "导出报告",
    statistics: {
      resumeVolume: "简历处理量",
      hiringEfficiency: "招聘效率",
      interviewPassRate: "面试通过率",
      offerAcceptRate: "Offer接受率",
      vsLastPeriod: "较上期",
    },
    charts: {
      funnelAnalysis: {
        title: "招聘漏斗分析",
        allPositions: "所有职位",
        techPositions: "技术职位",
        productPositions: "产品职位",
        designPositions: "设计职位",
        receivedResumes: "收到简历",
        screeningPassed: "筛选通过",
        interviewInvited: "面试邀请",
        offerSent: "发放Offer",
        onboarded: "成功入职",
      },
      efficiencyTrend: {
        title: "招聘效率趋势",
        byMonth: "按月查看",
        byQuarter: "按季度查看",
        byYear: "按年查看",
        description:
          "过去6个月内，招聘周期从31天减少到27天，提升了12.9%。主要改进来自简历筛选阶段（减少2天）和面试安排阶段（减少1.5天）。",
      },
      candidateSource: {
        title: "候选人来源分析",
        allCandidates: "所有候选人",
        hiredCandidates: "录用候选人",
        conversionRate: "来源转化率",
        bestSources: "效果最佳来源",
        internalReferral: "内部推荐",
        jobWebsites: "招聘网站",
        headhunters: "猎头推荐",
        companyWebsite: "官网申请",
      },
      skillHeat: {
        title: "技能需求热度分析",
        techDepartment: "技术部",
        productDepartment: "产品部",
        designDepartment: "设计部",
        allDepartments: "所有部门",
        more: "更多",
      },
    },
    departmentComparison: {
      title: "部门招聘效率对比",
      columns: {
        department: "部门",
        positions: "职位数",
        resumes: "简历量",
        interviewRate: "面试邀请率",
        passRate: "面试通过率",
        hiringCycle: "平均招聘周期",
        completion: "完成率",
      },
    },
    aiInsights: {
      title: "AI分析洞察",
      lastUpdate: "最后更新",
      keyFindings: "关键发现",
      keyFindingsContent:
        "技术部的面试通过率（62.3%）低于公司平均水平（68.2%），但招聘需求量最大。建议对面试环节进行优化，特别是技术面试阶段的评估标准和流程。内部推荐是最有效的候选人来源，建议加强内部推荐激励机制。",
      efficiencyOpportunities: {
        title: "效率优化机会",
        item1: "技术部简历筛选阶段可缩短2-3天",
        item2: "优化前端开发面试流程，减少冗余评估环节",
        item3: "加快产品部面试决策时间，平均可节省4天",
      },
      candidateQuality: {
        title: "候选人质量提升",
        item1: "调整职位描述中的技能要求优先级",
        item2: "增加对微前端和TypeScript经验的筛选权重",
        item3: "提高猎头渠道质量控制标准",
      },
      marketTrends: {
        title: "市场趋势预测",
        item1: "React和微前端人才竞争加剧，建议提前储备",
        item2: "数据分析师招聘周期预计将延长15%",
        item3: "产品经理人才市场供应增加，调整薪资策略",
      },
      generateFullReport: "生成完整AI分析报告",
    },
    customReports: {
      title: "定制报告",
      manageReports: "管理保存的报告",
      recruitingManagerWeekly: {
        title: "招聘经理周报",
        description: "包含关键招聘指标、团队效率对比和候选人流量分析",
        schedule: "周度自动生成",
      },
      departmentPerformance: {
        title: "部门绩效对比",
        description: "各部门招聘效率、成本和质量的详细对比分析",
        schedule: "月度自动生成",
      },
      createNewReport: {
        title: "创建新报告",
        description: "根据您的需求定制专属分析报告",
        schedule: "按需创建",
      },
    },
  },
};
