# Social Media App 🧑‍🧻‍🧱📸

A full-stack social media application built with [Next.js](https://nextjs.org/), styled using [Tailwind CSS](https://tailwindcss.com/), and powered by [Supabase](https://supabase.com/) for backend services including authentication, real-time database, and storage.

🔗 **Repository**: [https://github.com/MukulTiwari02/social-media-app](https://github.com/MukulTiwari02/social-media-app)

---

## ✨ Features

- 🔐 Authentication with Supabase (Email, Google, GitHub)
- 👤 User Profiles
- 🏠 Home Feed with Posts
- 📝 Create & View Posts (Text + Photos)
- 💬 Like and Comment on Posts
- 💾 Save Posts
- 🛎️ Notifications
- 🧑‍🤝🧑 Friends and Friend Requests

---

## 💪 Tech Stack

- **Frontend:** Next.js, React, Tailwind CSS
- **Backend & Auth:** Supabase (PostgreSQL + Auth + Storage)
- **UI Utilities:** React Icons, React Spinners, Carousel, Time Ago

---

## 📦 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/MukulTiwari02/social-media-app.git
cd social-media-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Supabase

#### a. Create Supabase Account

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up and create a new project.

#### b. Get Supabase Credentials

1. Once your project is ready, go to **Project Settings** → **API**
2. Copy the values for:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` API key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

#### c. Add to `.env` file

Create a `.env.local` file in the root and add:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

#### d. Enable Auth Providers (Google, GitHub)

1. Go to **Authentication → Providers**
2. Enable **Google** and/or **GitHub**
3. Provide OAuth credentials:
   - Follow the guide to [set up Google OAuth](https://supabase.com/docs/guides/auth/auth-google)
   - For GitHub, create an OAuth app [here](https://github.com/settings/developers) and provide the Client ID & Secret

#### e. Create Database Tables

Go to the **SQL Editor** or manually add required tables like profile, posts, likes, friends etc in Supabase:
Note: make sure to look for required tables in the code.

#### f. Create Storage Bucket

1. Go to **Storage** in Supabase
2. Create a new bucket named `photos`(watch console for other requirements to be fulfilled on supabase)
3. Set public access if needed (for quick dev), or configure RLS

---

### 4. Run Locally

```bash
npm run dev
```

Visit: [http://localhost:3000](http://localhost:3000)

---

## 🔮 Scripts

| Command         | Description                 |
|------------------|-----------------------------|
| `npm run dev`    | Start development server     |
| `npm run build`  | Build for production         |
| `npm start`      | Start production server      |
| `npm run lint`   | Run linter                   |

---

## 💡 Notes

- Supabase Auth uses server/client helpers for seamless session handling.
- Time formatting is handled with `react-time-ago` and `javascript-time-ago`.
- All media is stored in Supabase Storage and linked via public URLs.

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss.


