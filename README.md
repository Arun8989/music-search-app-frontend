# Music Search App Frontend

React frontend for a MERN-style music streaming application. The UI lets users browse recommended songs, search music, filter by genre and mood, manage playlists, play audio previews, like tracks, comment on songs, download tracks, and share music.

## Live Backend

```text
https://music-search-app-backend.onrender.com/api
```

## Features

- Recommended music feed
- Search by song, artist, album, movie, genre, or mood
- Genre and mood discovery filters
- Playlist creation and song management
- Track likes and comments
- Sticky audio player with play, pause, previous, next, repeat, shuffle, seek, and volume control
- Download links for offline listening
- Social sharing links
- Responsive Tailwind CSS interface

## Tech Stack

- React
- Vite
- Tailwind CSS
- Axios
- Lucide React icons

## Local Setup

```bash
npm install
npm run dev
```

The app runs at:

```text
http://localhost:5173
```

## Environment Variables

Create a `.env` file:

```env
VITE_API_BASE_URL=https://music-search-app-backend.onrender.com/api
```

For local backend testing, use:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

## Build

```bash
npm run build
```

## Netlify Deployment

Use these settings:

- Build command: `npm run build`
- Publish directory: `dist`
- Environment variable: `VITE_API_BASE_URL=https://music-search-app-backend.onrender.com/api`

## Backend Repository

```text
https://github.com/Arun8989/music-search-app-backend
```
