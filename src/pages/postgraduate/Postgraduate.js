const Postgraduate = () => {
  return (
    <div style={{ paddingTop: '9.5rem' }}>
      <div className='row'>
        <p
          style={{
            fontSize: "0.92rem",
            fontWeight: "bold",
            color: "var(--main-color)",
            lineHeight: "1.2rem",
            textTransform: "uppercase"
          }}
        >
          Cursos de Pós-Graduação
        </p>

        <p
          style={{
            lineHeight: "1.6rem",
            fontSize: "0.875rem",
          }}
        >
          A Faculdade de Medicina da Universidade Eduardo Mondlane oferece para o nível de Pós-Graduação os seguintes cursos:
        </p>

        <p
          style={{
            fontSize: "0.92rem",
            fontWeight: "bold",
            color: "var(--main-color)",
            lineHeight: "1.2rem",
            marginTop: "1.5rem"
          }}
        >
          Seis (6) Cursos de Mestrado:
        </p>

        <ul style={{ listStyle: "circle", marginLeft: "1.5rem" }}>
          <li
            style={{
              lineHeight: "1.6rem",
              fontSize: "0.875rem",
              fontWeight: 500,
              marginBottom: 10,
              textDecoration: "underline",
              textUnderlineOffset: 3,
              textDecorationThickness: 1.5,
              // textDecorationColor: "var(--main-color)",
              textDecorationColor: "var(--hover-color)",
            }}
          >Mestrado em Saúde Pública Presencial</li>
          <li
            style={{
              lineHeight: "1.6rem",
              fontSize: "0.875rem",
              fontWeight: 500,
              marginBottom: 10,
              textDecoration: "underline",
              textUnderlineOffset: 3,
              textDecorationThickness: 1.5,
              // textDecorationColor: "var(--main-color)",
              textDecorationColor: "var(--hover-color)",
            }}
          >Mestrado em Saúde Pública à Distância: (dividido em 3 ramos abaixo)
            {/* <ul>
              <li>Ramo de Desenvolvimento de Recursos Humanos para Saúde (DRHS) à Distância</li>
              <li>Ramo de Higiene, Saúde e Segurança Ocupacional (HSSO) à Distância</li>
              <li>Ramo em Gestão e Liderança de Sistemas de Saúde (GLSS) à Distância</li>
            </ul> */}
          </li>
          <li
            style={{
              lineHeight: "1.6rem",
              fontSize: "0.875rem",
              fontWeight: 500,
              marginBottom: 10,
              textDecoration: "underline",
              textUnderlineOffset: 3,
              textDecorationThickness: 1.5,
              // textDecorationColor: "var(--main-color)",
              textDecorationColor: "var(--hover-color)",
            }}
          >Mestrado em Epidemiologia de Campo e Laboratorial (MECL)</li>
          <li
            style={{
              lineHeight: "1.6rem",
              fontSize: "0.875rem",
              fontWeight: 500,
              marginBottom: 10,
              textDecoration: "underline",
              textUnderlineOffset: 3,
              textDecorationThickness: 1.5,
              // textDecorationColor: "var(--main-color)",
              textDecorationColor: "var(--hover-color)",
            }}
          >Mestrado em Saúde Mental e Psico-intervenções (MSMPI)</li>
          <li
            style={{
              lineHeight: "1.6rem",
              fontSize: "0.875rem",
              fontWeight: 500,
              marginBottom: 10,
              textDecoration: "underline",
              textUnderlineOffset: 3,
              textDecorationThickness: 1.5,
              // textDecorationColor: "var(--main-color)",
              textDecorationColor: "var(--hover-color)",
            }}
          >Mestrado em  Biociências (MBC)</li>
          <li
            style={{
              lineHeight: "1.6rem",
              fontSize: "0.875rem",
              fontWeight: 500,
              marginBottom: 10,
              textDecoration: "underline",
              textUnderlineOffset: 3,
              textDecorationThickness: 1.5,
              // textDecorationColor: "var(--main-color)",
              textDecorationColor: "var(--hover-color)",
            }}
          >Mestrado em Emergências Pediatrias e Neonatais (MEPN)</li>
        </ul>

        <p
          style={{
            fontSize: "0.92rem",
            fontWeight: "bold",
            color: "var(--main-color)",
            lineHeight: "1.2rem",
            marginTop: "1.5rem"
          }}
        >
          Um (1) Curso de Doutoramento:
        </p>

        <ul style={{ listStyle: "circle", marginLeft: "1.5rem" }}>
          <li
            style={{
              lineHeight: "1.6rem",
              fontSize: "0.875rem",
              fontWeight: 500,
              marginBottom: 10,
              textDecoration: "underline",
              textUnderlineOffset: 3,
              textDecorationThickness: 1.5,
              // textDecorationColor: "var(--main-color)",
              textDecorationColor: "var(--hover-color)",
            }}
          >Doutoramento em Biociências e Saúde Pública</li>
        </ul>
      </div>
    </div >
  )
}

export default Postgraduate

// .publicationList .singlePublication a:hover {
//
//
//   ;
//   text-decoration-color: var(--main-color);
//   color: var(--black-color);
// }