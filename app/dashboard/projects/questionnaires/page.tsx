"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import React from "react"
import { 
  AlertCircle, 
  ArrowLeft, 
  Check, 
  Clock, 
  Download, 
  Mail, 
  MoreHorizontal, 
  Search, 
  Trash, 
  X 
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"

// 定義問卷類型
type Supplier = {
  id: string;
  name: string;
  companyId: string;
  email: string;
}

type Questionnaire = {
  id: string;
  title: string;
  supplier: Supplier;
  sentDate: string;
  dueDate: string;
  status: "completed" | "in_progress" | "not_started" | "overdue";
  completionRate: number;
  lastReminder: string | null;
}

// 模擬問卷數據
const questionnaires: Questionnaire[] = [
  {
    id: "q1",
    title: "2023碳排放調查問卷",
    supplier: {
      id: "s1",
      name: "台灣電子股份有限公司",
      companyId: "TW12345678",
      email: "contact@taiwanelectronics.com",
    },
    sentDate: "2023-09-15",
    dueDate: "2023-10-15",
    status: "completed",
    completionRate: 100,
    lastReminder: "2023-10-01",
  },
  {
    id: "q2",
    title: "2023永續發展報告問卷",
    supplier: {
      id: "s2",
      name: "綠能科技有限公司",
      companyId: "TW23456789",
      email: "info@greentechltd.com",
    },
    sentDate: "2023-09-20",
    dueDate: "2023-10-20",
    status: "in_progress",
    completionRate: 67,
    lastReminder: "2023-10-05",
  },
  {
    id: "q3",
    title: "2023材料安全調查問卷",
    supplier: {
      id: "s3",
      name: "永續材料工業股份有限公司",
      companyId: "TW34567890",
      email: "contact@sustainablematerials.com",
    },
    sentDate: "2023-09-25",
    dueDate: "2023-10-25",
    status: "not_started",
    completionRate: 0,
    lastReminder: null,
  },
  {
    id: "q4",
    title: "2023碳排放調查問卷",
    supplier: {
      id: "s4",
      name: "高科技電子有限公司",
      companyId: "TW45678901",
      email: "contact@hitechelectronics.com",
    },
    sentDate: "2023-09-10",
    dueDate: "2023-10-10",
    status: "overdue",
    completionRate: 32,
    lastReminder: "2023-10-08",
  },
  {
    id: "q5",
    title: "2023永續發展報告問卷",
    supplier: {
      id: "s5",
      name: "環保材料股份有限公司",
      companyId: "TW56789012",
      email: "info@ecomaterials.com",
    },
    sentDate: "2023-09-05",
    dueDate: "2023-10-05",
    status: "overdue",
    completionRate: 0,
    lastReminder: "2023-10-04",
  },
  {
    id: "q6",
    title: "2023碳排放調查問卷",
    supplier: {
      id: "s6",
      name: "智慧科技工業有限公司",
      companyId: "TW67890123",
      email: "contact@smarttechindustry.com",
    },
    sentDate: "2023-10-01",
    dueDate: "2023-11-01",
    status: "in_progress",
    completionRate: 45,
    lastReminder: null,
  },
  {
    id: "q7",
    title: "2023材料安全調查問卷",
    supplier: {
      id: "s7",
      name: "新創能源科技股份有限公司",
      companyId: "TW78901234",
      email: "info@newenergytech.com",
    },
    sentDate: "2023-10-05",
    dueDate: "2023-11-05",
    status: "not_started",
    completionRate: 0,
    lastReminder: null,
  },
  {
    id: "q8",
    title: "2023永續發展報告問卷",
    supplier: {
      id: "s8",
      name: "雲端數據系統有限公司",
      companyId: "TW89012345", 
      email: "contact@clouddatasystems.com",
    },
    sentDate: "2023-09-28",
    dueDate: "2023-10-28",
    status: "completed",
    completionRate: 100,
    lastReminder: null,
  },
]

export function QuestionnairePage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedQuestionnaire, setSelectedQuestionnaire] = useState<Questionnaire | null>(null)
  const [reminderDialogOpen, setReminderDialogOpen] = useState(false)
  const [resendDialogOpen, setResendDialogOpen] = useState(false)
  const [reminderMessage, setReminderMessage] = useState("")
  
  // 計算各狀態的問卷數量
  const counts = {
    all: questionnaires.length,
    completed: questionnaires.filter(q => q.status === "completed").length,
    in_progress: questionnaires.filter(q => q.status === "in_progress").length,
    not_started: questionnaires.filter(q => q.status === "not_started").length,
    overdue: questionnaires.filter(q => q.status === "overdue").length,
  }
  
  // 過濾問卷
  const filteredQuestionnaires = questionnaires.filter(questionnaire => {
    const matchesSearch = 
      questionnaire.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      questionnaire.supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      questionnaire.supplier.companyId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || questionnaire.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  // 獲取問卷狀態標籤
  const getStatusBadge = (status: string): React.ReactNode => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-500">已完成</Badge>;
      case "in_progress":
        return <Badge className="bg-blue-500">進行中</Badge>;
      case "not_started":
        return <Badge className="bg-slate-500">未開始</Badge>;
      case "overdue":
        return <Badge className="bg-red-500">已逾期</Badge>;
      default:
        return <Badge className="bg-slate-500">未知狀態</Badge>;
    }
  };
  
  // 發送提醒
  const handleSendReminder = () => {
    toast({
      title: "已發送提醒",
      description: `已向 ${selectedQuestionnaire?.supplier.name} 發送填寫提醒`,
    });
    setReminderDialogOpen(false);
    setReminderMessage("");
  };
  
  // 重新發送問卷
  const handleResendQuestionnaire = () => {
    toast({
      title: "已重新發送問卷",
      description: `已向 ${selectedQuestionnaire?.supplier.name} 重新發送問卷`,
    });
    setResendDialogOpen(false);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          {/* <Button variant="ghost" size="sm" className="mb-2" onClick={() => router.push("/dashboard/projects")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            返回專案管理
          </Button> */}
          {/* <h1 className="text-2xl font-bold tracking-tight">問卷追蹤</h1> */}
          <p className="text-sm text-muted-foreground">
            追蹤供應商問卷填寫狀況、到期日，及時發送提醒
          </p>
        </div>
      </div>
      
      {/* 狀態統計卡片 */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">全部問卷</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{counts.all}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">已完成</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">{counts.completed}</div>
            <Progress value={(counts.completed / counts.all) * 100} className="h-2 mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">進行中</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-500">{counts.in_progress}</div>
            <Progress value={(counts.in_progress / counts.all) * 100} className="h-2 mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">已逾期</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">{counts.overdue}</div>
            <Progress value={(counts.overdue / counts.all) * 100} className="h-2 mt-2" />
          </CardContent>
        </Card>
      </div>
      
      {/* 工具欄 */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="搜尋問卷標題或供應商..."
            className="pl-8 max-w-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2 shrink-0">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="篩選狀態" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">所有狀態</SelectItem>
              <SelectItem value="completed">已完成</SelectItem>
              <SelectItem value="in_progress">進行中</SelectItem>
              <SelectItem value="not_started">未開始</SelectItem>
              <SelectItem value="overdue">已逾期</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* 問卷表格 */}
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>問卷標題</TableHead>
              <TableHead>供應商</TableHead>
              <TableHead>發送日期</TableHead>
              <TableHead>截止日期</TableHead>
              <TableHead>狀態</TableHead>
              <TableHead>完成率</TableHead>
              <TableHead className="text-right">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredQuestionnaires.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-muted-foreground py-6">
                  找不到符合條件的問卷
                </TableCell>
              </TableRow>
            ) : (
              filteredQuestionnaires.map((questionnaire) => (
                <TableRow key={questionnaire.id}>
                  <TableCell className="font-medium">{questionnaire.title}</TableCell>
                  <TableCell>
                    <div>
                      <div>{questionnaire.supplier.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {questionnaire.supplier.companyId}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{questionnaire.sentDate}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {questionnaire.dueDate}
                      {questionnaire.status === "overdue" && (
                        <AlertCircle className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(questionnaire.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={questionnaire.completionRate} className="h-2 w-[60px]" />
                      <span className="text-sm">{questionnaire.completionRate}%</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">更多選項</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>問卷操作</DropdownMenuLabel>
                        <DropdownMenuItem 
                          onClick={() => {
                            setSelectedQuestionnaire(questionnaire);
                            setReminderDialogOpen(true);
                          }}
                        >
                          <Mail className="h-4 w-4 mr-2" />
                          發送填寫提醒
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedQuestionnaire(questionnaire);
                            setResendDialogOpen(true);
                          }}
                        >
                          <Clock className="h-4 w-4 mr-2" />
                          重設截止日期
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Download className="h-4 w-4 mr-2" />
                          匯出問卷資料
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      
      {/* 發送提醒對話框 */}
      {selectedQuestionnaire && (
        <Dialog open={reminderDialogOpen} onOpenChange={setReminderDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>發送問卷填寫提醒</DialogTitle>
              <DialogDescription>
                將向 {selectedQuestionnaire.supplier.name} 發送一封問卷填寫提醒郵件。
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="reminder-message">提醒訊息</Label>
                <Textarea 
                  id="reminder-message" 
                  placeholder="請填寫提醒訊息內容..." 
                  value={reminderMessage}
                  onChange={(e) => setReminderMessage(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-sm text-muted-foreground">收件人</Label>
                <div className="text-sm">{selectedQuestionnaire.supplier.email}</div>
              </div>
              <div className="space-y-1">
                <Label className="text-sm text-muted-foreground">問卷截止日期</Label>
                <div className="text-sm">{selectedQuestionnaire.dueDate}</div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setReminderDialogOpen(false)}>
                取消
              </Button>
              <Button onClick={handleSendReminder}>
                發送提醒
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
      
      {/* 重設截止日期對話框 */}
      {selectedQuestionnaire && (
        <Dialog open={resendDialogOpen} onOpenChange={setResendDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>重設問卷截止日期</DialogTitle>
              <DialogDescription>
                為 {selectedQuestionnaire.supplier.name} 的問卷重新設置截止日期。
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="due-date">新截止日期</Label>
                <Input 
                  id="due-date" 
                  type="date" 
                  defaultValue={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="resend-message">附加訊息</Label>
                <Textarea 
                  id="resend-message" 
                  placeholder="請填寫附加訊息內容..." 
                  className="min-h-[100px]"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-sm text-muted-foreground">收件人</Label>
                <div className="text-sm">{selectedQuestionnaire.supplier.email}</div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setResendDialogOpen(false)}>
                取消
              </Button>
              <Button onClick={handleResendQuestionnaire}>
                重設並發送通知
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

// 提供默認導出
export default QuestionnairePage 