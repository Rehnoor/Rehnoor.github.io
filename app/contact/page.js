import ContactForm from "@/components/contact/ContactForm";
import { site } from "@/data/site";

export const metadata = {
  title: `Contact — ${site.name}`,
  description: "Get in touch with Rehnoor Saini.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-xl px-6 py-20">
      <h1 className="font-display text-3xl font-bold sm:text-4xl">
        Get in Touch
      </h1>
      <p className="mt-3 text-foreground/70">
        Have a project, a question, or just want to say hi? Fill out the form
        below or reach out on{" "}
        <a
          href={site.social.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent"
        >
          LinkedIn
        </a>
        .
      </p>
      <div className="mt-10">
        <ContactForm />
      </div>
    </div>
  );
}
