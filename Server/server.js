const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 3000;


// JSONを受け取る
app.use(express.json());


// CORS
app.use(cors());


// Webフォルダを公開
app.use(express.static(path.join(__dirname, "../Web")));


// 現在のエフェクト
let currentEffect = null;


// ================================================
// Webページ
// ================================================

app.get("/", (req, res) => {

    res.sendFile(
        path.join(__dirname, "../Web/index.html")
    );

});


// ================================================
// POST
// ================================================

app.post("/effect", (req, res) => {

    const data = req.body;

    console.log(
        "受信:",
        data
    );

    currentEffect = {

        effect: data.effect,

        color: data.color,

        size: data.size,

        speed: data.speed

    };

    res.json({
        success: true
    });

});


// ================================================
// GET
// ================================================

app.get("/effect", (req, res) => {

    if (currentEffect === null) {

        res.json({
            effect: -1,
            color: "",
            size: 1,
            speed: 1
        });

        return;
    }

    const data = currentEffect;

    // 送信したのでリセット
    currentEffect = null;

    res.json(data);

});


// ================================================
// START
// ================================================

app.listen(
    PORT,
    "0.0.0.0",
    () => {

        console.log(
            "Server Start : " +
            PORT
        );

    }
);
