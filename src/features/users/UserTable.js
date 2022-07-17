import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import TableContainer from '@mui/material/TableContainer'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import TableFooter from '@mui/material/TableFooter'
import TablePagination from '@mui/material/TablePagination'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import FirstPageIcon from '@mui/icons-material/FirstPage'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
import LastPageIcon from '@mui/icons-material/LastPage'

import { useTheme } from '@mui/material/styles'
import { createTheme, ThemeProvider } from '@mui/material/styles'

import styles from './Users.module.css'
import { deleteUser, fetchUsers } from './usersSlice'
import { Modal } from '../../components/modal/Modal'
import { Fieldset } from '../../components/fieldset/Fieldset'
import { Input } from '../../components/input/Input'
import { Notification } from '../../components/notification/Notification'

const theme = createTheme({
  typography: {
    fontFamily: ['Montserrat'].join(',')
  },
  components: {
    MuiTablePagination: {
      styleOverrides: {
        root: {
          fontSize: 'var(--main-font-size)',
          color: 'var(--main-font-color)',
        },
        selectLabel: {
          fontSize: 'var(--main-font-size)',
          color: 'var(--main-font-color)',
        },
        displayedRows: {
          fontSize: 'var(--main-font-size)',
          color: 'var(--main-font-color)'
        },
        selectIcon: {
          fontSize: '1.2rem',
          color: 'var(--main-font-color)',
        },
        menuItem: {
          fontSize: 'var(--main-font-size)',
          color: 'var(--main-font-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        },
        select: {
          paddingLeft: 0
        }
      }
    }
  }
})


const UserTable = () => {
  const [openModal, setOpenModal] = useState(false)
  const [selectedId, setSelectedId] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [openErrorNotification, setOpenErrorNotification] = useState(false)
  const [openSuccessNotification, setOpenSuccessNotification] = useState(false)

  const users = useSelector(state => state.users.users)

  const orderedUsers = users.slice().reverse()

  const status = useSelector(state => state.users.status)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(8)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - orderedUsers.length) : 0

  useEffect(() => {
    if (status === 'idle') dispatch(fetchUsers())
  }, [status, dispatch])

  const [deleteStatus, setDeleteStatus] = useState('idle')
  const [selectedUser, setSelectedUser] = useState('')

  const currentUser = JSON.parse(localStorage.getItem('famedv1_user'))
  const canDelete = currentUser.user.roles.admin

  const openAndAutoClose = () => {
    setOpenSuccessNotification(true)
    setTimeout(() => {
      setOpenSuccessNotification(false)
    }, 14000)
  }

  const handleRemove = async () => {
    setOpenModal(false)

    if (canDelete) {
      try {
        setSelectedUser(selectedId)
        setDeleteStatus('pending')
        setOpenErrorNotification(false)
        await dispatch(deleteUser(selectedId)).unwrap()
        openAndAutoClose()
      } catch (error) {
        setErrorMessage(error.message)
        setOpenErrorNotification(true)
      } finally {
        setDeleteStatus('idle')
      }
    }
  }

  return (
    <div className={`${styles.userTable} ${styles.responsive}`}>
      <div style={{ padding: '2rem' }}>
        <Fieldset legend='Tabela de Usuários' style={{ marginRight: 0 }}>
          <Modal
            setVisible={() => setOpenModal(false)}
            visible={openModal}
            handleRemove={handleRemove}
            title='Remover usuário'
            text='Tem certeza de que deseja remover a conta? Todos os dados serão removidos permanentemente. Essa ação não pode ser desfeita.'
          />

          <Notification
            visible={openErrorNotification}
            setVisible={setOpenErrorNotification}
            text={errorMessage}
            title='Erro de remoção'
            type='Error'
          />

          <Notification
            visible={openSuccessNotification}
            setVisible={setOpenSuccessNotification}
            text='O usuário foi excluído com sucesso.'
            title='Excluído com sucesso!'
          />

          <ThemeProvider theme={theme}>
            <TableContainer sx={{ fontFamily: 'Montserrat', fontSize: '14px' }} variant='outlined'>
              <Table size='small'>
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{
                        color: 'var(--main-font-color)',
                        fontSize: 'var(--main-font-size)',
                        fontWeight: 'var(--bold-font-weight)'
                      }}
                    >Name</TableCell>

                    <TableCell
                      sx={{
                        color: 'var(--main-font-color)',
                        fontSize: 'var(--main-font-size)',
                        fontWeight: 'var(--bold-font-weight)'
                      }}
                    >Email</TableCell>

                    <TableCell
                      sx={{
                        color: 'var(--main-font-color)',
                        fontSize: 'var(--main-font-size)',
                        fontWeight: 'var(--bold-font-weight)'
                      }}
                      style={{ width: '10rem' }}
                    >Roles</TableCell>

                    <TableCell
                      sx={{
                        color: 'var(--main-font-color)',
                        fontSize: 'var(--main-font-size)',
                        fontWeight: 'var(--bold-font-weight)'
                      }}
                      style={{ width: '12rem' }}
                      align='right'
                    >Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {!!orderedUsers.length && (
                    rowsPerPage > 0
                      ? orderedUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      : orderedUsers
                  ).map(user => {
                    const roles = Object.entries(user.roles).map(
                      ([name, value]) => value ? name : null
                    ).filter(role => role)

                    const name = `${user.firstName} ${user.lastName}`

                    return (
                      <TableRow key={user._id}>
                        <TableCell
                          sx={{
                            color: 'var(--main-font-color)',
                            fontSize: 'var(--main-font-size)',
                            fontWeight: 'var(--main-font-weight)'
                          }}
                        >
                          {name.length > 40 ? `${name.substring(0, 40)} ...` : name}
                        </TableCell>

                        <TableCell
                          sx={{
                            color: 'var(--main-font-color)',
                            fontSize: 'var(--main-font-size)',
                            fontWeight: 'var(--main-font-weight)'
                          }}
                        >
                          {user.email}
                        </TableCell>

                        <TableCell
                          sx={{
                            color: 'var(--main-font-color)',
                            fontSize: 'var(--main-font-size)',
                            fontWeight: 'var(--main-font-weight)'
                          }}
                        >
                          {roles.toString()}
                        </TableCell>

                        <TableCell
                          sx={{
                            color: 'var(--main-font-color)',
                            fontSize: 'var(--main-font-size)',
                            fontWeight: 'var(--main-font-weight)'
                          }}
                          align='right'>

                          <Input style={{ display: 'inline-block', padding: 0, '--outline-color': '#fff' }}>
                            <button
                              style={{
                                padding: 0,
                                marginLeft: '0.5rem',
                                background: 'none',
                                border: 'none',
                                color: '#146F12',
                                fontWeight: 'var(--main-font-weight)'
                              }}
                              className={styles.editBtn}
                              onClick={() => navigate(`/dashboard/users/edit/${user._id}`)}
                              disabled={deleteStatus === 'pending'}
                            >
                              Edit
                            </button>
                          </Input>

                          <Input style={{ display: 'inline-block', padding: 0, '--outline-color': '#fff' }}>
                            <button
                              style={{
                                padding: 0,
                                marginLeft: '0.5rem',
                                background: 'none',
                                border: 'none',
                                color: 'rgb(252, 88, 50)',
                                fontWeight: 'var(--main-font-weight)'
                              }}
                              className={styles.deleteBtn}
                              onClick={() => { setOpenModal(true); setSelectedId(user._id) }}
                              disabled={!canDelete || deleteStatus === 'pending'}
                            >
                              {selectedUser === user._id && deleteStatus === 'pending'
                                ? 'Deleting...'
                                : 'Delete'
                              }
                            </button>
                          </Input>
                        </TableCell>
                      </TableRow>
                    )
                  })}

                  {emptyRows > 0 && (
                    <TableRow style={{ height: 29.7 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                <TableFooter>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell style={{ paddingLeft: 10 }}>
                      <Input style={{ paddingTop: '0.8rem', paddingLeft: 0, display: 'inline-block' }}>
                        <button className={styles.addbtn} onClick={() => navigate('/dashboard/users/create')}>
                          Adicionar Usuário
                        </button>
                      </Input>
                    </TableCell>

                    <TablePagination
                      rowsPerPageOptions={[8, 9]}
                      colSpan={4}
                      count={orderedUsers.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      SelectProps={{ inputProps: { 'aria-label': 'rows per page' } }}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                      ActionsComponent={TablePaginationActions}
                    />
                  </TableRow>
                </TableFooter>
              </Table>
            </TableContainer>
          </ThemeProvider>
        </Fieldset>
      </div>
    </div>
  )
}

export default UserTable


const TablePaginationActions = (props) => {
  const theme = useTheme()
  const { count, page, rowsPerPage, onPageChange } = props

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0)
  }

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1)
  }

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1)
  }

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1))
  }

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label='first page'
      >
        {theme.direction === 'rtl' ?
          <LastPageIcon
            style={{
              fontSize: 'var(--main-font-size)',
              color: 'var(--main-font-color)',
            }}
          />
          :
          <FirstPageIcon
            style={{
              fontSize: 'var(--main-font-size)',
              color: 'var(--main-font-color)',
            }}
          />
        }
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label='previous page'
      >
        {theme.direction === 'rtl' ?
          <KeyboardArrowRight
            style={{
              fontSize: 'var(--main-font-size)',
              color: 'var(--main-font-color)',
            }}
          />
          :
          <KeyboardArrowLeft
            style={{
              fontSize: 'var(--main-font-size)',
              color: 'var(--main-font-color)',
            }}
          />
        }
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label='next page'
      >
        {theme.direction === 'rtl' ?
          <KeyboardArrowLeft
            style={{
              fontSize: 'var(--main-font-size)',
              color: 'var(--main-font-color)',
            }}
          />
          :
          <KeyboardArrowRight
            style={{
              fontSize: 'var(--main-font-size)',
              color: 'var(--main-font-color)',
            }}
          />
        }
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label='last page'
      >
        {theme.direction === 'rtl' ?
          <FirstPageIcon
            style={{
              fontSize: 'var(--main-font-size)',
              color: 'var(--main-font-color)',
            }}
          />
          :
          <LastPageIcon
            style={{
              fontSize: 'var(--main-font-size)',
              color: 'var(--main-font-color)',
            }}
          />
        }
      </IconButton>
    </Box>
  )
}