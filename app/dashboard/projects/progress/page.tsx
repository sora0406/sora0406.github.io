"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { 
  ArrowLeft,
  Calendar,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  CircleAlert,
  Clock, 
  Search,
  Sliders,
} from "lucide-react"
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
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

// 模擬組織邊界
const organizationBoundaries = [
  { id: "boundary1", name: "台灣子公司" },
  { id: "boundary2", name: "中國製造基地" },
  { id: "boundary3", name: "美國分公司" },
  { id: "boundary4", name: "歐盟事業部" }
]

// 模擬專案資料
const projects = [
  {
    id: "p1",
    name: "台灣總部碳排放盤查",
    boundary: "boundary1",
    startDate: "2023-01-15",
    endDate: "2023-12-31",
    status: "in_progress", // in_progress, completed, delayed, not_started
    progress: 78,
    responsible: "張小明",
    subProjects: [
      {
        id: "p1-1",
        name: "範疇一排放盤查",
        progress: 100,
        status: "completed",
        dueDate: "2023-06-30"
      },
      {
        id: "p1-2",
        name: "範疇二排放盤查",
        progress: 95,
        status: "in_progress",
        dueDate: "2023-09-30"
      },
      {
        id: "p1-3",
        name: "範疇三排放盤查",
        progress: 45,
        status: "in_progress",
        dueDate: "2023-12-31"
      }
    ]
  },
  {
    id: "p2",
    name: "中國工廠能源轉型專案",
    boundary: "boundary2",
    startDate: "2023-03-10",
    endDate: "2023-11-30",
    status: "delayed",
    progress: 65,
    responsible: "李大華",
    subProjects: [
      {
        id: "p2-1",
        name: "太陽能板安裝",
        progress: 80,
        status: "delayed",
        dueDate: "2023-08-15"
      },
      {
        id: "p2-2",
        name: "能源管理系統建置",
        progress: 50,
        status: "in_progress",
        dueDate: "2023-10-30"
      }
    ]
  },
  {
    id: "p3",
    name: "美國市場永續包裝轉換",
    boundary: "boundary3",
    startDate: "2023-05-20",
    endDate: "2024-05-20",
    status: "in_progress",
    progress: 40,
    responsible: "John Smith",
    subProjects: [
      {
        id: "p3-1",
        name: "包裝材料研發",
        progress: 70,
        status: "in_progress",
        dueDate: "2023-11-30"
      },
      {
        id: "p3-2",
        name: "供應商認證",
        progress: 35,
        status: "in_progress",
        dueDate: "2024-02-28"
      },
      {
        id: "p3-3",
        name: "市場推廣",
        progress: 10,
        status: "not_started",
        dueDate: "2024-05-20"
      }
    ]
  },
  {
    id: "p4",
    name: "歐盟法規遵循專案",
    boundary: "boundary4",
    startDate: "2023-01-01",
    endDate: "2023-09-30",
    status: "completed",
    progress: 100,
    responsible: "Hans Mueller",
    subProjects: [
      {
        id: "p4-1",
        name: "CSRD報告準備",
        progress: 100,
        status: "completed",
        dueDate: "2023-06-30"
      },
      {
        id: "p4-2",
        name: "法規符合度評估",
        progress: 100,
        status: "completed",
        dueDate: "2023-09-30"
      }
    ]
  },
  {
    id: "p5",
    name: "台灣產品生命週期評估",
    boundary: "boundary1",
    startDate: "2023-07-01",
    endDate: "2024-02-28",
    status: "in_progress",
    progress: 35,
    responsible: "王美麗",
    subProjects: [
      {
        id: "p5-1",
        name: "資料收集與盤查",
        progress: 60,
        status: "in_progress",
        dueDate: "2023-10-31"
      },
      {
        id: "p5-2",
        name: "生命週期影響評估",
        progress: 20,
        status: "in_progress",
        dueDate: "2023-12-31"
      },
      {
        id: "p5-3",
        name: "報告編製與審查",
        progress: 0,
        status: "not_started",
        dueDate: "2024-02-28"
      }
    ]
  }
]

export default function ProjectProgressPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [boundaryFilter, setBoundaryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [expandedProject, setExpandedProject] = useState<string | null>(null)
  
  // 計算各類型專案數量
  const counts = {
    all: projects.length,
    in_progress: projects.filter(p => p.status === "in_progress").length,
    completed: projects.filter(p => p.status === "completed").length,
    delayed: projects.filter(p => p.status === "delayed").length,
  }
  
  // 計算總體完成率
  const overallProgress = Math.round(
    projects.reduce((sum, project) => sum + project.progress, 0) / projects.length
  )
  
  // 過濾專案
  const filteredProjects = projects.filter(project => {
    const matchesSearch = 
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.responsible.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesBoundary = boundaryFilter === "all" || project.boundary === boundaryFilter;
    const matchesStatus = statusFilter === "all" || project.status === statusFilter;
    
    return matchesSearch && matchesBoundary && matchesStatus;
  });
  
  // 獲取專案狀態標籤
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-500">已完成</Badge>;
      case "in_progress":
        return <Badge className="bg-blue-500">進行中</Badge>;
      case "delayed":
        return <Badge className="bg-amber-500">進度落後</Badge>;
      case "not_started":
        return <Badge className="bg-slate-500">未開始</Badge>;
      default:
        return null;
    }
  };
  
  // 獲取邊界名稱
  const getBoundaryName = (boundaryId: string) => {
    const boundary = organizationBoundaries.find(b => b.id === boundaryId);
    return boundary ? boundary.name : boundaryId;
  };
  
  // 處理專案展開/收合
  const toggleProject = (projectId: string) => {
    if (expandedProject === projectId) {
      setExpandedProject(null);
    } else {
      setExpandedProject(projectId);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <Button variant="ghost" size="sm" className="mb-2" onClick={() => router.push("/dashboard/projects")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            返回專案管理
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">專案進度追蹤</h1>
          <p className="text-sm text-muted-foreground">
            查看各組織邊界的專案進度和狀態
          </p>
        </div>
      </div>
      
      {/* 狀態統計卡片 */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">全部專案</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{counts.all}</div>
            <div className="text-xs text-muted-foreground mt-1">整體完成率 {overallProgress}%</div>
            <Progress value={overallProgress} className="h-2 mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">進行中</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-500">{counts.in_progress}</div>
            <div className="text-xs text-muted-foreground mt-1">佔總專案 {Math.round((counts.in_progress / counts.all) * 100)}%</div>
            <Progress value={(counts.in_progress / counts.all) * 100} className="h-2 mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">已完成</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">{counts.completed}</div>
            <div className="text-xs text-muted-foreground mt-1">佔總專案 {Math.round((counts.completed / counts.all) * 100)}%</div>
            <Progress value={(counts.completed / counts.all) * 100} className="h-2 mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">進度落後</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-500">{counts.delayed}</div>
            <div className="text-xs text-muted-foreground mt-1">佔總專案 {Math.round((counts.delayed / counts.all) * 100)}%</div>
            <Progress value={(counts.delayed / counts.all) * 100} className="h-2 mt-2" />
          </CardContent>
        </Card>
      </div>
      
      {/* 工具欄 */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="搜尋專案名稱或負責人..."
            className="pl-8 max-w-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          <Select value={boundaryFilter} onValueChange={setBoundaryFilter}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="選擇組織邊界" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">所有邊界</SelectItem>
              {organizationBoundaries.map(boundary => (
                <SelectItem key={boundary.id} value={boundary.id}>
                  {boundary.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="篩選狀態" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">所有狀態</SelectItem>
              <SelectItem value="in_progress">進行中</SelectItem>
              <SelectItem value="completed">已完成</SelectItem>
              <SelectItem value="delayed">進度落後</SelectItem>
              <SelectItem value="not_started">未開始</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* 專案列表 */}
      <div>
        {filteredProjects.length === 0 ? (
          <div className="text-center text-muted-foreground py-8 border rounded-md">
            找不到符合條件的專案
          </div>
        ) : (
          <div className="space-y-4">
            {filteredProjects.map(project => (
              <Card key={project.id} className="overflow-hidden">
                <CardHeader className="p-4 pb-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => toggleProject(project.id)} 
                        className="rounded-full w-8 h-8"
                      >
                        {expandedProject === project.id ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </Button>
                      <CardTitle className="text-lg">{project.name}</CardTitle>
                      {getStatusBadge(project.status)}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-sm text-muted-foreground">
                        負責人: {project.responsible}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-2">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 gap-2">
                    <div className="flex flex-wrap gap-4">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          {getBoundaryName(project.boundary)}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>
                          {project.startDate} 至 {project.endDate}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-sm font-medium">{project.progress}%</div>
                      <Progress value={project.progress} className="h-2 w-[120px]" />
                    </div>
                  </div>
                  
                  <Collapsible open={expandedProject === project.id}>
                    <CollapsibleContent className="pt-3 border-t mt-2">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>子專案名稱</TableHead>
                            <TableHead>截止日期</TableHead>
                            <TableHead>狀態</TableHead>
                            <TableHead>進度</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {project.subProjects.map(subProject => (
                            <TableRow key={subProject.id}>
                              <TableCell className="font-medium">
                                {subProject.name}
                              </TableCell>
                              <TableCell>{subProject.dueDate}</TableCell>
                              <TableCell>{getStatusBadge(subProject.status)}</TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <Progress value={subProject.progress} className="h-2 w-[80px]" />
                                  <span className="text-sm">{subProject.progress}%</span>
                                  {subProject.status === "delayed" && (
                                    <CircleAlert className="h-4 w-4 text-amber-500" />
                                  )}
                                  {subProject.status === "completed" && (
                                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                                  )}
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CollapsibleContent>
                  </Collapsible>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
} 