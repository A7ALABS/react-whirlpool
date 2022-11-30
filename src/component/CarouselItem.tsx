import React from 'react'

export default function CarouselItem(props: any) {
  return (
    <div
      className='carousel-item'
      onClick={props.onClick}
      style={{
        border: props.isActive ? '2px solid black' : 'none',
        // height: props.isActive ? "250px" : "200px",
      }}
    >
      {props.item + props.selectedIndex + props.carouselKey}
    </div>
  )
}
