import Sidebar from "@/components/admin/Sidebar";

export default function AdminLayout({ children }) {
  return (
    <>
      <Sidebar />
      {children}
    </>
  );
}
