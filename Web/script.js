// =================================================
// Projection Mapping Controller
// =================================================


// =================================================
// Node.js
// =================================================

const SERVER_URL =
    "https://projection-mapping-server.onrender.com/effect";


// =================================================
// 現在の設定
// =================================================

let selectedEffect = 0;
let selectedColor = "Pink";
let selectedSize = 1;
let selectedSpeed = 1;


// =================================================
// ページ
// =================================================

const pageSelect =
    document.getElementById("page-select");

const pageSettings =
    document.getElementById("page-settings");


// =================================================
// ページ切り替え
// =================================================

function showPage(page) {

    document.querySelectorAll(".page").forEach(p => {
        p.classList.remove("active");
    });

    page.classList.add("active");
}


// =================================================
// EFFECT SELECT
// =================================================

const effectButtons =
    document.querySelectorAll(".effect");


effectButtons.forEach(button => {

    button.addEventListener("click", () => {

        const effectName =
            button.dataset.effect;


        // -----------------------------------------
        // エフェクト番号
        // -----------------------------------------

        switch (effectName) {

            case "heart":
                selectedEffect = 0;
                break;

            case "star":
                selectedEffect = 1;
                break;

            case "water":
                selectedEffect = 2;
                break;

            case "sparkle":
                selectedEffect = 3;
                break;

            default:
                console.error(
                    "不明なエフェクト:",
                    effectName
                );
                return;
        }


        // -----------------------------------------
        // タイトル
        // -----------------------------------------

        const names = {
            heart: "HEART",
            star: "STAR",
            water: "WATER",
            sparkle: "SPARKLE"
        };


        const title =
            document.getElementById(
                "selectedEffectName"
            );


        if (title) {
            title.textContent =
                names[effectName];
        }


        // -----------------------------------------
        // 選択状態
        // -----------------------------------------

        effectButtons.forEach(btn => {
            btn.classList.remove("selected");
        });

        button.classList.add("selected");


        console.log(
            "Effect:",
            selectedEffect,
            effectName
        );


        // -----------------------------------------
        // 水
        // -----------------------------------------

        if (selectedEffect === 2) {

            // 水はBlue固定
            selectedColor = "Blue";


            // 色ボタン無効化
            document
                .querySelectorAll(".color")
                .forEach(color => {

                    color.classList.add(
                        "disabled"
                    );

                });

        }

        else {

            // 色ボタン有効化
            document
                .querySelectorAll(".color")
                .forEach(color => {

                    color.classList.remove(
                        "disabled"
                    );

                });

        }


        // -----------------------------------------
        // 設定画面へ
        // -----------------------------------------

        showPage(pageSettings);

    });

});


// =================================================
// COLOR
// =================================================

const colorButtons =
    document.querySelectorAll(".color");


colorButtons.forEach(button => {

    button.addEventListener("click", () => {

        // 水は変更不可
        if (selectedEffect === 2) {
            return;
        }


        selectedColor =
            button.dataset.color;


        colorButtons.forEach(btn => {
            btn.classList.remove("selected");
        });


        button.classList.add("selected");


        console.log(
            "Color:",
            selectedColor
        );

    });

});


// =================================================
// SIZE
// =================================================

const sizeSlider =
    document.getElementById("size");

const sizeValue =
    document.getElementById("sizeValue");


if (sizeSlider) {

    sizeSlider.addEventListener(
        "input",
        () => {

            selectedSize =
                Number(
                    sizeSlider.value
                );


            if (sizeValue) {

                sizeValue.textContent =
                    "×" + selectedSize;

            }

        }
    );

}


// =================================================
// SPEED
// =================================================

const speedSlider =
    document.getElementById("speed");

const speedValue =
    document.getElementById("speedValue");


if (speedSlider) {

    speedSlider.addEventListener(
        "input",
        () => {

            selectedSpeed =
                Number(
                    speedSlider.value
                );


            if (speedValue) {

                speedValue.textContent =
                    "×" + selectedSpeed;

            }

        }
    );

}


// =================================================
// GO
// =================================================

const goButton =
    document.getElementById("goButton");


goButton.addEventListener(
    "click",
    async () => {

        console.log(
            "=========================="
        );

        console.log(
            "SEND EFFECT"
        );

        console.log(
            "Effect:",
            selectedEffect
        );

        console.log(
            "Color:",
            selectedColor
        );

        console.log(
            "Size:",
            selectedSize
        );

        console.log(
            "Speed:",
            selectedSpeed
        );


        // -----------------------------------------
        // Node.jsへ送信
        // -----------------------------------------

        try {

            const response =
                await fetch(
                    SERVER_URL,
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body: JSON.stringify({

                            effect:
                                selectedEffect,

                            color:
                                selectedColor,

                            size:
                                selectedSize,

                            speed:
                                selectedSpeed

                        })

                    }
                );


            if (!response.ok) {

                throw new Error(
                    "Server Error: " +
                    response.status
                );

            }


            console.log(
                "Node.jsへの送信成功！"
            );


            // -------------------------------------
            // EFFECT SELECTに戻す
            // -------------------------------------

            showPage(pageSelect);

        }


        catch (error) {

            console.error(
                "送信エラー:",
                error
            );


            alert(
                "サーバーに接続できませんでした。\n" +
                "Node.jsが起動しているか確認してください。"
            );

        }

    }
);
