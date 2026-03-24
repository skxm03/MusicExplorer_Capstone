# Music Explorer App

## Project Overview

Music Explorer is a responsive web application built with HTML, CSS, and vanilla JavaScript.
It uses the iTunes Search API to fetch and display real-time song data, and allows users to search, filter, and sort results.

## Project Purpose

This project demonstrates:

- API integration using `fetch`
- Dynamic UI rendering with JavaScript
- Use of array HOFs
- Clean and responsive frontend design

## Public API Used

- **API Name:** iTunes Search API
- **Endpoint:** `https://itunes.apple.com/search?term={query}&entity=song`
- **Docs/Reference:** Apple iTunes Search API (public endpoint)

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript (ES6+)
- Fetch API (for HTTP requests)

## Current Features

- Search songs by song name or artist name
- Dynamic song cards with:
    - Album artwork
    - Song title
    - Artist name
    - Audio preview player
- Sorting options:
    - Song name (A-Z)
    - Artist name (A-Z)
- Artist filtering (client-side)
- Loading state during API requests
- Error handling for failed requests and empty results
- Responsive layout for mobile, tablet, and desktop

## Project Structure

```
Capstone/
├── index.html
├── style.css
└── script.js
```

## Setup and Run

1. Clone the repository:
    ```bash
    git clone <your-repository-url>
    ```
2. Open the project folder.
3. Run by opening `index.html` directly in a browser.

No build tools or installations are required.
