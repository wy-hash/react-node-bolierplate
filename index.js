const express = require("express")
const app = express()
const port = 5000
const bodyParser = require("body-parser")
const { User } = require("./models/User")
const config = require("./config/key")

// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true })); // 클라이언트에서 오는 정보를 서버에서 분석하여 
//application/json
app.use(bodyParser.json());

const mongoose = require("mongoose")
mongoose.connect(config.mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => console.log("MongoDB Connected..."))
    .catch(err => console.log(err))

app.get('/', (req, res) => res.send("Hello World!~~@@ "))

app.post('/register', (req, res) => {
    // 회원 가입할 때 필요한 정보들을 client에서 가져오면
    // 그것들을 데이터 베이스에 넣어준다.
    console.log(req.body)
    const user = new User(req.body);

    // mongodb method
    user.save((err, doc) => {
        if (err) return res.json({ success: false, err })
        return res.status(200).json({
            success: true
        })
    })
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))