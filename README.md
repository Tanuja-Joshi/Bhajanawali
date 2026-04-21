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

This app uses MongoDB Atlas (cloud database). The connection string is stored in `db.js`.

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
- Check MongoDB Atlas credentials in `db.js`
- Ensure IP is whitelisted in Network Access

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
