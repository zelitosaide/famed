import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { Column } from '../../components/column/Column'
import { Fieldset } from '../../components/fieldset/Fieldset'
import { Input } from '../../components/input/Input'
import { Row } from '../../components/row/Row'

export function ConsultasBioestatiscas() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      date: '',
      title: '',
      description: '',
    },
  })

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

  const onSubmit = async (data) => {
    try {
    } catch (error) {
    } finally {
    }
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
            marginBottom: '2rem',
          }}
        >
          Formulário de requisição de Consulta de Bioestatística
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Fieldset
            legend="Formulário de requisição de Consulta de Bioestatística"
            style={{ margin: 0, background: '#F3F4F6' }}
          >
            <Row>
              <Column style={{ width: '33.33%' }}>
                <Input
                  label="Nome Completo"
                  required
                  error={errors.name?.message}
                >
                  <input
                    type="text"
                    id="Nome Completo"
                    {...register('name', {
                      required: 'Este campo é obrigatório',
                    })}
                  />
                </Input>
              </Column>
              <Column style={{ width: '33.33%' }}>
                <Input label="Email" required error={errors.email?.message}>
                  <input
                    type="email"
                    id="Email"
                    {...register('email', {
                      required: 'Este campo é obrigatório',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Endereço de email invalido.',
                      },
                    })}
                  />
                </Input>
              </Column>
              <Column style={{ width: '33.33%' }}>
                <Input
                  label="Contacto telemóvel"
                  required
                  error={errors.phone?.message}
                >
                  <input
                    type="text"
                    id="Contacto telemóvel"
                    {...register('phone', {
                      required: 'Este campo é obrigatório',
                    })}
                  />
                </Input>
              </Column>
            </Row>
            <Row>
              <Column style={{ width: '50%' }}>
                <Input
                  label="Marque a sua consulta (apenas em todas Quarta-feira, das 16-18h)"
                  required
                  error={errors.date?.message}
                >
                  <input
                    type="date"
                    id="Marque a sua consulta (apenas em todas Quarta-feira, das 16-18h)"
                    {...register('date', {
                      required: 'Este campo é obrigatório',
                      validate: (value) => {
                        const weekday = Intl.DateTimeFormat('en-US', {
                          weekday: 'long',
                        }).format(new Date(value))
                        console.log(weekday)
                        return (
                          weekday === 'Wednesday' ||
                          'Data inválida. Disponibilidade apenas nas Quarta-feira'
                        )
                      },
                    })}
                  />
                </Input>
              </Column>
              <Column style={{ width: '50%' }}>
                <Input
                  label="Tópico de consulta"
                  required
                  error={errors.title?.message}
                >
                  <select
                    id="Tópico de consulta"
                    {...register('title', {
                      required: 'Este campo é obrigatório',
                    })}
                  >
                    {topicos.map(function (item) {
                      return <option key={item}>{item}</option>
                    })}
                  </select>
                </Input>
              </Column>
            </Row>
            <Input
              label="Resumo da pesquisa (deixar um espaço com pelo menos 10 linhas)"
              required
              error={errors.description?.message}
            >
              <textarea
                id="Resumo da pesquisa (deixar um espaço com pelo menos 10 linhas)"
                {...register('description', {
                  required: 'Este campo é obrigatório',
                })}
              />
            </Input>
            <Input style={{ display: 'inline-block' }}>
              <button type="submit">Marcar</button>
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
                type="button"
                onClick={function () {
                  navigate('/')
                }}
              >
                Cancelar
              </button>
            </Input>
          </Fieldset>
        </form>
      </div>
    </div>
  )
}
