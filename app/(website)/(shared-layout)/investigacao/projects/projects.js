import Link from "next/link";

export default function Projects({ projects }) {
  return (
    <ul className="grid grid-cols-1 gap-y-7">
      {projects.map(function(project) {
        return (
          <li 
            key={project._id}
            className="overflow-hidden bg-[#ffffff] rounded shadow-sm shadow-[#ddeedd] border border-[#ddeedd]"
          >
            <div className="flex">
              <img 
                className="shrink-0 w-40"
                src={`http://localhost:3001/${project.thumbnail}`}
              />
              <div className="p-3">
                <Link
                  href={`/investigacao/projects/${project._id}`}
                  className="text-base font-bold pb-3 text-[#178415] hover:underline"
                >
                  {project.title}
                </Link>
                <p style={{ fontSize: 15 }} className="text-[#C7681C] pt-1">
                  Início do Projecto: Fim do Projecto:
                </p>
                <p style={{ fontSize: 15 }} className="text-zinc-500 pt-2">
                  {project.description}
                </p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}