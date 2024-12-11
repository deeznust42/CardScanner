'use client'

import { useEffect, useRef } from 'react'
import { BarcodeReader } from 'dynamsoft-javascript-barcode'

// License for Dynamsoft Barcode Reader
BarcodeReader.license = 'DLS2eyJoYW5kc2hha2VDb2RlIjoiMjAwMDAxLTE2NDk4Mjk3OTI2MzUiLCJvcmdhbml6YXRpb25JRCI6IjIwMDAwMSIsInNlc3Npb25QYXNzd29yZCI6IndTcGR6Vm05WDJrcEQ5YUoifQ=='

interface CardScannerProps {
  onScanComplete: (result: string) => void
}

export default function CardScanner({ onScanComplete }: CardScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    let reader: BarcodeReader | null = null

    const initializeScanner = async () => {
      try {
        reader = await BarcodeReader.createInstance()
        const settings = await reader.getRuntimeSettings()
        settings.barcodeFormatIds = BarcodeReader.BF_QR_CODE
        await reader.updateRuntimeSettings(settings)

        const cameras = await BarcodeReader.getCameras()
        if (cameras.length) {
          const camera = cameras[0]
          await reader.setImageSource(camera, { width: 1280, height: 720 })
          if (videoRef.current) {
            videoRef.current.srcObject = reader.getVideoSettings().video.stream
          }
          reader.onUniqueRead = (txt, result) => {
            validateCard(txt)
              .then((isValid) => {
                onScanComplete(isValid ? 'Card is valid' : 'Card is invalid')
              })
              .catch(() => {
                onScanComplete('Error validating card')
              })
          }
          await reader.startScanning()
        }
      } catch (error) {
        console.error('Error initializing scanner:', error)
      }
    }

    initializeScanner()

    return () => {
      if (reader) {
        reader.stopScanning()
        reader.destroyContext()
      }
    }
  }, [onScanComplete])

  const validateCard = async (cardData: string): Promise<boolean> => {
    // This is a mock function to simulate database validation
    // In a real application, you would make an API call to your backend here
    await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API delay
    return Math.random() < 0.5 // Randomly return true or false
  }

  return (
    <div className="w-full max-w-md aspect-video">
      <video ref={videoRef} className="w-full h-full" playsInline />
    </div>
  )
}

