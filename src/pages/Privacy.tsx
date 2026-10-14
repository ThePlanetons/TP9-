import LegalLayout from '../components/legal/LegalLayout'
import { SITE } from '../config/site'
import { openCookieSettings } from '../lib/consent'
import { useSEO } from '../lib/seo'

export default function Privacy() {
  useSEO({ title: `Privacy Policy | ${SITE.name}`, description: `How ${SITE.name} collects, uses and protects your personal data when you use our website or contact us.`, path: '/privacy' })
  const mail = <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
  return (
    <LegalLayout
      title="Privacy Policy"
      intro={`${SITE.name} ("TP9", "we", "us") respects your privacy. This policy explains what personal data we collect through this website, why we collect it, who we share it with and the choices you have.`}
    >
      <section>
        <h2>1. Who we are</h2>
        <p>{SITE.name} is a digital branding house that designs and builds websites and digital experiences. For anything related to this policy, contact us at {mail}.</p>
      </section>
      <section>
        <h2>2. What we collect</h2>
        <ul>
          <li><strong>Enquiry form:</strong> your name, email address, and — if you choose to provide them — phone number, company, website, services of interest, project scope, timeline, how you heard about us, and your message.</li>
          <li><strong>Email:</strong> anything you send us directly, and our replies.</li>
          <li><strong>Analytics (only if you accept):</strong> pages viewed, approximate location (from an anonymised IP address), device, browser and referrer, collected with Google Analytics.</li>
          <li><strong>Technical logs:</strong> our hosting provider may automatically record IP address, browser and request details for security and reliability.</li>
        </ul>
        <p>We do not knowingly collect sensitive personal data, and we do not collect payment details through this website.</p>
      </section>
      <section>
        <h2>3. How we use your data</h2>
        <ul>
          <li>To reply to your enquiry, prepare proposals and, if you hire us, deliver the project.</li>
          <li>To understand how the site is used and improve it (analytics, with your consent).</li>
          <li>To keep the site secure and prevent spam and abuse.</li>
          <li>To meet legal and accounting obligations.</li>
        </ul>
      </section>
      <section>
        <h2>4. Legal basis</h2>
        <p>We rely on your <strong>consent</strong> (submitting the form, accepting analytics cookies), on our <strong>legitimate interest</strong> in running and securing our business, and on <strong>contract</strong> where we need data to provide services you have asked for. You can withdraw consent at any time.</p>
      </section>
      <section>
        <h2>5. Who we share it with</h2>
        <p>We never sell your personal data. We use a small number of service providers (processors) that handle data on our behalf:</p>
        <ul>
          <li><strong>FormSubmit</strong> — delivers contact-form submissions to our email inbox.</li>
          <li><strong>Google</strong> (Gmail and, if you accept analytics, Google Analytics) — email and website analytics.</li>
          <li><strong>Our hosting and content-delivery provider</strong> — serves this website.</li>
        </ul>
        <p>These providers may process data in countries other than your own. We may also disclose data where the law requires it.</p>
      </section>
      <section id="cookies">
        <h2>6. Cookies and local storage</h2>
        <ul>
          <li><strong>Essential — <code>tp9_cookie_consent</code> (local storage):</strong> remembers your cookie choice. <code>tp9_last_enquiry</code> (local storage) helps prevent duplicate or automated form submissions.</li>
          <li><strong>Analytics — <code>_ga</code>, <code>_ga_*</code> (cookies, up to 2 years):</strong> set by Google Analytics <em>only</em> if you click &ldquo;Accept analytics&rdquo;.</li>
        </ul>
        <p>You can change your choice at any time:{' '}
          <button type="button" onClick={openCookieSettings} className="font-bold underline underline-offset-2 hover:no-underline">open cookie settings</button>. You can also block or delete cookies in your browser settings.</p>
      </section>
      <section>
        <h2>7. How long we keep it</h2>
        <p>Enquiries and related emails are kept for as long as needed to respond and, for clients, for the duration of the project plus the period required for legal and accounting records. Enquiries that do not lead to a project are deleted within 24 months. Analytics data is kept according to our Google Analytics retention settings.</p>
      </section>
      <section>
        <h2>8. Your rights</h2>
        <p>Depending on where you live, you may have the right to access, correct or delete your personal data, to object to or restrict certain processing, to withdraw consent, to data portability, and to complain to your data-protection authority. To exercise any of these rights, email {mail}. We will respond within a reasonable time and in line with applicable law.</p>
      </section>
      <section>
        <h2>9. Security</h2>
        <p>The site is served over HTTPS and we limit access to enquiry data. No method of transmission or storage is completely secure, so we cannot guarantee absolute security.</p>
      </section>
      <section>
        <h2>10. Children</h2>
        <p>This website is not directed at children under 18, and we do not knowingly collect their personal data.</p>
      </section>
      <section>
        <h2>11. Third-party links</h2>
        <p>Our site links to other websites (for example, client projects). We are not responsible for their privacy practices; please read their policies.</p>
      </section>
      <section>
        <h2>12. Changes to this policy</h2>
        <p>We may update this policy from time to time. The &ldquo;last updated&rdquo; date above shows when it last changed.</p>
      </section>
      <section>
        <h2>13. Contact</h2>
        <p>Questions or requests: {mail}.</p>
      </section>
    </LegalLayout>
  )
}
