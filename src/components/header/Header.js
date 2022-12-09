import { useState } from 'react'

import { Link, NavLink, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown as caret } from '@fortawesome/free-solid-svg-icons'
import { MenuButton, Menu, MenuList, MenuLink } from '@reach/menu-button'
import '@reach/menu-button/styles.css'
import { Drawer, IconButton } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { useSelector } from 'react-redux'

import { anchors, navlinks } from '../../assets/data/header'
import { routes } from '../../assets/data/routes'

import styles from './Header.module.css'
import Logo from '../../assets/images/logo.png'
import DrawerHeader from './DrawerHeader'
import DrawerList from './DrawerList'
import DrawerHeaderTablet from './DrawerHeaderTablet'
import { Input } from '../input/Input'

const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const navigate = useNavigate()

  const closeDrawer = () => {
    setIsDrawerOpen(false)
  }

  const departments = useSelector(state => state.departments.departments)
    .map((value, index) => {
      return { name: value.name, path: routes[index] }
    })

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
            ) : value.name === "Submissão de Protocolos" ? (
              <a href='https://cibs.uem.mz' target="_blank" rel="noreferrer">
                Submissão de Protocolos
              </a>
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
            <Input 
              style={{
                display: "inline-block", 
                // '--bg-color': 'rgb(252, 88, 50)',
                // '--bg-hover': 'rgb(252, 70, 29)',
                // '--bg-active': 'rgb(252, 88, 50)',
                // '--outline-color': 'rgb(253, 152, 129)',
              }}
            >
              <button style={{ padding: 11, borderRadius: 20}}>Consultas de Bioestatística</button>
            </Input>
            <Input 
              style={{
                display: "inline-block",
                marginTop: '1.4rem',
                '--bg-color': 'rgb(252, 88, 50)',
                '--bg-hover': 'rgb(252, 70, 29)',
                '--bg-active': 'rgb(252, 88, 50)',
                '--outline-color': 'rgb(253, 152, 129)',
              }}
            >
              <button style={{ padding: 11, borderRadius: 20 }}
                onClick={function() {
                  navigate("/signin")
                }}
              >
                {/* <Link to='/signin' style={{ color: 'white'}}> */}
                  Iniciar Sessão
                {/* </Link> */}
              </button>
            </Input>
          </div>
        </div>

        <div className={styles.nav}>
          <nav>
            <ul>
              <li>
                <NavLink className={({ isActive }) => isActive ? styles.active : null} to='/'>
                  Página Inicial
                </NavLink>
              </li>
              <li>
                <NavLink className={({ isActive }) => isActive ? styles.active : null} to='/about'>
                  Sobre nós
                </NavLink>
              </li>
              <li>
                <Menu>
                  <MenuButton>Ensino <FontAwesomeIcon icon={caret}></FontAwesomeIcon></MenuButton>
                  <MenuList className={styles.slideDown}>
                    <MenuLink as={Link} to='/graduation'>Graduação</MenuLink>
                    <MenuLink as={Link} to='/postgraduate'>Pós-Graduação</MenuLink>
                    <MenuLink as={Link} to='/minicourse'>Cursos de curta duração</MenuLink>
                  </MenuList>
                </Menu>
              </li>
              <li>
                <Menu>
                  <MenuButton>Investigação <FontAwesomeIcon icon={caret}></FontAwesomeIcon></MenuButton>
                  <MenuList className={styles.slideDown}>
                    <MenuLink as={Link} to='/projects'>Projectos de Pesquisa</MenuLink>
                    <MenuLink as={Link} to='/publications'>Publicações</MenuLink>
                  </MenuList>
                </Menu>
              </li>
              <li>
                <NavLink className={({ isActive }) => isActive ? styles.active : null} to='/extension'>
                  Extensão
                </NavLink>
              </li>
              <li>
                <Menu>
                  <MenuButton>Departamentos e Unidades <FontAwesomeIcon icon={caret}></FontAwesomeIcon></MenuButton>
                  <MenuList className={styles.slideDown}>
                    {departments.map((value, index) => (
                      <MenuLink key={index} as={Link} to={`/departments/${value.path}`}>{value.name}</MenuLink>
                    ))}
                  </MenuList>
                </Menu>
              </li>
              {/* <li>
                <NavLink className={({ isActive }) => isActive ? styles.active : null} to='/protocols'>
                  Submissão de Protocolos
                </NavLink>
              </li> */}
              <li>
                <a href='https://cibs.uem.mz' target="_blank" rel="noreferrer">
                  Submissão de Protocolos
                </a>
              </li>
              <li>
                <Menu>
                  <MenuButton>Links úteis <FontAwesomeIcon icon={caret}></FontAwesomeIcon></MenuButton>
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
                  Notícias
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