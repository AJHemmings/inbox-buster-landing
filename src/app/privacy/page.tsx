import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Privacy Policy | Inbox Buster",
  description: "How Inbox Buster collects, uses, and protects your data.",
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

export default function PrivacyPage() {
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
          Privacy Policy
        </h1>
        <p className="mt-3 text-xs text-white/30">Last updated: April 2026</p>

        <div className="my-8 h-px w-full bg-white/5" />

        <P>
          Inbox Buster is built by an independent developer. This policy explains what
          data is collected when you use the app, how it is used, and your rights over it.
          If anything is unclear, email{" "}
          <a
            href="mailto:adamhemmingsdev@gmail.com"
            className="text-white/70 underline underline-offset-2 hover:text-brand-purple transition-colors"
          >
            adamhemmingsdev@gmail.com
          </a>
          .
        </P>

        <Section title="What data we collect">
          <P>We collect the minimum data needed to provide the service:</P>
          <UL>
            <li>
              <strong className="text-white/80">Account data</strong> - your name, email
              address, and profile photo, provided via Google or Microsoft OAuth when you
              sign in. We do not store your password.
            </li>
            <li>
              <strong className="text-white/80">Email metadata</strong> - sender name,
              sender email, subject line, date, and email counts. This is fetched from
              your Gmail or Outlook account to power the inbox categorisation feature.
              Message bodies are never read or stored.
            </li>
            <li>
              <strong className="text-white/80">Payment data</strong> - payments are
              processed entirely by Stripe. We store only your Stripe customer ID and
              subscription status. We never see or store your card details.
            </li>
            <li>
              <strong className="text-white/80">Usage data</strong> - standard server
              logs (error reports, request counts) via Vercel. No ad tracking, no
              behavioural profiling.
            </li>
          </UL>
        </Section>

        <Section title="How we use your data">
          <UL>
            <li>To authenticate you and restore your session across devices</li>
            <li>
              To display your inbox categorisation, sender counts, and cleaning history
              within the app
            </li>
            <li>To process your payment and track whether your account is on the free or premium tier</li>
            <li>
              To respond to support requests submitted via the in-app support form
              (available to subscribers only)
            </li>
          </UL>
          <p className="mt-3 text-sm leading-relaxed text-white/60">
            We do not sell your data. We do not use it for advertising. We do not share
            it with third parties except the services listed below, which are necessary
            to run the app.
          </p>
        </Section>

        <Section title="Third-party services">
          <P>
            The following services process data on our behalf. Each has its own privacy
            policy linked below.
          </P>
          <div className="mt-3 flex flex-col gap-3">
            {[
              {
                name: "Firebase (Google)",
                purpose: "User authentication and database",
                href: "https://firebase.google.com/support/privacy",
              },
              {
                name: "Google OAuth",
                purpose: "Sign in with Google and Gmail access",
                href: "https://policies.google.com/privacy",
              },
              {
                name: "Microsoft OAuth",
                purpose: "Sign in with Microsoft and Outlook access",
                href: "https://privacy.microsoft.com",
              },
              {
                name: "Stripe",
                purpose: "Payment processing",
                href: "https://stripe.com/privacy",
              },
              {
                name: "Vercel",
                purpose: "Hosting and server infrastructure",
                href: "https://vercel.com/legal/privacy-policy",
              },
            ].map(({ name, purpose, href }) => (
              <div
                key={name}
                className="flex flex-col gap-0.5 rounded-xl border border-white/6 px-4 py-3"
                style={{ background: "rgba(255,255,255,0.03)" }}
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm font-semibold text-white/80">{name}</span>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 text-xs text-white/30 underline underline-offset-2 hover:text-brand-purple transition-colors"
                  >
                    Privacy policy
                  </a>
                </div>
                <span className="text-xs text-white/40">{purpose}</span>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Data retention">
          <UL>
            <li>
              Account and subscription data is retained for as long as your account
              exists.
            </li>
            <li>
              Email metadata is not persisted. It is fetched from your email provider on
              demand, processed in memory, and discarded. We do not store your emails.
            </li>
            <li>
              If you delete your account, your data is removed from our systems within
              30 days.
            </li>
          </UL>
        </Section>

        <Section title="Your rights (GDPR)">
          <P>
            If you are based in the UK or EU, you have the following rights over your
            personal data:
          </P>
          <UL>
            <li>The right to access the data we hold about you</li>
            <li>The right to correct inaccurate data</li>
            <li>The right to delete your data (right to erasure)</li>
            <li>
              The right to withdraw consent at any time by deleting your account from
              the Account page in the app
            </li>
          </UL>
          <p className="mt-3 text-sm leading-relaxed text-white/60">
            To exercise any of these rights, email{" "}
            <a
              href="mailto:adamhemmingsdev@gmail.com"
              className="text-white/70 underline underline-offset-2 hover:text-brand-purple transition-colors"
            >
              adamhemmingsdev@gmail.com
            </a>
            . We will respond within 30 days.
          </p>
        </Section>

        <Section title="Cookies">
          <P>
            Inbox Buster does not use advertising or tracking cookies. Firebase Auth uses
            a session token stored in your browser to keep you signed in. Vercel may set
            standard infrastructure cookies for routing and performance. No cookie
            consent banner is shown because no consent-required cookies are used.
          </P>
        </Section>

        <Section title="Changes to this policy">
          <P>
            If we make material changes to this policy, we will notify users by email
            before the changes take effect. The date at the top of this page reflects
            the most recent update.
          </P>
        </Section>

        <Section title="Contact">
          <P>
            Inbox Buster is operated by Adam Hemmings. For any privacy-related
            questions, email{" "}
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
