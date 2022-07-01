import { IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

import Logo from '../../assets/images/logo.png'

const DrawerHeader = ({ closeDrawer }) => {
  return (
    <div style={{ background: '#E6EFE6', position: 'relative' }}>
      <img
        src={Logo} alt=''
        style={{
          width: '10rem',
          background: '#E6EFE6',
          float: 'left',
          padding: '0.9rem 0.3rem'
        }}
      />
      <IconButton
        onClick={closeDrawer}
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          margin: '1rem 0.6rem'
        }}
      >
        <CloseIcon style={{ color: '#146F12' }} />
      </IconButton>
    </div>
  )
}

export default DrawerHeader