writeDocumentPath("src/user/user.js");
writeDocumentPath("src/post.js");
writeDocumentPath("src/table/tableCommon.js");
writeDocumentPath("src/table/tableUtility.js");
writeDocumentPath("src/utilityElement.js");

// document.write("<script src=\"src/user/user.js\" charset=\"utf-8\"></script>");
// document.write("<script src=\"src/post.js\" charset=\"utf-8\"></script>");
// document.write("<script src=\"src/table/tableCommon.js\" charset=\"utf-8\"></script>");
// document.write("<script src=\"src/table/tableUtility.js\" charset=\"utf-8\"></script>");
// document.write("<script src=\"src/utilityElement.js\" charset=\"utf-8\"></script>");

// userName系
var userRegistInputId = "UserRegist";
var userRegistArrayInputId = "UserRegistArray";
var userNameTableRawId = "userName";

// post系
var userSelectPostListId = "UserSelectPostList";

// userSelect
var userSelectListId = "UserSelectList";

// update character image func
//var updateCharacterImage = [];

///////////////////////////////////////////////////////////////////////////
//
// User名
//
///////////////////////////////////////////////////////////////////////////
// User登録に入力された名前取得
function getInputRegistUserName() {
    var userRegistName = document.getElementById(userRegistInputId);
    return userRegistName.value;
}

// User登録に入力された名前取得
function getInputRegistUserArrayName() {
    var userArrayRegistName = document.getElementById(userRegistArrayInputId);
    return userArrayRegistName.value;
}

///////////////////////////////////////////////////////////////////////////
//
// User Table関連
//
///////////////////////////////////////////////////////////////////////////
// user tableかどうかを判定
function isUserTableRaw(tableRawElement) {
    var children = tableRawElement.children;
    for (var i = 0; i < children.length; ++i) {
        if (children[i].id == userNameTableRawId) {
            return true;
        }
    }
    return false;
}

// tablerawからuserNameのtableDataを取得
function getUserNameTableDataByTableRaw(tableRawElement) {
    var children = tableRawElement.children;
    for (var i = 0; i < children.length; ++i) {
        if (children[i].id == userNameTableRawId) {
            return children[i];
        }
    }
    return null;
}

// userNameをtablerawから取得
function getUserNameByTableRaw(tableRawElement) {
    var tableData = getUserNameTableDataByTableRaw(tableRawElement);
    if (tableData == null) return "errorName";
    return tableData.user.name;
}

function setUserInputElement(element, user, isImage) {
	element.style.width = isImage ? defaultSize : "auto";
	element.style.height = defaultSize;
	element.style.display = "inline-block";
	element.user = user; // user情報を保持
	element.style.margin = "0px";
};

function createUserInputElement(parentNode, user, isImage) {
	var userInputElement = null;
	if (isImage) {
		userInputElement = parentNode.appendChild(document.createElement("img"));
		userInputElement.src = user.characterImage;
		userInputElement.draggable = false;
	} else {
		userInputElement = parentNode.appendChild(document.createElement("p"));
		userInputElement.innerHTML = user.name;
	}
	setUserInputElement(userInputElement, user, isImage);
	return userInputElement;
}

function updateUserInputElement(userInputElement, user) {
	var isImage = false;
	if (user.characterImage != "") isImage = true;
	var newUserInputElement = document.createElement(isImage ? "img" : "p");
	if (isImage) newUserInputElement.src = user.characterImage;
	else newUserInputElement.innerHTML = user.name;
	setUserInputElement(newUserInputElement, isImage);
	userInputElement.replaceWith(newUserInputElement);
	userInputElement = newUserInputElement;
}
///////////////////////////////////////////////////////////////////////////
//
// 役職
//
///////////////////////////////////////////////////////////////////////////

// 役職選択の情報群を作成
function createSelectPost(parentNode, onClickImage, isEnableNoSelect) {
    // button create
    createSelectPostTypeButtons(parentNode, onClickImage,isEnableNoSelect);

    // 役職設定list elementを追加
    var userPostSelectPostListElement = parentNode.appendChild(document.createElement("div"));
    userPostSelectPostListElement.id = userSelectPostListId;

	// defaultはnone
	changePostTypeSelectPost(none, parentNode, onClickImage,isEnableNoSelect);
}
// 役職のタイプボタンを作成
function createSelectPostTypeButtons(parentNode, onClickImage,isEnableNoSelect) {
    // 共通button style setting
    var setButtonStyle = (buttonElement) => {
        buttonElement.style.webkitAppearance = "none";
        buttonElement.style.mozAppearance = "none";
        buttonElement.style.appearance = "none";
        buttonElement.style.border = "1px solid";
        buttonElement.style.borderRadius = "0px";
    };

    // ボタン作成処理
    var createButton = (postType, color) => {
        var postTypeButtonLiElement = userPostSelectButtonUlElement.appendChild(document.createElement("li"));
        var postTypeButtonElement = postTypeButtonLiElement.appendChild(document.createElement("button"));
        postTypeButtonElement.innerHTML = postType;
        if(color != null) {
            postTypeButtonElement.style.backgroundColor = color;
        }
        setButtonStyle(postTypeButtonElement);
        postTypeButtonElement.onclick = (clickEvent) => {
            window.event.stopPropagation(); // 親のclickイベントに伝播しないように。　これにより、td側のonclickは呼ばれなくなる。
            // click時event
            changePostTypeSelectPost(postType, parentNode, onClickImage,isEnableNoSelect);
        };
    };

    // button全体ul
    var userPostSelectButtonUlElement = parentNode.appendChild(document.createElement("ul"));
    
    // クルー
    createButton(innocent, "rgb(75, 221, 61)");

    // インポスター
    createButton(impostor, "rgb(212, 28, 28)");

    // ニュートラル
    createButton(neutral, "rgb(41, 65, 204)");

    // None
    createButton(none, null); // nullでデフォルトカラー
}

// 役職タイプ変更時処理
function changePostTypeSelectPost(postType, parentNode, onClickImage,isEnableNoSelect) {
    console.log("change select postType : " + postType);

    // 役職タイプが変わったのでimage listを変更。
    var userSelectPostListDivElement = findAllChildrenByElementId(userSelectPostListId, parentNode);
    removeAllChild(userSelectPostListDivElement); // div以下を一旦すべて破棄。

    // 画像配列を取得
    var userSelectPostListUlElement = null;
    var postImageArray = getPostImageArray(postType);
    var prevPostType = null;

	var createSelectPostImageDataArray = (postImageArray) => {
		for (var i = 0; i < postImageArray.length; ++i) {
			var postImageData = postImageArray[i];
	
			// nullは無効
			if (postImageData == null) continue;
	
			if (postImageData.post == noSelect && !isEnableNoSelect) {
				continue;
			}
	
			// innocent,impostor,neutralなど変更があったら行を変更する
			if (prevPostType != postImageData.postType) {
				prevPostType = postImageData.postType;
				userSelectPostListUlElement = userSelectPostListDivElement.appendChild(document.createElement("ul"));
			}
	
			// 役職の画像を作成
			createSelectPostImageData(userSelectPostListUlElement, postImageData, onClickImage);
		}
	};
	createSelectPostImageDataArray(postImageArray);
	createSelectPostImageDataArray(getOtherPostImageArray());
}

// 役職の画像データを作成
function createSelectPostImageData(ulElement, postImageData, onClickImage) {
    var liElement = ulElement.appendChild(document.createElement("li"));
    var imgElement = liElement.appendChild(document.createElement("img"));
    imgElement.src = postImageData.image;
    imgElement.draggable = false;
    setPostImageData(imgElement, postImageData.image);
    imgElement.onclick = (clickEvent) => {
        window.event.stopPropagation(); // 親のclickイベントに伝播しないように。　これにより、td側のonclickは呼ばれなくなる。
        onClickImage(clickEvent, postImageData);
    };
}

///////////////////////////////////////////////////////////////////////////
//
// User
//
///////////////////////////////////////////////////////////////////////////
// User選択を作成
function createSelectUser(parentNode, onClick,selectWindowElement) {

    var userSelectDivElement = findChildrenByElementId(userSelectListId,parentNode);
    
    // divが存在しないので登録
    if (userSelectDivElement == null) {
        userSelectDivElement = parentNode.appendChild(document.createElement("div"));
        userSelectDivElement.id = userSelectListId;
     
        if (parentNode.className == selectWindowClassName) {
            // select window open処理を作成
            selectWindowElement.onOpen.push(
                (element) => {
                    // 再更新する
					createSelectUser(parentNode, onClick, selectWindowElement);
                }
            );
        }
    }

    // 子要素を一旦全削除
    removeAllChild(userSelectDivElement);

    var userLength = users.length;
    if(userLength == 0) {
        var ulElement = userSelectDivElement.appendChild(document.createElement("ul"));
        var liElement = ulElement.appendChild(document.createElement("li"));
        liElement.appendChild(document.createTextNode("no User"));
        return;
    }

    // userがいるので選択肢を提示
	var setOnClick = (element,user,isImage) => {
		element.onclick = (clickEvent) => {
			onClick(user, isImage);
		};
	};
    var ulElement = null;
    for(var i = 0;i < userLength; ++i) {
        if(i % 5 == 0) {
            ulElement = userSelectDivElement.appendChild(document.createElement("ul"));
        }
        liElement = ulElement.appendChild(document.createElement("li"));
        if(users[i].characterImage != "") {
            // image
            var imgElement = liElement.appendChild(document.createElement("img"));
            imgElement.style.width = imgElement.style.height = defaultSize;
            imgElement.src = users[i].characterImage;
			setOnClick(imgElement, users[i], true);
        } else {
            // imageない
            var buttonElement = liElement.appendChild(document.createElement("button"));
            buttonElement.innerHTML = users[i].name;
            buttonElement.style.width = "auto";
			buttonElement.style.height = defaultSize;
			setOnClick(buttonElement, users[i], false);
        }
		
    }
}

// table reset
var resetUserBackgroundColor = "rgba(255,255,255,0.8)";
function setUserBackgroundColorTable(user) {
	user.tableRawElement.style.backgroundColor = resetUserBackgroundColor;
	user.tableRawElement.style.backgroundImage = "";
	if (user.backgroundColor == "" && user.backgroundColor2 == "") {
		user.tableRawElement.style.backgroundColor = resetUserBackgroundColor;
	} else if(user.backgroundColor2 == "") {
		user.tableRawElement.style.backgroundColor = user.backgroundColor;
	} else {
		user.tableRawElement.style.backgroundColor = "";

		// 背景色の回転値を設定
		var backGroundDeg = 0;

		var tableRawElementRect = user.tableRawElement.getBoundingClientRect();
		var x = tableRawElementRect.width;
		var y = tableRawElementRect.height;
		console.log(x + "," + y);
		var rad = Math.atan2(y, x);
		backGroundDeg = rad * (180 / Math.PI);

		var backgroundData = "linear-gradient(" + backGroundDeg.toString() + "deg," + user.backgroundColor + " 0%," + user.backgroundColor + " 50%," + user.backgroundColor2 + " 50%," + user.backgroundColor2 + " 100%)";
		//var backgroundData = "linear-gradient(" + backGroundDeg.toFixed(1) + "deg," + user.backgroundColor + " 0%," + user.backgroundColor + " 50%," + user.backgroundColor2 + " 50%," + user.backgroundColor2 + " 100%)";
		//backgroundData = "linear-gradient(" + backGroundDeg.toFixed(1) + "deg," + "rgb(0,0,0)" + " 0%," + "rgb(0,0,0)" + " 50%," + "rgb(255,255,255)" + " 50%," + "rgb(255,255,255)" + " 100%)";
		//backgroundData = "linear-gradient(" + "45" + "deg," + "rgb(0,0,0)" + " 0%," + "rgb(0,0,0)" + " 50%," + "rgb(255,255,255)" + " 50%," + "rgb(255,255,255)" + " 100%)";
		//backgroundData = "linear-gradient(#e66465, #9198e5)";
		console.log(backgroundData);
		user.tableRawElement.style.backgroundImage = backgroundData;
	}
}