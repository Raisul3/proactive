import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { faqs } from '../../constants/content'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <section className="max-w-3xl mx-auto px-6 py-20">
      <h2 className="text-3xl font-bold text-center mb-12 text-[var(--color-text-primary)]">Frequently asked questions</h2>
      <div className="space-y-3">
        {faqs.map((faq, i) => (
          <div key={faq.question} className="card overflow-hidden">
            <button
              className="w-full flex items-center justify-between px-5 py-4 text-left font-medium"
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              aria-expanded={openIndex === i}
            >
              {faq.question}
              <ChevronDown
                size={18}
                className={`transition-transform ${openIndex === i ? 'rotate-180' : ''}`}
              />
            </button>
            {openIndex === i && (
              <p className="px-5 pb-4 text-sm text-[var(--color-text-secondary)]">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
