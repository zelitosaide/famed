import { clsx } from 'clsx';
import Link from 'next/link';
import { lusitana } from '@/app/ui/fonts';

interface Breadcrumb {
  label: string;
  href: string;
  active?: boolean;
}

export default function Breadcrumbs({
  breadcrumbs,
}: {
  breadcrumbs: Breadcrumb[];
}) {
  return (
    // <nav aria-label="Breadcrumb" className="mb-6 block">
    <nav aria-label="Breadcrumb" className="mt-4 mb-6 block bg-gray-50 pl-4 pt-1 pb-1 md:mt-8">
      {/* <ol className={clsx(lusitana.className, 'flex text-xl md:text-2xl')}> */}
      <ol className={clsx(lusitana.className, 'flex text-base')}>
        {breadcrumbs.map((breadcrumb, index) => (
          <li
            key={breadcrumb.href}
            aria-current={breadcrumb.active}
            className={clsx(
              breadcrumb.active ? 'text-gray-900' : 'text-gray-500',
            )}
          >
            <Link href={breadcrumb.href}>{breadcrumb.label}</Link>
            {index < breadcrumbs.length - 1 ? (
              <span className="mx-3 inline-block">/</span>
            ) : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}



// Título: Gestão e análise de dados quantitativos (RedCap)
// Objetivo: coleta e gestão de dados de forma segura e padronizada, que permita assegurar a integridade, a reprodutibilidade e a segurança dessas informações?


// Publico alvo: estudante universitário da área da saúde, docente e investigadores Palops.

// Duração: 3 dias (5 horas)


// Dia 30 de novembro (quinta-feira): 14h-16h (hora de Cabo Verde);
// Tema/conteúdo: Criação de Instrumentos no REDCap

 
// Dia 01 de Dezembro (sexta-feira): 18h-19h (hora de Cabo Verde);
// Tema/conteúdo: Coleta de Dados no REDCap


// Dia 07 de Dezembro (quinta-feira): 14h-16h (hora de Cabo Verde).
// Tema/conteúdo: Exportação de Dados do REDCap