import NavLinks from "@/app/ui/dashboard/static-pages/nav-links";

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