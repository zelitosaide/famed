import { Link } from "react-router-dom"

const StatsCard = ({ children, name, count, to }) => {
  return (
    <div
      style={{
        background: '#ffffff',
        marginLeft: '1rem',
        boxShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px',
        borderRadius: '0.3rem'
      }}
    >
      <div style={{ position: 'relative', height: '4rem', padding: '1rem', }}>
        <span style={{
          background: '#257A23',
          display: 'inline-block',
          padding: '0.4rem 0.6rem',
          borderRadius: '0.1rem',
          position: 'absolute'
        }}>{children}</span>

        <div style={{ position: 'absolute', left: '4.4rem' }}>
          <span style={{ fontSize: '0.8rem', display: 'block', color: '#696968' }}>#{name}</span>
          <span style={{ fontSize: '1.4rem', display: 'block', color: '#444', fontWeight: '600' }}>
            {count}
          </span>
        </div>
      </div>

      <Link
        to={to}
        style={{
          fontSize: '0.8rem',
          color: '#146F12',
          marginTop: '1rem',
          display: 'block',
          padding: '0.5rem 1rem',
          background: '#F6F9F6',
        }}
      >
        Ver todos
      </Link>
    </div>
  )
}

export default StatsCard