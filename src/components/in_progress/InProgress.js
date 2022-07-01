import { Link } from 'react-router-dom'
import styles from './InProgress.module.css'

const InProgress = () => {
  return (
    <div style={{ paddingTop: '7rem', paddingBottom: '10rem' }}>
      <div className='row'>
        <div style={{ background: '#E6EFE6', height: '22rem' }}>
          <p className={styles.title}>
            Information related to this page is being processed. Will be available shortly. You can access our done pages below:
          </p>

          <ul className={styles.ul} style={{ marginTop: '1.5rem', paddingLeft:'1rem' }}>
            <li><Link style={estilos} to='/'>Home Page</Link></li>
            <li><Link style={estilos} to='/projects'>Projectos de Pesquisa</Link></li>
            <li><Link style={estilos} to='/publications'>Publicações</Link></li>
            <li><Link style={estilos} to='/news'>Noticias</Link></li>
            <li><Link style={estilos} to='/signin'>Sign In</Link></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default InProgress


const estilos = {
  color: '#000000',
  fontWeight: '600',
  marginBottom: '0.5rem',
  display: 'block',
}