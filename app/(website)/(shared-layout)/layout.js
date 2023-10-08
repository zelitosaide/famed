import SideNav from "../components/sidenav/sidenav";

export default function Layout({ children }) {
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