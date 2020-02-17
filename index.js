/** =====================
 * Developers: FukaChan
 * Date: 2020-02-18
 * Version: 0.0.1
 ===================== */

require('dotenv').config()

const request = require('request')
const convert = require('xml-js')

// const schedule = require('node-schedule-tz')

const telegraf = require('telegraf')
const app = new telegraf(process.env.BOT_TOKEN)

const {
    inlineKeyboard,
    callbackButton
} = require('telegraf/markup')

const {
    RUB,
    EUR,
    USD
} = require('./service/items')

const urlAPI = `http://www.nationalbank.kz/rss/rates.xml`

// app.use(() => {
//     return null
// })

app.start(ctx => {
    ctx.replyWithMarkdown('🐾 *Добро пожаловать!* Этот бот позволит вам просмотреть курсы валют соотношение к тенге (⚠️ соотношение к дргим валют НЕ РАБОТАЕТ!) \nНиже выберите интересующиеся валюты:', inlineKeyboard([
        callbackButton('🇷🇺 RUB', 'view-rub'),
        callbackButton('🇪🇺 EUR', 'view-eur'),
        callbackButton('🇺🇸 USD', 'view-usd')
    ]).extra())
})

app.action('view-rub', async ctx => {
    await request(urlAPI, (error, res, body) => {
        if (error) {
            return console.log(error)
        }

        let dataString = convert.xml2json(body, {
            compact: false
        })

        let data = JSON.parse(dataString)
        ctx.replyWithMarkdown(`*🇷🇺 Тип валюты:* ${RUB(data).title} \n*Дата обновление:* ${RUB(data).update} \n*Рубль соотношение к тенге:* ${RUB(data).course} \n*Развитие валюты:* ${RUB(data)['up/down'].level === 'UP' ? '📈' : '📉'} ${RUB(data)['up/down'].num} (${RUB(data)['up/down'].level})`, inlineKeyboard([
            callbackButton('🇪🇺 EUR', 'view-eur'),
            callbackButton('🇺🇸 USD', 'view-usd')
        ]).extra())
    })
})
app.action('view-eur', async ctx => {
    await request(urlAPI, (error, res, body) => {
        if (error) {
            return console.log(error)
        }

        let dataString = convert.xml2json(body, {
            compact: false
        })

        let data = JSON.parse(dataString)
        ctx.replyWithMarkdown(`*🇪🇺 Тип валюты:* ${EUR(data).title} \n*Дата обновление:* ${EUR(data).update} \n*Евро соотношение к тенге:* ${EUR(data).course} \n*Развитие валюты:* ${EUR(data)['up/down'].level === 'UP' ? '📈' : '📉'} ${EUR(data)['up/down'].num} (${EUR(data)['up/down'].level})`, inlineKeyboard([
            callbackButton('🇷🇺 RUB', 'view-rub'),
            callbackButton('🇺🇸 USD', 'view-usd')
        ]).extra())
    })
})
app.action('view-usd', async ctx => {
    await request(urlAPI, (error, res, body) => {
        if (error) {
            return console.log(error)
        }

        let dataString = convert.xml2json(body, {
            compact: false
        })

        let data = JSON.parse(dataString)
        ctx.replyWithMarkdown(`*🇺🇸 Тип валюты:* ${USD(data).title} \n*Дата обновление:* ${USD(data).update} \n*Доллар соотношение к тенге:* ${USD(data).course} \n*Развитие валюты:* ${USD(data)['up/down'].level === 'UP' ? '📈' : '📉'} ${USD(data)['up/down'].num} (${USD(data)['up/down'].level})`, inlineKeyboard([
            callbackButton('🇷🇺 RUB', 'view-rub'),
            callbackButton('🇪🇺 EUR', 'view-eur')
        ]).extra())
    })
})

app.startPolling()