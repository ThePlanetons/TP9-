import LegalLayout from '../components/legal/LegalLayout'
import { LEGAL, SITE } from '../config/site'
import { Link } from '../lib/router'
import { useSEO } from '../lib/seo'

export default function Terms() {
  useSEO({ title: `Terms & Conditions | ${SITE.name}`, description: `The terms that apply to using the ${SITE.name} website and to our website design, development and branding services.`, path: '/terms' })
  const mail = <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
  return (
    <LegalLayout
      title="Terms & Conditions"
      intro={`These terms apply to your use of the ${SITE.name} website and to enquiries you make through it. Work for clients is governed by the written proposal or agreement we sign together, which takes priority over these terms where they differ.`}
    >
      <section>
        <h2>1. Using this website</h2>
        <p>By using this site you agree to these terms. If you do not agree, please do not use it. You agree not to misuse the site — for example by attempting to disrupt it, probe it for vulnerabilities, scrape it at scale, or submit spam or unlawful content through the contact form.</p>
      </section>
      <section>
        <h2>2. Enquiries are not contracts</h2>
        <p>Sending an enquiry does not create a contract. A project begins only when both parties have agreed a written proposal (scope, price, timeline and payment terms) and any required deposit has been paid. Any estimate we give before then is indicative.</p>
      </section>
      <section>
        <h2>3. Our services</h2>
        <p>We provide website design and development, 3D web experiences, branding, UI/UX design, digital marketing and content creation. The exact deliverables are those listed in the agreed proposal. Requests outside that scope may be quoted separately.</p>
      </section>
      <section>
        <h2>4. Fees and payment</h2>
        <p>Fees, deposits, milestones and payment deadlines are set out in each proposal. Unless the proposal says otherwise, work may be paused if an invoice is overdue, and third-party costs (domains, hosting, licences, stock assets) are paid by the client.</p>
      </section>
      <section>
        <h2>5. Client responsibilities</h2>
        <p>Clients agree to provide content, feedback and approvals promptly, and confirm that they own or have permission to use everything they supply (text, images, logos, music, video). Delays in feedback or content may affect the timeline.</p>
      </section>
      <section>
        <h2>6. Intellectual property</h2>
        <ul>
          <li>On full payment, the client owns the bespoke design and code we created specifically for their project.</li>
          <li>We keep ownership of our pre-existing tools, code libraries, frameworks and know-how, and grant the client a licence to use them as part of the delivered work.</li>
          <li>Third-party assets (fonts, plugins, stock media, open-source software) remain subject to their own licences.</li>
          <li>Unless agreed otherwise, we may show completed work in our portfolio and case studies.</li>
          <li>The content, design and branding of this website belong to {SITE.name}; you may not copy them without permission.</li>
        </ul>
      </section>
      <section>
        <h2>7. Third-party links and services</h2>
        <p>This site links to third-party websites and relies on third-party services. We do not control them and are not responsible for their content, availability or practices.</p>
      </section>
      <section>
        <h2>8. Disclaimer</h2>
        <p>This website and its content are provided &ldquo;as is&rdquo; without warranties of any kind. We aim to keep information accurate and the site available but do not guarantee that it will be error-free or uninterrupted. Examples of work shown here are illustrations of past projects and not a promise of future results.</p>
      </section>
      <section>
        <h2>9. Limitation of liability</h2>
        <p>To the extent permitted by law, {SITE.name} is not liable for indirect or consequential loss, loss of profit, data or business arising from use of this website. For paid projects, our total liability is limited to the fees paid for the relevant project, unless the agreement states otherwise. Nothing in these terms excludes liability that cannot be excluded by law.</p>
      </section>
      <section>
        <h2>10. Privacy and cookies</h2>
        <p>How we handle personal data and cookies is explained in our <Link href="/privacy">Privacy Policy</Link>.</p>
      </section>
      <section>
        <h2>11. Changes</h2>
        <p>We may update these terms from time to time; the version published here applies from the &ldquo;last updated&rdquo; date.</p>
      </section>
      <section>
        <h2>12. Governing law</h2>
        <p>These terms are governed by the laws of {LEGAL.governingLaw}, and disputes are subject to the jurisdiction of the competent courts there.</p>
      </section>
      <section>
        <h2>13. Contact</h2>
        <p>Questions about these terms: {mail}.</p>
      </section>
    </LegalLayout>
  )
}
