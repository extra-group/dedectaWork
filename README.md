# Social Media Search Posts

- [About The Project](#about-the-project)
  - [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Installation](#installation)
- [Routes](#routes)

## About The Project

- Users can search for posts and reels across multiple social media platforms using hashtags.
- Search results can be sorted by date from oldest to newest.
- Recent search results are saved and automatically displayed when the user revisits the site.
- Search results are presented to the user as graphical statistics based on platform and date.

### Built With

- Nuxt JS
- TailwindCSS
- Pinia
- Chart.js

## Getting Started

- Twitter Api

  - https://rapidapi.com/omarmhaimdat/api/twitter154

- Instagram Api

  - https://rapidapi.com/social-api1-instagram/api/instagram-scraper-api2

### Installation

- You need to add the following variables to environment file(.env).

  | Name              | Type   | Example                                                      |
  | ----------------- | ------ | ------------------------------------------------------------ |
  | API_INSTAGRAM_URL | string | https://instagram-scraper-api2.p.rapidapi.com/v1.1/hashtag   |
  | API_TWITTER_URL   | string | https://twitter154.p.rapidapi.com/search/search/continuation |
  | API_KEY_TWITTER   | string | af717fa85cmsh5c905eb77e872c3p184c12jsnac491d5ca93b           |
  | API_KEY_INSTAGRAM | string | d8e11cc399msh5955dcb503544dap13dc2ejsn4d181a8ab1cf           |

```bash
  npm install

  # for development server
  npm run dev

  # for production server
  npm run build
  npm run preview
```

## Routes

| Name       | Explanation             |
| ---------- | ----------------------- |
| /          | Where searches are made |
| /statistic | Showing statistics      |
