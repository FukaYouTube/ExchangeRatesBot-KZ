/** =====================
 * Developers: FukaChan
 * Date: 2020-02-18
 * Version: 0.0.1
 ===================== */

require('dotenv').config()

const request = require('request')
const convert = require('xml-js')
const fs = require('fs')

// const schedule = require('node-schedule-tz')

const telegraf = require('telegraf')
const session = require('telegraf/session')
const app = new telegraf(process.env.BOT_TOKEN)

const {
    inlineKeyboard,
    callbackButton,
    keyboard,
    removeKeyboard
} = require('telegraf/markup')

const service = require('./service')
const router = require('./router')

const urlAPI = `http://www.nationalbank.kz/rss/rates.xml`

// app.use(() => {
//     return null
// })

app.use(session())

app.start(ctx => {
    let message = JSON.parse(fs.readFileSync(`source/messages/messages.${ctx.session.lang || 'ru'}.json`))

    ctx.replyWithMarkdown(message['welcome'], inlineKeyboard([
        [callbackButton('🇷🇺 RUB', 'view-rub')],
        [callbackButton('🇪🇺 EUR', 'view-eur')],
        [callbackButton('🇺🇸 USD', 'view-usd')]
    ]).extra())
})

function EXmessage(type, ctx) {
    let message = JSON.parse(fs.readFileSync(`source/messages/messages.${ctx.session.lang || 'ru'}.json`))
    return message['ex-message'][0] + ' ' + type.title + '\n' +
        message['ex-message'][1] + ' ' + type.update + '\n' +
        message['ex-message'][2] + ' ' + type.course + '\n' +
        message['ex-message'][3] + ' ' + (type['up/down'].level === 'UP' ? '📈' : '📉') + type['up/down'].num + ' ' + '(' + type['up/down'].level + ')'
}

app.action('view-rub', async ctx => {
    await request(urlAPI, (error, res, body) => {
        if (error) {
            return console.log(error)
        }

        let dataString = convert.xml2json(body, {
            compact: false
        })

        let data = JSON.parse(dataString)
        ctx.replyWithMarkdown(`🇷🇺` + EXmessage(service.items.RUB(data), ctx), inlineKeyboard([
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
        ctx.replyWithMarkdown(`🇪🇺` + EXmessage(service.items.EUR(data), ctx), inlineKeyboard([
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
        ctx.replyWithMarkdown(`🇺🇸` + EXmessage(service.items.USD(data), ctx), inlineKeyboard([
            callbackButton('🇷🇺 RUB', 'view-rub'),
            callbackButton('🇪🇺 EUR', 'view-eur')
        ]).extra())
    })
})

app.use(router.calculator)

app.command('settings', ctx => {
    let message = JSON.parse(fs.readFileSync(`source/messages/messages.${ctx.session.lang || 'ru'}.json`))
    ctx.replyWithMarkdown(message['settings'].msg, keyboard(message['settings'].button).oneTime().resize().extra())
})

app.hears(/./gm, (ctx, next) => {
    let message = JSON.parse(fs.readFileSync(`source/messages/messages.${ctx.session.lang || 'ru'}.json`))

    if (ctx.message.text == message['settings'].button[0][0]) {
        ctx.replyWithMarkdown(message['lang-settings'].msg, inlineKeyboard([
            [callbackButton(message['lang-settings'].button[0], 'ru-lang')],
            [callbackButton(message['lang-settings'].button[1], 'kz-lang')],
            [callbackButton(message['lang-settings'].button[2], 'en-lang')]
        ]).extra())
    } else {
        next()
    }
})

app.action('ru-lang', ctx => {
    let message = JSON.parse(fs.readFileSync(`source/messages/messages.${ctx.session.lang || 'ru'}.json`))

    ctx.deleteMessage()
    ctx.session.lang = 'ru'
    ctx.replyWithMarkdown(message['lang-settings']['success-edit-lang'], removeKeyboard().oneTime().resize().extra())
})
app.action('kz-lang', ctx => {
    let message = JSON.parse(fs.readFileSync(`source/messages/messages.${ctx.session.lang || 'ru'}.json`))

    ctx.deleteMessage()
    ctx.session.lang = 'kz'
    ctx.replyWithMarkdown(message['lang-settings']['success-edit-lang'], removeKeyboard().oneTime().resize().extra())
})
app.action('en-lang', ctx => {
    let message = JSON.parse(fs.readFileSync(`source/messages/messages.${ctx.session.lang || 'ru'}.json`))

    ctx.deleteMessage()
    ctx.session.lang = 'en'
    ctx.replyWithMarkdown(message['lang-settings']['success-edit-lang'], removeKeyboard().oneTime().resize().extra())
})

app.help(ctx => {
    let message = JSON.parse(fs.readFileSync(`source/messages/messages.${ctx.session.lang || 'ru'}.json`))
    ctx.reply(message['help'])
})

app.startPolling()