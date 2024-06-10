from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse, FileResponse
from chatbot import predict_class, get_response, intents, response
import asyncio

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_credentials = True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/static", StaticFiles(directory="ui/public"), name="static")

@app.get("/")
async def get_index():
    with open("ui/public/index.html", "r") as file:
        html_content = file.read()
    return HTMLResponse(content=html_content, status_code=200)

@app.get("/styles.css")
async def get_styles():
    with open("ui/public/styles.css", "r") as file:
        css_content = file.read()
    return Response(content=css_content, media_type="text/css")

@app.get("/functions.js")
async def get_js():
    with open("ui/public/functions.js", "r") as file:
        js_content = file.read()
    return Response(content=js_content, media_type="application/javascript")

@app.get("/img/{filename}")
async def get_image(filename: str):
    return FileResponse(f"ui/public/img/{filename}")

@app.get("/get")
async def get_bot_response(text: str):
    await asyncio.sleep(2)
    bot_response = response(text)
    return {"response": bot_response}
    print(bot_response)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)