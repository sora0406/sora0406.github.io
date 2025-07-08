export interface CarbonEmissionData {
  organizationalGHG: number; // 組織溫室氣體排放量 (噸CO2e/年)
  productCarbonFootprint: number; // 產品碳足跡 (kgCO2e/單位)
  scope1Emissions: number; // 類別1排放量 (噸CO2e/年)
  scope2Emissions: number; // 類別2排放量 (噸CO2e/年)
  scope4Emissions?: number; // 類別4排放量 (噸CO2e/年)
  scope5Emissions?: number; // 類別5排放量 (噸CO2e/年)
  scope6Emissions?: number; // 類別6排放量 (噸CO2e/年)
}

export interface Supplier {
  id: string;
  name: string;
  companyId: string;
  contact: string;
  email: string;
  phone: string;
  address: string;
  country: string;
  vehicleCount?: number;
  carbonData?: CarbonEmissionData;
  mergeRecords?: {
    sourceId: string;
    sourceName: string;
    boundary: string;
    importDate: string;
  }[];
}

export type SupplierDataSource = 'default' | 'tsmc';

// 預設供應商數據（原有數據）
const defaultSuppliers: Supplier[] = [
  {
    id: "1",
    name: "新竹物流",
    companyId: "TW12345678",
    contact: "張小明",
    email: "contact@hct.com.tw",
    phone: "02-2216-5589",
    address: "新北市新莊區新北大道三段7號",
    country: "台灣",
    vehicleCount: 3800,
    carbonData: {
      organizationalGHG: 52800,
      productCarbonFootprint: 0.85,
      scope1Emissions: 12500,
      scope2Emissions: 35000,
      scope4Emissions: 3800,
      scope5Emissions: 1200,
      scope6Emissions: 300
    }
  },
  {
    id: "2",
    name: "統一速達",
    companyId: "TW23456789",
    contact: "李大華",
    email: "info@t-cat.com.tw",
    phone: "02-2552-5525",
    address: "台北市大同區承德路三段210號",
    country: "台灣",
    vehicleCount: 2500,
    carbonData: {
      organizationalGHG: 38500,
      productCarbonFootprint: 0.78,
      scope1Emissions: 8500,
      scope2Emissions: 25000,
      scope4Emissions: 3200,
      scope5Emissions: 1400,
      scope6Emissions: 400
    }
  },
  {
    id: "3",
    name: "宅配通",
    companyId: "TW34567890",
    contact: "王美麗",
    email: "contact@pelican.com.tw",
    phone: "02-2659-5511",
    address: "台北市南港區三重路66號",
    country: "台灣",
    vehicleCount: 2000,
    carbonData: {
      organizationalGHG: 31200,
      productCarbonFootprint: 0.82,
      scope1Emissions: 7200,
      scope2Emissions: 20000,
      scope4Emissions: 2500,
      scope5Emissions: 1100,
      scope6Emissions: 400
    }
  },
  {
    id: "4",
    name: "長榮國際儲運",
    companyId: "TW45678901",
    contact: "林志明",
    email: "service@evergreen.com.tw",
    phone: "02-2500-1800",
    address: "台北市松山區民生東路三段135號",
    country: "台灣",
    vehicleCount: 1500,
    carbonData: {
      organizationalGHG: 45600,
      productCarbonFootprint: 1.25,
      scope1Emissions: 18000,
      scope2Emissions: 22000,
      scope4Emissions: 3200,
      scope5Emissions: 1800,
      scope6Emissions: 600
    }
  },
  {
    id: "5",
    name: "台塑汽車貨運",
    companyId: "TW56789012",
    contact: "陳大同",
    email: "info@fpcc-logistics.com.tw",
    phone: "02-2718-6168",
    address: "台北市松山區敦化北路201號",
    country: "台灣",
    vehicleCount: 1200,
    carbonData: {
      organizationalGHG: 28800,
      productCarbonFootprint: 0.95,
      scope1Emissions: 8500,
      scope2Emissions: 16000,
      scope4Emissions: 2800,
      scope5Emissions: 1200,
      scope6Emissions: 300
    }
  },
  {
    id: "6",
    name: "捷盛運輸",
    companyId: "TW67890123",
    contact: "黃小玲",
    email: "contact@js-transport.com.tw",
    phone: "03-3868-1288",
    address: "桃園市蘆竹區南崁路二段337號",
    country: "台灣",
    vehicleCount: 1000,
    carbonData: {
      organizationalGHG: 22400,
      productCarbonFootprint: 0.88,
      scope1Emissions: 6800,
      scope2Emissions: 12500,
      scope4Emissions: 2100,
      scope5Emissions: 800,
      scope6Emissions: 200
    }
  },
  {
    id: "7",
    name: "統昶行銷",
    companyId: "TW78901234",
    contact: "吳俊傑",
    email: "service@tonchang.com.tw",
    phone: "02-2269-5803",
    address: "新北市土城區中央路三段240號",
    country: "台灣",
    vehicleCount: 900,
    carbonData: {
      organizationalGHG: 19800,
      productCarbonFootprint: 0.75,
      scope1Emissions: 5800,
      scope2Emissions: 11000,
      scope4Emissions: 1800,
      scope5Emissions: 900,
      scope6Emissions: 300
    }
  },
  {
    id: "8",
    name: "捷盟行銷",
    companyId: "TW89012345",
    contact: "蔡佳玲",
    email: "info@jme.com.tw",
    phone: "02-2999-6788",
    address: "新北市新店區中正路516號",
    country: "台灣",
    vehicleCount: 800,
    carbonData: {
      organizationalGHG: 17600,
      productCarbonFootprint: 0.73,
      scope1Emissions: 5200,
      scope2Emissions: 9800,
      scope4Emissions: 1600,
      scope5Emissions: 800,
      scope6Emissions: 200
    }
  },
  {
    id: "9",
    name: "大智通文化行銷",
    companyId: "TW90123456",
    contact: "楊美玉",
    email: "contact@dachi.com.tw",
    phone: "02-2531-3000",
    address: "台北市中山區建國北路二段258號",
    country: "台灣",
    vehicleCount: 700,
    carbonData: {
      organizationalGHG: 15400,
      productCarbonFootprint: 0.71,
      scope1Emissions: 4600,
      scope2Emissions: 8500,
      scope4Emissions: 1400,
      scope5Emissions: 700,
      scope6Emissions: 200
    }
  },
  {
    id: "10",
    name: "中國貨櫃運輸",
    companyId: "TW01234567",
    contact: "周小明",
    email: "info@cmtlogistics.com.tw",
    phone: "02-2381-3456",
    address: "台北市中正區忠孝西路一段66號",
    country: "台灣",
    vehicleCount: 600,
    carbonData: {
      organizationalGHG: 26400,
      productCarbonFootprint: 1.42,
      scope1Emissions: 8800,
      scope2Emissions: 12000,
      scope4Emissions: 3600,
      scope5Emissions: 1600,
      scope6Emissions: 400
    }
  },
  {
    id: "11",
    name: "捷迅",
    companyId: "TW10987654",
    contact: "李小華",
    email: "contact@jet-speed.com.tw",
    phone: "03-3932-333",
    address: "桃園市大園區三民路二段75號",
    country: "台灣",
    vehicleCount: 500,
    carbonData: {
      organizationalGHG: 12500,
      productCarbonFootprint: 0.68,
      scope1Emissions: 3800,
      scope2Emissions: 6700,
      scope4Emissions: 1200,
      scope5Emissions: 600,
      scope6Emissions: 200
    }
  },
  {
    id: "12",
    name: "裕國冷凍冷藏",
    companyId: "TW21098765",
    contact: "張志偉",
    email: "service@yukogroup.com.tw",
    phone: "02-2500-5500",
    address: "台北市南港區三重路19-3號",
    country: "台灣",
    vehicleCount: 400,
    carbonData: {
      organizationalGHG: 32800,
      productCarbonFootprint: 2.15,
      scope1Emissions: 14000,
      scope2Emissions: 15000,
      scope4Emissions: 2400,
      scope5Emissions: 1100,
      scope6Emissions: 300
    }
  },
  {
    id: "13",
    name: "台灣航空貨運承攬",
    companyId: "TW32109876",
    contact: "王建國",
    email: "info@taiwanair-freight.com.tw",
    phone: "03-3931-3931",
    address: "桃園市大園區航勤北路3號",
    country: "台灣",
    vehicleCount: 300,
    carbonData: {
      organizationalGHG: 45800,
      productCarbonFootprint: 3.85,
      scope1Emissions: 22000,
      scope2Emissions: 18000,
      scope4Emissions: 3200,
      scope5Emissions: 2100,
      scope6Emissions: 500
    }
  },
  {
    id: "14",
    name: "好好國際物流",
    companyId: "TW43210987",
    contact: "林美珠",
    email: "contact@goodgood-logistics.com.tw",
    phone: "02-2658-5858",
    address: "台北市大安區復興南路一段137號",
    country: "台灣",
    vehicleCount: 200,
    carbonData: {
      organizationalGHG: 18600,
      productCarbonFootprint: 1.68,
      scope1Emissions: 6500,
      scope2Emissions: 8800,
      scope4Emissions: 2100,
      scope5Emissions: 1000,
      scope6Emissions: 200
    }
  }
];

// TSMC 供應商數據
const tsmcSuppliers: Supplier[] = [
  {
    id: "tsmc-1",
    name: "應用材料股份有限公司",
    companyId: "TW12345001",
    contact: "Michael Johnson",
    email: "contact@appliedmaterials.com.tw",
    phone: "03-577-7500",
    address: "新竹科學園區工業東路26號",
    country: "台灣",
    carbonData: {
      organizationalGHG: 185000,
      productCarbonFootprint: 12.5,
      scope1Emissions: 45000,
      scope2Emissions: 120000,
      scope4Emissions: 12000,
      scope5Emissions: 6000,
      scope6Emissions: 2000
    }
  },
  {
    id: "tsmc-2",
    name: "旭化成株式會社",
    companyId: "JP12345002",
    contact: "田中一郎",
    email: "info@asahi-kasei.co.jp",
    phone: "+81-3-3296-3000",
    address: "東京都千代田區有楽町1-1-2",
    country: "日本",
    carbonData: {
      organizationalGHG: 425000,
      productCarbonFootprint: 28.5,
      scope1Emissions: 165000,
      scope2Emissions: 220000,
      scope4Emissions: 25000,
      scope5Emissions: 12000,
      scope6Emissions: 3000
    }
  },
  {
    id: "tsmc-3",
    name: "ASM台灣先藝科技股份有限公司",
    companyId: "TW12345003",
    contact: "林志明",
    email: "contact@asm.com.tw",
    phone: "03-563-1688",
    address: "新竹科學園區園區二路68號",
    country: "台灣",
    carbonData: {
      organizationalGHG: 98000,
      productCarbonFootprint: 8.2,
      scope1Emissions: 28000,
      scope2Emissions: 55000,
      scope4Emissions: 9000,
      scope5Emissions: 4500,
      scope6Emissions: 1500
    }
  },
  {
    id: "tsmc-4",
    name: "艾司摩爾科技股份有限公司",
    companyId: "TW12345004",
    contact: "Peter van Hout",
    email: "info@asml.com.tw",
    phone: "03-666-8888",
    address: "新竹科學園區研發六路1號",
    country: "台灣",
    carbonData: {
      organizationalGHG: 325000,
      productCarbonFootprint: 45.8,
      scope1Emissions: 85000,
      scope2Emissions: 195000,
      scope4Emissions: 28000,
      scope5Emissions: 14000,
      scope6Emissions: 3000
    }
  },
  {
    id: "tsmc-5",
    name: "佳能股份有限公司",
    companyId: "JP12345005",
    contact: "佐藤太郎",
    email: "contact@canon.co.jp",
    phone: "+81-3-3758-2111",
    address: "東京都大田區下丸子3-30-2",
    country: "日本",
    carbonData: {
      organizationalGHG: 156000,
      productCarbonFootprint: 15.8,
      scope1Emissions: 38000,
      scope2Emissions: 95000,
      scope4Emissions: 14000,
      scope5Emissions: 7500,
      scope6Emissions: 1500
    }
  },
  {
    id: "tsmc-6",
    name: "達欣工程股份有限公司",
    companyId: "TW12345006",
    contact: "王建民",
    email: "info@daxin.com.tw",
    phone: "02-2325-8833",
    address: "台北市中正區忠孝西路一段66號",
    country: "台灣",
    carbonData: {
      organizationalGHG: 78000,
      productCarbonFootprint: 5.2,
      scope1Emissions: 22000,
      scope2Emissions: 45000,
      scope4Emissions: 7000,
      scope5Emissions: 3500,
      scope6Emissions: 500
    }
  },
  {
    id: "tsmc-7",
    name: "迪思科高科技股份有限公司",
    companyId: "TW12345007",
    contact: "陳美華",
    email: "contact@disco.com.tw",
    phone: "03-567-8900",
    address: "新竹科學園區創新一路1號",
    country: "台灣",
    carbonData: {
      organizationalGHG: 145000,
      productCarbonFootprint: 18.5,
      scope1Emissions: 35000,
      scope2Emissions: 85000,
      scope4Emissions: 15000,
      scope5Emissions: 8000,
      scope6Emissions: 2000
    }
  },
  {
    id: "tsmc-8",
    name: "信銘工業股份有限公司",
    companyId: "TW12345008",
    contact: "李信銘",
    email: "info@sinming.com.tw",
    phone: "04-2359-5959",
    address: "台中市西屯區工業區路66號",
    country: "台灣",
    carbonData: {
      organizationalGHG: 125000,
      productCarbonFootprint: 11.8,
      scope1Emissions: 32000,
      scope2Emissions: 75000,
      scope4Emissions: 12000,
      scope5Emissions: 5000,
      scope6Emissions: 1000
    }
  },
  {
    id: "tsmc-9",
    name: "JX金屬株式會社",
    companyId: "JP12345009",
    contact: "山田花子",
    email: "contact@jx-metals.co.jp",
    phone: "+81-3-6433-6000",
    address: "東京都千代田區大手町1-1-2",
    country: "日本",
    carbonData: {
      organizationalGHG: 285000,
      productCarbonFootprint: 35.8,
      scope1Emissions: 125000,
      scope2Emissions: 135000,
      scope4Emissions: 18000,
      scope5Emissions: 6000,
      scope6Emissions: 1000
    }
  },
  {
    id: "tsmc-10",
    name: "美商科磊股份有限公司",
    companyId: "TW12345010",
    contact: "David Smith",
    email: "info@kla.com.tw",
    phone: "03-666-7777",
    address: "新竹科學園區研發二路2號",
    country: "台灣",
    carbonData: {
      organizationalGHG: 165000,
      productCarbonFootprint: 22.5,
      scope1Emissions: 42000,
      scope2Emissions: 95000,
      scope4Emissions: 18000,
      scope5Emissions: 8000,
      scope6Emissions: 2000
    }
  },
  {
    id: "tsmc-11",
    name: "科林研發股份有限公司",
    companyId: "TW12345011",
    contact: "Sarah Chen",
    email: "contact@lamresearch.com.tw",
    phone: "03-577-8000",
    address: "新竹科學園區工業東路26號",
    country: "台灣",
    carbonData: {
      organizationalGHG: 198000,
      productCarbonFootprint: 28.5,
      scope1Emissions: 48000,
      scope2Emissions: 115000,
      scope4Emissions: 22000,
      scope5Emissions: 10000,
      scope6Emissions: 3000
    }
  },
  {
    id: "tsmc-12",
    name: "李長榮集團",
    companyId: "TW12345012",
    contact: "李長榮",
    email: "info@lcygroup.com",
    phone: "07-731-5131",
    address: "高雄市大社區中山路1號",
    country: "台灣",
    carbonData: {
      organizationalGHG: 385000,
      productCarbonFootprint: 45.2,
      scope1Emissions: 185000,
      scope2Emissions: 165000,
      scope4Emissions: 25000,
      scope5Emissions: 8000,
      scope6Emissions: 2000
    }
  },
  {
    id: "tsmc-13",
    name: "村田機械株式會社",
    companyId: "JP12345013",
    contact: "村田一郎",
    email: "contact@muratec.co.jp",
    phone: "+81-75-672-8600",
    address: "京都府京都市伏見区竹田向代町136",
    country: "日本",
    carbonData: {
      organizationalGHG: 158000,
      productCarbonFootprint: 25.8,
      scope1Emissions: 38000,
      scope2Emissions: 95000,
      scope4Emissions: 16000,
      scope5Emissions: 7000,
      scope6Emissions: 2000
    }
  },
  {
    id: "tsmc-14",
    name: "納美仕株式會社",
    companyId: "JP12345014",
    contact: "高橋次郎",
    email: "info@nomura.co.jp",
    phone: "+81-3-3211-1811",
    address: "東京都中央區日本橋1-9-1",
    country: "日本",
    carbonData: {
      organizationalGHG: 128000,
      productCarbonFootprint: 18.5,
      scope1Emissions: 32000,
      scope2Emissions: 78000,
      scope4Emissions: 12000,
      scope5Emissions: 5000,
      scope6Emissions: 1000
    }
  },
  {
    id: "tsmc-15",
    name: "紐富來科技股份有限公司",
    companyId: "TW12345015",
    contact: "張志偉",
    email: "contact@newfuture.com.tw",
    phone: "03-578-1234",
    address: "新竹科學園區力行路5號",
    country: "台灣",
    carbonData: {
      organizationalGHG: 89000,
      productCarbonFootprint: 12.8,
      scope1Emissions: 25000,
      scope2Emissions: 52000,
      scope4Emissions: 8000,
      scope5Emissions: 3500,
      scope6Emissions: 500
    }
  },
  {
    id: "tsmc-16",
    name: "奧璐佳瑙科技",
    companyId: "TW12345016",
    contact: "王美玲",
    email: "info@organo.com.tw",
    phone: "03-666-5555",
    address: "新竹科學園區園區一路15號",
    country: "台灣",
    carbonData: {
      organizationalGHG: 95000,
      productCarbonFootprint: 14.2,
      scope1Emissions: 26000,
      scope2Emissions: 58000,
      scope4Emissions: 7000,
      scope5Emissions: 3500,
      scope6Emissions: 500
    }
  },
  {
    id: "tsmc-17",
    name: "辛耘企業股份有限公司",
    companyId: "TW12345017",
    contact: "辛志強",
    email: "contact@sinyun.com.tw",
    phone: "03-567-8888",
    address: "新竹科學園區研發三路3號",
    country: "台灣",
    carbonData: {
      organizationalGHG: 78000,
      productCarbonFootprint: 9.8,
      scope1Emissions: 22000,
      scope2Emissions: 45000,
      scope4Emissions: 6500,
      scope5Emissions: 3800,
      scope6Emissions: 700
    }
  },
  {
    id: "tsmc-18",
    name: "台灣迪恩士半導體科技股份有限公司",
    companyId: "TW12345018",
    contact: "陳建宏",
    email: "info@dns-semi.com.tw",
    phone: "03-577-9000",
    address: "新竹科學園區研發路88號",
    country: "台灣",
    carbonData: {
      organizationalGHG: 142000,
      productCarbonFootprint: 19.5,
      scope1Emissions: 38000,
      scope2Emissions: 85000,
      scope4Emissions: 12000,
      scope5Emissions: 6000,
      scope6Emissions: 1000
    }
  },
  {
    id: "tsmc-19",
    name: "芝浦先進科技股份有限公司",
    companyId: "TW12345019",
    contact: "田中三郎",
    email: "contact@shibaura.com.tw",
    phone: "03-563-7777",
    address: "新竹科學園區工業東路16號",
    country: "台灣",
    carbonData: {
      organizationalGHG: 118000,
      productCarbonFootprint: 16.8,
      scope1Emissions: 32000,
      scope2Emissions: 72000,
      scope4Emissions: 9000,
      scope5Emissions: 4500,
      scope6Emissions: 500
    }
  },
  {
    id: "tsmc-20",
    name: "信越化學工業株式會社",
    companyId: "JP12345020",
    contact: "信越一郎",
    email: "contact@shinetsu.co.jp",
    phone: "+81-3-3246-5011",
    address: "東京都千代田區大手町2-6-1",
    country: "日本",
    carbonData: {
      organizationalGHG: 485000,
      productCarbonFootprint: 58.5,
      scope1Emissions: 225000,
      scope2Emissions: 215000,
      scope4Emissions: 32000,
      scope5Emissions: 11000,
      scope6Emissions: 2000
    }
  },
  {
    id: "tsmc-21",
    name: "株式會社SUMCO",
    companyId: "JP12345021",
    contact: "住友太郎",
    email: "info@sumcosi.com",
    phone: "+81-3-3436-1616",
    address: "東京都港區台場2-3-1",
    country: "日本",
    carbonData: {
      organizationalGHG: 365000,
      productCarbonFootprint: 42.8,
      scope1Emissions: 185000,
      scope2Emissions: 145000,
      scope4Emissions: 25000,
      scope5Emissions: 8000,
      scope6Emissions: 2000
    }
  },
  {
    id: "tsmc-22",
    name: "特諾本科技有限公司",
    companyId: "TW12345022",
    contact: "黃志明",
    email: "contact@tennor.com.tw",
    phone: "03-578-5678",
    address: "新竹科學園區創新二路2號",
    country: "台灣",
    carbonData: {
      organizationalGHG: 85000,
      productCarbonFootprint: 11.5,
      scope1Emissions: 24000,
      scope2Emissions: 48000,
      scope4Emissions: 8000,
      scope5Emissions: 4000,
      scope6Emissions: 1000
    }
  },
  {
    id: "tsmc-23",
    name: "東京威力科創股份有限公司",
    companyId: "TW12345023",
    contact: "東京太郎",
    email: "contact@tel.com.tw",
    phone: "03-577-6000",
    address: "新竹科學園區研發一路1號",
    country: "台灣",
    carbonData: {
      organizationalGHG: 225000,
      productCarbonFootprint: 32.5,
      scope1Emissions: 65000,
      scope2Emissions: 125000,
      scope4Emissions: 22000,
      scope5Emissions: 11000,
      scope6Emissions: 2000
    }
  },
  {
    id: "tsmc-24",
    name: "日本東京応化工業株式会社",
    companyId: "JP12345024",
    contact: "応化一郎",
    email: "info@tok.co.jp",
    phone: "+81-44-548-0500",
    address: "神奈川県川崎市中原区中丸子150",
    country: "日本",
    carbonData: {
      organizationalGHG: 195000,
      productCarbonFootprint: 28.8,
      scope1Emissions: 85000,
      scope2Emissions: 85000,
      scope4Emissions: 16000,
      scope5Emissions: 7000,
      scope6Emissions: 2000
    }
  },
  {
    id: "tsmc-25",
    name: "崇越石英製造廠股份有限公司",
    companyId: "TW12345025",
    contact: "崇越明",
    email: "contact@fmqz.com.tw",
    phone: "03-597-1313",
    address: "新竹縣湖口鄉新竹工業區工業一路1號",
    country: "台灣",
    carbonData: {
      organizationalGHG: 168000,
      productCarbonFootprint: 25.5,
      scope1Emissions: 78000,
      scope2Emissions: 72000,
      scope4Emissions: 12000,
      scope5Emissions: 5000,
      scope6Emissions: 1000
    }
  },
  {
    id: "tsmc-26",
    name: "東鋼鋼結構股份有限公司",
    companyId: "TW12345026",
    contact: "東鋼強",
    email: "info@tsteel.com.tw",
    phone: "07-611-8888",
    address: "高雄市路竹區中山路168號",
    country: "台灣",
    carbonData: {
      organizationalGHG: 285000,
      productCarbonFootprint: 48.5,
      scope1Emissions: 145000,
      scope2Emissions: 105000,
      scope4Emissions: 22000,
      scope5Emissions: 10000,
      scope6Emissions: 3000
    }
  },
  {
    id: "tsmc-27",
    name: "漢唐集成股份有限公司",
    companyId: "TW12345027",
    contact: "漢唐偉",
    email: "contact@sinteck.com.tw",
    phone: "03-516-5555",
    address: "新竹科學園區研發路110號",
    country: "台灣",
    carbonData: {
      organizationalGHG: 125000,
      productCarbonFootprint: 18.2,
      scope1Emissions: 35000,
      scope2Emissions: 72000,
      scope4Emissions: 12000,
      scope5Emissions: 5000,
      scope6Emissions: 1000
    }
  }
];

export function getSuppliers(source: SupplierDataSource): Supplier[] {
  switch (source) {
    case 'tsmc':
      return tsmcSuppliers;
    case 'default':
    default:
      return defaultSuppliers;
  }
}

export const dataSourceOptions = [
  { value: 'default', label: 'Case1' },
  { value: 'tsmc', label: 'Case2' }
] as const; 