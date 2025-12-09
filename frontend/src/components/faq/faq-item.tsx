"use client"

import type React from "react"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface FAQItemProps {
  question: string
  answer: string | React.ReactNode
  defaultOpen?: boolean
}

export function FAQItem({ question, answer, defaultOpen = false }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="border-b border-border">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-start justify-between gap-4 text-left hover:opacity-70 transition-opacity"
      >
        <h3 className="text-lg font-semibold text-foreground">{question}</h3>
        <ChevronDown
          className={cn(
            "w-5 h-5 text-muted-foreground transition-transform flex-shrink-0 mt-1",
            isOpen && "rotate-180",
          )}
        />
      </button>

      <div className={cn("overflow-hidden transition-all duration-300", isOpen ? "max-h-[1000px] pb-6" : "max-h-0")}>
        <div className="text-muted-foreground leading-relaxed whitespace-pre-line">{answer}</div>
      </div>
    </div>
  )
}
