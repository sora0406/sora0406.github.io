export interface CarbonEmissionData {
  organizationalGHG: number; // 組織溫室氣體排放量 (噸CO2e/年)
  productCarbonFootprint: number; // 產品碳足跡 (kgCO2e/單位)
  scope1Emissions: number; // 範疇1排放量 (噸CO2e/年)
  scope2Emissions: number; // 範疇2排放量 (噸CO2e/年)
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

export type SupplierDataSource = 'default' | 'tsmc' | 'materials';

// 預設供應商數據（原有數據）
const defaultSuppliers: Supplier[] = [
  {
    id: "1",
    name: "新竹物流",
    companyId: "TW12345678",
    contact: "Alexander Johnson",
    email: "contact@hct.com.tw",
    phone: "02-2216-5589",
    address: "新北市新莊區新北大道三段7號",
    country: "台灣",
    vehicleCount: 3800,
    carbonData: {
      organizationalGHG: 52800.789,
      productCarbonFootprint: 0.859,
      scope1Emissions: 12500.2345,
      scope2Emissions: 35000.6789,
      scope4Emissions: 3800.9876,
      scope5Emissions: 1200.5432,
      scope6Emissions: 300.1111
    }
  },
  {
    id: "2",
    name: "統一速達",
    companyId: "TW23456789",
    contact: "Michael Chen",
    email: "info@t-cat.com.tw",
    phone: "02-2552-5525",
    address: "台北市大同區承德路三段210號",
    country: "台灣",
    vehicleCount: 2500,
    carbonData: {
      organizationalGHG: 38500.789,
      productCarbonFootprint: 0.7889,
      scope1Emissions: 8500.2345,
      scope2Emissions: 25000.6789,
      scope4Emissions: 3200.9876,
      scope5Emissions: 1400.5432,
      scope6Emissions: 400.1111
    }
  },
  {
    id: "3",
    name: "宅配通",
    companyId: "TW34567890",
    contact: "Sarah Williams",
    email: "contact@pelican.com.tw",
    phone: "02-2659-5511",
    address: "台北市南港區三重路66號",
    country: "台灣",
    vehicleCount: 2000,
    carbonData: {
      organizationalGHG: 31200.789,
      productCarbonFootprint: 0.8289,
      scope1Emissions: 7200.2345,
      scope2Emissions: 20000.6789,
      scope4Emissions: 2500.9876,
      scope5Emissions: 1100.5432,
      scope6Emissions: 400.1111
    }
  },
  {
    id: "4",
    name: "長榮國際儲運",
    companyId: "TW45678901",
    contact: "David Rodriguez",
    email: "service@evergreen.com.tw",
    phone: "02-2500-1800",
    address: "台北市松山區民生東路三段135號",
    country: "台灣",
    vehicleCount: 1500,
    carbonData: {
      organizationalGHG: 45600.789,
      productCarbonFootprint: 1.2589,
      scope1Emissions: 18000.2345,
      scope2Emissions: 22000.6789,
      scope4Emissions: 3200.9876,
      scope5Emissions: 1800.5432,
      scope6Emissions: 600.1111
    }
  },
  {
    id: "5",
    name: "台塑汽車貨運",
    companyId: "TW56789012",
    contact: "James Wilson",
    email: "info@fpcc-logistics.com.tw",
    phone: "02-2718-6168",
    address: "台北市松山區敦化北路201號",
    country: "台灣",
    vehicleCount: 1200,
    carbonData: {
      organizationalGHG: 28800.789,
      productCarbonFootprint: 0.9589,
      scope1Emissions: 8500.2345,
      scope2Emissions: 16000.6789,
      scope4Emissions: 2800.9876,
      scope5Emissions: 1200.5432,
      scope6Emissions: 300.1111
    }
  },
  {
    id: "6",
    name: "捷盛運輸",
    companyId: "TW67890123",
    contact: "Emily Davis",
    email: "contact@js-transport.com.tw",
    phone: "03-3868-1288",
    address: "桃園市蘆竹區南崁路二段337號",
    country: "台灣",
    vehicleCount: 1000,
    carbonData: {
      organizationalGHG: 22400.789,
      productCarbonFootprint: 0.8889,
      scope1Emissions: 6800.2345,
      scope2Emissions: 12500.6789,
      scope4Emissions: 2100.9876,
      scope5Emissions: 800.5432,
      scope6Emissions: 200.1111
    }
  },
  {
    id: "7",
    name: "統昶行銷",
    companyId: "TW78901234",
    contact: "Robert Martinez",
    email: "service@tonchang.com.tw",
    phone: "02-2269-5803",
    address: "新北市土城區中央路三段240號",
    country: "台灣",
    vehicleCount: 900,
    carbonData: {
      organizationalGHG: 19800.789,
      productCarbonFootprint: 0.7589,
      scope1Emissions: 5800.2345,
      scope2Emissions: 11000.6789,
      scope4Emissions: 1800.9876,
      scope5Emissions: 900.5432,
      scope6Emissions: 300.1111
    }
  },
  {
    id: "8",
    name: "捷盟行銷",
    companyId: "TW89012345",
    contact: "Jennifer Brown",
    email: "info@jme.com.tw",
    phone: "02-2999-6788",
    address: "新北市新店區中正路516號",
    country: "台灣",
    vehicleCount: 800,
    carbonData: {
      organizationalGHG: 17600.789,
      productCarbonFootprint: 0.7389,
      scope1Emissions: 5200.2345,
      scope2Emissions: 9800.6789,
      scope4Emissions: 1600.9876,
      scope5Emissions: 800.5432,
      scope6Emissions: 200.1111
    }
  },
  {
    id: "9",
    name: "大智通文化行銷",
    companyId: "TW90123456",
    contact: "Christopher Lee",
    email: "contact@dachi.com.tw",
    phone: "02-2531-3000",
    address: "台北市中山區建國北路二段258號",
    country: "台灣",
    vehicleCount: 700,
    carbonData: {
      organizationalGHG: 15400.789,
      productCarbonFootprint: 0.7189,
      scope1Emissions: 4600.2345,
      scope2Emissions: 8500.6789,
      scope4Emissions: 1400.9876,
      scope5Emissions: 700.5432,
      scope6Emissions: 200.1111
    }
  },
  {
    id: "10",
    name: "中國貨櫃運輸",
    companyId: "TW01234567",
    contact: "Amanda Taylor",
    email: "info@cmtlogistics.com.tw",
    phone: "02-2381-3456",
    address: "台北市中正區忠孝西路一段66號",
    country: "台灣",
    vehicleCount: 600,
    carbonData: {
      organizationalGHG: 26400.789,
      productCarbonFootprint: 1.4289,
      scope1Emissions: 8800.2345,
      scope2Emissions: 12000.6789,
      scope4Emissions: 3600.9876,
      scope5Emissions: 1600.5432,
      scope6Emissions: 400.1111
    }
  },
  {
    id: "11",
    name: "捷迅",
    companyId: "TW10987654",
    contact: "Daniel Anderson",
    email: "contact@jet-speed.com.tw",
    phone: "03-3932-333",
    address: "桃園市大園區三民路二段75號",
    country: "台灣",
    vehicleCount: 500,
    carbonData: {
      organizationalGHG: 12500.789,
      productCarbonFootprint: 0.6889,
      scope1Emissions: 3800.2345,
      scope2Emissions: 6700.6789,
      scope4Emissions: 1200.9876,
      scope5Emissions: 600.5432,
      scope6Emissions: 200.1111
    }
  },
  {
    id: "12",
    name: "裕國冷凍冷藏",
    companyId: "TW21098765",
    contact: "Jessica Thompson",
    email: "service@yukogroup.com.tw",
    phone: "02-2500-5500",
    address: "台北市南港區三重路19-3號",
    country: "台灣",
    vehicleCount: 400,
    carbonData: {
      organizationalGHG: 32800.789,
      productCarbonFootprint: 2.1589,
      scope1Emissions: 14000.2345,
      scope2Emissions: 15000.6789,
      scope4Emissions: 2400.9876,
      scope5Emissions: 1100.5432,
      scope6Emissions: 300.1111
    }
  },
  {
    id: "13",
    name: "台灣航空貨運承攬",
    companyId: "TW32109876",
    contact: "Matthew Garcia",
    email: "info@taiwanair-freight.com.tw",
    phone: "03-3931-3931",
    address: "桃園市大園區航勤北路3號",
    country: "台灣",
    vehicleCount: 300,
    carbonData: {
      organizationalGHG: 45800.789,
      productCarbonFootprint: 3.8589,
      scope1Emissions: 22000.2345,
      scope2Emissions: 18000.6789,
      scope4Emissions: 3200.9876,
      scope5Emissions: 2100.5432,
      scope6Emissions: 500.1111
    }
  },
  {
    id: "14",
    name: "好好國際物流",
    companyId: "TW43210987",
    contact: "Ashley White",
    email: "contact@goodgood-logistics.com.tw",
    phone: "02-2658-5858",
    address: "台北市大安區復興南路一段137號",
    country: "台灣",
    vehicleCount: 200,
    carbonData: {
      organizationalGHG: 18600.789,
      productCarbonFootprint: 1.6889,
      scope1Emissions: 6500.2345,
      scope2Emissions: 8800.6789,
      scope4Emissions: 2100.9876,
      scope5Emissions: 1000.5432,
      scope6Emissions: 200.1111
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
      organizationalGHG: 185000.789,
      productCarbonFootprint: 12.589,
      scope1Emissions: 45000.2345,
      scope2Emissions: 120000.6789,
      scope4Emissions: 12000.9876,
      scope5Emissions: 6000.5432,
      scope6Emissions: 2000.1111
    }
  },
  {
    id: "tsmc-2",
    name: "旭化成株式會社",
    companyId: "JP12345002",
    contact: "Ryan Tanaka",
    email: "info@asahi-kasei.co.jp",
    phone: "+81-3-3296-3000",
    address: "東京都千代田區有楽町1-1-2",
    country: "日本",
    carbonData: {
      organizationalGHG: 425000.789,
      productCarbonFootprint: 28.589,
      scope1Emissions: 165000.2345,
      scope2Emissions: 220000.6789,
      scope4Emissions: 25000.9876,
      scope5Emissions: 12000.5432,
      scope6Emissions: 3000.1111
    }
  },
  {
    id: "tsmc-3",
    name: "ASM台灣先藝科技股份有限公司",
    companyId: "TW12345003",
    contact: "Kevin Lin",
    email: "contact@asm.com.tw",
    phone: "03-563-1688",
    address: "新竹科學園區園區二路68號",
    country: "台灣",
    carbonData: {
      organizationalGHG: 98000.789,
      productCarbonFootprint: 8.289,
      scope1Emissions: 28000.2345,
      scope2Emissions: 55000.6789,
      scope4Emissions: 9000.9876,
      scope5Emissions: 4500.5432,
      scope6Emissions: 1500.1111
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
      organizationalGHG: 325000.789,
      productCarbonFootprint: 45.889,
      scope1Emissions: 85000.2345,
      scope2Emissions: 195000.6789,
      scope4Emissions: 28000.9876,
      scope5Emissions: 14000.5432,
      scope6Emissions: 3000.1111
    }
  },
  {
    id: "tsmc-5",
    name: "佳能股份有限公司",
    companyId: "JP12345005",
    contact: "Taro Sato",
    email: "contact@canon.co.jp",
    phone: "+81-3-3758-2111",
    address: "東京都大田區下丸子3-30-2",
    country: "日本",
    carbonData: {
      organizationalGHG: 156000.789,
      productCarbonFootprint: 15.889,
      scope1Emissions: 38000.2345,
      scope2Emissions: 95000.6789,
      scope4Emissions: 14000.9876,
      scope5Emissions: 7500.5432,
      scope6Emissions: 1500.1111
    }
  },
  {
    id: "tsmc-6",
    name: "達欣工程股份有限公司",
    companyId: "TW12345006",
    contact: "William Wang",
    email: "info@daxin.com.tw",
    phone: "02-2325-8833",
    address: "台北市中正區忠孝西路一段66號",
    country: "台灣",
    carbonData: {
      organizationalGHG: 78000.789,
      productCarbonFootprint: 5.289,
      scope1Emissions: 22000.2345,
      scope2Emissions: 45000.6789,
      scope4Emissions: 7000.9876,
      scope5Emissions: 3500.5432,
      scope6Emissions: 500.1111
    }
  },
  {
    id: "tsmc-7",
    name: "迪思科高科技股份有限公司",
    companyId: "TW12345007",
    contact: "Michelle Chen",
    email: "contact@disco.com.tw",
    phone: "03-567-8900",
    address: "新竹科學園區創新一路1號",
    country: "台灣",
    carbonData: {
      organizationalGHG: 145000.789,
      productCarbonFootprint: 18.589,
      scope1Emissions: 35000.2345,
      scope2Emissions: 85000.6789,
      scope4Emissions: 15000.9876,
      scope5Emissions: 8000.5432,
      scope6Emissions: 2000.1111
    }
  },
  {
    id: "tsmc-8",
    name: "信銘工業股份有限公司",
    companyId: "TW12345008",
    contact: "Samuel Lee",
    email: "info@sinming.com.tw",
    phone: "04-2359-5959",
    address: "台中市西屯區工業區路66號",
    country: "台灣",
    carbonData: {
      organizationalGHG: 125000.789,
      productCarbonFootprint: 11.889,
      scope1Emissions: 32000.2345,
      scope2Emissions: 75000.6789,
      scope4Emissions: 12000.9876,
      scope5Emissions: 5000.5432,
      scope6Emissions: 1000.1111
    }
  },
  {
    id: "tsmc-9",
    name: "JX金屬株式會社",
    companyId: "JP12345009",
    contact: "Hanako Yamada",
    email: "contact@jx-metals.co.jp",
    phone: "+81-3-6433-6000",
    address: "東京都千代田區大手町1-1-2",
    country: "日本",
    carbonData: {
      organizationalGHG: 285000.789,
      productCarbonFootprint: 35.889,
      scope1Emissions: 125000.2345,
      scope2Emissions: 135000.6789,
      scope4Emissions: 18000.9876,
      scope5Emissions: 6000.5432,
      scope6Emissions: 1000.1111
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
      organizationalGHG: 165000.789,
      productCarbonFootprint: 22.589,
      scope1Emissions: 42000.2345,
      scope2Emissions: 95000.6789,
      scope4Emissions: 18000.9876,
      scope5Emissions: 8000.5432,
      scope6Emissions: 2000.1111
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
      organizationalGHG: 198000.789,
      productCarbonFootprint: 28.589,
      scope1Emissions: 48000.2345,
      scope2Emissions: 115000.6789,
      scope4Emissions: 22000.9876,
      scope5Emissions: 10000.5432,
      scope6Emissions: 3000.1111
    }
  },
  {
    id: "tsmc-12",
    name: "李長榮集團",
    companyId: "TW12345012",
    contact: "Richard Lee",
    email: "info@lcygroup.com",
    phone: "07-731-5131",
    address: "高雄市大社區中山路1號",
    country: "台灣",
    carbonData: {
      organizationalGHG: 385000.789,
      productCarbonFootprint: 45.289,
      scope1Emissions: 185000.2345,
      scope2Emissions: 165000.6789,
      scope4Emissions: 25000.9876,
      scope5Emissions: 8000.5432,
      scope6Emissions: 2000.1111
    }
  },
  {
    id: "tsmc-13",
    name: "村田機械株式會社",
    companyId: "JP12345013",
    contact: "Ichiro Murata",
    email: "contact@muratec.co.jp",
    phone: "+81-75-672-8600",
    address: "京都府京都市伏見区竹田向代町136",
    country: "日本",
    carbonData: {
      organizationalGHG: 158000.789,
      productCarbonFootprint: 25.889,
      scope1Emissions: 38000.2345,
      scope2Emissions: 95000.6789,
      scope4Emissions: 16000.9876,
      scope5Emissions: 7000.5432,
      scope6Emissions: 2000.1111
    }
  },
  {
    id: "tsmc-14",
    name: "納美仕株式會社",
    companyId: "JP12345014",
    contact: "Jiro Takahashi",
    email: "info@nomura.co.jp",
    phone: "+81-3-3211-1811",
    address: "東京都中央區日本橋1-9-1",
    country: "日本",
    carbonData: {
      organizationalGHG: 128000.789,
      productCarbonFootprint: 18.589,
      scope1Emissions: 32000.2345,
      scope2Emissions: 78000.6789,
      scope4Emissions: 12000.9876,
      scope5Emissions: 5000.5432,
      scope6Emissions: 1000.1111
    }
  },
  {
    id: "tsmc-15",
    name: "紐富來科技股份有限公司",
    companyId: "TW12345015",
    contact: "Zachary Zhang",
    email: "contact@newfuture.com.tw",
    phone: "03-578-1234",
    address: "新竹科學園區力行路5號",
    country: "台灣",
    carbonData: {
      organizationalGHG: 89000.789,
      productCarbonFootprint: 12.889,
      scope1Emissions: 25000.2345,
      scope2Emissions: 52000.6789,
      scope4Emissions: 8000.9876,
      scope5Emissions: 3500.5432,
      scope6Emissions: 500.1111
    }
  },
  {
    id: "tsmc-16",
    name: "奧璐佳瑙科技",
    companyId: "TW12345016",
    contact: "Melanie Wang",
    email: "info@organo.com.tw",
    phone: "03-666-5555",
    address: "新竹科學園區園區一路15號",
    country: "台灣",
    carbonData: {
      organizationalGHG: 95000.789,
      productCarbonFootprint: 14.289,
      scope1Emissions: 26000.2345,
      scope2Emissions: 58000.6789,
      scope4Emissions: 7000.9876,
      scope5Emissions: 3500.5432,
      scope6Emissions: 500.1111
    }
  },
  {
    id: "tsmc-17",
    name: "辛耘企業股份有限公司",
    companyId: "TW12345017",
    contact: "Zachary Xin",
    email: "contact@sinyun.com.tw",
    phone: "03-567-8888",
    address: "新竹科學園區研發三路3號",
    country: "台灣",
    carbonData: {
      organizationalGHG: 78000.789,
      productCarbonFootprint: 9.889,
      scope1Emissions: 22000.2345,
      scope2Emissions: 45000.6789,
      scope4Emissions: 6500.9876,
      scope5Emissions: 3800.5432,
      scope6Emissions: 700.1111
    }
  },
  {
    id: "tsmc-18",
    name: "台灣迪恩士半導體科技股份有限公司",
    companyId: "TW12345018",
    contact: "Jason Chen",
    email: "info@dns-semi.com.tw",
    phone: "03-577-9000",
    address: "新竹科學園區研發路88號",
    country: "台灣",
    carbonData: {
      organizationalGHG: 142000.789,
      productCarbonFootprint: 19.589,
      scope1Emissions: 38000.2345,
      scope2Emissions: 85000.6789,
      scope4Emissions: 12000.9876,
      scope5Emissions: 6000.5432,
      scope6Emissions: 1000.1111
    }
  },
  {
    id: "tsmc-19",
    name: "芝浦先進科技股份有限公司",
    companyId: "TW12345019",
    contact: "Saburo Tanaka",
    email: "contact@shibaura.com.tw",
    phone: "03-563-7777",
    address: "新竹科學園區工業東路16號",
    country: "台灣",
    carbonData: {
      organizationalGHG: 118000.789,
      productCarbonFootprint: 16.889,
      scope1Emissions: 32000.2345,
      scope2Emissions: 72000.6789,
      scope4Emissions: 9000.9876,
      scope5Emissions: 4500.5432,
      scope6Emissions: 500.1111
    }
  },
  {
    id: "tsmc-20",
    name: "信越化學工業株式會社",
    companyId: "JP12345020",
    contact: "Ichiro Shinetsu",
    email: "contact@shinetsu.co.jp",
    phone: "+81-3-3246-5011",
    address: "東京都千代田區大手町2-6-1",
    country: "日本",
    carbonData: {
      organizationalGHG: 485000.789,
      productCarbonFootprint: 58.589,
      scope1Emissions: 225000.2345,
      scope2Emissions: 215000.6789,
      scope4Emissions: 32000.9876,
      scope5Emissions: 11000.5432,
      scope6Emissions: 2000.1111
    }
  },
  {
    id: "tsmc-21",
    name: "株式會社SUMCO",
    companyId: "JP12345021",
    contact: "Taro Sumitomo",
    email: "info@sumcosi.com",
    phone: "+81-3-3436-1616",
    address: "東京都港區台場2-3-1",
    country: "日本",
    carbonData: {
      organizationalGHG: 365000.789,
      productCarbonFootprint: 42.889,
      scope1Emissions: 185000.2345,
      scope2Emissions: 145000.6789,
      scope4Emissions: 25000.9876,
      scope5Emissions: 8000.5432,
      scope6Emissions: 2000.1111
    }
  },
  {
    id: "tsmc-22",
    name: "特諾本科技有限公司",
    companyId: "TW12345022",
    contact: "Benjamin Huang",
    email: "contact@tennor.com.tw",
    phone: "03-578-5678",
    address: "新竹科學園區創新二路2號",
    country: "台灣",
    carbonData: {
      organizationalGHG: 85000.789,
      productCarbonFootprint: 11.589,
      scope1Emissions: 24000.2345,
      scope2Emissions: 48000.6789,
      scope4Emissions: 8000.9876,
      scope5Emissions: 4000.5432,
      scope6Emissions: 1000.1111
    }
  },
  {
    id: "tsmc-23",
    name: "東京威力科創股份有限公司",
    companyId: "TW12345023",
    contact: "Taro Tokyo",
    email: "contact@tel.com.tw",
    phone: "03-577-6000",
    address: "新竹科學園區研發一路1號",
    country: "台灣",
    carbonData: {
      organizationalGHG: 225000.789,
      productCarbonFootprint: 32.589,
      scope1Emissions: 65000.2345,
      scope2Emissions: 125000.6789,
      scope4Emissions: 22000.9876,
      scope5Emissions: 11000.5432,
      scope6Emissions: 2000.1111
    }
  },
  {
    id: "tsmc-24",
    name: "日本東京応化工業株式会社",
    companyId: "JP12345024",
    contact: "Ichiro Oka",
    email: "info@tok.co.jp",
    phone: "+81-44-548-0500",
    address: "神奈川県川崎市中原区中丸子150",
    country: "日本",
    carbonData: {
      organizationalGHG: 195000.789,
      productCarbonFootprint: 28.889,
      scope1Emissions: 85000.2345,
      scope2Emissions: 85000.6789,
      scope4Emissions: 16000.9876,
      scope5Emissions: 7000.5432,
      scope6Emissions: 2000.1111
    }
  },
  {
    id: "tsmc-25",
    name: "崇越石英製造廠股份有限公司",
    companyId: "TW12345025",
    contact: "Ming Chong",
    email: "contact@fmqz.com.tw",
    phone: "03-597-1313",
    address: "新竹縣湖口鄉新竹工業區工業一路1號",
    country: "台灣",
    carbonData: {
      organizationalGHG: 168000.789,
      productCarbonFootprint: 25.589,
      scope1Emissions: 78000.2345,
      scope2Emissions: 72000.6789,
      scope4Emissions: 12000.9876,
      scope5Emissions: 5000.5432,
      scope6Emissions: 1000.1111
    }
  },
  {
    id: "tsmc-26",
    name: "東鋼鋼結構股份有限公司",
    companyId: "TW12345026",
    contact: "Qiang Dong",
    email: "info@tsteel.com.tw",
    phone: "07-611-8888",
    address: "高雄市路竹區中山路168號",
    country: "台灣",
    carbonData: {
      organizationalGHG: 285000.789,
      productCarbonFootprint: 48.589,
      scope1Emissions: 145000.2345,
      scope2Emissions: 105000.6789,
      scope4Emissions: 22000.9876,
      scope5Emissions: 10000.5432,
      scope6Emissions: 3000.1111
    }
  },
  {
    id: "tsmc-27",
    name: "漢唐集成股份有限公司",
    companyId: "TW12345027",
    contact: "Wei Han",
    email: "contact@sinteck.com.tw",
    phone: "03-516-5555",
    address: "新竹科學園區研發路110號",
    country: "台灣",
    carbonData: {
      organizationalGHG: 125000.789,
      productCarbonFootprint: 18.289,
      scope1Emissions: 35000.2345,
      scope2Emissions: 72000.6789,
      scope4Emissions: 12000.9876,
      scope5Emissions: 5000.5432,
      scope6Emissions: 1000.1111
    }
  }
];

// Case 3: 材料製造業供應商數據
const materialsSuppliers: Supplier[] = [
  {
    id: "materials-1",
    name: "Formo Steel Materials Co.",
    companyId: "TW30000001",
    contact: "Jonathan Lin",
    email: "contact@formosteel.com",
    phone: "04-2358-5555",
    address: "台中市西屯區工業區38路168號",
    country: "Taiwan",
    carbonData: {
      organizationalGHG: 892000.789,
      productCarbonFootprint: 1890.589,
      scope1Emissions: 534000.2345,
      scope2Emissions: 267600.6789,
      scope4Emissions: 45200.9876,
      scope5Emissions: 31680.5432,
      scope6Emissions: 13520.1111
    }
  },
  {
    id: "materials-2",
    name: "GreenAlu Metals Corp.",
    companyId: "TW30000002",
    contact: "Susan Wang",
    email: "contact@greenalu.com",
    phone: "07-351-8888",
    address: "高雄市楠梓區興楠路105號",
    country: "Taiwan",
    carbonData: {
      organizationalGHG: 345000.789,
      productCarbonFootprint: 1245.889,
      scope1Emissions: 172500.2345,
      scope2Emissions: 138000.6789,
      scope4Emissions: 17250.9876,
      scope5Emissions: 12075.5432,
      scope6Emissions: 5175.1111
    }
  },
  {
    id: "materials-3",
    name: "CopperLink Industries",
    companyId: "TW30000003",
    contact: "Minghui Li",
    email: "contact@copperlink.com",
    phone: "02-2658-7777",
    address: "新北市樹林區俊英街86號",
    country: "Taiwan",
    carbonData: {
      organizationalGHG: 567000.789,
      productCarbonFootprint: 3456.289,
      scope1Emissions: 283500.2345,
      scope2Emissions: 204120.6789,
      scope4Emissions: 28350.9876,
      scope5Emissions: 39690.5432,
      scope6Emissions: 11340.1111
    }
  },
  {
    id: "materials-4",
    name: "TitanMax Alloys Ltd.",
    companyId: "TW30000004",
    contact: "Zhiming Chen",
    email: "contact@titanmax.com",
    phone: "03-452-9999",
    address: "桃園市中壢區中華路二段568號",
    country: "Taiwan",
    carbonData: {
      organizationalGHG: 1235000.789,
      productCarbonFootprint: 8945.689,
      scope1Emissions: 741000.2345,
      scope2Emissions: 371000.6789,
      scope4Emissions: 61750.9876,
      scope5Emissions: 43225.5432,
      scope6Emissions: 18525.1111
    }
  },
  {
    id: "materials-5",
    name: "NickelOne Resources",
    companyId: "TW30000005",
    contact: "Meiru Huang",
    email: "contact@nickelone.com",
    phone: "06-298-5555",
    address: "台南市安南區工業一路235號",
    country: "Taiwan",
    carbonData: {
      organizationalGHG: 456000.789,
      productCarbonFootprint: 2678.989,
      scope1Emissions: 228000.2345,
      scope2Emissions: 164160.6789,
      scope4Emissions: 22800.9876,
      scope5Emissions: 31920.5432,
      scope6Emissions: 9120.1111
    }
  },
  {
    id: "materials-6",
    name: "RareEarth Elements Ltd.",
    companyId: "TW30000006",
    contact: "Guoqiang Zhang",
    email: "contact@rareearth.com",
    phone: "037-582-6666",
    address: "苗栗縣竹南鎮科學路158號",
    country: "Taiwan",
    carbonData: {
      organizationalGHG: 234000.789,
      productCarbonFootprint: 156.789,
      scope1Emissions: 140400.2345,
      scope2Emissions: 70200.6789,
      scope4Emissions: 11700.9876,
      scope5Emissions: 8190.5432,
      scope6Emissions: 3510.1111
    }
  },
  {
    id: "materials-7",
    name: "LithoMet Mining Group",
    companyId: "TW30000007",
    contact: "Jiancheng Liu",
    email: "contact@lithomet.com",
    phone: "05-552-7777",
    address: "雲林縣斗六市工業路126號",
    country: "Taiwan",
    carbonData: {
      organizationalGHG: 189000.789,
      productCarbonFootprint: 4567.389,
      scope1Emissions: 75600.2345,
      scope2Emissions: 83160.6789,
      scope4Emissions: 9450.9876,
      scope5Emissions: 13230.5432,
      scope6Emissions: 7560.1111
    }
  },
  {
    id: "materials-8",
    name: "CobaltCore Materials",
    companyId: "TW30000008",
    contact: "Jiafen Wu",
    email: "contact@cobaltcore.com",
    phone: "049-225-8888",
    address: "南投縣南投市工業南路89號",
    country: "Taiwan",
    carbonData: {
      organizationalGHG: 298000.789,
      productCarbonFootprint: 7834.589,
      scope1Emissions: 149000.2345,
      scope2Emissions: 107280.6789,
      scope4Emissions: 14900.9876,
      scope5Emissions: 20860.5432,
      scope6Emissions: 5960.1111
    }
  },
  {
    id: "materials-9",
    name: "Graphenex Advanced Carbon",
    companyId: "TW30000009",
    contact: "Zhihao Xu",
    email: "contact@graphenex.com",
    phone: "03-591-5555",
    address: "新竹縣竹北市科技七路198號",
    country: "Taiwan",
    carbonData: {
      organizationalGHG: 145000.789,
      productCarbonFootprint: 89.389,
      scope1Emissions: 58000.2345,
      scope2Emissions: 64120.6789,
      scope4Emissions: 7250.9876,
      scope5Emissions: 10150.5432,
      scope6Emissions: 5480.1111
    }
  },
  {
    id: "materials-10",
    name: "EverChem Petrochemicals Ltd.",
    companyId: "TW30000010",
    contact: "Yawen Chen",
    email: "contact@everchem.com",
    phone: "07-781-9999",
    address: "高雄市大寮區鳳林三路555號",
    country: "Taiwan",
    carbonData: {
      organizationalGHG: 1456000.789,
      productCarbonFootprint: 2345.789,
      scope1Emissions: 728000.2345,
      scope2Emissions: 583680.6789,
      scope4Emissions: 72800.9876,
      scope5Emissions: 101920.5432,
      scope6Emissions: 29600.1111
    }
  },
  {
    id: "materials-11",
    name: "NovaPlas Polymers",
    companyId: "TW30000011",
    contact: "Wenjie Zhao",
    email: "contact@novaplas.com",
    phone: "04-835-7777",
    address: "彰化縣和美鎮工業路268號",
    country: "Taiwan",
    carbonData: {
      organizationalGHG: 678000.789,
      productCarbonFootprint: 2890.489,
      scope1Emissions: 339000.2345,
      scope2Emissions: 244080.6789,
      scope4Emissions: 33900.9876,
      scope5Emissions: 47460.5432,
      scope6Emissions: 13560.1111
    }
  },
  {
    id: "materials-12",
    name: "PolyCycle Replastics",
    companyId: "TW30000012",
    contact: "Jiaying Liu",
    email: "contact@polycycle.com",
    phone: "02-2999-8888",
    address: "新北市新店區寶橋路165號",
    country: "Taiwan",
    carbonData: {
      organizationalGHG: 234000.789,
      productCarbonFootprint: 956.889,
      scope1Emissions: 117000.2345,
      scope2Emissions: 84240.6789,
      scope4Emissions: 11700.9876,
      scope5Emissions: 16380.5432,
      scope6Emissions: 4680.1111
    }
  },
  {
    id: "materials-13",
    name: "CarbonFiber Advanced Materials",
    companyId: "TW30000013",
    contact: "Weide Qiu",
    email: "contact@carbonfiber.com",
    phone: "03-378-6666",
    address: "桃園市大園區航空城工業一路369號",
    country: "Taiwan",
    carbonData: {
      organizationalGHG: 789000.789,
      productCarbonFootprint: 67.989,
      scope1Emissions: 394500.2345,
      scope2Emissions: 284040.6789,
      scope4Emissions: 39450.9876,
      scope5Emissions: 55230.5432,
      scope6Emissions: 15780.1111
    }
  },
  {
    id: "materials-14",
    name: "OptiGlass Technology Inc.",
    companyId: "TW30000014",
    contact: "Zhihui Yang",
    email: "contact@optiglass.com",
    phone: "03-666-9999",
    address: "新竹科學園區研發五路188號",
    country: "Taiwan",
    carbonData: {
      organizationalGHG: 456000.789,
      productCarbonFootprint: 45.689,
      scope1Emissions: 228000.2345,
      scope2Emissions: 164160.6789,
      scope4Emissions: 22800.9876,
      scope5Emissions: 31920.5432,
      scope6Emissions: 9120.1111
    }
  },
  {
    id: "materials-15",
    name: "ClearSilica Mining Co.",
    companyId: "TW30000015",
    contact: "Chengen Zheng",
    email: "contact@clearsilica.com",
    phone: "037-485-7777",
    address: "苗栗縣頭份市工業二路125號",
    country: "Taiwan",
    carbonData: {
      organizationalGHG: 323000.789,
      productCarbonFootprint: 567.389,
      scope1Emissions: 161500.2345,
      scope2Emissions: 116280.6789,
      scope4Emissions: 16150.9876,
      scope5Emissions: 22610.5432,
      scope6Emissions: 6460.1111
    }
  },
  {
    id: "materials-16",
    name: "CeramiX Materials Group",
    companyId: "TW30000016",
    contact: "Limin Xie",
    email: "contact@ceramix.com",
    phone: "02-2696-5555",
    address: "新北市汐止區康寧街268號",
    country: "Taiwan",
    carbonData: {
      organizationalGHG: 398000.789,
      productCarbonFootprint: 2456.789,
      scope1Emissions: 199000.2345,
      scope2Emissions: 143280.6789,
      scope4Emissions: 19900.9876,
      scope5Emissions: 27860.5432,
      scope6Emissions: 7960.1111
    }
  },
  {
    id: "materials-17",
    name: "Silicore Semiconductor Materials",
    companyId: "TW30000017",
    contact: "Zhihua Lin",
    email: "contact@silicore.com",
    phone: "03-563-8888",
    address: "新竹科學園區工業東路88號",
    country: "Taiwan",
    carbonData: {
      organizationalGHG: 867000.789,
      productCarbonFootprint: 89.489,
      scope1Emissions: 433500.2345,
      scope2Emissions: 312120.6789,
      scope4Emissions: 43350.9876,
      scope5Emissions: 60690.5432,
      scope6Emissions: 17340.1111
    }
  },
  {
    id: "materials-18",
    name: "WaferTech Materials Ltd.",
    companyId: "TW30000018",
    contact: "Meihui Zhang",
    email: "contact@wafertech.com",
    phone: "03-577-9999",
    address: "新竹科學園區創新路168號",
    country: "Taiwan",
    carbonData: {
      organizationalGHG: 654000.789,
      productCarbonFootprint: 76.889,
      scope1Emissions: 327000.2345,
      scope2Emissions: 235440.6789,
      scope4Emissions: 32700.9876,
      scope5Emissions: 45780.5432,
      scope6Emissions: 13080.1111
    }
  },
  {
    id: "materials-19",
    name: "InnoChip Substrates",
    companyId: "TW30000019",
    contact: "Dehua Liu",
    email: "contact@innochip.com",
    phone: "03-578-7777",
    address: "新竹科學園區力行路268號",
    country: "Taiwan",
    carbonData: {
      organizationalGHG: 498000.789,
      productCarbonFootprint: 124.689,
      scope1Emissions: 249000.2345,
      scope2Emissions: 179280.6789,
      scope4Emissions: 24900.9876,
      scope5Emissions: 34860.5432,
      scope6Emissions: 9960.1111
    }
  },
  {
    id: "materials-20",
    name: "BondAlloy Solderworks",
    companyId: "TW30000020",
    contact: "Zhiming Wang",
    email: "contact@bondalloy.com",
    phone: "02-2267-8888",
    address: "新北市土城區工業一路89號",
    country: "Taiwan",
    carbonData: {
      organizationalGHG: 287000.789,
      productCarbonFootprint: 18.989,
      scope1Emissions: 143500.2345,
      scope2Emissions: 103320.6789,
      scope4Emissions: 14350.9876,
      scope5Emissions: 20080.5432,
      scope6Emissions: 5750.1111
    }
  },
  {
    id: "materials-21",
    name: "FlexCopper Foils",
    companyId: "TW30000021",
    contact: "Yaling Chen",
    email: "contact@flexcopper.com",
    phone: "03-486-9999",
    address: "桃園市楊梅區工業三路168號",
    country: "Taiwan",
    carbonData: {
      organizationalGHG: 432000.789,
      productCarbonFootprint: 34.789,
      scope1Emissions: 216000.2345,
      scope2Emissions: 155520.6789,
      scope4Emissions: 21600.9876,
      scope5Emissions: 30240.5432,
      scope6Emissions: 8640.1111
    }
  },
  {
    id: "materials-22",
    name: "AltiGlass Displays",
    companyId: "TW30000022",
    contact: "Jianguo Su",
    email: "contact@altiglass.com",
    phone: "04-2358-7777",
    address: "台中市西屯區福科路268號",
    country: "Taiwan",
    carbonData: {
      organizationalGHG: 598000.789,
      productCarbonFootprint: 56.889,
      scope1Emissions: 299000.2345,
      scope2Emissions: 215280.6789,
      scope4Emissions: 29900.9876,
      scope5Emissions: 41860.5432,
      scope6Emissions: 11960.1111
    }
  },
  {
    id: "materials-23",
    name: "NanoPowder Chemicals",
    companyId: "TW30000023",
    contact: "Zhicheng Lu",
    email: "contact@nanopowder.com",
    phone: "07-695-8888",
    address: "高雄市路竹區科學路189號",
    country: "Taiwan",
    carbonData: {
      organizationalGHG: 167000.789,
      productCarbonFootprint: 23.489,
      scope1Emissions: 83500.2345,
      scope2Emissions: 60120.6789,
      scope4Emissions: 8350.9876,
      scope5Emissions: 11690.5432,
      scope6Emissions: 3340.1111
    }
  },
  {
    id: "materials-24",
    name: "ThermoResin Compounds",
    companyId: "TW30000024",
    contact: "Yating Xu",
    email: "contact@thermoresin.com",
    phone: "06-236-9999",
    address: "台南市永康區環工路268號",
    country: "Taiwan",
    carbonData: {
      organizationalGHG: 534000.789,
      productCarbonFootprint: 3567.889,
      scope1Emissions: 267000.2345,
      scope2Emissions: 192240.6789,
      scope4Emissions: 26700.9876,
      scope5Emissions: 37380.5432,
      scope6Emissions: 10680.1111
    }
  },
  {
    id: "materials-25",
    name: "BioPolymer Solutions",
    companyId: "TW30000025",
    contact: "Meihua Zhu",
    email: "contact@biopolymer.com",
    phone: "04-852-7777",
    address: "彰化縣溪湖鎮工業東路198號",
    country: "Taiwan",
    carbonData: {
      organizationalGHG: 156000.789,
      productCarbonFootprint: 856.789,
      scope1Emissions: 78000.2345,
      scope2Emissions: 56160.6789,
      scope4Emissions: 7800.9876,
      scope5Emissions: 10920.5432,
      scope6Emissions: 3120.1111
    }
  },
  {
    id: "materials-26",
    name: "GreenTex Fibers",
    companyId: "TW30000026",
    contact: "Zhiqiang He",
    email: "contact@greentex.com",
    phone: "05-532-8888",
    address: "雲林縣虎尾鎮工業路365號",
    country: "Taiwan",
    carbonData: {
      organizationalGHG: 289000.789,
      productCarbonFootprint: 1234.589,
      scope1Emissions: 144500.2345,
      scope2Emissions: 104040.6789,
      scope4Emissions: 14450.9876,
      scope5Emissions: 20230.5432,
      scope6Emissions: 5780.1111
    }
  },
  {
    id: "materials-27",
    name: "HardCarb Industrial Minerals",
    companyId: "TW30000027",
    contact: "Zhiwei Wen",
    email: "contact@hardcarb.com",
    phone: "08-739-9999",
    address: "屏東縣屏東市工業區路268號",
    country: "Taiwan",
    carbonData: {
      organizationalGHG: 756000.789,
      productCarbonFootprint: 4567.889,
      scope1Emissions: 378000.2345,
      scope2Emissions: 272160.6789,
      scope4Emissions: 37800.9876,
      scope5Emissions: 52920.5432,
      scope6Emissions: 15120.1111
    }
  },
  {
    id: "materials-28",
    name: "ZircoMat Ceramics",
    companyId: "TW30000028",
    contact: "Meiling Shen",
    email: "contact@zircomat.com",
    phone: "03-495-7777",
    address: "桃園市龍潭區工業一路168號",
    country: "Taiwan",
    carbonData: {
      organizationalGHG: 445000.789,
      productCarbonFootprint: 3245.689,
      scope1Emissions: 222500.2345,
      scope2Emissions: 160200.6789,
      scope4Emissions: 22250.9876,
      scope5Emissions: 31150.5432,
      scope6Emissions: 8900.1111
    }
  },
  {
    id: "materials-29",
    name: "PhosChem Specialty Ltd.",
    companyId: "TW30000029",
    contact: "Jianmin Huang",
    email: "contact@phoschem.com",
    phone: "07-371-8888",
    address: "高雄市仁武區工業三路89號",
    country: "Taiwan",
    carbonData: {
      organizationalGHG: 234000.789,
      productCarbonFootprint: 1567.989,
      scope1Emissions: 117000.2345,
      scope2Emissions: 84240.6789,
      scope4Emissions: 11700.9876,
      scope5Emissions: 16380.5432,
      scope6Emissions: 4680.1111
    }
  },
  {
    id: "materials-30",
    name: "MagnetX Materials",
    companyId: "TW30000030",
    contact: "Zhihao Ma",
    email: "contact@magnetx.com",
    phone: "02-2698-9999",
    address: "新北市汐止區新台五路一段268號",
    country: "Taiwan",
    carbonData: {
      organizationalGHG: 678000.789,
      productCarbonFootprint: 234.589,
      scope1Emissions: 339000.2345,
      scope2Emissions: 244080.6789,
      scope4Emissions: 33900.9876,
      scope5Emissions: 47460.5432,
      scope6Emissions: 13560.1111
    }
  }
];

export function getSuppliers(source: SupplierDataSource): Supplier[] {
  switch (source) {
    case 'tsmc':
      return tsmcSuppliers;
    case 'materials':
      return materialsSuppliers;
    case 'default':
    default:
      return defaultSuppliers;
  }
}

export const dataSourceOptions = [
  { value: 'default', label: 'Case1' },
  { value: 'tsmc', label: 'Case2' },
  { value: 'materials', label: 'Case3' }
] as const; 