import Sidebar from "./Sidebar";
import TopBar from "./TopBar";

export default function AppShell({ context, children }) {
  return (
    <div className="relative z-10 min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-[1800px] gap-6">
        <Sidebar />
        <main className="min-w-0 flex-1">
          <TopBar context={context} />
          {children}
        </main>
      </div>
    </div>
  );
}
