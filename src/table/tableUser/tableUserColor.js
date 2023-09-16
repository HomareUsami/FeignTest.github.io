// table共通javascript
writeDocumentPath("src/table/tableCommon.js");
// document.write("<script src=\"src/table/tableCommon.js\" charset=\"utf-8\"></script>");
// character javascript
writeDocumentPath("src/character.js");
// document.write("<script src=\"src/character.js\" charset=\"utf-8\"></script>");

var userColorTableRawId = "userColor";

// userの色情報設定。
function createUserColorTableData(userTableRawElement, user) {

    // 関数内でデリゲート定義
    var getUserColorSelectWindowElement = (tableDataElement) => {
        return getChildSelectWindowElement(tableDataElement);
    };

    // table data
    var userColorElement = userTableRawElement.appendChild(document.createElement("td"));
    userColorElement.id = userColorTableRawId;
    // 参考 : https://blog.ver001.com/javascript-css-dropdownlist/#toc12
    userColorElement.onclick = (clickEvet) => {
        window.event.stopPropagation(); // 親のclickイベントに伝播しないように。
        var selectWindow = getUserColorSelectWindowElement(clickEvet.currentTarget);
        openSelectWindow(selectWindow);
    };

    // image data
    var userSettingColorImageElement = userColorElement.appendChild(document.createElement("img"));
    userSettingColorImageElement.src = user.characterImage;
    userSettingColorImageElement.draggable = false;
    setCharacterImageData(userSettingColorImageElement, user.characterImage);

    // selectWindow
    var userColorSelectElement = appendChildSelectWindow(userColorElement);
    // selectColors Setting list
    var userColorSelectParentListElement = null;
    for (var i = 0; i < characterImages.length; ++i) {
        if (i % 5 == 0) {
            // 5個ずつで横に並べたい
            userColorSelectParentListElement = userColorSelectElement.appendChild(document.createElement("ul"));
        }
        var characterImage = characterImages[i];
        userColorSelectListElement = userColorSelectParentListElement.appendChild(document.createElement("li"));
        userColorImageElement = userColorSelectListElement.appendChild(document.createElement("img"));
        userColorImageElement.src = characterImage.image;
        userColorImageElement.draggable = false;
        setCharacterImageData(userColorImageElement);
        // 画像をclickしたときの挙動定義
        userColorImageElement.onclick = (clickEvent) => {
            window.event.stopPropagation(); // 親のclickイベントに伝播しないように。　これにより、td側のonclickは呼ばれなくなる。

            var clickElement = clickEvent.currentTarget;
            var clickColorImageSrc = clickElement.src;
            var tableDataElement = userColorElement;

            // imageをselect
            userSettingColorImageElement.src = clickColorImageSrc;
            setCharacterImageData(userSettingColorImageElement, clickColorImageSrc);

            // selectWindowをOff
            var selectWindowElement = getUserColorSelectWindowElement(tableDataElement);
            closeSelectWindow(selectWindowElement);

            // memo : user情報側にcolor情報も渡す必要があるのであればこの時に同時に渡す必要がある。
            user.characterImage = clickColorImageSrc;

			updateUser(user);
        };
    }
}