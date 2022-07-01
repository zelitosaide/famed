export const anchors = [
  {
    name: 'Plataforma de Ensino Online(VULA)',
    href: 'https://vula.uem.mz/'
  },
  {
    name: 'Base de Dados (RedCap)',
    href: 'https://redcap.uem.mz/'
  },
  {
    name: 'Sistema Integrado de Gestão Académica (SIGA)',
    href: 'https://siga.uem.mz/users/login'
  },
  {
    name: 'Universidade Eduardo Mondlane (UEM)',
    href: 'https://www.uem.mz/'
  },
  {
    name: 'Direção do Registo Académico (UEM)',
    href: 'https://www.dra.uem.mz/'
  },
  {
    name: 'Departamento de Admissão a Univerdade',
    href: 'https://admissao.uem.mz/'
  },
]

export const navlinks = [
  // {
  //   name: 'Página Inicial',
  //   to: '/'
  // },
  {
    name: 'Sobre nós',
    to: '/about',
  },
  {
    name: 'Ensino',
    subMenu: [
      {
        name: 'Graduação',
        to: '/graduation'
      },
      {
        name: 'Pós-Graduação',
        to: '/postgraduate'
      },
      {
        name: 'Cursos de Verão',
        to: '/minicourse'
      },
    ]
  },
  {
    name: 'Investigação',
    subMenu: [
      {
        name: 'Projectos de Pesquisa',
        to: '/projects'
      },
      {
        name: 'Publicações',
        to: '/publications'
      },
    ]
  },
  {
    name: 'Submissão de Protocolos',
    to: '/protocols',
  },
  {
    name: 'Extensão',
    to: '/extension',
  },
  {
    name: 'Departamentos',
    to: '/departments',
  },
  {
    name: 'Notícias',
    to: '/news',
  },
  {
    name: 'Iniciar Sessão',
    to: '/signin',
  },
]