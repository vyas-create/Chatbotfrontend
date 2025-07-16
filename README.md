Chat CA - Your CA Companion Frontend
Description
This project is the frontend for Chat CA, an intelligent chatbot designed to assist CA students with their studies. It provides instant answers, study help, and motivation, tailored to different CA levels.

Features
Interactive Chatbot: Get instant answers to your CA-related questions.

CA Level Specific Responses: Tailor bot responses based on CA Foundation, Intermediate, Final, SPOM, and IT & Soft Skills Training levels.

User Authentication (Mocked): Sign up and sign in functionality (currently mocked for frontend testing).

User Profile Management (Mocked): View user status and change passkey (currently mocked).

Responsive Design: Optimized for seamless experience across various devices (mobile, tablet, desktop).

Pricing Section: Information about free and premium plans.

About Us: Details about the project's mission and founder.

Technologies Used
Frontend
React.js: A JavaScript library for building user interfaces.

Tailwind CSS: A utility-first CSS framework for rapid UI development.

Lucide React: A collection of beautiful, pixel-perfect icons.

React Hot Toast: For elegant notifications.

React Markdown: For rendering Markdown content.

Backend (Separate Project)
Python Flask: Web framework for the backend API.

Google Generative AI (Gemini): For AI-powered responses and embeddings.

Qdrant: Vector database for knowledge retrieval (RAG).

Razorpay: For payment gateway integration.

Gunicorn: WSGI HTTP Server for Python web applications (used in production).

Setup
Prerequisites
Node.js (LTS version recommended) and npm (or Yarn)

Git

Frontend Setup
Clone the repository:

git clone <your-frontend-repo-url>
cd ca-chatbot-frontend # Or whatever your project folder is named

Install dependencies:

npm install
# or
# yarn install

Environment Variables:
Create a .env file in the root of your frontend project (next to package.json).
Add your backend API URL:

REACT_APP_BACKEND_URL=https://cachatbot-python.onrender.com

Note: For local development, you might set this to http://localhost:5000 if your backend is running locally.

Start the development server:

npm start
# or
# yarn start

The app will typically open in your browser at http://localhost:3000.

Backend Setup (Refer to your separate backend repository)
Ensure your Python backend is set up and running, preferably deployed to a service like Render.

The backend's app.py should be configured to use Qdrant and Gemini API keys.

Ensure Flask[async] is installed in your backend's requirements.txt or pyproject.toml.

Deployment
Frontend (Netlify)
This frontend is designed to be deployed on Netlify.

Build Command: npm run build

Publish Directory: build/

Base Directory: (Leave blank)

Functions Directory: (Leave blank)

Backend (Render)
The Python Flask backend is designed to be deployed on Render.

Refer to your backend's Procfile and render.yaml for specific deployment instructions.

Contributing
Contributions are welcome! Please follow these steps:

Fork the repository.

Create a new branch (git checkout -b feature/your-feature-name).

Make your changes.

Commit your changes (git commit -m 'Add new feature').

Push to the branch (git push origin feature/your-feature-name).

Open a Pull Request.

License
[Specify your license here, e.g., MIT License]
