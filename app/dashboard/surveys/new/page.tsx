"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { CalendarIcon, ChevronDown, FileUp, Plus, Trash2 } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { toast } from "@/components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const questionTypes = [
  { id: "textField", name: "文字欄位" },
  { id: "numberField", name: "數字欄位" },
  { id: "datePicker", name: "日期選擇" },
  { id: "dateRangePicker", name: "日期範圍" },
  { id: "dropdown", name: "下拉選單" },
  { id: "uploader", name: "檔案上傳" },
  { id: "singleChoice", name: "單選題" },
  { id: "multipleChoice", name: "多選題" },
  { id: "text", name: "長文字回答" },
  { id: "rating", name: "評分題" },
]

// 問題模板
const questionTemplates = [
  // 供應商基本資訊
  { 
    id: "basic1", 
    text: "公司名稱 (Company name)", 
    type: "textField",
    category: "供應商基本資訊",
  },
  { 
    id: "basic2", 
    text: "公司ID (Company IDs)", 
    type: "textField",
    category: "供應商基本資訊",
    description: "系統產出",
  },
  { 
    id: "basic3", 
    text: "地點 (Location)", 
    type: "textField",
    category: "供應商基本資訊",
  },
  { 
    id: "basic4", 
    text: "聯絡窗口 (Contact Person)", 
    type: "textField",
    category: "供應商基本資訊",
  },
  { 
    id: "basic5", 
    text: "Email", 
    type: "textField",
    category: "供應商基本資訊",
  },
  { 
    id: "basic6", 
    text: "產品或服務名稱 (Product/Service Name)", 
    type: "textField",
    category: "供應商基本資訊",
  },
  { 
    id: "basic7", 
    text: "提供本公司之比例 (%)", 
    type: "numberField",
    category: "供應商基本資訊",
  },
  { 
    id: "basic8", 
    text: "比例計算方式（營收占比）", 
    type: "textField",
    category: "供應商基本資訊",
  },
  
  // 組織溫盤資訊
  { 
    id: "ghg1", 
    text: "盤查期間 (inventory period)", 
    type: "datePicker",
    category: "組織溫盤資訊",
  },
  { 
    id: "ghg2", 
    text: "採用標準 (Standard)", 
    type: "dropdown",
    category: "組織溫盤資訊",
    options: ["ISO 14064-1:2018", "GHG Protocol", "其他"]
  },
  { 
    id: "ghg3", 
    text: "邊界 (Boundary)", 
    type: "textField",
    category: "組織溫盤資訊",
  },
  { 
    id: "ghg4", 
    text: "總排放量 (total emission).000 tCO2e", 
    type: "numberField",
    category: "組織溫盤資訊",
  },
  { 
    id: "ghg5", 
    text: "類別1排放量 (Catgory 1).000 tCO2e", 
    type: "numberField", 
    category: "組織溫盤資訊",
  },
  { 
    id: "ghg6", 
    text: "類別2排放量 (Catgory 2).000 tCO2e", 
    type: "numberField",
    category: "組織溫盤資訊",
  },
  { 
    id: "ghg7", 
    text: "類別3排放量 (Catgory 3).000 tCO2e", 
    type: "numberField",
    category: "組織溫盤資訊",
  },
  { 
    id: "ghg8", 
    text: "類別4排放量 (Catgory 4).000 tCO2e", 
    type: "numberField",
    category: "組織溫盤資訊",
  },
  { 
    id: "ghg9", 
    text: "類別5排放量 (Catgory 5).000 tCO2e", 
    type: "numberField",
    category: "組織溫盤資訊",
  },
  { 
    id: "ghg10", 
    text: "類別6排放量 (Catgory 6).000 tCO2e", 
    type: "numberField",
    category: "組織溫盤資訊",
  },
  
  // 能源消耗
  { 
    id: "energy1", 
    text: "電力 (kWh)", 
    type: "numberField",
    category: "組織溫盤資訊",
    subcategory: "能源消耗Energy Consumption",
  },
  { 
    id: "energy2", 
    text: "蒸氣 (GJ)", 
    type: "numberField",
    category: "組織溫盤資訊",
    subcategory: "能源消耗Energy Consumption",
  },
  { 
    id: "energy3", 
    text: "再生能源", 
    type: "textField",
    category: "組織溫盤資訊",
    subcategory: "能源消耗Energy Consumption",
  },
  { 
    id: "energy4", 
    text: "查證 (Third-Party Verified)", 
    type: "dropdown",
    category: "組織溫盤資訊",
    subcategory: "能源消耗",
    options: ["Yes", "No"]
  },
  { 
    id: "energy5", 
    text: "查證證書", 
    type: "uploader",
    category: "組織溫盤資訊",
  },
  
  // 原物料/碳足跡資訊 - 產品資訊
  { 
    id: "product1", 
    text: "產品名稱 (Product name)", 
    type: "textField",
    category: "原物料/碳足跡資訊",
    subcategory: "產品資訊",
    description: "PACT A10",
  },
  { 
    id: "product2", 
    text: "產品ID (Product IDs)", 
    type: "textField",
    category: "原物料/碳足跡資訊",
    subcategory: "產品資訊",
    description: "PACT A8",
  },
  { 
    id: "product3", 
    text: "系統邊界 (system boundary)", 
    type: "textField",
    category: "原物料/碳足跡資訊",
    subcategory: "產品資訊",
  },
  { 
    id: "product4", 
    text: "宣告單位 (declared unit)", 
    type: "textField",
    category: "原物料/碳足跡資訊",
    subcategory: "產品資訊",
  },
  { 
    id: "product5", 
    text: "報導期間 (Reporting period)", 
    type: "dateRangePicker",
    category: "原物料/碳足跡資訊",
    subcategory: "產品資訊",
  },
  { 
    id: "product6", 
    text: "生命週期 (Life Cycle)", 
    type: "dropdown",
    category: "原物料/碳足跡資訊",
    subcategory: "產品資訊",
    options: ["Cradle-to-Gate", "Cradle-to-Grave"]
  },
  
  // 原物料/碳足跡資訊 - 產品碳足跡
  { 
    id: "pcf1", 
    text: "產品碳足跡 CFP(PCF) kg CO2e/ declared unit", 
    type: "numberField",
    category: "原物料/碳足跡資訊",
    subcategory: "產品碳足跡",
  },
  { 
    id: "pcf2", 
    text: "原(物)料取得 (Raw Material Extraction) kg CO2e/ declared unit", 
    type: "numberField",
    category: "原物料/碳足跡資訊",
    subcategory: "產品碳足跡",
  },
  { 
    id: "pcf3", 
    text: "產品製造 (Manufacturing) kg CO2e/ declared unit", 
    type: "numberField",
    category: "原物料/碳足跡資訊",
    subcategory: "產品碳足跡",
  },
  { 
    id: "pcf4", 
    text: "銷售配送 (Distribution) kg CO2e/ declared unit", 
    type: "numberField",
    category: "原物料/碳足跡資訊",
    subcategory: "產品碳足跡",
  },
  { 
    id: "pcf5", 
    text: "產品使用 (Use Phase) kg CO2e/ declared unit", 
    type: "numberField",
    category: "原物料/碳足跡資訊",
    subcategory: "產品碳足跡",
  },
  { 
    id: "pcf6", 
    text: "產品廢棄 (End-of-Life Treatment) kg CO2e/ declared unit", 
    type: "numberField",
    category: "原物料/碳足跡資訊",
    subcategory: "產品碳足跡",
  },
  { 
    id: "pcf7", 
    text: "跨產業標準 (Cross-sectoral standard)", 
    type: "dropdown",
    category: "原物料/碳足跡資訊",
    subcategory: "產品碳足跡",
    options: ["GHG Protocol Product Standard", "ISO 14067", "PAS 2050", "其他"]
  },
  { 
    id: "pcf8", 
    text: "查證 (Third-Party Verified)", 
    type: "dropdown",
    category: "原物料/碳足跡資訊",
    subcategory: "產品碳足跡",
    options: ["Yes", "No"]
  },
  { 
    id: "pcf9", 
    text: "查證證書", 
    type: "uploader",
    category: "原物料/碳足跡資訊",
    subcategory: "產品碳足跡",
    description: "允許上傳PDF或圖片檔"
  },
]

// 問卷模板分類
const templateCategories = [
  "供應商基本資訊",
  "組織溫盤資訊",
  "原物料/碳足跡資訊"
]

export default function NewSurveyPage() {
  const router = useRouter()
  const [date, setDate] = useState<Date>()
  const [showAddQuestion, setShowAddQuestion] = useState(false)
  const [newQuestion, setNewQuestion] = useState<{
    text: string;
    type: string;
    options: string[];
    category: string;
    subcategory: string;
    description: string;
    scale?: number;
  }>({
    text: "",
    type: "textField",
    options: ["選項1", "選項2", "選項3"],
    category: templateCategories[0],
    subcategory: "",
    description: "",
  })
  const [questions, setQuestions] = useState<any[]>([])
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  // 添加問題
  const handleAddQuestion = () => {
    if (!newQuestion.text.trim()) {
      toast({
        title: "錯誤",
        description: "問題不能為空",
        variant: "destructive",
      })
      return
    }

    setQuestions([...questions, { ...newQuestion, id: Date.now().toString() }])
    setNewQuestion({
      text: "",
      type: "textField",
      options: ["選項1", "選項2", "選項3"],
      category: templateCategories[0],
      subcategory: "",
      description: "",
    })
    setShowAddQuestion(false)
  }

  // 刪除問題
  const handleDeleteQuestion = (id: string) => {
    setQuestions(questions.filter((q) => q.id !== id))
  }

  // 添加問題模板
  const handleAddTemplate = (template: any) => {
    setQuestions([...questions, { ...template, id: Date.now().toString() }])
  }

  // 添加預設問卷
  const addDefaultTemplate = (templateName: string) => {
    let templateQuestions: any[] = [];
    
    if (templateName === "供應商基本資訊") {
      templateQuestions = questionTemplates.filter(q => q.category === "供應商基本資訊");
    } else if (templateName === "組織溫盤資訊") {
      templateQuestions = questionTemplates.filter(q => q.category === "組織溫盤資訊");
    } else if (templateName === "原物料/碳足跡資訊") {
      templateQuestions = questionTemplates.filter(q => q.category === "原物料/碳足跡資訊");
    } else if (templateName === "完整碳排放問卷") {
      templateQuestions = questionTemplates;
    }
    
    const newQuestions = templateQuestions.map(q => ({
      ...q,
      id: `template-${q.id}-${Date.now()}`
    }));
    
    setQuestions([...questions, ...newQuestions]);
    
    toast({
      title: "成功",
      description: `已添加 ${newQuestions.length} 個問題到問卷中`,
    });
  };

  // 創建問卷
  const handleCreateSurvey = () => {
    if (!title.trim()) {
      toast({
        title: "錯誤",
        description: "問卷標題不能為空",
        variant: "destructive",
      })
      return
    }

    if (questions.length === 0) {
      toast({
        title: "錯誤",
        description: "問卷至少需要一個問題",
        variant: "destructive",
      })
      return
    }

    if (!date) {
      toast({
        title: "錯誤",
        description: "請設定截止日期",
        variant: "destructive",
      })
      return
    }

    // 在實際應用中，這裡會將數據發送到API
    console.log("創建問卷:", {
      title,
      description,
      questions,
      deadline: date,
    })

    toast({
      title: "成功",
      description: "問卷已成功創建",
    })

    // 導航到問卷列表頁面
    router.push("/dashboard/surveys")
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">創建問卷</h1>
        <p className="text-sm text-muted-foreground">建立新的供應商評估問卷</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>問卷基本資訊</CardTitle>
            <CardDescription>設定問卷的基本信息和截止日期</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">問卷標題</Label>
              <Input 
                id="title" 
                placeholder="例如：ESG永續發展評估問卷" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">問卷描述</Label>
              <Textarea 
                id="description" 
                placeholder="簡要描述本問卷的目的和內容..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <Label>截止日期</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "yyyy-MM-dd") : "選擇日期"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="pt-2">
              <Label className="mb-2 block">預設問卷模板</Label>
              <div className="flex flex-wrap gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => addDefaultTemplate("供應商基本資訊")}
                >
                  供應商基本資訊
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => addDefaultTemplate("組織溫盤資訊")}
                >
                  組織溫盤資訊
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => addDefaultTemplate("原物料/碳足跡資訊")}
                >
                  產品碳足跡資訊
                </Button>
                <Button 
                  variant="secondary" 
                  size="sm"
                  onClick={() => addDefaultTemplate("完整碳排放問卷")}
                >
                  完整碳排放問卷
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                點擊按鈕可快速添加預設問卷模板到您的問卷中
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>問題模板</CardTitle>
            <CardDescription>選擇問題模板快速添加常用問題</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Tabs defaultValue={templateCategories[0]}>
              <TabsList className="grid grid-cols-3">
                {templateCategories.map((category) => (
                  <TabsTrigger key={category} value={category}>{category}</TabsTrigger>
                ))}
              </TabsList>
              
              {templateCategories.map((category) => (
                <TabsContent key={category} value={category} className="space-y-4 pt-4">
                  {/* 過濾屬於當前類別的問題模板 */}
                  {questionTemplates
                    .filter(template => template.category === category)
                    .map((template) => (
                      <div key={template.id} className="flex items-center justify-between border p-3 rounded-md">
                        <div className="flex-1">
                          <p className="font-medium">{template.text}</p>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>{questionTypes.find(t => t.id === template.type)?.name}</span>
                            {template.subcategory && (
                              <>
                                <span>•</span>
                                <span>{template.subcategory}</span>
                              </>
                            )}
                          </div>
                          {template.description && (
                            <p className="text-xs text-muted-foreground mt-1">{template.description}</p>
                          )}
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => handleAddTemplate(template)}>
                          <Plus className="h-4 w-4 mr-1" />
                          添加
                        </Button>
                      </div>
                    ))}
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>問卷問題</CardTitle>
            <CardDescription>添加和管理問卷中的問題</CardDescription>
          </div>
          <Button onClick={() => setShowAddQuestion(true)}>
            <Plus className="mr-2 h-4 w-4" />
            添加問題
          </Button>
        </CardHeader>
        <CardContent>
          {questions.length === 0 ? (
            <div className="flex items-center justify-center h-40 border rounded-md bg-muted/30">
              <p className="text-muted-foreground">目前沒有問題，請添加問題或使用問題模板</p>
            </div>
          ) : (
            <div className="space-y-8">
              {templateCategories.map((category) => {
                const categoryQuestions = questions.filter(q => q.category === category);
                if (categoryQuestions.length === 0) return null;
                
                return (
                  <div key={category} className="space-y-4">
                    <h3 className="font-semibold text-lg border-b pb-2">{category}</h3>
                    
                    <div className="space-y-4">
                      {categoryQuestions.map((question, index) => (
                        <div key={question.id} className="border p-4 rounded-md relative">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="absolute top-2 right-2"
                            onClick={() => handleDeleteQuestion(question.id)}
                          >
                            <Trash2 className="h-4 w-4 text-muted-foreground" />
                          </Button>
                          <div className="space-y-2 pr-8">
                            <div className="flex items-center gap-2">
                              <span className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium">
                                {index + 1}
                              </span>
                              <p className="font-medium">{question.text}</p>
                            </div>
                            
                            <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <span>類型:</span>
                                <span>{questionTypes.find(t => t.id === question.type)?.name}</span>
                              </div>
                              
                              {question.subcategory && (
                                <div className="flex items-center gap-1">
                                  <span>子類別:</span>
                                  <span>{question.subcategory}</span>
                                </div>
                              )}
                              
                              {question.description && (
                                <div className="flex items-center gap-1">
                                  <span>說明:</span>
                                  <span>{question.description}</span>
                                </div>
                              )}
                            </div>
                            
                            {(question.type === "dropdown" || question.type === "singleChoice" || question.type === "multipleChoice") && question.options && (
                              <div className="pl-6 space-y-1 mt-2">
                                <div className="text-sm text-muted-foreground">選項:</div>
                                {question.options.map((option: string, i: number) => (
                                  <div key={i} className="flex items-center gap-2">
                                    <div className="h-2 w-2 rounded-full bg-primary" />
                                    <span>{option}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                            
                            {question.type === "rating" && (
                              <div className="pl-6 mt-2 text-sm">
                                <p>評分尺度: 1-{question.scale || 5}</p>
                              </div>
                            )}

                            {(question.type === "numberField") && (
                              <div className="pl-6 mt-2 text-sm text-muted-foreground">
                                <p>數字輸入欄位</p>
                              </div>
                            )}

                            {(question.type === "datePicker") && (
                              <div className="pl-6 mt-2 text-sm text-muted-foreground">
                                <p>日期選擇器</p>
                              </div>
                            )}

                            {(question.type === "dateRangePicker") && (
                              <div className="pl-6 mt-2 text-sm text-muted-foreground">
                                <p>日期範圍選擇器</p>
                              </div>
                            )}

                            {(question.type === "uploader") && (
                              <div className="pl-6 mt-2 text-sm text-muted-foreground">
                                <p>檔案上傳欄位</p>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {showAddQuestion && (
            <div className="mt-6 border p-4 rounded-md space-y-4">
              <h3 className="font-semibold">添加新問題</h3>
              
              <div className="space-y-2">
                <Label htmlFor="question-text">問題內容</Label>
                <Textarea 
                  id="question-text" 
                  placeholder="請輸入問題..." 
                  value={newQuestion.text}
                  onChange={(e) => setNewQuestion({ ...newQuestion, text: e.target.value })}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="question-category">問題類別</Label>
                  <Select 
                    value={newQuestion.category} 
                    onValueChange={(value) => setNewQuestion({ ...newQuestion, category: value })}
                  >
                    <SelectTrigger id="question-category">
                      <SelectValue placeholder="選擇問題類別" />
                    </SelectTrigger>
                    <SelectContent>
                      {templateCategories.map((category) => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="question-subcategory">子類別 (可選)</Label>
                  <Input 
                    id="question-subcategory"
                    placeholder="子類別"
                    value={newQuestion.subcategory}
                    onChange={(e) => setNewQuestion({ ...newQuestion, subcategory: e.target.value })}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="question-type">問題類型</Label>
                <Select 
                  value={newQuestion.type} 
                  onValueChange={(value) => setNewQuestion({ ...newQuestion, type: value })}
                >
                  <SelectTrigger id="question-type">
                    <SelectValue placeholder="選擇問題類型" />
                  </SelectTrigger>
                  <SelectContent>
                    {questionTypes.map((type) => (
                      <SelectItem key={type.id} value={type.id}>{type.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="question-description">說明 (可選)</Label>
                <Input 
                  id="question-description"
                  placeholder="問題說明或備註"
                  value={newQuestion.description}
                  onChange={(e) => setNewQuestion({ ...newQuestion, description: e.target.value })}
                />
              </div>
              
              {(newQuestion.type === "dropdown" || newQuestion.type === "singleChoice" || newQuestion.type === "multipleChoice") && (
                <div className="space-y-2">
                  <Label>選項</Label>
                  <div className="space-y-2">
                    {newQuestion.options.map((option, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <Input 
                          value={option} 
                          onChange={(e) => {
                            const newOptions = [...newQuestion.options]
                            newOptions[i] = e.target.value
                            setNewQuestion({ ...newQuestion, options: newOptions })
                          }}
                        />
                        {newQuestion.options.length > 2 && (
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => {
                              const newOptions = newQuestion.options.filter((_, index) => index !== i)
                              setNewQuestion({ ...newQuestion, options: newOptions })
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                  <Button 
                    variant="outline" 
                    className="mt-2"
                    onClick={() => {
                      const newOptions = [...newQuestion.options, `選項${newQuestion.options.length + 1}`]
                      setNewQuestion({ ...newQuestion, options: newOptions })
                    }}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    添加選項
                  </Button>
                </div>
              )}
              
              {newQuestion.type === "rating" && (
                <div className="space-y-2">
                  <Label htmlFor="rating-scale">評分尺度</Label>
                  <Select 
                    value={newQuestion.scale?.toString() || "5"} 
                    onValueChange={(value) => setNewQuestion({ ...newQuestion, scale: parseInt(value) })}
                  >
                    <SelectTrigger id="rating-scale">
                      <SelectValue placeholder="選擇評分尺度" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3">3分制</SelectItem>
                      <SelectItem value="5">5分制</SelectItem>
                      <SelectItem value="10">10分制</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
              
              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" onClick={() => setShowAddQuestion(false)}>取消</Button>
                <Button onClick={handleAddQuestion}>添加問題</Button>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between border-t p-6">
          <Button variant="outline" onClick={() => router.push("/dashboard/surveys")}>取消</Button>
          <Button onClick={handleCreateSurvey}>創建問卷</Button>
        </CardFooter>
      </Card>
    </div>
  )
} 