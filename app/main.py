from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
import pytz

app = FastAPI()

# Mount static files
app.mount("/static", StaticFiles(directory="app/static"), name="static")
templates = Jinja2Templates(directory="app/templates")

@app.get("/", response_class=HTMLResponse)
async def read_root(request: Request):
    # Get all timezones
    timezones = pytz.all_timezones
    return templates.TemplateResponse("index.html", {
        "request": request,
        "timezones": timezones
    })
