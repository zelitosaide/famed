import Form from "./form";

export default async function Page() {
  return (
    <div className="pt-2.5 pr-3 pl-5 pb-5">
      <h1>Formulário de requisição de Consulta de Bioestatística</h1>
      <div className="rounded shadow-sm shadow-[#ddeedd] border border-[#ddeedd] p-8">
        
        <p className="text-zinc-500 mb-5">
          Caro(a) solicitante, Preencha o Formulário de requisição de Consulta de Bioestatística
        </p>

        <Form />

      </div>
    </div>
  );
}