# Meme feed code review report

## Identified Problems:

- The entire feed is loaded recursively on the home page.
- The components are not sufficiently broken down.
- The `index.tsx` file of the feed handles API calls, data manipulation, and display at the same time.
- All comments for each meme are loaded from the start.
- The publication time of memes and comments does not take into account the user's timezone.

## Solutions Provided:

- Breakdown of the feed into: `MemeListLayout` + `MemeList` (for data control) + `MemeCard` (for display).
- Added `useInView` and `useInfiniteQuery` to load `MemeCard` on scroll.
- Only the first page of comments is preloaded, the rest are loaded on scroll once the comments are opened.
- Added a temporary fix for timezones while awaiting a backend fix: `format(comment.createdAt + "Z")`.
