import React, { FC, forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import ISimpleCarousel from './types/SimpleCarousel.types'

const SimpleCarousel: FC<ISimpleCarousel> = forwardRef(
  (
    {
      children,
      isHorizontal,
      gap,
      minHeight,
      minWidth,
      onActiveIndexUpdate,
      autoPlay = false,
      hideArrows = true,
      hideDevPanel = true,
      hideInitGap = true,
    }: ISimpleCarousel,
    ref,
  ) => {
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [isHorizontalState, setIsHorizontal] = useState(isHorizontal)
    const containerRef = useRef<any>()
    const itemRef = useRef<any>()
    const [left, setLeft] = useState(0)
    const [n, setN] = useState(0) //no of cards displayed in one time
    // const [gapState, setGap] = useState(gap);
    const [dim, setDim] = useState(0)
    const [touchPosition, setTouchPosition] = useState(null)

    useImperativeHandle(ref, () => ({
      handleNextEvent() {
        setSelectedIndex((s) => s + 1)
      },
      handlePrevEvent() {
        setSelectedIndex((s) => s - 1)
      },
    }))

    // const [windowWidth, setWindowWidth] = useState(0);
    // const [windowHeight, setWindowHeight] = useState(0);

    const resizeWindow = () => {
      // setWindowWidth(window.innerWidth);
      // setWindowHeight(window.innerHeight);
      recalculate()
    }

    useEffect(() => {
      resizeWindow()
      window.addEventListener('resize', resizeWindow)
      return () => window.removeEventListener('resize', resizeWindow)
    }, [])

    useEffect(() => {
      let interval: any
      if (autoPlay) {
        interval = setInterval(() => {
          setSelectedIndex((s) => s + 1)
        }, 3000)
      } else {
        clearInterval(interval)
      }
      return () => {
        clearInterval(interval)
      }
    }, [autoPlay])

    useEffect(() => {
      setIsHorizontal(isHorizontal)
    }, [isHorizontal])

    useEffect(() => {
      const x = (100 * gap) / dim
      if (selectedIndex >= children.length - n && selectedIndex < children.length) {
        setLeft((children.length - n) * (100 + x))
      } else if (selectedIndex === children.length) {
        setSelectedIndex(0)
      } else if (selectedIndex === -1) {
        setSelectedIndex(children.length - 1)
      } else {
        setLeft(selectedIndex * (100 + x))
      }
      onActiveIndexUpdate && onActiveIndexUpdate(selectedIndex)
    }, [selectedIndex, n])

    const recalculate = () => {
      if (containerRef.current && itemRef.current) {
        if (isHorizontal) {
          const width = containerRef.current.offsetWidth
          const itemWidth = itemRef.current.offsetWidth
          setDim(itemWidth)
          setN(Math.floor(width / (itemWidth + gap)))
        } else {
          const height = containerRef.current.offsetHeight
          const itemHeight = itemRef.current.offsetHeight
          setDim(itemHeight)
          setN(Math.floor(height / (itemHeight + gap)))
        }
      }
    }

    const handleNext = () => {
      setSelectedIndex((s) => s + 1)
    }

    const handlePrev = () => {
      setSelectedIndex((s) => s - 1)
    }

    const handleRadioChange = (event: any) => {
      if (event.target.value === 'vertical') {
        setIsHorizontal(false)
      } else {
        setIsHorizontal(true)
      }
    }
    const handleTouchStart = (e: any) => {
      const touchDown = e.touches[0].clientX
      setTouchPosition(touchDown)
      console.log('touchstart')
    }
    const handleTouchMove = (e: any) => {
      const touchDown = touchPosition
      console.log('touchDown')
      if (touchDown === null) {
        return
      }

      const currentTouch = e.touches[0].clientX
      const diff = touchDown - currentTouch

      if (diff > 2) {
        handleNext()
      }

      if (diff < -2) {
        handlePrev()
      }

      setTouchPosition(null)
    }
    SimpleCarousel.displayName = 'SimpleCarousel'

    return (
      <div
        style={{
          height: '100%',
          width: '100%',
        }}
      >
        {isHorizontalState && (
          <div className='carousel-container-x' ref={containerRef} style={{ minHeight: minHeight, gap: gap }}>
            {!hideInitGap && <div style={{ width: gap }} />}
            {children.map((Item: any, key) => (
              <div
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                style={{
                  transform: `translate(-${left}%)`,
                  // border: selectedIndex === key ? "2px solid black" : "none",
                  borderRadius: 10,
                }}
                ref={itemRef}
                key={key}
              >
                {Item}
              </div>
            ))}
          </div>
        )}
        {!isHorizontalState && (
          <div className='carousel-container-y' ref={containerRef} style={{ minWidth: minWidth, gap: gap }}>
            {!hideInitGap && <div style={{ height: gap }} />}
            {children.map((Item, key) => (
              <div
                style={{
                  transform: `translateY(-${left}%)`,
                }}
                ref={itemRef}
                key={key}
              >
                {Item}
              </div>
            ))}
          </div>
        )}
        <div className='carousel-options'>
          {!hideArrows && (
            <div>
              <button className='previous-button' onClick={handlePrev}>
                Previous
              </button>
              <button className='next-button' onClick={handleNext}>
                Next
              </button>
            </div>
          )}
          {!hideDevPanel && (
            <div>
              Orientation:
              <div onChange={handleRadioChange}>
                <input type='radio' name='orientation' value='horizontal' defaultChecked />
                horizontal
                <input type='radio' name='orientation' value='vertical' />
                vertical
              </div>
            </div>
          )}
        </div>
      </div>
    )
  },
)
export default SimpleCarousel
