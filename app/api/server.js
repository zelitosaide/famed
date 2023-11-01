export const baseURL = "https://api.med.uem.mz";

export async function getNewsById(id) {
  const res = await fetch(`${baseURL}/news/${id}`, {
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

export async function getPublications() {
  const res = await fetch(`${baseURL}/publications`, {
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

export async function getProjectById(id) {
  const res = await fetch(`${baseURL}/projects/${id}`, {
    cache: "no-cache"
  });
  return res.json();
}

export async function getCourseById(id) {
  const res = await fetch(`${baseURL}/courses/${id}`, {
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

export async function getLinks(category) {
  const res = await fetch(`${baseURL}/links/category/${category}`, {
    cache: "no-cache"
  });
  return res.json();
}

export async function getLinkByTitle(title) {
  const res = await fetch(`${baseURL}/links/title/${title}`, {
    cache: "no-cache"
  });
  return res.json();
}

export async function getContent(segment) {
  const res = await fetch(`${baseURL}/contents/segment/${segment}`, {
    cache: "no-cache"
  });

  return res.json();
}

export async function updateContent(id, content) {
  const res = await fetch(`${baseURL}/contents/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ content }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      "Access-Control-Allow-Origin": "*"
    },
  });
  
  // Ola
  return res.json();
}