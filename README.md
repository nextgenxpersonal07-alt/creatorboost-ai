# CreatorBoost AI

A powerful AI-driven toolkit for content creators to generate viral titles, keywords, hashtags, scripts, and content plans.

## 📥 How to Download the Source Code
To export this entire project for local development or Vercel deployment:
1. Look at the **top-right header** of the Firebase Studio interface.
2. Click the **ZIP Icon** (Download button).
3. This will package all project files into a single archive for you.

## 🛠️ Local Development Setup

Once you've downloaded and extracted the ZIP file:

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Environment Variables**:
   Create a `.env.local` file in the root directory and add your keys:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   GEMINI_API_KEY=your_google_ai_key
   ```

3. **Run the Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🚀 How to Deploy to Vercel (Free)

1. **Push to GitHub**: 
   - Create a new repository on [GitHub](https://github.com).
   - Initialize git in your local project: `git init`.
   - Add files: `git add .`.
   - Commit: `git commit -m "Initial commit"`.
   - Push to your repo: `git remote add origin <your-repo-url>` and `git push -u origin main`.

2. **Connect to Vercel**:
   - Go to [Vercel](https://vercel.com) and sign in with GitHub.
   - Click **"Add New"** > **"Project"**.
   - Import your `CreatorBoost AI` repository.

3. **Configure Environment Variables**:
   In the Vercel deployment settings, add the keys listed in the "Environment Variables" section above. **Crucial:** Make sure `GEMINI_API_KEY` is added to enable AI features.

4. **Deploy**:
   - Click **"Deploy"**. Vercel will automatically build and host your site!

## Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS + ShadCN UI
- **AI**: Google Gemini via Genkit
- **Backend**: Firebase (Auth & Firestore)
