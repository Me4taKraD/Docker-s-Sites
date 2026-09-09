# FastAPI — фреймворк для создания веб-API.
from fastapi import FastAPI, HTTPException, status
# CORSMiddleware — разрешает фронтенду с другого адреса обращаться к нашему API
from fastapi.middleware.cors import CORSMiddleware
# Импорт базового класса для создания моделей валидации из библиотеки pydantic
from pydantic import BaseModel

app = FastAPI()

# Объявление класса схемы данных для входящего тела запроса
class ButtonClickSchema(BaseModel):
    # Определение текстового поля структуры с автопроверкой типа
    message: str
    # Определение дополнительного текстового поля статуса
    status: str

# Расширяем запросы фронтенда с других адресов, чтобы не выпадала ошибка 400 
origins = [
    "http://localhost:8080",
    "http://127.0.0.1:8080",
]

# CORS — разрешаем запросы с фронтенда (http://localhost:5173)
# Без этого React не сможет обращаться к нашему API (браузер заблокирует)
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Декорирование функции для регистрации маршрута с адресом проверки и явным статусом 200 OK
@app.get("/check", status_code=status.HTTP_200_OK)
# Определение асинхронной функции обработки запроса инициализации
async def check_check():
    # Создание словаря Python для автоматической конвертации в JSON-ответ веб-сервером
    response_data = {"status": "success", "message": "API запущен"}
    # Возврат структуры данных клиенту с автоматической установкой заголовка Content-Type: application/json
    return response_data

# Декорирование асинхронной функции для обработки входящего POST-запроса
@app.post("/click")
async def handle_button_click(payload: ButtonClickSchema):
    # Извлечение сообщения из проверенного объекта Pydantic
    received_message = payload.message
    # Формирование ответа клиенту
    return {"status": "ok", "got_message": received_message}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)