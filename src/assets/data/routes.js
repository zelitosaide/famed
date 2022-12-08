export const routes = [
  'morfologicas',
  'fisiologicas',
  'patologia',
  'microbiologia',
  'saude-da-comunidade',
  'cirurgia',
  'pediatria',
  'medicina',
  'ginecologia-obstetricia',
  'trauma-violencia',
  'saude-sexual-reprodutiva',
  'ciencias-implementacao',
]

// export const routes = [
//   'fisiologicas',
//   'morfologicas',
//   'microbiologia',
//   'patologia',
//   'saude-da-comunidade',
//   'pediatria',
//   'medicina',
//   'cirurgia',
//   'ginecologia-obstetricia',
//   'trauma-violencia',
//   'ciencias-implementacao',
//   'saude-sexual-reprodutiva'
// ]


// 0: "Dep. Ciências Fisiológicas"
// 1: "Dep. Ciências Morfológicas"
// 2: "Dep. Microbiologia"
// 3: "Dep. Patologia"
// 4: "Dep. Saúde da Comunidade"
// 5: "Dep. Pediatria"
// 6: "Dep. Medicina"
// 7: "Dep. Cirurgia"
// 8: "Dep. Ginecologia e Obstetrícia"
// 9: "Unidade de Trauma e Violência"
// 10: "Unidade de pesquisa em ciências de implementação"
// 11: "Unidade de Saúde Sexual e Reprodutiva e HIV/SIDA"





// 0: Object { name: "Dep. Ciências Fisiológicas", path: "fisiologicas" }
// ​
// 1: Object { name: "Dep. Ciências Morfológicas", path: "morfologicas" }
// ​
// 2: Object { name: "Dep. Microbiologia", path: "microbiologia" }
// ​
// 3: Object { name: "Dep. Patologia", path: "patologia" }
// ​
// 4: Object { name: "Dep. Saúde da Comunidade", path: "saude-da-comunidade" }
// ​
// 5: Object { name: "Dep. Pediatria", path: "pediatria" }
// ​
// 6: Object { name: "Dep. Medicina", path: "medicina" }
// ​
// 7: Object { name: "Dep. Cirurgia", path: "cirurgia" }
// ​
// 8: Object { name: "Dep. Ginecologia e Obstetrícia", path: "ginecologia-obstetricia" }
// ​
// 9: Object { name: "Unidade de Trauma", path: "trauma" }
// ​
// 10: Object { name: "Unidade de Pesquisa e Extensão em Saúde Reprodutiva e HIV/SIDA", path: "saude-reprodutiva" }

const provinces = [
  {
    province: 'Maputo',
    districts: [
      { name: "Boane" },
      { name: "Magude" },
      { name: "Manhiça" },
      { name: "Marracuene" },
      { name: "Matola" },
      { name: "Matutuíne" },
      { name: "Moamba" },
      { name: "Namaacha" },
    ]
  },
  {
    province: 'Cidade de Maputo',
    districts: [
      { name: "Distrito Urbano de KaMpfumo" },
      { name: "Distrito Urbano de Nlhamankulu" },
      { name: "Distrito Urbano de KaMaxaquene" },
      { name: "Distrito Urbano de KaMavota" },
      { name: "Distrito Urbano de KaMubukwana" },
      { name: "Distrito Municipal de KaTembe" },
      { name: "Distrito Municipal de KaNyaka" },
    ]
  },
  {
    province: 'Gaza',
    districts: [
      { name: "Bilene" },
      { name: "Chibuto" },
      { name: "Chicualacuala" },
      { name: "Chigubo" },
      { name: "Chókwè" },
      { name: "Chongoene" },
      { name: "Guijá" },
      { name: "Limpopo" },
      { name: "Mabalane" },
      { name: "Manjacaze" },
      { name: "Mapai" },
      { name: "Massangena" },
      { name: "Massingir" },
      { name: "Xai-Xai" },
    ]
  },
  {
    province: 'inhambane',
    districts: [
      { name: "Funhalouro" },
      { name: "Govuro" },
      { name: "Homoíne" },
      { name: "Inhambane" },
      { name: "Inharrime" },
      { name: "Inhassoro" },
      { name: "Jangamo" },
      { name: "Mabote" },
      { name: "Massinga" },
      { name: "Maxixe" },
      { name: "Morrumbene" },
      { name: "Panda" },
      { name: "Vilanculos" },
      { name: "Zavala" },
    ]
  },
  {
    province: 'Niassa',
    districts: [
      { name: "Chimbonila" },
      { name: "Cuamba" },
      { name: "Lago" },
      { name: "Lichinga" },
      { name: "Majune" },
      { name: "Mandimba" },
      { name: "Marrupa" },
      { name: "Maúa" },
      { name: "Mavago" },
      { name: "Mecanhelas" },
      { name: "Mecula" },
      { name: "Metarica" },
      { name: "Muembe" },
      { name: "N'gauma" },
      { name: "Nipepe" },
      { name: "Sanga" },
    ]
  },
  {
    province: 'Tete',
    districts: [
      { name: "Angónia" },
      { name: "Cahora-Bassa" },
      { name: "Changara" },
      { name: "Chifunde" },
      { name: "Chiuta" },
      { name: "Dôa" },
      { name: "Macanga" },
      { name: "Magoé" },
      { name: "Marara" },
      { name: "Marávia" },
      { name: "Moatize" },
      { name: "Mutarara" },
      { name: "Tete" },
      { name: "Tsangano" },
      { name: "Zumbo" },
    ]
  },
  {
    province: 'Nampula',
    districts: [
      { name: "Angoche" },
      { name: "Eráti" },
      { name: "Ilha de Moçambique" },
      { name: "Lalaua" },
      { name: "Larde" },
      { name: "Liúpo" },
      { name: "Malema" },
      { name: "Meconta" },
      { name: "Mecubúri" },
      { name: "Memba" },
      { name: "Mogincual" },
      { name: "Mogovolas" },
      { name: "Moma" },
      { name: "Monapo" },
      { name: "Mossuril" },
      { name: "Muecate" },
      { name: "Murrupula" },
      { name: "Nacala-a-Velha" },
      { name: "Nacala Porto" },
      { name: "Nacarôa" },
      { name: "Nampula" },
      { name: "Rapale" },
      { name: "Ribaué" },
    ]
  },
  {
    province: 'Zambezia',
    districts: [
      { name: "Alto Molócue" },
      { name: "Chinde" },
      { name: "Derre" },
      { name: "Gilé" },
      { name: "Gurué" },
      { name: "Ile" },
      { name: "Inhassunge" },
      { name: "Luabo" },
      { name: "Lugela" },
      { name: "Maganja da Costa" },
      { name: "Milange" },
      { name: "Mocuba" },
      { name: "Mocubela" },
      { name: "Molumbo" },
      { name: "Mopeia" },
      { name: "Morrumbala" },
      { name: "Mulevala" },
      { name: "Namacurra" },
      { name: "Namarroi" },
      { name: "Nicoadala" },
      { name: "Pebane" },
      { name: "Quelimane" },
    ]
  },
  {
    province: 'Cabo de delgado',
    districts: [
      { name: "Ancuabe" },
      { name: "Balama" },
      { name: "Chiúre" },
      { name: "Ibo" },
      { name: "Macomia" },
      { name: "Mecúfi" },
      { name: "Meluco" },
      { name: "Metuge" },
      { name: "Mocímboa da Praia" },
      { name: "Montepuez" },
      { name: "Mueda" },
      { name: "Muidumbe" },
      { name: "Namuno " },
      { name: "Nangade" },
      { name: "Palma" },
      { name: "Pemba" },
      { name: "Quissanga" },
    ]
  },
  {
    province: 'Sofala',
    districts: [
      { name: "Beira" },
      { name: "Búzi" },
      { name: "Caia" },
      { name: "Chemba" },
      { name: "Cheringoma" },
      { name: "Chibabava" },
      { name: "Dondo" },
      { name: "Gorongosa" },
      { name: "Machanga" },
      { name: "Maringué" },
      { name: "Marromeu" },
      { name: "Muanza" },
      { name: "Nhamatanda" },
    ]
  },
  {
    province: 'Manica',
    districts: [
      { name: "Bárue" },
      { name: "Chimoio" },
      { name: "Gondola" },
      { name: "Guro" },
      { name: "Macate" },
      { name: "Machaze" },
      { name: "Macossa" },
      { name: "Manica" },
      { name: "Mossurize" },
      { name: "Sussundenga" },
      { name: "Tambara" },
      { name: "Vanduzi" },
    ]
  },
]