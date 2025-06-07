HOW TO RUN THE APPLICATION

Prerequisites:
	•	Docker Desktop (must be running)
	•	Python 3
	•	Node.js and npm

⸻

STEP 1: SET UP THE FRONTEND
	1.	Open your terminal and run:
`cd frontend`
`npm install`

This installs all the frontend dependencies for the React/Next.js app.

⸻

STEP 2: START DOCKER AND SET UP DATABASE
	1.	Make sure Docker Desktop is running.
	2.	Go back to the root directory and run:
`make up`

This will spin up the Docker container and create an empty factori-portal PostgreSQL database.

⸻

STEP 3: SET UP THE BACKEND
	1.	Go into the backend directory:
`cd backend`
	2.	Create a virtual environment:
`python3 -m venv .venv`
	3.	Go back to the root directory:
`cd ..`
	4.	Install backend dependencies:
`make install-backend`

⸻

STEP 4: POPULATE THE DATABASE
	1.	From the root directory, run:
`make run-dev-all`

This will run the SQL scripts in the sql/dev folder to create and populate the database.

⸻

STEP 5: RUN THE APPLICATION

You’ll need TWO terminal windows.

Terminal 1: Run the backend
	•	From the root directory, run:
`make run-backend`

Terminal 2: Run the frontend
	•	Go into the frontend directory and run:
`cd frontend`
`npm run dev`

⸻

ACCESSING THE APP
	•	Application:  http://localhost:3000
	•	FastAPI docs: http://localhost:8000/docs

Make sure ports 3000 and 8000 are not being used by other apps.

⸻

That’s it!