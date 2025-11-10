# 🔒 Настройка reCAPTCHA для TB Group Website

## Обзор

Для защиты форм обратной связи от спама и ботов необходимо настроить Google reCAPTCHA v3.

## Инструкция по настройке

### Шаг 1: Получение ключей reCAPTCHA

1. Перейдите на [Google reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin)
2. Войдите в аккаунт Google
3. Нажмите "Create" для создания нового сайта
4. Заполните форму:
   - **Label:** TB Group Website
   - **reCAPTCHA type:** reCAPTCHA v3
   - **Domains:** 
     - `tb-group-base-current-changes-backup-1aa7tiyin.vercel.app` (текущий)
     - `your-domain.com` (production)
5. Примите Terms of Service
6. Нажмите "Submit"

### Шаг 2: Копирование ключей

После создания вы получите:
- **Site Key** (начинается с `1x...`)
- **Secret Key** (начинается с `1x...`)

### Шаг 3: Добавление в Vercel

1. Зайдите в [Vercel Dashboard](https://vercel.com/dashboard)
2. Выберите проект TB Group
3. Перейдите в Settings → Environment Variables
4. Добавьте переменные:

```
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=1x...ваш_site_key
RECAPTCHA_SECRET=1x...ваш_secret_key
```

5. Нажмите "Save"
6. Передеплойте проект

### Шаг 4: Локальная разработка

Создайте файл `.env.local` в корне проекта:

```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=1x...ваш_site_key
RECAPTCHA_SECRET=1x...ваш_secret_key
```

## Дополнительная информация

### Поддерживаемые типы reCAPTCHA

- **reCAPTCHA v3** (рекомендуется) - невидимая проверка
- **reCAPTCHA v2** - с чекбоксом "Я не робот"

### Безопасность

- **Site Key** - публичный, можно безопасно использовать в frontend
- **Secret Key** - приватный, используется только в backend
- Никогда не передавайте Secret Key в frontend код

### Без reCAPTCHA (development)

Сайт работает без reCAPTCHA, но показывает предупреждение:
```
⚠️ reCAPTCHA не настроен. Форма работает без проверки.
```

Для production рекомендуется обязательно настроить reCAPTCHA.

## Поддержка

Если у вас возникли вопросы:
1. Проверьте [Google reCAPTCHA Documentation](https://developers.google.com/recaptcha)
2. Убедитесь, что домены добавлены в whitelist
3. Проверьте логи в Vercel

