const request = require('request')
const convert = require('xml-js')

const Composer = require('telegraf/composer')
const app = new Composer()

const service = require('../service')

const urlAPI = `http://www.nationalbank.kz/rss/rates.xml`

app.hears(/rub\s([^+\"]+)/i, async ctx => {
    await request(urlAPI, (error, res, body) => {
        if (error) {
            return console.log(error)
        }

        let dataString = convert.xml2json(body, {
            compact: false
        })

        let data = JSON.parse(dataString)

        let viewsMessage = `${ctx.match[1]}\u20BD * ${Number(service.items.RUB(data).course)}\u20B8 = `
        ctx.reply(viewsMessage + (ctx.match[1] * Number(service.items.RUB(data).course)))
    })
})

app.hears(/eur\s([^+\"]+)/i, async ctx => {
    await request(urlAPI, (error, res, body) => {
        if (error) {
            return console.log(error)
        }

        let dataString = convert.xml2json(body, {
            compact: false
        })

        let data = JSON.parse(dataString)

        let viewsMessage = `${ctx.match[1]}\u20AC * ${Number(service.items.EUR(data).course)}\u20B8 = `
        ctx.reply(viewsMessage + (ctx.match[1] * Number(service.items.EUR(data).course)))
    })
})

app.hears(/usd\s([^+\"]+)/i, async ctx => {
    await request(urlAPI, (error, res, body) => {
        if (error) {
            return console.log(error)
        }

        let dataString = convert.xml2json(body, {
            compact: false
        })

        let data = JSON.parse(dataString)

        let viewsMessage = `${ctx.match[1]}\u0024 * ${Number(service.items.USD(data).course)}\u20B8 = `
        ctx.reply(viewsMessage + (ctx.match[1] * Number(service.items.USD(data).course)))
    })
})

module.exports = app