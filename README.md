# Инструкция по запуску тестов
---
( привет проверяющему! если у вас не запускается что-то из-за зависимостей напишите мне пожалуйста в телеграмм @krinzhymer'. у меня какие-то жесткие траблы с ними возникли..)
## Типы тестов

Проект включает несколько уровней тестирования:

- **Unit-тесты** — проверка отдельных компонентов и функций:
  - `FileDropzone.test.js` — тестирование компонента загрузки файлов  
  - `ResultsDisplay.test.js` — тестирование компонента отображения результатов  
  - `GeneratorButton.test.js` — тестирование кнопки генерации  
  - `StatusMessage.test.js` — тестирование компонента статусных сообщений  
  - `generateReport.test.js` — тестирование API генерации отчетов  

- **Интеграционные тесты** — проверка взаимодействия компонентов:
  - `CSVanalyticsPage.test.js` — тестирование страницы аналитики CSV  
  - `CsvGeneratorPage.test.js` — тестирование страницы генератора данных  

---

## Тестовые сценарии

### Компонент загрузки файлов (FileDropzone)

- Отклонение файлов не-CSV формата  
- Корректная обработка CSV-файлов  

### Компонент отображения результатов (ResultsDisplay)

- Корректное отображение всех результатов аналитики  
- Форматирование числовых значений  

### Страница аналитики CSV (CSVanalytics)

- Начальное состояние страницы  
- Активация кнопки отправки при выборе файла  
- Вызов обработки файла при отправке  
- Отображение результатов после успешной обработки  

### API генерации отчетов

- Успешная генерация отчета  
- Обработка ошибок сети  
- Корректность параметров запроса  

### Компоненты генератора данных

- Состояния кнопки генерации  
- Отображение статусных сообщений  

---

## Инструкция по запуску

1. Убедитесь, что у вас установлен Node.js (версия 16 или выше)  

2. Установите зависимости проекта:

```bash
npm install
```

3. Запустите тесты:


```bash
npm test
```

### Структура проекта
```
my-react-app/
├── node_modules/
├── public/
└── src/
    ├── components/
    ├── pages/
    │   ├── CSVanalytics/
    │   │   ├── api/
    │   │   ├── FileDropZone/
    │   │   ├── ResultsDisplay/
    │   │   ├── tests/
    │   │   │   ├── components/
    │   │   │   │   ├── FileDropzone.test.js
    │   │   │   │   └── ResultsDisplay.test.js
    │   │   │   └── pages/
    │   │   │       └── CSVanalyticsPage.test.js
    │   │   ├── CSVanalyticsPage.jsx
    │   │   └── CSVanalyticsPage.module.css
    │   │
    │   ├── CSVgenerics/
    │   │   ├── api/
    │   │   ├── GenerateButton/
    │   │   ├── ResetButton/
    │   │   ├── tests/
    │   │   │   ├── api/
    │   │   │   │   └── generateReport.test.js
    │   │   │   ├── components/
    │   │   │   │   ├── GeneratorButton.test.js
    │   │   │   │   └── StatusMessage.test.js
    │   │   │   └── pages/
    │   │   │       └── CsvGeneratorPage.test.js
    │   │   ├── CsvGeneratorPage.jsx
    │   │   └── CSVgenericsPage.module.css
    │   │
    │   └── History/
    │       ├── store/
    │       │   └── historyStore.js
    │       ├── HistoryPage.jsx
    │       └── HistoryPage.module.css
    │
    ├── store/
    ├── App.jsx
    ├── App.test.js
    └── index.css
```


## Инструкция по запуску проекта

### 1. Клонируйте данный фронтенд-репозиторий и установите зависимости

```bash
git clone <ссылка_на_ваш_репозиторий>
cd <название_директории_проекта>
npm install
```

### 2. Запустите backend-сервер

Фронтенд взаимодействует с сервером, который находится в этом репозитории:  
 [https://github.com/etozhenerk/shri2025-back](https://github.com/etozhenerk/shri2025-back)

Инструкция:

```bash
git clone https://github.com/etozhenerk/shri2025-back.git
cd shri2025-back
npm install
node src/index.js
```

По умолчанию сервер запускается на `http://localhost:3000`.

### 3. Запустите фронтенд-приложение

```bash
npm run dev
```

Откройте в браузере:  
[http://localhost:5173](http://localhost:5173)

---

## Описание архитектуры

### Технологический стек
- **React + Vite** — клиентское SPA-приложение
- **TypeScript** (или JavaScript) — язык разработки
- **CSS Modules** — стилизация компонентов
- **Zustand** — управление состоянием приложения
- **react-router-dom** — роутинг между страницами
- **Fetch API** — работа с backend
- **LocalStorage** — хранение истории загрузок
- **React Portals** — реализация модальных окон
- **ESLint + Prettier** — линтинг и автоформатирование кода

### Структура проекта

```
src/
├── components/              # Переиспользуемые UI-компоненты
├── pages/                   # Страницы приложения
│   ├── CSVanalytics/        # Загрузка и аналитика CSV-файлов
│   │   ├── api/             # Взаимодействие с backend (обработка CSV)
│   ├── History/             # История загрузок (из localStorage)
│   ├── CSVgeneritcs/            # Генерация тестовых таблиц
│   │   ├── api/             # Взаимодействие с backend (генерация файлов)
├── store/                   # Zustand store (глобальное состояние)
└── App.jsx                  # Корневой компонент с роутингом
```
