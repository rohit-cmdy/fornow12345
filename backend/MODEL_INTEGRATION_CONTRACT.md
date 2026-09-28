# AI Model Integration Contract

## 1. Overview
This contract defines the communication protocol between trained AI models (Weapon/Object Detection, Action Recognition, and Audio Detection) and the Multimodal Intelligent Security System backend.

AI model developers do **not** need to interact with the database, the fusion engine, or the frontend dashboard. Your only responsibility is to output predictions matching the schema and guidelines described in this document.

---

## 2. Ingestion Endpoint

Model predictions can be ingested via the HTTP REST API:

```http
POST /events/ingest
Content-Type: application/json
```

### Top-Level Request Payload

| Field | Type | Required? | Description |
| :--- | :--- | :--- | :--- |
| `model_source` | `string` | **Yes** | Model identifier: `"weapon"`, `"action"`, `"audio"` |
| `camera_id` | `string` or `integer` | **Yes** | ID of the camera / sensor unit (e.g. `2`, `"cam_02"`) |
| `zone` | `string` | **Yes** | Security zone / area name (e.g. `"Parking Area"`) |
| `timestamp` | `string` (ISO 8601) | Optional | Detection time (`"YYYY-MM-DDTHH:MM:SS.sssZ"`). Defaults to current server time if omitted. |
| `tracking_id` | `string` | Optional | Persistent object tracking ID (e.g. `"person_17"`) |
| `media_reference` | `string` | Optional | Object storage URI or uploaded media path |
| `model_output` | `object` | **Yes** | Model-specific prediction dictionary (detailed below) |

---

## 3. Model Output Contracts

### 3.1 Weapon / Object Detection Model (e.g., YOLO)

```json
{
  "model_source": "weapon",
  "camera_id": 2,
  "zone": "Parking Area",
  "timestamp": "2026-09-22T15:42:31.000Z",
  "tracking_id": "person_17",
  "model_output": {
    "event_type": "weapon",
    "confidence": 0.92,
    "bbox": [120, 80, 350, 420]
  }
}
```

- **`event_type`**: `"weapon"`, `"knife"`, `"gun"`, etc.
- **`confidence`**: Float strictly between `0.0` and `1.0`.
- **`bbox`**: `[x1, y1, x2, y2]` in pixel coordinates.

---

### 3.2 Action Recognition Model (e.g., MediaPipe, LSTM, Video Transformer)

```json
{
  "model_source": "action",
  "camera_id": 2,
  "zone": "Parking Area",
  "timestamp": "2026-09-22T15:42:32.000Z",
  "tracking_id": "person_17",
  "model_output": {
    "event_type": "fighting",
    "confidence": 0.84
  }
}
```

- **Supported action event types**:
  - `"fighting"`
  - `"falling"`
  - `"running"`
  - `"normal"`
- **`confidence`**: Float strictly between `0.0` and `1.0`.

---

### 3.3 Audio Detection Model (e.g., CRNN, Audio Spectrogram Transformer)

```json
{
  "model_source": "audio",
  "camera_id": 2,
  "zone": "Parking Area",
  "timestamp": "2026-09-22T15:42:32.400Z",
  "model_output": {
    "event_type": "gunshot",
    "confidence": 0.89
  }
}
```

- **Supported audio event types**:
  - `"gunshot"`
  - `"scream"`
  - `"glass_breaking"`
  - `"aggressive_shouting"`
  - `"alarm"`
  - `"normal"`
- **`confidence`**: Float strictly between `0.0` and `1.0`.

---

## 4. Media Upload Workflow (Optional)

If your model pipeline captures keyframe snapshots or audio clips:

1. Send file to `POST /media/upload`:
   ```bash
   curl -X POST "http://localhost:8000/media/upload" \
     -H "Authorization: Bearer <TOKEN>" \
     -F "file=@evidence_frame.jpg"
   ```
2. Response:
   ```json
   {
     "media_reference": "evidence/2026/09/22/a1b2c3d4_evidence_frame.jpg",
     "filename": "evidence_frame.jpg",
     "size_bytes": 1048576
   }
   ```
3. Pass `media_reference` inside the `/events/ingest` payload.

---

## 5. Validation Rules
- **Confidence Range**: Must be `0.0 <= confidence <= 1.0`. Values outside this range will be rejected with `422 Unprocessable Entity` or `ValueError`.
- **Duplicate Suppression**: Detections sent faster than `EVENT_DEDUP_SECONDS` (default: 2.0 seconds) for the exact same `(camera_id, zone, event_type)` will be automatically deduplicated to prevent alarm fatigue.
- **Fusion Window**: Events occurring within `FUSION_TIME_WINDOW_SECONDS` (default: 5.0 seconds) in the same camera and zone will be automatically correlated into a single unified security incident.
