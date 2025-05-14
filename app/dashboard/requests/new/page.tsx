"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { CalendarIcon, Check, ChevronsUpDown, Search, Eye } from "lucide-react"
import { format } from "date-fns"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

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
import { useForm } from "react-hook-form"
import { toast } from "@/components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

// 模擬供應商數據
const suppliers = [
  {
    id: "1",
    name: "台灣電子股份有限公司",
    email: "contact@taiwanelectronics.com",
    boundary: "上游",
  },
  {
    id: "2",
    name: "綠能科技有限公司",
    email: "info@greentechltd.com",
    boundary: "上游",
  },
  {
    id: "3",
    name: "永續材料工業股份有限公司",
    email: "contact@sustainablematerials.com",
    boundary: "上游",
  },
  {
    id: "4",
    name: "龍芯半導體股份有限公司",
    email: "contact@dragonsemi.com",
    boundary: "上游",
  },
  {
    id: "5",
    name: "聯合物流有限公司",
    email: "service@unionlogistics.com",
    boundary: "下游",
  },
  {
    id: "6",
    name: "環保塑膠製品有限公司",
    email: "info@ecoplastics.com",
    boundary: "上游",
  },
  {
    id: "7",
    name: "國際能源集團",
    email: "inquiry@internationalenergy.com",
    boundary: "營運",
  },
]

// 數據類型選項
const dataTypes = [
  {
    id: "company-info",
    label: "基本資訊",
  },
  {
    id: "organizational-carbon",
    label: "組織溫室氣體",
  },
  {
    id: "product-carbon",
    label: "產品碳足跡",
  },
]

// 原材料選項
const rawMaterials = [
  { id: "M011", label: "M011 – H型鋼" },
  { id: "M01234", label: "M01234 – A型鋼" },
  { id: "M012", label: "M012 – B型鋼" },
  { id: "M013", label: "M013 – C型鋼" },
  { id: "M014", label: "M014 – D型鋼" },
  { id: "M05", label: "M05 – E型鋼" },
]

// 邊界選項
const boundaries = ["全部", "上游", "營運", "下游"]

// 重新定義表單驗證模式
const requestSchema = z.object({
  title: z.string().min(1, "要求名稱不能為空").max(50, "要求名稱最長為50字元"),
  description: z.string().optional(),
  dataType: z.string().min(1, "請選擇要求類別"),
  isRequired: z.boolean().default(true),
  reminderDays: z.string(),
  deadline: z.date({
    required_error: "請選擇截止日期",
  }),
  materials: z.array(z.string()).optional(),
});

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
type RequestValues = z.infer<typeof requestSchema>;
type FormValues = z.infer<typeof formSchema>;

export default function NewRequestPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState<number>(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedBoundary, setSelectedBoundary] = useState("全部")
  const [previewOpen, setPreviewOpen] = useState(false)
  const [requests, setRequests] = useState<RequestValues[]>([
    {
      title: "供應商基本資訊",
      description: "",
      dataType: "company-info",
      isRequired: true,
      reminderDays: "1",
      deadline: new Date(new Date().setMonth(new Date().getMonth() + 1)),
      materials: [],
    }
  ])
  const [currentRequestIndex, setCurrentRequestIndex] = useState(0)

  // 設置表單
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      suppliers: [],
      requests: requests,
    },
  })

  // 更新表單中的請求
  useEffect(() => {
    form.setValue("requests", requests);
  }, [form, requests]);

  // 過濾供應商
  const filteredSuppliers = suppliers.filter(
    (supplier) =>
      (supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        supplier.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedBoundary === "全部" || supplier.boundary === selectedBoundary)
  )

  // 下一步的邏輯
  const handleNextStep = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // 阻止可能的表單提交
    if (currentStep === 1) {
      const suppliers = form.getValues().suppliers;
      if (suppliers.length === 0) {
        toast({
          title: "錯誤",
          description: "請至少選擇一個供應商",
          variant: "destructive",
        });
        return;
      }
      setCurrentStep(2);
    }
  }

  // 上一步
  const handlePrevStep = () => {
    setCurrentStep(1);
  }

  // 添加新請求
  const addNewRequest = () => {
    const newRequest: RequestValues = {
      title: "",
      description: "",
      dataType: "company-info",
      isRequired: true,
      reminderDays: "1",
      deadline: new Date(new Date().setMonth(new Date().getMonth() + 1)),
      materials: [],
    };
    
    setRequests([...requests, newRequest]);
    setCurrentRequestIndex(requests.length);
  };

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
    newRequests[index] = { ...newRequests[index], ...data };
    setRequests(newRequests);
  };

  // 複製請求
  const duplicateRequest = (index: number) => {
    const requestToDuplicate = requests[index];
    const duplicatedRequest = { ...requestToDuplicate, title: `${requestToDuplicate.title} (複製)` };
    setRequests([...requests, duplicatedRequest]);
    setCurrentRequestIndex(requests.length);
  };

  // 提交表單
  const onSubmit = (data: FormValues) => {
    try {      
      console.log("提交的數據:", data);
      
      toast({
        title: "成功",
        description: "數據要求已創建",
      });

      // 強制重定向到請求列表頁面
      router.push("/dashboard/requests");
    } catch (error) {
      console.error("Submit error:", error);
      toast({
        title: "錯誤",
        description: "創建數據要求時發生錯誤",
        variant: "destructive",
      });
    }
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
            {values.suppliers.slice(0, 5).map((supplier) => (
              <li key={supplier.id}>{supplier.name}</li>
            ))}
            {values.suppliers.length > 5 && (
              <li>...以及其他 {values.suppliers.length - 5} 家供應商</li>
            )}
          </ul>
        </div>
        
        <div className="border-t pt-4">
          <h3 className="text-md font-medium mb-2">數據要求 ({values.requests.length})</h3>
          {values.requests.map((request, index) => {
            const selectedDataType = dataTypes.find(type => type.id === request.dataType)?.label || "";
            
            return (
              <div key={index} className="border rounded-md p-4 mb-4">
                <h4 className="font-medium">{index + 1}. {request.title || "未命名要求"}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                  <div>
                    <p className="text-sm font-medium">要求類別:</p>
                    <p className="text-sm text-muted-foreground">{selectedDataType}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">是否必填:</p>
                    <p className="text-sm text-muted-foreground">{request.isRequired ? "是" : "否"}</p>
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
                {request.dataType === "product-carbon" && request.materials && request.materials.length > 0 && (
                  <div className="mt-2">
                    <p className="text-sm font-medium">原材料:</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {request.materials.map(materialId => {
                        const material = rawMaterials.find(m => m.id === materialId);
                        return (
                          <Badge key={materialId} variant="secondary" className="text-xs">
                            {material?.label || materialId}
                          </Badge>
                        );
                      })}
                    </div>
                  </div>
                )}
                {request.description && (
                  <div className="mt-2">
                    <p className="text-sm font-medium">描述:</p>
                    <p className="text-sm text-muted-foreground">{request.description}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // 渲染當前編輯的請求表單
  const renderRequestForm = (requestIndex: number) => {
    const currentRequest = requests[requestIndex];
    
    if (!currentRequest) return null;
    
    return (
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">
            編輯請求 #{requestIndex + 1}
          </h3>
          <div className="flex space-x-2">
            <Button 
              type="button" 
              variant="outline" 
              size="sm"
              onClick={() => duplicateRequest(requestIndex)}
            >
              複製
            </Button>
            <Button 
              type="button" 
              variant="destructive" 
              size="sm"
              onClick={() => deleteRequest(requestIndex)}
            >
              刪除
            </Button>
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <FormLabel htmlFor={`request-${requestIndex}-title`}>要求名稱</FormLabel>
            <Input 
              id={`request-${requestIndex}-title`}
              value={currentRequest.title}
              onChange={(e) => updateRequest(requestIndex, { title: e.target.value })}
              placeholder="輸入數據要求標題"
            />
            <p className="text-sm text-muted-foreground mt-1">
              為您的數據要求提供一個描述性標題（最多50字元）
            </p>
          </div>
          
          <div>
            <FormLabel htmlFor={`request-${requestIndex}-description`}>描述（選填）</FormLabel>
            <Textarea 
              id={`request-${requestIndex}-description`}
              value={currentRequest.description || ''}
              onChange={(e) => updateRequest(requestIndex, { description: e.target.value })}
              placeholder="輸入數據要求描述"
              rows={3}
            />
            <p className="text-sm text-muted-foreground mt-1">
              提供更詳細的說明
            </p>
          </div>
          
          <div>
            <FormLabel htmlFor={`request-${requestIndex}-dataType`}>要求類別</FormLabel>
            <Select 
              value={currentRequest.dataType}
              onValueChange={(value) => updateRequest(requestIndex, { dataType: value, materials: [] })}
            >
              <SelectTrigger id={`request-${requestIndex}-dataType`}>
                <SelectValue placeholder="選擇要求類別" />
              </SelectTrigger>
              <SelectContent>
                {dataTypes.map((type) => (
                  <SelectItem key={type.id} value={type.id}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground mt-1">
              選擇您要向供應商要求的數據類型
            </p>
          </div>
          
          <div className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
            <Checkbox
              id={`request-${requestIndex}-isRequired`}
              checked={currentRequest.isRequired}
              onCheckedChange={(checked) => 
                updateRequest(requestIndex, { isRequired: checked === true })
              }
            />
            <div className="space-y-1 leading-none">
              <label
                htmlFor={`request-${requestIndex}-isRequired`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                必填要求
              </label>
              <p className="text-sm text-muted-foreground">
                選擇此項將要求供應商必須提交此要求的數據
              </p>
            </div>
          </div>
          
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
            <div>
              <FormLabel htmlFor={`request-${requestIndex}-deadline`}>截止日期</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id={`request-${requestIndex}-deadline`}
                    variant={"outline"}
                    className={cn(
                      "w-full pl-3 text-left font-normal",
                      !currentRequest.deadline && "text-muted-foreground"
                    )}
                  >
                    {currentRequest.deadline ? (
                      format(currentRequest.deadline, "yyyy-MM-dd")
                    ) : (
                      <span>選擇日期</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={currentRequest.deadline}
                    onSelect={(date) => updateRequest(requestIndex, { deadline: date as Date })}
                    disabled={(date) =>
                      date < new Date(new Date().setHours(0, 0, 0, 0))
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <p className="text-sm text-muted-foreground mt-1">
                設定供應商需要回應的截止日期
              </p>
            </div>
            
            <div>
              <FormLabel htmlFor={`request-${requestIndex}-reminderDays`}>截止日前提醒</FormLabel>
              <Select 
                value={currentRequest.reminderDays}
                onValueChange={(value) => updateRequest(requestIndex, { reminderDays: value })}
              >
                <SelectTrigger id={`request-${requestIndex}-reminderDays`}>
                  <SelectValue placeholder="選擇提醒時間" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">無提醒</SelectItem>
                  <SelectItem value="1">1天前</SelectItem>
                  <SelectItem value="3">3天前</SelectItem>
                  <SelectItem value="7">1週前</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground mt-1">
                系統會在截止日前自動發送提醒
              </p>
            </div>
          </div>
          
          {/* 針對產品碳足跡類型顯示原材料選擇 */}
          {currentRequest.dataType === "product-carbon" && (
            <div>
              <FormLabel>原材料</FormLabel>
              <div className="border rounded-md p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {rawMaterials.map((material) => (
                    <div key={material.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`material-${requestIndex}-${material.id}`}
                        checked={currentRequest.materials?.includes(material.id)}
                        onCheckedChange={(checked) => {
                          const currentMaterials = currentRequest.materials || [];
                          let newMaterials;
                          
                          if (checked) {
                            newMaterials = [...currentMaterials, material.id];
                          } else {
                            newMaterials = currentMaterials.filter(id => id !== material.id);
                          }
                          
                          updateRequest(requestIndex, { materials: newMaterials });
                        }}
                      />
                      <label
                        htmlFor={`material-${requestIndex}-${material.id}`}
                        className="text-sm"
                      >
                        {material.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                選擇需要供應商提供碳足跡信息的原材料
              </p>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">創建數據要求</h1>
          <p className="text-sm text-muted-foreground">
            向您的供應商發送數據要求
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            {currentStep === 1 && "第一步：選擇供應商"}
            {currentStep === 2 && "第二步：輸入要求資訊"}
          </CardTitle>
          <CardDescription>
            {currentStep === 1 && "查看邊界供應商清單並選擇要發送要求的供應商"}
            {currentStep === 2 && "設定要求內容、截止日期和提醒設定"}
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form id="request-form" onSubmit={(e) => {
            if (currentStep !== 2) {
              e.preventDefault();
              return;
            }
            
            // 進行表單驗證
            const formData = form.getValues();
            let hasError = false;
            
            if (formData.suppliers.length === 0) {
              toast({
                title: "錯誤",
                description: "請至少選擇一個供應商",
                variant: "destructive",
              });
              hasError = true;
            }
            
            if (formData.requests.length === 0) {
              toast({
                title: "錯誤",
                description: "請至少添加一個數據要求",
                variant: "destructive",
              });
              hasError = true;
            }
            
            let requestErrors = false;
            formData.requests.forEach((request, index) => {
              if (!request.title) {
                toast({
                  title: "錯誤",
                  description: `請求 #${index+1} 缺少標題`,
                  variant: "destructive",
                });
                requestErrors = true;
              }
              if (!request.dataType) {
                toast({
                  title: "錯誤",
                  description: `請求 #${index+1} 缺少要求類別`,
                  variant: "destructive",
                });
                requestErrors = true;
              }
              if (!request.deadline) {
                toast({
                  title: "錯誤",
                  description: `請求 #${index+1} 缺少截止日期`,
                  variant: "destructive",
                });
                requestErrors = true;
              }
            });
            
            if (hasError || requestErrors) {
              e.preventDefault();
              return;
            }
            
            const submitData: FormValues = {
              suppliers: formData.suppliers,
              requests: formData.requests
            };
            onSubmit(submitData);
            e.preventDefault();
          }}>
            <CardContent className="space-y-6">
              {/* 第一步：選擇供應商 */}
              {currentStep === 1 && (
                <>
                  <div className="flex space-x-2 items-center">
                    <h3 className="text-md font-medium">邊界供應商清單</h3>
                    <Badge variant="outline" className="ml-2">
                      {filteredSuppliers.length} 家供應商
                    </Badge>
                    
                    <div className="ml-auto flex space-x-2">
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm"
                        onClick={selectAllSuppliers}
                      >
                        全選
                      </Button>
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm"
                        onClick={deselectAllSuppliers}
                      >
                        取消全選
                      </Button>
                    </div>
                  </div>
                
                  <div className="flex flex-col sm:flex-row gap-4">
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
                                <TableHead>邊界</TableHead>
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
                                    (selected) => selected.id === supplier.id
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
                                                  (item) => item.id !== supplier.id
                                                );
                                            field.onChange(newValue);
                                          }}
                                        />
                                      </TableCell>
                                      <TableCell>{supplier.name}</TableCell>
                                      <TableCell>{supplier.email}</TableCell>
                                      <TableCell>{supplier.boundary}</TableCell>
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
                </>
              )}

              {/* 第二步：輸入要求資訊 */}
              {currentStep === 2 && (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium">
                      數據要求設置 ({requests.length})
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
                          預覽所有請求內容
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
                </>
              )}
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
                <Button type="submit">
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
