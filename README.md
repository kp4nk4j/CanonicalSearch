1. Clone the Repository

git clone https://github.com/kp4nk4j/CanonicalSearch.git
cd CanonicalSearch

2. Install Dependencies

cd frontend
npm install

cd ../server
npm install

3. Configure Environment Variables(Create .env file inside server folder)

MONGO_URI=<your_mongodb_connection_string> # Local or MongoDB Atlas URL
PORT=5000 # Default server port
DEEPINFRA_API_KEY=<your_deepinfra_api_key> # Get from DeepInfra for LLM-based search

4. Run the Application
   Start Backend Server
   cd server
   npm run dev

Start Frontend
cd ../frontend
npm start
