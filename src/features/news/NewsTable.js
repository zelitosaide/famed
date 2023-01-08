import React, { useEffect, useState } from 'react'
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

import styles from './News.module.css'
import FormattedDate from '../../components/date/FormattedDate'
import { deleteNews, fetchNews } from './newsSlice'
import { Fieldset } from '../../components/fieldset/Fieldset'
import { Input } from '../../components/input/Input'
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

const NewsTable = () => {
  const [openModal, setOpenModal] = useState(false)
  const [selectedId, setSelectedId] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [openErrorNotification, setOpenErrorNotification] = useState(false)
  const [openSuccessNotification, setOpenSuccessNotification] = useState(false)

  const currentUser = JSON.parse(localStorage.getItem('famedv1_user'))
  const canDelete = currentUser.user.roles.admin

  const news = useSelector((state) => state.news.news)
  const orderedNews = news.slice().reverse()

  // const news = useSelector(state => {
  //   if (canDelete) {
  //     return state.news.news
  //   } else {
  //     const userId = currentUser.user._id
  //     return state.news.news.filter(news => news.userId === userId)
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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - orderedNews.length) : 0

  const status = useSelector((state) => state.news.status)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (status === 'idle') dispatch(fetchNews())
  }, [status, dispatch])

  const [deleteStatus, setDeleteStatus] = useState('idle')
  const [selectedNews, setSelectedNews] = useState('')

  const handleRemove = async () => {
    setOpenModal(false)

    if (canDelete) {
      try {
        setSelectedNews(selectedId)
        setDeleteStatus('pending')
        setOpenErrorNotification(false)
        await dispatch(deleteNews(selectedId)).unwrap()
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
    <div className={`${styles.newsTable} ${styles.responsive}`}>
      <div style={{ padding: '2rem' }}>
        <Fieldset legend="Tabela de Notícias" style={{ marginRight: 0 }}>
          <Modal
            setVisible={() => setOpenModal(false)}
            visible={openModal}
            handleRemove={handleRemove}
            title="Remover Notícia"
            text="Tem certeza de que deseja remover a Notícia? Todos os dados serão removidos permanentemente. Essa ação não pode ser desfeita."
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
            text="A Notícia foi excluída com sucesso."
            title="Excluída com sucesso!"
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
                      Título da Notícia
                    </TableCell>

                    <TableCell
                      sx={{
                        color: 'var(--main-font-color)',
                        fontSize: 'var(--main-font-size)',
                        fontWeight: 'var(--bold-font-weight)',
                      }}
                      style={{ width: '8.5rem' }}
                    >
                      Data de criação
                    </TableCell>

                    <TableCell
                      sx={{
                        color: 'var(--main-font-color)',
                        fontSize: 'var(--main-font-size)',
                        fontWeight: 'var(--bold-font-weight)',
                      }}
                      style={{ width: '12rem' }}
                    >
                      Resumo da Notícia
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
                  {!!orderedNews.length ? (
                    (rowsPerPage > 0
                      ? orderedNews.slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                      : orderedNews
                    ).map((news) => (
                      <TableRow key={news._id}>
                        <TableCell
                          sx={{
                            color: 'var(--main-font-color)',
                            fontSize: 'var(--main-font-size)',
                            fontWeight: 'var(--main-font-weight)',
                          }}
                        >
                          {news.title.length > 40
                            ? `${news.title.substring(0, 40)} ...`
                            : news.title}
                        </TableCell>

                        <TableCell
                          sx={{
                            color: 'var(--main-font-color)',
                            fontSize: 'var(--main-font-size)',
                            fontWeight: 'var(--main-font-weight)',
                          }}
                        >
                          <FormattedDate date={news.createdAt} />
                        </TableCell>

                        <TableCell
                          sx={{
                            color: 'var(--main-font-color)',
                            fontSize: 'var(--main-font-size)',
                            fontWeight: 'var(--main-font-weight)',
                          }}
                        >
                          {news.content.length > 25
                            ? `${news.content.substring(0, 25)} ...`
                            : news.content}
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
                                navigate(`/dashboard/news/edit/${news._id}`)
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
                                setSelectedId(news._id)
                              }}
                              disabled={
                                !canDelete || deleteStatus === 'pending'
                              }
                            >
                              {selectedNews === news._id &&
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
                      <TableCell rowSpan={5}>No News to show</TableCell>
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
                          onClick={() => navigate('/dashboard/news/create')}
                          disabled={deleteStatus === 'pending'}
                        >
                          Adicionar Notícia
                        </button>
                      </Input>
                    </TableCell>

                    <TablePagination
                      rowsPerPageOptions={[8, 9]}
                      colSpan={5}
                      count={orderedNews.length}
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

export default NewsTable

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
