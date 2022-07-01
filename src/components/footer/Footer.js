import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import styles from './Footer.module.css'

import { contactLocation, linksUteis, socialNetworks } from '../../assets/data/footer'

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.mobile}>
        <div className='row'>

        </div>
      </div>

      <div className={styles.desktop}>
        <div className='row'>
          <div className={styles.row}>
            <div className={styles.column}>
              <h1>Faculdade de Medicina, UEM</h1>
              <ul>
                <li><Link to='/about'><span>Nossa missão</span></Link></li>
                <li><Link to='/about'><span>Nossa visão</span></Link></li>
                <li><Link to='/about'><span>Nossos valores</span></Link></li>
              </ul>
              <h2>Siga-nos</h2>
              <div className={styles.socialNetworks}>
                <ul>
                  {socialNetworks.map((value) => (
                    <li key={value.id}>
                      <a href={value.url} target='_blank' rel='noreferrer'>
                        <FontAwesomeIcon icon={value.icon}></FontAwesomeIcon>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <p className={styles.coptRight}>Copyright © 2021 FAMED - UEM</p>
            </div>
            <div className={styles.column}>
              <h1>Links úteis</h1>
              <ul>
                {linksUteis.map((value) => (
                  <li key={value.id}>
                    <a href={value.url} target='_blank' rel="noreferrer">
                      <span>{value.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.column}>
              <h1>Contacto</h1>
              <ul>
                {contactLocation.map((value) => (
                  <li key={value.id}><span>{value.name}</span></li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer