import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, List, ListItem, ListItemText, ListItemButton, Collapse } from '@mui/material'

import { createTheme, ThemeProvider } from '@mui/material/styles'

import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ExpandMore from '@mui/icons-material/ExpandMore'

const theme = createTheme({
  typography: {
    fontFamily: ['Montserrat'].join(',')
  },
})

const DrawerList = ({ list, closeDrawer }) => {
  const [open, setOpen] = useState(null)
  const navigate = useNavigate()

  const toggle = (value) => {
    if (open && open === value.name) {
      setOpen(null)
    } else {
      setOpen(value.name)
    }
  }

  const handleClick = (value) => {
    closeDrawer()
    navigate(value.to)
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{
        fontFamily: 'Montserrat',
        background: '#146F12',
        color: '#CFE1CF',
        overflowY: 'auto',
        scrollbarWidth: 'thin',
        borderTop: '1px solid #428C41'
      }}>
        <List style={{ minWidth: '200px' }}>
          {list.map(value => !!value.subMenu ? (
            <div key={value.name}>
              <ListItem disablePadding>
                <ListItemButton onClick={() => toggle(value)}>
                  <ListItemText>
                    <Box sx={{ typography: 'body2', fontWeight: 'bold' }}>{value.name}</Box>
                  </ListItemText>
                  {open === value.name
                    ? <ExpandMore sx={{ fontSize: '1.2rem' }} />
                    : <ChevronRightIcon style={{ fontSize: '1.2rem' }} />
                  }
                </ListItemButton>
              </ListItem>
              <Collapse in={open === value.name} timeout='auto' unmountOnExit>
                <List disablePadding>
                  {value.subMenu.map(v => (
                    <ListItemButton
                      onClick={() => handleClick(v)}
                      key={v.name}
                      sx={{ pl: 4, pt: '0.2rem', pb: '0.2rem' }}
                    >
                      <ListItemText>
                        <Box sx={{ typography: 'subtitle2', color: '#9FC49E' }}>{v.name}</Box>
                      </ListItemText>
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            </div>
          ) : (
            <ListItem disablePadding key={value.name}>
              <ListItemButton onClick={() => handleClick(value)}>
                <ListItemText>
                  <Box sx={{ typography: 'body2', fontWeight: '600' }}>{value.name}</Box>
                </ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText>
                <Box sx={{ typography: 'body2', fontWeight: '600' }}>
                  <a style={{ color: '#CFE1CF' }} href='https://cibs.uem.mz/'>
                    Iniciar Submissão
                  </a>
                </Box>
              </ListItemText>
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </ThemeProvider >
  )
}

export default DrawerList