import React, { useRef, useState } from 'react'
import { Story, Meta } from '@storybook/react'
import SimpleCarousel from '../component/SimpleCarousel'
import ISimpleCarousel from '../component/types/SimpleCarousel.types'
import CarouselItem from '../component/CarouselItem'
import '../component/App.css'

export default {
  title: 'A7A/SimpleCarousel',
  component: SimpleCarousel,
  argTypes: {},
} as Meta<typeof SimpleCarousel>

const Template: Story<ISimpleCarousel> = (args) => {
  const list = ['A', 'B', 'C', 'D', 'E', 'A']
  const simpleCarouselRef = useRef<any>()
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <div className='App' >
      <SimpleCarousel {...args}
        ref={simpleCarouselRef}
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

export const SimpleCarouselStory = Template.bind({})
SimpleCarouselStory.args = {
  isHorizontal: true,
  gap: 20,
  children: [
    <CarouselItem item='A' onClick={() => console.log('yo')} isActive={true} />,
    <CarouselItem item='B' onClick={() => console.log('yo')} isActive={false} />,
    <CarouselItem item='C' onClick={() => console.log('yo')} isActive={false} />,
  ],
}

