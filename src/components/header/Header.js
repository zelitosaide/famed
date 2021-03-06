import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown as caret } from '@fortawesome/free-solid-svg-icons'
import { MenuButton, Menu, MenuList, MenuLink } from '@reach/menu-button'
import '@reach/menu-button/styles.css'
import { Drawer, IconButton } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'

import styles from './Header.module.css'
import Logo from '../../assets/images/logo.png'
import { anchors, navlinks } from '../../assets/data/header'
import DrawerHeader from './DrawerHeader'
import DrawerList from './DrawerList'
import DrawerHeaderTablet from './DrawerHeaderTablet'


const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const closeDrawer = () => {
    setIsDrawerOpen(false)
  }

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

        {navlinks.map(value => (
          <li key={value.name}>
            {!!value.subMenu ? (
              <Menu>
                <MenuButton>{value.name} <FontAwesomeIcon icon={caret}></FontAwesomeIcon></MenuButton>
                <MenuList className={styles.slideDown}>
                  {value.subMenu.map(v => <MenuLink key={v.name} as={Link} to={v.to}>{v.name}</MenuLink>)}
                </MenuList>
              </Menu>
            ) : (
              <NavLink className={({ isActive }) => isActive ? styles.active : null} to={value.to}>
                {value.name}
              </NavLink>
            )}
          </li>
        ))}

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
            <h2>Faculdade de Medicina, UEM</h2>
          </div>

          <div className={styles.actions}>
            <p
              style={{
                color: '#146F12',
                fontSize: '0.9rem',
                display: 'inline-block',
                marginRight: '1rem'
              }}
            >
              {/* info@med.uem.mz &nbsp;|&nbsp;  */}
              Av. Salvador Allende n?? 702
            </p>
            <button>
              <Link to='/signin'>
                Iniciar Sess??o
              </Link>
            </button>
          </div>
        </div>

        <div className={styles.nav}>
          <nav>
            <ul>
              <li>
                <NavLink className={({ isActive }) => isActive ? styles.active : null} to='/'>
                  P??gina Inicial
                </NavLink>
              </li>
              <li>
                <NavLink className={({ isActive }) => isActive ? styles.active : null} to='/about'>
                  Sobre n??s
                </NavLink>
              </li>
              <li>
                <Menu>
                  <MenuButton>Ensino <FontAwesomeIcon icon={caret}></FontAwesomeIcon></MenuButton>
                  <MenuList className={styles.slideDown}>
                    <MenuLink as={Link} to='/graduation'>Gradua????o</MenuLink>
                    <MenuLink as={Link} to='/postgraduate'>P??s-Gradua????o</MenuLink>
                    <MenuLink as={Link} to='/minicourse'>Cursos de curta dura????o</MenuLink>
                  </MenuList>
                </Menu>
              </li>
              <li>
                <Menu>
                  <MenuButton>Investiga????o <FontAwesomeIcon icon={caret}></FontAwesomeIcon></MenuButton>
                  <MenuList className={styles.slideDown}>
                    <MenuLink as={Link} to='/projects'>Projectos de Pesquisa</MenuLink>
                    <MenuLink as={Link} to='/publications'>Publica????es</MenuLink>
                  </MenuList>
                </Menu>
              </li>
              <li>
                <NavLink className={({ isActive }) => isActive ? styles.active : null} to='/extension'>
                  Extens??o
                </NavLink>
              </li>
              <li>
                <NavLink className={({ isActive }) => isActive ? styles.active : null} to='/departments'>
                  Departamentos
                </NavLink>
              </li>
              <li>
                <NavLink className={({ isActive }) => isActive ? styles.active : null} to='/protocols'>
                  Submiss??o de Protocolos
                </NavLink>
              </li>
              <li>
                <Menu>
                  <MenuButton>Links ??teis <FontAwesomeIcon icon={caret}></FontAwesomeIcon></MenuButton>
                  <MenuList className={styles.slideDown}>
                    {anchors.map(value => (
                      <MenuLink key={value.name} as='a' target='_blank' href={value.href}>
                        {value.name}
                      </MenuLink>
                    ))}
                  </MenuList>
                </Menu>
              </li>
              <li>
                <NavLink className={({ isActive }) => isActive ? styles.active : null} to='/news'>
                  Not??cias
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  )
}

export default Header