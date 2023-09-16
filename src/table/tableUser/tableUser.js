// table共通javascript
writeDocumentPath("src/table/tableCommon.js");
// document.write("<script src=\"src/table/tableCommon.js\" charset=\"utf-8\"></script>");
// user javascript
writeDocumentPath("src/user/user.js");
// document.write("<script src=\"src/user/user.js\" charset=\"utf-8\"></script>");
// character javascript
writeDocumentPath("src/character.js");
// document.write("<script src=\"src/character.js\" charset=\"utf-8\"></script>");
// post javascript
writeDocumentPath("src/post.js");
// document.write("<script src=\"src/post.js\" charset=\"utf-8\"></script>");
// tableUser
writeDocumentPath("src/table/tableUser/tableUserColor.js");
writeDocumentPath("src/table/tableUser/tableUserCommon.js");
writeDocumentPath("src/table/tableUser/tableUserPost.js");
writeDocumentPath("src/table/tableUser/tableUserRealFool.js");
writeDocumentPath("src/table/tableUser/tableUserDay.js");
// utility
writeDocumentPath("src/utilityElement.js");
// document.write("<script src=\"src/table/tableUser/tableUserColor.js\" charset=\"utf-8\"></script>");
// document.write("<script src=\"src/table/tableUser/tableUserCommon.js\" charset=\"utf-8\"></script>");
// document.write("<script src=\"src/table/tableUser/tableUserPost.js\" charset=\"utf-8\"></script>");
// document.write("<script src=\"src/table/tableUser/tableUserRealFool.js\" charset=\"utf-8\"></script>");
// document.write("<script src=\"src/table/tableUser/tableUserDay.js\" charset=\"utf-8\"></script>");
// document.write("<script src=\"src/utilityElement.js\" charset=\"utf-8\"></script>");

// drag user table
var dragUserBorderStyle = "2px solid blue"; // border
var dragStartUserElement; // dragStart時element
var dragOverUserElement; // over時element
var isDragUserUp = true; // ドラッグ解除時に上側にinsertするかどうか

// user delete
function deleteUserTable(clickEvent, user) {
    window.event.stopPropagation(); // 親のclickイベントに伝播しないように。
    
    // userName取得
    var tableRawNode = clickEvent.currentTarget.parentNode.parentNode;
    var userName = user.name;
    var isDelete = confirm("本当に[" + userName + "]を削除していいですか？");
    if (!isDelete) return; // cancelしてる

    // user削除
    deleteUser(userName);

    // 行削除
    tableRawNode.parentNode.deleteRow(tableRawNode.sectionRowIndex);

    // todo : table情報再構築 必要であれば
	
}

// user table backgroundColor set add 2023/09/09 update
function setUserBackgroundColor(user, color) {
	if(user.backgroundColor == "" || (user.backgroundColor != "" && user.backgroundColor2 != "")) {
		user.backgroundColor = color;
		user.backgroundColor2 = "";
		setUserBackgroundColorTable(user);
	} else if (user.backgroundColor != "" && user.backgroundColor2 != "") {
		user.backgroundColor = color;
		user.backgroundColor2 = "";
		setUserBackgroundColorTable(user);
	} else {
		user.backgroundColor2 = color;
		setUserBackgroundColorTable(user);
	}
}

// user background color set button create add 2023/09/09 update
function createUserBackgroundColorButton(parentNode, user,onClick) {

	var buttonSetSyncUserDataDisplay = (user, buttonElement, color, buttonName) => {
		buttonElement.innerHTML = buttonName;
		if (buttonName == resetButtonName) {
			if (user.backgroundColor == "") {
				buttonElement.parentNode.style.display = "none";
				buttonElement.style.display = "none";
			} else {
				buttonElement.parentNode.style.display = "";
				buttonElement.style.display = "block";
			}
		} else if (user.backgroundColor == color || user.backgroundColor2 == color ) {
			//buttonElement.parentNode.style.display = "none";
			//buttonElement.style.display = "none";
			buttonElement.parentNode.style.display = "";
			buttonElement.style.display = "block";
			buttonElement.style.width = "80px";
			buttonElement.innerHTML = buttonName + "(selected)";
		} else {
			buttonElement.parentNode.style.display = "";
			buttonElement.style.display = "block";
			buttonElement.style.width = "40px";
		}
	};

	var createUserBackgroundColorOneButton = (parentNode, user, color, buttonName, onClick, onClick2, resetFunc, resetColor) => {
		var liElement = parentNode.appendChild(document.createElement("li"));
		//liElement.style.padding = "0px";
		//liElement.style.border = "0px";
		var buttonElement = liElement.appendChild(document.createElement("button"));
		buttonElement.innerHTML = buttonName;
		//buttonElement.style.padding = "10px";
		//buttonElement.style.border = "2px";
		var widthSize = 40;
		var heightSize = 20;
		if(buttonName == resetButtonName) {
			widthSize = 80;
		}
		buttonElement.style.width = widthSize.toString() + "px";
		buttonElement.style.height = heightSize + "px";
		buttonElement.style.backgroundColor = color;
		buttonSetSyncUserDataDisplay(user, buttonElement, color, buttonName);
		buttonElement.onclick = (clickEvent) => {
            window.event.stopPropagation(); // 親のclickイベントに伝播しないように。
			if(buttonName == resetButtonName) {
				resetFunc(user, resetColor);
			} else {
				setUserBackgroundColor(user, color);
			}
			onClick();
			onClick2();
		};
		return buttonElement;
	};

	// button全体のul作成
	var ulElement = parentNode.appendChild(document.createElement("ul"));
	ulElement.style.padding = "2px";
	ulElement.style.border = "0px";

	// 便利なカラーコード rgba変換ツールサイト https://arts-factory.net/rgbatool/

	// ボタンを押した際に色を設定した上で今と同じ色の場合は非表示にする。
	var onClickedButton = () => {
		buttonSetSyncUserDataDisplay(user, whiteButton, whiteButtonColor, whiteButtonName);
		buttonSetSyncUserDataDisplay(user, greenButton, greenButtonColor, greenButtonName);
		buttonSetSyncUserDataDisplay(user, yellowButton, yellowButtonColor, yellowButtonName);
		buttonSetSyncUserDataDisplay(user, redButton, redButtonColor, redButtonName);
		buttonSetSyncUserDataDisplay(user, blueButton, blueButtonColor, blueButtonName);
		buttonSetSyncUserDataDisplay(user, grayButton, grayButtonColor, grayButtonName);
		buttonSetSyncUserDataDisplay(user, resetButton, resetButtonColor, resetButtonName);
	};

	var resetFunc = (user) => {
		user.backgroundColor = "";
		user.backgroundColor2 = "";
		setUserBackgroundColorTable(user);
	};

	// ulからボタン単品情報を作成
	var whiteButtonColor = resetUserBackgroundColor;
	var whiteButtonName = "";
	var whiteButton = createUserBackgroundColorOneButton(ulElement, user, whiteButtonColor, whiteButtonName, onClick, onClickedButton, resetFunc, whiteButtonColor); // デフォルト 白
	var greenButtonColor = "rgba(152,251,152,0.8)";
	var greenButtonName = "";
	var greenButton = createUserBackgroundColorOneButton(ulElement, user, greenButtonColor, greenButtonName, onClick, onClickedButton, resetFunc, whiteButtonColor); // 緑
	var yellowButtonColor = "rgba(255,250,205,0.8)";
	var yellowButtonName = "";
	var yellowButton = createUserBackgroundColorOneButton(ulElement, user, yellowButtonColor, yellowButtonName, onClick, onClickedButton, resetFunc, whiteButtonColor); // 黄色
	var redButtonColor = "rgba(250,128,114,0.55)";
	var redButtonName = "";
	var redButton = createUserBackgroundColorOneButton(ulElement, user, redButtonColor, redButtonName, onClick, onClickedButton, resetFunc, whiteButtonColor); // 赤
	var blueButtonColor = "rgba(135,206,235,0.8)";
	var blueButtonName = "";
	var blueButton = createUserBackgroundColorOneButton(ulElement, user, blueButtonColor, blueButtonName, onClick, onClickedButton, resetFunc, whiteButtonColor); // 青
	var grayButtonColor = "rgba(211,211,211,0.8)";
	var grayButtonName = "";
	var grayButton = createUserBackgroundColorOneButton(ulElement, user, grayButtonColor, grayButtonName, onClick, onClickedButton, resetFunc, whiteButtonColor); // 灰色

	// resetButton
	var resetButtonColor = whiteButton;
	var resetButtonName = "resetButton";
	var resetButton = createUserBackgroundColorOneButton(ulElement, user, resetButtonColor, resetButtonName, onClick, onClickedButton, resetFunc, whiteButtonColor); // reset
	
	// 最初は白設定
	setUserBackgroundColorTable(user);
	// 以下だと日数resetするたびに初期化される
	//resetFunc(user);
}

// user table登録
function registUserTable(userName, user) {
    console.log("user table 登録");

    // table取得
    var feignTableElement = document.getElementById(tableId);
    var userTableRawElement = feignTableElement.appendChild(document.createElement("tr"));
    user.tableRawElement = userTableRawElement; // userとしてtableElemを覚えておく。
	userTableRawElement.user = user;
	feignTableElement.style.whiteSpace = "nowrap";

    // drag
    registDragFunctionUserTableRaw(userTableRawElement);

    // delete
    var userDeleteElement = userTableRawElement.appendChild(document.createElement("td"));
    var deleteButtonElement = userDeleteElement.appendChild(document.createElement("button"));
    deleteButtonElement.appendChild(document.createTextNode("-"));
    deleteButtonElement.onclick = (clickEvent) => {
		deleteUserTable(clickEvent, user);
	}; // click時処理

    // color
    createUserColorTableData(userTableRawElement, user);

    // name
    var userNameElement = userTableRawElement.appendChild(document.createElement("td"));
    userNameElement.id = userNameTableRawId;
	userNameElement.user = user;
	var userNameDataElement = userNameElement.appendChild(document.createElement("p"));
	userNameDataElement.user = user;
	userNameDataElement.innerHTML = userName;
	userNameDataElement.style.display = "block";
	userNameDataElement.style.margin = "0px";
	userNameDataElement.style.border = "0px";
	userNameDataElement.style.padding = "0px";
	userNameDataElement.onclick = (clickEvent) => {
		window.event.stopPropagation(); // 親のclickイベントに伝播しないように。
		userNameDataElement.style.display = "none";
		userNameArea.style.display = "block";
		userNameArea.focus(); // 強制的にフォーカスする

		// user background color select window open
		if(userBackgroundColorSelectWindow.style.display != "block") {
			openSelectWindow(userBackgroundColorSelectWindow);
		}
	};

    var userNameArea = userNameElement.appendChild(document.createElement("input"));
	userNameArea.type = "text";
	userNameArea.placeholder = "user名";
	userNameArea.user = user;
	userNameArea.value = userName;
	userNameArea.style.display = "none"; // 最初非表示
	userNameArea.style.margin = "0px";
	userNameArea.style.border = "0px";
	userNameArea.style.padding = "0px";

	// 途中でも名前を変更できるように
	userNameArea.onchange = (changeEvent) => {
		var changeName = changeEvent.currentTarget.value;

		// user名がかぶってないかチェック。
		var isError = changeName == "" ? true : false;
		var isNoName = isError;
		if(!isError) {
			for(var i = 0;  i < users.length; ++i) {
				var nowUser = users[i];
				if(nowUser == user) continue;
				if(nowUser.name == changeName) {
					isError = true;
					break;
				}
			}
		}

		if(isError) {
			alert(isNoName ? "user名を空には出来ません" : "既に[" + changeName + "]のユーザーは存在します");
			// 元の名前に戻す
			changeEvent.currentTarget.value = user.name;
		} else {
			userNameDataElement.innerHTML = changeName;
			changeEvent.currentTarget.value = changeName;
			user.name = changeName;
			updateUser(user);
		}

		userNameDataElement.style.display = "block";
		userNameArea.style.display = "none";
		closeSelectWindow(userBackgroundColorSelectWindow);
	};
	userNameArea.onclick = (clickEvent) => {
		window.event.stopPropagation(); // 親のclickイベントに伝播しないように。 選択ウィンドウが閉じるように実装
	};
	// フォーカスが外れた時処理
	userNameArea.onblur = (blurEvent) => {
		userNameDataElement.style.display = "block";
		userNameArea.style.display = "none";
		// selectWindowを閉じるとボタンを押しても、反応しないため
		//closeSelectWindow(userBackgroundColorSelectWindow);
	};
	
	// add user backgroundColor 2023/09/09
	var userBackgroundColorSelectWindow = appendChildSelectWindow(userNameElement);
	var onClickBackgroundColorButton = () => {
		userNameDataElement.style.display = "block";
		userNameArea.style.display = "none";
		closeSelectWindow(userBackgroundColorSelectWindow);
	};
	createUserBackgroundColorButton(userBackgroundColorSelectWindow, user,onClickBackgroundColorButton);
	// todo : user background color button create


    // post
    createUserPostTableData(userTableRawElement, user);
    createUserRealPostTableData(userTableRawElement, user);

    // real fool
    //createUserRealFoolTableData(userTableRawElement, user);

    // day
    for (var i = 0; i < day; ++i) {
        addUserDayElement(userTableRawElement, i + 1, user);
    }

	setUserBackgroundColorTable(user);
}

// 初期化時に使用する全userのtable再構築
function createAllUserTable(feignTableElement) {
    for (var i = 0; i < users.length; ++i) {
        registUserTable(users[i].name, users[i]);
    }
}

// user tableのdrag関連
function registDragFunctionUserTableRaw(userTableRawElement) {
    // 参考 : https://blog.ver001.com/javascript-dragdrop-sort/#toc7
    userTableRawElement.draggable = true; // drag出来るように
    userTableRawElement.ondragstart = onDragStartUserTable; // drag start
    userTableRawElement.ondragover = onDragOverUserTable; // drag over
    userTableRawElement.ondragleave = onDragLeaveUserTable; // leave
    //userTableRawElement.ondrop = onDropUserTable; // drop trでは動かないっぽい？コールバックがそもそもされない。
    userTableRawElement.ondragend = onDragEndUserTable; // drag end
}
// drag開始
function onDragStartUserTable(dragStartEvent) {
    console.log("drag start user table");
    dragStartUserElement = dragStartEvent.srcElement;
}

// drag終了時処理
function onDragEndUserTable(dragEndEvent) {
    console.log("drag end user table");

    // ここで入れ替え処理を行う
    if (dragStartUserElement == null) return;
    if (dragOverUserElement == null) return;

    var dragStartUserName = getUserNameByTableRaw(dragStartUserElement);
    var dragOverUserName = getUserNameByTableRaw(dragOverUserElement);

    console.log("drop change user table : [" + dragStartUserName + "] -> [" + dragOverUserName + "] " + (isDragUserUp ? "↑" : "↓"));

    // tableにinsertする
    if (isDragUserUp) {
        // 上にinsert
        dragStartUserElement.parentNode.insertBefore(dragStartUserElement, dragOverUserElement);
    } else {
        // 下にinsert
        // 次のtrを取得
        var nextNodeResult = getNextChildNodeResult(dragOverUserElement);
        if (nextNodeResult.result) {
            dragStartUserElement.parentNode.insertBefore(dragStartUserElement, nextNodeResult.nextNode);
        }
    }

    // 実user側のデータの順序を変更する
    changeOrderUser(dragStartUserName, dragOverUserName, isDragUserUp);

    // 初期化
    dragStartUserElement = null;
    dragOverUserElement = null;
}

// hover状態になったとき
function onDragOverUserTable(dragOverEvent) {
    console.log("drag over user table");
    var currentTarget = dragOverEvent.currentTarget;
    var rect = currentTarget.getBoundingClientRect();
    if ((window.event.clientY - rect.top) < (currentTarget.clientHeight / 2)) {
        // マウスカーソルの位置が要素の半分より上
        currentTarget.style.borderTop = dragUserBorderStyle;
        currentTarget.style.borderBottom = "";


        isDragUserUp = true;
    } else {
        // マウスカーソルの位置が要素の半分より下
        currentTarget.style.borderTop = "";
        currentTarget.style.borderBottom = dragUserBorderStyle;

        isDragUserUp = false;
    }

    dragOverUserElement = currentTarget;
}

// drag中にhover状態から解除されたとき
function onDragLeaveUserTable(dragLeaveEvent) {
    console.log("drag leave user table");
    var currentTarget = dragLeaveEvent.currentTarget;
    currentTarget.style.borderTop = "";
    currentTarget.style.borderBottom = "";
}