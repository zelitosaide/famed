import { useState } from 'react'
import { ScrollMenu } from 'react-horizontal-scrolling-menu'
import { LeftArrow, RightArrow } from './arrows';

export const HorizontalScroll = () => {
  const [items] = useState([
    'jsgdhgscshvhg',
    'jsgdhgscshvhg mhsvbh',
    'jsgdhgs cshvhg',
    'jsgdhgscshv hg',
    'jsgd hgscshvhg',
    'jsgdhgs cshvhg',
    'jsgdhgscsh vhg',
    'jsgdhgsc shvhg',
    'jsgdhgscsh vhg',
    'js gdhgscshvhg',
  ])

  return (
    // <div style={{ paddingTop: 200, paddingLeft: 400 }}>
    <div style={{ paddingTop: 300, }}>
      <ScrollMenu
        LeftArrow={LeftArrow}
        RightArrow={RightArrow}
        onWheel={onWheel}
      >
        {items.map((id) => (
          <div
            title={id}
            key={id}
            style={{ background: 'pink', display: 'flex', flexDirection: 'row', gap: 4 }}
          >
            {id.split(' ').map(v => (
              <span>{v}</span>
            ))}
            <button>x</button>
          </div>
        ))}
      </ScrollMenu>
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
