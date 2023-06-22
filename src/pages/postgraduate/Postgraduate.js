import { Link } from 'react-router-dom'

const Postgraduate = () => {
  return (
    <div style={{ paddingTop: '9.5rem' }}>
      <div className="row">
        <p
          style={{
            fontSize: '0.92rem',
            fontWeight: 'bold',
            color: 'var(--main-color)',
            lineHeight: '1.2rem',
            textTransform: 'uppercase',
          }}
        >
          Cursos de Pós-Graduação
        </p>

        <p
          style={{
            lineHeight: '1.6rem',
            fontSize: '0.875rem',
          }}
        >
          A Faculdade de Medicina oferece 6 cursos de mestrado académico,
          nomeadamente Mestrado em Saúde Pública Presencial (MSP), Mestrado em
          Saúde Pública à Distância (MSPD), Mestrado em Biociências (MBC),
          Mestrado em Epidemiologia de Campo e Laboratorial (MECL), Mestrado em
          Saúde Mental e Psico-intervenções (MSMPI) e Mestrado em Emergências
          Pediatrias e Neonatais (MEPN), e também oferece um curso de
          Doutoramento em Biociências e Saúde Pública.
        </p>

        <p
          style={{
            fontSize: '0.92rem',
            fontWeight: 'bold',
            color: 'var(--main-color)',
            lineHeight: '1.2rem',
            marginTop: '1.5rem',
          }}
        >
          Cursos de Mestrado:
        </p>

        <div style={{ display: "flex", gap: 26, marginBottom: 20 }}>
          <div style={{ width: "33.33%", height: 200, boxShadow: "1px 2px 10px 0 rgba(0, 0, 0, 0.3)" }}>
            <p 
              style={{
                fontSize: 14,
                margin: 0,
                backgroundColor: "#257A23",
                color: "white", 
                padding: "10px 16px"
              }}
            >
              <Link style={{ color: "white"}} to="msp">Mestrado em Saúde Pública Presencial (MSP)</Link>
            </p>
            <p style={{ fontSize: 14, lineHeight: "1.5rem", marginTop: 6, padding: "8px 16px 14px" }}>
              {
                `Oferecer aos participantes uma formação multidisciplinar, orientada 
                para a solução de problemas de Saúde em Moçambique e proporcionar o 
                domínio de conceitos biomédicos e socioculturais relevantes para a investigação, 
                implementação e gestão em Saúde Pública.`.slice(0, 200)
              }...
            </p>
          </div>
          <div style={{ width: "33.33%", height: 200, boxShadow: "1px 2px 10px 0 rgba(0, 0, 0, 0.3)" }}>
            <p 
              style={{
                fontSize: 14,
                margin: 0,
                backgroundColor: "#257A23",
                color: "white", 
                padding: "10px 16px"
              }}
            >
              <Link style={{ color: "white" }} to="/postgraduate">
                Mestrado em Saúde Pública à Distância (MSPD)
              </Link>
            </p>
            <p style={{ fontSize: 14, lineHeight: "1.5rem", marginTop: 6, padding: "8px 16px 14px" }}>
              {
                `Mestrado em Saúde Pública à Distância (MSPD), com os seguintes ramos:
                Ramo de Desenvolvimento de Recursos Humanos para Saúde (DRHS)
                Ramo de Higiene, Saúde e Segurança Ocupacional (HSSO)
                Ramo em Gestão e Liderança de Sistemas de Saúde (GLSS)
                `.slice(0, 200)
              }...
            </p>
          </div>
          <div style={{ width: "33.33%", height: 200, boxShadow: "1px 2px 10px 0 rgba(0, 0, 0, 0.3)" }}>
            <p
              style={{
                fontSize: 14,
                margin: 0,
                backgroundColor: "#257A23",
                color: "white", 
                padding: "10px 16px"
              }}
            >
              <Link style={{ color: "white" }} to="mbc">
                Mestrado em Biociências (MBC)
              </Link>
            </p>
            <p style={{ fontSize: 14, lineHeight: "1.5rem", marginTop: 6, padding: "8px 16px 14px" }}>
              {
                `O mestrado em Biociências visa formar profissionais de nível superior 
                qualificados para o exercício profissional, incluindo docência e investigação 
                científica, nos domínios das Biociências.
                `.slice(0, 200)
              }...
            </p>
          </div>
        </div>

        <div style={{ display: "flex", gap: 26, marginBottom: 20, marginTop: 30 }}>
          <div style={{ width: "33.33%", height: 200, boxShadow: "1px 2px 10px 0 rgba(0, 0, 0, 0.3)" }}>
            <p
              style={{
                fontSize: 14,
                margin: 0,
                backgroundColor: "#257A23",
                color: "white", 
                padding: "10px 16px"
              }}
            >
              <Link style={{ color: "white" }} to="mecl">
                Mestrado em Epidemiologia de Campo e Laboratorial (MECL)
              </Link>
            </p>
            <p style={{ fontSize: 14, lineHeight: "1.5rem", marginTop: 6, padding: "8px 16px 14px" }}>
              {
                `O objectivo geral deste programa é a formação em serviço, baseada nos 
                Princípios Fundamentais da Epidemiologia, de forma a permitir aos formandos 
                a aquisição de conhecimentos e capacidades essenciais para a solução de 
                problemas de Saúde Pública em Moçambique. Os residentes que completarem 
                este programa com sucesso receberão o grau de “Mestre em Epidemiologia de 
                Campo e Laboratorial” conferido pela UEM. As aulas deste Mestrado decorrerão na 
                Faculdade de Medicina da UEM (Maputo) e o trabalho de campo (estágio) irá decorrer 
                em diferentes Unidades do Serviço Nacional de Saúde. As aulas terão início em 
                Agosto de 2023.`
                .slice(0, 200)
              }...
            </p>
          </div>
          <div style={{ width: "33.33%", height: 200, boxShadow: "1px 2px 10px 0 rgba(0, 0, 0, 0.3)" }}>
            <p
              style={{
                fontSize: 14,
                margin: 0,
                backgroundColor: "#257A23",
                color: "white", 
                padding: "10px 16px"
              }}
            >
              Mestrado em Saúde Mental e Psico-intervenções (MSMPI)
            </p>
            <p style={{ fontSize: 14, lineHeight: "1.5rem", marginTop: 6, padding: "8px 16px 14px" }}>
              {
                `O Programa de Mestrado em Saúde Mental e Psicointervenções tem como objectivo 
                formar profissionais com competências em pesquisa, avaliação e intervenção nas 
                diferentes áreas da saúde mental, promovendo o bem-estar, optimizando a 
                funcionalidade e interacção do individuo no seu contexto de vivência.`
                .slice(0, 200)
              }...
            </p>
          </div>
          <div style={{ width: "33.33%", height: 200, boxShadow: "1px 2px 10px 0 rgba(0, 0, 0, 0.3)" }}>
            <p
              style={{
                fontSize: 14,
                margin: 0,
                backgroundColor: "#257A23",
                color: "white", 
                padding: "10px 16px"
              }}
            >
              Mestrado em Emergências Pediatrias e Neonatais (MEPN)
            </p>
            <p style={{ fontSize: 14, lineHeight: "1.5rem", marginTop: 6, padding: "8px 16px 14px" }}>
              {
                `MEPN visa formar profissionais de saúde para providenciar cuidados de 
                saúde, e realizarem docência e pesquisas relevantes, na área de pediatria 
                e neonatologia, para serem capazes de darem o seu melhor contributo no contexto 
                de equipas multidisciplinares. Os estudantes que completarem este curso com 
                sucesso receberão o grau de Mestre em Emergências Pediatrias e Neonatais.`
                .slice(0, 200)
              }...
            </p>
          </div>
        </div>

        <ul style={{ listStyle: 'circle', marginLeft: '1.5rem' }}>
          <li
            style={{
              lineHeight: '1.6rem',
              fontSize: '0.875rem',
              fontWeight: 500,
              marginBottom: 15,
              textDecoration: 'underline',
              textUnderlineOffset: 3,
              textDecorationThickness: 1.5,
              textDecorationColor: 'var(--hover-color)',
            }}
          >
            {/* <Link to="msp"> */}
            <Link to="msp">Mestrado em Saúde Pública Presencial (MSP)</Link>
          </li>
          <li
            style={{
              lineHeight: '1.6rem',
              fontSize: '0.875rem',
              fontWeight: 500,
              marginBottom: 15,
              textDecoration: 'underline',
              textUnderlineOffset: 3,
              textDecorationThickness: 1.5,
              textDecorationColor: 'var(--hover-color)',
            }}
          >
            {/* <Link to="mspd"> */}
            <Link to="/postgraduate">
              Mestrado em Saúde Pública à Distância (MSPD), com os seguintes
              ramos:
            </Link>
            <ul style={{ listStyle: 'square', marginLeft: '1.5rem' }}>
              <li
                style={{
                  lineHeight: '1.6rem',
                  fontSize: '0.875rem',
                  fontWeight: 400,
                  marginTop: 10,
                  textDecoration: 'underline',
                  textUnderlineOffset: 3,
                  textDecorationThickness: 1.5,
                  textDecorationColor: 'white',
                  color: 'var(--main-color)',
                }}
              >
                Ramo de Desenvolvimento de Recursos Humanos para Saúde (DRHS)
              </li>
              <li
                style={{
                  lineHeight: '1.6rem',
                  fontSize: '0.875rem',
                  fontWeight: 400,
                  textDecoration: 'underline',
                  textUnderlineOffset: 3,
                  textDecorationThickness: 1.5,
                  textDecorationColor: 'white',
                  color: 'var(--main-color)',
                }}
              >
                Ramo de Higiene, Saúde e Segurança Ocupacional (HSSO)
              </li>
              <li
                style={{
                  lineHeight: '1.6rem',
                  fontSize: '0.875rem',
                  fontWeight: 400,
                  textDecoration: 'underline',
                  textUnderlineOffset: 3,
                  textDecorationThickness: 1.5,
                  textDecorationColor: 'white',
                  color: 'var(--main-color)',
                }}
              >
                Ramo em Gestão e Liderança de Sistemas de Saúde (GLSS)
              </li>
            </ul>
          </li>
          <li
            style={{
              lineHeight: '1.6rem',
              fontSize: '0.875rem',
              fontWeight: 500,
              marginBottom: 15,
              textDecoration: 'underline',
              textUnderlineOffset: 3,
              textDecorationThickness: 1.5,
              textDecorationColor: 'var(--hover-color)',
            }}
          >
            <Link to="mbc">
              Mestrado em Biociências (MBC), com os seguintes ramos:
            </Link>
            <ul style={{ listStyle: 'square', marginLeft: '1.5rem' }}>
              <li
                style={{
                  lineHeight: '1.6rem',
                  fontSize: '0.875rem',
                  fontWeight: 400,
                  marginTop: 10,
                  textDecoration: 'underline',
                  textUnderlineOffset: 3,
                  textDecorationThickness: 1.5,
                  textDecorationColor: 'white',
                  color: 'var(--main-color)',
                }}
              >
                Ramo de Microbiologia
              </li>
              <li
                style={{
                  lineHeight: '1.6rem',
                  fontSize: '0.875rem',
                  fontWeight: 400,
                  textDecoration: 'underline',
                  textUnderlineOffset: 3,
                  textDecorationThickness: 1.5,
                  textDecorationColor: 'white',
                  color: 'var(--main-color)',
                }}
              >
                Ramo de Parasitologia
              </li>
              <li
                style={{
                  lineHeight: '1.6rem',
                  fontSize: '0.875rem',
                  fontWeight: 400,
                  textDecoration: 'underline',
                  textUnderlineOffset: 3,
                  textDecorationThickness: 1.5,
                  textDecorationColor: 'white',
                  color: 'var(--main-color)',
                }}
              >
                Ramo de Neurociências
              </li>
            </ul>
          </li>
          <li
            style={{
              lineHeight: '1.6rem',
              fontSize: '0.875rem',
              fontWeight: 500,
              marginBottom: 15,
              textDecoration: 'underline',
              textUnderlineOffset: 3,
              textDecorationThickness: 1.5,
              textDecorationColor: 'var(--hover-color)',
            }}
          >
            <Link to="mecl">
              Mestrado em Epidemiologia de Campo e Laboratorial (MECL)
            </Link>
          </li>
          <li
            style={{
              lineHeight: '1.6rem',
              fontSize: '0.875rem',
              fontWeight: 500,
              marginBottom: 15,
              textDecoration: 'underline',
              textUnderlineOffset: 3,
              textDecorationThickness: 1.5,
              textDecorationColor: 'var(--hover-color)',
            }}
          >
            <Link to="msmpi">
              Mestrado em Saúde Mental e Psico-intervenções (MSMPI)
            </Link>
          </li>

          <li
            style={{
              lineHeight: '1.6rem',
              fontSize: '0.875rem',
              fontWeight: 500,
              marginBottom: 10,
              textDecoration: 'underline',
              textUnderlineOffset: 3,
              textDecorationThickness: 1.5,
              textDecorationColor: 'var(--hover-color)',
            }}
          >
            <Link to="mepn">
              Mestrado em Emergências Pediatrias e Neonatais (MEPN)
            </Link>
          </li>
        </ul>

        <p
          style={{
            fontSize: '0.92rem',
            fontWeight: 'bold',
            color: 'var(--main-color)',
            lineHeight: '1.2rem',
            marginTop: '1.5rem',
          }}
        >
          Cursos de Doutoramentos:
        </p>

        <ul style={{ listStyle: 'circle', marginLeft: '1.5rem' }}>
          <li
            style={{
              lineHeight: '1.6rem',
              fontSize: '0.875rem',
              fontWeight: 500,
              marginBottom: 15,
              textDecoration: 'underline',
              textUnderlineOffset: 3,
              textDecorationThickness: 1.5,
              textDecorationColor: 'var(--hover-color)',
            }}
          >
            <Link to="dbsp">
              {/* <Link to='/postgraduate'> */}
              Doutoramento em Biociências e Saúde Pública
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Postgraduate
