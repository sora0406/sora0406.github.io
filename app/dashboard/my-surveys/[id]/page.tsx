"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock, Save, SendHorizontal, Building, History, PenSquare, RefreshCw } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { toast } from "@/components/ui/use-toast"

// 模擬問卷數據
const surveyDetails = {
  id: "1",
  title: "企業碳排放評估問卷",
  description: "的碳排放數據和減碳措施，我們將基於這些資訊評估您公司的永續發展狀況",
  sender: "台灣永續科技股份有限公司",
  senderLogo: "/company-logos/sustainable-tech.png",
  sentDate: new Date("2023-11-01"),
  deadline: new Date("2023-12-15"),
  status: "inProgress", // pending, inProgress, completed, expired
  lastUpdate: new Date("2023-11-05"),
  completedPercent: 45,
  revisions: [],
  sections: [
    {
      id: "basic",
      title: "供應商基本資訊",
      description: "請填寫貴公司的基本資訊",
      isCompleted: true,
      questions: [
        {
          id: "company_name",
          type: "text",
          label: "公司名稱 (Company name)",
          required: true,
          value: "綠色科技股份有限公司",
        },
        {
          id: "company_id",
          type: "text",
          label: "公司統一編號 (Company IDs)",
          required: true,
          value: "12345678",
          disabled: true,
          note: "系統自動產生",
        },
        {
          id: "location",
          type: "text",
          label: "地點 (Location)",
          required: true,
          value: "台北市信義區信義路五段7號",
        },
        {
          id: "contact_person",
          type: "text",
          label: "聯絡窗口 (Contact Person)",
          required: true,
          value: "王小明",
        },
        {
          id: "email",
          type: "email",
          label: "Email",
          required: true,
          value: "contact@greentech.com.tw",
        },
        {
          id: "product_service",
          type: "text",
          label: "產品或服務名稱 (Product/Service Name)",
          required: true,
          value: "環保材料、可再生能源設備",
        },
        {
          id: "percentage",
          type: "number",
          label: "提供本公司之比例 (%)",
          required: true,
          value: "35",
        },
        {
          id: "calculation_method",
          type: "text",
          label: "比例計算方式 (營收占比)",
          required: true,
          value: "年度營收百分比",
        },
      ],
    },
    {
      id: "ghg",
      title: "組織溫盤資訊",
      description: "請填寫貴公司的溫室氣體排放資訊",
      isCompleted: false,
      questions: [
        {
          id: "inventory_period",
          type: "date",
          label: "盤查期間 (inventory period)",
          required: true,
          value: "2023-01-01",
        },
        {
          id: "standard",
          type: "select",
          label: "採用標準 (Standard)",
          required: true,
          options: ["ISO 14064-1:2018", "GHG Protocol", "其他"],
          value: "ISO 14064-1:2018",
        },
        {
          id: "boundary",
          type: "text",
          label: "邊界 (Boundary)",
          required: true,
          value: "全公司營運據點",
        },
        {
          id: "total_emission",
          type: "number",
          label: "總排放量 (total emission) tCO2e",
          required: true,
          value: "1250",
        },
        {
          id: "category1",
          type: "number",
          label: "範疇1排放量 (Catgory 1) tCO2e",
          required: true,
          value: "500",
        },
        {
          id: "category2",
          type: "number",
          label: "範疇2排放量 (Catgory 2) tCO2e",
          required: true,
          value: "650",
        },
        {
          id: "category3",
          type: "number",
          label: "範疇3排放量 (Catgory 3) tCO2e",
          required: true,
          value: "100",
        },
        {
          id: "category4",
          type: "number",
          label: "類別4排放量 (Catgory 4) tCO2e",
          required: false,
          value: "",
        },
        {
          id: "category5",
          type: "number",
          label: "類別5排放量 (Catgory 5) tCO2e",
          required: false,
          value: "",
        },
        {
          id: "category6",
          type: "number",
          label: "類別6排放量 (Catgory 6) tCO2e",
          required: false,
          value: "",
        },
      ],
    },
    {
      id: "energy",
      title: "能源消耗資訊",
      description: "請填寫貴公司的能源消耗資訊",
      isCompleted: false,
      questions: [
        {
          id: "electricity",
          type: "number",
          label: "電力 (kWh)",
          required: true,
          value: "850000",
        },
        {
          id: "steam",
          type: "number",
          label: "蒸氣 (GJ)",
          required: false,
          value: "",
        },
        {
          id: "renewable_energy",
          type: "text",
          label: "再生能源",
          required: false,
          value: "太陽能發電 45000 kWh",
        },
        {
          id: "verified",
          type: "radio",
          label: "查證 (Third-Party Verified)",
          required: true,
          options: ["Yes", "No"],
          value: "Yes",
        },
        {
          id: "verification_cert",
          type: "file",
          label: "查證證書",
          required: true,
          value: "certificate_2023.pdf",
          note: "已上傳",
        },
      ],
    },
    {
      id: "product",
      title: "產品碳足跡資訊",
      description: "請填寫貴公司產品的碳足跡資訊",
      isCompleted: false,
      questions: [
        {
          id: "product_name",
          type: "text",
          label: "產品名稱 (Product name)",
          required: true,
          value: "",
        },
        {
          id: "product_id",
          type: "text",
          label: "產品ID (Product IDs)",
          required: true,
          value: "",
        },
        {
          id: "system_boundary",
          type: "text",
          label: "系統邊界 (system boundary)",
          required: true,
          value: "",
        },
        {
          id: "declared_unit",
          type: "text",
          label: "宣告單位 (declared unit)",
          required: true,
          value: "",
        },
        {
          id: "reporting_period",
          type: "date-range",
          label: "報導期間 (Reporting period)",
          required: true,
          value: { start: "", end: "" },
        },
        {
          id: "life_cycle",
          type: "radio",
          label: "生命週期 (Life Cycle)",
          required: true,
          options: ["Cradle-to-Gate", "Cradle-to-Grave"],
          value: "",
        },
      ],
    },
  ],
}

export default function SurveyDetail({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [survey, setSurvey] = useState<any>(surveyDetails)
  const [currentSection, setCurrentSection] = useState(0)
  const [isEditing, setIsEditing] = useState(true)
  const [totalProgress, setTotalProgress] = useState(0)

  // 計算總進度
  useEffect(() => {
    const completed = survey.sections.filter((section: any) => section.isCompleted).length
    const total = survey.sections.length
    const progress = Math.floor((completed / total) * 100)
    setTotalProgress(progress)
  }, [survey])

  // 取得問卷
  useEffect(() => {
    // 在實際應用中，這裡會從API獲取問卷數據
    console.log("Fetching survey with ID:", params.id)
  }, [params.id])

  // 保存問卷
  const handleSave = () => {
    // 在實際應用中，這裡會將數據發送到API
    console.log("儲存問卷:", survey)
    
    // 模擬API保存
    const updatedSurvey = { ...survey }
    updatedSurvey.lastUpdate = new Date()
    updatedSurvey.sections[currentSection].isCompleted = true
    updatedSurvey.completedPercent = Math.floor(
      (updatedSurvey.sections.filter((section: any) => section.isCompleted).length / 
       updatedSurvey.sections.length) * 100
    )
    
    setSurvey(updatedSurvey)
    
    toast({
      title: "已儲存",
      description: `${survey.sections[currentSection].title}區段已儲存`,
    })
  }

  // 提交問卷
  const handleSubmit = () => {
    // 檢查所有必填欄位
    let hasEmptyRequired = false
    for (const section of survey.sections) {
      for (const question of section.questions) {
        if (question.required && 
           (!question.value || (typeof question.value === 'string' && question.value.trim() === ''))) {
          hasEmptyRequired = true
          break
        }
      }
      if (hasEmptyRequired) break
    }
    
    if (hasEmptyRequired) {
      toast({
        title: "無法提交",
        description: "請填寫所有必填欄位",
        variant: "destructive",
      })
      return
    }
    
    // 在實際應用中，這裡會將數據發送到API
    console.log("提交問卷:", survey)
    
    const updatedSurvey = { ...survey }
    updatedSurvey.status = "completed"
    updatedSurvey.completedPercent = 100
    updatedSurvey.lastUpdate = new Date()
    
    setSurvey(updatedSurvey)
    
    toast({
      title: "提交成功",
      description: "您的問卷已成功提交",
    })
    
    // 導航回列表頁
    setTimeout(() => {
      router.push("/dashboard/my-surveys")
    }, 1500)
  }

  // 更新問題答案
  const handleQuestionChange = (sectionIndex: number, questionIndex: number, value: any) => {
    if (!isEditing) return
    
    const updatedSurvey = { ...survey }
    updatedSurvey.sections[sectionIndex].questions[questionIndex].value = value
    setSurvey(updatedSurvey)
  }

  // 渲染問題
  const renderQuestion = (question: any, sectionIndex: number, questionIndex: number) => {
    switch (question.type) {
      case "text":
      case "email":
        return (
          <Input
            id={question.id}
            value={question.value}
            onChange={(e) => handleQuestionChange(sectionIndex, questionIndex, e.target.value)}
            disabled={question.disabled || !isEditing}
            className="w-full"
          />
        )
      case "number":
        return (
          <Input
            id={question.id}
            type="number"
            value={question.value}
            onChange={(e) => handleQuestionChange(sectionIndex, questionIndex, e.target.value)}
            disabled={question.disabled || !isEditing}
            className="w-full"
          />
        )
      case "date":
        return (
          <Input
            id={question.id}
            type="date"
            value={question.value}
            onChange={(e) => handleQuestionChange(sectionIndex, questionIndex, e.target.value)}
            disabled={question.disabled || !isEditing}
            className="w-full"
          />
        )
      case "date-range":
        return (
          <div className="flex gap-2">
            <Input
              id={`${question.id}_start`}
              type="date"
              value={question.value.start}
              onChange={(e) => handleQuestionChange(sectionIndex, questionIndex, { ...question.value, start: e.target.value })}
              disabled={question.disabled || !isEditing}
              className="w-full"
              placeholder="開始日期"
            />
            <Input
              id={`${question.id}_end`}
              type="date"
              value={question.value.end}
              onChange={(e) => handleQuestionChange(sectionIndex, questionIndex, { ...question.value, end: e.target.value })}
              disabled={question.disabled || !isEditing}
              className="w-full"
              placeholder="結束日期"
            />
          </div>
        )
      case "select":
        return (
          <select
            id={question.id}
            value={question.value}
            onChange={(e) => handleQuestionChange(sectionIndex, questionIndex, e.target.value)}
            disabled={question.disabled || !isEditing}
            className="w-full p-2 border rounded"
          >
            <option value="">請選擇</option>
            {question.options.map((option: string) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        )
      case "radio":
        return (
          <RadioGroup
            value={question.value}
            onValueChange={(value) => handleQuestionChange(sectionIndex, questionIndex, value)}
            disabled={question.disabled || !isEditing}
          >
            {question.options.map((option: string) => (
              <div key={option} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`${question.id}-${option}`} />
                <Label htmlFor={`${question.id}-${option}`}>{option}</Label>
              </div>
            ))}
          </RadioGroup>
        )
      case "checkbox":
        return (
          <div className="flex flex-col gap-2">
            {question.options.map((option: string) => (
              <div key={option} className="flex items-center space-x-2">
                <Checkbox
                  id={`${question.id}-${option}`}
                  checked={(question.value || []).includes(option)}
                  onCheckedChange={(checked) => {
                    const newValue = [...(question.value || [])]
                    if (checked) {
                      if (!newValue.includes(option)) {
                        newValue.push(option)
                      }
                    } else {
                      const index = newValue.indexOf(option)
                      if (index !== -1) {
                        newValue.splice(index, 1)
                      }
                    }
                    handleQuestionChange(sectionIndex, questionIndex, newValue)
                  }}
                  disabled={question.disabled || !isEditing}
                />
                <Label htmlFor={`${question.id}-${option}`}>{option}</Label>
              </div>
            ))}
          </div>
        )
      case "textarea":
        return (
          <Textarea
            id={question.id}
            value={question.value}
            onChange={(e) => handleQuestionChange(sectionIndex, questionIndex, e.target.value)}
            disabled={question.disabled || !isEditing}
            className="w-full"
          />
        )
      case "file":
        if (question.value) {
          return (
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 p-2 border rounded bg-muted">
                <div className="text-sm">{question.value}</div>
                {isEditing && (
                  <Button variant="ghost" size="sm">
                    變更
                  </Button>
                )}
              </div>
              {question.note && <p className="text-xs text-muted-foreground">{question.note}</p>}
            </div>
          )
        }
        return (
          <div className="flex flex-col gap-2">
            <Input
              id={question.id}
              type="file"
              disabled={question.disabled || !isEditing}
              className="w-full"
            />
            {question.note && <p className="text-xs text-muted-foreground">{question.note}</p>}
          </div>
        )
      default:
        return null
    }
  }

  if (!survey) {
    return <div>載入中...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/dashboard/my-surveys">
            <ArrowLeft className="mr-2 h-4 w-4" />
            返回問卷列表
          </Link>
        </Button>
        
        <div className="flex items-center gap-2">
          {survey.revisions.length > 0 && (
            <Button variant="outline" size="sm" asChild>
              <Link href={`/dashboard/my-surveys/${params.id}/history`}>
                <History className="mr-2 h-4 w-4" />
                檢視歷史版本
              </Link>
            </Button>
          )}
          
          {survey.status === "completed" && (
            <Button variant="outline" size="sm" asChild>
              <Link href={`/dashboard/my-surveys/${params.id}/edit`}>
                <PenSquare className="mr-2 h-4 w-4" />
                編輯回覆
              </Link>
            </Button>
          )}
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl">{survey.title}</CardTitle>
              <CardDescription className="mt-2">{survey.description}</CardDescription>
            </div>
            <Badge className={
              survey.status === "pending" ? "bg-amber-500" :
              survey.status === "inProgress" ? "bg-blue-500" :
              survey.status === "completed" ? "bg-green-500" :
              survey.status === "expired" ? "bg-destructive" : "bg-muted"
            }>
              {survey.status === "pending" ? "待回覆" :
               survey.status === "inProgress" ? "填寫中" :
               survey.status === "completed" ? "已完成" :
               survey.status === "expired" ? "已過期" : "未知"}
            </Badge>
          </div>
          
          <div className="grid gap-4 mt-2">
            <div className="flex items-center gap-2 text-sm">
              <Building className="h-4 w-4" />
              <span>發送方: {survey.sender}</span>
            </div>
            
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4" />
                <span>截止日期: {format(survey.deadline, "yyyy-MM-dd")}</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4" />
                <span>最後更新: {survey.lastUpdate ? format(survey.lastUpdate, "yyyy-MM-dd") : "尚未回覆"}</span>
              </div>
            </div>
            
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>填寫進度</span>
                <span>{totalProgress}%</span>
              </div>
              <Progress value={totalProgress} className="h-2" />
            </div>
          </div>
        </CardHeader>
        
        {survey.status === "expired" && (
          <CardContent>
            <Alert variant="destructive">
              <AlertTitle>此問卷已過期</AlertTitle>
              <AlertDescription>
                您可以查看問卷內容，但無法進行編輯。如需編輯，請聯繫發送方或點擊「要求編輯」按鈕。
              </AlertDescription>
            </Alert>
          </CardContent>
        )}
        
        <CardContent className="space-y-8">
          <div className="flex flex-col gap-1 md:flex-row md:flex-wrap md:gap-4">
            {survey.sections.map((section: any, index: number) => (
              <Button
                key={section.id}
                variant={currentSection === index ? "default" : "outline"}
                onClick={() => setCurrentSection(index)}
                className="justify-start"
                size="sm"
              >
                {section.title}
                {section.isCompleted && (
                  <Badge variant="outline" className="ml-2 bg-green-500/10 text-green-500 hover:bg-green-500/10 hover:text-green-500">
                    已完成
                  </Badge>
                )}
              </Button>
            ))}
          </div>
          
          <Separator />
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold">{survey.sections[currentSection].title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{survey.sections[currentSection].description}</p>
            </div>
            
            <div className="space-y-6">
              {survey.sections[currentSection].questions.map((question: any, qIndex: number) => (
                <div key={question.id} className="space-y-2">
                  <Label htmlFor={question.id} className="flex items-center gap-2">
                    {question.label}
                    {question.required && <span className="text-destructive">*</span>}
                  </Label>
                  {renderQuestion(question, currentSection, qIndex)}
                  {question.note && !question.value && (
                    <p className="text-xs text-muted-foreground">{question.note}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-between pt-6 border-t">
          <div className="flex gap-2">
            {currentSection > 0 && (
              <Button
                variant="outline"
                onClick={() => setCurrentSection(currentSection - 1)}
              >
                上一節
              </Button>
            )}
            
            {currentSection < survey.sections.length - 1 && (
              <Button
                variant={survey.sections[currentSection].isCompleted ? "default" : "outline"}
                onClick={() => setCurrentSection(currentSection + 1)}
              >
                下一節
              </Button>
            )}
          </div>
          
          <div className="flex gap-2">
            {isEditing && survey.status !== "expired" && survey.status !== "completed" && (
              <>
                <Button 
                  variant="outline" 
                  onClick={handleSave}
                >
                  <Save className="mr-2 h-4 w-4" />
                  儲存
                </Button>
                
                <Button 
                  onClick={handleSubmit}
                >
                  <SendHorizontal className="mr-2 h-4 w-4" />
                  提交問卷
                </Button>
              </>
            )}
            
            {survey.status === "expired" && (
              <Button variant="outline">
                <RefreshCw className="mr-2 h-4 w-4" />
                要求編輯
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  )
} 