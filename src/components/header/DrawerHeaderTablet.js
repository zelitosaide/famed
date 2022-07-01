import { IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

const DrawerHeaderTablet = ({ closeDrawer }) => {
  return (
    <div style={{ background: '#146F12' }}>
      <IconButton
        onClick={closeDrawer}
        style={{margin: '1.4rem 0.6rem' }}
      >
        <CloseIcon style={{ color: 'white' }} />
      </IconButton>
    </div>
  )
}

export default DrawerHeaderTablet