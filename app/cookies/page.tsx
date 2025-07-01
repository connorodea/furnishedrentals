import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function CookiesPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container px-4 mx-auto py-12">
        <div className="max-w-4xl mx-auto prose prose-lg">
          <h1>Cookie Policy</h1>
          <p className="text-gray-600">Last updated: January 1, 2024</p>

          <h2>What Are Cookies</h2>
          <p>
            Cookies are small text files that are stored on your computer or mobile device when you visit our website.
            They help us provide you with a better experience by remembering your preferences and improving our
            services.
          </p>

          <h2>How We Use Cookies</h2>
          <p>We use cookies for several purposes:</p>
          <ul>
            <li>
              <strong>Essential Cookies:</strong> Required for the website to function properly
            </li>
            <li>
              <strong>Performance Cookies:</strong> Help us understand how visitors interact with our website
            </li>
            <li>
              <strong>Functionality Cookies:</strong> Remember your preferences and settings
            </li>
            <li>
              <strong>Marketing Cookies:</strong> Used to deliver relevant advertisements
            </li>
          </ul>

          <h2>Types of Cookies We Use</h2>

          <h3>Essential Cookies</h3>
          <p>
            These cookies are necessary for the website to function and cannot be switched off. They are usually set in
            response to actions made by you, such as setting your privacy preferences, logging in, or filling in forms.
          </p>

          <h3>Analytics Cookies</h3>
          <p>
            We use Google Analytics to collect information about how visitors use our site. These cookies help us
            improve our website by understanding which pages are most popular and how visitors navigate our site.
          </p>

          <h3>Marketing Cookies</h3>
          <p>
            These cookies track your browsing habits to enable us to show advertising which is more likely to be of
            interest to you. They may be used to build a profile of your interests and show you relevant ads on other
            sites.
          </p>

          <h2>Managing Cookies</h2>
          <p>
            You can control and manage cookies in various ways. Please note that removing or blocking cookies can impact
            your user experience and parts of our website may no longer be fully accessible.
          </p>

          <h3>Browser Settings</h3>
          <p>
            Most browsers allow you to view, manage, delete, and block cookies for a website. Be aware that if you
            delete all cookies, any preferences you have set will be lost.
          </p>

          <h3>Opt-Out Tools</h3>
          <p>
            You can opt out of Google Analytics tracking by visiting the Google Analytics opt-out page and installing
            the browser add-on.
          </p>

          <h2>Third-Party Cookies</h2>
          <p>
            Some cookies on our site are set by third-party services. We have no control over these cookies and they are
            governed by the privacy policies of the third parties.
          </p>

          <h2>Updates to This Policy</h2>
          <p>
            We may update this Cookie Policy from time to time. Any changes will be posted on this page with an updated
            revision date.
          </p>

          <h2>Contact Us</h2>
          <p>If you have any questions about our use of cookies, please contact us at privacy@furnishedstay.com.</p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
