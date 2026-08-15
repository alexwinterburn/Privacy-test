"use client";

import { useState } from "react";

export type FaqItem = { q: string; a: React.ReactNode };

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div className={`faq-item${isOpen ? " open" : ""}`} key={i}>
            <button
              className="faq-item__q"
              aria-expanded={isOpen}
              onClick={() => setOpenIndex(isOpen ? null : i)}
            >
              {item.q}
            </button>
            <div
              className="faq-item__a"
              style={{ maxHeight: isOpen ? "1000px" : 0 }}
            >
              <div className="faq-item__a-inner">{item.a}</div>
            </div>
          </div>
        );
      })}
    </>
  );
}
