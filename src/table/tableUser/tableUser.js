// table共通javascript
document.write("<script src=\"src/table/tableCommon.js\" charset=\"utf-8\"></script>");
// user javascript
document.write("<script src=\"src/user.js\" charset=\"utf-8\"></script>");
// character javascript
document.write("<script src=\"src/character.js\" charset=\"utf-8\"></script>");
// post javascript
document.write("<script src=\"src/post.js\" charset=\"utf-8\"></script>");

document.write("<script src=\"src/table/tableUser/tableUserColor.js\" charset=\"utf-8\"></script>");
document.write("<script src=\"src/table/tableUser/tableUserCommon.js\" charset=\"utf-8\"></script>");
document.write("<script src=\"src/table/tableUser/tableUserPost.js\" charset=\"utf-8\"></script>");
document.write("<script src=\"src/table/tableUser/tableUserRealFool.js\" charset=\"utf-8\"></script>");
document.write("<script src=\"src/table/tableUser/tableUserDay.js\" charset=\"utf-8\"></script>");

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


// user table登録
function registUserTable(userName, user) {
    console.log("user table 登録");

    // table取得
    var feignTableElement = document.getElementById(tableId);
    var userTableRawElement = feignTableElement.appendChild(document.createElement("tr"));
    user.tableRawElement = userTableRawElement; // userとしてtableElemを覚えておく。
	userTableRawElement.user = user;

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
	userNameDataElement.onclick = (clickEvent) => {
		window.event.stopPropagation(); // 親のclickイベントに伝播しないように。
		userNameDataElement.style.display = "none";
		userNameAra.style.display = "block";
		userNameAra.focus(); // 強制的にフォーカスする
	};

    var userNameAra = userNameElement.appendChild(document.createElement("input"));
	userNameAra.type = "text";
	userNameAra.placeholder = "user名";
	userNameAra.user = user;
	userNameAra.value = userName;
	userNameAra.style.display = "none"; // 最初非表示

	// 途中でも名前を変更できるように
	userNameAra.onchange = (changeEvent) => {
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
		userNameAra.style.display = "none";
	};
	
    // post
    createUserPostTableData(userTableRawElement, user);

    // real fool
    createUserRealFoolTableData(userTableRawElement, user);

    // day
    for (var i = 0; i < day; ++i) {
        addUserDayElement(userTableRawElement, i + 1, user);
    }
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