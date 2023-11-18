import { AcademicCapIcon } from "@heroicons/react/24/outline";
import { lusitana } from "@/app/ui/fonts";

export default function AcmeLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      <p className="text-[44px]">famed</p>
      <AcademicCapIcon className="h-12 w-12" />
    </div>
  );
}
