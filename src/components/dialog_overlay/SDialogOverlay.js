import { AnimatePresence, motion } from 'framer-motion'

export const SDialogOverlay = ({
  children,
  visible,
  setVisible,
  backdrop,
  ...props
}) => {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          style={dialogOverlay}
          onClick={() => !!backdrop && setVisible()}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            style={{ marginLeft: !!props.center ? 0 : '13rem' }}
            initial={{ y: -10 }}
            animate={{ y: 0 }}
            exit={{ y: 10 }}
            transition={{ type: 'tween' }}
          >
            <div
              {...props}
              style={{
                ...dialogContent,
                ...props.style,
                margin: !!props.center ? '160px auto 0' : '100px auto 0',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

const dialogOverlay = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  overflow: 'auto',
  background: 'rgba(0, 0, 0, 0.33)',
  zIndex: 2000,
}

const dialogContent = {
  position: 'relative',
  background: 'white',
  width: '24rem',
  borderRadius: 'var(--border-radius-large)',
  minHeight: '10rem',
}
