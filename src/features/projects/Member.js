import styles from './Projects.module.css'

const Member = ({ member }) => {
  return (
    <div tabIndex={0} className={styles.member}>
      <div className={styles.image}>
        <img src={member.image} alt='' />
      </div>
      <div className={styles.memberInfo}>
        <p className={styles.name}>{member.name}</p>
        <p className={styles.role}>{member.role}</p>
      </div>
    </div>
  )
}

export default Member