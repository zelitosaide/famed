import styles from './Publications.module.css'

const SinglePublication = ({ publication }) => {
  return (
    <div className={styles.singlePublication}>
      <a href={publication.url} target='_blank' rel='noreferrer'>
        {publication.title}
      </a>
      <p style={{ marginBottom: '0.2rem' }}>{publication.authors.toString()}</p>
      <p style={{ marginTop: 0, color: '#C66518',  }}>{publication.review}. PMID: {publication.pmid}</p>
    </div>
  )
}

export default SinglePublication