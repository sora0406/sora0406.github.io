import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-full mt-2" />
        </div>
        <Skeleton className="h-10 w-24" />
      </div>
      
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-48" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Skeleton className="h-10 w-64" />
              <Skeleton className="h-10 w-24" />
            </div>
            
            <div className="border rounded-md">
              <div className="h-10 px-4 border-b flex items-center">
                <Skeleton className="h-4 w-full" />
              </div>
              
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-16 px-4 py-2 border-b flex items-center">
                  <div className="grid grid-cols-5 gap-4 w-full">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-8 w-24" />
                    <div className="flex justify-end">
                      <Skeleton className="h-8 w-24" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 