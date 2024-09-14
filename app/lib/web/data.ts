export const baseURL = "https://api.med.uem.mz";
// export const baseURL = "http://localhost:3001";

export async function getLinks(category: string) {
  const res = await fetch(`${baseURL}/links/category/${category}`, {
    cache: "no-cache"
  });
  return res.json();
}

// https://api.med.uem.mz/links/category/cabecalho

export async function getContent(segment: string) {
  const res = await fetch(`${baseURL}/contents/segment/${segment}`, {
    cache: "no-cache"
  });

  return res.json();
}

export async function getLinkByTitle(title: string) {
  const res = await fetch(`${baseURL}/links/title/${title}`, {
    cache: "no-cache"
  });
  return res.json();
}












/**
 * All about NEWS
 * @zelito_saide
 */

export async function getNews(query: string, currentPage: number, limit?: number) {
  const res = await fetch(`${baseURL}/news?query=${query}&page=${currentPage}&limit=${limit}`, {
    cache: "no-cache"
  });
  return res.json();
}

export async function createNews(formData: FormData) {
  const res = await fetch(`${baseURL}/news`, {
    method: "POST",
    body: formData,
  });
  return res.json();
}

export async function updateNews(id: string, formData: FormData) {
  const res = await fetch(`${baseURL}/news/${id}`, {
    method: "PATCH",
    body: formData,
    cache: "no-cache"
  });
  return res.json();
}

export async function getNewsById(id: string) {
  const res = await fetch(`${baseURL}/news/${id}`, {
    cache: "no-cache"
  });
  return res.json();
}

export async function removeNewsById(id: string) {
  const res = await fetch(`${baseURL}/news/${id}`, {
    method: "DELETE",
    cache: "no-cache",
  });
  return res.json();
}

export async function fetchNewsPages(query: string) {
  try {
    const res = await fetch(`${baseURL}/news/news-pages?query=${query}`, {
      cache: "no-cache"
    });
    return res.json();
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of news.");
  }
}


/**
 * All about PROJECTS
 * @zelito_saide
 */

export async function getProjects(query: string, currentPage: number) {
  const res = await fetch(`${baseURL}/projects?query=${query}&page=${currentPage}`, {
    cache: "no-cache"
  });
  return res.json();
}

export async function fetchProjectsPages(query: string) {
  try {
    const res = await fetch(`${baseURL}/projects/project-pages?query=${query}`, {
      cache: "no-cache"
    });
    return res.json();
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of projects.");
  }
}

export async function createProject(formData: FormData) {
  const res = await fetch(`${baseURL}/projects`, {
    method: "POST",
    body: formData,
  });
  return res.json();
}

export async function removeProject(id: string) {
  const res = await fetch(`${baseURL}/projects/${id}`, {
    method: "DELETE",
    cache: "no-cache",
  });
  return res.json();
}

export async function updateProject(id: string, formData: FormData) {
  const res = await fetch(`${baseURL}/projects/${id}`, {
    method: "PATCH",
    body: formData,
    cache: "no-cache"
  });
  return res.json();
}

export async function getProjectById(id: string) {
  const res = await fetch(`${baseURL}/projects/${id}`, {
    cache: "no-cache"
  });
  return res.json();
}




/**
 * All about PUBLICATIONS
 * @zelito_saide
 */

export async function getPublications(query: string, currentPage: number, limit?: number) {
  const res = await fetch(`${baseURL}/publications?query=${query}&page=${currentPage}&limit=${limit}`, {
    cache: "no-cache"
  });
  return res.json();
}

export async function fetchPublicationsPages(query: string) {
  try {
    const res = await fetch(`${baseURL}/publications/publication-pages?query=${query}`, {
      cache: "no-cache"
    });
    return res.json();
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of publications.");
  }
}

export async function createPublication(data: any) {
  const res = await fetch(`${baseURL}/publications`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  return res.json();
}

export async function updatePublication(id: string, data: any) {
  const res = await fetch(`${baseURL}/publications/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
    cache: "no-cache",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  return res.json();
}

export async function getPublicationById(id: string) {
  const res = await fetch(`${baseURL}/publications/${id}`, {
    cache: "no-cache"
  });
  return res.json();
}

export async function removePublicationById(id: string) {
  const res = await fetch(`${baseURL}/publications/${id}`, {
    method: "DELETE",
    cache: "no-cache",
  });
  return res.json();
}



/**
 * All about DEPARTMENTS
 * @zelito_saide
 */

export async function removeDepartmentById(id: string) {
  const res = await fetch(`${baseURL}/departments/${id}`, {
    method: "DELETE",
    cache: "no-cache",
  });
  return res.json();
}

export async function getDepartments(query: string, currentPage: number, limit?: number) {
  const res = await fetch(`${baseURL}/departments?query=${query}&page=${currentPage}&limit=${limit}`, {
    cache: "no-cache"
  });
  return res.json();
}

export async function createDepartment(formData: FormData) {
  const res = await fetch(`${baseURL}/departments`, {
    method: "POST",
    body: formData,
  });
  return res.json();
}

export async function fetchDepartmentsPages(query: string) {
  try {
    const res = await fetch(`${baseURL}/departments/department-pages?query=${query}`, {
      cache: "no-cache"
    });
    return res.json();
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of departments.");
  }
}

export async function getDepartmentById(id: string) {
  const res = await fetch(`${baseURL}/departments/${id}`, {
    cache: "no-cache"
  });
  return res.json();
}


export async function updateDepartment(id: string, formData: FormData) {
  const res = await fetch(`${baseURL}/departments/${id}`, {
    method: "PATCH",
    body: formData,
    cache: "no-cache"
  });
  return res.json();
}


/**
 * All about COURSES
 * @zelito_saide
 */

export async function removeCourseById(id: string) {
  const res = await fetch(`${baseURL}/courses/${id}`, {
    method: "DELETE",
    cache: "no-cache",
  });
  return res.json();
}

export async function getCourses(query: string, currentPage: number) {
  const res = await fetch(`${baseURL}/courses?query=${query}&page=${currentPage}`, {
    cache: "no-cache"
  });
  return res.json();
}

export async function fetchCoursesPages(query: string) {
  try {
    const res = await fetch(`${baseURL}/courses/course-pages?query=${query}`, {
      cache: "no-cache"
    });
    return res.json();
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of courses.");
  }
}

export async function createCourse(data: any) {
  const res = await fetch(`${baseURL}/courses`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  return res.json();
}

export async function getCourseById(id: string) {
  const res = await fetch(`${baseURL}/courses/${id}`, {
    cache: "no-cache"
  });
  return res.json();
}

export async function updateCourse(id: string, data: any) {
  const res = await fetch(`${baseURL}/courses/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
    cache: "no-cache",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  return res.json();
}















































export async function updateContent(id: string, content: any) {
  const res = await fetch(`${baseURL}/contents/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ content }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      "Access-Control-Allow-Origin": "*"
    },
  });
  return res.json();
}