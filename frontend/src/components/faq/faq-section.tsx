import type React from "react"
import { FAQItem } from "./faq-item"

export interface FAQ {
  question: string
  answer: string | React.ReactNode
  defaultOpen?: boolean
}

interface FAQSectionProps {
  title: string
  subtitle?: string
  faqs: FAQ[]
  className?: string
}

export function FAQSection({ title, subtitle, faqs, className }: FAQSectionProps) {
  return (
    <section className={className}>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">{title}</h1>
          {subtitle && <p className="text-lg text-muted-foreground">{subtitle}</p>}
        </div>

        <div className="space-y-0">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} defaultOpen={faq.defaultOpen} />
          ))}
        </div>
      </div>
    </section>
  )
}
