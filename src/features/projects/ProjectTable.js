import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { createTheme, ThemeProvider } from '@mui/material/styles'

import TableContainer from '@mui/material/TableContainer'
import Paper from '@mui/material/Paper'
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

import { deleteProject, fetchProjects } from './projectsSlice'
import styles from './Projects.module.css'

const theme = createTheme({
  typography: {
    fontFamily: ['Montserrat'].join(',')
  },
})

const ProjectTable = () => {
  const currentUser = JSON.parse(localStorage.getItem('famedv1_user'))
  const canDelete = currentUser.user.roles.admin

  const projects = useSelector(state => state.projects.projects)

  const orderedProjects = projects.slice().sort((a, b) => b.startDate.localeCompare(a.startDate))

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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - orderedProjects.length) : 0

  const status = useSelector(state => state.projects.status)
  const dispatch = useDispatch()

  useEffect(() => {
    if (status === 'idle') dispatch(fetchProjects())
  }, [status, dispatch])

  const [deleteStatus, setDeleteStatus] = useState('idle')
  const [selectedProject, setSelectedProject] = useState('')

  const onDelete = async (projectId) => {
    if (canDelete) {
      try {
        setSelectedProject(projectId)
        setDeleteStatus('pending')
        await dispatch(deleteProject(projectId)).unwrap()
      } catch (error) {
        console.log('FROM Project Table', error)
      } finally {
        setDeleteStatus('idle')
      }
    } else {
      alert('Nao tem permissao para deletar projecto')
    }
  }

  return (
    <div
      style={{ paddingTop: '3.5rem', paddingLeft: '16rem' }}
      className={`${styles.projectTable} ${styles.responsive}`}
    >
      <div style={{ padding: '2rem' }}>
        <div style={{ position: 'relative' }}>
          <p className={styles.title}>Tabela de Projectos</p>
          <Link
            to='/dashboard/projects/create'
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              background: '#146F12',
              color: 'white',
              fontSize: '0.875rem',
              padding: '0.5rem 0.6rem',
              textDecoration: 'none',
              borderRadius: '0.3rem'
            }}
          >Adicionar Projecto</Link>
        </div>

        <ThemeProvider theme={theme}>
          <TableContainer
            sx={{ fontFamily: 'Montserrat', fontSize: '14px' }} variant='outlined' component={Paper}
          >
            <Table size='small'>
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{ color: '#146F12', fontSize: '0.876rem', fontWeight: '600' }}
                    style={{ width: '20rem' }}
                  >Título do Projecto</TableCell>

                  <TableCell
                    sx={{ color: '#146F12', fontSize: '0.876rem', fontWeight: '600' }}
                    style={{ width: '8.5rem' }}
                  >Data de Início</TableCell>

                  <TableCell
                    sx={{ color: '#146F12', fontSize: '0.876rem', fontWeight: '600' }}
                    style={{ width: '8rem' }}
                  >Data de Fim</TableCell>

                  <TableCell
                    sx={{ color: '#146F12', fontSize: '0.876rem', fontWeight: '600' }}
                  >Financiador</TableCell>

                  <TableCell
                    sx={{ color: '#146F12', fontSize: '0.876rem', fontWeight: '600' }}
                    style={{ width: '9rem' }}
                    align='right'
                  >Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {!!orderedProjects.length ? (
                  rowsPerPage > 0
                    ? orderedProjects.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    : orderedProjects
                ).map(project => (
                  <TableRow key={project._id}>
                    <TableCell sx={{ fontSize: '0.8rem' }}>
                      {project.title.length > 40
                        ? `${project.title.substring(0, 40)} ...`
                        : project.title
                      }
                    </TableCell>

                    <TableCell sx={{ fontSize: '0.8rem' }}>
                      {project.startDate.split('T')[0]}
                    </TableCell>

                    <TableCell sx={{ fontSize: '0.8rem' }}>
                      {project.endDate.split('T')[0]}
                    </TableCell>

                    <TableCell sx={{ fontSize: '0.8rem' }}>
                      {project.financier ? (
                        project.financier.name.length > 25
                          ? `${project.financier.name.substring(0, 25)} ...`
                          : project.financier.name
                      ) : (
                        project.financiers[0].name.length > 25
                          ? `${project.financiers[0].name.substring(0, 25)} ...`
                          : project.financiers[0].name
                      )}
                    </TableCell>

                    <TableCell sx={{ fontSize: '0.8rem' }} align='right'>
                      <Link
                        to={`/dashboard/projects/edit/${project._id}`}
                        style={{ color: '#146F12' }}
                      >Edit</Link>

                      <button
                        style={{
                          fontSize: '0.8rem',
                          border: 'none',
                          outline: 'none',
                          background: 'none',
                          padding: 0,
                          marginLeft: '0.5rem',
                          color: 'red',
                        }}
                        onClick={() => onDelete(project._id)}
                        disabled={!canDelete || deleteStatus === 'pending'}
                      >
                        {selectedProject === project._id && deleteStatus === 'pending'
                          ? 'Deleting...'
                          : 'Delete'
                        }
                      </button>
                    </TableCell>
                  </TableRow>
                )) : (
                  <TableRow>
                    <TableCell rowSpan={5}>
                      No Project to show
                    </TableCell>
                  </TableRow>
                )}

                {emptyRows > 0 && (
                  <TableRow style={{ height: 31 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>

              <TableFooter>
                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TablePagination
                    rowsPerPageOptions={[8, 9]}
                    colSpan={5}
                    count={orderedProjects.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                      inputProps: {
                        'aria-label': 'rows per page',
                      },
                      // native: true,
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

        {/* {!!projects.length && projects.map(project => (
          <div key={project._id}>
            <h4>{project.title}</h4>
            <Link to={`/dashboard/projects/edit/${project._id}`}>Edit Project</Link>
            <button
              disabled={selectedProject === project._id && deleteStatus === 'pending'}
              onClick={() => onDelete(project._id)}
            >
              {selectedProject === project._id && deleteStatus === 'pending'
                ? 'Deleting Project...'
                : 'Delete Project'
              }
            </button>
          </div>
        ))} */}
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
        aria-label='first page'
      >
        {theme.direction === 'rtl'
          ? <LastPageIcon style={{ fontSize: '1rem' }} />
          : <FirstPageIcon style={{ fontSize: '1rem' }} />
        }
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label='previous page'
      >
        {theme.direction === 'rtl'
          ? <KeyboardArrowRight style={{ fontSize: '1rem' }} />
          : <KeyboardArrowLeft style={{ fontSize: '1rem' }} />
        }
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label='next page'
      >
        {theme.direction === 'rtl'
          ? <KeyboardArrowLeft style={{ fontSize: '1rem' }} />
          : <KeyboardArrowRight style={{ fontSize: '1rem' }} />
        }
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label='last page'
      >
        {theme.direction === 'rtl'
          ? <FirstPageIcon style={{ fontSize: '1rem' }} />
          : <LastPageIcon style={{ fontSize: '1rem' }} />
        }
      </IconButton>
    </Box>
  )
}