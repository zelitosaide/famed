import React from "react"
import { VisibilityContext } from "react-horizontal-scrolling-menu"

import { ChevronLeftIcon, ChevronRightIcon } from "../../components/icons/icons"
import { Input } from "../../components/input/Input"

function Arrow({ children, disabled, onClick, ...props }) {
  return (
    <Input
      style={{
        '--bg-color': 'rgb(255, 255, 255)',
        '--bg-hover': 'rgb(255, 255, 255)',
        '--bg-active': 'rgb(255, 255, 255)',
        '--outline-color': 'rgb(255, 255, 255)',
        position: 'absolute',
        top: 0,
        zIndex: 100,
        padding: 0,
        ...props.style,
      }}
    >
      <button
        type="button"
        disabled={disabled}
        onClick={onClick}
        style={{
          padding: '0.25rem',
          display: disabled ? "none" : "inline-block",
          userSelect: "none",
          borderRadius: 0,
          height: '2.45rem',
          background: '#fff',
          color: 'var(--main-stroke-svg-color)',
          outline: 'none',
          position: 'relative',
        }}
      >
        {children}
      </button>
    </Input>
  )
}

export function LeftArrow() {
  const {
    isFirstItemVisible,
    scrollPrev,
    visibleItemsWithoutSeparators,
    initComplete
  } = React.useContext(VisibilityContext);

  const [disabled, setDisabled] = React.useState(
    !initComplete || (initComplete && isFirstItemVisible)
  );
  React.useEffect(() => {
    if (visibleItemsWithoutSeparators.length) {
      setDisabled(isFirstItemVisible);
    }
  }, [isFirstItemVisible, visibleItemsWithoutSeparators]);

  return (
    <Arrow style={{ left: 0 }} disabled={disabled} onClick={() => scrollPrev()}>
      <ChevronLeftIcon style={{ width: '1rem', borderRadius: '1rem', padding: '0.1rem' }} />
    </Arrow>
  )
}

export function RightArrow() {
  const {
    isLastItemVisible,
    scrollNext,
    visibleItemsWithoutSeparators
  } = React.useContext(VisibilityContext);

  const [disabled, setDisabled] = React.useState(
    !visibleItemsWithoutSeparators.length && isLastItemVisible
  );

  React.useEffect(() => {
    if (visibleItemsWithoutSeparators.length) {
      setDisabled(isLastItemVisible);
    }
  }, [isLastItemVisible, visibleItemsWithoutSeparators]);

  return (
    <Arrow style={{ right: 0 }} disabled={disabled} onClick={() => scrollNext()}>
      <ChevronRightIcon style={{ width: '1rem', borderRadius: '1rem', padding: '0.1rem' }} />
    </Arrow>
  );
}


