# Multimodal Security Backend (MVP)

Simple FastAPI + **MySQL** backend (view tables in MySQL Workbench).

Flow:

1. AI model sends a prediction to `POST /events/ingest`
2. Adapter converts it to a common `AIEvent`
3. Duplicate events within 2 seconds are ignored
4. Events on the same camera + zone within 5 seconds become one incident
5. Risk engine sets `normal` / `warning` / `critical`
6. Dashboard reads incidents and alerts after login (email + password)

## Setup

```powershell
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

In MySQL Workbench, create the database:

```sql
CREATE DATABASE IF NOT EXISTS multimodal_security_db;
```

Copy `.env.example` to `.env` and set the same password you use in Workbench:

```
DATABASE_URL=mysql+pymysql://root:YOUR_MYSQL_PASSWORD@localhost:3306/multimodal_security_db
```

If the password has special characters (`@`, `#`, `%`), URL-encode them.

Create tables (optional if the app is running — it also creates them on startup):

```powershell
alembic upgrade head
```

Run:

```powershell
uvicorn main:app --reload
```

Open http://localhost:8000/docs

## Login (email + password)

Register once, then log in. The frontend login page should call these APIs.

- `POST /auth/register` `{ "email": "you@example.com", "password": "secret123" }`
- `POST /auth/login` `{ "email": "you@example.com", "password": "secret123" }`
- `GET /auth/me` with header `Authorization: Bearer <token>`

## AI ingest (no token, so models can post)

```json
POST /events/ingest
{
  "model_source": "weapon",
  "model_output": { "event_type": "weapon", "confidence": 0.92 },
  "camera_id": "cam-1",
  "zone": "Parking"
}
```

`model_source` can be `weapon`, `action`, or `audio`.

## Dashboard (needs token)

- `GET /events`
- `GET /incidents`
- `PATCH /incidents/{id}` with `{ "status": "resolved" }`
- `GET /alerts`
- `PATCH /alerts/{id}/read`

## Tests

```powershell
pytest -v
```

These tests do not need MySQL. They only check hashing, fusion, and risk.
