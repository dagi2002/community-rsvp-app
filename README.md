# Addis Community RSVP

A simple React + Bolt UI application for listing upcoming community events in Addis Ababa and letting residents submit RSVPs.

---

## 🔍 Features

* **Event List** – Browse cards showing each event’s title, date, and description
* **RSVP Form** – Submit your name, email, and number of guests
* **Local Persistence** – All data is stored in browser storage (no backend needed)
* **Responsive UI** – Mobile-friendly, built with Bolt components
* **Branch-based Workflow** – Structured Git workflow with feature branches and pull requests

---

## 🚀 Local Setup

1. **Clone the repo**

   ```bash
   git clone https://github.com/dagi2002/community-rsvp-app.git
   cd community-rsvp-app
   ```
2. **Install dependencies**

   ```bash
   npm install
   ```
3. **Start the dev server**

   ```bash
   npm run dev
   ```
4. **Open in browser**
   Visit `http://localhost:5173` (or whatever URL Vite prints in your console)

---

## 🤝 Contributing

We welcome your improvements! Please:

1. **Sync & branch**

   ```bash
   git checkout main
   git pull origin main
   git checkout -b feature/your-feature-name
   ```
2. **Develop & test**

   * Make your code changes.
   * Run `npm run dev` and verify in the browser.
3. **Commit your work**

   ```bash
   git add .
   git commit -m "feat: short description of your change"
   ```
4. **Push & open a PR**

   ```bash
   git push --set-upstream origin feature/your-feature-name
   ```

   Then click **Compare & pull request** on GitHub, describe your changes, and request a review.
5. **Merge**
   Once approved, merge into `main`. Vercel (if configured) will auto-deploy your updates.

---

