import { useEffect, useRef, useState } from 'react'
import { ScrollMenu } from 'react-horizontal-scrolling-menu'
import { Column } from '../../components/column/Column'
import { Fieldset } from '../../components/fieldset/Fieldset'
import { Row } from '../../components/row/Row'
import { LeftArrow, RightArrow } from './arrows'


const elemPrefix = 'test'
const getId = (index) => `${elemPrefix}${index}`

const getItems = () =>
  Array(20)
    .fill(0)
    .map((_, ind) => ({ id: getId(ind) }))

export const ChipsContainer = () => {
  const [items, setItems] = useState(getItems)

  // NOTE: for add/remove item
  const addItem = () => {
    setItems((items) =>
      items.concat({ id: getId(String(Math.random()).slice(2, 5)) })
    );
  };
  const removeItem = () => {
    setItems((items) => {
      const newItems = [...items];
      newItems.splice(0, 1);
      return newItems;
    });
  };

  // const itemsPrev = usePrevious(items);
  // const apiRef = useRef({})
  // useEffect(() => {
  //   if (items.length > itemsPrev?.length) {
  //     apiRef.current?.scrollToItem?.(
  //       apiRef.current?.getItemElementById(items.slice(-1)?.[0]?.id)
  //     );
  //   }
  // }, [items, itemsPrev]);

  return (
    <div style={{ paddingTop: 160, paddingLeft: 300 }}>
      <div className="example" style={{ paddingTop: "100px" }}>
        <div>
          <ScrollMenu
            LeftArrow={LeftArrow}
            RightArrow={RightArrow}
            onWheel={onWheel}
            // apiRef={apiRef}
          >
            {items.map(({ id }) => (
              <div key={id}>{id}</div>
            ))}
          </ScrollMenu>
          <div style={{ marginTop: "20px" }}>
            <button onClick={removeItem}>Remove item</button>
            <button onClick={addItem}>Add item</button>
          </div>
        </div>
      </div>
    </div>
  )
}

function onWheel(apiObj, ev) {
  const isThouchpad = Math.abs(ev.deltaX) !== 0 || Math.abs(ev.deltaY) < 15;

  if (isThouchpad) {
    ev.stopPropagation();
    return;
  }

  if (ev.deltaY < 0) {
    apiObj.scrollNext();
  } else if (ev.deltaY > 0) {
    apiObj.scrollPrev();
  }
}
