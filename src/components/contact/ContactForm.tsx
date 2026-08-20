"use client";

import { useState, type FormEvent } from "react";
import type { Project } from "@/types/project";
import { Button } from "@/components/ui/Button";
import { formatNumber } from "@/lib/utils";

interface ContactFormProps {
  projects: Project[];
  defaultProjectSlug?: string;
  defaultShares?: string;
}

export function ContactForm({ projects, defaultProjectSlug, defaultShares }: ContactFormProps) {
  const [submitted, setSubmitted] = useState(false);

  const prefilledProject = projects.find((project) => project.slug === defaultProjectSlug);
  const defaultMessage =
    prefilledProject && defaultShares
      ? `I'm interested in investing in ${prefilledProject.name} — ${formatNumber(
          Number(defaultShares) || 0
        )} share(s).`
      : "";

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="border border-line-strong p-10">
        <h2 className="font-display text-2xl font-medium">Message received.</h2>
        <p className="mt-3 text-ink/65">
          Thank you for reaching out — a member of our team will be in touch shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Field label="Full Name" name="name" required />
        <Field label="Phone Number" name="phone" type="tel" required />
      </div>

      <Field label="Email Address" name="email" type="email" required />

      <div>
        <label htmlFor="interest" className="block text-sm text-ink/60">
          Investment Interest
        </label>
        <select
          id="interest"
          name="interest"
          defaultValue={prefilledProject?.slug ?? "general"}
          className="mt-2 w-full border-b border-line-strong bg-transparent py-2.5 focus:border-ink focus:outline-none"
        >
          <option value="general">General Inquiry</option>
          {projects.map((project) => (
            <option key={project.slug} value={project.slug}>
              {project.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm text-ink/60">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          defaultValue={defaultMessage}
          className="mt-2 w-full resize-none border-b border-line-strong bg-transparent py-2.5 focus:border-ink focus:outline-none"
        />
      </div>

      <Button type="submit" variant="primary" size="lg" icon className="mt-2 self-start">
        Send Message
      </Button>
    </form>
  );
}

interface FieldProps {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}

function Field({ label, name, type = "text", required = false }: FieldProps) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm text-ink/60">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="mt-2 w-full border-b border-line-strong bg-transparent py-2.5 focus:border-ink focus:outline-none"
      />
    </div>
  );
}
