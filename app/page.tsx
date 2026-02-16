import Link from 'next/link';

const steps = [
  { title: 'Take Quiz', description: 'Answer a short onboarding quiz to define your target career path.' },
  { title: 'Get Roadmap', description: 'Receive a personalized step-by-step plan with curated resources.' },
  { title: 'Track Progress', description: 'Mark completed steps and monitor your growth over time.' },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <section className="bg-gradient-to-b from-indigo-50 to-gray-50">
        <div className="mx-auto max-w-6xl px-6 py-16 text-center">
          <p className="mb-4 inline-flex rounded-full bg-indigo-100 px-4 py-1 text-sm font-semibold text-indigo-700">PathForge LMS</p>
          <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-6xl">Your Personalized Career Roadmap. Built Around You.</h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600">PathForge helps learners discover structured paths with free and premium resources, milestone tracking, and outcome-focused guidance.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/auth/signup" className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white shadow hover:bg-indigo-700">Get Started</Link>
            <Link href="/dashboard" className="rounded-xl border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700 hover:bg-gray-100">View Demo</Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-14">
        <h2 className="mb-8 text-center text-3xl font-bold">How It Works</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {steps.map((step, index) => (
            <div key={step.title} className="rounded-2xl bg-white p-6 shadow-sm">
              <p className="mb-3 text-sm font-semibold text-emerald-600">Step {index + 1}</p>
              <h3 className="mb-2 text-xl font-semibold">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-14">
        <h2 className="mb-6 text-center text-3xl font-bold">Free vs Premium</h2>
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-4">Feature</th><th className="p-4">Free</th><th className="p-4">Premium</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Roadmap generation', '1 roadmap', 'Unlimited roadmaps'],
                ['Resources', 'Community-curated', 'Premium curated + mentors'],
                ['Analytics', 'Basic progress', 'Detailed timeline + insights'],
              ].map((row) => (
                <tr key={row[0]} className="border-t border-gray-100">
                  {row.map((col) => <td key={col} className="p-4">{col}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-4 px-6 py-14 md:grid-cols-3">
        {['“PathForge gave me clarity in 2 weeks.”', '“The roadmap helped me switch careers.”', '“The progress view kept me accountable.”'].map((quote) => (
          <blockquote key={quote} className="rounded-2xl bg-white p-6 text-gray-700 shadow-sm">{quote}</blockquote>
        ))}
      </section>

      <section className="mx-auto max-w-6xl px-6 py-14">
        <div className="rounded-2xl bg-white p-8 shadow-sm">
          <h2 className="mb-4 text-3xl font-bold">Pricing</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border p-5">
              <h3 className="text-xl font-semibold">Free</h3>
              <p className="mt-2 text-3xl font-bold">$0</p>
            </div>
            <div className="rounded-xl border-2 border-indigo-600 p-5">
              <h3 className="text-xl font-semibold">Premium</h3>
              <p className="mt-2 text-3xl font-bold">$19/mo</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-gray-200 px-6 py-8 text-center text-sm text-gray-500">© {new Date().getFullYear()} PathForge. All rights reserved.</footer>
    </div>
  );
}
