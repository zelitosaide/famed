export const baseURL = "https://api.med.uem.mz";

export async function getLinks(category: string) {
  const res = await fetch(`${baseURL}/links/category/${category}`, {
    cache: "no-cache"
  });
  return res.json();
}

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

export async function getCourses() {
  const res = await fetch(`${baseURL}/courses`, {
    cache: "no-cache"
  });
  return res.json();
}

export async function getCourseById(id: string) {
  const res = await fetch(`${baseURL}/courses/${id}`, {
    cache: "no-cache"
  });
  return res.json();
}

export async function getProjects() {
  const res = await fetch(`${baseURL}/projects`, {
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

export async function getPublications() {
  const res = await fetch(`${baseURL}/publications`, {
    cache: "no-cache"
  });
  return res.json();
}

export async function getNews() {
  const res = await fetch(`${baseURL}/news`, {
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