// Импорт компонента сброса системных стилей браузера
import CssBaseline from '@mui/material/CssBaseline';
// Импорт функций для создания и применения пользовательской темы Material UI
import { createTheme, ThemeProvider } from '@mui/material/styles';
// Импорт компонента кнопки для отображения интерактивного элемента
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
// Импорт контейнера Box для управления позиционированием и сеткой
import Box from '@mui/material/Box';
// Импорт контейнера Stack для удобного размещения элементов в ряд
import Stack from '@mui/material/Stack';
// Импорт базового компонента текстового поля из библиотеки Material UI
import TextField from '@mui/material/TextField';
// Импорт функции перехвата жизненного цикла useEffect из библиотеки React
import React, { useEffect, useState } from 'react';
// Импорт компонентов
import ItemCard from './components/item_card';


// Конфигурация параметров отправки сетевого запроса методом POST
const requestOptions = {
  // Указание HTTP-метода для создания или передачи данных
  method: 'POST',
  // Установка сетевых заголовков для идентификации формата тела
  headers: {
    'Content-Type': 'application/json',
  },
  // Преобразование объекта данных Python/JS в JSON-строку для передачи в теле
  body: JSON.stringify({ message: 'Кнопка нажата', status: 'active' }),
};


// Объявление компонента настройки пользовательской кнопки
function CustomButton() {
  // Возврат дерева виртуальных элементов интерфейса
  return (
    // Обертка с настройками гибкой верстки Flexbox для центрирования
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}> 
      {/* Компонент кнопки с установкой стандартных и явных параметров оформления */}
      <Button 
        // Определение базового визуального типа кнопки с заливкой
        // стандартные настройки не действуют из-за параметров sx={{...}}
        variant="outlined"
        // Выбор предустановленного размера из темы оформления
        size="large"
        // Переопределение свойств через внутренний объект стилизации sx
        sx={{
          // Задание произвольного фонового цвета через шестнадцатеричный код
          backgroundColor: '#ff0000',
          // Задание цвета текста внутри кнопки
          color: '#ffffff',
          // Настройка абсолютной ширины элемента в пикселях
          width: '250px',
          // Настройка абсолютной высоты элемента в пикселях
          height: '60px',
          // Увеличение размера шрифта текста кнопки
          fontSize: '18px',
          // Задание внешнего отступа от соседних элементов
          margin: '20px',
          // Определение цвета фона при наведении курсора мыши
          '&:hover': {
            // Изменение фонового цвета для состояния активности
            backgroundColor: '#6200ff',
          }
        }}
      >
        Кнопка
      </Button>
    </Box>
  );
}

function DiferentButtons() {
  return (
    <Stack direction="row" spacing={2}>
      {/* Кнопка со сплошной фоновой заливкой для основного действия */}
      <Button variant="contained">Залитая (contained)</Button>

      {/* Кнопка с контурной рамкой для вторичного действия */}
      <Button variant="outlined">С рамкой (outlined)</Button>
      {/* Текстовая кнопка без рамок и фона для фонового действия */}
      <Button variant="text">Текстовая (text)</Button>
    </Stack>
  );
}

// Создание конфигурации темы с кастомным фоновым цветом
const theme_test = createTheme({
  // Палитра цветов приложения
  palette: {
    // Настройка фоновых цветов элементов
    background: {
      // Установка основного фонового цвета для всего тела страницы body
      default: '#181a25'
    },
  },
});

// Создание темы для переписывания стандартного цвета body в элементе CssBaseLine
const theme = createTheme({
  // Раздел глобальной настройки компонентов библиотеки
  components: {
    // Настройка конкретно компонента MuiCssBaseline
    MuiCssBaseline: {
      // Блок точечного переопределения каскадных правил
      styleOverrides: {
        // Переопределение стилей для селектора body
        body: {
          // Использование вашей CSS-переменной для фона
          backgroundColor: 'var(--bg)',
        },
      },
    },
  },
});

// Главный компонент формы с прямоугольной областью ввода
function RectangleTextArea({ onButtonClick }) {
  return (
    // Контейнер-обертка с внутренними отступами
    <Box sx={{ padding: '20px', display: 'flex' }}>
      {/* Многострочное текстовое поле с прямоугольными границами */}
      <TextField
        // {/* Включение режима многострочного текстового поля (Textarea) */}
        // multiline
        // {/* Минимальное количество отображаемых строк */}
        // rows={1}
        // {/* Занятие 100% ширины родительского контейнера */}
        fullWidth
        // {/* Текст подсказки внутри поля ввода */}
        placeholder="Поиск по магазину"
        // {/* Вариант внешнего вида с видимой контурной рамкой */}
        variant="outlined"
        // {/* Точечная стилизация внутренних элементов MUI через селекторы */}
        sx={{
          // Селектор поля ввода для изменения цвета вводимого текста
          '& .MuiInputBase-input': {
            // Цвет вводимых символов
            color: '#ffffff',
            // Текст подсказки становится курсивом
            fontStyle: 'italic',
          },
          
          // Селектор псевдоэлемента placeholder для изменения цвета подсказки
          '& .MuiInputBase-input::placeholder': {
            // Задание цвета текста заполнителя
            color: '#c7c7c7',
            // Отмена стандартной прозрачности MUI для точной передачи цвета
            opacity: 1,
          },

          // Переопределение поведения заполнителя при фокусе на поле ввода
          '& .MuiInputBase-input:hover::placeholder': {
            // Цвет вводимых символов
            color: '#ffffff',
            opacity: 1,
          },

          '& .MuiOutlinedInput-root': {
            borderRadius: 0,
            backgroundColor: '#ffffff34',
            
            // Цвет фона текстового поля при фокусе
            '&.Mui-focused': {
              backgroundColor: '#0000002a',
            },
            
            // Выбор внешнего элемента рамки fieldset в обычном состоянии
            '& fieldset': {
              // Задание цвета границы в обычном состоянии
              borderColor: '#ffffffa6',
            },

            // Выбор элемента рамки при наведении курсора мыши
            '&:hover fieldset': {
              // Задание цвета границы при событии hover
              borderColor: '#00aeff7e',
            },

            // Выбор элемента рамки при получении фокуса ввода
            '&.Mui-focused fieldset': {
              // Задание цвета границы в состоянии focus
              borderColor: '#2abafd',
              // Вычисление значения свойства boxShadow для создания размытого свечения (смещение X, смещение Y, размытие, растяжение, цвет)
              boxShadow: '0 0 8px 0px #2abafd'
            },
          },
          
        }}
      />
      {/* Квадратная кнопка с отключением левых радиусов скругления */}
      {/* ДОДЕЛАТЬ КНОПКУ ПОИСКА */}
      <Button
        onClick={onButtonClick}
        variant='contained'
        disableElevation
        sx={{
          // Задание одинаковой ширины и высоты для формирования квадратной формы
          width: '58px',
          height: '58px',
          // Отключение адаптивного растяжения (фиксированный минимальный размер)
          minWidth: '40px',
          padding: 0,
          // Установка цвета фона кнопки
          backgroundColor: '#1a9fff',
          // Отключение скругления с левой стороны для стыковки с полем ввода
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          // Отрисовка границы, совпадающей по цвету с рамкой текстового поля
          // border: `1px solid ${'#2abafd'}`,

          // Настройка плавности изменения цвета фона кнопки
          transition: 'background-color 0.2s ease-in-out',

          // Изменение цвета фона кнопки при наведении мыши (подсветка)
          '&:hover': {
            backgroundColor: '#29a6ff',
          },

          // Настройка базовых параметров для всех вложенных SVG-элементов
          '& svg': {
            // Установка центра масштабирования ровно посередине холста SVG
            transformOrigin: 'center center',
            // Плавность изменения свойства transform (масштаба)
            transition: 'transform 0.2s ease-in-out',
          },

          // Синхронное увеличение всех фигур внутри SVG при наведении на кнопку
          '&:hover svg': {
            // Увеличение размера всей композиции на 15% (scale 1.15)
            transform: 'scale(1.15)',
          },
        }}
      >
        {/* Векторный контейнер SVG для отрисовки геометрических фигур */}
        {/* &#128269; - это была иконка лупы */}
        <svg width="40" height="40" viewBox='0 0 40 40'>
          {/* 
            Тег отрисовки окружности:
            cx - координата центра по оси X
            cy - координата центра по оси Y
            r  - радиус окружности
            fill - цвет заливки внутренней области
          */}
          <circle cx='18' cy='18' r='10' fill='none' stroke={'#ffff'} strokeWidth='3' />
          {/* 
            Тег отрисовки прямоугольника:
            x, y - координаты отступа верхнего левого угла
            width, height - габариты прямоугольника
            rx - радиус закругления углов
            fill - цвет закрашивания внутренней области
          */}
          <rect x='18' y='28' width='4' height='10' rx='0' fill='#ffff' transform='rotate(-45 20 20)'/>
        </svg>
      </Button>
    </Box>
  );
}

function App() {
  useEffect(() => {
    fetch('http://127.0.0.1:8000/check')
      .then((response) => response.json())
      .then((data) => console.log(data));
  }, []);

  // Объявление функции-обработчика события клика по кнопке
  const handleClick = () => {
    // Вызов инструкции fetch с передачей адреса и конфигурационного объекта
    fetch('http://127.0.0.1:8000/click', requestOptions)
      // Преобразование ответа сервера в формат JSON
      .then((response) => response.json())
      // Вывод подтверждения от сервера в консоль
      .then((data) => console.log(data));
  };

  // Вызов хука инициализации состояния для хранения массива элементов из базы данных
  const [items, setItems] = useState([]);
  // Вызов хука инициализации состояния для отслеживания выполнения сетевого запроса
  const [loading, setLoading] = useState(true);
  
  // Вызов функции регистрации побочного эффекта при первичной отрисовке компонента
  useEffect(() => {
    // Вызов функции отправки сетевого запроса к эндпоинту веб-сервера FastAPI
    fetch('http://127.0.0.1:8000/items')
      // Инструкция преобразования тела ответа сервера из формата JSON в объект JavaScript
      .then((response) => response.json())
      // Выполнение функции записи полученного массива в состояние и отключения загрузки
      .then((data) => {
        // Вызов функции обновления состояния элементов полученными данными
        setItems(data);
        // Вызов функции изменения состояния индикатора загрузки на завершенный
        setLoading(false);
      })
      // Обработка возможного сбоя при выполнении сетевого запроса
      .catch((error) => {
        // Вывод сообщения об ошибке в консоль окружения
        console.error('Ошибка при получении данных:', error);
        // Вызов функции отключения состояния загрузки при ошибке
        setLoading(false);
      });
  }, []);

  // Условие проверки завершения загрузки данных
  if (loading) {
    // Возврат разметки текстового уведомления о процессе загрузки
    return <div style={{ color: '#ffff', padding: '20px' }}>Загрузка...</div>;
  }

  return (
    <ThemeProvider theme={theme}>
      // Параметры Container maxWidth: xs sm md lg xl xxl
      <Container maxWidth='lg'>
        <CssBaseline />
        <Button variant="contained" color="primary"
        sx={{
          // Включение абсолютного позиционирования относительно контейнера
          position: 'absolute',
          // Смещение левой границы кнопки на 50% ширины контейнера
          left: '50%',
          // Сдвиг кнопки назад на половину ее собственной ширины (и высоты)
          transform: 'translate(-50%)',
        }} // Разобраться с расположением кнопок
        >
          Нажать
        </Button>
        <CustomButton />
        <CustomButton />
        <DiferentButtons />
        <RectangleTextArea onButtonClick={handleClick} />
        {items.map((item) => (
          <ItemCard 
            key={item.id}
            imageSrc={`http://127.0.0.1:8000${item.image_url}`}
            title={item.title}
            description={item.description}
          />
        ))}
      </Container>
    </ThemeProvider>
   
  );
}

export default App
