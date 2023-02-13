// table共通javascript
document.write("<script src=\"src/table/tableCommon.js\" charset=\"utf-8\"></script>");

var userRealFoolTableRawId = "userRealFool";

function createUserRealFoolTableData(userTableRawElement, user) {
    // tableData create
    var userRealFoolElement = userTableRawElement.appendChild(document.createElement("td"));
    userRealFoolElement.id = userRealFoolTableRawId;
    userRealFoolElement.onclick = (clickEvent) => {
        window.event.stopPropagation(); // 親のclickイベントに伝播しないように。
        var selectWindowElement = getChildSelectWindowElement(userRealFoolElement);
        openSelectWindow(selectWindowElement);
    };

    var userRealFoolImage = userRealFoolElement.appendChild(document.createElement("img"));
    userRealFoolImage.src = "";
    userRealFoolElement.draggable = false;
    userRealFoolImage.style.width = userRealFoolImage.style.height = "auto";

    // selectWindowを取得。
    var userRealFoolSelectWindow = appendChildSelectWindow(userRealFoolElement);

    // バカの結果を入力するデータ項目の作成
    var noSelect = "noSelect";
    var selectElementKeys = [noSelect, none, crew, impostor];
    var selectElements = {
        noSelect: null,
        none: null,
        crew: null,
        impostor: null,
    };
    var changeSelectFool = (selectType) => {
        for (var i = 0; i < selectElementKeys.length; ++i) {
            var key = selectElementKeys[i];
            var isSelect = false;
            if (selectType == key) {
                isSelect = true;
                // selectしたのでimageを設定
				var isNoSelect = key == noSelect;
				userRealFoolImage.src = "";
                userRealFoolImage.src = (isNoSelect ? "" : selectElements[key].src);
                userRealFoolImage.style.width = userRealFoolImage.style.height = (isNoSelect ? "0px" : "30px");
            }
            selectElements[key].selected = isSelect;
            setCommonSelectElementData(selectElements[key]);
        }
    }
    var setCommonSelectElementData = (element) => {
        element.style.width = element.style.height = "50px";
        var borderStyle = "solid medium ";
        if (element.selected) {
            borderStyle += "red";
        } else {
            borderStyle += "gray";
        }
        element.style.border = borderStyle;
    };
    var ulElement = userRealFoolSelectWindow.appendChild(document.createElement("ul"));
    var liElement = ulElement.appendChild(document.createElement("li"));
    var divElement = liElement.appendChild(document.createElement("div"));
    divElement.style.display = "table";
    divElement.style.textAlign = "center";
    divElement.style.padding = "0";
    selectElements[noSelect] = divElement;
    selectElements[noSelect].selected = false;

    var textElement = divElement.appendChild(document.createElement("p"));
    textElement.selected = false;
    textElement.innerHTML = "未選択";
    //textElement.style.margin = "0 auto";
    textElement.style.marginBlockStart = "0px";
    textElement.style.marginBlockEnd = "0px";
    textElement.style.verticalAlign = "middle";
    textElement.style.display = "table-cell";
    textElement.style.padding = "0";
    textElement.style.fontSize = "12px";
    textElement.onclick = (event) => {
        window.event.stopPropagation(); // 親のclickイベントに伝播しないように。
        changeSelectFool(noSelect);
        closeSelectWindow(userRealFoolSelectWindow);
    };
    // 未選択以外の画像選択物を作成
    var createFoolImage = (postType) => {
        var liElement = ulElement.appendChild(document.createElement("li"));
        selectElements[postType] = liElement.appendChild(document.createElement("img"));
        selectElements[postType].selected = false;
        selectElements[postType].src = foolPostImages[postType].image;
        selectElements[postType].draggable = false;
        selectElements[postType].onclick = (event) => {
            window.event.stopPropagation(); // 親のclickイベントに伝播しないように。
            changeSelectFool(postType);
            closeSelectWindow(userRealFoolSelectWindow);
        };
    };
    createFoolImage(none);
    createFoolImage(crew);
    createFoolImage(impostor);

    // 最初は未選択を選択中
    changeSelectFool(noSelect);
}