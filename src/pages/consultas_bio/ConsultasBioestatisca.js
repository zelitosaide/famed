import { useNavigate } from 'react-router-dom'

import { Column } from '../../components/column/Column'
import { Fieldset } from '../../components/fieldset/Fieldset'
import { Input } from '../../components/input/Input'
import { Row } from '../../components/row/Row'

export function ConsultasBioestatiscas() {
  const topicos = [
    'Cálculo de amostra',
    'Análise estatística descritiva (tabela/gráfico)',
    'Análise estatística inferencial (bivariada/multivariada/outros)',
    'Sobre base de dados (Criação, limpeza, preparação para análises, etc)',
    'Reporte, interpretação de resultados de análise inferencial',
    'Redação de aspectos de análise estatística no protocolo',
    'Outro (especifique)',
  ]

  const navigate = useNavigate()

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
            marginBottom: '2rem',
          }}
        >
          Formulário de requisição de Consulta de Bioestatística
        </p>

        <Fieldset
          legend="Formulário de requisição de Consulta de Bioestatística"
          style={{ margin: 0, background: '#F3F4F6' }}
        >
          <Row>
            <Column style={{ width: '33.33%' }}>
              <Input label="Nome Completo" required>
                <input type="text" />
              </Input>
            </Column>
            <Column style={{ width: '33.33%' }}>
              <Input label="Email" required>
                <input type="email" />
              </Input>
            </Column>
            <Column style={{ width: '33.33%' }}>
              <Input label="Contacto telemóvel" required>
                <input type="text" />
              </Input>
            </Column>
          </Row>
          <Row>
            <Column style={{ width: '50%' }}>
              <Input
                label="Marque a sua consulta (apenas em todas Quarta-feira, das 16-18h)"
                required
              >
                <input type="date" />
              </Input>
            </Column>
            <Column style={{ width: '50%' }}>
              <Input label="Tópico de consulta" required>
                <select>
                  {topicos.map(function (item) {
                    return <option key={item}>{item}</option>
                  })}
                </select>
              </Input>
            </Column>
          </Row>
          <Input
            label="Resumo da pesquisa (deixar um espaço com pelo menos 10 linhas)"
            reqired
          >
            <textarea />
          </Input>
          <Input style={{ display: 'inline-block' }}>
            <button>Marcar</button>
          </Input>
          <Input
            style={{
              display: 'inline-block',
              '--bg-color': 'rgb(252, 88, 50)',
              '--bg-hover': 'rgb(252, 70, 29)',
              '--bg-active': 'rgb(252, 88, 50)',
              '--outline-color': 'rgb(253, 152, 129)',
            }}
          >
            <button
              onClick={function () {
                navigate('/')
              }}
            >
              Cancelar
            </button>
          </Input>
        </Fieldset>
      </div>
    </div>
  )
}
