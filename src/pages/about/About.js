import styles from './About.module.css'
import Image from '../../assets/images/bg_principal.jpg'

const About = () => {
  return (
    <div className={`${styles.about} ${styles.responsive}`}>
      <div className={styles.gap}></div>

      <div className='row'>
        <div className={styles.container}>
          <img src={Image} alt='' />

          <div className={styles.info}>
            <p className={styles.title}>---Faculdade de Medicina: Visão geral e história---</p>

            <p>
              A Faculdade de Medicina foi fundada em 1963 e em 1970 graduou o primeiro grupo de Médicos formado em Moçambique. Desde o início, a instituição concentrou-se na oferta do curso de graduação em Medicina tendo formado até a data mais de dois mil médicos. Até meados dos anos 1990 era a única instituição no país responsável pela formação de médicos. Hoje existem outras instituições públicas e privadas que também se dedicam à formação de médicos.
            </p>

            <p>
              Ao longo de cerca de meio século de existência, a Faculdade de Medicina da UEM passou por várias reformas académicas e administrativas de acordo com os desafios e especificidades das diferentes épocas da história do país. Por isso, ela é um repositório de experiencias e competências acumuladas nos intervenientes, nos processos e na memória institucional. Isso confere-nos a obrigação moral de assumir o papel dianteiro e de alento para as outras instituições de formação de médicos no país.
            </p>

            <p className={styles.title}>Nossa missão</p>

            <p>
              Ser uma instituição que contribua para a promoção da saúde do indivíduo e da comunidade de Moçambique, de África e do Mundo em geral, com recurso a técnicas e estratégias actuais, através: <span>i)</span> Da formação de médicos e de outros profissionais de saúde e áreas afins; <span>ii)</span> Do desenvolvimento de pesquisas inovadoras e apoiando na transformação das evidências das pesquisas em políticas e práticas; e <span>iii)</span> Da prestação de serviços com competência ético-profissional de excelência às comunidades locais no país, em África e no Mundo.
            </p>

            <p className={styles.title}>Nossa Visão</p>

            <p>
              A Visão da Faculdade de Medicina da Universidade Eduardo Mondlane é de:
              Ser uma instituição de excelência na formação de médicos e de outros profissionais de saúde e áreas afins e de referência na investigação e extensão, contribuindo para a saúde e bem-estar do indivíduo e da comunidade de Moçambique, de África e do Mundo em geral.
            </p>

            <p className={styles.title}>Nossos Valores</p>

            <p>
              São Valores da Faculdade de Medicina: Liberdade Académica; Ética e Imparcialidade; Colegialidade; Engajamento Social e Comunitário e Autonomia Institucional.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About