    // Import the necessary modules from the k6 library
import http from 'k6/http';
import { check, sleep } from 'k6';
import { Trend } from 'k6/metrics';

// Create a custom Trend metric to track the TTFB (Time to First Byte).
// This is a great performance metric that tells us how fast the server is responding.
const ttfbTrend = new Trend('ttfb');

// This is the options block where we configure our load test.
export const options = {
  // We'll simulate 20 concurrent users (virtual users).
  vus: 20,
  
  // The test will run for a total duration of 1 minute.
  duration: '1m',

  // These are our success criteria (Thresholds). The test will have a Pass/Fail status based on these.
  thresholds: {
    // We want the 95th percentile of all request durations to be under 3 seconds (3000ms).
    'http_req_duration': ['p(95)<3000'],
    
    // We want the 95th percentile of the Time to First Byte to be under 1.5 seconds (1500ms).
    'ttfb': ['p(95)<1500'],

    // We demand that at least 98% of requests are successful.
    'http_req_failed': ['rate<0.02'], 
  },
};

// This is the main function that each of the 20 virtual users will run in a loop for 1 minute.
export default function () {
  
  // Send an HTTP GET request to the main application page.
  const res = http.get('https://qa-getdal-3d.getdal.sa/');

  // Check if the response status was 200 (OK). This is a functional check.
  check(res, {
    'status is 200': (r) => r.status === 200,
  });

  // Record our custom TTFB metric from the response timings.
  ttfbTrend.add(res.timings.waiting);

  // Add a 1-second pause to simulate a real user waiting between actions.
  sleep(1);
}