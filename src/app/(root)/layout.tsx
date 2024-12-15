import Navbar from "@/components/Navbar";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col">
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
