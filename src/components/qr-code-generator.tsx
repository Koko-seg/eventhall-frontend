"use client"

import { useEffect, useRef } from "react"

interface QRCodeGeneratorProps {
  data: string
  size?: number
}

export default function QRCodeGenerator({ data, size = 200 }: QRCodeGeneratorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (canvasRef.current) {
      generateQRCode(data, canvasRef.current, size)
    }
  }, [data, size])

  const generateQRCode = (text: string, canvas: HTMLCanvasElement, size: number) => {
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = size
    canvas.height = size

    // Simple QR code pattern generator (in real app, use a proper QR library)
    const modules = 25 // QR code grid size
    const moduleSize = size / modules

    // Clear canvas
    ctx.fillStyle = "#ffffff"
    ctx.fillRect(0, 0, size, size)

    // Generate pattern based on text hash
    const hash = simpleHash(text)
    ctx.fillStyle = "#000000"

    // Create finder patterns (corners)
    drawFinderPattern(ctx, 0, 0, moduleSize)
    drawFinderPattern(ctx, (modules - 7) * moduleSize, 0, moduleSize)
    drawFinderPattern(ctx, 0, (modules - 7) * moduleSize, moduleSize)

    // Fill data modules
    for (let row = 0; row < modules; row++) {
      for (let col = 0; col < modules; col++) {
        // Skip finder patterns
        if (isFinderPattern(row, col, modules)) continue

        // Generate pseudo-random pattern based on hash and position
        const shouldFill = (hash + row * col) % 3 === 0
        if (shouldFill) {
          ctx.fillRect(col * moduleSize, row * moduleSize, moduleSize, moduleSize)
        }
      }
    }
  }

  const simpleHash = (str: string): number => {
    let hash = 0
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i)
      hash = (hash << 5) - hash + char
      hash = hash & hash // Convert to 32-bit integer
    }
    return Math.abs(hash)
  }

  const drawFinderPattern = (ctx: CanvasRenderingContext2D, x: number, y: number, moduleSize: number) => {
    // Outer 7x7 square
    ctx.fillRect(x, y, 7 * moduleSize, 7 * moduleSize)

    // Inner white 5x5 square
    ctx.fillStyle = "#ffffff"
    ctx.fillRect(x + moduleSize, y + moduleSize, 5 * moduleSize, 5 * moduleSize)

    // Inner black 3x3 square
    ctx.fillStyle = "#000000"
    ctx.fillRect(x + 2 * moduleSize, y + 2 * moduleSize, 3 * moduleSize, 3 * moduleSize)
  }

  const isFinderPattern = (row: number, col: number, modules: number): boolean => {
    // Top-left finder pattern
    if (row < 9 && col < 9) return true
    // Top-right finder pattern
    if (row < 9 && col >= modules - 8) return true
    // Bottom-left finder pattern
    if (row >= modules - 8 && col < 9) return true

    return false
  }

  return (
    <div className="flex flex-col items-center">
      <canvas
        ref={canvasRef}
        className="border border-gray-200 rounded-lg shadow-sm"
        style={{ maxWidth: "100%", height: "auto" }}
      />
    </div>
  )
}
