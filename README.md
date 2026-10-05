# React Whirlpool Carousel 

https://github.com/A7ALABS/react-whirlpool/assets/60537632/0e27a034-7582-431d-95b3-263f224c9048


https://github.com/A7ALABS/react-whirlpool/assets/60537632/d5f3ba93-56ca-4ff5-8467-dc10b4f72be2


**Features**
* Responsive
* Customize previous and next buttons
* Bi-directional - horizontal and vertical
* Auto play

## Installing
`yarn add react-whirlpool`

## Important
Make sure to import the css file with `import 'react-whirlpool/dist/cjs/component/SimpleCarousel.css'`

## Usage
```
import React, { useRef, useState } from "react";
import { SimpleCarousel, SimpleCarouselHandle } from "react-whirlpool";
import 'react-whirlpool/dist/cjs/component/SimpleCarousel.css' // => important

function App() {
  const [list, setList] = useState(["A", "B", "C", "D", "E"]);
  const simpleCarouselRef = useRef<SimpleCarouselHandle>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div >
      <SimpleCarousel
        isHorizontal={true}
        gap={20}
        autoPlay={false}
        minHeight="254px"
        ref={simpleCarouselRef}
        hideArrows={true}
        onActiveIndexUpdate={(index: number) => setActiveIndex(index)}
      >
        {list.map((item: string, key) => (
          <div key={key}>
            {item}
          </div>
        ))}
      </SimpleCarousel>
      //custom prev and next buttons
      <button onClick={() => simpleCarouselRef.current?.handlePrevEvent()}>
        Prev
      </button>
      <button onClick={() => simpleCarouselRef.current?.handleNextEvent()}>
        Next
      </button>
      <button onClick={() => simpleCarouselRef.current?.handleReset()}>
        Reset
      </button>
    </div>
  );
}

export default App;
```

## Props
| Name              | Value                                                               | Description                                                                                       |
|-------------------| ------------------------------------------------------------------  | -------------------------------------------------------------------------------------------------------------------------------------------     |
| isHorizontal      | boolean  | Define the direction of the slider, defaults to 'horizontal'.    |
|  children         | JSX Element | Pass any number of JSX elements (carousel cards) which are to be rendered in the carousel  |
| gap               | number | Define gap (in px) between two carousel cards  |
| minHeight         | string, optional | Define the minimum height of the carousel container  |
|minWidth           | string, optional  | Define the minimum width of the carousel container  |
|onActiveIndexUpdate| function, optional | Takes an active index (number) as argument to update selected index in SimpleCarousel |
| autoplay          | boolean, default false, optional  | Enable auto rotation of carousel, rotation interval is set to 3000ms    |
| autoPlayInterval  | number, default 3000, optional   | Auto-play interval in milliseconds
 hideArrows         | boolean, default true, optional  | Hide default arrows    |
 hideDevPanel       | boolean, default true, optional | Hide dev panel  |
 hideInitGap        | boolean, default true, optional | Hide initial gap between the first card and carousel container  |
 ref                | `Ref<SimpleCarouselHandle>`, optional   | Create and pass reference to access the handler methods - 1. handlePrevEvent() to go to the previous card, 2. handleNextEvent() to go to the next card and 3. handleReset() to go back to the first card |

## TypeScript
The package ships its own types. Besides the component, it exports:

- `SimpleCarouselProps` – the props accepted by `SimpleCarousel`
- `SimpleCarouselHandle` – the methods available on the ref (`handleNextEvent`, `handlePrevEvent`, `handleReset`)

```tsx
import { SimpleCarousel, SimpleCarouselHandle } from "react-whirlpool";

const ref = useRef<SimpleCarouselHandle>(null);
ref.current?.handleNextEvent();
```

 ## Common Issues
 1. `CJS WARNING - Failed to parse source map` => **Workaround** - [Link](https://github.com/facebook/create-react-app/discussions/11767#discussioncomment-2092902)
