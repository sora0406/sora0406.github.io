"use client"

import React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, ChevronLeft, ChevronRight, FileText, Home, Menu, Package, Users, ClipboardList, ClipboardCheck, Briefcase } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

// 擴展路由定義，增加子路由
const routes = [
  // 問卷分析改名為戰情室，移到最前面
  {
    path: "/dashboard/survey-results",
    name: "碳排放戰情室",
    icon: BarChart3,
    subRoutes: [
      { path: "/dashboard/survey-results/export", name: "數據匯出" }
    ],
  },

  {
    path: "/dashboard/supply-chain",
    name: "供應鏈管理",
    icon: Package,
    subRoutes: [
      { path: "/dashboard/suppliers", name: "供應商管理" },
      { path: "/dashboard/requests", name: "數據要求" },
      { path: "/dashboard/projects/questionnaires", name: "問卷追蹤" },
      { path: "/dashboard/survey-results", name: "戰情室" },
      // 暫時隱藏的路由
      // { path: "/dashboard/surveys", name: "問卷模板管理" },
      // { path: "/dashboard/my-surveys", name: "我的問卷" },
    ]
  },

  {
    path: "/dashboard/projects/progress",
    name: "組織計畫",
    icon: Briefcase,
  },
  
  // 以下路由保留但不在主導航中顯示，只通過子路由訪問
  // 供應商管理移到供應鏈子路由中
  {
    path: "/dashboard/suppliers",
    name: "供應商管理",
    icon: Users,
    subRoutes: [
      { path: "/dashboard/suppliers/new", name: "創建供應商" }
    ],
    hideInMainNav: true // 新增標記，表示在主導航中隱藏
  },

  // 數據要求移到供應鏈子路由中
  {
    path: "/dashboard/requests",
    name: "數據要求",
    icon: FileText,
    subRoutes: [
      { path: "/dashboard/requests/new", name: "創建數據要求" }
    ],
    hideInMainNav: true // 新增標記，表示在主導航中隱藏
  },
  
  // 問卷追蹤移到供應鏈子路由中
  {
    path: "/dashboard/projects/questionnaires",
    name: "問卷追蹤",
    icon: ClipboardList,
    hideInMainNav: true // 新增標記，表示在主導航中隱藏
  },
  
  // 暫時隱藏但保留以後使用
  {
    path: "/dashboard/surveys",
    name: "問卷模板管理",
    icon: ClipboardList,
    subRoutes: [
      { path: "/dashboard/surveys/new", name: "創建問卷" }
    ],
    hidden: true, // 新增標記，表示完全隱藏
    hideInMainNav: true
  },
  
  // 暫時隱藏但保留以後使用
  {
    path: "/dashboard/my-surveys",
    name: "我的問卷",
    icon: ClipboardCheck,
    subRoutes: [
      { path: "/dashboard/my-surveys/history", name: "問卷歷史" }
    ],
    hidden: true, // 新增標記，表示完全隱藏
    hideInMainNav: true
  },
]

// 定義精確的路徑映射表
const exactPathMap: Record<string, string> = {
  "/dashboard": "儀表板",
  "/dashboard/supply-chain": "供應鏈管理",
  "/dashboard/suppliers": "供應商管理",
  "/dashboard/suppliers/new": "創建供應商",
  "/dashboard/requests": "數據要求",
  "/dashboard/requests/new": "創建數據要求",
  "/dashboard/surveys": "問卷模板管理",
  "/dashboard/surveys/new": "創建問卷",
  "/dashboard/my-surveys": "我的問卷",
  "/dashboard/my-surveys/history": "問卷歷史",
  "/dashboard/survey-results": "碳排放戰情室",
  "/dashboard/survey-results/export": "數據匯出",
  "/dashboard/projects": "計畫管理",
  "/dashboard/projects/questionnaires": "問卷追蹤",
  "/dashboard/projects/progress": "組織計畫",
};

// 導航路徑部分生成函數
const generateBreadcrumbs = (path: string) => {
  // 移除開頭斜線並分割路徑
  const pathWithoutSlash = path.startsWith('/') ? path.substring(1) : path;
  const pathSegments = pathWithoutSlash.split('/');
  
  // 生成麵包屑數組
  const breadcrumbs = [];
  let currentPath = '';
  
  for (let i = 0; i < pathSegments.length; i++) {
    const segment = pathSegments[i];
    currentPath = currentPath ? `${currentPath}/${segment}` : segment;
    
    // 如果是數字，則可能是ID，嘗試獲取上一層的名稱
    if (!isNaN(Number(segment)) && i > 0) {
      const prevSegment = pathSegments[i-1];
      // 根據上一層段落判斷類型
      if (prevSegment === 'suppliers') {
        breadcrumbs.push({ path: `/${currentPath}`, name: "供應商詳情" });
      } else if (prevSegment === 'requests') {
        breadcrumbs.push({ path: `/${currentPath}`, name: "數據要求詳情" });
      } else if (prevSegment === 'surveys') {
        breadcrumbs.push({ path: `/${currentPath}`, name: "問卷詳情" });
      } else if (prevSegment === 'my-surveys') {
        breadcrumbs.push({ path: `/${currentPath}`, name: "問卷詳情" });
      } else {
        breadcrumbs.push({ path: `/${currentPath}`, name: segment });
      }
    } else {
      // 使用路徑映射表獲取名稱，或直接使用段落名稱
      const fullPath = `/${currentPath}`;
      const segmentName = exactPathMap[fullPath] || segment.charAt(0).toUpperCase() + segment.slice(1);
      breadcrumbs.push({ path: fullPath, name: segmentName });
    }
  }
  
  return breadcrumbs;
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [expanded, setExpanded] = useState(false)
  const [openSubMenu, setOpenSubMenu] = useState("")
  const pathname = usePathname()

  // 使用直接的路徑映射表獲取頁面標題
  let pageName = exactPathMap[pathname] || "供應鏈管理系統";
  
  // 處理動態路徑
  if (!pageName || pageName === "供應鏈管理系統") {
    if (pathname.match(/^\/dashboard\/suppliers\/\d+\/edit/)) {
      pageName = "編輯供應商";
    } else if (pathname.match(/^\/dashboard\/suppliers\/\d+/)) {
      pageName = "供應商詳情";
    } else if (pathname.match(/^\/dashboard\/requests\/\d+\/edit/)) {
      pageName = "編輯數據要求";
    } else if (pathname.match(/^\/dashboard\/requests\/\d+/)) {
      pageName = "數據要求詳情";
    } else if (pathname.match(/^\/dashboard\/surveys\/\d+\/edit/)) {
      pageName = "編輯問卷";
    } else if (pathname.match(/^\/dashboard\/surveys\/\d+/)) {
      pageName = "問卷詳情";
    } else if (pathname.match(/^\/dashboard\/my-surveys\/\d+\/history/)) {
      pageName = "問卷版本歷史";
    } else if (pathname.match(/^\/dashboard\/my-surveys\/\d+\/edit/)) {
      pageName = "編輯問卷";
    } else if (pathname.match(/^\/dashboard\/my-surveys\/\d+/)) {
      pageName = "問卷詳情";
    } else {
      // 如果都沒匹配到，嘗試從主路由獲取名稱
      const mainRoute = routes.find(route => pathname.startsWith(route.path));
      if (mainRoute) {
        pageName = mainRoute.name;
      }
    }
  }

  // 在窗口大小變化時處理側邊欄狀態
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setExpanded(false)
      }
    }

    window.addEventListener("resize", handleResize)
    handleResize() // 初始化

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // 輸出調試信息
  console.log('當前路徑:', pathname);
  console.log('頁面標題:', pageName);

  // 生成當前頁面的麵包屑
  const breadcrumbs = generateBreadcrumbs(pathname);

  // 切換子菜單的開關狀態
  const toggleSubMenu = (path: string) => {
    if (openSubMenu === path) {
      setOpenSubMenu("")
    } else {
      setOpenSubMenu(path)
    }
  }

  return (
    <div className="flex min-h-screen">
      {/* 桌面側邊欄 */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-20 h-full border-r transition-all duration-300 hidden lg:block",
          expanded ? "w-64" : "w-16",
        )}
        style={{ backgroundColor: "#000000" }}
      >
        <div className="flex h-16 items-center justify-center border-b" style={{ borderColor: "#333333" }}>
          <Link href="/dashboard" className="flex items-center gap-2">
            {/* <Package className="h-6 w-6 text-white" /> */}
            <svg className="h-8 w-8 " width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M51.7548 39.9453C52.2481 39.9453 52.6648 39.7699 53.0266 39.4081C53.3884 39.0463 53.5638 38.6297 53.5638 38.1363V13.2597C53.5638 12.7663 53.3884 12.3607 53.032 12.0208C52.6702 11.6699 52.2536 11.5 51.7548 11.5C51.3327 11.5 50.9654 11.6206 50.6474 11.8673L29.9754 28.4006L29.8657 28.3129L9.34713 11.8618C9.02919 11.6206 8.66738 11.5 8.24528 11.5H8.14661C7.65872 11.5 7.26403 11.6699 6.93512 12.0208C6.59524 12.3826 6.43079 12.7882 6.43079 13.2597V38.1363C6.43079 38.6352 6.60072 39.0518 6.95156 39.4136C7.29692 39.7699 7.70806 39.9453 8.21787 39.9453C8.72768 39.9453 9.13882 39.7699 9.48418 39.4136C9.83502 39.0518 10.005 38.6297 10.005 38.1363V16.9819L10.29 17.2121L28.8735 32.0898C29.186 32.3311 29.5478 32.4517 29.9754 32.4517C30.4029 32.4517 30.7922 32.3256 31.1485 32.0734L49.9403 16.9873V38.1473C49.9403 38.6407 50.1157 39.0573 50.4775 39.4191C50.8393 39.7809 51.2504 39.9563 51.7493 39.9563L51.7548 39.9453ZM7.48327 44.7858H11.6495C11.7646 44.7858 11.8578 44.7475 11.9345 44.6707C12.0113 44.594 12.0497 44.5008 12.0497 44.3911C12.0497 44.2815 12.0113 44.1938 11.9345 44.117C11.8578 44.0403 11.7646 44.0019 11.6495 44.0019H7.48327C6.79804 44.0019 6.21148 44.2431 5.72359 44.731C5.23571 45.2189 4.99451 45.8 4.99451 46.4797C4.99451 47.1595 5.23571 47.746 5.72359 48.2339C6.206 48.7218 6.79256 48.963 7.48327 48.963H11.6495C11.7646 48.963 11.8578 48.9246 11.9345 48.8479C12.0113 48.7711 12.0497 48.6779 12.0497 48.5683C12.0497 48.4587 12.0113 48.3655 11.9345 48.2887C11.8578 48.212 11.7646 48.1736 11.6495 48.1736H7.48327C7.01183 48.1736 6.61165 48.0092 6.28274 47.6802C5.95383 47.3513 5.78938 46.9512 5.78938 46.4852C5.78938 46.0192 5.95383 45.6136 6.28274 45.2902C6.61165 44.9612 7.01183 44.7968 7.48327 44.7968V44.7858ZM17.2903 43.9964C17.4109 43.9964 17.5041 44.0403 17.5754 44.1335H17.5644L21.1111 48.3052C21.1769 48.3764 21.2098 48.4587 21.2098 48.5573C21.2098 48.6779 21.166 48.7766 21.0728 48.8588C21.0015 48.9246 20.9138 48.9575 20.8151 48.9575C20.6945 48.9575 20.5959 48.9137 20.5136 48.8205L17.2684 44.9941L14.0286 48.8205C13.9464 48.9137 13.8477 48.9575 13.7271 48.9575C13.6339 48.9575 13.5462 48.9246 13.4694 48.8588C13.3763 48.7766 13.3324 48.6779 13.3324 48.5573C13.3324 48.4587 13.3653 48.3764 13.4311 48.3052L16.9723 44.1335C17.0546 44.0403 17.1532 43.9964 17.2739 43.9964H17.2903ZM29.1366 46.4413C29.4162 46.1563 29.5587 45.8164 29.5587 45.4272C29.5587 45.038 29.4162 44.6981 29.1366 44.4185C28.857 44.139 28.5171 43.9964 28.1225 43.9964H22.9092C22.7941 43.9964 22.7009 44.0348 22.6242 44.1115C22.5474 44.1883 22.509 44.2815 22.509 44.3856V48.5573C22.509 48.667 22.5474 48.7602 22.6242 48.8369C22.7009 48.9137 22.7941 48.952 22.9037 48.952C23.0134 48.952 23.1066 48.9137 23.1833 48.8369C23.26 48.7602 23.2984 48.667 23.2984 48.5573V46.8689H25.9133L28.9392 48.8808C29.0105 48.9301 29.0818 48.952 29.1585 48.952C29.2188 48.952 29.2791 48.9356 29.3449 48.8972C29.4107 48.8643 29.46 48.8205 29.4929 48.7711C29.5368 48.7053 29.5587 48.6341 29.5587 48.5518C29.5587 48.4915 29.5423 48.4313 29.5039 48.3709C29.471 48.3107 29.4271 48.2613 29.3778 48.2284L27.3331 46.8634H28.1225C28.5171 46.8634 28.857 46.7209 29.1366 46.4359V46.4413ZM26.0393 46.0741H23.3039V44.7858H28.1279C28.3088 44.7858 28.4568 44.8461 28.5884 44.9722C28.7145 45.0983 28.7803 45.2518 28.7803 45.4327C28.7803 45.6136 28.7145 45.7671 28.5884 45.8932C28.4623 46.0192 28.3088 46.0795 28.1279 46.0795H26.0393V46.0741ZM37.6883 45.4327C37.6883 45.789 37.5677 46.1069 37.332 46.3756C37.5074 46.5126 37.6444 46.6825 37.7486 46.8799C37.8527 47.0827 37.9021 47.2965 37.9021 47.5213C37.9021 47.9105 37.7596 48.2449 37.48 48.5299C37.2004 48.815 36.8605 48.9575 36.4658 48.9575H31.2526C31.1375 48.9575 31.0443 48.9191 30.9675 48.8424C30.8908 48.7656 30.8524 48.6725 30.8524 48.5628V46.4742V46.4523V44.4076V44.3856C30.8524 44.2815 30.8908 44.1883 30.9675 44.1115C31.0443 44.0348 31.1375 43.9964 31.2526 43.9964H36.252C36.6467 43.9964 36.9866 44.139 37.2662 44.4185C37.5458 44.6981 37.6883 45.038 37.6883 45.4327ZM36.8989 45.4327C36.8989 45.2518 36.8386 45.0983 36.7125 44.9722V44.9777C36.5919 44.8516 36.4384 44.7913 36.252 44.7913H31.6418V46.0795H36.252C36.4329 46.0795 36.5864 46.0192 36.7125 45.8932C36.8386 45.7671 36.8989 45.6136 36.8989 45.4327ZM36.4658 48.1626C36.6467 48.1626 36.8002 48.1023 36.9263 47.9763H36.9208C37.0469 47.8502 37.1072 47.6967 37.1072 47.5158C37.1072 47.3349 37.0469 47.1814 36.9208 47.0553C36.8002 46.9292 36.6467 46.8689 36.4604 46.8689H31.6418V47.2965V48.1626H36.4658ZM44.1734 43.9964H41.5201C40.8349 43.9964 40.2483 44.2376 39.7605 44.7255C39.2726 45.2134 39.0314 45.7945 39.0314 46.4742C39.0314 47.154 39.2726 47.7405 39.7605 48.2284C40.2429 48.7163 40.8294 48.9575 41.5201 48.9575H44.1734C44.8586 48.9575 45.4451 48.7163 45.933 48.2284C46.4154 47.7405 46.6621 47.154 46.6621 46.4742C46.6621 45.7945 46.4209 45.2079 45.933 44.7255C45.4506 44.2431 44.8641 43.9964 44.1734 43.9964ZM45.3794 47.6693C45.0504 47.9982 44.6503 48.1626 44.1788 48.1626H41.5256C41.0542 48.1626 40.654 47.9982 40.3251 47.6693C39.9962 47.3404 39.8317 46.9402 39.8317 46.4742C39.8317 46.0083 39.9962 45.6026 40.3251 45.2792C40.654 44.9503 41.0542 44.7858 41.5256 44.7858H44.1788C44.6503 44.7858 45.0504 44.9503 45.3794 45.2792C45.7083 45.6081 45.8727 46.0083 45.8727 46.4742C45.8727 46.9402 45.7083 47.3458 45.3794 47.6693ZM54.6053 43.9964C54.7149 43.9964 54.8081 44.0348 54.8849 44.1115C54.9616 44.1883 55 44.276 55 44.3856V48.5573C55 48.667 54.9616 48.7602 54.8849 48.8369C54.8081 48.9137 54.7149 48.952 54.5998 48.952C54.5231 48.952 54.4518 48.9301 54.3805 48.8808L48.7397 45.1202V48.5573C48.7397 48.667 48.7013 48.7602 48.6246 48.8369C48.5478 48.9137 48.4546 48.952 48.345 48.952C48.2354 48.952 48.1422 48.9137 48.0654 48.8369C47.9887 48.7602 47.9503 48.667 47.9503 48.5573V44.3856C47.9503 44.2815 47.9887 44.1883 48.0654 44.1115C48.1367 44.0348 48.2299 43.9964 48.3395 43.9964H48.345C48.4218 43.9964 48.493 44.0184 48.5588 44.0622L54.2106 47.8228V44.3856C54.2106 44.2815 54.249 44.1883 54.3257 44.1115C54.4025 44.0348 54.4957 43.9964 54.6053 43.9964Z" fill="#F2A900"/>
</svg>

            {expanded && <span className="text-lg font-bold text-white">CarbonM</span>}
          </Link>
        </div>
        <div className="flex flex-col gap-2 p-2">
          {routes.filter(route => !route.hideInMainNav && !route.hidden).map((route) => (
            <div key={route.path}>
              <div
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 transition-colors group",
                  (pathname === route.path || pathname.startsWith(`${route.path}/`) || openSubMenu === route.path)
                    ? "bg-[#ffffff]/[0.16] text-[#F2A900]"
                    : "text-[#ADADAD] hover:bg-[#F2A900]/[0.16] hover:text-[#F2A900]",
                  "cursor-pointer"
                )}
                onClick={() => route.subRoutes && route.subRoutes.length > 0 ? toggleSubMenu(route.path) : undefined}
              >
                <Link
                  href={route.path}
                  className="flex items-center gap-3 flex-1"
                  onClick={(e) => {
                    if (route.subRoutes && route.subRoutes.length > 0) {
                      e.preventDefault();
                    }
                  }}
                >
                  <route.icon className={cn(
                    "h-5 w-5",
                    (pathname === route.path || pathname.startsWith(`${route.path}/`) || openSubMenu === route.path)
                      ? "text-[#F2A900]" 
                      : "text-[#ADADAD] group-hover:text-[#F2A900]"
                  )} />
                  {expanded && <span>{route.name}</span>}
                </Link>
                {expanded && route.subRoutes && route.subRoutes.length > 0 && (
                  <ChevronRight 
                    className={cn(
                      "h-4 w-4 transition-transform",
                      openSubMenu === route.path ? "rotate-90" : ""
                    )}
                  />
                )}
              </div>
              
              {/* 子路由菜單 */}
              {expanded && route.subRoutes && route.subRoutes.length > 0 && openSubMenu === route.path && (
                <div className="ml-4 pl-4 border-l border-[#333333] space-y-1 mt-1">
                  {route.subRoutes.map((subRoute) => (
                    <Link
                      key={subRoute.path}
                      href={subRoute.path}
                      className={cn(
                        "flex items-center gap-2 rounded-lg px-3 py-2 text-sm",
                        pathname === subRoute.path || pathname.startsWith(`${subRoute.path}/`)
                          ? "text-[#F2A900]"
                          : "text-[#ADADAD] hover:text-[#F2A900]"
                      )}
                    >
                      {subRoute.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="absolute -right-3 top-20 rounded-full border border-[#333333] bg-black text-[#F2A900] shadow-md hover:bg-[#F2A900]/[0.16]"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </Button>
      </aside>

      <div className={cn("flex flex-col flex-1", expanded ? "lg:ml-64" : "lg:ml-16")}>
        {/* 頂部工具欄 */}
        <header className="sticky top-0 z-10 border-b bg-background">
          <div className="pr-4 flex h-16 items-center justify-between py-4">
            <div className="flex items-center gap-2">
              {/* 移動端側邊欄觸發器 */}
              <div className="lg:hidden">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Menu className="h-5 w-5" />
                      <span className="sr-only">切換選單</span>
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-64 p-0" style={{ backgroundColor: "#000000" }}>
                    <div className="flex h-16 items-center px-4 border-b" style={{ borderColor: "#333333" }}>
                      <Link href="/dashboard" className="flex items-center gap-2">
                        <svg className="h-8 w-8 " width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M51.7548 39.9453C52.2481 39.9453 52.6648 39.7699 53.0266 39.4081C53.3884 39.0463 53.5638 38.6297 53.5638 38.1363V13.2597C53.5638 12.7663 53.3884 12.3607 53.032 12.0208C52.6702 11.6699 52.2536 11.5 51.7548 11.5C51.3327 11.5 50.9654 11.6206 50.6474 11.8673L29.9754 28.4006L29.8657 28.3129L9.34713 11.8618C9.02919 11.6206 8.66738 11.5 8.24528 11.5H8.14661C7.65872 11.5 7.26403 11.6699 6.93512 12.0208C6.59524 12.3826 6.43079 12.7882 6.43079 13.2597V38.1363C6.43079 38.6352 6.60072 39.0518 6.95156 39.4136C7.29692 39.7699 7.70806 39.9453 8.21787 39.9453C8.72768 39.9453 9.13882 39.7699 9.48418 39.4136C9.83502 39.0518 10.005 38.6297 10.005 38.1363V16.9819L10.29 17.2121L28.8735 32.0898C29.186 32.3311 29.5478 32.4517 29.9754 32.4517C30.4029 32.4517 30.7922 32.3256 31.1485 32.0734L49.9403 16.9873V38.1473C49.9403 38.6407 50.1157 39.0573 50.4775 39.4191C50.8393 39.7809 51.2504 39.9563 51.7493 39.9563L51.7548 39.9453ZM7.48327 44.7858H11.6495C11.7646 44.7858 11.8578 44.7475 11.9345 44.6707C12.0113 44.594 12.0497 44.5008 12.0497 44.3911C12.0497 44.2815 12.0113 44.1938 11.9345 44.117C11.8578 44.0403 11.7646 44.0019 11.6495 44.0019H7.48327C6.79804 44.0019 6.21148 44.2431 5.72359 44.731C5.23571 45.2189 4.99451 45.8 4.99451 46.4797C4.99451 47.1595 5.23571 47.746 5.72359 48.2339C6.206 48.7218 6.79256 48.963 7.48327 48.963H11.6495C11.7646 48.963 11.8578 48.9246 11.9345 48.8479C12.0113 48.7711 12.0497 48.6779 12.0497 48.5683C12.0497 48.4587 12.0113 48.3655 11.9345 48.2887C11.8578 48.212 11.7646 48.1736 11.6495 48.1736H7.48327C7.01183 48.1736 6.61165 48.0092 6.28274 47.6802C5.95383 47.3513 5.78938 46.9512 5.78938 46.4852C5.78938 46.0192 5.95383 45.6136 6.28274 45.2902C6.61165 44.9612 7.01183 44.7968 7.48327 44.7968V44.7858ZM17.2903 43.9964C17.4109 43.9964 17.5041 44.0403 17.5754 44.1335H17.5644L21.1111 48.3052C21.1769 48.3764 21.2098 48.4587 21.2098 48.5573C21.2098 48.6779 21.166 48.7766 21.0728 48.8588C21.0015 48.9246 20.9138 48.9575 20.8151 48.9575C20.6945 48.9575 20.5959 48.9137 20.5136 48.8205L17.2684 44.9941L14.0286 48.8205C13.9464 48.9137 13.8477 48.9575 13.7271 48.9575C13.6339 48.9575 13.5462 48.9246 13.4694 48.8588C13.3763 48.7766 13.3324 48.6779 13.3324 48.5573C13.3324 48.4587 13.3653 48.3764 13.4311 48.3052L16.9723 44.1335C17.0546 44.0403 17.1532 43.9964 17.2739 43.9964H17.2903ZM29.1366 46.4413C29.4162 46.1563 29.5587 45.8164 29.5587 45.4272C29.5587 45.038 29.4162 44.6981 29.1366 44.4185C28.857 44.139 28.5171 43.9964 28.1225 43.9964H22.9092C22.7941 43.9964 22.7009 44.0348 22.6242 44.1115C22.5474 44.1883 22.509 44.2815 22.509 44.3856V48.5573C22.509 48.667 22.5474 48.7602 22.6242 48.8369C22.7009 48.9137 22.7941 48.952 22.9037 48.952C23.0134 48.952 23.1066 48.9137 23.1833 48.8369C23.26 48.7602 23.2984 48.667 23.2984 48.5573V46.8689H25.9133L28.9392 48.8808C29.0105 48.9301 29.0818 48.952 29.1585 48.952C29.2188 48.952 29.2791 48.9356 29.3449 48.8972C29.4107 48.8643 29.46 48.8205 29.4929 48.7711C29.5368 48.7053 29.5587 48.6341 29.5587 48.5518C29.5587 48.4915 29.5423 48.4313 29.5039 48.3709C29.471 48.3107 29.4271 48.2613 29.3778 48.2284L27.3331 46.8634H28.1225C28.5171 46.8634 28.857 46.7209 29.1366 46.4359V46.4413ZM26.0393 46.0741H23.3039V44.7858H28.1279C28.3088 44.7858 28.4568 44.8461 28.5884 44.9722C28.7145 45.0983 28.7803 45.2518 28.7803 45.4327C28.7803 45.6136 28.7145 45.7671 28.5884 45.8932C28.4623 46.0192 28.3088 46.0795 28.1279 46.0795H26.0393V46.0741ZM37.6883 45.4327C37.6883 45.789 37.5677 46.1069 37.332 46.3756C37.5074 46.5126 37.6444 46.6825 37.7486 46.8799C37.8527 47.0827 37.9021 47.2965 37.9021 47.5213C37.9021 47.9105 37.7596 48.2449 37.48 48.5299C37.2004 48.815 36.8605 48.9575 36.4658 48.9575H31.2526C31.1375 48.9575 31.0443 48.9191 30.9675 48.8424C30.8908 48.7656 30.8524 48.6725 30.8524 48.5628V46.4742V46.4523V44.4076V44.3856C30.8524 44.2815 30.8908 44.1883 30.9675 44.1115C31.0443 44.0348 31.1375 43.9964 31.2526 43.9964H36.252C36.6467 43.9964 36.9866 44.139 37.2662 44.4185C37.5458 44.6981 37.6883 45.038 37.6883 45.4327ZM36.8989 45.4327C36.8989 45.2518 36.8386 45.0983 36.7125 44.9722V44.9777C36.5919 44.8516 36.4384 44.7913 36.252 44.7913H31.6418V46.0795H36.252C36.4329 46.0795 36.5864 46.0192 36.7125 45.8932C36.8386 45.7671 36.8989 45.6136 36.8989 45.4327ZM36.4658 48.1626C36.6467 48.1626 36.8002 48.1023 36.9263 47.9763H36.9208C37.0469 47.8502 37.1072 47.6967 37.1072 47.5158C37.1072 47.3349 37.0469 47.1814 36.9208 47.0553C36.8002 46.9292 36.6467 46.8689 36.4604 46.8689H31.6418V47.2965V48.1626H36.4658ZM44.1734 43.9964H41.5201C40.8349 43.9964 40.2483 44.2376 39.7605 44.7255C39.2726 45.2134 39.0314 45.7945 39.0314 46.4742C39.0314 47.154 39.2726 47.7405 39.7605 48.2284C40.2429 48.7163 40.8294 48.9575 41.5201 48.9575H44.1734C44.8586 48.9575 45.4451 48.7163 45.933 48.2284C46.4154 47.7405 46.6621 47.154 46.6621 46.4742C46.6621 45.7945 46.4209 45.2079 45.933 44.7255C45.4506 44.2431 44.8641 43.9964 44.1734 43.9964ZM45.3794 47.6693C45.0504 47.9982 44.6503 48.1626 44.1788 48.1626H41.5256C41.0542 48.1626 40.654 47.9982 40.3251 47.6693C39.9962 47.3404 39.8317 46.9402 39.8317 46.4742C39.8317 46.0083 39.9962 45.6026 40.3251 45.2792C40.654 44.9503 41.0542 44.7858 41.5256 44.7858H44.1788C44.6503 44.7858 45.0504 44.9503 45.3794 45.2792C45.7083 45.6081 45.8727 46.0083 45.8727 46.4742C45.8727 46.9402 45.7083 47.3458 45.3794 47.6693ZM54.6053 43.9964C54.7149 43.9964 54.8081 44.0348 54.8849 44.1115C54.9616 44.1883 55 44.276 55 44.3856V48.5573C55 48.667 54.9616 48.7602 54.8849 48.8369C54.8081 48.9137 54.7149 48.952 54.5998 48.952C54.5231 48.952 54.4518 48.9301 54.3805 48.8808L48.7397 45.1202V48.5573C48.7397 48.667 48.7013 48.7602 48.6246 48.8369C48.5478 48.9137 48.4546 48.952 48.345 48.952C48.2354 48.952 48.1422 48.9137 48.0654 48.8369C47.9887 48.7602 47.9503 48.667 47.9503 48.5573V44.3856C47.9503 44.2815 47.9887 44.1883 48.0654 44.1115C48.1367 44.0348 48.2299 43.9964 48.3395 43.9964H48.345C48.4218 43.9964 48.493 44.0184 48.5588 44.0622L54.2106 47.8228V44.3856C54.2106 44.2815 54.249 44.1883 54.3257 44.1115C54.4025 44.0348 54.4957 43.9964 54.6053 43.9964Z" fill="#F2A900"/>
                        </svg>
                        <span className="text-lg font-bold text-white">CarbonM</span>
                      </Link>
                    </div>
                    <nav className="grid gap-2 p-4">
                      {routes.filter(route => !route.hideInMainNav && !route.hidden).map((route) => (
                        <div key={route.path}>
                          <div
                            className={cn(
                              "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium group",
                              (pathname === route.path || pathname.startsWith(`${route.path}/`) || openSubMenu === route.path)
                                ? "bg-[#F2A900]/[0.16] text-[#F2A900]"
                                : "text-[#ADADAD] hover:bg-[#F2A900]/[0.16] hover:text-[#F2A900]",
                              "cursor-pointer"
                            )}
                            onClick={() => route.subRoutes && route.subRoutes.length > 0 ? toggleSubMenu(route.path) : undefined}
                          >
                            <Link
                              href={route.path}
                              className="flex items-center gap-2 flex-1"
                              onClick={(e) => {
                                if (route.subRoutes && route.subRoutes.length > 0) {
                                  e.preventDefault();
                                }
                              }}
                            >
                              <route.icon className={cn(
                                "h-5 w-5",
                                (pathname === route.path || pathname.startsWith(`${route.path}/`) || openSubMenu === route.path)
                                  ? "text-[#F2A900]" 
                                  : "text-[#ADADAD] group-hover:text-[#F2A900]"
                              )} />
                              {route.name}
                            </Link>
                            {route.subRoutes && route.subRoutes.length > 0 && (
                              <ChevronRight 
                                className={cn(
                                  "h-4 w-4 transition-transform",
                                  openSubMenu === route.path ? "rotate-90" : ""
                                )}
                              />
                            )}
                          </div>
                          
                          {/* 子路由菜單 */}
                          {route.subRoutes && route.subRoutes.length > 0 && openSubMenu === route.path && (
                            <div className="ml-4 pl-4 border-l border-[#333333] space-y-1 mt-1">
                              {route.subRoutes.map((subRoute) => (
                                <Link
                                  key={subRoute.path}
                                  href={subRoute.path}
                                  className={cn(
                                    "flex items-center gap-2 rounded-lg px-3 py-2 text-sm",
                                    pathname === subRoute.path || pathname.startsWith(`${subRoute.path}/`)
                                      ? "text-[#F2A900]"
                                      : "text-[#ADADAD] hover:text-[#F2A900]"
                                  )}
                                >
                                  {subRoute.name}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </nav>
                  </SheetContent>
                </Sheet>
              </div>

              {/* 當前頁面標題 */}
              <div className="flex flex-col gap-1 ml-2">
                <h1 className="text-xl font-bold text-[#333333] pt-2 px-4 ">{pageName}</h1>
                {/* 麵包屑導航 */}
                <div className="text-xs flex items-center text-sm pb-2 px-4 bg-gray-50/80 rounded-lg shadow-sm">
                  {/* <span className="text-gray-400 ">CarbonM ></span> */}
                  <div className="flex items-center text-gray-400 ml-1">
                    {breadcrumbs.map((crumb, index) => (
                      <React.Fragment key={crumb.path}>
                        {index > 0 && <span className="text-gray-300 mx-0.5">&gt;</span>}
                        {index === breadcrumbs.length - 1 ? (
                          <span className="mx-1 text-gray-600 font-medium">{crumb.name}</span>
                        ) : (
                          <Link href={crumb.path} className="mx-1 hover:text-gray-600">
                            {crumb.name}
                          </Link>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 用戶資訊和功能按鈕 */}
            <div className="flex items-center gap-3">
       

              {/* 用戶資訊區 */}
              <div className="relative flex items-center gap-2 rounded-md p-2">
                <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center ">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M7 0C3.13417 0 0 3.13417 0 7C0 10.8658 3.13417 14 7 14C10.8658 14 14 10.8658 14 7C14 3.13533 10.8677 0.00187443 7.00347 0H7ZM4.517 1.53633C4.02338 1.76103 3.56555 2.05067 3.15443 2.39431C3.36583 2.53305 3.58689 2.66073 3.81658 2.77634C3.91178 2.56121 4.01379 2.35576 4.12193 2.16107C4.24355 1.94213 4.37553 1.7327 4.517 1.53633ZM1.02054 6.5C1.12678 5.21243 1.63962 4.04009 2.43036 3.1117C2.75535 3.33824 3.10088 3.54107 3.46387 3.7175C3.20009 4.55953 3.0321 5.50263 2.98968 6.5H1.02054ZM1.02054 7.5C1.12678 8.78757 1.63961 9.95989 2.43035 10.8883C2.75533 10.6617 3.10087 10.4589 3.46386 10.2825C3.20009 9.44045 3.0321 8.49736 2.98968 7.5H1.02054ZM3.99065 7.5C4.03101 8.36811 4.17492 9.18097 4.39311 9.90221C5.05727 9.67855 5.7647 9.53803 6.5 9.49397V7.5H3.99065ZM6.5 10.496C5.88532 10.5379 5.29506 10.6564 4.74059 10.8404C4.82101 11.0206 4.90641 11.1918 4.99612 11.3533C5.46094 12.1901 5.99593 12.6949 6.5 12.8973V10.496ZM7.5 12.8973V10.496C8.11468 10.5379 8.70495 10.6564 9.25941 10.8404C9.179 11.0206 9.09359 11.1918 9.00389 11.3533C8.53907 12.1901 8.00408 12.6949 7.5 12.8973ZM7.5 9.49397V7.5H10.0094C9.96899 8.36811 9.82509 9.18097 9.60689 9.90221C8.94274 9.67855 8.23531 9.53803 7.5 9.49397ZM11.0103 7.5C10.9679 8.49736 10.7999 9.44045 10.5361 10.2825C10.8991 10.4589 11.2447 10.6617 11.5697 10.8883C12.3604 9.95989 12.8732 8.78756 12.9795 7.5H11.0103ZM12.9795 6.5H11.0103C10.9679 5.50263 10.7999 4.55953 10.5361 3.7175C10.8991 3.54107 11.2447 3.33824 11.5696 3.11171C12.3604 4.04009 12.8732 5.21243 12.9795 6.5ZM10.0094 6.5H7.5V4.50599C8.2353 4.46194 8.94273 4.32142 9.60688 4.09775C9.82509 4.81901 9.96899 5.63187 10.0094 6.5ZM7.5 3.50395C8.11468 3.46206 8.70494 3.3436 9.2594 3.15953C9.17899 2.97939 9.09359 2.80815 9.00389 2.64666C8.53907 1.80987 8.00408 1.30513 7.5 1.10275V3.50395ZM6.5 1.10275V3.50395C5.88532 3.46206 5.29507 3.3436 4.74061 3.15953C4.82102 2.97939 4.90642 2.80815 4.99612 2.64666C5.46094 1.80987 5.99593 1.30513 6.5 1.10275ZM6.5 4.50599V6.5H3.99065C4.03101 5.63187 4.17492 4.81901 4.39312 4.09775C5.05727 4.32142 5.7647 4.46194 6.5 4.50599ZM10.1834 2.77634C10.4131 2.66073 10.6342 2.53305 10.8456 2.39432C10.4344 2.05067 9.97662 1.76104 9.483 1.53633C9.62447 1.7327 9.75646 1.94213 9.87807 2.16107C9.98622 2.35576 10.0882 2.56121 10.1834 2.77634ZM10.1834 11.2236C10.4131 11.3392 10.6342 11.4669 10.8456 11.6057C10.4345 11.9493 9.97663 12.239 9.483 12.4637C9.62447 12.2673 9.75646 12.0579 9.87807 11.8389C9.98622 11.6442 10.0882 11.4388 10.1834 11.2236ZM3.15441 11.6057C3.36581 11.4669 3.58688 11.3392 3.81657 11.2236C3.91177 11.4388 4.01378 11.6442 4.12193 11.8389C4.24355 12.0579 4.37554 12.2673 4.517 12.4637C4.02337 12.239 3.56554 11.9493 3.15441 11.6057Z" fill="black"/>
</svg>

                </div>
                <div className="ml-2 flex flex-col">
                  <span className="text-sm font-medium">admin hello UAT</span>
                  <span className="text-xs text-gray-400">admin@hello.com</span>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </div>

              {/* Wizard 按鈕 */}
              <div className="flex items-center rounded-full border border-gray-200 shadow-sm px-2 py-1 hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="flex items-center gap-2 px-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#F2A900" stroke="none">
                    <path d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10a9.96 9.96 0 01-4.587-1.112l-3.826 1.067a1.5 1.5 0 01-1.842-1.842l1.067-3.826A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2zm0 5c-.988 0-1.945.148-2.848.425a1 1 0 10.601 1.906A8.46 8.46 0 0112 9c2.186 0 4.235.713 5.992 1.56a1 1 0 001.106-1.666A11.11 11.11 0 0012 7zm-4 5a1 1 0 100 2 1 1 0 000-2zm4 0a1 1 0 100 2 1 1 0 000-2zm4 0a1 1 0 100 2 1 1 0 000-2z" />
                  </svg>
                  <span className="text-[#F2A900] text-sm font-semibold">Wizard</span>
                </div>
                {/* 線上指示圓點 */}
                <div className="h-3 w-3 rounded-full bg-green-500 ml-1"></div>
              </div>
            </div>
          </div>
        </header>

        {/* 主要內容 */}
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}
