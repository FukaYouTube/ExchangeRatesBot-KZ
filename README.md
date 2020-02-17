# ExchangeRatesBot-KZ (Курс валют руб/евро/доллар соотношение к тенге) 🇰🇿
JavaScript, Node.js  
Developer: FukaChanYT :: [VK](https://vk.com/programmer_nodejs), [Telegram](https://t.me/FukaChanYT)  

1. Установка:
```
$ git clone https://github.com/FukaYouTube/ExchangeRatesBot-KZ.git  # Клонирование/скачивание проекта затем откройте папку
$ npm install                                                       # Установка необходимых библиотек
$ vim .env                                                          # Создайте .env файл и внутри: BOT_TOKEN = ваш токен бота
                                                                    # Гугл в помощь!
```

2. Запуск
```
$ npm start                                                         # Если у вас пусто то бот работает!
```

```javascript
// process.env.BOT_TOKEN - передаем токен с .env файла
// можно вместо (process.env.BOT_TOKEN) написать простым способом: "токен" :)
const app = new telegraf(process.env.BOT_TOKEN)

const urlAPI = `http://www.nationalbank.kz/rss/rates.xml` // здесь ссылка api для просмотра курса валют

// функциий где мы передаем куча мусора с api и получаем нужные данные
// функциий находятся в папке service/items.js
RUB(data)
EUR(data)
USD(data)
```

```javascript
// Костыль чтобы очистить бота от не выполненых запросов :3
app.use(() => {
    return null
})
```