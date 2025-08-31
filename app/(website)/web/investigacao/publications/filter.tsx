"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function PublicationFilter() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    // validate year format (4 digits)
    const yearRegex = /^\d{4}$/;
    if (term && !yearRegex.test(term)) {
      return;
    }

    if (term) {
      params.set("year", term);
    } else {
      params.delete("year");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div>
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block rounded-md border border-gray-200 py-[9px] pl-2 text-sm outline-2 placeholder:text-gray-500 "
        placeholder="Filtrar por ano... (Ex: 2023)"
        style={{ width: 220 }}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get("year")?.toString()}
      />
    </div>
  );
}
