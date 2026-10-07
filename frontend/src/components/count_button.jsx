// Инструкция импорта модуля библиотечных функций из окружения исполнения
import { useState, useEffect } from 'react';
// Инструкция импорта визуального компонента кнопки из библиотеки Material UI
import Button from '@mui/material/Button';

// Объявление функционального компонента кнопки со счётчиком нажатий
function CountButton() {
  // Инициализация локального состояния счётчика с начальным значением ноль
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    fetch('/api/clicks')
      .then((response) => response.json())
      .then((data) => setCount(data.clicks))
      .catch((error) => console.error('Ошибка получения счётчика:', error));
  }, []);
  
  // Объявление функции обработки события нажатия на кнопку
  const handleClick = () => {
    // Вызов функции изменения состояния с увеличением текущего значения на единицу
    // setCount((prevCount) => prevCount + 1);
    fetch('/api/clicks/increment', {method: 'POST'})
      .then((response) => response.json())
      .then((data) => setCount(data.clicks))
      .catch((error) => console.error('Ошибка изменения счётчика:', error));
  };

  // Возврат визуальной структуры компонента
  return (
    // Рендеринг компонента кнопки библиотеки Material UI
    <Button
      // Вариант визуального отображения кнопки с фоновой заливкой  
      variant='contained'
      // Назначение своего цвета кнопке
      
      // Назначение функции-обработчика на событие нажатия
      onClick={handleClick}

      // Настройка стилевых свойств элемента через объект sx
      sx={{
        backgroundColor: 'rgba(179, 218, 255, 0.18)',
        // Позволяет подстраиваться элементу под размер окна
        display: 'flex',
        // Поведение курсора при наведении - переходит в активное состояние
        cursor: 'pointer',
        // Задание внутреннего отступа содержимого кнопки
        padding: '10px, 20px',
        // Задание внешнего отступа элемента
        margin: '10px, 0',
        // Задаём анимацию перехода 
        transition: 'background-color 0.2s ease',
        // Что происходит при наведении
        '&:hover': {
          // При наведении меняется цвет
          backgroundColor: 'rgba(179, 218, 255, 0.25)'
        },
      }}
    >
      {/* Вывод текста с динамической подстановкой текущего количества нажатий */}
      {`Нажато раз: ${count}`}
    </Button>
  );
}

export default CountButton