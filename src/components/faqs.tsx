import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "How does the Instagram automation work?",
    answer:
      "Our platform uses advanced AI to automate your Instagram posts, comments, and interactions while maintaining a natural, authentic feel. You set the parameters, and our system takes care of the rest."
  },
  {
    question: "Is this compliant with Instagram's terms of service?",
    answer:
      "Yes, our automation tools are designed to work within Instagram's guidelines. We prioritize account safety and adhere to best practices to ensure your account remains in good standing."
  },
  {
    question: "Can I customize the automation for my brand?",
    answer:
      "Our platform offers extensive customization options. You can set your brand voice, target audience, posting schedule, and interaction preferences to align with your marketing strategy."
  },
  {
    question: "What kind of results can I expect?",
    answer:
      "While results can vary, our users typically see increased engagement rates, follower growth, and time savings. The specific outcomes depend on your content quality, niche, and automation settings."
  }
]

export function FAQs() {
  return (
    <section className="py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
