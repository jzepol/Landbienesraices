import { auth } from "@/lib/auth";
import SessionProvider from "@/components/providers/SessionProvider";
import DashboardShell from "@/components/dashboard/DashboardShell";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <DashboardShell userName={session?.user?.name}>
        {children}
      </DashboardShell>
    </SessionProvider>
  );
}