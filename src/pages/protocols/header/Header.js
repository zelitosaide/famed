import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown as caret } from '@fortawesome/free-solid-svg-icons'
import { MenuButton, Menu, MenuList, MenuLink } from '@reach/menu-button'
import { Drawer, IconButton } from '@mui/material'

import MenuIcon from '@mui/icons-material/Menu'
import '@reach/menu-button/styles.css'

import styles from './Header.module.css'
import Logo from '../../../assets/images/logo.png'
import { navlinks } from '../../../assets/data/protocols'
import DrawerHeader from './DrawerHeader'
import DrawerList from './DrawerList'
import DrawerHeaderTablet from './DrawerHeaderTablet'

const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const closeDrawer = () => {
    setIsDrawerOpen(false)
  }

  // RC - Conselho cientificos
  // RB - Conselho de Bioetica

  // https://above.co.mz/cibs/Objects/Employees/manageEmployees.php

  // https://above.co.mz/cibs/Objects/News/manageNews.php

  // https://above.co.mz/cibs/Objects/Events/manageEvents.php

  useEffect(() => {
    fetch('https://above.co.mz/cibs/Objects/Events/manageEvents.php')
      .then(response => response.json())
      .then(data => console.log(data))
  }, [])

  return (
    <div className={styles.header}>
      {/* Left Drawer */}
      <Drawer
        className={styles.top}
        anchor='left'
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        <DrawerHeader closeDrawer={closeDrawer} />
        <DrawerList list={navlinks} closeDrawer={closeDrawer} />
      </Drawer>

      {/* Right Drawer */}
      <Drawer
        className={styles.right}
        anchor='right'
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        <DrawerHeaderTablet closeDrawer={closeDrawer} />
        <DrawerList list={navlinks} closeDrawer={closeDrawer} />
      </Drawer>


      {/* Responsive Navbar (width: 1040) */}
      <ul className={styles.responsive}>
        <li>
          <Link to='/'><img src={Logo} alt='' /></Link>
        </li>

        {navlinks.map((value, index) => (
          <li key={index}>
            {!!value.subMenu ? (
              <Menu>
                <MenuButton>{value.name} <FontAwesomeIcon icon={caret}></FontAwesomeIcon></MenuButton>
                <MenuList className={styles.slideDown}>
                  {value.subMenu.map((v, i) => <MenuLink key={i} as={Link} to={v.to}>{v.name}</MenuLink>)}
                </MenuList>
              </Menu>
            ) : (
              <NavLink className={({ isActive }) => isActive ? styles.active : null} to={value.to}>
                {value.name}
              </NavLink>
            )}
          </li>
        ))}

        <li>
          <a href='https://cibs.uem.mz/'>
            Iniciar Submissão
          </a>
        </li>

        <li className={styles.menu} onClick={() => setIsDrawerOpen(true)}>
          <IconButton><MenuIcon /></IconButton>
        </li>
      </ul>

      {/* width: 1280 */}

      <div className={styles.blocks}>
        <div className={styles.heading}>
          <div className={styles.image}>
            <Link to='/'>
              <img src={Logo} alt='' />
            </Link>
          </div>

          <div className={styles.content}>
            <h2>Sistema Electrónico de Submissão de Protocolos</h2>
          </div>

          <div className={styles.actions}>
            <p
              style={{ color: '#146F12', fontSize: '0.9rem', display: 'inline-block', marginRight: '1rem' }}
            >
              Av. Salvador Allende nº 702
            </p>
            <button>
              <a href='https://cibs.uem.mz/'>
                Iniciar Submissão
              </a>
            </button>
          </div>
        </div>

        <div className={styles.nav}>
          <nav>
            <ul>
              <li>
                <Menu>
                  <MenuButton>Comité de Bioética <FontAwesomeIcon icon={caret}></FontAwesomeIcon></MenuButton>
                  <MenuList className={styles.slideDown}>
                    <MenuLink as={Link} to='/protocols'>Membros do Comité</MenuLink>
                  </MenuList>
                </Menu>
              </li>
              <li>
                <Menu>
                  <MenuButton>Conselho Científico <FontAwesomeIcon icon={caret}></FontAwesomeIcon></MenuButton>
                  <MenuList className={styles.slideDown}>
                    <MenuLink as={Link} to='/protocols'>Membros do Conselho</MenuLink>
                  </MenuList>
                </Menu>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  )
}

export default Header