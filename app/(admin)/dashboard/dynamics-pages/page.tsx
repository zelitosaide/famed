import { Metadata } from "next";
 
export const metadata: Metadata = {
  title: "Dynamics Pages",
};
 
export default async function Page() {
  return (
    <p style={{ marginTop: 16 }} className="bg-gray-50 pl-4 pt-1 pb-1">
      Navigue usando o menu para editar as páginas dinámicas.
    </p>
  );
}