"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { CalendarIcon, Check, ChevronsUpDown, Search, Eye, Info as InfoIcon } from "lucide-react"
import { format } from "date-fns"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm, SubmitHandler, Control } from "react-hook-form"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { TooltipProvider } from "@/components/ui/tooltip"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { toast } from "@/components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

// 模擬供應商數據
const suppliers = [
  {
    id: "1",
    name: "新竹物流",
    email: "contact@hct.com.tw",
    boundary: "上游",
  },
  {
    id: "2",
    name: "統一速達",
    email: "info@t-cat.com.tw",
    boundary: "上游",
  },
  {
    id: "3",
    name: "宅配通",
    email: "contact@pelican.com.tw",
    boundary: "上游",
  },
  {
    id: "4",
    name: "長榮國際儲運",
    email: "service@evergreen.com.tw",
    boundary: "上游",
  },
  {
    id: "5",
    name: "台塑汽車貨運",
    email: "info@fpcc-logistics.com.tw",
    boundary: "下游",
  },
  {
    id: "6",
    name: "捷盛運輸",
    email: "contact@js-transport.com.tw",
    boundary: "上游",
  },
  {
    id: "7",
    name: "統昶行銷",
    email: "service@tonchang.com.tw",
    boundary: "營運",
  },
]

// 數據類型選項
const dataTypes = [
  {
    id: "organizational-carbon",
    label: "組織溫室氣體排放",
  },
  {
    id: "product-carbon",
    label: "產品碳足跡",
  },
  {
    id: "service-carbon",
    label: "服務碳足跡",
  }
]

// 數據類型描述
const dataTypeDescriptions = {
  "organizational-carbon": "收集供應商組織層級的溫室氣體排放資訊，包含類別1-6的排放數據(單位：tCO2e)",
  "product-carbon": "收集供應商產品的碳足跡資訊，包含生命週期各階段的排放數據",
  "service-carbon": "收集供應商服務的碳足跡資訊，包含運輸服務的排放數據"
}

// 定義請求值類型
interface RequestValues {
  title: string;
  description?: string;
  dataType: string;
  isRequired: boolean;
  reminderDays: string;
  deadline: Date;
  // 組織溫室氣體排放相關欄位
  category1?: string;
  category2?: string;
  category3?: string;
  category4?: string;
  category5?: string;
  category6?: string;
  // 產品碳足跡相關欄位
  raw_material?: string;
  life_cycle?: string;
  product_carbon_footprint?: string;
  raw_material_stage?: string;
  manufacturing_stage?: string;
  usage_stage?: string;
  disposal_stage?: string;
  // 服務碳足跡相關欄位
  transport_service?: string;
  // 必填欄位控制
  fieldRequirements?: Record<string, boolean>;
  [key: string]: any;
}

// 定義欄位類型
interface Field {
  id: string;
  label: string;
  type?: "text" | "number" | "select";
  unit?: string;
  options?: Array<{ id: string; label: string }>;
}

// 原材料選項
const rawMaterials = [
  { id: "M011", label: "M011 – H型鋼" },
  { id: "M01234", label: "M01234 – A型鋼" },
  { id: "M012", label: "M012 – B型鋼" },
  { id: "M013", label: "M013 – C型鋼" },
  { id: "M014", label: "M014 – D型鋼" },
  { id: "M05", label: "M05 – E型鋼" },
]

// 組織溫室氣體排放欄位
const organizationalFields: Field[] = [
  { id: "category1", label: "範疇1排放量", type: "number", unit: "tCO2e" },
  { id: "category2", label: "範疇2排放量", type: "number", unit: "tCO2e" },
  { id: "category3", label: "範疇3排放量", type: "number", unit: "tCO2e" },
  // { id: "category4", label: "類別4排放量", type: "number", unit: "tCO2e" },
  // { id: "category5", label: "類別5排放量", type: "number", unit: "tCO2e" },
  // { id: "category6", label: "類別6排放量", type: "number", unit: "tCO2e" }
]

// 產品碳足跡欄位
const productFields: Field[] = [
  { id: "raw_material", label: "原物料", type: "select", options: rawMaterials },
  { id: "life_cycle", label: "生命週期", type: "text" },
  { id: "product_carbon_footprint", label: "產品碳足跡", type: "number", unit: "kgCO2e/單位" },
  { id: "raw_material_stage", label: "原物料階段", type: "number", unit: "kgCO2e/單位" },
  { id: "manufacturing_stage", label: "製造階段", type: "number", unit: "kgCO2e/單位" },
  { id: "usage_stage", label: "使用階段", type: "number", unit: "kgCO2e/單位" },
  { id: "disposal_stage", label: "廢棄階段", type: "number", unit: "kgCO2e/單位" }
]

// 服務碳足跡欄位
const serviceFields: Field[] = [
  { id: "transport_service", label: "貨運服務碳足跡", type: "number", unit: "kgCO2e/噸公里" }
]

// 邊界選項
const boundaries = ["全部", "上游", "營運", "下游"]

// 更新請求模式
const requestSchema = z.object({
  title: z.string().min(1, "要求名稱不能為空").max(50, "要求名稱最長為50字元"),
  description: z.string().optional(),
  dataType: z.string().min(1, "請選擇要求類別"),
  isRequired: z.boolean().default(true),
  reminderDays: z.string(),
  deadline: z.date({
    required_error: "請選擇截止日期",
  }),
  // 組織溫室氣體排放相關欄位
  category1: z.string().optional(),
  category2: z.string().optional(),
  category3: z.string().optional(),
  category4: z.string().optional(),
  category5: z.string().optional(),
  category6: z.string().optional(),
  // 產品碳足跡相關欄位
  raw_material: z.string().optional(),
  life_cycle: z.string().optional(),
  product_carbon_footprint: z.string().optional(),
  raw_material_stage: z.string().optional(),
  manufacturing_stage: z.string().optional(),
  usage_stage: z.string().optional(),
  disposal_stage: z.string().optional(),
  // 服務碳足跡相關欄位
  transport_service: z.string().optional(),
  // 必填欄位控制
  fieldRequirements: z.record(z.boolean()).optional(),
}).passthrough();

const formSchema = z.object({
  suppliers: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      email: z.string(),
    })
  ).min(1, "請至少選擇一個供應商"),
  requests: z.array(requestSchema).min(1, "請至少添加一個數據要求"),
});

// 確保類型定義與 schema 一致
type FormValues = z.infer<typeof formSchema>;

export default function NewRequestPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState<number>(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedBoundary, setSelectedBoundary] = useState("全部")
  const [previewOpen, setPreviewOpen] = useState(false)
  const [selectedDataType, setSelectedDataType] = useState<string>("")
  const [requests, setRequests] = useState<RequestValues[]>([
    {
      title: "",
      description: "",
      dataType: "",
      isRequired: true,
      reminderDays: "1",
      deadline: new Date(new Date().setMonth(new Date().getMonth() + 1)),
      // 初始化所有可能的欄位
      category1: "0",
      category2: "0",
      category3: "0",
      category4: "0",
      category5: "0",
      category6: "0",
      raw_material: "",
      life_cycle: "",
      product_carbon_footprint: "0",
      raw_material_stage: "0",
      manufacturing_stage: "0",
      usage_stage: "0",
      disposal_stage: "0",
      transport_service: "0",
      fieldRequirements: {}
    }
  ])
  const [currentRequestIndex, setCurrentRequestIndex] = useState(0)

  // 從 localStorage 載入 case 設定
  useEffect(() => {
    const savedDataSource = localStorage.getItem('supplier-data-source') as "default" | "tsmc";
    if (savedDataSource && (savedDataSource === 'default' || savedDataSource === 'tsmc')) {
      // 根據 case 設定更新相關狀態
      if (savedDataSource === "tsmc") {
        // 更新產品碳足跡相關的欄位
        setRequests(prev => prev.map(request => ({
          ...request,
          raw_material: request.raw_material || "",
          life_cycle: request.life_cycle || "",
          product_carbon_footprint: request.product_carbon_footprint || "0",
          raw_material_stage: request.raw_material_stage || "0",
          manufacturing_stage: request.manufacturing_stage || "0",
          usage_stage: request.usage_stage || "0",
          disposal_stage: request.disposal_stage || "0"
        })));
      } else {
        // 更新服務碳足跡相關的欄位
        setRequests(prev => prev.map(request => ({
          ...request,
          transport_service: request.transport_service || "0"
        })));
      }
    }
  }, []);

  // 設置表單
  const form = useForm({
    // @ts-ignore - 忽略類型不匹配
    resolver: zodResolver(formSchema),
    defaultValues: {
      suppliers: [],
      requests: requests.map(request => ({
        ...request,
        isRequired: true, // 確保所有請求的 isRequired 屬性都是 true
        deadline: new Date(request.deadline),
      })),
    },
  }) as any;

  // 更新表單中的請求
  useEffect(() => {
    form.setValue("requests", requests.map(request => ({
      ...request,
      isRequired: true,
    })));
  }, [form, requests]);

  // 選擇數據類型後更新所有請求的dataType
  useEffect(() => {
    if (selectedDataType) {
      const updatedRequests = requests.map(request => ({
        ...request,
        dataType: selectedDataType,
        title: request.title || dataTypes.find(t => t.id === selectedDataType)?.label || "",
      }));
      setRequests(updatedRequests);
    }
  }, [selectedDataType]);

  // 過濾供應商
  const filteredSuppliers = suppliers.filter(
    (supplier) =>
      (supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        supplier.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedBoundary === "全部" || supplier.boundary === selectedBoundary)
  )

  // 添加新請求
  const addNewRequest = () => {
    const newRequest: RequestValues = {
      title: dataTypes.find(t => t.id === selectedDataType)?.label || "",
      description: "",
      dataType: selectedDataType,
      isRequired: true,
      reminderDays: "1",
      deadline: new Date(new Date().setMonth(new Date().getMonth() + 1)),
      // 組織溫室氣體排放相關欄位
      category1: "0",
      category2: "0",
      category3: "0",
      category4: "0",
      category5: "0",
      category6: "0",
      // 產品碳足跡相關欄位
      raw_material: "",
      life_cycle: "",
      product_carbon_footprint: "0",
      raw_material_stage: "0",
      manufacturing_stage: "0",
      usage_stage: "0",
      disposal_stage: "0",
      // 服務碳足跡相關欄位
      transport_service: "0",
      // 必填欄位控制
      fieldRequirements: {}
    };
    setRequests([...requests, newRequest]);
    setCurrentRequestIndex(requests.length);
  }

  // 刪除請求
  const deleteRequest = (index: number) => {
    if (requests.length === 1) {
      toast({
        title: "警告",
        description: "請至少保留一個數據要求",
        variant: "destructive",
      });
      return;
    }
    
    const newRequests = [...requests];
    newRequests.splice(index, 1);
    setRequests(newRequests);
    
    if (currentRequestIndex >= newRequests.length) {
      setCurrentRequestIndex(newRequests.length - 1);
    }
  };

  // 更新請求數據
  const updateRequest = (index: number, data: Partial<RequestValues>) => {
    const newRequests = [...requests];
    
    // 如果更新的是數據類型，初始化相關欄位
    if (data.dataType) {
      if (data.dataType === "organizational-carbon") {
        // 設置組織溫室氣體排放量相關欄位的預設值
        newRequests[index] = { 
          ...newRequests[index], 
          ...data,
          title: "組織溫室氣體排放量",
          category1: newRequests[index].category1 || "0",
          category2: newRequests[index].category2 || "0",
          category3: newRequests[index].category3 || "0",
          category4: newRequests[index].category4 || "0",
          category5: newRequests[index].category5 || "0",
          category6: newRequests[index].category6 || "0",
          raw_material: "",
          life_cycle: "",
          product_carbon_footprint: "",
          raw_material_stage: "",
          manufacturing_stage: "",
          usage_stage: "",
          disposal_stage: "",
          transport_service: "",
          fieldRequirements: {}
        };
      } else if (data.dataType === "product-carbon") {
        // 設置產品碳足跡相關欄位的預設值
        newRequests[index] = { 
          ...newRequests[index], 
          ...data,
          title: "產品碳足跡",
          category1: "",
          category2: "",
          category3: "",
          category4: "",
          category5: "",
          category6: "",
          raw_material: newRequests[index].raw_material || "",
          life_cycle: newRequests[index].life_cycle || "",
          product_carbon_footprint: newRequests[index].product_carbon_footprint || "0",
          raw_material_stage: newRequests[index].raw_material_stage || "0",
          manufacturing_stage: newRequests[index].manufacturing_stage || "0",
          usage_stage: newRequests[index].usage_stage || "0",
          disposal_stage: newRequests[index].disposal_stage || "0",
          transport_service: "",
          fieldRequirements: {}
        };
      } else if (data.dataType === "service-carbon") {
        newRequests[index] = { 
          ...newRequests[index], 
          ...data,
          title: "服務碳足跡",
          category1: "",
          category2: "",
          category3: "",
          category4: "",
          category5: "",
          category6: "",
          raw_material: "",
          life_cycle: "",
          product_carbon_footprint: "",
          raw_material_stage: "",
          manufacturing_stage: "",
          usage_stage: "",
          disposal_stage: "",
          transport_service: newRequests[index].transport_service || "0",
          fieldRequirements: {}
        };
      } else {
        newRequests[index] = { ...newRequests[index], ...data };
      }
    } else {
      newRequests[index] = { ...newRequests[index], ...data };
    }
    
    setRequests(newRequests);
  };

  // 複製請求
  const duplicateRequest = (index: number) => {
    const requestToDuplicate = requests[index];
    const duplicatedRequest = { ...requestToDuplicate, title: `${requestToDuplicate.title} (複製)` };
    setRequests([...requests, duplicatedRequest]);
    setCurrentRequestIndex(requests.length);
  };

  // 表單提交處理
  const onSubmit = (data: FormValues) => {
    console.log("提交的表單數據", data);
    toast({
      title: "提交成功",
      description: `已向 ${data.suppliers.length} 家供應商發送 ${data.requests.length} 個數據要求`,
    });
    router.push("/dashboard/requests");
  };

  // 全選供應商
  const selectAllSuppliers = () => {
    const selectedSuppliers = filteredSuppliers.map(supplier => ({
      id: supplier.id,
      name: supplier.name,
      email: supplier.email,
    }));
    form.setValue("suppliers", selectedSuppliers);
  };

  // 取消全選
  const deselectAllSuppliers = () => {
    form.setValue("suppliers", []);
  };

  // 開啟預覽
  const handleOpenPreview = () => {
    setPreviewOpen(true);
  };

  // 顯示要求預覽
  const renderFormPreview = () => {
    const values = form.getValues();
    
    return (
      <div className="space-y-6 p-4 max-h-[60vh] overflow-y-auto">
        <div>
          <h3 className="text-md font-medium">選擇的供應商 ({values.suppliers.length})</h3>
          <ul className="text-sm text-muted-foreground mt-2">
            {values.suppliers.slice(0, 5).map((supplier: {id: string, name: string}) => (
              <li key={supplier.id}>{supplier.name}</li>
            ))}
            {values.suppliers.length > 5 && (
              <li>...以及其他 {values.suppliers.length - 5} 家供應商</li>
            )}
          </ul>
        </div>
        
        <div className="border-t pt-4">
          <h3 className="text-md font-medium mb-2">數據要求 ({values.requests.length})</h3>
          {values.requests.map((request: RequestValues, index: number) => {
            const selectedDataType = dataTypes.find(type => type.id === request.dataType)?.label || "";
            
            return (
              <div key={index} className="border rounded-md p-4 mb-4">
                <h4 className="font-medium">{index + 1}. {request.title || "未命名要求"}</h4>
                
                {request.description && (
                  <div className="mt-2 mb-3">
                    <p className="text-sm text-muted-foreground">{request.description}</p>
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                  <div>
                    <p className="text-sm font-medium">要求類別:</p>
                    <p className="text-sm text-muted-foreground">{selectedDataType}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">截止日期:</p>
                    <p className="text-sm text-muted-foreground">
                      {request.deadline ? format(request.deadline, "yyyy-MM-dd") : "未設定"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">提醒設定:</p>
                    <p className="text-sm text-muted-foreground">
                      {request.reminderDays === "0" ? "無提醒" : 
                      request.reminderDays === "1" ? "1天前" : 
                      request.reminderDays === "3" ? "3天前" : 
                      request.reminderDays === "7" ? "1週前" : "未設定"}
                    </p>
                  </div>
                </div>
                
                {/* 顯示組織溫室氣體排放量欄位 */}
                {request.dataType === "organizational-carbon" && (
                  <div className="mt-3 border-t pt-3">
                    <p className="text-sm font-medium">組織溫室氣體排放量(單位：tCO2e):</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-1">
                      <div>
                        <p className="text-xs font-medium">範疇1排放量:</p>
                        <p className="text-sm text-muted-foreground">{request.category1 || '0'}</p>
                        <Badge variant={request.fieldRequirements?.category1 ? "default" : "outline"} className="mt-1">
                          {request.fieldRequirements?.category1 ? "必填" : "選填"}
                        </Badge>
                      </div>
                      <div>
                        <p className="text-xs font-medium">範疇2排放量:</p>
                        <p className="text-sm text-muted-foreground">{request.category2 || '0'}</p>
                        <Badge variant={request.fieldRequirements?.category2 ? "default" : "outline"} className="mt-1">
                          {request.fieldRequirements?.category2 ? "必填" : "選填"}
                        </Badge>
                      </div>
                      <div>
                        <p className="text-xs font-medium">範疇3排放量:</p>
                        <p className="text-sm text-muted-foreground">{request.category3 || '0'}</p>
                        <Badge variant={request.fieldRequirements?.category3 ? "default" : "outline"} className="mt-1">
                          {request.fieldRequirements?.category3 ? "必填" : "選填"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* 顯示產品碳足跡欄位 */}
                {request.dataType === "product-carbon" && (
                  <div className="mt-3 border-t pt-3">
                    <p className="text-sm font-medium">產品碳足跡(單位：kgCO2e/噸公里):</p>
                    <div className="mt-1">
                      <p className="text-xs font-medium">貨運服務碳足跡:</p>
                      <p className="text-sm text-muted-foreground">{request.transport_service || '0'}</p>
                      <Badge variant={request.fieldRequirements?.transport_service ? "default" : "outline"} className="mt-1">
                        {request.fieldRequirements?.transport_service ? "必填" : "選填"}
                      </Badge>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // 渲染欄位函數
  const renderField = (field: Field, requestIndex: number) => {
    const currentRequest = requests[requestIndex];
    const isRequired = currentRequest.fieldRequirements?.[field.id] || false;
    const fieldValue = currentRequest[field.id as keyof RequestValues];

    return (
      <div key={field.id} className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="font-medium">{field.label}</div>
            {field.unit && (
              <span className="text-sm text-muted-foreground">
                ({field.unit})
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <FormLabel htmlFor={`request-${requestIndex}-${field.id}-required`}>必填</FormLabel>
            <Checkbox
              id={`request-${requestIndex}-${field.id}-required`}
              checked={isRequired}
              onCheckedChange={(checked) => {
                const newFieldRequirements = {
                  ...currentRequest.fieldRequirements,
                  [field.id]: checked === true
                };
                updateRequest(requestIndex, { fieldRequirements: newFieldRequirements });
              }}
            />
          </div>
        </div>

        {field.type === "select" && field.options && (
          <Select
            value={fieldValue?.toString() || ""}
            onValueChange={(value) => 
              updateRequest(requestIndex, { [field.id]: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder={`請選擇${field.label}`} />
            </SelectTrigger>
            <SelectContent>
              {field.options.map((option) => (
                <SelectItem key={option.id} value={option.id}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        {field.type === "number" && (
          <Input
            type="number"
            value={fieldValue?.toString() || ""}
            onChange={(e) => updateRequest(requestIndex, { [field.id]: e.target.value })}
            placeholder={`請輸入${field.label}`}
          />
        )}

        {field.type === "text" && (
          <Input
            type="text"
            value={fieldValue?.toString() || ""}
            onChange={(e) => updateRequest(requestIndex, { [field.id]: e.target.value })}
            placeholder={`請輸入${field.label}`}
          />
        )}
      </div>
    );
  };

  // 渲染當前編輯的請求表單
  const renderRequestForm = (requestIndex: number) => {
    const currentRequest = requests[requestIndex];

    if (!currentRequest) return null;

    const renderFields = (fields: Field[]) => {
      return fields.map((field) => renderField(field, requestIndex));
    };

    return (
      <div className="space-y-6">
        <div>
          <FormLabel htmlFor={`request-${requestIndex}-title`}>數據要求名稱</FormLabel>
          <Input
            id={`request-${requestIndex}-title`}
            value={currentRequest.title}
            onChange={(e) => updateRequest(requestIndex, { title: e.target.value })}
            placeholder="請輸入數據要求名稱"
          />
        </div>

        <div>
          <FormLabel htmlFor={`request-${requestIndex}-description`}>描述</FormLabel>
          <Textarea
            id={`request-${requestIndex}-description`}
            value={currentRequest.description}
            onChange={(e) => updateRequest(requestIndex, { description: e.target.value })}
            placeholder="請輸入數據要求的描述"
          />
        </div>

        <div>
          <FormLabel htmlFor={`request-${requestIndex}-dataType`}>要求類型</FormLabel>
          <Select
            value={currentRequest.dataType}
            onValueChange={(value) => updateRequest(requestIndex, { dataType: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="請選擇要求類型" />
            </SelectTrigger>
            <SelectContent>
              {dataTypes.map((type) => (
                <SelectItem key={type.id} value={type.id}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {currentRequest.dataType && (
            <p className="text-sm text-muted-foreground mt-1">
              {dataTypeDescriptions[currentRequest.dataType as keyof typeof dataTypeDescriptions]}
            </p>
          )}
        </div>

        <div>
          <FormLabel htmlFor={`request-${requestIndex}-deadline`}>截止日期</FormLabel>
          <div className="flex items-center gap-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-[240px] justify-start text-left font-normal",
                    !currentRequest.deadline && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {currentRequest.deadline ? (
                    format(currentRequest.deadline, "yyyy-MM-dd")
                  ) : (
                    <span>選擇日期</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={currentRequest.deadline}
                  onSelect={(date) => date && updateRequest(requestIndex, { deadline: date })}
                  disabled={(date) =>
                    date < new Date() || date < new Date("1900-01-01")
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>

            <Select
              value={currentRequest.reminderDays}
              onValueChange={(value) => updateRequest(requestIndex, { reminderDays: value })}
            >
              <SelectTrigger className="w-[240px]">
                <SelectValue placeholder="選擇提醒時間" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">提前1天提醒</SelectItem>
                <SelectItem value="3">提前3天提醒</SelectItem>
                <SelectItem value="7">提前7天提醒</SelectItem>
                <SelectItem value="14">提前14天提醒</SelectItem>
                <SelectItem value="30">提前30天提醒</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            系統會在截止日前自動發送提醒
          </p>
        </div>

        {currentRequest.dataType === "organizational-carbon" && (
          <div className="border rounded-md p-4 space-y-4">
            <h4 className="font-medium mb-2">組織溫室氣體排放量(單位：tCO2e)</h4>
            {renderFields(organizationalFields)}
          </div>
        )}

        {currentRequest.dataType === "product-carbon" && (
          <div className="border rounded-md p-4 space-y-4">
            <h4 className="font-medium mb-2">產品碳足跡</h4>
            {renderFields(productFields)}
          </div>
        )}

        {currentRequest.dataType === "service-carbon" && (
          <div className="border rounded-md p-4 space-y-4">
            <h4 className="font-medium mb-2">服務碳足跡</h4>
            {renderFields(serviceFields)}
          </div>
        )}
      </div>
    );
  };

  // 下一步的邏輯
  const handleNextStep = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // 阻止可能的表單提交
    
    if (currentStep === 1) {
      // 檢查是否有設置了數據要求
      if (requests.length === 0 || requests.some(request => !request.dataType)) {
        toast({
          title: "錯誤",
          description: "請設置至少一個數據要求並選擇要求類型",
          variant: "destructive",
        });
        return;
      }
      setCurrentStep(2);
    }
  }

  // 上一步
  const handlePrevStep = () => {
    if (currentStep === 2) {
      setCurrentStep(1);
    }
  }

  return (
    <div className="max-w-5xl mx-auto">
      <Card className="m-4">
        <CardHeader>
          <CardTitle>建立數據要求</CardTitle>
          <CardDescription>向您的供應商發送數據收集請求</CardDescription>
        </CardHeader>
        <Form {...form}>
          {/* @ts-ignore - 忽略類型不匹配 */}
          <form onSubmit={form.handleSubmit((data) => onSubmit(data))}>
            <CardContent className="space-y-6">
              {/* 步驟指示器 */}
              <div className="flex justify-between mb-8">
                <div className="flex space-x-4">
                  <div className={`flex items-center space-x-2 ${currentStep >= 1 ? 'text-primary' : 'text-muted-foreground'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 1 ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                      1
                    </div>
                    <span>數據要求設置</span>
                  </div>
                  <div className="w-8 h-1 bg-muted self-center"></div>
                  <div className={`flex items-center space-x-2 ${currentStep >= 2 ? 'text-primary' : 'text-muted-foreground'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 2 ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                      2
                    </div>
                    <span>選擇供應商</span>
                  </div>
                </div>
              </div>

              <TooltipProvider>
                {/* 第一步：數據要求設置 */}
                {currentStep === 1 && (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium">
                        數據要求設置
                      </h3>
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm" 
                        onClick={addNewRequest}
                      >
                        添加請求
                      </Button>
                    </div>
                    
                    {requests.length > 0 && (
                      <div className="grid grid-cols-1 gap-4">
                        <Tabs 
                          value={String(currentRequestIndex)} 
                          onValueChange={(value) => setCurrentRequestIndex(parseInt(value))}
                        >
                          <TabsList className="w-full h-auto flex-wrap">
                            {requests.map((request, index) => (
                              <TabsTrigger key={index} value={String(index)} className="flex-grow">
                                {request.title || `請求 #${index+1}`}
                              </TabsTrigger>
                            ))}
                          </TabsList>
                          
                          {requests.map((_, index) => (
                            <TabsContent key={index} value={String(index)} className="mt-4">
                              {renderRequestForm(index)}
                            </TabsContent>
                          ))}
                        </Tabs>
                      </div>
                    )}
                    
                    <div className="mt-4">
                      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
                        <DialogTrigger asChild>
                          <Button type="button" variant="outline" onClick={handleOpenPreview}>
                            <Eye className="mr-2 h-4 w-4" />
                            預覽要求內容
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-lg">
                          <DialogHeader>
                            <DialogTitle>要求內容預覽</DialogTitle>
                            <DialogDescription>
                              此為供應商將收到的所有要求內容預覽
                            </DialogDescription>
                          </DialogHeader>
                          {renderFormPreview()}
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                )}
                
                {/* 第二步：選擇供應商 */}
                {currentStep === 2 && (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium">選擇供應商</h3>
                      <div className="flex gap-2">
                        <Button type="button" variant="outline" size="sm" onClick={selectAllSuppliers}>
                          全選
                        </Button>
                        <Button type="button" variant="outline" size="sm" onClick={deselectAllSuppliers}>
                          取消全選
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4 mb-4">
                      <div className="relative flex-1">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="search"
                          placeholder="搜尋供應商名稱或信箱..."
                          className="pl-8"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                      <Select
                        value={selectedBoundary}
                        onValueChange={setSelectedBoundary}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="選擇邊界" />
                        </SelectTrigger>
                        <SelectContent>
                          {boundaries.map((boundary) => (
                            <SelectItem key={boundary} value={boundary}>
                              {boundary}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <FormField
                      // @ts-ignore - 忽略類型不匹配
                      control={form.control}
                      name="suppliers"
                      render={({ field }) => (
                        <FormItem>
                          <div className="border rounded-md">
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead className="w-12">選擇</TableHead>
                                  <TableHead>供應商名稱</TableHead>
                                  <TableHead>電子郵件</TableHead>
                                  {/* <TableHead>邊界</TableHead> */}
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {filteredSuppliers.length === 0 ? (
                                  <TableRow>
                                    <TableCell colSpan={4} className="text-center text-muted-foreground">
                                      無符合條件的供應商
                                    </TableCell>
                                  </TableRow>
                                ) : (
                                  filteredSuppliers.map((supplier) => {
                                    const isSelected = field.value?.some(
                                      (selected: {id: string}) => selected.id === supplier.id
                                    );
                                    return (
                                      <TableRow key={supplier.id}>
                                        <TableCell>
                                          <Checkbox
                                            checked={isSelected}
                                            onCheckedChange={(checked) => {
                                              const newValue = checked
                                                ? [
                                                    ...field.value,
                                                    {
                                                      id: supplier.id,
                                                      name: supplier.name,
                                                      email: supplier.email,
                                                    },
                                                  ]
                                                : field.value.filter(
                                                    (item: {id: string}) => item.id !== supplier.id
                                                  );
                                              field.onChange(newValue);
                                            }}
                                          />
                                        </TableCell>
                                        <TableCell>{supplier.name}</TableCell>
                                        <TableCell>{supplier.email}</TableCell>
                                        {/* <TableCell>{supplier.boundary}</TableCell> */}
                                      </TableRow>
                                    );
                                  })
                                )}
                              </TableBody>
                            </Table>
                          </div>
                          <div className="mt-2">
                            <Badge variant="secondary">
                              已選擇 {field.value?.length || 0} 家供應商
                            </Badge>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}
              </TooltipProvider>
            </CardContent>
            <div className="flex justify-between px-6 pb-6">
              {currentStep === 1 ? (
                <Button type="button" variant="outline" onClick={() => router.back()}>
                  取消
                </Button>
              ) : (
                <Button type="button" variant="outline" onClick={handlePrevStep}>
                  上一步
                </Button>
              )}
              {currentStep === 1 ? (
                <Button type="button" onClick={handleNextStep}>
                  下一步
                </Button>
              ) : (
                <Button 
                  type="submit"
                  onClick={(e) => {
                    const suppliers = form.getValues().suppliers;
                    if (suppliers.length === 0) {
                      e.preventDefault();
                      toast({
                        title: "錯誤",
                        description: "請至少選擇一個供應商",
                        variant: "destructive",
                      });
                    }
                  }}
                >
                  送出要求
                </Button>
              )}
            </div>
          </form>
        </Form>
      </Card>
    </div>
  )
}
