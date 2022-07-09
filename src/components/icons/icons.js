export const TimesIcon = ({ ...props }) => (
  <svg
    {...props}
    style={{ ...props.style }}
    xmlns="http://www.w3.org/2000/svg"
    fill="none" viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
)

export const WarnIcon = ({ ...props }) => (
  <svg
    {...props}
    style={{ ...props.style }}
    xmlns="http://www.w3.org/2000/svg"
    fill="none" viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round" strokeLinejoin="round"
      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
    />
  </svg>
)


export const CheckCircleIcon = ({ ...props }) => (
  <svg
    {...props}
    style={{ ...props.style }}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20" fill="currentColor"
  >
    <path
      fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"
    />
  </svg>
)

export const CheckCircleIconOutline = ({ ...props }) => (
  <svg
    {...props}
    style={{ ...props.style }}
    xmlns="http://www.w3.org/2000/svg"
    fill="none" viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

export const ErrorIcon = ({ ...props }) => (
  <svg
    {...props}
    style={{ ...props.style }}
    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"
    />
  </svg>
)

export const ErrorIconOutline = ({ ...props }) => (
  <svg
    {...props}
    style={{ ...props.style }}
    xmlns="http://www.w3.org/2000/svg"
    fill="none" viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
)
