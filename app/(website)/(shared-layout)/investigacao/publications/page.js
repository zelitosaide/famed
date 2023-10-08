import { getPublications } from "@/app/api/server";
import Publications from "./publications";

export default async function Page() {
  const resource = await getPublications();
  
  return (
    <div className="pt-2.5 pr-3 pl-5 pb-5">
      <h1>Publicações da Faculdade</h1>

      <Publications publications={resource} />

    </div>
  );
}