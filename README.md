# FGC Reddit

This is a portfolio project I did as part of my full stack engineer course on [Codecademy](https://codecademy.com). It is a React-Redux app that allows the user to view [Reddit](https://reddit.com) posts from various fighting game community (FGC)-related subreddits. The app requires authentication with the user's Reddit account to be used, and does not display posts containing galleries, links, or embeds.

Once authentication is fulfilled, the app uses the Reddit API to afford the user the following features:
- Select from various FGC-related subreddits
- View posts in the selected subreddit, with Reddit's listing options available (Hot [by default], New, Top, and Rising)
- Search through posts in the selected subreddit
- (Up/Down/Un)-vote on each post in the selected subreddit
- View comments for each post