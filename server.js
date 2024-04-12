const express = require('express');
const app = express();
const path = require('path');
const bodyparser = require("body-parser")
const session = require('express-session')
const { v4: uuidv4 } = require("uuid");



const router = require('./router');



const port = process.env.PORT || 3000;

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }))
app.use(session({
    secret: uuidv4(),
    resave: false,
    saveUninitialized: true

}))

app.set('view engine', 'ejs')

//load static assets
app.use('/static', express.static(path.join(__dirname, 'public')))
app.use('/assets', express.static(path.join(__dirname, 'public/assets')))



app.use('/route', router);

//home route
app.get('/', (req, res) => {
    res.render('base', { title: "Login System" });
})
//route for logout
router.get('/logout', (req, res) => {
    req.session.destroy(function (err) {
        if (err) {
            console.log(err)
            res.send("error")
        } else {
            res.render('base', { title: "Express", logout: "Logout Successfully" })
        }
    })
})



app.listen(port, () => {
    console.log("listening to the server on http://localhost:3000")
})