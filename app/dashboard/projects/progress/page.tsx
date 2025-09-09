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
    title: "To Do",
    color: "bg-gray-500/10 text-gray-500",
    items: [
      {
        id: "task-1",
        title: "Organizational GHG Inventory Project",
        description: "Build a database covering Scope 1, Scope 2, and Scope 3 (Cat.1–8) emissions, while collecting Scope 1 & 2 activity data and renewable energy usage, to ensure completeness and traceability of organizational GHG inventory.",
        dueDate: "2024-04-15",
        assignee: "Amy",
        priority: "High",
      },
      {
        id: "task-2",
        title: "Product Carbon Footprint Project",
        description: "Collect emission factors and supplier-measured data for major raw materials (aluminum, copper, plastics) corresponding to the LCA raw material stage; analyze manufacturing energy use, yield, and renewable energy share to create unit process emission lists that support multi-product and multi-site carbon footprint calculations.",
        dueDate: "2024-04-20",
        assignee: "Molly",
        priority: "Medium",
      },
    ],
  },
  "in-progress": {
    id: "in-progress",
    title: "In Progress",
    color: "bg-yellow-500/10 text-yellow-500",
    items: [
      {
        id: "task-3",
        title: "Supply Chain Renewable Energy Tracking Project",
        description: "Consolidate suppliers’ renewable energy usage ratio and sources (self-generation, direct purchase, green electricity/certificates), recording supporting evidence (certificate ID, validity period, region) to establish measurable renewable energy coverage indicators.",
        dueDate: "2024-04-10",
        assignee: "Lily",
        priority: "High",
      },
    ],
  },
  "completed": {
    id: "completed",
    title: "completed",
    color: "bg-green-500/10 text-green-500",
    items: [
      {
        id: "task-4",
        title: "PACT Data Exchange Project",
        description: "Organize key PCF data fields (boundaries, methodology, allocation, data sources, QA status) in line with PACT 3.x standards, and conduct data exchange and verification with upstream customers and suppliers to enhance transparency and consistency.",
        dueDate: "2024-03-25",
        assignee: "Tony",
        priority: "High",
      },
    ],
  },
}

// 添加 props 接口
interface ProjectProgressPageProps {
  t?: (key: string) => string;
}

export function ProjectProgressPage({ t }: ProjectProgressPageProps = {}) {
  const [columns, setColumns] = useState<Columns>(initialColumns)

  // 翻譯函數
  const translate = (key: string, defaultText: string) => {
    if (t) {
      try {
        return t(key);
      } catch (error) {
        console.warn(`Missing translation for key: ${key}`);
        return defaultText;
      }
    }
    return defaultText;
  };

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
      case "High":
        return "bg-red-500/10 text-red-500"
      case "Medium":
        return "bg-yellow-500/10 text-yellow-500"
      case "低":
        return "bg-green-500/10 text-green-500"
      default:
        return "bg-gray-500/10 text-gray-500"
    }
  }
  
  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center ">
  
          <Button variant="css-primary">
            <Plus className="mr-2 h-4 w-4" />
            {translate('add_task', '新增專案')}
          </Button>
     
     
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