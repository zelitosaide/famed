import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { createTheme, ThemeProvider } from '@mui/material/styles'

import TableContainer from '@mui/material/TableContainer'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'

import { useTheme } from '@mui/material/styles'
import TableFooter from '@mui/material/TableFooter'
import TablePagination from '@mui/material/TablePagination'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import FirstPageIcon from '@mui/icons-material/FirstPage'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
import LastPageIcon from '@mui/icons-material/LastPage'

import styles from './Projects.module.css'
import { deleteProject, fetchProjects } from './projectsSlice'
import { Input } from '../../components/input/Input'
import { Fieldset } from '../../components/fieldset/Fieldset'
import { Modal } from '../../components/modal/Modal'
import { Notification } from '../../components/notification/Notification'

const theme = createTheme({
  typography: {
    fontFamily: ['Montserrat'].join(','),
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
          color: 'var(--main-font-color)',
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
          justifyContent: 'center',
        },
        select: {
          paddingLeft: 0,
        },
      },
    },
  },
})

const ProjectTable = () => {
  const [openModal, setOpenModal] = useState(false)
  const [selectedId, setSelectedId] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [openErrorNotification, setOpenErrorNotification] = useState(false)
  const [openSuccessNotification, setOpenSuccessNotification] = useState(false)

  const currentUser = JSON.parse(localStorage.getItem('famedv1_user'))
  const canDelete = currentUser.user.roles.admin

  const projects = useSelector((state) => state.projects.projects)

  const orderedProjects = projects
    .slice()
    .sort((a, b) => a.startDate.localeCompare(b.startDate))

  // const projects = useSelector(state => {
  //   if (canDelete) {
  //     return state.projects.projects
  //   } else {
  //     const userId = currentUser.user._id
  //     return state.projects.projects.filter(project => project.userId === userId)
  //   }
  // })

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(8)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - orderedProjects.length)
      : 0

  const status = useSelector((state) => state.projects.status)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (status === 'idle') dispatch(fetchProjects())
  }, [status, dispatch])

  const [deleteStatus, setDeleteStatus] = useState('idle')
  const [selectedProject, setSelectedProject] = useState('')

  const handleRemove = async () => {
    setOpenModal(false)

    if (canDelete) {
      try {
        setSelectedProject(selectedId)
        setDeleteStatus('pending')
        setOpenErrorNotification(false)
        await dispatch(deleteProject(selectedId)).unwrap()
        openAndAutoClose()
      } catch (error) {
        setErrorMessage(error.message)
        setOpenErrorNotification(true)
      } finally {
        setDeleteStatus('idle')
      }
    }
  }

  const openAndAutoClose = () => {
    setOpenSuccessNotification(true)
    setTimeout(() => {
      setOpenSuccessNotification(false)
    }, 14000)
  }

  return (
    <div className={`${styles.projectTable} ${styles.responsive}`}>
      <div style={{ padding: '2rem' }}>
        <Fieldset legend="Tabela de Projectos" style={{ marginRight: 0 }}>
          <Modal
            setVisible={() => setOpenModal(false)}
            visible={openModal}
            handleRemove={handleRemove}
            title="Remover Projecto"
            text="Tem certeza de que deseja remover o Projecto? Todos os dados serão removidos permanentemente. Essa ação não pode ser desfeita."
          />

          <Notification
            visible={openErrorNotification}
            setVisible={setOpenErrorNotification}
            text={errorMessage}
            title="Erro de remoção"
            type="Error"
          />

          <Notification
            visible={openSuccessNotification}
            setVisible={setOpenSuccessNotification}
            text="O Projecto foi excluído com sucesso."
            title="Excluído com sucesso!"
          />

          <ThemeProvider theme={theme}>
            <TableContainer
              sx={{ fontFamily: 'Montserrat', fontSize: '14px' }}
              variant="outlined"
            >
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{
                        color: 'var(--main-font-color)',
                        fontSize: 'var(--main-font-size)',
                        fontWeight: 'var(--bold-font-weight)',
                      }}
                      style={{ width: '20rem' }}
                    >
                      Título do Projecto
                    </TableCell>

                    <TableCell
                      sx={{
                        color: 'var(--main-font-color)',
                        fontSize: 'var(--main-font-size)',
                        fontWeight: 'var(--bold-font-weight)',
                      }}
                      style={{ width: '8.5rem' }}
                    >
                      Data de Início
                    </TableCell>

                    <TableCell
                      sx={{
                        color: 'var(--main-font-color)',
                        fontSize: 'var(--main-font-size)',
                        fontWeight: 'var(--bold-font-weight)',
                      }}
                      style={{ width: '8rem' }}
                    >
                      Data de Fim
                    </TableCell>

                    <TableCell
                      sx={{
                        color: 'var(--main-font-color)',
                        fontSize: 'var(--main-font-size)',
                        fontWeight: 'var(--bold-font-weight)',
                      }}
                    >
                      Financiador
                    </TableCell>

                    <TableCell
                      sx={{
                        color: 'var(--main-font-color)',
                        fontSize: 'var(--main-font-size)',
                        fontWeight: 'var(--bold-font-weight)',
                      }}
                      style={{ width: '9rem' }}
                      align="right"
                    >
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {!!orderedProjects.length ? (
                    (rowsPerPage > 0
                      ? orderedProjects.slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                      : orderedProjects
                    ).map((project) => (
                      <TableRow key={project._id}>
                        <TableCell
                          sx={{
                            color: 'var(--main-font-color)',
                            fontSize: 'var(--main-font-size)',
                            fontWeight: 'var(--main-font-weight)',
                          }}
                        >
                          {project.title.length > 40
                            ? `${project.title.substring(0, 40)} ...`
                            : project.title}
                        </TableCell>

                        <TableCell
                          sx={{
                            color: 'var(--main-font-color)',
                            fontSize: 'var(--main-font-size)',
                            fontWeight: 'var(--main-font-weight)',
                          }}
                        >
                          {project.startDate.split('T')[0]}
                        </TableCell>

                        <TableCell
                          sx={{
                            color: 'var(--main-font-color)',
                            fontSize: 'var(--main-font-size)',
                            fontWeight: 'var(--main-font-weight)',
                          }}
                        >
                          {project.endDate.split('T')[0]}
                        </TableCell>

                        <TableCell
                          sx={{
                            color: 'var(--main-font-color)',
                            fontSize: 'var(--main-font-size)',
                            fontWeight: 'var(--main-font-weight)',
                          }}
                        >
                          {project.financier
                            ? project.financier.name.length > 25
                              ? `${project.financier.name.substring(0, 25)} ...`
                              : project.financier.name
                            : project.financiers.length > 0
                            ? project.financiers[0].name.length > 25
                              ? `${project.financiers[0].name.substring(
                                  0,
                                  25
                                )} ...`
                              : project.financiers[0].name
                            : 'Nenhum financiador'}
                        </TableCell>

                        <TableCell
                          sx={{
                            color: 'var(--main-font-color)',
                            fontSize: 'var(--main-font-size)',
                            fontWeight: 'var(--main-font-weight)',
                          }}
                          align="right"
                        >
                          <Input
                            style={{
                              display: 'inline-block',
                              padding: 0,
                              '--outline-color': '#fff',
                            }}
                          >
                            <button
                              style={{
                                padding: 0,
                                marginLeft: '0.5rem',
                                background: 'none',
                                border: 'none',
                                color: '#146F12',
                                fontWeight: 'var(--main-font-weight)',
                              }}
                              className={styles.editBtn}
                              onClick={() =>
                                navigate(
                                  `/dashboard/projects/edit/${project._id}`
                                )
                              }
                              disabled={deleteStatus === 'pending'}
                            >
                              Edit
                            </button>
                          </Input>

                          <Input
                            style={{
                              display: 'inline-block',
                              padding: 0,
                              '--outline-color': '#fff',
                            }}
                          >
                            <button
                              style={{
                                padding: 0,
                                marginLeft: '0.5rem',
                                background: 'none',
                                border: 'none',
                                color: 'rgb(252, 88, 50)',
                                fontWeight: 'var(--main-font-weight)',
                              }}
                              className={styles.deleteBtn}
                              onClick={() => {
                                setOpenModal(true)
                                setSelectedId(project._id)
                              }}
                              disabled={
                                !canDelete || deleteStatus === 'pending'
                              }
                            >
                              {selectedProject === project._id &&
                              deleteStatus === 'pending'
                                ? 'Deleting...'
                                : 'Delete'}
                            </button>
                          </Input>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell rowSpan={5}>No Project to show</TableCell>
                    </TableRow>
                  )}

                  {emptyRows > 0 && (
                    <TableRow style={{ height: 31 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                <TableFooter>
                  <TableRow
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell style={{ paddingLeft: 10 }}>
                      <Input
                        style={{
                          paddingTop: '0.8rem',
                          paddingLeft: 0,
                          display: 'inline-block',
                        }}
                      >
                        <button
                          className={styles.addbtn}
                          onClick={() => navigate('/dashboard/projects/create')}
                          disabled={deleteStatus === 'pending'}
                        >
                          Adicionar Projecto
                        </button>
                      </Input>
                    </TableCell>

                    <TablePagination
                      rowsPerPageOptions={[8, 9]}
                      colSpan={5}
                      count={orderedProjects.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      SelectProps={{
                        inputProps: { 'aria-label': 'rows per page' },
                      }}
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

export default ProjectTable

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
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? (
          <LastPageIcon
            style={{
              fontSize: 'var(--main-font-size)',
              color: 'var(--main-font-color)',
            }}
          />
        ) : (
          <FirstPageIcon
            style={{
              fontSize: 'var(--main-font-size)',
              color: 'var(--main-font-color)',
            }}
          />
        )}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowRight
            style={{
              fontSize: 'var(--main-font-size)',
              color: 'var(--main-font-color)',
            }}
          />
        ) : (
          <KeyboardArrowLeft
            style={{
              fontSize: 'var(--main-font-size)',
              color: 'var(--main-font-color)',
            }}
          />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowLeft
            style={{
              fontSize: 'var(--main-font-size)',
              color: 'var(--main-font-color)',
            }}
          />
        ) : (
          <KeyboardArrowRight
            style={{
              fontSize: 'var(--main-font-size)',
              color: 'var(--main-font-color)',
            }}
          />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? (
          <FirstPageIcon
            style={{
              fontSize: 'var(--main-font-size)',
              color: 'var(--main-font-color)',
            }}
          />
        ) : (
          <LastPageIcon
            style={{
              fontSize: 'var(--main-font-size)',
              color: 'var(--main-font-color)',
            }}
          />
        )}
      </IconButton>
    </Box>
  )
}
