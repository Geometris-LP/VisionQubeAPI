interface IDashcamLiveFeedInfoModel {
    GpsSerial: string;
    CameraId: string;
    LiveFeedUrl: string;
}

const mockLiveFeedData: IDashcamLiveFeedInfoModel[] = [
    {
        GpsSerial: "GPS123456",
        CameraId: "0",
        LiveFeedUrl: "https://dash.akamaized.net/akamai/bbb_30fps/bbb_30fps.mpd"
    },
    {
        GpsSerial: "GPS123456",
        CameraId: "1",
        LiveFeedUrl: "https://dash.akamaized.net/envivio/EnvivioDash3/manifest.mpd"
    }
];

export class GenericService {
    /**
     * Mock GET request to retrieve data from a given URL.
     * @param {string} url - URL to make the GET request to.
     * @param {string} method - HTTP method to use (always 'GET' for this function).
     * @param {any} params - Optional parameters to pass to the GET request.
     * @returns {JQuery.jqXHR<any>} - A jQuery Deferred promise that resolves with an array of IDashcamLiveFeedInfoModel objects.
     * @remarks
     * In WebRTC mode, the function returns an array of objects with placeholder URLs for WebRTC camera identifiers.
     * In DASH mode, the function returns an array of objects with actual DASH stream URLs.
     * If the URL does not contain the '/api/v1/Dashcams/' endpoint, the function rejects the promise with a mock error.
     */
    static get(url: string, method: string, params: any): JQuery.jqXHR<any> {
        console.log(`GenericService.get called with URL: ${url}`);
        
        const deferred = $.Deferred<IDashcamLiveFeedInfoModel[]>();
        
        setTimeout(() => {
            if (url.includes('/api/v1/Dashcams/') && url.includes('/LiveFeedInfos')) {
                // Check if we're in WebRTC mode
                const streamingMode = (window as any).streamingMode || 'dash';
                
                if (streamingMode === 'webrtc') {
                    // For WebRTC, we don't need actual URLs, just camera identifiers
                    const webRtcData: IDashcamLiveFeedInfoModel[] = [
                        {
                            GpsSerial: "GPS123456",
                            CameraId: "0",
                            LiveFeedUrl: "webrtc://camera0" // Placeholder URL for WebRTC
                        },
                        {
                            GpsSerial: "GPS123456",
                            CameraId: "1",
                            LiveFeedUrl: "webrtc://camera1" // Placeholder URL for WebRTC
                        }
                    ];
                    console.log('Returning WebRTC camera data');
                    deferred.resolve(webRtcData);
                } else {
                    console.log('Returning DASH stream URLs');
                    deferred.resolve(mockLiveFeedData);
                }
            } else {
                deferred.reject({
                    responseJSON: "Mock error: Endpoint not found",
                    responseText: "Mock error: Endpoint not found"
                });
            }
        }, 500);
        
        return deferred as any;
    }
}
