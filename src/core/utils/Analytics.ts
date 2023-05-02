/*
 * Copyright (c) 2023 Arbaz Pirwani
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */

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
