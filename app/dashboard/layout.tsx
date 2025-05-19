"use client"

import React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { BarChart3, ChevronLeft, ChevronRight, FileText, Home, Menu, Package, Users, ClipboardList, ClipboardCheck, Briefcase, Globe } from "lucide-react"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { locales, getLanguageName } from "@/lib/i18n"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// 獲取當前語言前綴路徑的函數
const getLocalizedPath = (path: string, locale: string = 'zh-TW'): string => {
  // 移除可能已存在的語言前綴
  let cleanPath = path;
  
  // 先移除所有可能的語言前綴
  locales.forEach(loc => {
    const localePrefix = new RegExp(`^/(${loc})`);
    cleanPath = cleanPath.replace(localePrefix, '');
  });
  
  // 再移除一次（處理重複的情況）
  locales.forEach(loc => {
    const localePrefix = new RegExp(`^/(${loc})`);
    cleanPath = cleanPath.replace(localePrefix, '');
  });
  
  // 確保 cleanPath 開頭有 /
  if (!cleanPath.startsWith('/')) {
    cleanPath = '/' + cleanPath;
  }
  
  // 加上新的語言前綴
  return `/${locale}${cleanPath}`;
};

// 擴展路由定義，增加子路由
const routes = [
  // 問卷分析改名為戰情室，移到最前面
  // {
  //   path: "/dashboard/survey-results",
  //   name: "碳排放戰情室",
  //   icon: BarChart3,
  //   subRoutes: [
  //     { path: "/dashboard/survey-results/export", name: "數據匯出" }
  //   ],
  // },
  {
    path: "/dashboard/organization",
    name: "組織架構管理",
    navKey: "organization",
    shortName: "組織",
    icon: Users,
    imageNormal: "/side menu_structure_normal.svg",
    imageActive: "/side menu_structure_active.png",
    disabled: true,
  },
  
  {
    path: "/dashboard/projects/progress",
    name: "組織計畫",
    navKey: "projects",
    shortName: "計畫",
    icon: Briefcase,
  },
  {
    path: "/dashboard/suppliers",
    name: "供應商管理",
    navKey: "suppliers",
    shortName: "供應商",
    icon: Users,
    subRoutes: [
      { path: "/dashboard/suppliers/new", name: "創建供應商", navKey: "suppliers_add_new" }
    ],
  },
  {
    path: "/dashboard/requests",
    name: "數據要求",
    navKey: "data_requests",
    shortName: "數據",
    icon: FileText,
    subRoutes: [
      { path: "/dashboard/requests/new", name: "創建數據要求", navKey: "requests_create_new" }
    ],
  },
  {
    path: "/dashboard/projects/questionnaires",
    name: "問卷追蹤",
    icon: ClipboardList,
    hideInMainNav: true // 新增標記，表示在主導航中隱藏，這是重複項
  },
  {
    path: "/dashboard/survey-results",
    name: "戰情室",
    navKey: "war_room",
    shortName: "戰情",
    icon: BarChart3,
  },
  // 原供應鏈管理改為隱藏，因為已將子選項移至第一層
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
    ],
    hideInMainNav: true // 隱藏供應鏈管理
  },
 
  
  // 以下路由保留但不在主導航中顯示，只通過子路由訪問
  // 供應商管理移到供應鏈子路由中 - 現在已經移至第一層
  {
    path: "/dashboard/suppliers",
    name: "供應商管理",
    icon: Users,
    subRoutes: [
      { path: "/dashboard/suppliers/new", name: "創建供應商", navKey: "suppliers_add_new" }
    ],
    hideInMainNav: true // 新增標記，表示在主導航中隱藏，這是重複項
  },

  // 數據要求移到供應鏈子路由中 - 現在已經移至第一層
  {
    path: "/dashboard/requests",
    name: "數據要求",
    icon: FileText,
    subRoutes: [
      { path: "/dashboard/requests/new", name: "創建數據要求", navKey: "requests_create_new" }
    ],
    hideInMainNav: true // 新增標記，表示在主導航中隱藏，這是重複項
  },
  
  // 問卷追蹤移到供應鏈子路由中 - 現在已經移至第一層
  {
    path: "/dashboard/projects/questionnaires",
    name: "問卷追蹤",
    icon: ClipboardList,
    hideInMainNav: true // 新增標記，表示在主導航中隱藏，這是重複項
  },
  
  // 暫時隱藏但保留以後使用
  {
    path: "/dashboard/surveys",
    name: "問卷模板管理",
    icon: ClipboardList,
    subRoutes: [
      { path: "/dashboard/surveys/new", name: "創建問卷", navKey: "surveys_create_new" }
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
      { path: "/dashboard/my-surveys/history", name: "問卷歷史", navKey: "my_surveys_history" }
    ],
    hidden: true, // 新增標記，表示完全隱藏
    hideInMainNav: true
  },
  {
    path: "/dashboard/roles",
    name: "角色",
    shortName: "角色",
    icon: Briefcase,
    navKey: "roles",
    imageNormal: "/Side Menu_role_normal.svg",
    imageActive: "/Side Menu_role_active.png",
    imageHover: "/Side Menu_role_hover.png",
    disabled: true,
  },
]

// 定義精確的路徑映射表
const exactPathMap: Record<string, string> = {
  "/dashboard": "dashboard",
  "/dashboard/supply-chain": "supply_chain",
  "/dashboard/suppliers": "suppliers", 
  "/dashboard/suppliers/new": "suppliers_add_new",
  "/dashboard/requests": "data_requests",
  "/dashboard/requests/new": "requests_create_new",
  "/dashboard/surveys": "surveys",
  "/dashboard/surveys/new": "surveys_create_new",
  "/dashboard/my-surveys": "my_surveys",
  "/dashboard/my-surveys/history": "my_surveys_history",
  "/dashboard/survey-results": "war_room",
  "/dashboard/survey-results/export": "data_export",
  "/dashboard/projects": "projects",
  "/dashboard/projects/questionnaires": "questionnaires",
  "/dashboard/projects/progress": "projects",
};

// 獲取縮寫名稱的函數
const getShortName = (name: string): string => {
  // 根據全名獲取縮寫
  if (name === "組織架構管理") return "組織";
  if (name === "供應商管理") return "供應商";
  if (name === "數據要求") return "數據";
  if (name === "問卷追蹤") return "問卷";
  if (name === "組織計畫") return "計畫";
  if (name === "戰情室") return "戰情";
  // 如果沒有特定規則，返回原名
  return name;
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
  tNav,
  tMessages
}: {
  children: React.ReactNode
  tNav?: any
  tMessages?: any
}) {
  // 移除expanded狀態，因為不再需要收合功能
  // const [expanded, setExpanded] = useState(false)
  const [openSubMenu, setOpenSubMenu] = useState("")
  const pathname = usePathname()
  const router = useRouter()

  // 使用直接的路徑映射表獲取頁面標題
  let pageNameKey = exactPathMap[pathname] || "supply_chain";
  
  // 處理動態路徑
  if (!pageNameKey || pageNameKey === "supply_chain") {
    if (pathname.match(/^\/dashboard\/suppliers\/\d+\/edit/)) {
      pageNameKey = "suppliers_edit";
    } else if (pathname.match(/^\/dashboard\/suppliers\/\d+/)) {
      pageNameKey = "suppliers_details";
    } else if (pathname.match(/^\/dashboard\/requests\/\d+\/edit/)) {
      pageNameKey = "requests_edit";
    } else if (pathname.match(/^\/dashboard\/requests\/\d+/)) {
      pageNameKey = "requests_details";
    } else if (pathname.match(/^\/dashboard\/surveys\/\d+\/edit/)) {
      pageNameKey = "surveys_edit";
    } else if (pathname.match(/^\/dashboard\/surveys\/\d+/)) {
      pageNameKey = "surveys_details";
    } else if (pathname.match(/^\/dashboard\/my-surveys\/\d+\/history/)) {
      pageNameKey = "my_surveys_history";
    } else if (pathname.match(/^\/dashboard\/my-surveys\/\d+\/edit/)) {
      pageNameKey = "my_surveys_edit";
    } else if (pathname.match(/^\/dashboard\/my-surveys\/\d+/)) {
      pageNameKey = "my_surveys_details";
    } else {
      // 如果都沒匹配到，嘗試從主路由獲取名稱
      const mainRoute = routes.find(route => pathname.startsWith(route.path));
      if (mainRoute && mainRoute.navKey) {
        pageNameKey = mainRoute.navKey;
      }
    }
  }

  // 輸出調試信息
  console.log('當前路徑:', pathname);
  console.log('頁面標題鍵:', pageNameKey);

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

  // 處理路由導航
  const handleNavigate = (path: string, specifiedLocale?: string) => {
    if (path) {
      // 從當前路徑中提取語言信息
      let currentLocale = 'zh-TW';
      
      // 嘗試從路徑中提取語言
      for (const loc of locales) {
        if (pathname.startsWith(`/${loc}/`)) {
          currentLocale = loc;
          break;
        }
      }
      
      // 使用指定的語言或當前語言
      const localeToUse = specifiedLocale || currentLocale;
      
      const localizedPath = getLocalizedPath(path, localeToUse);
      console.log("導航到路徑:", localizedPath); // 記錄導航路徑
      
      // 使用 window.location.href 直接跳轉，避免 i18n 路由問題
      window.location.href = localizedPath;
    }
  };

  return (
    <TooltipProvider>
    <div className="flex min-h-screen">
        {/* 桌面側邊欄 - 固定寬度80px */}
      <aside
          className="fixed left-0 top-0 z-20 h-full border-r w-[80px] hidden lg:block pt-3"
        style={{ backgroundColor: "#000000" }}
      >
        <div className="flex h-16 items-center justify-center border-b" style={{ borderColor: "#333333" }}>
            <div 
              className="flex items-center justify-center cursor-pointer"
              onClick={() => handleNavigate("/dashboard/survey-results")}
            >
              {/* 調整Logo寬度為24px */}
              {/* <svg className="h-12 w-12" width="32" height="32" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M51.7548 39.9453C52.2481 39.9453 52.6648 39.7699 53.0266 39.4081C53.3884 39.0463 53.5638 38.6297 53.5638 38.1363V13.2597C53.5638 12.7663 53.3884 12.3607 53.032 12.0208C52.6702 11.6699 52.2536 11.5 51.7548 11.5C51.3327 11.5 50.9654 11.6206 50.6474 11.8673L29.9754 28.4006L29.8657 28.3129L9.34713 11.8618C9.02919 11.6206 8.66738 11.5 8.24528 11.5H8.14661C7.65872 11.5 7.26403 11.6699 6.93512 12.0208C6.59524 12.3826 6.43079 12.7882 6.43079 13.2597V38.1363C6.43079 38.6352 6.60072 39.0518 6.95156 39.4136C7.29692 39.7699 7.70806 39.9453 8.21787 39.9453C8.72768 39.9453 9.13882 39.7699 9.48418 39.4136C9.83502 39.0518 10.005 38.6297 10.005 38.1363V16.9819L10.29 17.2121L28.8735 32.0898C29.186 32.3311 29.5478 32.4517 29.9754 32.4517C30.4029 32.4517 30.7922 32.3256 31.1485 32.0734L49.9403 16.9873V38.1473C49.9403 38.6407 50.1157 39.0573 50.4775 39.4191C50.8393 39.7809 51.2504 39.9563 51.7493 39.9563L51.7548 39.9453ZM7.48327 44.7858H11.6495C11.7646 44.7858 11.8578 44.7475 11.9345 44.6707C12.0113 44.594 12.0497 44.5008 12.0497 44.3911C12.0497 44.2815 12.0113 44.1938 11.9345 44.117C11.8578 44.0403 11.7646 44.0019 11.6495 44.0019H7.48327C6.79804 44.0019 6.21148 44.2431 5.72359 44.731C5.23571 45.2189 4.99451 45.8 4.99451 46.4797C4.99451 47.1595 5.23571 47.746 5.72359 48.2339C6.206 48.7218 6.79256 48.963 7.48327 48.963H11.6495C11.7646 48.963 11.8578 48.9246 11.9345 48.8479C12.0113 48.7711 12.0497 48.6779 12.0497 48.5683C12.0497 48.4587 12.0113 48.3655 11.9345 48.2887C11.8578 48.212 11.7646 48.1736 11.6495 48.1736H7.48327C7.01183 48.1736 6.61165 48.0092 6.28274 47.6802C5.95383 47.3513 5.78938 46.9512 5.78938 46.4852C5.78938 46.0192 5.95383 45.6136 6.28274 45.2902C6.61165 44.9612 7.01183 44.7968 7.48327 44.7968V44.7858Z" fill="#F2A900"/>
              </svg> */}
              <svg width="48" height="48" viewBox="0 0 60 60" fill="none">
                <path fillRule="evenodd" clipRule="evenodd" d="M51.7544 39.9453C52.2478 39.9453 52.6644 39.7699 53.0262 39.4081C53.388 39.0463 53.5634 38.6297 53.5634 38.1363V13.2597C53.5634 12.7663 53.388 12.3607 53.0317 12.0208C52.6699 11.6699 52.2533 11.5 51.7544 11.5C51.3323 11.5 50.965 11.6206 50.6471 11.8673L29.975 28.4006L29.8654 28.3129L9.34677 11.8618C9.02882 11.6206 8.66702 11.5 8.24491 11.5H8.14624C7.65836 11.5 7.26366 11.6699 6.93475 12.0208C6.59488 12.3826 6.43042 12.7882 6.43042 13.2597V38.1363C6.43042 38.6352 6.60036 39.0518 6.9512 39.4136C7.29655 39.7699 7.70769 39.9453 8.2175 39.9453C8.72732 39.9453 9.13846 39.7699 9.48381 39.4136C9.83465 39.0518 10.0046 38.6297 10.0046 38.1363V16.9819L10.2896 17.2121L28.8731 32.0898C29.1856 32.3311 29.5474 32.4517 29.975 32.4517C30.4026 32.4517 30.7918 32.3256 31.1481 32.0734L49.9399 16.9873V38.1473C49.9399 38.6407 50.1153 39.0573 50.4771 39.4191C50.8389 39.7809 51.2501 39.9563 51.7489 39.9563L51.7544 39.9453ZM7.4829 44.7858H11.6491C11.7642 44.7858 11.8574 44.7475 11.9342 44.6707C12.0109 44.594 12.0493 44.5008 12.0493 44.3911C12.0493 44.2815 12.0109 44.1938 11.9342 44.117C11.8574 44.0403 11.7642 44.0019 11.6491 44.0019H7.4829C6.79767 44.0019 6.21111 44.2431 5.72323 44.731C5.23534 45.2189 4.99414 45.8 4.99414 46.4797C4.99414 47.1595 5.23534 47.746 5.72323 48.2339C6.20563 48.7218 6.79219 48.963 7.4829 48.963H11.6491C11.7642 48.963 11.8574 48.9246 11.9342 48.8479C12.0109 48.7711 12.0493 48.6779 12.0493 48.5683C12.0493 48.4587 12.0109 48.3655 11.9342 48.2887C11.8574 48.212 11.7642 48.1736 11.6491 48.1736H7.4829C7.01146 48.1736 6.61129 48.0092 6.28238 47.6802C5.95347 47.3513 5.78901 46.9512 5.78901 46.4852C5.78901 46.0192 5.95347 45.6136 6.28238 45.2902C6.61129 44.9612 7.01146 44.7968 7.4829 44.7968V44.7858ZM17.2899 43.9964C17.4105 43.9964 17.5037 44.0403 17.575 44.1335H17.564L21.1108 48.3052C21.1766 48.3764 21.2095 48.4587 21.2095 48.5573C21.2095 48.6779 21.1656 48.7766 21.0724 48.8588C21.0011 48.9246 20.9134 48.9575 20.8148 48.9575C20.6942 48.9575 20.5955 48.9137 20.5133 48.8205L17.268 44.9941L14.0282 48.8205C13.946 48.9137 13.8473 48.9575 13.7267 48.9575C13.6335 48.9575 13.5458 48.9246 13.4691 48.8588C13.3759 48.7766 13.332 48.6779 13.332 48.5573C13.332 48.4587 13.3649 48.3764 13.4307 48.3052L16.972 44.1335C17.0542 44.0403 17.1529 43.9964 17.2735 43.9964H17.2899ZM29.1362 46.4413C29.4158 46.1563 29.5583 45.8164 29.5583 45.4272C29.5583 45.038 29.4158 44.6981 29.1362 44.4185C28.8567 44.139 28.5168 43.9964 28.1221 43.9964H22.9088C22.7937 43.9964 22.7005 44.0348 22.6238 44.1115C22.547 44.1883 22.5087 44.2815 22.5087 44.3856V48.5573C22.5087 48.667 22.547 48.7602 22.6238 48.8369C22.7005 48.9137 22.7937 48.952 22.9034 48.952C23.013 48.952 23.1062 48.9137 23.1829 48.8369C23.2597 48.7602 23.2981 48.667 23.2981 48.5573V46.8689H25.9129L28.9389 48.8808C29.0101 48.9301 29.0814 48.952 29.1582 48.952C29.2185 48.952 29.2788 48.9356 29.3445 48.8972C29.4103 48.8643 29.4597 48.8205 29.4925 48.7711C29.5364 48.7053 29.5583 48.6341 29.5583 48.5518C29.5583 48.4916 29.5419 48.4313 29.5035 48.371C29.4706 48.3106 29.4268 48.2613 29.3774 48.2284L27.3327 46.8634H28.1221C28.5168 46.8634 28.8567 46.7209 29.1362 46.4359V46.4413ZM26.039 46.0741H23.3035V44.7858H28.1276C28.3085 44.7858 28.4565 44.8461 28.588 44.9722C28.7141 45.0983 28.7799 45.2518 28.7799 45.4327C28.7799 45.6136 28.7141 45.7671 28.588 45.8932C28.462 46.0192 28.3085 46.0795 28.1276 46.0795H26.039V46.0741ZM37.6879 45.4327C37.6879 45.789 37.5673 46.1069 37.3316 46.3756C37.507 46.5126 37.6441 46.6825 37.7482 46.8799C37.8524 47.0827 37.9017 47.2965 37.9017 47.5213C37.9017 47.9105 37.7592 48.2449 37.4796 48.5299C37.2 48.815 36.8602 48.9575 36.4655 48.9575H31.2522C31.1371 48.9575 31.0439 48.9191 30.9672 48.8424C30.8904 48.7656 30.8521 48.6725 30.8521 48.5628V46.4742V46.4523V44.4076V44.3856C30.8521 44.2815 30.8904 44.1883 30.9672 44.1115C31.0439 44.0348 31.1371 43.9964 31.2522 43.9964H36.2517C36.6464 43.9964 36.9862 44.139 37.2658 44.4185C37.5454 44.6981 37.6879 45.038 37.6879 45.4327ZM36.8985 45.4327C36.8985 45.2518 36.8382 45.0983 36.7122 44.9722V44.9777C36.5916 44.8516 36.4381 44.7913 36.2517 44.7913H31.6414V46.0795H36.2517C36.4326 46.0795 36.5861 46.0192 36.7122 45.8932C36.8382 45.7671 36.8985 45.6136 36.8985 45.4327ZM36.4655 48.1626C36.6464 48.1626 36.7999 48.1023 36.9259 47.9763H36.9205C37.0465 47.8502 37.1068 47.6967 37.1068 47.5158C37.1068 47.3349 37.0465 47.1814 36.9205 47.0553C36.7999 46.9292 36.6464 46.8689 36.46 46.8689H31.6414V47.2965V48.1626H36.4655ZM44.173 43.9964H41.5198C40.8345 43.9964 40.248 44.2376 39.7601 44.7255C39.2722 45.2134 39.031 45.7945 39.031 46.4742C39.031 47.154 39.2722 47.7405 39.7601 48.2284C40.2425 48.7163 40.8291 48.9575 41.5198 48.9575H44.173C44.8582 48.9575 45.4448 48.7163 45.9327 48.2284C46.4151 47.7405 46.6617 47.154 46.6617 46.4742C46.6617 45.7945 46.4205 45.2079 45.9327 44.7255C45.4503 44.2431 44.8637 43.9964 44.173 43.9964ZM45.379 47.6693C45.0501 47.9982 44.6499 48.1626 44.1785 48.1626H41.5252C41.0538 48.1626 40.6536 47.9982 40.3247 47.6693C39.9958 47.3404 39.8314 46.9402 39.8314 46.4742C39.8314 46.0083 39.9958 45.6026 40.3247 45.2792C40.6536 44.9503 41.0538 44.7858 41.5252 44.7858H44.1785C44.6499 44.7858 45.0501 44.9503 45.379 45.2792C45.7079 45.6081 45.8724 46.0083 45.8724 46.4742C45.8724 46.9402 45.7079 47.3458 45.379 47.6693ZM54.6049 43.9964C54.7146 43.9964 54.8078 44.0348 54.8845 44.1115C54.9612 44.1883 54.9996 44.276 54.9996 44.3856V48.5573C54.9996 48.667 54.9612 48.7602 54.8845 48.8369C54.8078 48.9137 54.7146 48.952 54.5994 48.952C54.5227 48.952 54.4514 48.9301 54.3802 48.8808L48.7393 45.1202V48.5573C48.7393 48.667 48.701 48.7602 48.6242 48.8369C48.5475 48.9137 48.4543 48.952 48.3446 48.952C48.235 48.952 48.1418 48.9137 48.0651 48.8369C47.9883 48.7602 47.95 48.667 47.95 48.5573V44.3856C47.95 44.2815 47.9883 44.1883 48.0651 44.1115C48.1363 44.0348 48.2295 43.9964 48.3392 43.9964H48.3446C48.4214 43.9964 48.4927 44.0184 48.5584 44.0622L54.2102 47.8228V44.3856C54.2102 44.2815 54.2486 44.1883 54.3254 44.1115C54.4021 44.0348 54.4953 43.9964 54.6049 43.9964Z" fill="#F2A900"/>
</svg>

              {/* 移除展開時顯示文字邏輯 */}
            </div>
        </div>
        <div className="flex flex-col gap-2 p-2">
            {routes.filter(route => !route.hideInMainNav && !route.hidden).map((route) => {
              // 調整路徑匹配邏輯，考慮語言前綴
              const routePath = route.path;
              const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}-[A-Z]{2}/, '');
              const isActive = pathWithoutLocale === routePath || 
                              pathWithoutLocale.startsWith(`${routePath}/`) || 
                              (routePath !== "/dashboard" && pathWithoutLocale.includes(routePath));
              
              return (
                <div key={route.path || route.name}>
                  {route.disabled ? (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div
              className={cn(
                            "flex flex-col p-2 gap-4 rounded-md transition-colors",
                            "items-center justify-center text-center self-stretch",
                            "text-gray-400 opacity-80 cursor-not-allowed"
                          )}
                        >
                          {route.imageNormal ? (
                            <img 
                              src={route.imageNormal} 
                              alt={route.name} 
                              className="h-6 w-6 mb-1"
                              style={{ width: "24px", height: "24px" }}
                            />
                          ) : (
                            <route.icon className="h-6 w-6 mb-1" style={{ width: "24px", height: "24px" }} />
                          )}
                          <span className="text-xs">
                            {(route.navKey && tNav) 
                              ? tNav(`${route.navKey}_short`, {fallback: route.shortName || tNav(route.navKey)}) 
                              : route.shortName || route.name}
                          </span>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side="right">{tMessages?.('coming_soon') || '功能即將推出'}</TooltipContent>
                    </Tooltip>
                  ) : (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div
                          className={cn(
                            "flex flex-col gap-2 rounded-[8px] transition-colors",
                            "items-center justify-center text-center cursor-pointer",
                            "p-2 self-stretch",
                            isActive
                  ? "text-[#F2A900]" 
                              : "text-gray-400 hover:bg-[rgba(255,255,255,0.16)]"
                          )}
                          onClick={() => {
                            // 直接導航到路徑，不管是否有子路由
                            handleNavigate(route.path);
                          }}
                        >
                          {/* 圖標顯示：優先顯示圖片，然後是圖標 - 所有圖標大小調整為24px */}
                          {isActive && route.imageActive ? (
                            <img 
                              src={route.imageActive} 
                              alt={route.name} 
                              className="h-6 w-6"
                              style={{ width: "24px", height: "24px" }}
                            />
                          ) : route.imageNormal ? (
                            <img 
                              src={route.imageNormal} 
                              alt={route.name} 
                              className="h-6 w-6 hover:hidden group-hover:hidden"
                              style={{ width: "24px", height: "24px" }}
                              onMouseOver={(e) => {
                                if (route.imageHover) {
                                  e.currentTarget.src = route.imageHover;
                                }
                              }}
                              onMouseOut={(e) => {
                                e.currentTarget.src = route.imageNormal;
                              }}
                            />
                          ) : (
                            <route.icon className="h-6 w-6" style={{ width: "24px", height: "24px" }} />
                          )}
                          <span className="text-xs">
                            {route.navKey && tNav 
                              ? tNav(`${route.navKey}_short`, {fallback: getShortName(route.name)}) 
                              : getShortName(route.name)}
                          </span>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        {route.navKey && tNav 
                          ? tNav(route.navKey, {fallback: route.name}) 
                          : route.name}
                      </TooltipContent>
                    </Tooltip>
                  )}

                  {/* 子路由菜單 - 使用側邊彈出提示顯示而非展開 */}
                  {route.subRoutes && !route.disabled && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="sr-only">子菜單</div>
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        <div className="flex flex-col gap-1">
                          {route.subRoutes.map((subRoute) => (
                            <div 
                              key={subRoute.path}
                              className="text-sm py-1 whitespace-nowrap text-[#ADADAD] hover:text-[#F2A900] cursor-pointer"
                              onClick={() => handleNavigate(subRoute.path)}
                            >
                              {subRoute.name}
                            </div>
          ))}
        </div>
                      </TooltipContent>
                    </Tooltip>
                  )}
                </div>
              )
            })}
          </div>
          {/* 移除側邊欄收合按鈕 */}
      </aside>

        <div className="flex flex-col flex-1 lg:ml-[80px]">
        {/* 頂部工具欄 */}
        <header className="sticky top-0 z-10 border-b bg-background">
            <div className="px-6 flex h-16 items-center justify-between py-4">
              <div className="flex items-center gap-4">
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
                        <div 
                          className="flex items-center gap-2 cursor-pointer"
                          onClick={() => handleNavigate("/dashboard/survey-results")}
                        >
                          <svg className="h-6 w-6 " width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M51.7548 39.9453C52.2481 39.9453 52.6648 39.7699 53.0266 39.4081C53.3884 39.0463 53.5638 38.6297 53.5638 38.1363V13.2597C53.5638 12.7663 53.3884 12.3607 53.032 12.0208C52.6702 11.6699 52.2536 11.5 51.7548 11.5C51.3327 11.5 50.9654 11.6206 50.6474 11.8673L29.9754 28.4006L29.8657 28.3129L9.34713 11.8618C9.02919 11.6206 8.66738 11.5 8.24528 11.5H8.14661C7.65872 11.5 7.26403 11.6699 6.93512 12.0208C6.59524 12.3826 6.43079 12.7882 6.43079 13.2597V38.1363C6.43079 38.6352 6.60072 39.0518 6.95156 39.4136C7.29692 39.7699 7.70806 39.9453 8.21787 39.9453C8.72768 39.9453 9.13882 39.7699 9.48418 39.4136C9.83502 39.0518 10.005 38.6297 10.005 38.1363V16.9819L10.29 17.2121L28.8735 32.0898C29.186 32.3311 29.5478 32.4517 29.9754 32.4517C30.4029 32.4517 30.7922 32.3256 31.1485 32.0734L49.9403 16.9873V38.1473C49.9403 38.6407 50.1157 39.0573 50.4775 39.4191C50.8393 39.7809 51.2504 39.9563 51.7493 39.9563L51.7548 39.9453ZM7.48327 44.7858H11.6495C11.7646 44.7858 11.8578 44.7475 11.9345 44.6707C12.0113 44.594 12.0497 44.5008 12.0497 44.3911C12.0497 44.2815 12.0113 44.1938 11.9345 44.117C11.8578 44.0403 11.7646 44.0019 11.6495 44.0019H7.48327C6.79804 44.0019 6.21148 44.2431 5.72359 44.731C5.23571 45.2189 4.99451 45.8 4.99451 46.4797C4.99451 47.1595 5.23571 47.746 5.72359 48.2339C6.206 48.7218 6.79256 48.963 7.48327 48.963H11.6495C11.7646 48.963 11.8578 48.9246 11.9345 48.8479C12.0113 48.7711 12.0497 48.6779 12.0497 48.5683C12.0497 48.4587 12.0113 48.3655 11.9345 48.2887C11.8578 48.212 11.7646 48.1736 11.6495 48.1736H7.48327C7.01183 48.1736 6.61165 48.0092 6.28274 47.6802C5.95383 47.3513 5.78938 46.9512 5.78938 46.4852C5.78938 46.0192 5.95383 45.6136 6.28274 45.2902C6.61165 44.9612 7.01183 44.7968 7.48327 44.7968V44.7858Z" fill="#F2A900"/>
                        </svg>
                        </div>
                      </div>
                      <nav className="flex flex-col gap-2 p-4">
                        {routes.filter(route => !route.hideInMainNav && !route.hidden).map((route) => {
                          const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}-[A-Z]{2}/, '');
                          const isActive = pathWithoutLocale === route.path || 
                                        pathWithoutLocale.startsWith(`${route.path}/`) || 
                                        (route.path !== "/dashboard" && pathWithoutLocale.includes(route.path));
                          
                          return route.disabled ? (
                            <div
                              key={route.path}
                              className="flex items-center gap-2 rounded-md px-3 py-2 text-muted-foreground opacity-60 cursor-not-allowed"
                            >
                              {route.imageNormal ? (
                                <img src={route.imageNormal} alt={route.name} className="h-5 w-5" />
                              ) : (
                                <route.icon className="h-5 w-5" />
                              )}
                              <span>{route.navKey && tNav ? tNav(route.navKey, {fallback: route.name}) : route.name}</span>
                    </div>
                          ) : (
                            <div
                          key={route.path}
                          className={cn(
                                "flex items-center gap-2 rounded-md px-3 py-2 cursor-pointer",
                                isActive
                                  ? "bg-[rgba(242,169,0,0.1)] text-[#F2A900]"
                                  : "text-muted-foreground hover:bg-[rgba(255,255,255,0.08)]"
                              )}
                              onClick={() => handleNavigate(route.path)}
                            >
                              {isActive && route.imageActive ? (
                                <img src={route.imageActive} alt={route.name} className="h-5 w-5" />
                              ) : route.imageNormal ? (
                                <img src={route.imageNormal} alt={route.name} className="h-5 w-5" />
                              ) : (
                                <route.icon className="h-5 w-5" />
                              )}
                              <span>{route.navKey && tNav ? tNav(route.navKey, {fallback: route.name}) : route.name}</span>
                            </div>
                          );
                        })}
                    </nav>
                  </SheetContent>
                </Sheet>
              </div>

                {/* 功能標題 */}
                <div className="hidden lg:block">
                  <h1 className="text-xl font-semibold">
                    {tNav ? tNav(pageNameKey, {fallback: pageNameKey.split('.').pop()}) : pageNameKey}
                  </h1>
                </div>

            
              </div>

              {/* 右側帳號信息和地球圖標 */}
              <div className="flex items-center gap-4">
                {/* 地球圖標 - 語言切換 */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div className="cursor-pointer hover:bg-gray-100 p-2 rounded-md">
                      <Globe className="h-5 w-5" />
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {locales.map((locale) => {
                      return (
                        <DropdownMenuItem key={locale} asChild>
                          <div 
                            className="flex items-center gap-2 cursor-pointer" 
                            onClick={() => {
                              // 直接使用當前路徑，讓 handleNavigate 函數處理清理工作
                              handleNavigate(pathname, locale);
                            }}
                          >
                            {getLanguageName(locale)}
            </div>
                        </DropdownMenuItem>
                      );
                    })}
                  </DropdownMenuContent>
                </DropdownMenu>
                
                {/* 帳號信息 */}
                <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 px-3 py-1 rounded-md">
                  {/* <div className="h-6 w-6 rounded-full bg-[#F2A900] flex items-center justify-center text-white font-semibold">
                    LC
                  </div> */}
                  <div className="hidden lg:flex flex-col">
                    <span className="text-sm font-medium">Lily Ciou</span>
                    <span className="text-xs text-gray-500">lily.ciou@cedarsdigital.io</span>
                </div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
    </TooltipProvider>
  )
}
