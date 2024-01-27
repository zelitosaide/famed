"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { signIn } from "@/auth";
import { 
  createCourse,
  createDepartment, 
  createNews, 
  createProject, 
  createPublication, 
  removeCourseById, 
  removeDepartmentById, 
  removeNewsById, 
  removeProject, 
  removePublicationById, 
  updateCourse, 
  updateDepartment, 
  updateNews, 
  updateProject, 
  updatePublication 
} from "./web/data";

/**
 * All about NEWS
 * @zelito_saide
 */

const NewsSchema = z.object({
  _id: z.string(),
  title: z.string().min(1, "O título é obrigatório."),
  description: z.string().min(1, "A descrição é obrigatória."),
  imageSize: z.number().gt(0, { message: "A imagem é obrigatória." }),
  department: z.string({ invalid_type_error: "O departamento é obrigatório." }).min(1, "O departamento é obrigatório."),
  content: z.string().min(1, "O conteudo é obrigatório."),
  createdAt: z.string().min(1, "A data de publicação é obrigatória."),
  updatedAt: z.string(),
});

const CreateNews = NewsSchema.omit({ _id: true, createdAt: true, updatedAt: true });

type NewsState = {
  errors?: {
    title?: string[];
    description?: string[];
    imageSize?: string[];
    createdAt?: string[],
    department?: string[];
    content?: string[];
  };
  message?: string | null;
}
 
export async function createNewsAction(prevState: NewsState, formData: FormData): Promise<NewsState> {
  const validatedFields = CreateNews.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    imageSize: (formData.get("image") as File).size,
    department: formData.get("department"),
    content: formData.get("content"),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Campos não preenchidos. Falha ao criar notícias.",
    };
  }

  // Insert data into the database
  try {
    const data = await createNews(formData);
    if (data.statusCode === 500) {
      return {
        message: "Erro de banco de dados: Falha ao criar notícias!!!",
      };
    }
  } catch (error) {
    return {
      message: "Erro de banco de dados: Falha ao criar notícias.",
    };
  }

  revalidatePath("/dashboard/dynamics-pages/news");
  redirect("/dashboard/dynamics-pages/news");
}

const UpdateNews = NewsSchema.omit({ _id: true, updatedAt: true, imageSize: true });

export async function updateNewsAction(
  id: string,
  prevState: NewsState,
  formData: FormData,
) { 
  const validatedFields = UpdateNews.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    department: formData.get("department"),
    content: formData.get("content"),
    createdAt: formData.get("createdAt"),
  });

   // If form validation fails, return errors early. Otherwise, continue.
   if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Campos não preenchidos. Falha ao atualizar a notícia.",
    };
  }

  try {
    const data = await updateNews(id, formData);
    if (data.statusCode === 500) {
      return {
        message: "Erro de banco de dados: Falha ao atualizar a notícia!!!",
      };
    }
  } catch (error) {
    return {
      message: "Erro de banco de dados: Falha ao atualizar a notícia.",
    };
  }
 
  revalidatePath("/dashboard/dynamics-pages/news");
  redirect("/dashboard/dynamics-pages/news");
}

export async function deleteNewsAction(id: string) {
  try {
    await removeNewsById(id);
    revalidatePath("/dashboard/dynamics-pages/news");
    return { message: "Deleted News." };
  } catch (error) {
    return { message: "Database Error: Failed to Delete News." };
  }
}



/**
 * All about PROJECTS
 * @zelito_saide
 */

const ProjectSchema = z.object({
  _id: z.string(),
  title: z.string().min(1, "O título é obrigatório."),
  description: z.string().min(1, "A descrição é obrigatória."),
  thumbnailSize: z.number().gt(0, { message: "A thumbnail é obrigatória." }),
  department: z.string({ invalid_type_error: "O departamento é obrigatório." }).min(1, "O departamento é obrigatório."),
  content: z.string().min(1, "O conteudo é obrigatório."),
  regNumBioethic: z.string().min(1, "O Nº de Aprovação Ética é obrigatório."),
  approvalDate: z.string().min(1, "A data de Aprovação Ética é obrigatória."),
  projectStartDate: z.string().min(1, "A data de Início do Projecto é obrigatória."),
  projectEndDate: z.string().min(1, "A data de Fim do Projecto é obrigatória."),
  createdAt: z.string().min(1, "A data de publicação é obrigatória."),
  updatedAt: z.string(),
});

const CreateProject = ProjectSchema.omit({ _id: true, createdAt: true, updatedAt: true });

type ProjectState = {
  errors?: {
    title?: string[];
    description?: string[];
    thumbnailSize?: string[];
    department?: string[];
    content?: string[];
    regNumBioethic?: string[];
    approvalDate?: string[];
    projectEndDate?: string[];
    projectStartDate?: string[];
    createdAt?: string[],
  };
  message?: string | null;
}

export async function createProjectAction(prevState: ProjectState, formData: FormData): Promise<ProjectState> {
  const validatedFields = CreateProject.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    thumbnailSize: (formData.get("thumbnail") as File).size,
    department: formData.get("department"),
    content: formData.get("content"),
    regNumBioethic: formData.get("regNumBioethic"),
    approvalDate: formData.get("approvalDate"),
    projectStartDate: formData.get("projectStartDate"),
    projectEndDate: formData.get("projectEndDate"),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Campos não preenchidos. Falha ao criar projecto.",
    };
  }

  try {
    const data = await createProject(formData);
    if (data.statusCode === 500) {
      return {
        message: "Erro de banco de dados: Falha ao criar projecto!!!",
      };
    }
  } catch (error) {
    return {
      message: "Database Error: Failed to Create Project.",
    };
  }
  revalidatePath("/dashboard/dynamics-pages/projects");
  redirect("/dashboard/dynamics-pages/projects");
}

export async function deleteProjectAction(id: string) {
  try {
    await removeProject(id);
    revalidatePath("/dashboard/dynamics-pages/projects");
    return { message: "Deleted Project." };
  } catch (error) {
    return { message: "Database Error: Failed to Delete Project." };
  }
}

const UpdateProject = ProjectSchema.omit({ _id: true, createdAt: true, updatedAt: true, thumbnailSize: true });

export async function updateProjectAction(
  id: string,
  prevState: ProjectState,
  formData: FormData,
) {
  const validatedFields = UpdateProject.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    department: formData.get("department"),
    content: formData.get("content"),
    regNumBioethic: formData.get("regNumBioethic"),
    approvalDate: formData.get("approvalDate"),
    projectStartDate: formData.get("projectStartDate"),
    projectEndDate: formData.get("projectEndDate"),
  });

   // If form validation fails, return errors early. Otherwise, continue.
   if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Campos não preenchidos. Falha ao atualizar o projecto.",
    };
  }

  try {
    const data = await updateProject(id, formData);
    if (data.statusCode === 500) {
      return {
        message: "Erro de banco de dados: Falha ao atualizar o projecto!!!",
      };
    }
  } catch (error) {
    console.log(error);
    return { message: "Erro de banco de dados: Falha ao atualizar o projecto." };
  }
 
  revalidatePath("/dashboard/dynamics-pages/projects");
  redirect("/dashboard/dynamics-pages/projects");
}



/**
 * All about PUBLICATIONS
 * @zelito_saide
 */

const PublicationSchema = z.object({
  _id: z.string(),
  title: z.string().min(1, "O título é obrigatório."),
  pmid: z.string().min(1, "O PMID é obrigatório."),
  department: z.string({ invalid_type_error: "O departamento é obrigatório." }).min(1, "O departamento é obrigatório."),
  authors: z.string().min(1, "Os autores são obrigatórios."),
  review: z.string().min(1, "A revista é obrigatória."),
  url: z.string().url("O link é obrigatório."),
  publicationDate: z.string().min(1, "A data de Publicação é obrigatória."),
  createdAt: z.string().min(1, "A data de publicação é obrigatória."),
  updatedAt: z.string(),
});

const CreatePublication = PublicationSchema.omit({ _id: true, createdAt: true, updatedAt: true });

type PublicationState = {
  errors?: {
    title?: string[];
    pmid?: string[];
    department?: string[];
    authors?: string[];
    review?: string[];
    url?: string[];
    publicationDate?: string[];
  };
  message?: string | null;
}

export async function createPublicationAction(prevState: PublicationState, formData: FormData): Promise<PublicationState> {
  const validatedFields = CreatePublication.safeParse({
    title: formData.get("title"),
    pmid: formData.get("pmid"),
    department: formData.get("department"),
    authors: formData.get("authors"),
    review: formData.get("review"),
    url: formData.get("url"),
    publicationDate: formData.get("publicationDate"),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Campos não preenchidos. Falha ao criar publicação.",
    };
  }

  // Prepare data for insertion into the database
  const { authors } = validatedFields.data;
  const authorsArray = authors.split("#");
  const publication = { ...validatedFields.data, authors: authorsArray };

  try {
    const data = await createPublication(publication);
    if (data.statusCode === 500) {
      return {
        message: "Erro de banco de dados: Falha ao criar publicação!!!",
      };
    }
  } catch (error) {
    return {
      message: "Erro de banco de dados: Falha ao criar publicação.",
    };
  }
  revalidatePath("/dashboard/dynamics-pages/publications");
  redirect("/dashboard/dynamics-pages/publications");
}

const UpdatePublication = PublicationSchema.omit({ _id: true, createdAt: true, updatedAt: true });

export async function updatePublicationAction(
  id: string,
  prevState: PublicationState,
  formData: FormData,
) {
  const validatedFields = UpdatePublication.safeParse({
    title: formData.get("title"),
    pmid: formData.get("pmid"),
    department: formData.get("department"),
    authors: formData.get("authors"),
    review: formData.get("review"),
    url: formData.get("url"),
    publicationDate: formData.get("publicationDate"),
  });
   
  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Campos não preenchidos. Falha ao atualizar a publicação.",
    };
  }

  // Prepare data for insertion into the database
  const { authors } = validatedFields.data;
  const authorsArray = authors.split("#");
  const publication = { ...validatedFields.data, authors: authorsArray };

  try {
    const data = await updatePublication(id, publication);
    if (data.statusCode === 500) {
      return {
        message: "Erro de banco de dados: Falha ao atualizar a publicação!!!",
      };
    }
  } catch (error) {
    console.log(error);
    return { message: "Erro de banco de dados: Falha ao atualizar a publicação." };
  }
 
  revalidatePath("/dashboard/dynamics-pages/publications");
  redirect("/dashboard/dynamics-pages/publications");
}

export async function deletePublicationAction(id: string) {
  try {
    await removePublicationById(id);
    revalidatePath("/dashboard/dynamics-pages/publications");
    return { message: "Deleted Publication." };
  } catch (error) {
    return { message: "Database Error: Failed to Delete Publication." };
  }
}


/**
 * All about DEPARTMENT
 * @zelito_saide
 */

export async function deleteDepartmentAction(id: string) {
  try {
    await removeDepartmentById(id);
    revalidatePath("/dashboard/dynamics-pages/departments");
    return { message: "Deleted Department." };
  } catch (error) {
    return { message: "Database Error: Failed to Delete Department." };
  }
}

const DepartmentSchema = z.object({
  _id: z.string(),
  title: z.string().min(1, "O título é obrigatório."),
  description: z.string().min(1, "A descrição é obrigatória."),
  // thumbnailSize: z.number().gt(0, { message: "A thumbnail é obrigatória." }),
  content: z.string().min(1, "O conteudo é obrigatório."),
  createdAt: z.string().min(1, "A data de publicação é obrigatória."),
  updatedAt: z.string(),
});

const CreateDepartment = DepartmentSchema.omit({ _id: true, createdAt: true, updatedAt: true });

type DepartmentState = {
  errors?: {
    title?: string[];
    description?: string[];
    // thumbnailSize?: string[];
    content?: string[];
  };
  message?: string | null;
}
 
export async function createDepartmentAction(prevState: DepartmentState, formData: FormData): Promise<DepartmentState> {
  const validatedFields = CreateDepartment.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    // thumbnailSize: (formData.get("thumbnail") as File).size,
    content: formData.get("content"),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Campos não preenchidos. Falha ao criar departamento.",
    };
  }

  // Insert data into the database
  try {
    const data = await createDepartment(formData);
    if (data.statusCode === 500) {
      return {
        message: "Erro de banco de dados: Falha ao criar departamento!!!",
      };
    }
  } catch (error) {
    return {
      message: "Erro de banco de dados: Falha ao criar departamento.",
    };
  }

  revalidatePath("/dashboard/dynamics-pages/departments");
  redirect("/dashboard/dynamics-pages/departments");
}


const UpdateDepartment = DepartmentSchema.omit({ _id: true, updatedAt: true, createdAt: true });

export async function updateDepartmentAction(
  id: string,
  prevState: DepartmentState,
  formData: FormData,
) { 
  const validatedFields = UpdateDepartment.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    // thumbnailSize: (formData.get("thumbnail") as File).size,
    content: formData.get("content"),
  });

   // If form validation fails, return errors early. Otherwise, continue.
   if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Campos não preenchidos. Falha ao atualizar o departamento.",
    };
  }

  try {
    const data = await updateDepartment(id, formData);
    if (data.statusCode === 500) {
      return {
        message: "Erro de banco de dados: Falha ao atualizar o departamento!!!",
      };
    }
  } catch (error) {
    return {
      message: "Erro de banco de dados: Falha ao atualizar o departamento.",
    };
  }
 
  revalidatePath("/dashboard/dynamics-pages/departments");
  redirect("/dashboard/dynamics-pages/departments");
}



/**
 * All about COURSES
 * @zelito_saide
 */

export async function deleteCourseAction(id: string) {
  try {
    await removeCourseById(id);
    revalidatePath("/dashboard/dynamics-pages/courses");
    return { message: "Deleted Course." };
  } catch (error) {
    return { message: "Database Error: Failed to Delete Course." };
  }
}

const CourseSchema = z.object({
  _id: z.string(),
  title: z.string().min(1, "O título é obrigatório."),
  description: z.string().min(1, "A descrição é obrigatória."),
  duration: z.string().min(1, "A duração é obrigatória."),
  playlistId: z.string().min(1, "A playlistId é obrigatória."),
  youtubeApiKey: z.string().min(1, "A youtubeApiKey é obrigatória."),
  content: z.string().min(1, "O conteudo é obrigatório."),
  createdAt: z.string().min(1, "A data de publicação é obrigatória."),
  updatedAt: z.string(),
});

const CreateCourse = CourseSchema.omit({ _id: true, createdAt: true, updatedAt: true });

type CourseState = {
  errors?: {
    title?: string[];
    description?: string[];
    duration?: string[];
    playlistId?: string[];
    youtubeApiKey?: string[];
    content?: string[];
  };
  message?: string | null;
}
 
export async function createCourseAction(prevState: CourseState, formData: FormData): Promise<CourseState> {
  const validatedFields = CreateCourse.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    duration: formData.get("duration"),
    playlistId: formData.get("playlistId"),
    youtubeApiKey: formData.get("youtubeApiKey"),
    content: formData.get("content"),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Campos não preenchidos. Falha ao criar curso.",
    };
  }

  // Insert data into the database
  try {
    const data = await createCourse(Object.fromEntries(formData));
    if (data.statusCode === 500) {
      return {
        message: "Erro de banco de dados: Falha ao criar curso!!!",
      };
    }
  } catch (error) {
    return {
      message: "Erro de banco de dados: Falha ao criar curso.",
    };
  }

  revalidatePath("/dashboard/dynamics-pages/courses");
  redirect("/dashboard/dynamics-pages/courses");
}

const UpdateCourse = CourseSchema.omit({ _id: true, createdAt: true, updatedAt: true });

export async function updateCourseAction(
  id: string,
  prevState: CourseState,
  formData: FormData,
) {
  const validatedFields = UpdateCourse.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    duration: formData.get("duration"),
    playlistId: formData.get("playlistId"),
    youtubeApiKey: formData.get("youtubeApiKey"),
    content: formData.get("content"),
  });
   
  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Campos não preenchidos. Falha ao atualizar o curso.",
    };
  }

  try {
    const data = await updateCourse(id, Object.fromEntries(formData));
    if (data.statusCode === 500) {
      return {
        message: "Erro de banco de dados: Falha ao atualizar curso!!!",
      };
    }
  } catch (error) {
    console.log(error);
    return { message: "Erro de banco de dados: Falha ao atualizar o curso." };
  }
 
  revalidatePath("/dashboard/dynamics-pages/courses");
  redirect("/dashboard/dynamics-pages/courses");
}



































































export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn("credentials", Object.fromEntries(formData));
  } catch (error) {
    if ((error as Error).message.includes("CredentialsSignin")) {
      return "CredentialSignin";
    }
    throw error;
  }
}