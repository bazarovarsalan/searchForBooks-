## Тестовое задание фьюче. Search for books. Google books API"

## Используемые технологии

- React
- Typescript
- Redux Toolkit
- Redux Thunk
- React Router
- библиотека Zod

## Описание

Проект представляет собой frontend-реализацию поисковика книг c использованием API Google books

## Содержание

Приложение содержит следующие самостоятельные экраны (страницы):

1. Главная страница.
1. Каталог товаров.
1. Информационная страница.
1. Страница товара.
1. Корзина.
1. 404

![MainPage](./picForReadme/%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA%20%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0%202023-09-11%20%D0%B2%2021.59.53.png)
![Details](./picForReadme/%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA%20%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0%202023-09-11%20%D0%B2%2021.51.16.png)

## REDUX

В проекте реализованые следующие редюсеры:

- inputSearch: inputSearchSlice (строка для поиска)
- dropdowns: dropdownSlice (значения category, sorted by используемые для поиска)
- booksList: booksListSlice (хранение и получение списка книг)
- pagination: paginationSlice (стейт шага пагинации)
- bookItemDetails: bookItemDetailsSlice (хранение информации о книге)

# Библиотека Zod

Для валидации данных в работе с API Google Books и избежания ошибок в работе приложения (booksListSlice) которые могут появиться уже в дальнешей работе приложения используется библиотека Zod.
Учитывая, что ts не осуществляет проверку данных на стороне клиента, очень удобный инструмент для нивелирования получения некорректных данных.
