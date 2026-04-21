# Bhajanawali - Bhajan Management Mobile App

A beautiful mobile and web app for managing and sharing Bhajans (devotional songs).

## Features

✨ **Core Features:**
- 📚 Browse bhajans library
- ➕ Add new bhajans
- 🔍 Search functionality
- 🎵 YouTube links for each bhajan
- 📱 Fully responsive mobile design
- 🔄 Offline support (PWA)

🔧 **Tech Stack:**
- **Backend:** Node.js, Express, MongoDB
- **Frontend:** React, Axios
- **Database:** MongoDB Atlas

## Project Structure

```
Bhajanawali/
├── index.js                 # Backend entry point
├── db.js                    # MongoDB connection
├── package.json             # Backend dependencies
├── models/
│   └── bhajanSchema.js     # Bhajan database schema
├── routes/
│   └── bhajans.js          # API endpoints
├── views/                   # Handlebars templates
└── client/                  # React mobile app
    ├── package.json        # Frontend dependencies
    ├── public/             # Static files
    │   ├── index.html
    │   ├── manifest.json   # PWA manifest
    │   └── service-worker.js
    └── src/
        ├── App.js          # Main component
        ├── api.js          # API client
        └── components/     # React components
```

## Setup Instructions

### 1. Install Node.js
Download from https://nodejs.org/ and install

### 2. Backend Setup

Navigate to project root:
```powershell
cd C:\Tanuja\Bhajanawali
```

Install dependencies:
```powershell
& 'C:\Program Files\nodejs\npm.cmd' install
```

### 3. Frontend Setup

Navigate to client folder:
```powershell
cd client
```

Install dependencies:
```powershell
& 'C:\Program Files\nodejs\npm.cmd' install
```

## Running the App

### Option 1: Run Backend Only (Terminal 1)
```powershell
cd C:\Tanuja\Bhajanawali
& 'C:\Program Files\nodejs\node.exe' index.js
```

Access web at: http://localhost:3000

### Option 2: Run Both Backend and Frontend

**Terminal 1 - Backend:**
```powershell
cd C:\Tanuja\Bhajanawali
& 'C:\Program Files\nodejs\node.exe' index.js
```

**Terminal 2 - Frontend:**
```powershell
cd C:\Tanuja\Bhajanawali\client
& 'C:\Program Files\nodejs\npm.cmd' start
```

Frontend starts at: http://localhost:3000 or http://localhost:3001 (if port 3000 is busy)

## API Endpoints

### GET Endpoints
- `GET /api/bhajans` - Get all bhajans
- `GET /api/bhajans/:id` - Get single bhajan by ID

### POST Endpoints
- `POST /api/bhajans` - Add new bhajan
  ```json
  {
    "name": "Bhajan Name",
    "Bhajan": "Bhajan lyrics...",
    "link": "https://youtube.com/watch?v=..."
  }
  ```

### PUT Endpoints
- `PUT /api/bhajans/:id` - Update bhajan

### DELETE Endpoints
- `DELETE /api/bhajans/:id` - Delete bhajan

## Importing Data

To import bhajans from JSON file:
```powershell
& 'C:\Program Files\nodejs\node.exe' import.js
```

## Database

This app now supports two storage modes:

- **MongoDB mode:** set `MONGODB_URI` in a root `.env` file
- **Local fallback mode:** if `MONGODB_URI` is missing or MongoDB is unreachable, the app serves and edits bhajans from a local JSON file under `data/bhajans.local.json`

Create a root `.env` file if you want MongoDB:

```powershell
cd C:\Tanuja\Bhajanawali
Copy-Item .env.example .env
```

Then set:

```env
MONGODB_URI=your-mongodb-connection-string
PORT=3000
```

## Alternate Lyrics Matching

The app can now queue a background lookup for the alternate script after a bhajan is saved.

- User-entered text is always kept as the trusted original
- Alternate lyrics are stored separately with a status such as `queued`, `searching`, `matched`, or `needs_search`
- The first trusted source is a curated local registry at `data/trustedLyricsRegistry.json`

Each registry entry should look like:

```json
[
  {
    "title": "Ram aayenge",
    "aliases": ["Ram Aayenge", "Awadh mein Ram aayenge"],
    "source": "manual_review",
    "hindi": {
      "name": "राम आएंगे",
      "lyrics": "..."
    },
    "hinglish": {
      "name": "Ram aayenge",
      "lyrics": "..."
    }
  }
]
```

You can manually re-trigger matching for a bhajan with:

```powershell
Invoke-WebRequest -Method Post -UseBasicParsing http://localhost:3000/api/bhajans/<id>/match-alternate
```

## Mobile App Features

### Search & Browse
- Search bhajans by name or lyrics
- Beautiful card-based UI
- Smooth animations

### Add Bhajans
- Simple form to add new bhajans
- Validation for required fields
- YouTube link integration

### Offline Support
- Service worker caches bhajans
- Works offline with cached data
- Syncs when connection returns

### Install as App
- Add to home screen on mobile
- Standalone app experience
- App icon on home screen

## Troubleshooting

**Issue: "npm: The term 'npm' is not recognized"**
- Use full path: `& 'C:\Program Files\nodejs\npm.cmd' install`

**Issue: "Port 3000 already in use"**
- Kill existing processes: `Get-Process node | Stop-Process -Force`

**Issue: MongoDB connection error**
- Check `MONGODB_URI` in your root `.env`
- Ensure Atlas credentials are valid and your IP is whitelisted
- The app will fall back to local JSON storage if MongoDB is unavailable

**Issue: CORS errors**
- CORS is enabled in the backend
- Check that both frontend and backend are running

## Development

### Run with live reload (Backend)
```powershell
& 'C:\Program Files\nodejs\npm.cmd' run dev
```

### Build for production (Frontend)
```powershell
cd client
& 'C:\Program Files\nodejs\npm.cmd' run build
```

## Future Enhancements

- User authentication
- Favorites/bookmarks
- Comment system
- Sharing bhajans
- Multiple languages
- Dark mode
- Advanced search filters
- Rate/review system

## License

MIT License

## Support

For issues or questions, reach out to the development team.
