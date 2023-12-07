import NavLinks from "@/app/ui/invoices/nav-links";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div>
        <NavLinks />
      </div>
      {children}
    </div>
  );
}