import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-dvh bg-black text-white">
      <Sidebar />
      <div className="w-full flex flex-col gap-10">
        <Navbar />
        <div className="w-5/6 py-6 p-4 xl:p-8">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
