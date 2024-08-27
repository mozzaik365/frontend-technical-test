# Report of the meme feed

# The exercise

The meme feed is supposed to work, but you'll quickly notice that it's extremely slow, making it almost unusable. The reason for this is that it was built by Jodric, our intern. He's really nice, but he still lacks some good reflexes when it comes to performance.

Your role here will be to:

- Identify the cause of the problem and write a report in doc/review/meme-feed-code-review.md.
- Refactor the code to make it as clean and performant as possible. The UI must remain the same, but you can adjust the UX if you feel it's necessary, as long as you don't degrade it.

# The problem

- When first launched the application, after logging in, the app just returns a spinner. Looking in the network tab there are hundreds of API calls done in sync, so that the app never shows the feed. By commenting out the "remaining pages" section in the code, the first page of the feed can finally be seen.
- The code is highly unscalable and basically broken as it's so slow it makes it unusable. A known issue is that on page refresh, the session is not stored; but because of the thousands of API calls, I am treating it as a feature to not make my browser crash.
- Another issue is that whenever the feed it displayed there is a rerender done, but if this is a feed rerender feature it must be done only if there are any changes from the fetch (or even putting a caching system).

## Other issues

- It seems that changing the code after an error doesn't produce changes in the application; along with the state of login not being persisted, this is a loss of development time on refresh.

# The solution

The solution consist in general to first make the code readible, the feed usable, scalable, and in the end fixing minor performance issues, using the existing UI.

- The meme feed code is a monolith. It needs to be refactored in smaller components and functions.
- The API calls for the memes should be asyncronous, with particular care for sequential and concurrent calls.
- The feed should only take the first page, at the beginning, and the others as we scroll down, so a pagination should be created.
- The autorefresh option must be fixed so that we avoid performance leaks.

## Monolith

- Refactored the meme-feed code in smaller components.
- Followed a coupling approach for the types and added them where they were missing.
- I also refactored the api to have its own folder and types.

## API calls big fix

- Started by destroying the first for loop and transforming it into a map function with a Promise.all() inside. Page render performance increased from 3s to 2s.
- Found out there is a pagination for comments; commented out for the moment, trasfomed the for loop similarly to the first one, page render performance increased from 2s to < 1s.
- Moved the new functions into its own service file, for reusability and separation of concerns.
- To save even more time comments are actually loaded when the user clicks on the corresponding button in the UI; page load does less requests now.
- Did a minor refactor over the comments section, to declutter the meme card footer.

### Observations

Further performance optimisation can come by reducing the number of API calls, but it depends by the back-end; this is because servers have bigger calclulation capabilities that the client might necessarily have not, so it's best to avoid client performance degradation.

- The author of the meme could come along with the meme, since it's not something that is prone to change like the comments sections could be.
- For the comments, same thing, they could come with the author to save some API calls.
- A caching system could be put in place to avoid the extra calls.

Other considerations:

- A optimisation over api calls in the comments could have been added, by adding the author directly from the back-end.

## Pagination

- Tanstack offers a hook for pagination called useInfiniteQuery. That was used for the whole pagination.
- Implemented an infinite scroll with a "Load More" button. There is a known issue with duplicated entries if, during the browsing, new memes go into the feed. It can either be solved in the back-end, or it could be solved by filtering the list of memes and deleting the duplicate (which creates scalability problems as the feed grows), or find any other scalable solution (a creative one could be filtering only the last 10 (pageSize) memes, and if all 10 are duplicates, refetch the next page).
- The refresh on page focus was toggled.
- Implemented the same solution over the comments for pagination.

### Futher optimisation

- Virtualisation for very long feeds and a lazy loading for the images could be added to enhance performance even more.

# Final thoughts

For the purpose of the exercise and being in a reasonable delivery time some aspects were avoided:

- Catching errors from the various API calls.
- Creating new UI (from confirmation/error toasters messages) with the exepction for the load more button.
- Elegant UX solutions (like infinite scrolling without a load more button or animations)
- Using useMemo or any other render optimisation methods.
