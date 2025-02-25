import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">App Directory</h1>
        <nav className="space-y-4">
          <Link
            href="/mdmu"
            className="block p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
          >
            /mdmu
          </Link>
          <Link
            href="/jobbriz"
            className="block p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
          >
            /jobbriz
          </Link>
          <Link
            href="/qhsef"
            className="block p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
          >
            /qhsef
          </Link>
          <Link
            href="/business-clinic"
            className="block p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
          >
            /business-clinic
          </Link>
          <Link
            href="/b2b"
            className="block p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
          >
            /b2b
          </Link>
        </nav>
      </div>
    </div>
  );
}
