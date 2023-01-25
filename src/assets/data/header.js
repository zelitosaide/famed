export const anchors = [
  {
    name: 'Plataforma de Ensino Online(VULA)',
    href: 'https://vula.uem.mz/',
  },
  {
    name: 'Base de Dados (RedCap)',
    href: 'https://redcap.uem.mz/',
  },
  {
    name: 'Sistema Integrado de Gestão Académica (SIGA)',
    href: 'https://siga.uem.mz/users/login',
  },
  {
    name: 'Universidade Eduardo Mondlane (UEM)',
    href: 'https://www.uem.mz/',
  },
  {
    name: 'Direção do Registo Académico (UEM)',
    href: 'https://www.dra.uem.mz/',
  },
  {
    name: 'Departamento de Admissão a Univerdade',
    href: 'https://admissao.uem.mz/',
  },
]

export const navlinks = [
  {
    name: 'Sobre nós',
    to: '/about',
  },
  {
    name: 'Ensino',
    subMenu: [
      {
        name: 'Graduação',
        to: '/graduation',
      },
      {
        name: 'Pós-Graduação',
        to: '/postgraduate',
      },
      {
        name: 'Cursos de curta duração',
        to: '/minicourse',
      },
    ],
  },
  {
    name: 'Investigação',
    subMenu: [
      {
        name: 'Projectos de Pesquisa',
        to: '/projects',
      },
      {
        name: 'Publicações',
        to: '/publications',
      },
    ],
  },
  {
    name: 'Submissão de Protocolos',
    // to: '/protocols',
    // to: 'https://cibs.uem.mz',
    subMenu: [
      {
        name: 'Iniciar Submissão de Protocolos',
        to: 'https://cibs.uem.mz',
      },
      {
        name: 'Instruções de Submissão de Protocolos',
        to: '/instrucoes-submissao-protocolos',
      },
    ],
  },
  {
    name: 'Extensão',
    to: '/extension',
  },
  {
    name: 'Departamentos e Unidades',
    subMenu: [
      { name: 'Dep. Ciências Fisiológicas', to: '/departments/fisiologicas' },
      { name: 'Dep. Ciências Morfológicas', to: '/departments/morfologicas' },
      { name: 'Dep. Microbiologia', to: '/departments/microbiologia' },
      { name: 'Dep. Patologia', to: '/departments/patologia' },
      {
        name: 'Dep. Saúde da Comunidade',
        to: '/departments/saude-da-comunidade',
      },
      { name: 'Dep. Pediatria', to: '/departments/pediatria' },
      { name: 'Dep. Medicina', to: '/departments/medicina' },
      { name: 'Dep. Cirurgia', to: '/departments/cirurgia' },
      {
        name: 'Dep. Ginecologia e Obstetrícia',
        to: '/departments/ginecologia-obstetricia',
      },
      {
        name: 'Unidade de Trauma e Violência',
        to: '/departments/trauma-violencia',
      },
      {
        name: 'Unidade de Ciências de Implementação e Apoio à Pesquisa em Saúde',
        to: '/departments/ciencias-implementacao',
      },
      {
        name: 'Unidade de Saúde Sexual e Reprodutiva e HIV/SIDA',
        to: '/departments/saude-sexual-reprodutiva',
      },
    ],
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
