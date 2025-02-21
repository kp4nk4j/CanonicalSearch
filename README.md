1. Clone the Repository

git clone https://github.com/kp4nk4j/CanonicalSearch.git

# move to directory

cd CanonicalSearch

2. Install Dependencies

# move to directory

cd frontend

# install dependency

npm install

# move to directory

cd ../server

# install dependency

npm install

3. Configure Environment Variables(Create .env file inside server folder)

# env variable

MONGO_URI=<your_mongodb_connection_string> # Local or MongoDB Atlas URL

# env variable

PORT=5000 # Default server port

# env variable

DEEPINFRA_API_KEY=<your_deepinfra_api_key> # Get from DeepInfra for LLM-based search

4. Run the Application
   Start Backend Server
   # move to directory
   cd server
   # Start server side
   npm run dev

Start Frontend

# move to directory

cd ../frontend

# Start client side

npm start
