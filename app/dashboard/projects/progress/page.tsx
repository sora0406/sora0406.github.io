"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, MoreHorizontal, Clock, Users } from "lucide-react"
import { DragDropContext, Droppable, Draggable, DropResult, DroppableProvided, DraggableProvided } from "@hello-pangea/dnd"

interface Task {
  id: string
  title: string
  description: string
  dueDate: string
  assignee: string
  priority: string
}

interface Column {
  id: string
  title: string
  color: string
  items: Task[]
}

interface Columns {
  [key: string]: Column
}

// 模擬數據
const initialColumns: Columns = {
  "not-started": {
    id: "not-started",
    title: "未開始",
    color: "bg-gray-500/10 text-gray-500",
    items: [
      {
        id: "task-1",
        title: "供應商碳盤查問卷",
        description: "收集供應商的碳排放數據",
        dueDate: "2024-04-15",
        assignee: "王小明",
        priority: "高",
      },
      {
        id: "task-2",
        title: "數據分析報告",
        description: "分析供應商的碳排放趨勢",
        dueDate: "2024-04-20",
        assignee: "李小華",
        priority: "中",
      },
    ],
  },
  "in-progress": {
    id: "in-progress",
    title: "進行中",
    color: "bg-yellow-500/10 text-yellow-500",
    items: [
      {
        id: "task-3",
        title: "供應商訪談",
        description: "與主要供應商進行面對面訪談",
        dueDate: "2024-04-10",
        assignee: "張大明",
        priority: "高",
      },
    ],
  },
  "completed": {
    id: "completed",
    title: "已完成",
    color: "bg-green-500/10 text-green-500",
    items: [
      {
        id: "task-4",
        title: "問卷設計",
        description: "設計供應商碳盤查問卷",
        dueDate: "2024-03-25",
        assignee: "陳小美",
        priority: "高",
      },
    ],
  },
}

export function ProjectProgressPage() {
  const [columns, setColumns] = useState<Columns>(initialColumns)

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return

    const { source, destination } = result

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId]
      const destColumn = columns[destination.droppableId]
      const sourceItems = [...sourceColumn.items]
      const destItems = [...destColumn.items]
      const [removed] = sourceItems.splice(source.index, 1)
      destItems.splice(destination.index, 0, removed)
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      })
    } else {
      const column = columns[source.droppableId]
      const copiedItems = [...column.items]
      const [removed] = copiedItems.splice(source.index, 1)
      copiedItems.splice(destination.index, 0, removed)
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      })
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "高":
        return "bg-red-500/10 text-red-500"
      case "中":
        return "bg-yellow-500/10 text-yellow-500"
      case "低":
        return "bg-green-500/10 text-green-500"
      default:
        return "bg-gray-500/10 text-gray-500"
    }
  }

  return (
    <div className="flex-1 space-y-4  ">
      <div className="flex items-center justify-between space-y-2">
      <div className="flex items-center space-x-2">
          <Button variant="css-primary">
            <Plus className="mr-2 h-4 w-4" />
            新增任務
          </Button>
        </div>
        {/* <h2 className="text-3xl font-bold tracking-tight">專案進度</h2> */}
     
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(columns).map(([columnId, column]) => (
            <div key={columnId} className="flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Badge className={column.color}>
                    {column.title}
                  </Badge>
                  <span className="text-sm text-gray-500">
                    {column.items.length}
                  </span>
                </div>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>

              <Droppable droppableId={columnId}>
                {(provided: DroppableProvided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="flex-1 space-y-4"
                  >
                    {column.items.map((item, index) => (
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}
                      >
                        {(provided: DraggableProvided) => (
                          <Card
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="cursor-grab active:cursor-grabbing"
                          >
                            <CardHeader className="p-4">
                              <div className="flex items-start justify-between">
                                <div className="space-y-1">
                                  <CardTitle className="text-base">
                                    {item.title}
                                  </CardTitle>
                                  <CardDescription>
                                    {item.description}
                                  </CardDescription>
                                </div>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </div>
                            </CardHeader>
                            <CardContent className="p-4 pt-0">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                  <div className="flex items-center gap-1 text-sm text-gray-500">
                                    <Clock className="h-4 w-4" />
                                    <span>{item.dueDate}</span>
                                  </div>
                                  <div className="flex items-center gap-1 text-sm text-gray-500">
                                    <Users className="h-4 w-4" />
                                    <span>{item.assignee}</span>
                                  </div>
                                </div>
                                <Badge className={getPriorityColor(item.priority)}>
                                  {item.priority}
                                </Badge>
                              </div>
                            </CardContent>
                          </Card>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  )
}

// 提供默認導出
export default ProjectProgressPage 