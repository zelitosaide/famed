import manual from '../../assets/pdf/Manual_Utilizador_ Plataforma_CIBS.pdf'

export function InstrucoesSubmissaoProtocolos() {
  const onDownload = () => {
    fetch(manual, {
      method: 'get',
      mode: 'no-cors',
      referrerPolicy: 'no-referrer',
    })
      .then((response) => response.blob())
      .then((data) => {
        const aElement = document.createElement('a')
        aElement.setAttribute('download', 'Manual de instrucoes')
        const href = URL.createObjectURL(data)
        aElement.href = href
        aElement.setAttribute('target', '_blank')
        aElement.click()
        URL.revokeObjectURL(href)
      })
  }

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
          Instruções de Submissão de Protocolos
        </p>

        <p
          style={{
            lineHeight: '1.6rem',
            fontSize: '0.875rem',
          }}
        >
          Prezado/a Investigador/a:
        </p>

        <p
          style={{
            lineHeight: '1.6rem',
            fontSize: '0.875rem',
          }}
        >
          O Comitê Científico da Faculdade de Medicina da UEM, em virtude da
          introdução do uso da Plataforma Electrónica para submissão dos
          protocolos e projectos de Investigação Científica, solicita que:
        </p>

        <p
          style={{
            lineHeight: '1.6rem',
            fontSize: '0.875rem',
          }}
        >
          Proceda à submissão de seu(s) protocolo(s) através do site
          <a href="https://www.cibs.uem.mz"> https://www.cibs.uem.mz</a> devendo
          para o efeito registar-se.
        </p>

        <p
          style={{
            lineHeight: '1.6rem',
            fontSize: '0.875rem',
          }}
        >
          Encontre o Manual com as instruções do uso da plataforma neste link:{' '}
          <span
            style={{
              color: 'var(--main-color)',
              cursor: 'pointer',
              textDecoration: 'underline',
            }}
            onClick={onDownload}
          >
            Manual de instruções.
          </span>
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
          Informações adicionais:
        </p>

        <p
          style={{
            lineHeight: '1.6rem',
            fontSize: '0.875rem',
          }}
        >
          No caso de dificuldade de registo na plataforma entre em contacto pelo
          email:{' '}
          <span style={{ color: 'var(--main-color)' }}>
            ccfaculdademedicina@gmail.com
          </span>{' '}
          ou{' '}
          <span style={{ color: 'var(--main-color)' }}>info@leeva.agency</span>.
        </p>

        <p
          style={{
            lineHeight: '1.6rem',
            fontSize: '0.875rem',
          }}
        >
          Questões específicas do Comité Científico use o email:{' '}
          <span style={{ color: 'var(--main-color)' }}>
            ccfaculdademedicina@gmail.com
          </span>
          .
        </p>

        <p
          style={{
            lineHeight: '1.6rem',
            fontSize: '0.875rem',
          }}
        >
          Questões especificas do Comité Institucional de Bioética use o email:{' '}
          <span style={{ color: 'var(--main-color)' }}>
            cibsfmhcm@gmail.com
          </span>
          .
        </p>
      </div>
    </div>
  )
}
