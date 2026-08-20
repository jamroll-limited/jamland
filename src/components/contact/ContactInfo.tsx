import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { company } from "@/data/company";
import { Reveal } from "@/components/motion/Reveal";

export function ContactInfo() {
  const items = [
    { icon: Phone, label: "Phone", value: company.phone, href: company.phoneHref },
    { icon: Mail, label: "Email", value: company.email, href: `mailto:${company.email}` },
    {
      icon: MapPin,
      label: "Office",
      value: `${company.address.line1}, ${company.address.line2}, ${company.address.city}`,
    },
  ];

  return (
    <div className="flex flex-col gap-8 border-t border-line pt-8 lg:border-t-0 lg:border-l lg:pl-10 lg:pt-0">
      {items.map((item) => (
        <Reveal key={item.label}>
          <div className="flex items-start gap-4">
            <item.icon aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-moss" />
            <div>
              <p className="text-xs uppercase tracking-wide text-ink/45">{item.label}</p>
              {item.href ? (
                <a href={item.href} className="mt-1 block font-medium hover:text-moss">
                  {item.value}
                </a>
              ) : (
                <p className="mt-1 font-medium">{item.value}</p>
              )}
            </div>
          </div>
        </Reveal>
      ))}

      <Reveal>
        <a
          href={company.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 border border-line-strong px-6 py-3 text-sm font-medium uppercase tracking-wide transition-colors hover:border-ink"
        >
          <MessageCircle aria-hidden="true" className="size-4" />
          Chat on WhatsApp
        </a>
      </Reveal>
    </div>
  );
}
