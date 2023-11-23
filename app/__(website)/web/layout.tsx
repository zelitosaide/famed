import SideNav from "@/app/ui/web/sidenav";

export default async function Layout({ children }: any) {
  return (
    <div className="pl-28 pr-28 flex pt-8 pb-8 gap-5">
      <div className="shrink-0 w-72">
        <SideNav />
      </div>
      <div className="grow">
        {children}
      </div>
    </div>
  );
}