# FreeLike v2 — Auto Liker Dashboard with Cloud Storage

## 🚀 Deploy to Vercel (Step by Step)

### STEP 1 — Get Free Cloud Storage (JSONBin)

1. Go to **https://jsonbin.io** → Sign up (free, no credit card)
2. Click **"Create Bin"** → paste `{}` → Save
3. Copy your **Bin ID** (looks like: `64abc123def456...`)
4. Click your avatar → **API Keys** → copy your **Master Key**

---

### STEP 2 — Deploy to Vercel

1. Go to **https://vercel.com** → Sign in → **Add New Project**
2. Click **"Upload"** tab → drag & drop the unzipped **`freelike-v2`** folder
3. Before clicking Deploy → click **"Environment Variables"** and add:

| Name | Value |
|------|-------|
| `JSONBIN_BIN_ID` | Your Bin ID from Step 1 |
| `JSONBIN_API_KEY` | Your Master Key from Step 1 |

4. Click **Deploy** → Wait ~30 seconds → Done! ✅

---

### STEP 3 — Verify

- Open your Vercel URL
- Top right should show: **CLOUD SYNC ✓** (cyan dot)
- Send a test like → check the History tab
- All data now **permanently saved** in JSONBin cloud ☁️

---

## ✨ Features

### 🎮 Dashboard
- Send like instantly with UID + Server picker
- Full API response shown (before/after/given/nickname)
- Live IST clock

### ⏰ Auto Schedule
- Toggle daily auto-like on/off
- Set any time in IST (default 6:00 AM)
- Live countdown HH:MM:SS to next run
- Schedule config saved to cloud

### 📊 Reports Tab
- **Likes per Day** — bar chart (last 7 days)
- **Likes by Server** — which server gets most likes
- **Auto vs Manual** — split chart
- **Success Rate** — percentage and bar chart
- **Daily Summary Table** — full date breakdown

### 📋 History Tab
- Every like ever sent (up to 500 records)
- Filter by UID, Type (Auto/Manual), Status
- Export to **CSV** or **JSON**
- Clear history button

### ⚙️ Settings Tab
- Cloud storage status indicator
- Manual push/pull sync buttons
- Custom API URL config
- Reset all data option

---

## ☁️ Why Cloud Storage?

| | localStorage (old) | JSONBin (new) |
|--|--|--|
| Survives Vercel redeploy | ❌ | ✅ |
| Works on mobile | ❌ | ✅ |
| Works in new browser | ❌ | ✅ |
| Works on different device | ❌ | ✅ |
| Data limit | ~5MB | 10MB free |

**localStorage is still used as a fallback** — if cloud is unavailable, data saves locally and syncs next time.

---

## 📁 File Structure

```
freelike-v2/
├── index.html       ← Full frontend app
├── api/
│   └── data.js      ← Vercel serverless function (cloud R/W)
├── vercel.json      ← Routing config
├── package.json     ← Node runtime spec
└── README.md        ← This file
```

---

## 📡 API Used

```
GET https://sneha-like-api-ixc1.vercel.app/like?uid=UID&server_name=SERVER
```
