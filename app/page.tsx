'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Card Scanner App</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4">
          <Button 
            size="lg" 
            className="w-full max-w-xs text-lg py-6"
          >
            Scan Card
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

