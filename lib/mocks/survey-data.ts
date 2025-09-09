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

export type SurveyDataSource = 'default' | 'tsmc' | 'materials';

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
        "總排放量": "35200.789",
        "類別1排放量": "8450.2345",
        "類別2排放量": "15600.6789",
        "類別3排放量": "11150.3456"
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
        "產品碳足跡": "0.755 kgCO2e/單位"
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
        "總排放量": "28500.789",
        "類別1排放量": "6840.2345",
        "類別2排放量": "12635.6789",
        "類別3排放量": "9025.3456"
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
        "產品碳足跡": "0.685 kgCO2e/單位"
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
        "總排放量": "31800.789",
        "類別1排放量": "7632.2345",
        "類別2排放量": "14094.6789",
        "類別3排放量": "10074.3456"
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
        "產品碳足跡": "0.725 kgCO2e/單位"
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
        "總排放量": "48300.789",
        "類別1排放量": "11592.2345",
        "類別2排放量": "21375.6789",
        "類別3排放量": "15333.3456"
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
        "產品碳足跡": "0.855 kgCO2e/單位"
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
        "總排放量": "53200.789",
        "類別1排放量": "12768.2345",
        "類別2排放量": "23548.6789",
        "類別3排放量": "16884.3456"
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
        "產品碳足跡": "0.825 kgCO2e/單位"
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
        "總排放量": "485000.789",
        "類別1排放量": "145500.2345",
        "類別2排放量": "194000.6789",
        "類別3排放量": "145500.3456"
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
        "產品碳足跡": "58.589 kgCO2e/單位"
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
        "總排放量": "420000.789",
        "類別1排放量": "126000.2345",
        "類別2排放量": "168000.6789",
        "類別3排放量": "126000.3456"
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
        "產品碳足跡": "52.389 kgCO2e/單位"
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
        "總排放量": "235000.789",
        "類別1排放量": "70500.2345",
        "類別2排放量": "94000.6789",
        "類別3排放量": "70500.3456"
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
        "產品碳足跡": "28.789 kgCO2e/單位"
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
        "總排放量": "189000.789",
        "類別1排放量": "56700.2345",
        "類別2排放量": "75600.6789",
        "類別3排放量": "56700.3456"
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
        "產品碳足跡": "22.889 kgCO2e/單位"
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
        "總排放量": "125000.789",
        "類別1排放量": "37500.2345",
        "類別2排放量": "50000.6789",
        "類別3排放量": "37500.3456"
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
        "產品碳足跡": "15.289 kgCO2e/單位"
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
        "總排放量": "78000.789",
        "類別1排放量": "23400.2345",
        "類別2排放量": "31200.6789",
        "類別3排放量": "23400.3456"
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
        "產品碳足跡": "9.889 kgCO2e/單位"
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

// Case 3: 材料製造業供應商問卷回覆數據
const materialsSurveyData: SurveyResponse[] = [
  {
    id: "materials-1",
    surveyTitle: "2023年度材料製造業碳排放評估",
    supplierName: "Formo Steel Materials Co.",
    respondentName: "林建志",
    respondentEmail: "contact@formosteel.com",
    completedDate: new Date("2023-11-20"),
    type: "organization",
    answers: {
      "基本資訊": {
        "盤查期間": "2023年1月1日 至 2023年12月31日",
        "組織邊界": "營運控制權法",
        "盤查標準": "ISO 14064-1:2018"
      },
      "排放量資料": {
        "總排放量": "892156.789",
        "類別1排放量": "534287.3456",
        "類別2排放量": "267634.2145",
        "類別3排放量": "90235.2289"
      },
      "驗證資訊": {
        "查證": "是",
        "查證證書": "SGS-ISO14064-2023-200"
      }
    }
  },
  {
    id: "materials-2",
    surveyTitle: "材料製造產品碳足跡評估",
    supplierName: "Formo Steel Materials Co.",
    respondentName: "林建志",
    respondentEmail: "contact@formosteel.com",
    completedDate: new Date("2023-11-20"),
    type: "product",
    answers: {
      "產品資訊": {
        "產品名稱": "高強度鋼材",
        "功能單位": "每公噸",
        "報導期間": "2023年1月1日 至 2023年12月31日"
      },
      "碳足跡數據": {
        "產品碳足跡": "1890.567 kgCO2e/單位"
      },
      "生命週期階段": {
        "原料取得": "756.2 kgCO2e/單位",
        "製造階段": "945.3 kgCO2e/單位",
        "運輸階段": "132.3 kgCO2e/單位",
        "使用階段": "56.7 kgCO2e/單位"
      },
      "驗證資訊": {
        "採用標準": "ISO 14067:2018",
        "查證": "是",
        "查證證書": "SGS-CF-2023-200"
      }
    }
  },
  {
    id: "materials-3",
    surveyTitle: "2023年度材料製造業碳排放評估",
    supplierName: "GreenAlu Metals Corp.",
    respondentName: "王淑華",
    respondentEmail: "contact@greenalu.com",
    completedDate: new Date("2023-11-22"),
    type: "organization",
    answers: {
      "基本資訊": {
        "盤查期間": "2023年1月1日 至 2023年12月31日",
        "組織邊界": "營運控制權法",
        "盤查標準": "ISO 14064-1:2018"
      },
      "排放量資料": {
        "總排放量": "345000.789",
        "類別1排放量": "172500.2345",
        "類別2排放量": "138000.6789",
        "類別3排放量": "34500.3456"
      },
      "驗證資訊": {
        "查證": "是",
        "查證證書": "BSI-ISO14064-2023-201"
      }
    }
  },
  {
    id: "materials-4",
    surveyTitle: "材料製造產品碳足跡評估",
    supplierName: "GreenAlu Metals Corp.",
    respondentName: "王淑華",
    respondentEmail: "contact@greenalu.com",
    completedDate: new Date("2023-11-22"),
    type: "product",
    answers: {
      "產品資訊": {
        "產品名稱": "再生鋁合金",
        "功能單位": "每公噸",
        "報導期間": "2023年1月1日 至 2023年12月31日"
      },
      "碳足跡數據": {
        "產品碳足跡": "1245.889 kgCO2e/單位"
      },
      "生命週期階段": {
        "原料取得": "374.0 kgCO2e/單位",
        "製造階段": "623.0 kgCO2e/單位",
        "運輸階段": "187.0 kgCO2e/單位",
        "使用階段": "61.8 kgCO2e/單位"
      },
      "驗證資訊": {
        "採用標準": "ISO 14067:2018",
        "查證": "是",
        "查證證書": "BSI-CF-2023-201"
      }
    }
  },
  {
    id: "materials-5",
    surveyTitle: "2023年度材料製造業碳排放評估",
    supplierName: "CopperLink Industries",
    respondentName: "李明輝",
    respondentEmail: "contact@copperlink.com",
    completedDate: new Date("2023-11-25"),
    type: "organization",
    answers: {
      "基本資訊": {
        "盤查期間": "2023年1月1日 至 2023年12月31日",
        "組織邊界": "營運控制權法",
        "盤查標準": "ISO 14064-1:2018"
      },
      "排放量資料": {
        "總排放量": "567000.789",
        "類別1排放量": "283500.2345",
        "類別2排放量": "204120.6789",
        "類別3排放量": "79380.3456"
      },
      "驗證資訊": {
        "查證": "是",
        "查證證書": "TUV-ISO14064-2023-202"
      }
    }
  },
  {
    id: "materials-6",
    surveyTitle: "材料製造產品碳足跡評估",
    supplierName: "CopperLink Industries",
    respondentName: "李明輝",
    respondentEmail: "contact@copperlink.com",
    completedDate: new Date("2023-11-25"),
    type: "product",
    answers: {
      "產品資訊": {
        "產品名稱": "精煉銅材",
        "功能單位": "每公噸",
        "報導期間": "2023年1月1日 至 2023年12月31日"
      },
      "碳足跡數據": {
        "產品碳足跡": "3456.289 kgCO2e/單位"
      },
      "生命週期階段": {
        "原料取得": "1726.0 kgCO2e/單位",
        "製造階段": "1381.0 kgCO2e/單位",
        "運輸階段": "242.0 kgCO2e/單位",
        "使用階段": "107.2 kgCO2e/單位"
      },
      "驗證資訊": {
        "採用標準": "ISO 14067:2018",
        "查證": "是",
        "查證證書": "TUV-CF-2023-202"
      }
    }
  },
  {
    id: "materials-7",
    surveyTitle: "2023年度材料製造業碳排放評估",
    supplierName: "TitanMax Alloys Ltd.",
    respondentName: "陳志銘",
    respondentEmail: "contact@titanmax.com",
    completedDate: new Date("2023-11-28"),
    type: "organization",
    answers: {
      "基本資訊": {
        "盤查期間": "2023年1月1日 至 2023年12月31日",
        "組織邊界": "營運控制權法",
        "盤查標準": "ISO 14064-1:2018"
      },
      "排放量資料": {
        "總排放量": "1235000.789",
        "類別1排放量": "741000.2345",
        "類別2排放量": "371000.6789",
        "類別3排放量": "123000.3456"
      },
      "驗證資訊": {
        "查證": "是",
        "查證證書": "DNV-ISO14064-2023-203"
      }
    }
  },
  {
    id: "materials-8",
    surveyTitle: "材料製造產品碳足跡評估",
    supplierName: "TitanMax Alloys Ltd.",
    respondentName: "陳志銘",
    respondentEmail: "contact@titanmax.com",
    completedDate: new Date("2023-11-28"),
    type: "product",
    answers: {
      "產品資訊": {
        "產品名稱": "航太級鈦合金",
        "功能單位": "每公噸",
        "報導期間": "2023年1月1日 至 2023年12月31日"
      },
      "碳足跡數據": {
        "產品碳足跡": "8945.689 kgCO2e/單位"
      },
      "生命週期階段": {
        "原料取得": "4472.8 kgCO2e/單位",
        "製造階段": "3578.2 kgCO2e/單位",
        "運輸階段": "626.2 kgCO2e/單位",
        "使用階段": "268.4 kgCO2e/單位"
      },
      "驗證資訊": {
        "採用標準": "ISO 14067:2018",
        "查證": "是",
        "查證證書": "DNV-CF-2023-203"
      }
    }
  },
  {
    id: "materials-9",
    surveyTitle: "2023年度材料製造業碳排放評估",
    supplierName: "NickelOne Resources",
    respondentName: "黃美如",
    respondentEmail: "contact@nickelone.com",
    completedDate: new Date("2023-12-01"),
    type: "organization",
    answers: {
      "基本資訊": {
        "盤查期間": "2023年1月1日 至 2023年12月31日",
        "組織邊界": "營運控制權法",
        "盤查標準": "ISO 14064-1:2018"
      },
      "排放量資料": {
        "總排放量": "456000.789",
        "類別1排放量": "228000.2345",
        "類別2排放量": "164160.6789",
        "類別3排放量": "63840.3456"
      },
      "驗證資訊": {
        "查證": "是",
        "查證證書": "SGS-ISO14064-2023-204"
      }
    }
  },
  {
    id: "materials-10",
    surveyTitle: "材料製造產品碳足跡評估",
    supplierName: "NickelOne Resources",
    respondentName: "黃美如",
    respondentEmail: "contact@nickelone.com",
    completedDate: new Date("2023-12-01"),
    type: "product",
    answers: {
      "產品資訊": {
        "產品名稱": "鎳合金材料",
        "功能單位": "每公噸",
        "報導期間": "2023年1月1日 至 2023年12月31日"
      },
      "碳足跡數據": {
        "產品碳足跡": "2678.989 kgCO2e/單位"
      },
      "生命週期階段": {
        "原料取得": "1205.5 kgCO2e/單位",
        "製造階段": "1073.6 kgCO2e/單位",
        "運輸階段": "267.9 kgCO2e/單位",
        "使用階段": "131.9 kgCO2e/單位"
      },
      "驗證資訊": {
        "採用標準": "ISO 14067:2018",
        "查證": "是",
        "查證證書": "SGS-CF-2023-204"
      }
    }
  },
  {
    id: "materials-11",
    surveyTitle: "2023年度材料製造業碳排放評估",
    supplierName: "RareEarth Elements Ltd.",
    respondentName: "張國強",
    respondentEmail: "contact@rareearth.com",
    completedDate: new Date("2023-12-03"),
    type: "organization",
    answers: {
      "基本資訊": {
        "盤查期間": "2023年1月1日 至 2023年12月31日",
        "組織邊界": "營運控制權法",
        "盤查標準": "ISO 14064-1:2018"
      },
      "排放量資料": {
        "總排放量": "234000.789",
        "類別1排放量": "140400.2345",
        "類別2排放量": "70200.6789",
        "類別3排放量": "23400.3456"
      },
      "驗證資訊": {
        "查證": "是",
        "查證證書": "BSI-ISO14064-2023-205"
      }
    }
  },
  {
    id: "materials-12",
    surveyTitle: "材料製造產品碳足跡評估",
    supplierName: "RareEarth Elements Ltd.",
    respondentName: "張國強",
    respondentEmail: "contact@rareearth.com",
    completedDate: new Date("2023-12-03"),
    type: "product",
    answers: {
      "產品資訊": {
        "產品名稱": "稀土金屬元素",
        "功能單位": "每公斤",
        "報導期間": "2023年1月1日 至 2023年12月31日"
      },
      "碳足跡數據": {
        "產品碳足跡": "156.789 kgCO2e/單位"
      },
      "生命週期階段": {
        "原料取得": "78.4 kgCO2e/單位",
        "製造階段": "62.7 kgCO2e/單位",
        "運輸階段": "11.0 kgCO2e/單位",
        "使用階段": "4.6 kgCO2e/單位"
      },
      "驗證資訊": {
        "採用標準": "ISO 14067:2018",
        "查證": "是",
        "查證證書": "BSI-CF-2023-205"
      }
    }
  },
  {
    id: "materials-13",
    surveyTitle: "2023年度材料製造業碳排放評估",
    supplierName: "LithoMet Mining Group",
    respondentName: "劉建成",
    respondentEmail: "contact@lithomet.com",
    completedDate: new Date("2023-12-05"),
    type: "organization",
    answers: {
      "基本資訊": {
        "盤查期間": "2023年1月1日 至 2023年12月31日",
        "組織邊界": "營運控制權法",
        "盤查標準": "ISO 14064-1:2018"
      },
      "排放量資料": {
        "總排放量": "189000.789",
        "類別1排放量": "75600.2345",
        "類別2排放量": "83160.6789",
        "類別3排放量": "30240.3456"
      },
      "驗證資訊": {
        "查證": "是",
        "查證證書": "TUV-ISO14064-2023-206"
      }
    }
  },
  {
    id: "materials-14",
    surveyTitle: "材料製造產品碳足跡評估",
    supplierName: "LithoMet Mining Group",
    respondentName: "劉建成",
    respondentEmail: "contact@lithomet.com",
    completedDate: new Date("2023-12-05"),
    type: "product",
    answers: {
      "產品資訊": {
        "產品名稱": "電池級鋰鹽",
        "功能單位": "每公噸",
        "報導期間": "2023年1月1日 至 2023年12月31日"
      },
      "碳足跡數據": {
        "產品碳足跡": "4567.389 kgCO2e/單位"
      },
      "生命週期階段": {
        "原料取得": "1826.9 kgCO2e/單位",
        "製造階段": "2283.7 kgCO2e/單位",
        "運輸階段": "319.7 kgCO2e/單位",
        "使用階段": "137.0 kgCO2e/單位"
      },
      "驗證資訊": {
        "採用標準": "ISO 14067:2018",
        "查證": "是",
        "查證證書": "TUV-CF-2023-206"
      }
    }
  },
  {
    id: "materials-15",
    surveyTitle: "2023年度材料製造業碳排放評估",
    supplierName: "CobaltCore Materials",
    respondentName: "吳佳芬",
    respondentEmail: "contact@cobaltcore.com",
    completedDate: new Date("2023-12-07"),
    type: "organization",
    answers: {
      "基本資訊": {
        "盤查期間": "2023年1月1日 至 2023年12月31日",
        "組織邊界": "營運控制權法",
        "盤查標準": "ISO 14064-1:2018"
      },
      "排放量資料": {
        "總排放量": "298000.789",
        "類別1排放量": "149000.2345",
        "類別2排放量": "107280.6789",
        "類別3排放量": "41720.3456"
      },
      "驗證資訊": {
        "查證": "是",
        "查證證書": "DNV-ISO14064-2023-207"
      }
    }
  },
  {
    id: "materials-16",
    surveyTitle: "材料製造產品碳足跡評估",
    supplierName: "CobaltCore Materials",
    respondentName: "吳佳芬",
    respondentEmail: "contact@cobaltcore.com",
    completedDate: new Date("2023-12-07"),
    type: "product",
    answers: {
      "產品資訊": {
        "產品名稱": "高純度鈷材料",
        "功能單位": "每公噸",
        "報導期間": "2023年1月1日 至 2023年12月31日"
      },
      "碳足跡數據": {
        "產品碳足跡": "7834.589 kgCO2e/單位"
      },
      "生命週期階段": {
        "原料取得": "3917.3 kgCO2e/單位",
        "製造階段": "3133.8 kgCO2e/單位",
        "運輸階段": "548.4 kgCO2e/單位",
        "使用階段": "235.0 kgCO2e/單位"
      },
      "驗證資訊": {
        "採用標準": "ISO 14067:2018",
        "查證": "是",
        "查證證書": "DNV-CF-2023-207"
      }
    }
  },
  {
    id: "materials-17",
    surveyTitle: "2023年度材料製造業碳排放評估",
    supplierName: "Graphenex Advanced Carbon",
    respondentName: "許志豪",
    respondentEmail: "contact@graphenex.com",
    completedDate: new Date("2023-12-08"),
    type: "organization",
    answers: {
      "基本資訊": {
        "盤查期間": "2023年1月1日 至 2023年12月31日",
        "組織邊界": "營運控制權法",
        "盤查標準": "ISO 14064-1:2018"
      },
      "排放量資料": {
        "總排放量": "145000.789",
        "類別1排放量": "58000.2345",
        "類別2排放量": "64120.6789",
        "類別3排放量": "22880.3456"
      },
      "驗證資訊": {
        "查證": "是",
        "查證證書": "SGS-ISO14064-2023-208"
      }
    }
  },
  {
    id: "materials-18",
    surveyTitle: "材料製造產品碳足跡評估",
    supplierName: "Graphenex Advanced Carbon",
    respondentName: "許志豪",
    respondentEmail: "contact@graphenex.com",
    completedDate: new Date("2023-12-08"),
    type: "product",
    answers: {
      "產品資訊": {
        "產品名稱": "高品質石墨烯",
        "功能單位": "每公斤",
        "報導期間": "2023年1月1日 至 2023年12月31日"
      },
      "碳足跡數據": {
        "產品碳足跡": "89.389 kgCO2e/單位"
      },
      "生命週期階段": {
        "原料取得": "35.7 kgCO2e/單位",
        "製造階段": "44.7 kgCO2e/單位",
        "運輸階段": "6.3 kgCO2e/單位",
        "使用階段": "2.6 kgCO2e/單位"
      },
      "驗證資訊": {
        "採用標準": "ISO 14067:2018",
        "查證": "是",
        "查證證書": "SGS-CF-2023-208"
      }
    }
  },
  {
    id: "materials-19",
    surveyTitle: "2023年度材料製造業碳排放評估",
    supplierName: "EverChem Petrochemicals Ltd.",
    respondentName: "陳雅雯",
    respondentEmail: "contact@everchem.com",
    completedDate: new Date("2023-12-10"),
    type: "organization",
    answers: {
      "基本資訊": {
        "盤查期間": "2023年1月1日 至 2023年12月31日",
        "組織邊界": "營運控制權法",
        "盤查標準": "ISO 14064-1:2018"
      },
      "排放量資料": {
        "總排放量": "1456000.789",
        "類別1排放量": "728000.2345",
        "類別2排放量": "583680.6789",
        "類別3排放量": "144320.3456"
      },
      "驗證資訊": {
        "查證": "是",
        "查證證書": "BSI-ISO14064-2023-209"
      }
    }
  },
  {
    id: "materials-20",
    surveyTitle: "材料製造產品碳足跡評估",
    supplierName: "EverChem Petrochemicals Ltd.",
    respondentName: "陳雅雯",
    respondentEmail: "contact@everchem.com",
    completedDate: new Date("2023-12-10"),
    type: "product",
    answers: {
      "產品資訊": {
        "產品名稱": "石化基礎原料",
        "功能單位": "每公噸",
        "報導期間": "2023年1月1日 至 2023年12月31日"
      },
      "碳足跡數據": {
        "產品碳足跡": "2345.789 kgCO2e/單位"
      },
      "生命週期階段": {
        "原料取得": "1173.0 kgCO2e/單位",
        "製造階段": "938.3 kgCO2e/單位",
        "運輸階段": "164.2 kgCO2e/單位",
        "使用階段": "70.2 kgCO2e/單位"
      },
      "驗證資訊": {
        "採用標準": "ISO 14067:2018",
        "查證": "是",
        "查證證書": "BSI-CF-2023-209"
      }
    }
  },
  // 繼續添加更多材料製造業供應商
  {
    id: "materials-21",
    surveyTitle: "2023年度材料製造業碳排放評估",
    supplierName: "NovaPlas Polymers",
    respondentName: "趙文傑",
    respondentEmail: "contact@novaplas.com",
    completedDate: new Date("2023-12-12"),
    type: "organization",
    answers: {
      "基本資訊": {
        "盤查期間": "2023年1月1日 至 2023年12月31日",
        "組織邊界": "營運控制權法",
        "盤查標準": "ISO 14064-1:2018"
      },
      "排放量資料": {
        "總排放量": "678000.789",
        "類別1排放量": "339000.2345",
        "類別2排放量": "244080.6789",
        "類別3排放量": "94920.3456"
      },
      "驗證資訊": {
        "查證": "是",
        "查證證書": "TUV-ISO14064-2023-210"
      }
    }
  },
  {
    id: "materials-22",
    surveyTitle: "材料製造產品碳足跡評估",
    supplierName: "NovaPlas Polymers",
    respondentName: "趙文傑",
    respondentEmail: "contact@novaplas.com",
    completedDate: new Date("2023-12-12"),
    type: "product",
    answers: {
      "產品資訊": {
        "產品名稱": "高性能聚合物",
        "功能單位": "每公噸",
        "報導期間": "2023年1月1日 至 2023年12月31日"
      },
      "碳足跡數據": {
        "產品碳足跡": "2890.489 kgCO2e/單位"
      },
      "生命週期階段": {
        "原料取得": "1445.2 kgCO2e/單位",
        "製造階段": "1156.2 kgCO2e/單位",
        "運輸階段": "202.3 kgCO2e/單位",
        "使用階段": "86.7 kgCO2e/單位"
      },
      "驗證資訊": {
        "採用標準": "ISO 14067:2018",
        "查證": "是",
        "查證證書": "TUV-CF-2023-210"
      }
    }
  },
  {
    id: "materials-23",
    surveyTitle: "2023年度材料製造業碳排放評估",
    supplierName: "PolyCycle Replastics",
    respondentName: "劉佳穎",
    respondentEmail: "contact@polycycle.com",
    completedDate: new Date("2023-12-14"),
    type: "organization",
    answers: {
      "基本資訊": {
        "盤查期間": "2023年1月1日 至 2023年12月31日",
        "組織邊界": "營運控制權法",
        "盤查標準": "ISO 14064-1:2018"
      },
      "排放量資料": {
        "總排放量": "234000.789",
        "類別1排放量": "117000.2345",
        "類別2排放量": "84240.6789",
        "類別3排放量": "32760.3456"
      },
      "驗證資訊": {
        "查證": "是",
        "查證證書": "DNV-ISO14064-2023-211"
      }
    }
  },
  {
    id: "materials-24",
    surveyTitle: "材料製造產品碳足跡評估",
    supplierName: "PolyCycle Replastics",
    respondentName: "劉佳穎",
    respondentEmail: "contact@polycycle.com",
    completedDate: new Date("2023-12-14"),
    type: "product",
    answers: {
      "產品資訊": {
        "產品名稱": "再生塑膠粒",
        "功能單位": "每公噸",
        "報導期間": "2023年1月1日 至 2023年12月31日"
      },
      "碳足跡數據": {
        "產品碳足跡": "956.889 kgCO2e/單位"
      },
      "生命週期階段": {
        "原料取得": "287.0 kgCO2e/單位",
        "製造階段": "478.4 kgCO2e/單位",
        "運輸階段": "133.9 kgCO2e/單位",
        "使用階段": "57.5 kgCO2e/單位"
      },
      "驗證資訊": {
        "採用標準": "ISO 14067:2018",
        "查證": "是",
        "查證證書": "DNV-CF-2023-211"
      }
    }
  },
  {
    id: "materials-25",
    surveyTitle: "2023年度材料製造業碳排放評估",
    supplierName: "CarbonFiber Advanced Materials",
    respondentName: "邱維德",
    respondentEmail: "contact@carbonfiber.com",
    completedDate: new Date("2023-12-16"),
    type: "organization",
    answers: {
      "基本資訊": {
        "盤查期間": "2023年1月1日 至 2023年12月31日",
        "組織邊界": "營運控制權法",
        "盤查標準": "ISO 14064-1:2018"
      },
      "排放量資料": {
        "總排放量": "789000.789",
        "類別1排放量": "394500.2345",
        "類別2排放量": "284040.6789",
        "類別3排放量": "110460.3456"
      },
      "驗證資訊": {
        "查證": "是",
        "查證證書": "SGS-ISO14064-2023-212"
      }
    }
  },
  {
    id: "materials-26",
    surveyTitle: "材料製造產品碳足跡評估",
    supplierName: "CarbonFiber Advanced Materials",
    respondentName: "邱維德",
    respondentEmail: "contact@carbonfiber.com",
    completedDate: new Date("2023-12-16"),
    type: "product",
    answers: {
      "產品資訊": {
        "產品名稱": "航太級碳纖維",
        "功能單位": "每公斤",
        "報導期間": "2023年1月1日 至 2023年12月31日"
      },
      "碳足跡數據": {
        "產品碳足跡": "67.989 kgCO2e/單位"
      },
      "生命週期階段": {
        "原料取得": "27.2 kgCO2e/單位",
        "製造階段": "34.0 kgCO2e/單位",
        "運輸階段": "4.8 kgCO2e/單位",
        "使用階段": "1.9 kgCO2e/單位"
      },
      "驗證資訊": {
        "採用標準": "ISO 14067:2018",
        "查證": "是",
        "查證證書": "SGS-CF-2023-212"
      }
    }
  },
  {
    id: "materials-27",
    surveyTitle: "2023年度材料製造業碳排放評估",
    supplierName: "OptiGlass Technology Inc.",
    respondentName: "楊智慧",
    respondentEmail: "contact@optiglass.com",
    completedDate: new Date("2023-12-18"),
    type: "organization",
    answers: {
      "基本資訊": {
        "盤查期間": "2023年1月1日 至 2023年12月31日",
        "組織邊界": "營運控制權法",
        "盤查標準": "ISO 14064-1:2018"
      },
      "排放量資料": {
        "總排放量": "456000.789",
        "類別1排放量": "228000.2345",
        "類別2排放量": "164160.6789",
        "類別3排放量": "63840.3456"
      },
      "驗證資訊": {
        "查證": "是",
        "查證證書": "BSI-ISO14064-2023-213"
      }
    }
  },
  {
    id: "materials-28",
    surveyTitle: "材料製造產品碳足跡評估",
    supplierName: "OptiGlass Technology Inc.",
    respondentName: "楊智慧",
    respondentEmail: "contact@optiglass.com",
    completedDate: new Date("2023-12-18"),
    type: "product",
    answers: {
      "產品資訊": {
        "產品名稱": "光學級玻璃基板",
        "功能單位": "每平方米",
        "報導期間": "2023年1月1日 至 2023年12月31日"
      },
      "碳足跡數據": {
        "產品碳足跡": "45.689 kgCO2e/單位"
      },
      "生命週期階段": {
        "原料取得": "18.2 kgCO2e/單位",
        "製造階段": "22.8 kgCO2e/單位",
        "運輸階段": "3.2 kgCO2e/單位",
        "使用階段": "1.4 kgCO2e/單位"
      },
      "驗證資訊": {
        "採用標準": "ISO 14067:2018",
        "查證": "是",
        "查證證書": "BSI-CF-2023-213"
      }
    }
  },
  {
    id: "materials-29",
    surveyTitle: "2023年度材料製造業碳排放評估",
    supplierName: "ClearSilica Mining Co.",
    respondentName: "鄭承恩",
    respondentEmail: "contact@clearsilica.com",
    completedDate: new Date("2023-12-20"),
    type: "organization",
    answers: {
      "基本資訊": {
        "盤查期間": "2023年1月1日 至 2023年12月31日",
        "組織邊界": "營運控制權法",
        "盤查標準": "ISO 14064-1:2018"
      },
      "排放量資料": {
        "總排放量": "323000.789",
        "類別1排放量": "161500.2345",
        "類別2排放量": "116280.6789",
        "類別3排放量": "45220.3456"
      },
      "驗證資訊": {
        "查證": "是",
        "查證證書": "TUV-ISO14064-2023-214"
      }
    }
  },
  {
    id: "materials-30",
    surveyTitle: "材料製造產品碳足跡評估",
    supplierName: "ClearSilica Mining Co.",
    respondentName: "鄭承恩",
    respondentEmail: "contact@clearsilica.com",
    completedDate: new Date("2023-12-20"),
    type: "product",
    answers: {
      "產品資訊": {
        "產品名稱": "高純度石英砂",
        "功能單位": "每公噸",
        "報導期間": "2023年1月1日 至 2023年12月31日"
      },
      "碳足跡數據": {
        "產品碳足跡": "567.389 kgCO2e/單位"
      },
      "生命週期階段": {
        "原料取得": "226.9 kgCO2e/單位",
        "製造階段": "283.7 kgCO2e/單位",
        "運輸階段": "39.7 kgCO2e/單位",
        "使用階段": "17.0 kgCO2e/單位"
      },
      "驗證資訊": {
        "採用標準": "ISO 14067:2018",
        "查證": "是",
        "查證證書": "TUV-CF-2023-214"
      }
    }
  },
  // 添加剩餘 15 個供應商
  {
    id: "materials-31",
    surveyTitle: "2023年度材料製造業碳排放評估",
    supplierName: "CeramiX Materials Group",
    respondentName: "謝立民",
    respondentEmail: "contact@ceramix.com",
    completedDate: new Date("2023-12-22"),
    type: "organization",
    answers: {
      "基本資訊": {
        "盤查期間": "2023年1月1日 至 2023年12月31日",
        "組織邊界": "營運控制權法",
        "盤查標準": "ISO 14064-1:2018"
      },
      "排放量資料": {
        "總排放量": "398000.789",
        "類別1排放量": "199000.2345",
        "類別2排放量": "143280.6789",
        "類別3排放量": "55720.3456"
      },
      "驗證資訊": {
        "查證": "是",
        "查證證書": "DNV-ISO14064-2023-215"
      }
    }
  },
  {
    id: "materials-32",
    surveyTitle: "材料製造產品碳足跡評估",
    supplierName: "CeramiX Materials Group",
    respondentName: "謝立民",
    respondentEmail: "contact@ceramix.com",
    completedDate: new Date("2023-12-22"),
    type: "product",
    answers: {
      "產品資訊": {
        "產品名稱": "高溫陶瓷材料",
        "功能單位": "每公噸",
        "報導期間": "2023年1月1日 至 2023年12月31日"
      },
      "碳足跡數據": {
        "產品碳足跡": "2456.789 kgCO2e/單位"
      },
      "生命週期階段": {
        "原料取得": "1228.4 kgCO2e/單位",
        "製造階段": "982.7 kgCO2e/單位",
        "運輸階段": "172.0 kgCO2e/單位",
        "使用階段": "73.6 kgCO2e/單位"
      },
      "驗證資訊": {
        "採用標準": "ISO 14067:2018",
        "查證": "是",
        "查證證書": "DNV-CF-2023-215"
      }
    }
  },
  {
    id: "materials-33",
    surveyTitle: "2023年度材料製造業碳排放評估",
    supplierName: "Silicore Semiconductor Materials",
    respondentName: "林志華",
    respondentEmail: "contact@silicore.com",
    completedDate: new Date("2023-12-24"),
    type: "organization",
    answers: {
      "基本資訊": {
        "盤查期間": "2023年1月1日 至 2023年12月31日",
        "組織邊界": "營運控制權法",
        "盤查標準": "ISO 14064-1:2018"
      },
      "排放量資料": {
        "總排放量": "867000.789",
        "類別1排放量": "433500.2345",
        "類別2排放量": "312120.6789",
        "類別3排放量": "121380.3456"
      },
      "驗證資訊": {
        "查證": "是",
        "查證證書": "SGS-ISO14064-2023-216"
      }
    }
  },
  {
    id: "materials-34",
    surveyTitle: "材料製造產品碳足跡評估",
    supplierName: "Silicore Semiconductor Materials",
    respondentName: "林志華",
    respondentEmail: "contact@silicore.com",
    completedDate: new Date("2023-12-24"),
    type: "product",
    answers: {
      "產品資訊": {
        "產品名稱": "半導體用矽晶圓",
        "功能單位": "每片晶圓",
        "報導期間": "2023年1月1日 至 2023年12月31日"
      },
      "碳足跡數據": {
        "產品碳足跡": "89.489 kgCO2e/單位"
      },
      "生命週期階段": {
        "原料取得": "35.8 kgCO2e/單位",
        "製造階段": "44.7 kgCO2e/單位",
        "運輸階段": "6.3 kgCO2e/單位",
        "使用階段": "2.6 kgCO2e/單位"
      },
      "驗證資訊": {
        "採用標準": "ISO 14067:2018",
        "查證": "是",
        "查證證書": "SGS-CF-2023-216"
      }
    }
  },
  {
    id: "materials-35",
    surveyTitle: "2023年度材料製造業碳排放評估",
    supplierName: "WaferTech Materials Ltd.",
    respondentName: "張美惠",
    respondentEmail: "contact@wafertech.com",
    completedDate: new Date("2023-12-26"),
    type: "organization",
    answers: {
      "基本資訊": {
        "盤查期間": "2023年1月1日 至 2023年12月31日",
        "組織邊界": "營運控制權法",
        "盤查標準": "ISO 14064-1:2018"
      },
      "排放量資料": {
        "總排放量": "654000.789",
        "類別1排放量": "327000.2345",
        "類別2排放量": "235440.6789",
        "類別3排放量": "91560.3456"
      },
      "驗證資訊": {
        "查證": "是",
        "查證證書": "BSI-ISO14064-2023-217"
      }
    }
  },
  {
    id: "materials-36",
    surveyTitle: "材料製造產品碳足跡評估",
    supplierName: "WaferTech Materials Ltd.",
    respondentName: "張美惠",
    respondentEmail: "contact@wafertech.com",
    completedDate: new Date("2023-12-26"),
    type: "product",
    answers: {
      "產品資訊": {
        "產品名稱": "半導體拋光片",
        "功能單位": "每片",
        "報導期間": "2023年1月1日 至 2023年12月31日"
      },
      "碳足跡數據": {
        "產品碳足跡": "76.889 kgCO2e/單位"
      },
      "生命週期階段": {
        "原料取得": "30.7 kgCO2e/單位",
        "製造階段": "38.4 kgCO2e/單位",
        "運輸階段": "5.4 kgCO2e/單位",
        "使用階段": "2.3 kgCO2e/單位"
      },
      "驗證資訊": {
        "採用標準": "ISO 14067:2018",
        "查證": "是",
        "查證證書": "BSI-CF-2023-217"
      }
    }
  },
  {
    id: "materials-37",
    surveyTitle: "2023年度材料製造業碳排放評估",
    supplierName: "InnoChip Substrates",
    respondentName: "劉德華",
    respondentEmail: "contact@innochip.com",
    completedDate: new Date("2023-12-28"),
    type: "organization",
    answers: {
      "基本資訊": {
        "盤查期間": "2023年1月1日 至 2023年12月31日",
        "組織邊界": "營運控制權法",
        "盤查標準": "ISO 14064-1:2018"
      },
      "排放量資料": {
        "總排放量": "498000.789",
        "類別1排放量": "249000.2345",
        "類別2排放量": "179280.6789",
        "類別3排放量": "69720.3456"
      },
      "驗證資訊": {
        "查證": "是",
        "查證證書": "TUV-ISO14064-2023-218"
      }
    }
  },
  {
    id: "materials-38",
    surveyTitle: "材料製造產品碳足跡評估",
    supplierName: "InnoChip Substrates",
    respondentName: "劉德華",
    respondentEmail: "contact@innochip.com",
    completedDate: new Date("2023-12-28"),
    type: "product",
    answers: {
      "產品資訊": {
        "產品名稱": "IC基板材料",
        "功能單位": "每平方米",
        "報導期間": "2023年1月1日 至 2023年12月31日"
      },
      "碳足跡數據": {
        "產品碳足跡": "124.689 kgCO2e/單位"
      },
      "生命週期階段": {
        "原料取得": "49.8 kgCO2e/單位",
        "製造階段": "62.3 kgCO2e/單位",
        "運輸階段": "8.7 kgCO2e/單位",
        "使用階段": "3.8 kgCO2e/單位"
      },
      "驗證資訊": {
        "採用標準": "ISO 14067:2018",
        "查證": "是",
        "查證證書": "TUV-CF-2023-218"
      }
    }
  },
  {
    id: "materials-39",
    surveyTitle: "2023年度材料製造業碳排放評估",
    supplierName: "BondAlloy Solderworks",
    respondentName: "王志明",
    respondentEmail: "contact@bondalloy.com",
    completedDate: new Date("2023-12-30"),
    type: "organization",
    answers: {
      "基本資訊": {
        "盤查期間": "2023年1月1日 至 2023年12月31日",
        "組織邊界": "營運控制權法",
        "盤查標準": "ISO 14064-1:2018"
      },
      "排放量資料": {
        "總排放量": "287000.789",
        "類別1排放量": "143500.2345",
        "類別2排放量": "103320.6789",
        "類別3排放量": "40180.3456"
      },
      "驗證資訊": {
        "查證": "是",
        "查證證書": "DNV-ISO14064-2023-219"
      }
    }
  },
  {
    id: "materials-40",
    surveyTitle: "材料製造產品碳足跡評估",
    supplierName: "BondAlloy Solderworks",
    respondentName: "王志明",
    respondentEmail: "contact@bondalloy.com",
    completedDate: new Date("2023-12-30"),
    type: "product",
    answers: {
      "產品資訊": {
        "產品名稱": "無鉛焊錫合金",
        "功能單位": "每公斤",
        "報導期間": "2023年1月1日 至 2023年12月31日"
      },
      "碳足跡數據": {
        "產品碳足跡": "18.989 kgCO2e/單位"
      },
      "生命週期階段": {
        "原料取得": "7.6 kgCO2e/單位",
        "製造階段": "9.5 kgCO2e/單位",
        "運輸階段": "1.3 kgCO2e/單位",
        "使用階段": "0.5 kgCO2e/單位"
      },
      "驗證資訊": {
        "採用標準": "ISO 14067:2018",
        "查證": "是",
        "查證證書": "DNV-CF-2023-219"
      }
    }
  },
  {
    id: "materials-41",
    surveyTitle: "2023年度材料製造業碳排放評估",
    supplierName: "FlexCopper Foils",
    respondentName: "陳雅玲",
    respondentEmail: "contact@flexcopper.com",
    completedDate: new Date("2024-01-02"),
    type: "organization",
    answers: {
      "基本資訊": {
        "盤查期間": "2023年1月1日 至 2023年12月31日",
        "組織邊界": "營運控制權法",
        "盤查標準": "ISO 14064-1:2018"
      },
      "排放量資料": {
        "總排放量": "432000.789",
        "類別1排放量": "216000.2345",
        "類別2排放量": "155520.6789",
        "類別3排放量": "60480.3456"
      },
      "驗證資訊": {
        "查證": "是",
        "查證證書": "SGS-ISO14064-2023-220"
      }
    }
  },
  {
    id: "materials-42",
    surveyTitle: "材料製造產品碳足跡評估",
    supplierName: "FlexCopper Foils",
    respondentName: "陳雅玲",
    respondentEmail: "contact@flexcopper.com",
    completedDate: new Date("2024-01-02"),
    type: "product",
    answers: {
      "產品資訊": {
        "產品名稱": "電子級銅箔",
        "功能單位": "每平方米",
        "報導期間": "2023年1月1日 至 2023年12月31日"
      },
      "碳足跡數據": {
        "產品碳足跡": "34.789 kgCO2e/單位"
      },
      "生命週期階段": {
        "原料取得": "13.9 kgCO2e/單位",
        "製造階段": "17.4 kgCO2e/單位",
        "運輸階段": "2.4 kgCO2e/單位",
        "使用階段": "1.0 kgCO2e/單位"
      },
      "驗證資訊": {
        "採用標準": "ISO 14067:2018",
        "查證": "是",
        "查證證書": "SGS-CF-2023-220"
      }
    }
  },
  {
    id: "materials-43",
    surveyTitle: "2023年度材料製造業碳排放評估",
    supplierName: "AltiGlass Displays",
    respondentName: "蘇建國",
    respondentEmail: "contact@altiglass.com",
    completedDate: new Date("2024-01-04"),
    type: "organization",
    answers: {
      "基本資訊": {
        "盤查期間": "2023年1月1日 至 2023年12月31日",
        "組織邊界": "營運控制權法",
        "盤查標準": "ISO 14064-1:2018"
      },
      "排放量資料": {
        "總排放量": "598000.789",
        "類別1排放量": "299000.2345",
        "類別2排放量": "215280.6789",
        "類別3排放量": "83720.3456"
      },
      "驗證資訊": {
        "查證": "是",
        "查證證書": "BSI-ISO14064-2023-221"
      }
    }
  },
  {
    id: "materials-44",
    surveyTitle: "材料製造產品碳足跡評估",
    supplierName: "AltiGlass Displays",
    respondentName: "蘇建國",
    respondentEmail: "contact@altiglass.com",
    completedDate: new Date("2024-01-04"),
    type: "product",
    answers: {
      "產品資訊": {
        "產品名稱": "顯示器用玻璃",
        "功能單位": "每平方米",
        "報導期間": "2023年1月1日 至 2023年12月31日"
      },
      "碳足跡數據": {
        "產品碳足跡": "56.889 kgCO2e/單位"
      },
      "生命週期階段": {
        "原料取得": "22.7 kgCO2e/單位",
        "製造階段": "28.4 kgCO2e/單位",
        "運輸階段": "4.0 kgCO2e/單位",
        "使用階段": "1.7 kgCO2e/單位"
      },
      "驗證資訊": {
        "採用標準": "ISO 14067:2018",
        "查證": "是",
        "查證證書": "BSI-CF-2023-221"
      }
    }
  },
  {
    id: "materials-45",
    surveyTitle: "2023年度材料製造業碳排放評估",
    supplierName: "NanoPowder Chemicals",
    respondentName: "呂志成",
    respondentEmail: "contact@nanopowder.com",
    completedDate: new Date("2024-01-06"),
    type: "organization",
    answers: {
      "基本資訊": {
        "盤查期間": "2023年1月1日 至 2023年12月31日",
        "組織邊界": "營運控制權法",
        "盤查標準": "ISO 14064-1:2018"
      },
      "排放量資料": {
        "總排放量": "167000.789",
        "類別1排放量": "83500.2345",
        "類別2排放量": "60120.6789",
        "類別3排放量": "23380.3456"
      },
      "驗證資訊": {
        "查證": "是",
        "查證證書": "TUV-ISO14064-2023-222"
      }
    }
  },
  {
    id: "materials-46",
    surveyTitle: "材料製造產品碳足跡評估",
    supplierName: "NanoPowder Chemicals",
    respondentName: "呂志成",
    respondentEmail: "contact@nanopowder.com",
    completedDate: new Date("2024-01-06"),
    type: "product",
    answers: {
      "產品資訊": {
        "產品名稱": "奈米級化工粉體",
        "功能單位": "每公斤",
        "報導期間": "2023年1月1日 至 2023年12月31日"
      },
      "碳足跡數據": {
        "產品碳足跡": "23.489 kgCO2e/單位"
      },
      "生命週期階段": {
        "原料取得": "9.4 kgCO2e/單位",
        "製造階段": "11.7 kgCO2e/單位",
        "運輸階段": "1.6 kgCO2e/單位",
        "使用階段": "0.7 kgCO2e/單位"
      },
      "驗證資訊": {
        "採用標準": "ISO 14067:2018",
        "查證": "是",
        "查證證書": "TUV-CF-2023-222"
      }
    }
  },
  {
    id: "materials-47",
    surveyTitle: "2023年度材料製造業碳排放評估",
    supplierName: "ThermoResin Compounds",
    respondentName: "徐雅婷",
    respondentEmail: "contact@thermoresin.com",
    completedDate: new Date("2024-01-08"),
    type: "organization",
    answers: {
      "基本資訊": {
        "盤查期間": "2023年1月1日 至 2023年12月31日",
        "組織邊界": "營運控制權法",
        "盤查標準": "ISO 14064-1:2018"
      },
      "排放量資料": {
        "總排放量": "534000.789",
        "類別1排放量": "267000.2345",
        "類別2排放量": "192240.6789",
        "類別3排放量": "74760.3456"
      },
      "驗證資訊": {
        "查證": "是",
        "查證證書": "DNV-ISO14064-2023-223"
      }
    }
  },
  {
    id: "materials-48",
    surveyTitle: "材料製造產品碳足跡評估",
    supplierName: "ThermoResin Compounds",
    respondentName: "徐雅婷",
    respondentEmail: "contact@thermoresin.com",
    completedDate: new Date("2024-01-08"),
    type: "product",
    answers: {
      "產品資訊": {
        "產品名稱": "熱固性樹脂複合材料",
        "功能單位": "每公噸",
        "報導期間": "2023年1月1日 至 2023年12月31日"
      },
      "碳足跡數據": {
        "產品碳足跡": "3567.889 kgCO2e/單位"
      },
      "生命週期階段": {
        "原料取得": "1783.9 kgCO2e/單位",
        "製造階段": "1427.1 kgCO2e/單位",
        "運輸階段": "249.7 kgCO2e/單位",
        "使用階段": "107.1 kgCO2e/單位"
      },
      "驗證資訊": {
        "採用標準": "ISO 14067:2018",
        "查證": "是",
        "查證證書": "DNV-CF-2023-223"
      }
    }
  },
  {
    id: "materials-49",
    surveyTitle: "2023年度材料製造業碳排放評估",
    supplierName: "BioPolymer Solutions",
    respondentName: "朱美華",
    respondentEmail: "contact@biopolymer.com",
    completedDate: new Date("2024-01-10"),
    type: "organization",
    answers: {
      "基本資訊": {
        "盤查期間": "2023年1月1日 至 2023年12月31日",
        "組織邊界": "營運控制權法",
        "盤查標準": "ISO 14064-1:2018"
      },
      "排放量資料": {
        "總排放量": "156000.789",
        "類別1排放量": "78000.2345",
        "類別2排放量": "56160.6789",
        "類別3排放量": "21840.3456"
      },
      "驗證資訊": {
        "查證": "是",
        "查證證書": "SGS-ISO14064-2023-224"
      }
    }
  },
  {
    id: "materials-50",
    surveyTitle: "材料製造產品碳足跡評估",
    supplierName: "BioPolymer Solutions",
    respondentName: "朱美華",
    respondentEmail: "contact@biopolymer.com",
    completedDate: new Date("2024-01-10"),
    type: "product",
    answers: {
      "產品資訊": {
        "產品名稱": "生物基塑膠材料",
        "功能單位": "每公噸",
        "報導期間": "2023年1月1日 至 2023年12月31日"
      },
      "碳足跡數據": {
        "產品碳足跡": "856.789 kgCO2e/單位"
      },
      "生命週期階段": {
        "原料取得": "257.0 kgCO2e/單位",
        "製造階段": "428.4 kgCO2e/單位",
        "運輸階段": "119.9 kgCO2e/單位",
        "使用階段": "51.4 kgCO2e/單位"
      },
      "驗證資訊": {
        "採用標準": "ISO 14067:2018",
        "查證": "是",
        "查證證書": "SGS-CF-2023-224"
      }
    }
  },
  {
    id: "materials-51",
    surveyTitle: "2023年度材料製造業碳排放評估",
    supplierName: "GreenTex Fibers",
    respondentName: "何志強",
    respondentEmail: "contact@greentex.com",
    completedDate: new Date("2024-01-12"),
    type: "organization",
    answers: {
      "基本資訊": {
        "盤查期間": "2023年1月1日 至 2023年12月31日",
        "組織邊界": "營運控制權法",
        "盤查標準": "ISO 14064-1:2018"
      },
      "排放量資料": {
        "總排放量": "289000.789",
        "類別1排放量": "144500.2345",
        "類別2排放量": "104040.6789",
        "類別3排放量": "40460.3456"
      },
      "驗證資訊": {
        "查證": "是",
        "查證證書": "BSI-ISO14064-2023-225"
      }
    }
  },
  {
    id: "materials-52",
    surveyTitle: "材料製造產品碳足跡評估",
    supplierName: "GreenTex Fibers",
    respondentName: "何志強",
    respondentEmail: "contact@greentex.com",
    completedDate: new Date("2024-01-12"),
    type: "product",
    answers: {
      "產品資訊": {
        "產品名稱": "再生纖維材料",
        "功能單位": "每公噸",
        "報導期間": "2023年1月1日 至 2023年12月31日"
      },
      "碳足跡數據": {
        "產品碳足跡": "1234.589 kgCO2e/單位"
      },
      "生命週期階段": {
        "原料取得": "370.4 kgCO2e/單位",
        "製造階段": "617.3 kgCO2e/單位",
        "運輸階段": "172.4 kgCO2e/單位",
        "使用階段": "74.4 kgCO2e/單位"
      },
      "驗證資訊": {
        "採用標準": "ISO 14067:2018",
        "查證": "是",
        "查證證書": "BSI-CF-2023-225"
      }
    }
  },
  {
    id: "materials-53",
    surveyTitle: "2023年度材料製造業碳排放評估",
    supplierName: "HardCarb Industrial Minerals",
    respondentName: "溫志偉",
    respondentEmail: "contact@hardcarb.com",
    completedDate: new Date("2024-01-14"),
    type: "organization",
    answers: {
      "基本資訊": {
        "盤查期間": "2023年1月1日 至 2023年12月31日",
        "組織邊界": "營運控制權法",
        "盤查標準": "ISO 14064-1:2018"
      },
      "排放量資料": {
        "總排放量": "756000.789",
        "類別1排放量": "378000.2345",
        "類別2排放量": "272160.6789",
        "類別3排放量": "105840.3456"
      },
      "驗證資訊": {
        "查證": "是",
        "查證證書": "TUV-ISO14064-2023-226"
      }
    }
  },
  {
    id: "materials-54",
    surveyTitle: "材料製造產品碳足跡評估",
    supplierName: "HardCarb Industrial Minerals",
    respondentName: "溫志偉",
    respondentEmail: "contact@hardcarb.com",
    completedDate: new Date("2024-01-14"),
    type: "product",
    answers: {
      "產品資訊": {
        "產品名稱": "碳化物耐火材料",
        "功能單位": "每公噸",
        "報導期間": "2023年1月1日 至 2023年12月31日"
      },
      "碳足跡數據": {
        "產品碳足跡": "4567.889 kgCO2e/單位"
      },
      "生命週期階段": {
        "原料取得": "2283.9 kgCO2e/單位",
        "製造階段": "1827.1 kgCO2e/單位",
        "運輸階段": "319.7 kgCO2e/單位",
        "使用階段": "137.1 kgCO2e/單位"
      },
      "驗證資訊": {
        "採用標準": "ISO 14067:2018",
        "查證": "是",
        "查證證書": "TUV-CF-2023-226"
      }
    }
  },
  {
    id: "materials-55",
    surveyTitle: "2023年度材料製造業碳排放評估",
    supplierName: "ZircoMat Ceramics",
    respondentName: "沈美玲",
    respondentEmail: "contact@zircomat.com",
    completedDate: new Date("2024-01-16"),
    type: "organization",
    answers: {
      "基本資訊": {
        "盤查期間": "2023年1月1日 至 2023年12月31日",
        "組織邊界": "營運控制權法",
        "盤查標準": "ISO 14064-1:2018"
      },
      "排放量資料": {
        "總排放量": "445000.789",
        "類別1排放量": "222500.2345",
        "類別2排放量": "160200.6789",
        "類別3排放量": "62300.3456"
      },
      "驗證資訊": {
        "查證": "是",
        "查證證書": "DNV-ISO14064-2023-227"
      }
    }
  },
  {
    id: "materials-56",
    surveyTitle: "材料製造產品碳足跡評估",
    supplierName: "ZircoMat Ceramics",
    respondentName: "沈美玲",
    respondentEmail: "contact@zircomat.com",
    completedDate: new Date("2024-01-16"),
    type: "product",
    answers: {
      "產品資訊": {
        "產品名稱": "氧化鋯陶瓷",
        "功能單位": "每公噸",
        "報導期間": "2023年1月1日 至 2023年12月31日"
      },
      "碳足跡數據": {
        "產品碳足跡": "3245.689 kgCO2e/單位"
      },
      "生命週期階段": {
        "原料取得": "1622.8 kgCO2e/單位",
        "製造階段": "1298.2 kgCO2e/單位",
        "運輸階段": "227.2 kgCO2e/單位",
        "使用階段": "97.4 kgCO2e/單位"
      },
      "驗證資訊": {
        "採用標準": "ISO 14067:2018",
        "查證": "是",
        "查證證書": "DNV-CF-2023-227"
      }
    }
  },
  {
    id: "materials-57",
    surveyTitle: "2023年度材料製造業碳排放評估",
    supplierName: "PhosChem Specialty Ltd.",
    respondentName: "黃建民",
    respondentEmail: "contact@phoschem.com",
    completedDate: new Date("2024-01-18"),
    type: "organization",
    answers: {
      "基本資訊": {
        "盤查期間": "2023年1月1日 至 2023年12月31日",
        "組織邊界": "營運控制權法",
        "盤查標準": "ISO 14064-1:2018"
      },
      "排放量資料": {
        "總排放量": "234000.789",
        "類別1排放量": "117000.2345",
        "類別2排放量": "84240.6789",
        "類別3排放量": "32760.3456"
      },
      "驗證資訊": {
        "查證": "是",
        "查證證書": "SGS-ISO14064-2023-228"
      }
    }
  },
  {
    id: "materials-58",
    surveyTitle: "材料製造產品碳足跡評估",
    supplierName: "PhosChem Specialty Ltd.",
    respondentName: "黃建民",
    respondentEmail: "contact@phoschem.com",
    completedDate: new Date("2024-01-18"),
    type: "product",
    answers: {
      "產品資訊": {
        "產品名稱": "磷化學品添加劑",
        "功能單位": "每公噸",
        "報導期間": "2023年1月1日 至 2023年12月31日"
      },
      "碳足跡數據": {
        "產品碳足跡": "1567.989 kgCO2e/單位"
      },
      "生命週期階段": {
        "原料取得": "627.2 kgCO2e/單位",
        "製造階段": "784.0 kgCO2e/單位",
        "運輸階段": "109.8 kgCO2e/單位",
        "使用階段": "46.9 kgCO2e/單位"
      },
      "驗證資訊": {
        "採用標準": "ISO 14067:2018",
        "查證": "是",
        "查證證書": "SGS-CF-2023-228"
      }
    }
  },
  {
    id: "materials-59",
    surveyTitle: "2023年度材料製造業碳排放評估",
    supplierName: "MagnetX Materials",
    respondentName: "馬志豪",
    respondentEmail: "contact@magnetx.com",
    completedDate: new Date("2024-01-20"),
    type: "organization",
    answers: {
      "基本資訊": {
        "盤查期間": "2023年1月1日 至 2023年12月31日",
        "組織邊界": "營運控制權法",
        "盤查標準": "ISO 14064-1:2018"
      },
      "排放量資料": {
        "總排放量": "678000.789",
        "類別1排放量": "339000.2345",
        "類別2排放量": "244080.6789",
        "類別3排放量": "94920.3456"
      },
      "驗證資訊": {
        "查證": "是",
        "查證證書": "BSI-ISO14064-2023-229"
      }
    }
  },
  {
    id: "materials-60",
    surveyTitle: "材料製造產品碳足跡評估",
    supplierName: "MagnetX Materials",
    respondentName: "馬志豪",
    respondentEmail: "contact@magnetx.com",
    completedDate: new Date("2024-01-20"),
    type: "product",
    answers: {
      "產品資訊": {
        "產品名稱": "稀土永磁材料",
        "功能單位": "每公斤",
        "報導期間": "2023年1月1日 至 2023年12月31日"
      },
      "碳足跡數據": {
        "產品碳足跡": "234.589 kgCO2e/單位"
      },
      "生命週期階段": {
        "原料取得": "117.3 kgCO2e/單位",
        "製造階段": "93.8 kgCO2e/單位",
        "運輸階段": "16.4 kgCO2e/單位",
        "使用階段": "7.0 kgCO2e/單位"
      },
      "驗證資訊": {
        "採用標準": "ISO 14067:2018",
        "查證": "是",
        "查證證書": "BSI-CF-2023-229"
      }
    }
  }
];

export function getSurveyData(source: SurveyDataSource): SurveyResponse[] {
  switch (source) {
    case 'tsmc':
      return tsmcSurveyData;
    case 'materials':
      return materialsSurveyData;
    case 'default':
    default:
      return defaultSurveyData;
  }
}

export function getSurveyDataSourceOptions() {
  return [
    { value: 'default', label: 'Case1' },
    { value: 'tsmc', label: 'Case2' },
    { value: 'materials', label: 'Case3' }
  ];
} 