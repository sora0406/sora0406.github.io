"use client"

import { useState, useEffect } from "react"
import React from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { 
  ArrowLeft,
  CalendarIcon, 
  CheckCircle2, 
  ChevronDown, 
  Clock, 
  Download, 
  Eye, 
  FileText, 
  Filter, 
  MoreHorizontal, 
  Search, 
  ThumbsDown, 
  ThumbsUp, 
  XCircle
} from "lucide-react"
import { format } from "date-fns"

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
  DialogTitle
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
import { Progress } from "@/components/ui/progress"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

// 定義數據類型
type Supplier = {
  id: string;
  name: string;
  companyId: string;
  email: string;
}

type RequestData = {
  id: string;
  title: string;
  deadline: string;
}

type ResponseStatus = "pending_review" | "approved" | "rejected" | "needs_revision";

type Response = {
  id: string;
  requestId: string;
  request: RequestData;
  supplier: Supplier;
  submittedAt: string;
  status: ResponseStatus;
  reviewedAt: string | null;
  reviewComment: string | null;
  files: {
    id: string;
    name: string;
    type: string;
    size: string;
  }[];
}

// 模擬回應數據
const responseData: Response[] = [
  {
    id: "resp1",
    requestId: "1",
    request: {
      id: "1",
      title: "2023年度碳排放數據收集",
      deadline: "2023-12-31",
    },
    supplier: {
      id: "s1",
      name: "新竹物流",
      companyId: "TW12345678",
      email: "contact@hct.com.tw",
    },
    submittedAt: "2023-10-15",
    status: "pending_review",
    reviewedAt: null,
    reviewComment: null,
    files: [
      {
        id: "f1",
        name: "碳排放報告2023.pdf",
        type: "application/pdf",
        size: "2.5 MB",
      },
      {
        id: "f2",
        name: "產品碳足跡清單.xlsx",
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        size: "1.8 MB",
      }
    ]
  },
  {
    id: "resp2",
    requestId: "1",
    request: {
      id: "1",
      title: "2023年度碳排放數據收集",
      deadline: "2023-12-31",
    },
    supplier: {
      id: "s2",
      name: "統一速達",
      companyId: "TW23456789",
      email: "info@t-cat.com.tw",
    },
    submittedAt: "2023-10-10",
    status: "approved",
    reviewedAt: "2023-10-12",
    reviewComment: "數據完整，符合要求標準。",
    files: [
      {
        id: "f3",
        name: "統一速達碳排放數據.pdf",
        type: "application/pdf",
        size: "3.1 MB",
      }
    ]
  },
  {
    id: "resp3",
    requestId: "2",
    request: {
      id: "2",
      title: "供應商基本信息更新",
      deadline: "2023-11-15",
    },
    supplier: {
      id: "s3",
      name: "宅配通",
      companyId: "TW34567890",
      email: "contact@pelican.com.tw",
    },
    submittedAt: "2023-10-20",
    status: "needs_revision",
    reviewedAt: "2023-10-22",
    reviewComment: "公司地址信息不完整，請提供詳細地址。",
    files: [
      {
        id: "f4",
        name: "公司基本資訊.docx",
        type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        size: "850 KB",
      }
    ]
  },
  {
    id: "resp4",
    requestId: "2",
    request: {
      id: "2",
      title: "供應商基本信息更新",
      deadline: "2023-11-15",
    },
    supplier: {
      id: "s1",
      name: "新竹物流",
      companyId: "TW12345678",
      email: "contact@hct.com.tw",
    },
    submittedAt: "2023-10-05",
    status: "rejected",
    reviewedAt: "2023-10-08",
    reviewComment: "提供的資訊與實際不符，請重新提交正確資訊。",
    files: [
      {
        id: "f5",
        name: "新竹物流基本資訊更新.pdf",
        type: "application/pdf",
        size: "1.2 MB",
      }
    ]
  },
  {
    id: "resp5",
    requestId: "3",
    request: {
      id: "3",
      title: "產品碳足跡調查",
      deadline: "2023-10-30",
    },
    supplier: {
      id: "s4",
      name: "長榮國際儲運",
      companyId: "TW45678901",
      email: "service@evergreen.com.tw",
    },
    submittedAt: "2023-10-25",
    status: "pending_review",
    reviewedAt: null,
    reviewComment: null,
    files: [
      {
        id: "f6",
        name: "產品碳足跡數據.xlsx",
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        size: "2.3 MB",
      },
      {
        id: "f7",
        name: "產品清單.pdf",
        type: "application/pdf",
        size: "1.5 MB",
      }
    ]
  }
];

export default function ResponsesPage({ t }: { t?: any }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [responses, setResponses] = useState<Response[]>(responseData);
  const [searchTerm, setSearchTerm] = useState("");
  // 從URL獲取要求ID並設置過濾器
  const requestParam = searchParams.get('request');
  const [statusFilter, setStatusFilter] = useState<ResponseStatus | "all">("all");
  const [requestFilter, setRequestFilter] = useState<string>(requestParam || "all");
  const [selectedResponse, setSelectedResponse] = useState<Response | null>(null);
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const [reviewComment, setReviewComment] = useState("");
  const [reviewStatus, setReviewStatus] = useState<ResponseStatus>("pending_review");
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);

  // 計算各狀態的回應數量
  const counts = {
    all: responses.length,
    pending_review: responses.filter(r => r.status === "pending_review").length,
    approved: responses.filter(r => r.status === "approved").length,
    rejected: responses.filter(r => r.status === "rejected").length,
    needs_revision: responses.filter(r => r.status === "needs_revision").length,
  };

  // 獲取所有唯一的數據要求
  const uniqueRequests = Array.from(
    new Set(responses.map(response => response.requestId))
  ).map(requestId => {
    const response = responses.find(r => r.requestId === requestId);
    return {
      id: requestId,
      title: response?.request.title || ""
    };
  });

  // 過濾回應
  const filteredResponses = responses.filter(response => {
    const matchesSearch = 
      response.request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      response.supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      response.supplier.companyId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || response.status === statusFilter;
    const matchesRequest = requestFilter === "all" || response.requestId === requestFilter;
    
    return matchesSearch && matchesStatus && matchesRequest;
  });

  // 獲取回應狀態標籤
  const getStatusBadge = (status: ResponseStatus): React.ReactNode => {
    switch (status) {
      case "pending_review":
        return <Badge className="bg-amber-500">待審核</Badge>;
      case "approved":
        return <Badge className="bg-green-500">已通過</Badge>;
      case "rejected":
        return <Badge className="bg-red-500">已拒絕</Badge>;
      case "needs_revision":
        return <Badge className="bg-blue-500">需修改</Badge>;
      default:
        return <Badge className="bg-slate-500">未知狀態</Badge>;
    }
  };

  // 獲取檔案圖標
  const getFileIcon = (fileType: string): React.ReactNode => {
    if (fileType.includes("pdf")) {
      return <FileText className="h-4 w-4 text-red-500" />;
    } else if (fileType.includes("spreadsheet") || fileType.includes("excel")) {
      return <FileText className="h-4 w-4 text-green-500" />;
    } else if (fileType.includes("word") || fileType.includes("document")) {
      return <FileText className="h-4 w-4 text-blue-500" />;
    } else {
      return <FileText className="h-4 w-4 text-gray-500" />;
    }
  };

  // 處理審核提交
  const handleReviewSubmit = () => {
    if (!selectedResponse) return;

    // 更新回應狀態
    const updatedResponses = responses.map(response => {
      if (response.id === selectedResponse.id) {
        return {
          ...response,
          status: reviewStatus,
          reviewedAt: new Date().toISOString().split('T')[0],
          reviewComment: reviewComment || null
        };
      }
      return response;
    });

    setResponses(updatedResponses);
    setReviewDialogOpen(false);
    setReviewComment("");

    toast({
      title: "審核已完成",
      description: `供應商 ${selectedResponse.supplier.name} 的回應已${
        reviewStatus === "approved" ? "通過" : 
        reviewStatus === "rejected" ? "拒絕" : 
        "需要修改"
      }`,
    });
  };

  // 查看回應詳情
  const handleViewDetails = (response: Response) => {
    setSelectedResponse(response);
    setDetailsDialogOpen(true);
  };

  // 開始審核流程
  const handleStartReview = (response: Response) => {
    setSelectedResponse(response);
    setReviewStatus(response.status);
    setReviewComment(response.reviewComment || "");
    setReviewDialogOpen(true);
  };

  // 如果有特定的請求ID，篩選僅顯示該請求的回應
  useEffect(() => {
    if (requestParam) {
      setResponses(responseData.filter(response => response.requestId === requestParam));
    } else {
      setResponses(responseData);
    }
  }, [requestParam]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{t?.('responses_title') || '回應列表'}</h1>
          <p className="text-sm text-muted-foreground">
            {requestParam 
              ? t?.('responses_for_specific_request') || `查看特定數據要求的回應` 
              : t?.('responses_for_all_requests') || `所有要求的回應`}
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => router.back()}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t?.('back') || '返回'}
          </Button>
        </div>
      </div>
      
      {/* 狀態統計卡片 */}
      <div className="grid gap-4 md:grid-cols-5">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">全部回應</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{counts.all}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">待審核</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-500">{counts.pending_review}</div>
            <Progress value={(counts.pending_review / counts.all) * 100} className="h-2 mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">已通過</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">{counts.approved}</div>
            <Progress value={(counts.approved / counts.all) * 100} className="h-2 mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">已拒絕</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">{counts.rejected}</div>
            <Progress value={(counts.rejected / counts.all) * 100} className="h-2 mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">需修改</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-500">{counts.needs_revision}</div>
            <Progress value={(counts.needs_revision / counts.all) * 100} className="h-2 mt-2" />
          </CardContent>
        </Card>
      </div>
      
      {/* 工具欄 */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex mb-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder={t?.('search') || "搜索供應商或請求..."}
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="flex gap-2 shrink-0 flex-wrap">
          <Select value={requestFilter} onValueChange={setRequestFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={t?.('filter') || "選擇數據要求"} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t?.('view_all') || "所有數據要求"}</SelectItem>
              {uniqueRequests.map(request => (
                <SelectItem key={request.id} value={request.id}>
                  {request.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={statusFilter} onValueChange={setStatusFilter as (value: string) => void}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder={t?.('filter') || "篩選狀態"} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t?.('view_all') || "所有狀態"}</SelectItem>
              <SelectItem value="pending_review">待審核</SelectItem>
              <SelectItem value="approved">已通過</SelectItem>
              <SelectItem value="rejected">已拒絕</SelectItem>
              <SelectItem value="needs_revision">需修改</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* 數據回應表格 */}
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50">
              <TableHead className="w-[250px]">{t?.('request_name') || "要求名稱"}</TableHead>
              <TableHead className="w-[200px]">{t?.('supplier') || "供應商"}</TableHead>
              <TableHead className="w-[120px]">{t?.('submission_date') || "提交日期"}</TableHead>
              <TableHead className="w-[120px]">狀態</TableHead>
              <TableHead>檔案</TableHead>
              <TableHead className="text-right">{t?.('action') || "操作"}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredResponses.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  沒有找到符合的回應
                </TableCell>
              </TableRow>
            ) : (
              filteredResponses.map(response => (
                <TableRow key={response.id}>
                  <TableCell className="font-medium">
                    <div className="flex flex-col">
                      <span>{response.request.title}</span>
                      <span className="text-xs text-muted-foreground">
                        截止日期: {response.request.deadline}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span>{response.supplier.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {response.supplier.companyId}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{response.submittedAt}</TableCell>
                  <TableCell>{getStatusBadge(response.status)}</TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      {response.files.map(file => (
                        <div key={file.id} className="flex items-center text-sm">
                          {getFileIcon(file.type)}
                          <span className="ml-2">{file.name}</span>
                          <span className="ml-1 text-xs text-muted-foreground">
                            ({file.size})
                          </span>
                        </div>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">菜單</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>{t?.('action') || "操作"}</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleViewDetails(response)}>
                          <Eye className="h-4 w-4 mr-2" />
                          {t?.('view_response') || "查看回應"}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleStartReview(response)}>
                          <CheckCircle2 className="h-4 w-4 mr-2" />
                          審核
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="h-4 w-4 mr-2" />
                          下載所有檔案
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
      
      {/* 詳情對話框 */}
      {selectedResponse && (
        <Dialog open={detailsDialogOpen} onOpenChange={setDetailsDialogOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>回應詳情</DialogTitle>
              <DialogDescription>
                查看 {selectedResponse.supplier.name} 對於 {selectedResponse.request.title} 的回應詳情
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">數據要求</h3>
                  <p className="text-base">{selectedResponse.request.title}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">截止日期</h3>
                  <p className="text-base">{selectedResponse.request.deadline}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">供應商</h3>
                  <p className="text-base">{selectedResponse.supplier.name}</p>
                  <p className="text-xs text-muted-foreground">{selectedResponse.supplier.companyId}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">提交時間</h3>
                  <p className="text-base">{selectedResponse.submittedAt}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">狀態</h3>
                  <div>{getStatusBadge(selectedResponse.status)}</div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">審核時間</h3>
                  <p className="text-base">{selectedResponse.reviewedAt || "尚未審核"}</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">審核評論</h3>
                {selectedResponse.reviewComment ? (
                  <p className="text-base p-3 bg-gray-50 rounded-md">{selectedResponse.reviewComment}</p>
                ) : (
                  <p className="text-muted-foreground">尚無審核評論</p>
                )}
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">提交的檔案</h3>
                <div className="space-y-2">
                  {selectedResponse.files.map(file => (
                    <div key={file.id} className="flex items-center justify-between p-2 border rounded-md">
                      <div className="flex items-center gap-2">
                        {getFileIcon(file.type)}
                        <span>{file.name}</span>
                        <span className="text-xs text-muted-foreground">({file.size})</span>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        下載
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDetailsDialogOpen(false)}>
                關閉
              </Button>
              <Button onClick={() => {
                setDetailsDialogOpen(false);
                handleStartReview(selectedResponse);
              }}>
                審核
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
      
      {/* 審核對話框 */}
      {selectedResponse && (
        <Dialog open={reviewDialogOpen} onOpenChange={setReviewDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>審核回應</DialogTitle>
              <DialogDescription>
                審核 {selectedResponse.supplier.name} 對於 {selectedResponse.request.title} 的回應
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4 mb-2">
                <div>
                  <Label className="text-sm text-muted-foreground">供應商</Label>
                  <div className="text-sm font-medium">{selectedResponse.supplier.name}</div>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">提交時間</Label>
                  <div className="text-sm">{selectedResponse.submittedAt}</div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="review-status">審核結果</Label>
                <Select value={reviewStatus} onValueChange={setReviewStatus as (value: string) => void}>
                  <SelectTrigger id="review-status">
                    <SelectValue placeholder="選擇審核結果" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="approved">
                      <div className="flex items-center">
                        <ThumbsUp className="h-4 w-4 mr-2 text-green-500" />
                        通過
                      </div>
                    </SelectItem>
                    <SelectItem value="rejected">
                      <div className="flex items-center">
                        <ThumbsDown className="h-4 w-4 mr-2 text-red-500" />
                        拒絕
                      </div>
                    </SelectItem>
                    <SelectItem value="needs_revision">
                      <div className="flex items-center">
                        <XCircle className="h-4 w-4 mr-2 text-blue-500" />
                        需要修改
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="review-comment">審核評論</Label>
                <Textarea 
                  id="review-comment" 
                  placeholder="請填寫審核評論..." 
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  className="min-h-[120px]"
                />
              </div>
              
              <div className="space-y-2">
                <Label>提交的檔案</Label>
                <div className="max-h-[200px] overflow-y-auto space-y-2">
                  {selectedResponse.files.map(file => (
                    <div key={file.id} className="flex items-center justify-between p-2 border rounded-md">
                      <div className="flex items-center gap-2">
                        {getFileIcon(file.type)}
                        <span>{file.name}</span>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setReviewDialogOpen(false)}>
                取消
              </Button>
              <Button onClick={handleReviewSubmit}>
                提交審核
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
} 