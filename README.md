# Backend API

## Environment Variables

Create a `.env` file with:

```env
PORT=5000
SUPABASE_URL= supabase_url
SUPABASE_ANON_KEY=supabase_anon_key
```

## Installation

npm install

## Running

Development mode with auto-reload:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## API Documentation

All endpoints return JSON responses.

### Health Check
```
GET /health
```

### Master Data

```
GET /api/master/boards
GET /api/master/mediums
GET /api/master/classes
GET /api/master/academic-years
GET /api/master/books
```

### Book Sets

```
GET /api/book-set
GET /api/book-set/:id
POST /api/book-set/create
PUT /api/book-set/:id
DELETE /api/book-set/:id
```
