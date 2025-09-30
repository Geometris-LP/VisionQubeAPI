# Dashcam Live Feed Modal - React Application

This is a complete React.js application demonstrating the usage of the `DashcamLiveFeedModal` component.

## Features

- Live dashcam video streaming using MPEG-DASH
- Support for multiple camera views (front and rear)
- Browser compatibility checks
- Stream URL expiration handling
- Responsive Bootstrap UI

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Install dependencies:
```bash
npm install
```

## Development

Run the development server:
```bash
npm start
```

The application will open automatically at `http://localhost:8081`

## Building for Production

Build the production-ready files:
```bash
npm run build
```

This will create a `dist` folder with all the optimized files.

## Deployment

### Option 1: Static Server

After building, serve the files using the included serve package:
```bash
npm run serve
```

### Option 2: Web Server Deployment

1. Run `npm run build`
2. Upload the contents of the `dist` folder to your web server
3. Ensure your web server serves `index.html` for all routes

### Option 3: Docker (nginx)

Create a `Dockerfile`:
```dockerfile
FROM nginx:alpine
COPY dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Then build and run:
```bash
docker build -t dashcam-app .
docker run -p 8080:80 dashcam-app
```

## Project Structure

```
reactjs-webrtc/
├── src/
│   ├── components/
│   │   └── DashcamLiveFeedModal.tsx  # Main component
│   ├── mocks/
│   │   └── hcss-components.tsx       # Mock HCSS components
│   ├── Telematics-bundle-components/
│   │   └── TeleIndex.tsx              # Mock Telematics components
│   ├── types/
│   │   └── dashjs.d.ts               # TypeScript definitions
│   ├── GenericService.ts             # Mock API service
│   ├── App.tsx                       # Main app with usage example
│   └── index.tsx                     # Entry point
├── public/
│   └── index.html                    # HTML template
├── package.json                      # Dependencies
├── tsconfig.json                     # TypeScript config
└── webpack.config.js                 # Webpack config
```

## Component Usage

The application has two modes: DASH and WebRTC.

### DASH Mode (Default)

- No configuration required
- Simply click "Open Dashcam Live Feed Modal" to start streaming with sample MPEG-DASH streams

### WebRTC Mode

When you check "Use WebRTC with Socket.IO", you must provide:

1. **Serial Number** (Text Input)
   - Device serial number
   - Required for WebRTC mode only

2. **API Key** (Password Input)
   - Authentication key for WebRTC connection
   - Required for WebRTC mode only
   - Entered via password input field for security

### Usage Flow

**For DASH Mode:**
1. Click "Open Dashcam Live Feed Modal" to start streaming

**For WebRTC Mode:**
1. Check the "Use WebRTC with Socket.IO" checkbox
2. Enter the device serial number in the "Serial Number" text field
3. Enter the API key in the "API Key" password field
4. Click "Open Dashcam Live Feed Modal" to start streaming

The component will validate that both serial number and API key are provided when WebRTC mode is enabled.

### Programmatic Usage

```typescript
import { init, IWebRtcConfig } from './components/DashcamLiveFeedModal';

// For DASH mode
init('GPS123456', 'Equipment-001', document.getElementById('container'), 'dash');

// For WebRTC mode
const webrtcConfig: IWebRtcConfig = {
    enabled: true,
    mode: "socketio",
    socketUrl: "wss://camera.geometris.com",
    serialNumber: "your-serial-number",
    apiKey: "your-api-key",
    cameraIndex: 0,
    debug: true,
    iceServers: [
        { urls: "stun:camera.geometris.com:3478" },
        {
            urls: "turn:camera.geometris.com:3478",
            username: "devices",
            credential: "A82*ndcBX"
        }
    ]
};
init('GPS123456', 'Equipment-001', document.getElementById('container'), 'webrtc', webrtcConfig);
```

## Notes

- The demo uses mock data with sample MPEG-DASH streams
- Mac/iPhone devices are not supported due to MPEG-DASH compatibility
- In production, replace the mock `GenericService` with actual API endpoints