# Ayn Platform - Load Testing Report

## 1. Tooling and Test Scenario
-   **Tool:** k6 (Grafana Labs)
-   **Test Script:** `homepage_load_test.js` (included in this directory)
-   **Scenario:** A load test was executed to simulate **20 concurrent users** accessing the application's homepage (`https://qa-getdal-3a.getdal.sa/`) continuously for a duration of **1 minute**.

## 2. Success Criteria (Thresholds)
The test was configured with the following performance thresholds:
-   **95th Percentile Response Time:** Less than 3000ms.
-   **95th Percentile Time to First Byte (TTFB):** Less than 1500ms.
-   **Error Rate:** Less than 2% of requests failing.a

## 3. Executive Summary of Results
**The application is not stable under load and failed the test catastrophically.** The server was unable to handle the moderate load of 20 concurrent users, resulting in a **100% error rate**. None of the 1,200 requests made during the test were successful.

This indicates a critical performance bottleneck that would result in a complete service outage for all users if the application were to experience even a small amount of simultaneous traffic.

## 4. Detailed Metrics
The full results can be viewed in the `load_test_results.png` screenshot. Key findings include:
-   **`http_req_failed`**: **100.00%** (Threshold Failed: `rate<0.02`)
-   **`checks` ('status is 200')**: **0% success rate** (0 out of 1200 checks passed)
-   **`http_reqs`**: 1200 total requests were sent.

## Conclusion
The load test successfully identified a critical performance failure. The application in its current state cannot support the required number of concurrent users and requires immediate performance and stability optimization.