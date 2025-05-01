# Meme feed code review

## What's wrong?

The application is not usable as-is, we have a white page with a loader and the header. without any content after authentication. We can click on the button "Create a meme" but the application is still laggy and very very slow.

If we look behind the scene in the dev tools of the browser, we can see we have a lot of request to the API. It seems endless.

## What's the cause?

After taking a look at the main page of the application `src/routes/_authentication/index.tsx`, we can quickly identify a root cause.

The code shows us that the page fetches _all_ data at the same time:

- all meme pages.
- all comments for each memes, for each page.
- all author info for each comments, for each memes and for each pages.

By commenting the code that loads pages after the first one, the application is working, at least we have the first page.

This confirms the root cause of loading all data.

Also by inspecting the network, we can see requests for already fetched user or comment, it seems there is no cache mechanism for the queries. But a quick look at the code shows us that all the data fetching is done through a single `useQuery` usage. It means that this call handles memes fetching but also comments and comment's author fetching.

## How to improve/fix ?

### All data loading issue

If we want to keep the same UI, a.k.a. showing a meme and its comments in the same page, we need to add a pagination mechanism to avoid loading all data at once. A pagination would be the one, especially since the API support a `page` parameter.

There are two pagination solution:

- automatic lazy loading
- "load more" button

We could also rework the UI and shows the comments for each meme in a different way: modal, detail page, sliding panel, etc.

For the sake of the exercice, I choose to implement a pagination with a load more button. So the next page would be loaded with an explicit action of the user. It's quick to implement and avoid adding an external library, and it's progressive: we could improve the UI later with automatic lazy loading.

### Improved queries

We need to split the queries by scope to improve how the data are fetch and benefits of the cache of `react-query` library. Having a query key is not enough if the query hanldes multiples kind of data.

The scope should be:

- memes
- comments
- author

The current single query will be split into 3, one per scope above.

## Technical solution

- We need to handle the current page index in `MemeFeedPage` component using an internal state, and pass the value to the `getMemes` API function.
- We need to add a "load more" button after each "page" of comments, only if there is remaining pages to load. Otherwise, the button will be hide. A message will also be displayed to indicate we reached the end of the comments.
- Move the code related to queries to dedicated files in a new `src/queries` folder
  - `useMemeFeedsQuery` for memes querying
  - `useCommentsQuery` for comments querying
  - `useAuthorQuery` for author querying
- Some refactoring will be applied to make the code easier to read and optimize rendering
  - Move code related to meme rendering into dedicated component `Meme` in `src/components` folder. This will avoid to render everything (memes, comments) if the feed changes.
