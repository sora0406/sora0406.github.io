/**
 * 數據要求管理模組 - 模擬資料
 * 
 * 本文件包含數據要求管理模組的模擬資料，用於開發和測試。
 */

// 數據要求表單範本
export const requestTemplates = [
  {
    id: "temp-001",
    name: "年度碳排放數據收集",
    description: "收集供應商的年度碳排放數據，包括範疇1、二、三的排放量",
    category: "環境",
    fields: [
      { id: "f1", name: "範疇1排放量", type: "number", unit: "噸CO2當量", required: true },
      { id: "f2", name: "範疇2排放量", type: "number", unit: "噸CO2當量", required: true },
      { id: "f3", name: "範疇3排放量", type: "number", unit: "噸CO2當量", required: false },
      { id: "f4", name: "減碳目標", type: "text", required: false },
      { id: "f5", name: "報告文件", type: "file", accept: ".pdf,.doc,.docx", required: true },
      { id: "f6", name: "驗證文件", type: "file", accept: ".pdf", required: false },
      { id: "f7", name: "備註說明", type: "textarea", required: false }
    ],
    createdAt: "2023-01-10",
    createdBy: "admin"
  },
  {
    id: "temp-002",
    name: "供應商合規聲明",
    description: "收集供應商的合規聲明和相關證明文件",
    category: "合規",
    fields: [
      { id: "f1", name: "公司合規政策", type: "file", accept: ".pdf", required: true },
      { id: "f2", name: "合規聲明確認", type: "checkbox", required: true },
      { id: "f3", name: "最近一次合規審核日期", type: "date", required: true },
      { id: "f4", name: "是否有未解決的合規問題", type: "radio", options: ["是", "否"], required: true },
      { id: "f5", name: "問題說明", type: "textarea", required: false, conditional: { field: "f4", value: "是" } },
      { id: "f6", name: "合規負責人", type: "text", required: true },
      { id: "f7", name: "合規負責人聯絡方式", type: "email", required: true }
    ],
    createdAt: "2023-02-05",
    createdBy: "compliance_manager"
  },
  {
    id: "temp-003",
    name: "物料成分聲明",
    description: "收集產品物料的詳細成分資訊",
    category: "產品",
    fields: [
      { id: "f1", name: "產品名稱", type: "text", required: true },
      { id: "f2", name: "產品型號", type: "text", required: true },
      { id: "f3", name: "物料清單", type: "file", accept: ".xlsx,.csv", required: true },
      { id: "f4", name: "是否含有受限物質", type: "radio", options: ["是", "否"], required: true },
      { id: "f5", name: "受限物質清單", type: "file", required: false, conditional: { field: "f4", value: "是" } },
      { id: "f6", name: "RoHS合規", type: "checkbox", required: true },
      { id: "f7", name: "REACH合規", type: "checkbox", required: true },
      { id: "f8", name: "其他認證", type: "text", required: false },
      { id: "f9", name: "備註", type: "textarea", required: false }
    ],
    createdAt: "2023-03-15",
    createdBy: "product_manager"
  }
];

// 進行中的數據要求
export const activeRequests = [
  {
    id: "req-001",
    templateId: "temp-001",
    name: "2023年度碳排放數據收集",
    description: "2023年度的碳排放數據，需包含範疇1、二的排放量，以及相關報告文件。",
    status: "進行中",
    priority: "高",
    createdAt: "2023-04-01",
    createdBy: "wang_manager",
    dueDate: "2023-06-15",
    targetSuppliers: [
      { id: "sup-001", name: "台積電股份有限公司", status: "已提交", submittedAt: "2023-04-20" },
      { id: "sup-002", name: "廣達電腦股份有限公司", status: "進行中", viewedAt: "2023-04-10" },
      { id: "sup-003", name: "友達光電股份有限公司", status: "未開始" },
      { id: "sup-004", name: "鴻海精密工業股份有限公司", status: "已提交", submittedAt: "2023-04-25" },
      { id: "sup-005", name: "仁寶電腦工業股份有限公司", status: "逾期", viewedAt: "2023-04-05" }
    ],
    responseRate: 40,
    reminderSent: true,
    lastReminderDate: "2023-05-01"
  },
  {
    id: "req-002",
    templateId: "temp-002",
    name: "2023年供應商合規聲明更新",
    description: "貴公司的合規聲明及相關文件，確保符合最新的法規要求。",
    status: "進行中",
    priority: "中",
    createdAt: "2023-04-10",
    createdBy: "li_compliance",
    dueDate: "2023-05-20",
    targetSuppliers: [
      { id: "sup-001", name: "台積電股份有限公司", status: "已提交", submittedAt: "2023-04-25" },
      { id: "sup-002", name: "廣達電腦股份有限公司", status: "未開始" },
      { id: "sup-006", name: "和碩聯合科技股份有限公司", status: "進行中", viewedAt: "2023-04-15" },
      { id: "sup-007", name: "日月光半導體製造股份有限公司", status: "已提交", submittedAt: "2023-04-30" }
    ],
    responseRate: 50,
    reminderSent: true,
    lastReminderDate: "2023-05-05"
  },
  {
    id: "req-003",
    templateId: "temp-003",
    name: "新產品物料成分聲明",
    description: "針對即將量產的新產品線，請提供所有相關物料的詳細成分聲明。",
    status: "進行中",
    priority: "高",
    createdAt: "2023-05-01",
    createdBy: "chen_product",
    dueDate: "2023-06-30",
    targetSuppliers: [
      { id: "sup-004", name: "鴻海精密工業股份有限公司", status: "進行中", viewedAt: "2023-05-05" },
      { id: "sup-008", name: "緯創資通股份有限公司", status: "未開始" },
      { id: "sup-009", name: "光寶科技股份有限公司", status: "已提交", submittedAt: "2023-05-10" },
      { id: "sup-010", name: "英業達股份有限公司", status: "未開始" },
      { id: "sup-011", name: "技嘉科技股份有限公司", status: "進行中", viewedAt: "2023-05-03" }
    ],
    responseRate: 20,
    reminderSent: false,
    lastReminderDate: null
  }
];

// 已完成的數據要求
export const completedRequests = [
  {
    id: "req-004",
    templateId: "temp-001",
    name: "2022年度碳排放數據收集",
    description: "收集2022年度碳排放數據，用於年度ESG報告。",
    status: "已完成",
    priority: "高",
    createdAt: "2022-05-01",
    createdBy: "wang_manager",
    dueDate: "2022-06-30",
    completedDate: "2022-07-05",
    targetSuppliers: [
      { id: "sup-001", name: "台積電股份有限公司", status: "已提交", submittedAt: "2022-05-20" },
      { id: "sup-002", name: "廣達電腦股份有限公司", status: "已提交", submittedAt: "2022-06-15" },
      { id: "sup-003", name: "友達光電股份有限公司", status: "已提交", submittedAt: "2022-06-25" },
      { id: "sup-004", name: "鴻海精密工業股份有限公司", status: "已提交", submittedAt: "2022-06-28" },
      { id: "sup-005", name: "仁寶電腦工業股份有限公司", status: "未提交" }
    ],
    responseRate: 80,
    report: {
      averageResponseTime: 25, // 平均回應天數
      dataQualityScore: 85, // 數據質量評分
      completionRate: 80, // 完成率
      onTimeRate: 75 // 準時率
    }
  },
  {
    id: "req-005",
    templateId: "temp-002",
    name: "2022年供應商合規聲明",
    description: "年度供應商合規聲明收集。",
    status: "已完成",
    priority: "中",
    createdAt: "2022-03-10",
    createdBy: "li_compliance",
    dueDate: "2022-04-30",
    completedDate: "2022-05-10",
    targetSuppliers: [
      { id: "sup-001", name: "台積電股份有限公司", status: "已提交", submittedAt: "2022-03-25" },
      { id: "sup-002", name: "廣達電腦股份有限公司", status: "已提交", submittedAt: "2022-04-20" },
      { id: "sup-006", name: "和碩聯合科技股份有限公司", status: "已提交", submittedAt: "2022-04-15" },
      { id: "sup-007", name: "日月光半導體製造股份有限公司", status: "已提交", submittedAt: "2022-04-28" }
    ],
    responseRate: 100,
    report: {
      averageResponseTime: 20,
      dataQualityScore: 90,
      completionRate: 100,
      onTimeRate: 100
    }
  }
];

// 數據要求對應的通知記錄
export const notificationRecords = [
  {
    id: "notif-001",
    requestId: "req-001",
    type: "initial", // 初始通知
    recipientId: "sup-001",
    recipientName: "台積電股份有限公司",
    subject: "【重要】請提供供應鏈數據資料 - 2023年度碳排放數據收集",
    sentAt: "2023-04-01 10:30",
    status: "已送達",
    openedAt: "2023-04-01 14:15"
  },
  {
    id: "notif-002",
    requestId: "req-001",
    type: "reminder", // 提醒通知
    recipientId: "sup-002",
    recipientName: "廣達電腦股份有限公司",
    subject: "【提醒】資料提交截止日期即將到期 - 2023年度碳排放數據收集",
    sentAt: "2023-05-01 09:00",
    status: "已送達",
    openedAt: "2023-05-01 11:30"
  },
  {
    id: "notif-003",
    requestId: "req-001",
    type: "submission", // 提交確認
    recipientId: "sup-001",
    recipientName: "台積電股份有限公司",
    subject: "【確認】您已成功提交資料 - 2023年度碳排放數據收集",
    sentAt: "2023-04-20 16:45",
    status: "已送達",
    openedAt: "2023-04-20 17:10"
  },
  {
    id: "notif-004",
    requestId: "req-001",
    type: "pgmNotification", // PGM通知
    recipientId: "wang_manager",
    recipientName: "王經理",
    subject: "【通知】供應商已提交資料 - 台積電股份有限公司 - 2023年度碳排放數據收集",
    sentAt: "2023-04-20 16:45",
    status: "已送達",
    openedAt: "2023-04-21 09:05"
  },
  {
    id: "notif-005",
    requestId: "req-001",
    type: "overdue", // 逾期通知
    recipientId: "sup-005",
    recipientName: "仁寶電腦工業股份有限公司",
    subject: "【緊急】資料提交已逾期 - 2023年度碳排放數據收集",
    sentAt: "2023-05-16 10:00",
    status: "已送達",
    openedAt: null
  }
];

// 供應商提交的資料範例
export const submissionExamples = [
  {
    id: "subm-001",
    requestId: "req-001",
    supplierId: "sup-001",
    supplierName: "台積電股份有限公司",
    submittedAt: "2023-04-20 16:30",
    status: "已提交",
    reviewStatus: "已審核",
    reviewedAt: "2023-04-22 14:30",
    reviewedBy: "wang_manager",
    data: {
      "f1": "2500000", // 範疇1排放量
      "f2": "3100000", // 範疇2排放量
      "f3": "15000000", // 範疇3排放量
      "f4": "2030年減少30%排放量", // 減碳目標
      "f5": [{ name: "TSMC_ESG_Report_2023.pdf", size: "5.2MB", uploadedAt: "2023-04-20 16:25" }], // 報告文件
      "f6": [{ name: "TSMC_Carbon_Verification_2023.pdf", size: "2.1MB", uploadedAt: "2023-04-20 16:28" }], // 驗證文件
      "f7": "本報告已通過ISO 14064-1第三方驗證" // 備註說明
    },
    comments: [
      {
        author: "wang_manager",
        content: "資料完整，感謝提供。請補充說明範疇3的計算方法。",
        timestamp: "2023-04-21 10:15"
      },
      {
        author: "supplier_tsmc",
        content: "範疇3的計算基於供應鏈普查和已驗證的排放系數，詳細方法已補充在報告附錄中。",
        timestamp: "2023-04-21 15:30"
      },
      {
        author: "wang_manager",
        content: "已確認，謝謝。",
        timestamp: "2023-04-22 14:30"
      }
    ]
  },
  {
    id: "subm-002",
    requestId: "req-001",
    supplierId: "sup-004",
    supplierName: "鴻海精密工業股份有限公司",
    submittedAt: "2023-04-25 14:20",
    status: "已提交",
    reviewStatus: "審核中",
    reviewedAt: null,
    reviewedBy: null,
    data: {
      "f1": "1800000", // 範疇1排放量
      "f2": "2500000", // 範疇2排放量
      "f3": "", // 範疇3排放量
      "f4": "2025年實現碳中和", // 減碳目標
      "f5": [{ name: "Foxconn_Carbon_Report_2023.pdf", size: "4.8MB", uploadedAt: "2023-04-25 14:15" }], // 報告文件
      "f6": [], // 驗證文件
      "f7": "範疇3排放量尚在統計中，將於下月提供補充資料" // 備註說明
    },
    comments: [
      {
        author: "assistant_manager",
        content: "請提供範疇1和範疇2的驗證文件。",
        timestamp: "2023-04-26 09:45"
      }
    ]
  }
];

// 數據要求統計數據
export const statisticsData = {
  // 請求完成率統計
  completionRates: [
    { month: "2023-01", rate: 85 },
    { month: "2023-02", rate: 80 },
    { month: "2023-03", rate: 90 },
    { month: "2023-04", rate: 75 },
    { month: "2023-05", rate: 82 }
  ],
  
  // 供應商回應時間統計
  responseTimeStats: {
    average: 12, // 平均回應天數
    median: 10, // 中位數回應天數
    min: 1, // 最短回應天數
    max: 30, // 最長回應天數
    distribution: [
      { days: "1-5", percentage: 30 },
      { days: "6-10", percentage: 35 },
      { days: "11-15", percentage: 20 },
      { days: "16-20", percentage: 10 },
      { days: "21+", percentage: 5 }
    ]
  },
  
  // 按類別統計的請求數量
  requestsByCategory: [
    { category: "環境", count: 15, completionRate: 80 },
    { category: "合規", count: 12, completionRate: 95 },
    { category: "產品", count: 8, completionRate: 75 },
    { category: "社會責任", count: 5, completionRate: 70 },
    { category: "其他", count: 3, completionRate: 85 }
  ],
  
  // 供應商參與度排名
  supplierEngagementRanking: [
    { id: "sup-001", name: "台積電股份有限公司", responseRate: 100, avgResponseTime: 8 },
    { id: "sup-007", name: "日月光半導體製造股份有限公司", responseRate: 95, avgResponseTime: 7 },
    { id: "sup-004", name: "鴻海精密工業股份有限公司", responseRate: 90, avgResponseTime: 10 },
    { id: "sup-002", name: "廣達電腦股份有限公司", responseRate: 85, avgResponseTime: 12 },
    { id: "sup-009", name: "光寶科技股份有限公司", responseRate: 85, avgResponseTime: 9 }
  ]
}; 