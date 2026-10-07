# FastAPI — фреймворк для создания веб-API.
from fastapi import FastAPI, status, Depends
# CORSMiddleware — разрешает фронтенду с другого адреса обращаться к нашему API
from fastapi.middleware.cors import CORSMiddleware
# Импорт базового класса для создания моделей валидации из библиотеки pydantic
from pydantic import BaseModel
# подключаем Static чтобы можно была раздавать папку images с изображениями товаров
from fastapi.staticfiles import StaticFiles
# create_engine — подключение к БД.
from sqlalchemy import create_engine, Column, Integer, String                  
# declarative_base — базовый класс для всех таблиц. sessionmaker — фабрика сессий.
from sqlalchemy.orm import declarative_base, sessionmaker, Session
from pathlib import Path
# Импортируем системный модуль os для работы с файловой структурой
import os
import redis

BASE_DIR = Path(__file__).resolve().parent.parent
IMAGES_DIR = BASE_DIR / "static" / "images"
# Подключение к БД по обычной локалке
# DATABASE_URL = "postgresql://postgres:1234567890Ab@localhost:5432/Docker_Simple_Site"
# Подключение к БД внутри контейнера Докера
DATABASE_URL = "postgresql://postgres_user:postgres_password@db:5432/main_application_db"

app = FastAPI()

# Создание объекта клиента подключения к локальному экземпляру сервера Redis
r = redis.Redis(
    # host='localhost', # для локалки пункт хоста
    host='redis', # для докера
    port=6379,
    db=0,
    decode_responses=True
    )

# Создаем целевую директорию со всеми родительскими каталогами если она отсутствует
os.makedirs(IMAGES_DIR, exist_ok=True)

# Инициализируем статик и указываем директорию с назавнием в url
app.mount(
    # "/images",
    # StaticFiles(directory=IMAGES_DIR),
    # name="images",
    "/static",
    StaticFiles(directory="static"),
    name="static",
)

# Объявление класса схемы данных для входящего тела запроса
class ButtonClickSchema(BaseModel):
    # Определение текстового поля структуры с автопроверкой типа
    message: str
    # Определение дополнительного текстового поля статуса
    status: str

# Расширяем запросы фронтенда с других адресов, чтобы не выпадала ошибка 400 
origins = [
    # "http://localhost:8080",
    # "http://127.0.0.1:8080",
    # "http://localhost:5173",
    # "http://127.0.0.1:5173",
    # "http://localhost:6379",
    # "http://127.0.0.1:6379",
    
    # НОВЫЕ ПОД NGINX

    # Разрешаем защищенные соединения с локального узла по протоколу HTTPS
    "https://localhost",
    # Разрешаем переадресованные соединения с локального узла по протоколу HTTP
    "http://localhost",
    # Разрешаем защищенные соединения по IP-адресу локальной петли
    "https://127.0.0.1",
    # Разрешаем стандартные соединения по IP-адресу локальной петли
    "http://127.0.0.1",
    # Сохраняем доступ для прямого обращения к старому порту клиентского приложения
    "http://localhost:8080",
    # Сохраняем доступ для прямого обращения к порту сервера разработки
    "http://localhost:5173",
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

# ============================================================
# БЛОК ДЛЯ РАБОТЫ С БД 

# create_engine — движок, через который SQLAlchemy общается с БД
engine = create_engine(DATABASE_URL)
# sessionmaker — фабрика, создаёт сессии (подключения) к БД
# autocommit=False — изменения не сохраняются автоматически, нужен явный commit()
# autoflush=False — не отправлять запросы в БД до явного flush()
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
# declarative_base — класс, от которого наследуются все модели (таблицы)
Base = declarative_base()

# ============================================================
# ЗАВИСИМОСТЬ: ПОЛУЧИТЬ СЕССИЮ БД
# ============================================================
# Depends(get_db) — FastAPI вызывает эту функцию перед каждым запросом,
# передаёт полученную сессию в эндпоинт, а после запроса закрывает её.
def get_db():
    db = SessionLocal()
    try:
        yield db # отдаём сессию в обработчик
    finally:
        db.close() # закрываем после завершения

# Объявление модели таблицы товаров
class Item(Base):
    # Указание точного имени таблицы в базе данных PostgreSQL
    __tablename__ = "items"

    # Объявление первичного ключа записи с автоматической нумерацией
    id = Column(Integer, primary_key=True, index=True)
    # Объявление колонки для хранения названия товара
    title = Column(String, nullable=False)
    # Объявление колонки для хранения текстового описания товара
    description = Column(String)
    # Объявление колонки для хранения относительного пути к файлу картинки
    image_url = Column(String)

# Объявление схемы выгрузки информации о товаре
class ItemSchema(BaseModel):
    # Поле уникального идентификатора
    id: int
    # Поле заголовка
    title: str
    # Поле описания
    description: str
    # Поле пути к изображению
    image_url:str

    # Конфигурация режима совместимости со сторонними ORM
    class Config:
        # Включение режима прямого чтения атрибутов из объектов SQLAlchemy
        from_attributes = True

# ============================================================
# БЛОК ДЛЯ РАБОТЫ С СЕТЕВЫМИ МЕТОДАМИ 

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

# Декорирование функции для обработки GET-запроса по адресу /items
@app.get("/items", response_model=list[ItemSchema])
# Объявление функции извлечения данных с автоматическим открытием сессии
def read_items(db: Session = Depends(get_db)):
    # Выполнение запроса выборки всех существующих записей из таблицы items
    items_list = db.query(Item).all()
    # Возврат списка найденных объектов клиенту
    return items_list

# ============================================================
# БЛОК ПОД РЕДИС

# Декоратор регистрации обработчика GET-запроса по адресу /clicks
@app.get("/clicks")
# Объявление функции считывания сохраняемого значения счетчика
def get_clicks():
    # Чтение значения по ключу button_clicks из оперативной памяти или выбор нуля
    count = r.get("button_clicks") or 0
    # Возврат полученного числа в виде словаря для отправки в формате JSON
    return {"clicks": int(count)}

# Декоратор регистрации обработчика POST-запроса по адресу /clicks/increment
@app.post("/clicks/increment")
# Объявление функции вызова команды увеличения значения счетчика
def increment_clicks():
    # Выполнение команды атомарного увеличения значения по ключу в базе Redis
    new_count = r.incr("button_clicks")
    # Возврат обновленного значения клиенту
    return {"clicks": new_count}

# ============================================================

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)