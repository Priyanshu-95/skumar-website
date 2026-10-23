# Google Sheets Form Integration — S Kumar Construction & Interior

Backend integration for automatic inquiry capture into Google Sheets using Google Apps Script.

- **Authorized Account**: `infoskumarinterior@gmail.com`
- **Spreadsheet Name**: `S Kumar Construction & Interior - Form Responses`

---

## 🚀 One-Time Deployment Instructions

Follow these steps to deploy your Google Apps Script backend:

### Step 1: Open Google Apps Script
1. Open your browser and make sure you are logged in as **`infoskumarinterior@gmail.com`**.
2. Navigate to: [https://script.google.com/](https://script.google.com/)
3. Click the **+ New project** button (top left).
4. Rename the project from *"Untitled project"* to **"S Kumar Form Integration"** by clicking the title at the top.

### Step 2: Paste the Code
1. In the Apps Script editor, open the existing file `Code.gs`.
2. Delete everything inside `Code.gs`.
3. Open [`google-apps-script/Code.gs`](./Code.gs) from this repository, copy the entire code, and paste it into the Apps Script editor.
4. Save the project: press `Ctrl + S` (or click the disk icon).

### Step 3: Deploy as a Web App
1. Click the blue **Deploy** button in the top-right corner.
2. Select **New deployment**.
3. In the dialog that appears, click the gear icon (⚙️) next to "Select type" and choose **Web app**.
4. Configure the deployment settings **exactly** as follows:
   - **Description**: `S Kumar Form Integration v1`
   - **Execute as**: **`Me (infoskumarinterior@gmail.com)`**
   - **Who has access**: **`Anyone`** *(Important: Do not select "Only myself" or users will not be able to submit from the website)*
5. Click **Deploy**.

### Step 4: Authorize Permissions
1. Google will display an "Authorization required" prompt.
2. Click **Authorize access**.
3. Choose the account: **`infoskumarinterior@gmail.com`**.
4. If Google displays *"Google hasn't verified this app"*, click **Advanced** at the bottom left, then click **Go to S Kumar Form Integration (unsafe)**.
5. Click **Allow** to grant permission to create/manage the spreadsheet on your Google Drive.

### Step 5: Copy the Web App URL & Configure the Website
1. Once deployed, Google Apps Script will display your **Web app URL**. It looks like:
   ```
   https://script.google.com/macros/s/AKfycb.../exec
   ```
2. Copy this URL.
3. In the root of your website directory, open or create a `.env` file:
   ```env
   VITE_GOOGLE_SCRIPT_URL="https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec"
   ```
4. Restart your Vite development server or build the website:
   ```bash
   npm run dev
   ```

---

## 📋 What Happens Automatically

1. **Spreadsheet Auto-Creation**:
   Upon the first submission, Google Apps Script will search Drive for a spreadsheet named `S Kumar Construction & Interior - Form Responses`. If it does not exist, it creates it automatically in your Google Drive under `infoskumarinterior@gmail.com`.
2. **Dedicated Tabs**:
   - `Contact Inquiries`: For inquiries from the Contact Page (`ContactPage.tsx`).
   - `Estimator Inquiries`: For inquiries from the Quick Estimator Modal (`ProjectEstimatorModal.tsx`).
   - `Dashboard`: Provides an overview of the connected integration.
3. **Structured Columns**:
   Headers are created with timestamps in Indian Standard Time (IST), customer contact info, property type, budget, and project notes.
4. **Row Append Only**:
   Submissions are always appended as a new row at the bottom. Existing rows are never overwritten.
5. **Anti-Spam & Security**:
   - Hidden honeypot traps bot submissions silently.
   - Server-side validation requires valid names and contact numbers.
   - Concurrency locking prevents double entries during simultaneous submissions.
   - No private Google access tokens or API keys are exposed to the public frontend.
