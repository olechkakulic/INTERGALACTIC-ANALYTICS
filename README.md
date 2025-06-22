## Инструкция по запуску

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
