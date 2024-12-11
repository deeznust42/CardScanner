'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import CardScanner from '@/components/CardScanner'

export default function Home() {
  const [showScanner, setShowScanner] = useState(false)
  const [scanResult, setScanResult] = useState<string | null>(null)

  const handleScanComplete = (result: string) => {
    setScanResult(result)
    setShowScanner(false)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Card Scanner App</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4">
          {!showScanner && (
            <Button 
              size="lg" 
              onClick={() => setShowScanner(true)}
              className="w-full max-w-xs text-lg py-6"
            >
              Scan Card
            </Button>
          )}
          {showScanner && (
            <CardScanner onScanComplete={handleScanComplete} />
          )}
          {scanResult && (
            <div className="text-center">
              <p className="font-semibold">Scan Result:</p>
              <p>{scanResult}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

