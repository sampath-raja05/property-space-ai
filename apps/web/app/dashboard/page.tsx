import { auth } from "@/auth";

export default async function DashboardPage() {
  const session = await auth();
  return (
    <main className="mx-auto max-w-4xl p-6">
      <h1 className="text-2xl font-bold">Portfolio Dashboard</h1>
      <p className="mt-2 text-sm text-slate-600">
        Logged in as: {session?.user?.email ?? "Anonymous"}
      </p>
      <p className="mt-2 text-sm text-slate-600">
        Role: {(session?.user as { role?: string } | undefined)?.role ?? "unknown"}
      </p>
    </main>
  );
}
