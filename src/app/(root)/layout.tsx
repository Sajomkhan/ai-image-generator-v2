import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-dvh bg-black text-white">
      <div className="w-1/6 min-h-dvh bg-gray-900 border-r-4 border-gray-600">
        <Sidebar />
      </div>
      <div className="w-full flex flex-col gap-10">
        <Navbar />
        <div className="w-full px-8 pb-10">
          <div className="mx-auto w-full">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
