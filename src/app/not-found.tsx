import { Container } from "@/components/layout/Container";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Container className="flex min-h-[70vh] flex-col items-center justify-center py-32 text-center">
      <p className="font-display text-sm uppercase tracking-[0.18em] text-moss">404</p>
      <h1 className="mt-4 font-display text-4xl font-medium md:text-6xl">Page not found.</h1>
      <p className="mt-4 max-w-md text-ink/65">
        The page you&apos;re looking for doesn&apos;t exist or may have moved.
      </p>
      <ButtonLink href="/" size="lg" className="mt-8">
        Back to Home
      </ButtonLink>
    </Container>
  );
}
