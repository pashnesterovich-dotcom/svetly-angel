# Svetly Angel — Design Rules

## Стиль
Warm minimal. НЕ corporate, НЕ generic tech. Это travel-приключение троих друзей.
Настроение: тёплый, дружелюбный, немного ироничный. Как заметки в блокноте путешественника.

## Антипаттерны (НЕ ДЕЛАТЬ)
- НЕ gradient hero с анимацией — используй фото Мадейры (Unsplash) или чистый цвет
- НЕ CSS-облака и SVG-горы — это детский стиль
- НЕ glass-morphism (backdrop-blur) — не подходит travel тематике
- НЕ Inter — это generic AI шрифт
- НЕ rainbow badges (каждый день свой цвет) — максимум 2-3 цвета
- НЕ стандартный Leaflet без стилизации — используй тёмную или тёплую тему карты

## Шрифт
Google Fonts: `DM Sans` или `Nunito` или `Source Sans 3` — что-то тёплое, не corporate.
Один шрифт на весь сайт. Weights: 400, 500, 600, 700.

## Цвета
```css
:root {
  --bg: #FAFAF8;           /* тёплый белый, не холодный */
  --text: #1A1A1A;         /* почти чёрный */
  --text-secondary: #6B6B6B;
  --accent: #D97706;       /* тёплый оранжевый — Мадейра, солнце, приключение */
  --accent-light: #FEF3C7; /* фон для акцентных блоков */
  --success: #16A34A;      /* бесплатно, готово */
  --waiting: #9CA3AF;      /* ждём */
  --danger: #DC2626;       /* экстренное */
  --card: #FFFFFF;
  --border: #E8E5E0;       /* тёплый серый, не холодный */
}
```

## Консистентность
- ВСЕ ссылки: одного стиля (цвет accent, без underline, с → стрелкой при hover)
- ВСЕ badge дней: ОДИН цвет accent, не rainbow
- ВСЕ карточки: одинаковый border-radius (12px), одинаковый shadow
- ВСЕ иконки: один набор (Lucide или эмодзи — не мешать)
- ВСЕ заголовки секций: один размер, один стиль

## Карта
Leaflet + тёмная или тёплая тема тайлов:
- Stamen Toner Lite: `https://tiles.stadiamaps.com/tiles/stamen_toner_lite/{z}/{x}/{y}.png`
- Или CartoDB Positron: `https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png`
Маршрут: линия цвета accent (2-3px), маркеры — кастомные (номер дня).

## Mobile-first
- Base font: 16px, не меньше
- Touch targets: min 44px
- Padding: 16px по бокам
- Карточки дней: full-width на мобильном

## Структура файла
Один HTML + inline CSS/JS. Leaflet.js для карты. Без фреймворков.
