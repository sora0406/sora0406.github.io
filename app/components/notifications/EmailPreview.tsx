"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { prepareEmail, getTemplateVariables, getAvailableTemplates, emailTemplates } from "@/app/notifications"

interface EmailTemplateVariable {
  name: string
  description: string
  value: string
}

export default function EmailPreview() {
  const [templateKey, setTemplateKey] = useState<keyof typeof emailTemplates>("supplierDataRequest")
  const [language, setLanguage] = useState<"zh" | "en">("zh")
  const [variables, setVariables] = useState<EmailTemplateVariable[]>([])
  const [emailPreview, setEmailPreview] = useState({ subject: "", body: "" })
  
  // 準備所有可用模板選項
  const templateOptions = getAvailableTemplates().map(key => ({
    value: key,
    label: emailTemplates[key].userStory
  }))
  
  // 當模板變化時，重新載入所需變數
  useEffect(() => {
    const templateVars = getTemplateVariables(templateKey).map(v => ({
      ...v,
      value: ""
    }))
    setVariables(templateVars)
  }, [templateKey])
  
  // 根據當前變數更新預覽
  useEffect(() => {
    try {
      const variablesObject = variables.reduce((acc, curr) => {
        acc[curr.name] = curr.value || `{${curr.name}}`
        return acc
      }, {} as Record<string, string>)
      
      const email = prepareEmail(templateKey, variablesObject, language)
      setEmailPreview(email)
    } catch (error) {
      console.error("預覽生成失敗", error)
    }
  }, [variables, templateKey, language])
  
  // 更新變數值
  const handleVariableChange = (name: string, value: string) => {
    setVariables(prev => 
      prev.map(v => v.name === name ? { ...v, value } : v)
    )
  }
  
  // 填入測試資料
  const fillTestData = () => {
    const testData: Record<string, string> = {
      supplierName: "台積電股份有限公司",
      companyName: "永續科技股份有限公司",
      requestTitle: "2023年度碳排放數據收集",
      formLink: "https://example.com/form/123",
      dueDate: "2023-12-31",
      priority: "高",
      description: "請提供貴公司2023年度碳排放相關數據，包括類別1、2、3的排放量。",
      contactPerson: "王小明",
      contactEmail: "contact@example.com",
      requesterName: "林經理",
      pgmName: "陳專案",
      supplierId: "SUP-2023-001",
      submissionTime: "2023-11-15 15:30",
      fileCount: "5",
      viewLink: "https://example.com/view/123",
      supplierNotes: "已提供所有要求的資料，如有問題請聯繫。",
      reviewPeriod: "7",
      supplierContactName: "李採購",
      editLink: "https://example.com/edit/123",
      fileList: "carbon-report-2023.pdf, energy-data.xlsx, scope3-emissions.pdf",
      daysLeft: "5",
      currentStatus: "進行中",
      completionRate: "75"
    }
    
    setVariables(prev => 
      prev.map(v => ({ ...v, value: testData[v.name] || v.value }))
    )
  }
  
  // 清空所有資料
  const clearAllData = () => {
    setVariables(prev => prev.map(v => ({ ...v, value: "" })))
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="col-span-1">
        <CardHeader>
          <CardTitle>通知信件設定</CardTitle>
          <CardDescription>選擇通知模板並填入相關資訊</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="template">選擇通知模板</Label>
            <Select 
              value={templateKey} 
              onValueChange={(value) => setTemplateKey(value as keyof typeof emailTemplates)}
            >
              <SelectTrigger id="template">
                <SelectValue placeholder="選擇通知模板" />
              </SelectTrigger>
              <SelectContent>
                {templateOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="language">語言</Label>
            <Select value={language} onValueChange={(value) => setLanguage(value as "zh" | "en")}>
              <SelectTrigger id="language">
                <SelectValue placeholder="選擇語言" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="zh">中文</SelectItem>
                <SelectItem value="en">English</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="pt-4">
            <div className="flex justify-between mb-2">
              <Label>變數設定</Label>
              <div className="space-x-2">
                <Button variant="outline" size="sm" onClick={fillTestData}>
                  填入測試資料
                </Button>
                <Button variant="outline" size="sm" onClick={clearAllData}>
                  清空
                </Button>
              </div>
            </div>
            
            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
              {variables.map((variable) => (
                <div key={variable.name} className="grid grid-cols-1 gap-1.5">
                  <Label htmlFor={variable.name} className="text-sm flex justify-between">
                    <span>{variable.name}</span>
                    <span className="text-muted-foreground text-xs">{variable.description}</span>
                  </Label>
                  <Input
                    id={variable.name}
                    value={variable.value}
                    onChange={(e) => handleVariableChange(variable.name, e.target.value)}
                    placeholder={variable.description}
                  />
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="col-span-1">
        <CardHeader>
          <CardTitle>郵件預覽</CardTitle>
          <CardDescription>查看通知信件的最終效果</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Tabs defaultValue="preview" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="preview">預覽</TabsTrigger>
              <TabsTrigger value="code">代碼</TabsTrigger>
            </TabsList>
            <TabsContent value="preview" className="space-y-4">
              <div className="space-y-2">
                <Label>主旨</Label>
                <div className="p-2 border rounded-md bg-muted/50">
                  {emailPreview.subject}
                </div>
              </div>
              <div className="space-y-2">
                <Label>內容</Label>
                <div className="p-4 border rounded-md bg-muted/50 h-[500px] overflow-y-auto whitespace-pre-line">
                  {emailPreview.body}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="code" className="space-y-4">
              <div className="space-y-2">
                <Label>主旨</Label>
                <Textarea 
                  readOnly 
                  value={emailPreview.subject}
                  className="font-mono text-sm h-12"
                />
              </div>
              <div className="space-y-2">
                <Label>內容</Label>
                <Textarea 
                  readOnly 
                  value={emailPreview.body}
                  className="font-mono text-sm h-[500px]"
                />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-end space-x-2 border-t p-4">
          <Button variant="secondary">
            複製HTML
          </Button>
          <Button>
            使用此模板
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
} 