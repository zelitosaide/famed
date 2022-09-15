export const sidebarItems = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none" viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        style={{
          width: '1.4rem',
          color: '#9FC49E'
        }}
      >
        <path
          strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        />
      </svg>
    ),
  },
  {
    name: 'Usuários',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none" viewBox="0 0 24 24" stroke="currentColor"
        strokeWidth={2}
        style={{
          width: '1.4rem',
          color: '#9FC49E'
        }}
      >
        <path
          strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
    ),
    subMenu: [
      { name: 'Todos Usuários', path: '/dashboard/users' },
      { name: 'Criar Usuário', path: '/dashboard/users/create' },
    ],
  },
  {
    name: 'Projectos',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none" viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        style={{
          width: '1.4rem',
          color: '#9FC49E'
        }}
      >
        <path
          strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
        />
      </svg>
    ),
    subMenu: [
      { name: 'Todos Projectos', path: '/dashboard/projects' },
      { name: 'Criar Projecto', path: '/dashboard/projects/create' },
    ],
  },
  {
    name: 'Notícias',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none" viewBox="0 0 24 24"
        stroke="currentColor" strokeWidth={2}
        style={{
          width: '1.4rem',
          color: '#9FC49E'
        }}
      >
        <path
          strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    ),
    subMenu: [
      { name: 'Todas Notícias', path: '/dashboard/news' },
      { name: 'Criar Notícia', path: '/dashboard/news/create' },
    ],
  },
  {
    name: 'Publicações',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg"
        fill="none" viewBox="0 0 24 24"
        stroke="currentColor" strokeWidth={2}
        style={{
          width: '1.4rem',
          color: '#9FC49E'
        }}
      >
        <path
          strokeLinecap="round" strokeLinejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
        />
      </svg>
    ),
    subMenu: [
      { name: 'Todas Publicações', path: '/dashboard/publications' },
      { name: 'Criar Publicação', path: '/dashboard/publications/create' },
    ],
  },
  {
    name: 'Curriculums',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg"
        fill="none" viewBox="0 0 24 24"
        stroke="currentColor" strokeWidth={2}
        style={{
          width: '1.4rem',
          color: '#9FC49E'
        }}
      >
        <path
          strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        />
      </svg>
    ),
    subMenu: [
      { name: 'Todos Curriculums', path: '/dashboard/curriculums' },
      { name: 'Criar Curriculum', path: '/dashboard/curriculums/create' },
    ],
  },
  {
    name: 'Cursos de curta duração',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg"
        fill="none" viewBox="0 0 24 24"
        stroke="currentColor" strokeWidth={2}
        style={{
          width: '1.4rem',
          color: '#9FC49E'
        }}
      >
        <path
          strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
        />
      </svg>
    ),
    subMenu: [
      { name: 'Todos Cursos', path: '/dashboard/courses' },
      { name: 'Criar Curso', path: '/dashboard/courses/create' },
    ],
  },
  {
    name: 'Departamentos',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg"
        fill="none" viewBox="0 0 24 24"
        strokeWidth={1.5} stroke="currentColor"
        style={{
          width: '1.4rem',
          color: '#9FC49E'
        }}
      >
        <path
          strokeLinecap="round" strokeLinejoin="round" d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 01-1.125-1.125v-3.75zM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-8.25zM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-2.25z"
        />
      </svg>

    ),
    subMenu: [
      { name: 'Todos Departamentos', path: '/dashboard/departments' },
      { name: 'Criar Departamento', path: '/dashboard/departments/create' },
    ],
  },
]





