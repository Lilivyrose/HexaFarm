# 🌱 HexaFarm – Smart Organic Home Farming System  

HexaFarm is an AI-powered home farming assistant that helps users plan and manage their crops efficiently. This guide explains how to set up and run the project locally.  

## 🚀 Getting Started  

### **Prerequisites**  
Ensure you have the following installed:  
- **Node.js** (v16 or later)  
- **npm** (or **yarn**)  
- **Git**  

---

## 📥 **Installation & Setup**  

### **1️⃣ Clone the Repository**  
```bash
git clone https://github.com/your-username/hexafarm.git
cd hexafarm
```  

### **2️⃣ Install Dependencies**  

#### **Root-Level Dependencies (For Concurrent Execution)**  
At the root of the project, install `concurrently` to run the backend and frontend together with a single command:  
```bash
npm install concurrently --save-dev
```  

#### **Frontend Dependencies**  
Navigate to the frontend directory and install dependencies:  
```bash
cd frontend
npm install
npm install react-router-dom         # For routing  
npm install @supabase/supabase-js    # For database interactions  
npm install dotenv                   # For managing environment variables  
npm install tailwindcss               # For UI styling  
npm install axios                     # For API requests  
npm install react-icons               # For icons  
npm install @mui/material @mui/icons-material  # Material UI components  
```  

#### **Backend Dependencies**  
Navigate to the backend directory and install dependencies:  
```bash
cd ../backend
npm install
npm install express                   # Backend framework  
npm install cors                       # Enable CORS  
npm install dotenv                     # Load environment variables  
npm install @supabase/supabase-js      # Database interaction  
npm install multer                     # Handle file uploads  
npm install sharp                      # Image processing  
npm install body-parser                # Parse request bodies  
npm install nodemon --save-dev         # Auto-restart server during development  
```  

---

### **3️⃣ Set Up Environment Variables**  
Create a `.env` file in both the **frontend** and **backend** directories and add the necessary API keys and configurations.  

#### **Frontend `.env` file**  
```env
REACT_APP_SUPABASE_URL=your_supabase_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
```  

#### **Backend `.env` file**  
```env
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
PORT=3001
```  

---

### **4️⃣ Running the Application**  

#### **Run Backend and Frontend Simultaneously**  
Go to the **root directory** and set up the `package.json` file to run both services together.  

In the **root `package.json` file**, add the following script inside `"scripts"`:  
```json
"scripts": {
  "dev": "concurrently \"cd backend && npm run dev\" \"cd frontend && npm start\""
}
```  

Now, to start both the frontend and backend at the same time, simply run:  
```bash
npm run dev
```  

- The backend will run on **http://localhost:3001**  
- The frontend will run on **http://localhost:3000**  

---


## 🔧 **Available Scripts**  

| Command                  | Description |
|--------------------------|-------------|
| `npm run dev` (root)     | Runs both frontend and backend concurrently |
| `npm start` (frontend)   | Run the frontend in development mode |
| `npm run dev` (backend)  | Run backend with nodemon |
| `npm run build`          | Build the frontend for production |
| `npm test`               | Run tests |
| `npm run lint`           | Check code for errors |  

---

## 💡 **Troubleshooting**  
- If you encounter **CORS errors**, check your Supabase settings.  
- Ensure your **.env** file is properly configured.  
- Run `npm audit fix` if dependencies have vulnerabilities.  
 

---

Now, with `npm run dev`, you can start everything with one command!
