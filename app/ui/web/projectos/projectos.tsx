import { formatDateToLocal } from "@/app/lib/utils";
import { baseURL } from "@/app/lib/web/data";
import Image from "next/image";
import Link from "next/link";

export default function Projectos({ projectos }: any) {
  return (
    <ul className="grid grid-cols-1 gap-y-7">
      {projectos.map(function(project: any) {
        return (
          <li 
            key={project._id}
            className="overflow-hidden bg-[#ffffff] rounded shadow-sm shadow-[#ddeedd] border border-[#ddeedd]"
          >
            <div className="flex">
              {/* <Image */}
              <img
                className="shrink-0 w-40"
                style={{ objectFit: "contain" }} 
                src={`${baseURL}/${project.thumbnail}`}
                width={100}
                height={100}
                alt=""
              />
              <div className="p-3">
                <Link
                  href={`/web/investigacao/projects/${project._id}`}
                  style={{ textDecorationThickness: 1.5 }}
                  className="text-base font-bold pb-3 text-[#178415] hover:underline"
                >
                  {project.title}
                </Link>
                <p style={{ fontSize: 15 }} className="text-[#C7681C] pt-1">
                  Início do Projecto:{" "}{formatDateToLocal(project.projectStartDate)}{" | "}Fim do Projecto:{" "}{formatDateToLocal(project.projectEndDate)}
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