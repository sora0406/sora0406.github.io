"use client"

import CarbonWarRoomPage from './carbon-war-room'

export default function WarRoomPage({ 
  tDashboard, 
  tWarRoom, 
  tCommon 
}: { 
  tDashboard?: any, 
  tWarRoom?: any, 
  tCommon?: any 
}) {
  // 使用新的War Room頁面
  return (
    <CarbonWarRoomPage 
      tDashboard={tDashboard}
      tWarRoom={tWarRoom}
      tCommon={tCommon}
    />
  );
}
