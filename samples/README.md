# dashjs-webrtc-socketio Integration Samples
## Provided by Geometris for HCSS

## Overview

This repository contains sample implementations demonstrating the **dashjs-webrtc-socketio** package - a modified version of the dash.js video player that adds WebRTC streaming capabilities via Socket.io signaling, with full STUN/TURN server support for reliable peer-to-peer connections. The package is based on a fork from https://github.com/PJ-AWT-SS22-WebRTC-Broadcast-in-dash-js/webrtc-in-dash.js.

The package enables real-time video streaming from camera devices (dashcams) through WebRTC while maintaining full compatibility with standard DASH (Dynamic Adaptive Streaming over HTTP) playback.

## Key Features

- **Dual Mode Support**: Seamlessly switch between WebRTC live streaming and DASH adaptive streaming
- **Socket.io Integration**: Real-time WebRTC signaling through Socket.io for device communication
- **STUN/TURN Support**: Built-in ICE server configuration for NAT traversal
- **Multi-Camera Support**: Switch between multiple camera feeds (front/rear) in real-time
- **Customer Integration Ready**: Demonstrates implementation approach for HCSS fleet management systems

## Sample Projects

### 1. react-dashjs-demo
**Location**: `dashjs-player/react-dashjs-demo`
**Live Demo**: https://skyonicsdevstorage10.z22.web.core.windows.net/dashjs_demo/?serialnumber=100151819016

A comprehensive demonstration application showcasing full capabilities:
- Interactive UI for WebRTC connection configuration
- Support for both WebRTC and DASH streaming modes
- Real-time camera switching functionality
- Debug mode for troubleshooting
- ICE server configuration interface
- Built with React 19 and TypeScript

### 2. reactjs-webrtc (HCSS Implementation Example)
**Location**: `dashjs-player/reactjs-webrtc`
**Live Demo**: https://skyonicsdevstorage10.z22.web.core.windows.net/dashjs_demo_min/?serialnumber=100151819016

Sample implementation showing how HCSS integrates the video player:
- Modal-based dashcam live feed interface
- Example integration with HCSS fleet management UI components
- Automatic stream URL management and expiration handling
- Browser compatibility detection
- Built with React 17, Bootstrap 3, and jQuery for compatibility

## Installation

### Installing the Package

Both sample projects use the dashjs-webrtc-socketio package distributed as a `.tgz` file:

```bash
# Install in your project
npm install dashjs-webrtc-socketio-4.4.2.tgz
```

### Sample Project Setup

#### react-dashjs-demo

```bash
cd dashjs-player/react-dashjs-demo
npm install  # For Node 22+, use: npm install --legacy-peer-deps
npm start  # Development server at http://localhost:3000
```

#### reactjs-webrtc

```bash
cd dashjs-player/reactjs-webrtc
npm install  # For Node 22+, use: npm install --legacy-peer-deps
npm start  # Development server at http://localhost:3000
```

## Configuration

### WebRTC Configuration Object

```typescript
interface IWebRtcConfig {
    enabled: boolean;           // Enable WebRTC mode
    dashOnFail?: boolean;      // Fallback to DASH on WebRTC failure
    mode?: "socketio" | "whpp"; // Signaling mode (use "socketio")
    socketUrl?: string;        // WebSocket server URL
    serialNumber?: string;     // Device serial number
    apiKey?: string;          // Authentication API key
    cameraIndex?: number;      // Camera selection (0=front, 1=rear)
    debug?: boolean;          // Enable debug logging
    iceServers?: Array<{      // ICE/STUN/TURN servers
        urls: string;
        username?: string;
        credential?: string;
    }>;
}
```

### Default Configuration

```javascript
const defaultWebRtcConfig = {
    enabled: true,
    mode: "socketio",
    socketUrl: "wss://camera.geometris.com",
    serialNumber: "100151819016",
    apiKey: "ne83247hdhiwe384jdh",
    cameraIndex: 0,
    debug: false,
    iceServers: [
        { urls: "stun:camera.geometris.com:3478" },
        {
            urls: "turn:camera.geometris.com:3478",
            username: "devices",
            credential: "A82*ndcBX"
        }
    ]
};
```

## Usage Examples

### Basic WebRTC Initialization

```javascript
import * as DashJS from "dashjs-webrtc-socketio";

// Create player instance
const player = DashJS.MediaPlayer().create();

// Configure for WebRTC
player.updateSettings({
    webRtc: {
        enabled: true,
        mode: "socketio",
        socketUrl: "wss://camera.geometris.com",
        serialNumber: "100151819016",
        apiKey: "your-api-key",
        cameraIndex: 0,
        iceServers: [
            { urls: "stun:camera.geometris.com:3478" },
            {
                urls: "turn:camera.geometris.com:3478",
                username: "devices",
                credential: "A82*ndcBX"
            }
        ]
    }
});

// Initialize with video element
player.initialize(videoElement, socketUrl, true);
```

### Camera Switching

```javascript
// Get WebRTC handler
const handler = player.getWebRtcHandler();

if (handler && handler.isConnected()) {
    // Switch between front and rear cameras
    handler.switchCamera();
}
```

### Connection State Monitoring

```javascript
const handler = player.getWebRtcHandler();
const state = handler.getConnectionState();

if (handler.isConnected()) {
    console.log("Connected to device");
} else if (state.state === "failed") {
    console.log("Connection failed");
}
```

### Standard DASH Playback

```javascript
// For standard DASH streaming (no WebRTC)
const player = DashJS.MediaPlayer().create();
player.initialize(
    videoElement,
    "https://dash.akamaized.net/akamai/bbb_30fps/bbb_30fps.mpd",
    true // autoPlay
);
```

## API Reference

### MediaPlayer Methods

| Method | Description |
|--------|-------------|
| `create()` | Creates a new MediaPlayer instance |
| `initialize(video, url, autoPlay)` | Initializes the player with video element |
| `updateSettings(settings)` | Updates player configuration |
| `getWebRtcHandler()` | Returns the WebRTC handler instance |
| `reset()` | Resets the player state |
| `destroy()` | Destroys the player and frees resources |

### WebRTC Handler Methods

| Method | Description |
|--------|-------------|
| `isConnected()` | Returns true if WebRTC connection is active |
| `getConnectionState()` | Returns detailed connection state object |
| `switchCamera()` | Switches between available cameras |
| `destroy()` | Closes WebRTC connection and cleans up |

## Production Deployment

### Building for Production

#### react-dashjs-demo
```bash
cd dashjs-player/react-dashjs-demo
npm run build  # Creates dist/ folder
```

#### reactjs-webrtc
```bash
cd dashjs-player/reactjs-webrtc
npm run build  # Creates dist/ folder
```

### Deployment Options

1. **Static Web Hosting** (Azure Storage, AWS S3, etc.)
   - Upload contents of `dist/` folder
   - Configure CORS for API endpoints
   - Set up CDN for optimal performance

2. **Docker Deployment**
   ```dockerfile
   FROM nginx:alpine
   COPY dist /usr/share/nginx/html
   EXPOSE 80
   ```

3. **Integration with Existing Systems**
   - Import the DashcamLiveFeedModal component
   - Configure with your WebRTC server details
   - Customize UI to match your branding

## Network Requirements

### Firewall Configuration
- **WebSocket**: Port 443 (wss://) or 80 (ws://)
- **STUN**: Port 3478 (UDP)
- **TURN**: Port 3478 (UDP/TCP)
- **Media**: Dynamic port range (typically 10000-20000 UDP)

### Bandwidth Requirements
- **Minimum**: 2 Mbps for standard quality
- **Recommended**: 5+ Mbps for HD quality
- **Multiple Cameras**: Multiply by number of concurrent streams

## Browser Compatibility

| Browser | WebRTC | DASH | Notes |
|---------|--------|------|-------|
| Chrome 90+ | ✅ | ✅ | Full support |
| Firefox 85+ | ✅ | ✅ | Full support |
| Edge 90+ | ✅ | ✅ | Full support |
| Safari 14+ | ✅ | ⚠️ | Limited DASH support |
| iOS Safari | ✅ | ❌ | WebRTC only |

## Troubleshooting

### Common Issues

**Connection Timeout**
- Verify device is online and serial number is correct
- Check firewall allows UDP traffic on STUN/TURN ports
- Ensure API key has proper permissions

**No Video After Connection**
- Check camera permissions in browser
- Verify ICE servers are accessible
- Enable debug mode to see detailed logs

**Camera Switch Not Working**
- Ensure device supports multiple cameras
- Verify cameraIndex values (0 or 1)
- Check WebRTC handler is properly initialized

**DASH Playback Issues**
- Verify CORS headers on DASH manifest
- Check browser console for specific errors
- Ensure manifest URL is accessible

### Debug Mode

Enable detailed logging:

```javascript
player.updateSettings({
    webRtc: {
        debug: true
    },
    debug: {
        logLevel: 4  // 0=none, 5=verbose
    }
});
```

## Support

### Documentation
- Package Documentation: See individual project READMEs
- dash.js Documentation: https://github.com/Dash-Industry-Forum/dash.js/wiki

### Reporting Issues
For issues specific to the WebRTC/Socket.io integration, please contact Geometris support with:
- Device serial number
- Browser version and OS
- Network configuration (especially firewall/proxy)
- Console logs with debug mode enabled

## License

This software is provided by Geometris to HCSS under the terms of the service agreement. The underlying dash.js library is licensed under BSD-3-Clause.

## Version Information

- **Package Version**: 4.4.2
- **Based on dash.js**: 4.x
- **React Samples**: React 17/19 compatible
- **Node.js**: 14.20.0+ (tested with 14.20.0 and 22.15.0, may require --legacy-peer-deps flag for Node 22+)

---

*For additional technical details or support, please contact Geometris at support@geometris.com.*