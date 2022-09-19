const { Telegraf, Markup } = require('telegraf')
const config = require('./config')
const mongoose = require('mongoose')
const TelegramContent = require("./models/TelegramContent")
const Categories = require('./models/Categories')
const path = require('path')
const bot = new Telegraf(config.BOT_TOKEN)


bot.use(Telegraf.log())
const connectionDB = async() => {
    try {
        await mongoose.connect(`mongodb://127.0.0.1:27017/rzd`)
        console.log('Connection success')
    } catch (error) {
        console.log(new Error)
    }

}
connectionDB();
bot.start((ctx) => {
    if (ctx.message.from.last_name) {
        ctx.reply(`Здравствуйте, ${ctx.message.from.first_name + " " + ctx.message.from.last_name}`)
    } else {
        ctx.reply(`Здравствуйте, ${ctx.message.from.first_name}`)
    }

})

bot.command('/categories', async(ctx) => {
    const categories = await Categories.find().then((item) => {
        let result = []
        item.forEach((category) => {
            let mas = [category.value]
            result.push(mas)
        })
        return result
    })
    ctx.reply("Все категории отображаются на появившейся клавиаутре", Markup.keyboard(categories))
})

bot.hears(/\/train(.+)/, async(ctx) => {
    let url_photo = ""
    const content = await TelegramContent.findOne({ _id: ctx.message.text.slice(6) }).then((response) => {
        // console.log(response.imageName)
        return response
    })
    let finalString = `Название: <b>${content.name}</b>\n\n\n\nОписание маршрута: <b>${content.description}</b>\n\n\nКатегория: ${content.categories.value}`
        // console.log(content)
        // console.log(content)

    console.log(`${config.imagesFolderUrl + content.imageName}`)
    if (content.imageName) {
        ctx.replyWithPhoto({ source: `${config.imagesFolderUrl + content.imageName}` }, {
            caption: (finalString),
            parse_mode: 'html',
            ...Markup.inlineKeyboard([
                Markup.button.url('Подробнее на сайте', content.url_link),
            ])

        })
    } else {
        ctx.replyWithHTML(finalString,
            Markup.inlineKeyboard([
                Markup.button.url('Подробнее на сайте', content.url_link),
            ])
        )
    }
    const counter = await TelegramContent.findOneAndUpdate({ _id: ctx.message.text.slice(6) }, { $inc: { 'counter': 1 } }, { new: true })
})


bot.on('message', async(ctx) => {
    console.log(ctx.message.text)
    const categories = await Categories.find()
    let reply = []
    let error = null;
    let categoryForCounter = null;
    if (categories != undefined) {
        await Promise.all(categories.map(async function(item) {
            if (ctx.message.text == item.value) {
                categoryForCounter = item
                reply = await TelegramContent.find({ "categories._id": item._id }).then((result) => {
                    if (result.length === 0) {
                        error = "Поездов в данной категории нет"
                    }
                    return result
                }).catch(() => {
                    error = "Поездов в данной категории нет"
                })
            }
        }))
    }
    console.log(error, reply)
    if (error === null) {
        let resultString = ""
        const counter = await Categories.findOneAndUpdate({ _id: categoryForCounter._id }, { $inc: { 'counter': 1 } }, { new: true })
        reply.map(((item, index) => {
            let partOfString = `${index + 1})  Название: ${item.name}\n<b>Подробнее об этом поезде по ссылке: /train${item._id}</b>\n\n`
            resultString += partOfString
        }))
        ctx.replyWithHTML(resultString)

        // await counter.save()
    } else {
        const counter = await Categories.findOneAndUpdate({ _id: categoryForCounter._id }, { $inc: { 'counter': 1 } }, { new: true })
            // await counter.save()
        ctx.reply(error)
    }
})


bot.launch()