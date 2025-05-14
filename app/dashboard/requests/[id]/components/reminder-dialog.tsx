"use client"

import { useState } from "react"
import { Mail, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"

interface Supplier {
  id: string
  name: string
  email: string
  status: string
}

interface ReminderDialogProps {
  supplier: Supplier
  disabled?: boolean
}

export function ReminderDialog({ supplier, disabled = false }: ReminderDialogProps) {
  const [reminderMessage, setReminderMessage] = useState(
    "親愛的供應商，\n\n請提醒您，我們需要您提交以下數據：\n\n感謝您的配合！",
  )
  const [isReminderSent, setIsReminderSent] = useState(false)
  const [open, setOpen] = useState(false)

  // 發送提醒
  const sendReminder = (supplierId: string) => {
    // 在實際應用中，這裡會發送提醒郵件
    console.log(`發送提醒給供應商 ID: ${supplierId}，消息: ${reminderMessage}`)
    setIsReminderSent(true)
    
    // 關閉對話框
    setTimeout(() => {
      setOpen(false)
      // 重置狀態，延遲一下可以避免動畫突然中斷
      setTimeout(() => setIsReminderSent(false), 300)
    }, 1500)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" disabled={disabled}>
          <Mail className="mr-2 h-4 w-4" />
          提醒
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>發送提醒</DialogTitle>
          <DialogDescription>向 {supplier.name} 發送提醒郵件</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <p className="text-sm font-medium">收件人</p>
            <p className="text-sm text-muted-foreground">{supplier.email}</p>
          </div>
          <div className="grid gap-2">
            <p className="text-sm font-medium">消息</p>
            <Textarea
              value={reminderMessage}
              onChange={(e) => setReminderMessage(e.target.value)}
              rows={6}
            />
          </div>
        </div>
        <DialogFooter>
          <Button 
            onClick={() => sendReminder(supplier.id)} 
            className="w-full sm:w-auto"
            disabled={isReminderSent}
          >
            {isReminderSent ? (
              "已發送提醒"
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                發送提醒
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 