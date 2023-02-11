
// 画像元となる参照先の文字列を取得
function getCharacterImageStr(color) {
    var str = "image/character/";
    str += color;
    str += ".png";
    return str;
}

// all character image array
var characterImages = [
    { image: getCharacterImageStr("White"), color: "White" },
    { image: getCharacterImageStr("Red"), color: "Red" },
    { image: getCharacterImageStr("Pink"), color: "Pink" },
    { image: getCharacterImageStr("Rose"), color: "Rose" },
    { image: getCharacterImageStr("Yellow"), color: "Yellow" },
    { image: getCharacterImageStr("Salmon"), color: "Salmon" },
    { image: getCharacterImageStr("Orenge"), color: "Orenge" },
    { image: getCharacterImageStr("Lime"), color: "Lime" },
    { image: getCharacterImageStr("Green"), color: "Green" },
    { image: getCharacterImageStr("Sky"), color: "Sky" },
    { image: getCharacterImageStr("Blue"), color: "Blue" },
    { image: getCharacterImageStr("Purple"), color: "Purple" },
    { image: getCharacterImageStr("Brown"), color: "Brown" }
];

// character関連の画像データの情報設定処理
function setCharacterImageData(imageElement,imagePath) {
    if(imagePath != "") {
        imageElement.style.width = imageElement.style.height = "20px";
    } else {
        imageElement.style.width = imageElement.style.height = "auto";
    }
}