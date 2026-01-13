# Optimization Log

## 1. Project Setup & Architecture
- **State Management**: Optimized `StatsContext.tsx` to use `React.useRef` for stable state access in callbacks and `React.useMemo` for the context value. This prevents unnecessary re-renders of consuming components when the state changes but the consuming component only needs to dispatch actions.
- **Persistence**: Verified `lib/storage.ts` uses `AsyncStorage` cleanly.
- **Folder Structure**: Validated a clean separation of concerns (`app`, `components`, `context`, `hooks`, `lib`).

## 2. Performance Optimization
- **Image Optimization**: Migrated from `react-native` Image to `expo-image` for improved performance (caching, downsampling) and memory usage.
    - Updated `app/index.tsx` (Initial Load Screen) with responsive layout (`w-1/2` instead of fixed pixel width).
    - Updated `components/HeroHeader.tsx` to use `expo-image` and map legacy `resizeMode` props to `contentFit`.
    - Updated `components/LessonCard.tsx` and `components/PressableCard.tsx` to use `expo-image` for list performance.
- **Context Performance**: As noted above, `StatsContext` was optimized to avoid "Context Hell" re-renders.

## 3. UI / Responsiveness
- **Layout**: Verified usages of `w-full` and flex layouts. Converted `app/index.tsx` fixed dimensions to relative percentage-based widths for better scaling across devices.
- **Safe Area**: Confirmed `SafeAreaView` usage in root screens.

## 4. Dependencies
- Added `expo-image` to dependencies.

## 5. Next Steps for User
- Verify the "Curved Header" design on Tablet devices (due to fixed height in `HeroHeader`).
- Test In-App Purchases flow (RevenueCat logic seems present in `SubscriptionContext`).
