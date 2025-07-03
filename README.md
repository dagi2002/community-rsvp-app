Addis Community RSVP

Addis Community RSVP is a simple React + Vite + Tailwind app that lists upcoming community events in Addis Ababa and allows residents to register their attendance. Users can view event details — including title, date, description, and images — and submit an RSVP with their name, email, and number of guests. The goal is to provide a lightweight, user-friendly platform for event discovery and registration.

⸻

🔍 Features
	•	Event List – Browse cards showing each event’s title, date, image, and description
	•	RSVP Form – Submit your name, email, and number of guests
	•	Simple Node.js backend stores events and RSVPs
	•	Event Images – Events display a photo or placeholder
	•	Branch-based Workflow – Structured Git workflow with feature branches and pull requests
	•	CI/CD Pipeline – Automated lint, test, build, and deploy checks using GitHub Actions and Vercel

⸻

🚀 Local Setup

1️⃣ Clone the repo
git clone https://github.com/dagi2002/community-rsvp-app.git
cd community-rsvp-app

2️⃣ Install dependencies
npm install

3️⃣ Start both frontend and backend simultaneously
npm start

This will automatically:
	Launch frontend on http://localhost:5173
	Launch backend API on http://localhost:3001



🧪 Running Tests

We use Vitest + React Testing Library.

Run all tests:
npm test

Run in watch mode:
npm test -- --watch

Run linter:
npm run lint


⚙️ CI / CD

✅ This project uses GitHub Actions for continuous integration.

Every push / pull request to main or feature/*:
	•	Runs npm ci, npm run lint, npm test -- --run, and npm run build

CI config is located at:
.github/workflows/ci.yml

⸻

🌍 Deployment

✅ This app is deployed on Vercel.
	•	vercel.json specifies the build + output settings
	•	Build command: npm run build
	•	Output directory: dist
	•	Router: We use HashRouter for static hosting compatibility

Local production preview

1️⃣ Build for production
npm run build

2️⃣ Start the production server
npm run preview

Vercel

Each push to main triggers a deploy.
You can also connect your Vercel project to the GitHub repo via the Vercel dashboard.

🤝 Contributing

We welcome improvements!

1️⃣ Sync + branch
2️⃣ Develop + test
3️⃣ Commit
4️⃣ Push + open PR
5️⃣ Review + merge

⸻

🔑 License

This project is built as an educational assignment for college coursework.

⸻

👥 Contributors

Developed by Dagi2002