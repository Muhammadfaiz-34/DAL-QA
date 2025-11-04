# Ayn Platform - Bug Reports

This document details the bugs discovered during the manual testing phase of the QA assessment. A total of **7 bugs** were identified.

---

### Bug-001: Missing User Management Functionality
-   **Severity:** **High**
-   **Title:** Critical Functionality Missing: Super Admin Cannot Create or Manage Users via UI.
-   **Environment:** https://qa-getdal-3a.getdal.sa/
-   **Steps to Reproduce:**
    1.  Log in as Super Admin.
    2.  Observe the main navigation panel on the left.
    3.  Search for any UI element related to "User Management," "Admin," or "Team Settings."
-   **Expected Result:** As per the PRD, the Super Admin should have a visible UI section to create, edit, and manage other users and their permissions.
-   **Actual Result:** There is no apparent functionality in the user interface for managing users. This core feature from the PRD is missing, blocking all related tests.

---

### Bug-002: Discrepancy in Mandatory Fields for Client Creation
-   **Severity:** **High**
-   **Title:** Client Creation Fails: Undocumented mandatory fields ("Name in Arabic", "Nationality") are enforced in the UI.
-   **Environment:** https://qa-getdal-3a.getdal.sa/clients
-   **Steps to Reproduce:**
    1.  Log in and navigate to "Clients" -> "Add Client".
    2.  Fill in only the fields specified as mandatory in the PRD ("Name", "ID Type", "ID Number").
    3.  Attempt to save the client.
-   **Expected Result:** The client should be created successfully.
-   **Actual Result:** The UI displays validation errors for "First Name Arabic" and "Nationality," preventing the client from being saved. The application's validation requirements differ from the PRD.

---

### Bug-003: Data Corruption on Bulk Upload
-   **Severity:** **High**
-   **Title:** Data Corruption: Arabic characters are not encoded correctly during bulk client CSV upload.
-   **Environment:** https://qa-getdal-3a.getdal.sa/clients
-   **Steps to Reproduce:**
    1.  Create a valid client upload CSV file.
    2.  In the `name_ar` column, enter valid Arabic text.
    3.  Upload the CSV file.
    4.  Observe the new client's data in the client list.
-   **Expected Result:** The Arabic name should be displayed exactly as it was entered in the CSV file.
-   **Actual Result:** The Arabic name is replaced with a series of question marks (`??????`), indicating a character encoding error.

---

### Bug-004: Silent Failure on Bulk Upload Limit
-   **Severity:** **Medium/High**
-   **Title:** Silent Failure: Bulk upload of more than 10 clients is partially processed without any error message.
-   **Environment:** https://qa-getdal-3a.getdal.sa/clients
-   **Steps to Reproduce:**
    1.  Create a CSV file with 11 valid client records.
    2.  Upload this file using the bulk upload feature.
-   **Expected Result:** The upload should be rejected, and an error message should be displayed informing the user that the file exceeds the 10-record limit.
-   **Actual Result:** The system uploads the first 10 records and silently ignores the 11th record. No error is displayed.

---

### Bug-005: Unhandled Server Error on Bulk Re-upload
-   **Severity:** **High**
-   **Title:** Unhandled Error (400 Bad Request) on re-uploading a client file that exceeds the maximum limit.
-   **Environment:** https://qa-getdal-3a.getdal.sa/clients
-   **Steps to Reproduce:**
    1.  Perform the steps for Bug-004 (upload a file with 11 records).
    2.  Attempt to upload the *exact same file* a second time.
    3.  A dialog will appear asking to "update client records." Proceed with the upload.
-   **Expected Result:** A user-friendly validation message should be displayed, such as "Your file exceeds the 10-client limit."
-   **Actual Result:** The system displays a generic, technical error: "Request failed with status code 400."

---

### Bug-006: UI Inconsistency in Client List Sorting
-   **Severity:** **Low**
-   **Title:** UI Inconsistency: 'Sort by Account opening date' is available, but this data is not visible in the client list.
-   **Environment:** https://qa-getdal-3a.getdal.sa/clients
-   **Steps to Reproduce:**
    1.  Navigate to the "Clients" list page.
    2.  Click on the "Sort" dropdown menu.
-   **Expected Result:** Sort options should correspond to visible columns so the user can verify the sort order.
-   **Actual Result:** The sort menu includes "Account opening date," but this is not a visible column, making it impossible to verify the action.

---

### Bug-007: Silent Data Loss on Bulk Upload
-   **Severity:** **Critical**
-   **Title:** Critical Data Loss: Bulk upload silently fails to import clients with 'Iqama' ID type.
-   **Environment:** https://qa-getdal-3a.getdal.sa/clients
-   **Steps to Reproduce:**
    1.  Create a bulk upload CSV with multiple clients, including one with "Id type" set to "Iqama".
    2.  Upload the file.
    3.  Review the client list.
-   **Expected Result:** All clients from the CSV file should be present in the client list.
-   **Actual Result:** The client with the "Iqama" ID type is completely missing. The system gives no warning about the failed record.