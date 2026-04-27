import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Terms of Service | Inbox Buster",
  description: "The terms that govern your use of Inbox Buster.",
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="mb-3 text-lg font-bold text-brand-purple">{title}</h2>
      {children}
    </section>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="text-sm leading-relaxed text-white/60">{children}</p>;
}

function UL({ children }: { children: React.ReactNode }) {
  return (
    <ul className="mt-2 flex flex-col gap-1.5 pl-4 text-sm leading-relaxed text-white/60 list-disc">
      {children}
    </ul>
  );
}

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-brand-dark">
      <Navbar />

      <div className="mx-auto max-w-3xl px-6 pb-24 pt-32 lg:px-8">
        <p className="mb-2 text-[11px] font-black uppercase tracking-[0.22em] text-brand-purple">
          Legal
        </p>
        <h1
          className="font-black tracking-tight text-white"
          style={{ fontSize: "clamp(1.9rem, 4.5vw, 2.75rem)", lineHeight: 1.05 }}
        >
          Terms of Service
        </h1>
        <p className="mt-3 text-xs text-white/30">Last updated: April 2026</p>

        <div className="my-8 h-px w-full bg-white/5" />

        <P>
          These terms govern your use of Inbox Buster. By creating an account or using
          the app, you agree to them. If you have questions, email{" "}
          <a
            href="mailto:adamhemmingsdev@gmail.com"
            className="text-white/70 underline underline-offset-2 hover:text-brand-purple transition-colors"
          >
            adamhemmingsdev@gmail.com
          </a>
          .
        </P>

        <Section title="What the service does">
          <P>
            Inbox Buster connects to your Gmail or Outlook account using OAuth. You
            explicitly grant permission during sign-in and can revoke it at any time from
            your Google or Microsoft account settings. Once connected, the app reads your
            email metadata (senders, subjects, dates, counts) to help you categorise,
            mass delete, and bulk unsubscribe from emails. Message bodies are never read
            or stored.
          </P>
        </Section>

        <Section title="Your account">
          <UL>
            <li>
              You are responsible for keeping your account secure. We are not liable for
              loss caused by unauthorised access to your account.
            </li>
            <li>
              You must be at least 13 years old to use Inbox Buster.
            </li>
            <li>
              You may delete your account at any time from the Account page in the app.
            </li>
          </UL>
        </Section>

        <Section title="Payment terms">
          <P>Inbox Buster offers three tiers:</P>
          <div className="mt-3 flex flex-col gap-3">
            {[
              {
                name: "Free",
                detail:
                  "1,000 emails cleaned per calendar month, at no cost. No card required.",
              },
              {
                name: "Premium (pay what you feel)",
                detail:
                  "A one-off payment of your choosing (minimum £1) unlocks unlimited email cleaning permanently. Your premium status never expires and does not require a subscription.",
              },
              {
                name: "Support subscription (£2.50/month)",
                detail:
                  "An optional add-on for premium users that gives access to the in-app support ticket form. Requires an active premium account. Cancel at any time from the Account page. Cancelling removes support access; your premium status is retained.",
              },
            ].map(({ name, detail }) => (
              <div
                key={name}
                className="rounded-xl border border-white/6 px-4 py-3"
                style={{ background: "rgba(255,255,255,0.03)" }}
              >
                <p className="mb-1 text-sm font-semibold text-white/80">{name}</p>
                <p className="text-xs leading-relaxed text-white/50">{detail}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm leading-relaxed text-white/60">
            All payments are processed by Stripe. By paying, you agree to{" "}
            <a
              href="https://stripe.com/legal/ssa"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 underline underline-offset-2 hover:text-brand-purple transition-colors"
            >
              Stripe&rsquo;s terms
            </a>
            . 1% of every payment goes to carbon removal via{" "}
            <a
              href="https://stripe.com/climate"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 underline underline-offset-2 hover:text-brand-purple transition-colors"
            >
              Stripe Climate
            </a>
            .
          </p>
        </Section>

        <Section title="Refund policy">
          <UL>
            <li>
              The one-off premium payment is non-refundable once the upgrade has been
              applied to your account.
            </li>
            <li>
              The support subscription can be cancelled at any time. No partial-month
              refunds are issued.
            </li>
            <li>
              If you believe there has been a billing error, contact us at{" "}
              <a
                href="mailto:adamhemmingsdev@gmail.com"
                className="text-white/70 underline underline-offset-2 hover:text-brand-purple transition-colors"
              >
                adamhemmingsdev@gmail.com
              </a>{" "}
              within 14 days and we will review it.
            </li>
          </UL>
        </Section>

        <Section title="Acceptable use">
          <P>You must not:</P>
          <UL>
            <li>
              Attempt to scrape, extract, or misuse email data beyond normal use of the
              app
            </li>
            <li>
              Attempt to bypass rate limits, email quotas, or payment enforcement
            </li>
            <li>
              Use the app in a way that violates Google&rsquo;s or Microsoft&rsquo;s API
              terms of service
            </li>
            <li>
              Attempt to reverse engineer, decompile, or copy any part of the service
            </li>
          </UL>
        </Section>

        <Section title="Limitation of liability">
          <P>
            Inbox Buster is provided as-is, without warranty of any kind. We are not
            liable for accidental deletion of emails. The app asks you to confirm
            destructive actions before applying them. You are responsible for reviewing
            those confirmations.
          </P>
          <p className="mt-3 text-sm leading-relaxed text-white/60">
            To the maximum extent permitted by law, our total liability to you for any
            claim is capped at the amount you paid to Inbox Buster in the 12 months prior
            to the claim arising.
          </p>
        </Section>

        <Section title="Account termination">
          <UL>
            <li>
              You may delete your account at any time from the Account page. Your data
              will be removed within 30 days.
            </li>
            <li>
              We may suspend or terminate accounts that violate these terms, with notice
              where reasonably possible.
            </li>
          </UL>
        </Section>

        <Section title="Changes to these terms">
          <P>
            We will notify you by email before making any material changes to these
            terms. Continued use of the app after changes take effect constitutes
            acceptance of the updated terms.
          </P>
        </Section>

        <Section title="Governing law">
          <P>
            These terms are governed by the laws of England and Wales. Any disputes will
            be subject to the exclusive jurisdiction of the courts of England and Wales.
          </P>
        </Section>

        <Section title="Contact">
          <P>
            Inbox Buster is operated by Adam Hemmings. For any questions about these
            terms, email{" "}
            <a
              href="mailto:adamhemmingsdev@gmail.com"
              className="text-white/70 underline underline-offset-2 hover:text-brand-purple transition-colors"
            >
              adamhemmingsdev@gmail.com
            </a>
            .
          </P>
        </Section>
      </div>

      <Footer />
    </main>
  );
}
