# Voice-Enabled Task Tracker

A task management application with **voice-based task creation**, Kanban board, and list view. Users can speak a task naturally, review extracted fields, and save it as a structured task.



#  ★ Voice → Task (High-Level Flow)

### 1. **Whisper (Speech → Text)**
   The recorded audio is sent to the backend and converted into plain text using OpenAI Whisper.

### 2. **LLM Parsing (Text → Structured Fields)**
   The transcript is sent to an LLM to extract task fields like title, description, priority, due date, and status.

### 3. **Chrono-node (Natural Date → Exact Date)**
   Natural language dates ("tomorrow evening", "next Monday") are converted into actual date-time values.

The extracted data is returned to the frontend, shown for review, and then saved as a task.


---

## ★ Backend (Server)

### Tech Stack

* Node.js + Express
* TypeScript
* MongoDB (Mongoose)
* OpenAI (Whisper + LLM)
* chrono-node

### Setup Instructions

```bash
cd server
npm install
```

Create a `.env` file in the `server` folder.

### `.env.example`

```
PORT=5000
MONGODB_URI=mongodb_key
OPENAI_API_KEY=openai_api_key
```

Start the backend:

```bash
npm run dev
```

The server will run on:

```
http://localhost:5000
```

---

##  ★ Frontend (Client)

### Tech Stack

* React
* TypeScript
* Redux Toolkit
* Axios

### Setup Instructions

```bash
cd client
npm install
```

Start the frontend:

```bash
npm run dev
```

The app will run on:

```
http://localhost:5173
```

---

## ★ API Overview (Backend)

### Voice Parsing

* `POST /api/voice/parse`

  * Input: audio file (multipart/form-data)
  * Output: parsed task fields

### Tasks

* `POST /api/tasks` – create task
* `GET /api/tasks` – fetch tasks (supports search & filters)
* `PUT /api/tasks/:id` – update task
* `PATCH /api/tasks/:id/status` – update status (Kanban)
* `DELETE /api/tasks/:id` – delete task


---

### Happy Coding....






