import { Link } from "react-router-dom"

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
          A Faculdade de Medicina oferece 6 cursos de mestrado académico, nomeadamente Mestrado em Saúde Pública Presencial (MSP), Mestrado em Saúde Pública à Distância (MSPD), Mestrado em  Biociências (MBC), Mestrado em Epidemiologia de Campo e Laboratorial (MECL), Mestrado em Saúde Mental e Psico-intervenções (MSMPI) e Mestrado em Emergências Pediatrias e Neonatais (MEPN), e também oferece um curso de Doutoramento em Biociências e Saúde Pública.
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
          Cursos de Mestrado:
        </p>

        <ul style={{ listStyle: "circle", marginLeft: "1.5rem" }}>
          <li
            style={{
              lineHeight: "1.6rem",
              fontSize: "0.875rem",
              fontWeight: 500,
              marginBottom: 15,
              textDecoration: "underline",
              textUnderlineOffset: 3,
              textDecorationThickness: 1.5,
              textDecorationColor: "var(--hover-color)",
            }}
          >
            {/* <Link to="msp"> */}
            <Link to="/msp">
              Mestrado em Saúde Pública Presencial (MSP)
            </Link>
          </li>
          <li
            style={{
              lineHeight: "1.6rem",
              fontSize: "0.875rem",
              fontWeight: 500,
              marginBottom: 15,
              textDecoration: "underline",
              textUnderlineOffset: 3,
              textDecorationThickness: 1.5,
              textDecorationColor: "var(--hover-color)",
            }}
          >
            {/* <Link to="mspd"> */}
            <Link to="/postgraduate">
              Mestrado em Saúde Pública à Distância (MSPD), com os seguintes ramos:
            </Link>
            <ul style={{ listStyle: "square", marginLeft: "1.5rem" }}>
              <li
                style={{
                  lineHeight: "1.6rem",
                  fontSize: "0.875rem",
                  fontWeight: 400,
                  marginTop: 10,
                  textDecoration: "underline",
                  textUnderlineOffset: 3,
                  textDecorationThickness: 1.5,
                  textDecorationColor: "white",
                  color: "var(--main-color)",
                }}
              >Ramo de Desenvolvimento de Recursos Humanos para Saúde (DRHS)</li>
              <li
                style={{
                  lineHeight: "1.6rem",
                  fontSize: "0.875rem",
                  fontWeight: 400,
                  textDecoration: "underline",
                  textUnderlineOffset: 3,
                  textDecorationThickness: 1.5,
                  textDecorationColor: "white",
                  color: "var(--main-color)",
                }}
              >Ramo de Higiene, Saúde e Segurança Ocupacional (HSSO)</li>
              <li
                style={{
                  lineHeight: "1.6rem",
                  fontSize: "0.875rem",
                  fontWeight: 400,
                  textDecoration: "underline",
                  textUnderlineOffset: 3,
                  textDecorationThickness: 1.5,
                  textDecorationColor: "white",
                  color: "var(--main-color)",
                }}
              >Ramo em Gestão e Liderança de Sistemas de Saúde (GLSS)</li>
            </ul>
          </li>
          <li
            style={{
              lineHeight: "1.6rem",
              fontSize: "0.875rem",
              fontWeight: 500,
              marginBottom: 15,
              textDecoration: "underline",
              textUnderlineOffset: 3,
              textDecorationThickness: 1.5,
              textDecorationColor: "var(--hover-color)",
            }}
          >
            <Link to="mbc">
              Mestrado em  Biociências (MBC), com os seguintes ramos:
            </Link>
            <ul style={{ listStyle: "square", marginLeft: "1.5rem" }}>
              <li
                style={{
                  lineHeight: "1.6rem",
                  fontSize: "0.875rem",
                  fontWeight: 400,
                  marginTop: 10,
                  textDecoration: "underline",
                  textUnderlineOffset: 3,
                  textDecorationThickness: 1.5,
                  textDecorationColor: "white",
                  color: "var(--main-color)",
                }}
              >Ramo de Microbiologia</li>
              <li
                style={{
                  lineHeight: "1.6rem",
                  fontSize: "0.875rem",
                  fontWeight: 400,
                  textDecoration: "underline",
                  textUnderlineOffset: 3,
                  textDecorationThickness: 1.5,
                  textDecorationColor: "white",
                  color: "var(--main-color)",
                }}
              >Ramo de Parasitologia</li>
              <li
                style={{
                  lineHeight: "1.6rem",
                  fontSize: "0.875rem",
                  fontWeight: 400,
                  textDecoration: "underline",
                  textUnderlineOffset: 3,
                  textDecorationThickness: 1.5,
                  textDecorationColor: "white",
                  color: "var(--main-color)",
                }}
              >Ramo de Neurociências</li>
            </ul>
          </li>
          <li
            style={{
              lineHeight: "1.6rem",
              fontSize: "0.875rem",
              fontWeight: 500,
              marginBottom: 15,
              textDecoration: "underline",
              textUnderlineOffset: 3,
              textDecorationThickness: 1.5,
              textDecorationColor: "var(--hover-color)",
            }}
          >
            {/* <Link to="mecl"> */}
            <Link to="/postgraduate">
              Mestrado em Epidemiologia de Campo e Laboratorial (MECL)
            </Link>
          </li>
          <li
            style={{
              lineHeight: "1.6rem",
              fontSize: "0.875rem",
              fontWeight: 500,
              marginBottom: 15,
              textDecoration: "underline",
              textUnderlineOffset: 3,
              textDecorationThickness: 1.5,
              textDecorationColor: "var(--hover-color)",
            }}
          >
            <Link to='msmpi'>
              Mestrado em Saúde Mental e Psico-intervenções (MSMPI)
            </Link>
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
              textDecorationColor: "var(--hover-color)",
            }}
          >
            <Link to='mepn'>
              Mestrado em Emergências Pediatrias e Neonatais (MEPN)
            </Link>
          </li>
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
          Cursos de Doutoramentos:
        </p>

        <ul style={{ listStyle: "circle", marginLeft: "1.5rem" }}>
          <li
            style={{
              lineHeight: "1.6rem",
              fontSize: "0.875rem",
              fontWeight: 500,
              marginBottom: 15,
              textDecoration: "underline",
              textUnderlineOffset: 3,
              textDecorationThickness: 1.5,
              textDecorationColor: "var(--hover-color)",
            }}
          >
            {/* <Link to='dbsp'> */}
            <Link to='/postgraduate'>
              Doutoramento em Biociências e Saúde Pública
            </Link>
          </li>
        </ul>
      </div>
    </div >
  )
}

export default Postgraduate