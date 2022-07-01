import styles from './date.module.css'

export default function FormattedDate({ date, style }) {

  const parsedDate = new Date(date)
  let year = parsedDate.getFullYear()
  let day = parsedDate.getDate()
  let weekday, month

  switch (parsedDate.getDay()) {
    case 0: weekday = 'Domingo'; break
    case 1: weekday = 'Segunda Feira'; break
    case 2: weekday = 'Terça Feira'; break
    case 3: weekday = 'Quarta Feira'; break
    case 4: weekday = 'Quinta Feira'; break
    case 5: weekday = 'Sexta Feira'; break
    case 6: weekday = 'Sábado'; break
    default: break
  }

  switch (parsedDate.getMonth()) {
    case 0: month = 'Janeiro'; break
    case 1: month = 'Fevereiro'; break
    case 2: month = 'Março'; break
    case 3: month = 'abril'; break
    case 4: month = 'Maio'; break
    case 5: month = 'Junho'; break
    case 6: month = 'Julho'; break
    case 7: month = 'Agosto'; break
    case 8: month = 'Setembro'; break
    case 9: month = 'Outubro'; break
    case 10: month = 'Novembro'; break
    case 11: month = 'Dezembro'; break
    default: break;
  }

  return (
    <span style={style ? style : null} className={styles.date}>
      {/* {`${weekday}, ${day} de ${month} de ${year}`} */}
      {`${day} de ${month} de ${year}`}
    </span>
  )
}
