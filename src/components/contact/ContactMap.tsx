import { company } from "@/data/company";
import { Reveal } from "@/components/motion/Reveal";

/** A key-less Google Maps embed (`/maps?q=...&output=embed`) — no Maps API/billing required. */
export function ContactMap() {
  const query = encodeURIComponent(company.mapEmbedQuery);

  return (
    <Reveal>
      <div className="aspect-16/9 w-full overflow-hidden rounded-sm border border-line">
        <iframe
          title="Jamland office location"
          src={`https://www.google.com/maps?q=${query}&output=embed`}
          className="h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </Reveal>
  );
}
