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

import { deleteNews, fetchNews } from './newsSlice'
import styles from './News.module.css'

const theme = createTheme({
  typography: {
    fontFamily: ['Montserrat'].join(',')
  },
})

const NewsTable = () => {
  const currentUser = JSON.parse(localStorage.getItem('famedv1_user'))
  const canDelete = currentUser.user.roles.admin

  const news = useSelector(state => state.news.news)
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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - orderedNews.length) : 0

  const status = useSelector(state => state.news.status)
  const dispatch = useDispatch()

  useEffect(() => {
    if (status === 'idle') dispatch(fetchNews())
  }, [status, dispatch])

  const [deleteStatus, setDeleteStatus] = useState('idle')
  const [selectedNews, setSelectedNews] = useState('')

  const onDelete = async (newsId) => {
    if (canDelete) {
      try {
        setSelectedNews(newsId)
        setDeleteStatus('pending')
        await dispatch(deleteNews(newsId)).unwrap()
      } catch (error) {
        console.log('FROM News Table', error)
      } finally {
        setDeleteStatus('idle')
      }
    } else {
      alert('Nao tem permissao para deletar Noticia')
    }
  }

  return (
    <div
      style={{ paddingTop: '3.5rem', paddingLeft: '16rem' }}
      className={`${styles.newsTable} ${styles.responsive}`}
    >
      <div style={{ padding: '2rem' }}>
        <div style={{ position: 'relative' }}>
          <p className={styles.title}>Tabela de Notícias</p>
          <Link
            to='/dashboard/news/create'
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
          >Adicionar Notícia</Link>
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
                  >Título da Notícia</TableCell>

                  <TableCell
                    sx={{ color: '#146F12', fontSize: '0.876rem', fontWeight: '600' }}
                    style={{ width: '8.5rem' }}
                  >Data de criação</TableCell>

                  <TableCell
                    sx={{ color: '#146F12', fontSize: '0.876rem', fontWeight: '600' }}
                    style={{ width: '12rem' }}
                  >Resumo da Notícia</TableCell>

                  <TableCell
                    sx={{ color: '#146F12', fontSize: '0.876rem', fontWeight: '600' }}
                    style={{ width: '9rem' }}
                    align='right'
                  >Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {!!orderedNews.length ? (
                  rowsPerPage > 0
                    ? orderedNews.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    : orderedNews
                ).map(news => (
                  <TableRow key={news._id}>
                    <TableCell sx={{ fontSize: '0.8rem' }}>
                      {news.title.length > 40
                        ? `${news.title.substring(0, 40)} ...`
                        : news.title
                      }
                    </TableCell>

                    <TableCell sx={{ fontSize: '0.8rem' }}>
                      {news.createdAt.split('T')[0]}
                    </TableCell>

                    <TableCell sx={{ fontSize: '0.8rem' }}>
                      {news.content.length > 25
                        ? `${news.content.substring(0, 25)} ...`
                        : news.content
                      }
                    </TableCell>

                    <TableCell sx={{ fontSize: '0.8rem' }} align='right'>
                      <Link
                        to={`/dashboard/news/edit/${news._id}`}
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
                        onClick={() => onDelete(news._id)}
                        disabled={!canDelete || deleteStatus === 'pending'}
                      >
                        {selectedNews === news._id && deleteStatus === 'pending'
                          ? 'Deleting...'
                          : 'Delete'
                        }
                      </button>
                    </TableCell>
                  </TableRow>
                )) : (
                  <TableRow>
                    <TableCell rowSpan={5}>
                      No News to show
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
                    count={orderedNews.length}
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