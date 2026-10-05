# Review rules for react-whirlpool

This is a small, published npm library. Consumers install it from npm and import from `dist/`, so review changes for their effect on downstream apps, not just on this repo.

## Packaging and dependencies
- The package has **zero runtime `dependencies`**; only `react` is a peer dependency. Flag any change that adds a runtime dependency, or that makes the build output `require`/`import` a module not declared in `dependencies` or `peerDependencies` (e.g. `tslib` via `importHelpers`).
- Both ESM (`dist/esm`) and CommonJS (`dist/cjs`) builds are published. Changes to `tsconfig.json`, the build scripts or `package.json` entry points (`main`, `module`, `types`, `files`) must keep both working.
- Keep `peerDependencies.react` at `>=16.8` unless the PR intentionally drops older React versions; if so, call it out as breaking.

## Public API
- The public API is `SimpleCarousel`, its props (`src/component/types/SimpleCarousel.types.ts`) and the imperative ref methods `handleNextEvent`, `handlePrevEvent` and `handleReset`. Renaming or removing any of these, changing a prop's default, or narrowing a prop type is a breaking change.
- New props must be optional, with defaults that preserve current behaviour.
- When props or ref methods change, the README props table and usage example should be updated in the same PR.

## React correctness
- Effects must list every prop and state value they read (`react-hooks/exhaustive-deps`). Stale closures over props such as `autoPlayInterval`, `isHorizontal` or `gap` have caused bugs here before.
- Every `setInterval`, `setTimeout` and `addEventListener` must be cleaned up in the effect's return function.
- `onActiveIndexUpdate` must only ever be called with an index in `0 … children.length - 1`.
- `children` may be a single element, an array, or contain `null`/`false`. Do not call array methods on `props.children` directly; normalise with `React.Children.toArray`.
- No `console.*` calls in `src/`: they ship to consumers' production consoles.

## CSS
- `SimpleCarousel.css` is imported globally by consumers. Every selector must be specific to this component (prefix `carousel-container-`, `carousel-options`, or similar). Flag generic class names such as `.carousel`, `.carousel-item`, `.slide` or element selectors, which collide with Bootstrap and app styles.

## Types
- Emitted `.d.ts` files must not rely on the global `JSX` namespace (removed in `@types/react` 19); use `React.ReactNode` / `React.ReactElement`.
- Avoid introducing new `any` in public types.
