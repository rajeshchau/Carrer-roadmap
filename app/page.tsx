import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-br from-blue-50 to-indigo-100">
      <main className="max-w-4xl w-full text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Career Roadmap LMS
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          AI-powered Personalized Career Roadmap that generates curated Free & Premium learning paths
        </p>
        
        <div className="grid md:grid-cols-2 gap-6 mt-12">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">For Learners</h2>
            <p className="text-gray-600 mb-6">
              Get personalized learning paths based on your skills, goals, and timeline
            </p>
            <div className="space-y-3">
              <Link
                href="/auth/signup"
                className="block w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Sign Up
              </Link>
              <Link
                href="/auth/login"
                className="block w-full bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
              >
                Login
              </Link>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Features</h2>
            <ul className="text-left text-gray-600 space-y-3">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Personalized career roadmaps</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Free & Premium resources</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Progress tracking dashboard</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Skill-based recommendations</span>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
