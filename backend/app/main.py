from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse

from app.alerts.models import Alert
from app.alerts.router import router as alerts_router
from app.auth.models import User
from app.auth.router import router as auth_router
from app.core.config import settings
from app.core.database import Base, engine
from app.events.models import AIEventModel
from app.events.router import router as events_router
from app.incidents.models import Incident
from app.incidents.router import router as incidents_router

try:
    Base.metadata.create_all(bind=engine)
except Exception as exc:
    print(f"MySQL is not connected yet: {exc}")

app = FastAPI(title=settings.PROJECT_NAME, version="1.0.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], #allow all type of origin file
    allow_credentials=True,
    allow_methods=["*"],#allow all type of method push , pull
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(events_router)
app.include_router(incidents_router)
app.include_router(alerts_router)


@app.get("/")
def root():
    return {"message": "API is running", "docs": "/docs", "login": "/login"}


@app.get("/health")
def health():
    return {"status": "ok"}


@app.get("/login", response_class=HTMLResponse)
def login_page():
    return """
<!DOCTYPE html>
<html>
<head><title>Login</title></head>
<body>
  <h2>Login</h2>
  <input id="email" type="email" placeholder="email" /><br/><br/>
  <input id="password" type="password" placeholder="password" /><br/><br/>
  <button onclick="login()">Login</button>
  <button onclick="register()">Register</button>
  <p id="msg"></p>
  <script>
    async function send(path) {
      const body = {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
      };
      const res = await fetch(path, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      const data = await res.json();
      document.getElementById("msg").innerText = JSON.stringify(data);
    }
    function login() { send("/auth/login"); }
    function register() { send("/auth/register"); }
  </script>
</body>
</html>
"""
