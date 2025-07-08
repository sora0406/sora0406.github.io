export interface Answer {
  [key: string]: string;
}

export interface AnswerCategory {
  [category: string]: Answer;
}

export interface SurveyResponse {
  id: string;
  surveyTitle: string;
  supplierName: string;
  respondentName: string;
  respondentEmail: string;
  completedDate: Date;
  answers: AnswerCategory;
  type: "organization" | "product";
}

export type SurveyDataSource = 'default' | 'tsmc';

// 預設問卷回覆數據（物流業者）
const defaultSurveyData: SurveyResponse[] = [
  {
    id: "1",
    surveyTitle: "2023年度碳排放數據收集",
    supplierName: "新竹物流",
    respondentName: "張小明",
    respondentEmail: "contact@hct.com.tw",
    completedDate: new Date("2023-11-15"),
    type: "organization",
    answers: {
      "基本資訊": {
        "盤查期間": "2023年1月1日 至 2023年12月31日",
        "組織邊界": "營運控制權法",
        "盤查標準": "ISO 14064-1:2018"
      },
      "排放量資料": {
        "總排放量": "35200.000",
        "類別1排放量": "8450.000",
        "類別2排放量": "15600.000",
        "類別3排放量": "11150.000"
      },
      "驗證資訊": {
        "查證": "是",
        "查證證書": "SGS-ISO14064-2023-001"
      }
    }
  },
  {
    id: "2",
    surveyTitle: "產品碳足跡評估",
    supplierName: "新竹物流",
    respondentName: "張小明",
    respondentEmail: "contact@hct.com.tw",
    completedDate: new Date("2023-11-15"),
    type: "product",
    answers: {
      "產品資訊": {
        "產品名稱": "包裹配送服務",
        "功能單位": "每次配送",
        "報導期間": "2023年1月1日 至 2023年12月31日"
      },
      "碳足跡數據": {
        "產品碳足跡": "0.75 kgCO2e/單位"
      },
      "生命週期階段": {
        "原料取得": "0.15 kgCO2e/單位",
        "製造階段": "0.20 kgCO2e/單位",
        "運輸階段": "0.30 kgCO2e/單位",
        "使用階段": "0.10 kgCO2e/單位"
      },
      "驗證資訊": {
        "採用標準": "ISO 14067:2018",
        "查證": "是",
        "查證證書": "SGS-CF-2023-001"
      }
    }
  },
  {
    id: "3",
    surveyTitle: "2023年度碳排放數據收集",
    supplierName: "統一速達",
    respondentName: "李大華",
    respondentEmail: "info@t-cat.com.tw",
    completedDate: new Date("2023-11-20"),
    type: "organization",
    answers: {
      "基本資訊": {
        "盤查期間": "2023年1月1日 至 2023年12月31日",
        "組織邊界": "營運控制權法",
        "盤查標準": "ISO 14064-1:2018"
      },
      "排放量資料": {
        "總排放量": "28500.000",
        "類別1排放量": "6840.000",
        "類別2排放量": "12635.000",
        "類別3排放量": "9025.000"
      },
      "驗證資訊": {
        "查證": "是",
        "查證證書": "BSI-ISO14064-2023-002"
      }
    }
  },
  {
    id: "4",
    surveyTitle: "產品碳足跡評估",
    supplierName: "統一速達",
    respondentName: "李大華",
    respondentEmail: "info@t-cat.com.tw",
    completedDate: new Date("2023-11-20"),
    type: "product",
    answers: {
      "產品資訊": {
        "產品名稱": "快遞配送服務",
        "功能單位": "每次配送",
        "報導期間": "2023年1月1日 至 2023年12月31日"
      },
      "碳足跡數據": {
        "產品碳足跡": "0.68 kgCO2e/單位"
      },
      "生命週期階段": {
        "原料取得": "0.14 kgCO2e/單位",
        "製造階段": "0.18 kgCO2e/單位",
        "運輸階段": "0.28 kgCO2e/單位",
        "使用階段": "0.08 kgCO2e/單位"
      },
      "驗證資訊": {
        "採用標準": "ISO 14067:2018",
        "查證": "是",
        "查證證書": "BSI-CF-2023-002"
      }
    }
  },
  {
    id: "5",
    surveyTitle: "2023年度碳排放數據收集",
    supplierName: "宅配通",
    respondentName: "王美麗",
    respondentEmail: "contact@pelican.com.tw",
    completedDate: new Date("2023-11-10"),
    type: "organization",
    answers: {
      "基本資訊": {
        "盤查期間": "2023年1月1日 至 2023年12月31日",
        "組織邊界": "營運控制權法",
        "盤查標準": "ISO 14064-1:2018"
      },
      "排放量資料": {
        "總排放量": "31800.000",
        "類別1排放量": "7632.000",
        "類別2排放量": "14094.000",
        "類別3排放量": "10074.000"
      },
      "驗證資訊": {
        "查證": "是",
        "查證證書": "TUV-ISO14064-2023-003"
      }
    }
  },
  {
    id: "6",
    surveyTitle: "產品碳足跡評估",
    supplierName: "宅配通",
    respondentName: "王美麗",
    respondentEmail: "contact@pelican.com.tw",
    completedDate: new Date("2023-11-10"),
    type: "product",
    answers: {
      "產品資訊": {
        "產品名稱": "快遞服務",
        "功能單位": "每次配送",
        "報導期間": "2023年1月1日 至 2023年12月31日"
      },
      "碳足跡數據": {
        "產品碳足跡": "0.72 kgCO2e/單位"
      },
      "生命週期階段": {
        "原料取得": "0.14 kgCO2e/單位",
        "製造階段": "0.19 kgCO2e/單位",
        "運輸階段": "0.30 kgCO2e/單位",
        "使用階段": "0.09 kgCO2e/單位"
      },
      "驗證資訊": {
        "採用標準": "ISO 14067:2018",
        "查證": "是",
        "查證證書": "TUV-CF-2023-003"
      }
    }
  },
  {
    id: "7",
    surveyTitle: "2023年度碳排放數據收集",
    supplierName: "長榮國際儲運",
    respondentName: "林志明",
    respondentEmail: "service@evergreen.com.tw",
    completedDate: new Date("2023-11-25"),
    type: "organization",
    answers: {
      "基本資訊": {
        "盤查期間": "2023年1月1日 至 2023年12月31日",
        "組織邊界": "營運控制權法",
        "盤查標準": "ISO 14064-1:2018"
      },
      "排放量資料": {
        "總排放量": "48300.000",
        "類別1排放量": "11592.000",
        "類別2排放量": "21375.000",
        "類別3排放量": "15333.000"
      },
      "驗證資訊": {
        "查證": "是",
        "查證證書": "DNV-ISO14064-2023-004"
      }
    }
  },
  {
    id: "8",
    surveyTitle: "產品碳足跡評估",
    supplierName: "長榮國際儲運",
    respondentName: "林志明",
    respondentEmail: "service@evergreen.com.tw",
    completedDate: new Date("2023-11-25"),
    type: "product",
    answers: {
      "產品資訊": {
        "產品名稱": "國際貨運服務",
        "功能單位": "每TEU",
        "報導期間": "2023年1月1日 至 2023年12月31日"
      },
      "碳足跡數據": {
        "產品碳足跡": "0.85 kgCO2e/單位"
      },
      "生命週期階段": {
        "原料取得": "0.17 kgCO2e/單位",
        "製造階段": "0.22 kgCO2e/單位",
        "運輸階段": "0.34 kgCO2e/單位",
        "使用階段": "0.12 kgCO2e/單位"
      },
      "驗證資訊": {
        "採用標準": "ISO 14067:2018",
        "查證": "是",
        "查證證書": "DNV-CF-2023-004"
      }
    }
  },
  {
    id: "9",
    surveyTitle: "2023年度碳排放數據收集",
    supplierName: "中國貨櫃運輸",
    respondentName: "陳建華",
    respondentEmail: "contact@cct.com.tw",
    completedDate: new Date("2023-12-01"),
    type: "organization",
    answers: {
      "基本資訊": {
        "盤查期間": "2023年1月1日 至 2023年12月31日",
        "組織邊界": "營運控制權法",
        "盤查標準": "ISO 14064-1:2018"
      },
      "排放量資料": {
        "總排放量": "53200.000",
        "類別1排放量": "12768.000",
        "類別2排放量": "23548.000",
        "類別3排放量": "16884.000"
      },
      "驗證資訊": {
        "查證": "是",
        "查證證書": "SGS-ISO14064-2023-005"
      }
    }
  },
  {
    id: "10",
    surveyTitle: "產品碳足跡評估",
    supplierName: "中國貨櫃運輸",
    respondentName: "陳建華",
    respondentEmail: "contact@cct.com.tw",
    completedDate: new Date("2023-12-01"),
    type: "product",
    answers: {
      "產品資訊": {
        "產品名稱": "貨櫃運輸服務",
        "功能單位": "每TEU",
        "報導期間": "2023年1月1日 至 2023年12月31日"
      },
      "碳足跡數據": {
        "產品碳足跡": "0.82 kgCO2e/單位"
      },
      "生命週期階段": {
        "原料取得": "0.16 kgCO2e/單位",
        "製造階段": "0.21 kgCO2e/單位",
        "運輸階段": "0.33 kgCO2e/單位",
        "使用階段": "0.12 kgCO2e/單位"
      },
      "驗證資訊": {
        "採用標準": "ISO 14067:2018",
        "查證": "是",
        "查證證書": "SGS-CF-2023-005"
      }
    }
  }
];

// TSMC 供應商問卷回覆數據（半導體業者）
const tsmcSurveyData: SurveyResponse[] = [
  {
    id: "tsmc-1",
    surveyTitle: "半導體供應鏈碳排放評估",
    supplierName: "應用材料股份有限公司",
    respondentName: "Michael Johnson",
    respondentEmail: "contact@appliedmaterials.com.tw",
    completedDate: new Date("2023-12-01"),
    type: "organization",
    answers: {
      "基本資訊": {
        "盤查期間": "2023年1月1日 至 2023年12月31日",
        "組織邊界": "營運控制權法",
        "盤查標準": "ISO 14064-1:2018"
      },
      "排放量資料": {
        "總排放量": "485000.000",
        "類別1排放量": "145500.000",
        "類別2排放量": "194000.000",
        "類別3排放量": "145500.000"
      },
      "驗證資訊": {
        "查證": "是",
        "查證證書": "BSI-ISO14064-2023-100"
      }
    }
  },
  {
    id: "tsmc-2",
    surveyTitle: "半導體製程碳足跡分析",
    supplierName: "應用材料股份有限公司",
    respondentName: "Michael Johnson",
    respondentEmail: "contact@appliedmaterials.com.tw",
    completedDate: new Date("2023-12-01"),
    type: "product",
    answers: {
      "產品資訊": {
        "產品名稱": "半導體製程設備",
        "功能單位": "每台設備",
        "報導期間": "2023年1月1日 至 2023年12月31日"
      },
      "碳足跡數據": {
        "產品碳足跡": "58.5 kgCO2e/單位"
      },
      "生命週期階段": {
        "原料取得": "17.5 kgCO2e/單位",
        "製造階段": "23.4 kgCO2e/單位",
        "運輸階段": "11.7 kgCO2e/單位",
        "使用階段": "5.9 kgCO2e/單位"
      },
      "驗證資訊": {
        "採用標準": "ISO 14067:2018",
        "查證": "是",
        "查證證書": "BSI-CF-2023-100"
      }
    }
  },
  {
    id: "tsmc-3",
    surveyTitle: "半導體供應鏈碳排放評估",
    supplierName: "台積電設備",
    respondentName: "張志偉",
    respondentEmail: "contact@tsmc-equipment.com",
    completedDate: new Date("2023-12-05"),
    type: "organization",
    answers: {
      "基本資訊": {
        "盤查期間": "2023年1月1日 至 2023年12月31日",
        "組織邊界": "營運控制權法",
        "盤查標準": "ISO 14064-1:2018"
      },
      "排放量資料": {
        "總排放量": "420000.000",
        "類別1排放量": "126000.000",
        "類別2排放量": "168000.000",
        "類別3排放量": "126000.000"
      },
      "驗證資訊": {
        "查證": "是",
        "查證證書": "SGS-ISO14064-2023-101"
      }
    }
  },
  {
    id: "tsmc-4",
    surveyTitle: "半導體製程碳足跡分析",
    supplierName: "台積電設備",
    respondentName: "張志偉",
    respondentEmail: "contact@tsmc-equipment.com",
    completedDate: new Date("2023-12-05"),
    type: "product",
    answers: {
      "產品資訊": {
        "產品名稱": "晶圓製程設備",
        "功能單位": "每台設備",
        "報導期間": "2023年1月1日 至 2023年12月31日"
      },
      "碳足跡數據": {
        "產品碳足跡": "52.3 kgCO2e/單位"
      },
      "生命週期階段": {
        "原料取得": "15.7 kgCO2e/單位",
        "製造階段": "20.9 kgCO2e/單位",
        "運輸階段": "10.5 kgCO2e/單位",
        "使用階段": "5.2 kgCO2e/單位"
      },
      "驗證資訊": {
        "採用標準": "ISO 14067:2018",
        "查證": "是",
        "查證證書": "SGS-CF-2023-101"
      }
    }
  },
  {
    id: "tsmc-5",
    surveyTitle: "半導體供應鏈碳排放評估",
    supplierName: "旭化成株式會社",
    respondentName: "田中太郎",
    respondentEmail: "contact@asahi-kasei.co.jp",
    completedDate: new Date("2023-12-08"),
    type: "organization",
    answers: {
      "基本資訊": {
        "盤查期間": "2023年1月1日 至 2023年12月31日",
        "組織邊界": "營運控制權法",
        "盤查標準": "ISO 14064-1:2018"
      },
      "排放量資料": {
        "總排放量": "235000.000",
        "類別1排放量": "70500.000",
        "類別2排放量": "94000.000",
        "類別3排放量": "70500.000"
      },
      "驗證資訊": {
        "查證": "是",
        "查證證書": "JQA-ISO14064-2023-102"
      }
    }
  },
  {
    id: "tsmc-6",
    surveyTitle: "半導體製程碳足跡分析",
    supplierName: "旭化成株式會社",
    respondentName: "田中太郎",
    respondentEmail: "contact@asahi-kasei.co.jp",
    completedDate: new Date("2023-12-08"),
    type: "product",
    answers: {
      "產品資訊": {
        "產品名稱": "電子材料",
        "功能單位": "每公斤材料",
        "報導期間": "2023年1月1日 至 2023年12月31日"
      },
      "碳足跡數據": {
        "產品碳足跡": "28.7 kgCO2e/單位"
      },
      "生命週期階段": {
        "原料取得": "8.6 kgCO2e/單位",
        "製造階段": "11.5 kgCO2e/單位",
        "運輸階段": "5.7 kgCO2e/單位",
        "使用階段": "2.9 kgCO2e/單位"
      },
      "驗證資訊": {
        "採用標準": "ISO 14067:2018",
        "查證": "是",
        "查證證書": "JQA-CF-2023-102"
      }
    }
  },
  {
    id: "tsmc-7",
    surveyTitle: "半導體供應鏈碳排放評估",
    supplierName: "矽品精密工業",
    respondentName: "林佳蓉",
    respondentEmail: "contact@spil.com.tw",
    completedDate: new Date("2023-12-10"),
    type: "organization",
    answers: {
      "基本資訊": {
        "盤查期間": "2023年1月1日 至 2023年12月31日",
        "組織邊界": "營運控制權法",
        "盤查標準": "ISO 14064-1:2018"
      },
      "排放量資料": {
        "總排放量": "189000.000",
        "類別1排放量": "56700.000",
        "類別2排放量": "75600.000",
        "類別3排放量": "56700.000"
      },
      "驗證資訊": {
        "查證": "是",
        "查證證書": "TUV-ISO14064-2023-103"
      }
    }
  },
  {
    id: "tsmc-8",
    surveyTitle: "半導體製程碳足跡分析",
    supplierName: "矽品精密工業",
    respondentName: "林佳蓉",
    respondentEmail: "contact@spil.com.tw",
    completedDate: new Date("2023-12-10"),
    type: "product",
    answers: {
      "產品資訊": {
        "產品名稱": "IC封裝測試服務",
        "功能單位": "每顆IC",
        "報導期間": "2023年1月1日 至 2023年12月31日"
      },
      "碳足跡數據": {
        "產品碳足跡": "22.8 kgCO2e/單位"
      },
      "生命週期階段": {
        "原料取得": "6.8 kgCO2e/單位",
        "製造階段": "9.1 kgCO2e/單位",
        "運輸階段": "4.6 kgCO2e/單位",
        "使用階段": "2.3 kgCO2e/單位"
      },
      "驗證資訊": {
        "採用標準": "ISO 14067:2018",
        "查證": "是",
        "查證證書": "TUV-CF-2023-103"
      }
    }
  },
  {
    id: "tsmc-9",
    surveyTitle: "半導體供應鏈碳排放評估",
    supplierName: "ASE Group",
    respondentName: "王智明",
    respondentEmail: "contact@asegroup.com",
    completedDate: new Date("2023-12-12"),
    type: "organization",
    answers: {
      "基本資訊": {
        "盤查期間": "2023年1月1日 至 2023年12月31日",
        "組織邊界": "營運控制權法",
        "盤查標準": "ISO 14064-1:2018"
      },
      "排放量資料": {
        "總排放量": "125000.000",
        "類別1排放量": "37500.000",
        "類別2排放量": "50000.000",
        "類別3排放量": "37500.000"
      },
      "驗證資訊": {
        "查證": "是",
        "查證證書": "DNV-ISO14064-2023-104"
      }
    }
  },
  {
    id: "tsmc-10",
    surveyTitle: "半導體製程碳足跡分析",
    supplierName: "ASE Group",
    respondentName: "王智明",
    respondentEmail: "contact@asegroup.com",
    completedDate: new Date("2023-12-12"),
    type: "product",
    answers: {
      "產品資訊": {
        "產品名稱": "系統級封裝服務",
        "功能單位": "每個封裝",
        "報導期間": "2023年1月1日 至 2023年12月31日"
      },
      "碳足跡數據": {
        "產品碳足跡": "15.2 kgCO2e/單位"
      },
      "生命週期階段": {
        "原料取得": "4.6 kgCO2e/單位",
        "製造階段": "6.1 kgCO2e/單位",
        "運輸階段": "3.0 kgCO2e/單位",
        "使用階段": "1.5 kgCO2e/單位"
      },
      "驗證資訊": {
        "採用標準": "ISO 14067:2018",
        "查證": "是",
        "查證證書": "DNV-CF-2023-104"
      }
    }
  },
  {
    id: "tsmc-11",
    surveyTitle: "半導體供應鏈碳排放評估",
    supplierName: "台灣半導體",
    respondentName: "陳美玲",
    respondentEmail: "contact@tsm.com.tw",
    completedDate: new Date("2023-12-15"),
    type: "organization",
    answers: {
      "基本資訊": {
        "盤查期間": "2023年1月1日 至 2023年12月31日",
        "組織邊界": "營運控制權法",
        "盤查標準": "ISO 14064-1:2018"
      },
      "排放量資料": {
        "總排放量": "78000.000",
        "類別1排放量": "23400.000",
        "類別2排放量": "31200.000",
        "類別3排放量": "23400.000"
      },
      "驗證資訊": {
        "查證": "是",
        "查證證書": "BSI-ISO14064-2023-105"
      }
    }
  },
  {
    id: "tsmc-12",
    surveyTitle: "半導體製程碳足跡分析",
    supplierName: "台灣半導體",
    respondentName: "陳美玲",
    respondentEmail: "contact@tsm.com.tw",
    completedDate: new Date("2023-12-15"),
    type: "product",
    answers: {
      "產品資訊": {
        "產品名稱": "晶圓代工服務",
        "功能單位": "每片晶圓",
        "報導期間": "2023年1月1日 至 2023年12月31日"
      },
      "碳足跡數據": {
        "產品碳足跡": "9.8 kgCO2e/單位"
      },
      "生命週期階段": {
        "原料取得": "2.9 kgCO2e/單位",
        "製造階段": "3.9 kgCO2e/單位",
        "運輸階段": "2.0 kgCO2e/單位",
        "使用階段": "1.0 kgCO2e/單位"
      },
      "驗證資訊": {
        "採用標準": "ISO 14067:2018",
        "查證": "是",
        "查證證書": "BSI-CF-2023-105"
      }
    }
  }
];

export function getSurveyData(source: SurveyDataSource): SurveyResponse[] {
  switch (source) {
    case 'tsmc':
      return tsmcSurveyData;
    case 'default':
    default:
      return defaultSurveyData;
  }
}

export function getSurveyDataSourceOptions() {
  return [
    { value: 'default', label: 'Case1' },
    { value: 'tsmc', label: 'Case2' }
  ];
} 