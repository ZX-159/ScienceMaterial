export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-[720px] px-6 lg:px-8 py-12">
        <h1 className="text-[28px] font-semibold">Privacy Policy</h1>
        <div className="mt-6 prose prose-sm max-w-none text-[14px] leading-relaxed text-ink-muted">
          <p>We use essential storage to keep ScienceMaterial working and optional analytics to improve the platform.</p>
          <h3 className="text-ink font-semibold mt-6">Information collected</h3>
          <p>Authentication, progress data (chapter, section, quiz scores), experiment launches, bookmarks. No unnecessary personal data.</p>
          <h3 className="text-ink font-semibold mt-6">Student/minor considerations</h3>
          <p>Platform is intended for students. Privacy and data minimisation are product requirements. No tracking for advertising. Optional analytics only after consent.</p>
          <h3 className="text-ink font-semibold mt-6">Cookies</h3>
          <p>Essential — Always active. Analytics — Optional. Personalisation — Optional. Do not load optional analytics before consent.</p>
        </div>
      </div>
    </div>
  )
}
