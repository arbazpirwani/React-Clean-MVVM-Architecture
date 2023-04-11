class MixpanelLogger {
    private static readonly MIXPANEL_TOKEN = 'YOUR_MIXPANEL_TOKEN';

    logEvent(eventName: string, properties?: any) {
        if (typeof window !== 'undefined') {
            // mixpanel.track(eventName, properties);
            console.log(`Mixpanel event: ${eventName}`, properties);
        } else {
            console.log(`Mixpanel event: ${eventName}`, properties);
        }
    }
}

class FacebookEventLogger {
    private static readonly FACEBOOK_APP_ID = 'YOUR_FACEBOOK_APP_ID';

    logEvent(eventName: string, properties?: any) {
        if (typeof window !== 'undefined') {
            // facebook.track(eventName, properties);
            console.log(`Facebook event: ${eventName}`, properties);
        } else {
            console.log(`Facebook event: ${eventName}`, properties);
        }
    }
}

const mixpanelLogger = new MixpanelLogger()
const facebookEventLogger = new FacebookEventLogger()


export function logAnalytics(eventName: string, properties?: Record<string, any>): void {
    mixpanelLogger.logEvent(eventName, properties);
    facebookEventLogger.logEvent(eventName, properties);
}
