const express = require('express')
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const authRouter = require('./authRouter')
const contentRouter = require('./ContentRouter/contentRouter')
const clientRouter = require('./ClientsRouter/clinentRouter')
const statiscticRouter = require('./Statistic/statiscticRouter')
const Role = require('./models/Role')
const fs = require('fs')
const path = require('path')
const multer = require('multer');
const PORT = process.env.PORT || 5050

const app = express()


// configure the app to use bodyParser()
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use("/auth", authRouter)
app.use('/content', contentRouter)
app.use('/clients', clientRouter)
app.use('/statistic', statiscticRouter)

const start = async() => {
    try {
        await mongoose.connect(`mongodb://127.0.0.1:27017/rzd`)
        app.listen(PORT, () => console.log(`server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()



app.post('/test', async(req, res) => {
    const { role } = req.body
    console.log(role)
    const user = await Role.find({ value: role });
    console.log(user)
    res.json(user)
})

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, '/Users/egorzhidkov/Desktop/rzd/profi_auth_with_roles_nodejs/Storage') //Здесь указывается путь для сохранения файлов
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
});
const upload = multer({ storage: storage });
app.post('/saveImage', upload.single("file"), async(req, res) => {
    try {
        res.json(req.file)
    } catch (error) {
        res.status(400).json({ error: error, message: 'Не удалось сохранить фотографию' })
    }
})

app.post('/sendImage', async(req, res) => {
    try {
        const { imageName } = req.body;
        console.log(imageName)
        let filepath = path.join(__dirname, `/Storage/${imageName}`)
        res.download(filepath)
    } catch (error) {
        res.status(400).json({ error: error, message: 'Не отправить сохранить фотографию' })
    }


})