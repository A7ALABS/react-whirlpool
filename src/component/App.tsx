import React, { useRef, useState } from 'react'
import './App.css'
import CarouselItem from './CarouselItem'
import SimpleCarousel from './SimpleCarousel'

function App() {
  const list = ['A', 'B', 'C', 'D', 'E', 'A']
  const simpleCarouselRef = useRef<any>()
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <div className='App'>
      <SimpleCarousel
        ref={simpleCarouselRef}
        isHorizontal={true}
        gap={20}
        autoPlay={true}
        minHeight='254px'
        hideArrows={true}
        onActiveIndexUpdate={(index: number) => setActiveIndex(index)}
      >
        {list.map((item: string, key) => (
          <div key={key}>
            <CarouselItem item={item} onClick={() => console.log('yo')} isActive={activeIndex == key} />
          </div>
        ))}
      </SimpleCarousel>
      <button
        onClick={() => {
          simpleCarouselRef.current && simpleCarouselRef.current.handlePrevEvent()
        }}
      >
        Prev
      </button>
      <button
        onClick={() => {
          simpleCarouselRef.current && simpleCarouselRef.current.handleNextEvent()
        }}
      >
        Next
      </button>
    </div>
  )
}

export default App
