# Report of the meme feed

## The exercise

The meme feed is supposed to work, but you'll quickly notice that it's extremely slow, making it almost unusable. The reason for this is that it was built by Jodric, our intern. He's really nice, but he still lacks some good reflexes when it comes to performance.

Your role here will be to:

- Identify the cause of the problem and write a report in doc/review/meme-feed-code-review.md.
- Refactor the code to make it as clean and performant as possible. The UI must remain the same, but you can adjust the UX if you feel it's necessary, as long as you don't degrade it.

## The problem

- When first launched the application, after logging in, the app just returns a spinner. Looking in the network tab there are hundreds of API calls done in sync, so that the app never shows the feed. By commenting out the "remaining pages" section in the code, the first page of the feed can finally be seen.
- The code is highly unscalable and basically broken as it's so slow it makes it unusable. A known issue is that on page refresh, the session is not stored; but because of the thousands of API calls, I am treating it as a feature to not make my browser crash.
- Another issue is that whenever the feed it displayed there is a rerender done, but if this is a feed rerender feature it must be done only if there are any changes from the fetch (or even putting a caching system).

## Other issues

- It seems that changing the code doesn't produce any change in the application; along with the state of login not being persisted, this is a huge loss of development time.

## The solution

The solution consist in general to first make the code readible, the feed usable, scalable, and in the end fixing minor performance issues.

- The meme feed code is a monolith. It needs to be refactored in smaller components and functions.
- The feed should only take the first page, at the beginning, and the others as we scroll down, so a pagination should be created.
- The API calls for the memes should be asyncronous, with particular care for sequential and concurrent calls.
- The autorefresh option must be fixed so that we avoid performance leaks.
- Adding some unit tests now that components are smaller with the refactor.

## Process

### Monolith

- Refactored the code inside the feed in smaller components.
- Followed a coupling approach for the types and added them where they were missing.
- I also refactored the api to have its own folder and types.
