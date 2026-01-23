export default function LegalInformationPage() {
  return (
    <section className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-8 py-16 space-y-10">
        <h1 className="text-4xl font-bold">Legal Information</h1>

        <p className="text-sm text-gray-400 max-w-2xl">
          The following information is provided in accordance with applicable
          legal requirements. This page will be updated with complete and
          accurate details prior to release.
        </p>

        {/* COMPANY */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Company Information</h2>
          <p className="text-sm text-gray-300">
            Studio Name: 8 Slice Games (working title)
            <br />
            Project: 30 Mikes Till Extraction
            <br />
            Address: To be announced
            <br />
            Country: To be announced
          </p>
        </div>

        {/* CONTACT */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Contact</h2>
          <p className="text-sm text-gray-300">
            Email: contact@example.com
            <br />
            Phone: Not available
          </p>
        </div>

        {/* LIABILITY */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Liability Disclaimer</h2>
          <p className="text-sm text-gray-300 max-w-3xl leading-relaxed">
            The contents of this website have been created with the greatest
            possible care. However, we do not guarantee the accuracy,
            completeness, or timeliness of the information provided.
          </p>
        </div>

        {/* COPYRIGHT */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Copyright</h2>
          <p className="text-sm text-gray-300 max-w-3xl leading-relaxed">
            All content, graphics, text, and media on this website are subject to
            copyright law. Unauthorized reproduction, distribution, or use is
            prohibited unless explicitly permitted.
          </p>
        </div>

        {/* THIRD-PARTY */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Third-Party Content</h2>
          <p className="text-sm text-gray-300 max-w-3xl leading-relaxed">
            This website may contain links to third-party websites. We have no
            influence over the content of these sites and therefore accept no
            liability for external content.
          </p>
        </div>
      </div>
    </section>
  )
}
