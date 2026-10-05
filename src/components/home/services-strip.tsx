import { services } from "@/lib/catalog";

export function ServicesStrip() {
  return (
    <section aria-label="Atelier services" className="bg-surface-muted">
      <ul className="shell grid grid-cols-1 gap-8 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:py-16">
        {services.map((service) => (
          <li key={service.title} className="text-center">
            <h3 className="eyebrow">{service.title}</h3>
            <p className="caption mx-auto mt-2 max-w-60 text-muted">{service.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
