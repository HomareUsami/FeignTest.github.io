// table共通javascript
document.write("<script src=\"src/table/tableCommon.js\" charset=\"utf-8\"></script>");
document.write("<script src=\"src/table/tableUser/tableUserCommon.js\" charset=\"utf-8\"></script>");
document.write("<script src=\"src/table/tableUtility.js\" charset=\"utf-8\"></script>");
document.write("<script src=\"src/user.js\" charset=\"utf-8\"></script>");

var userDayActionTableRawId = "userDayAction";
var userDayActionDivId = "userActionDiv";

// day action element
function addUserDayActionElement(userTableRawElement, day, user) {

	// table data
	var userDayActionElement = userTableRawElement.appendChild(document.createElement("td"));
	userDayActionElement.id = userDayActionTableRawId + day;
	userDayActionElement.style.borderRight = "thin none black"; // 右とのボーダーを削除
	userDayActionElement.onclick = (event) => {
		window.event.stopPropagation(); // 親のclickイベントに伝播しないように。
		openSelectWindow(userDayActionSelectWindowElement);
	};

	// 削除用のテーブル情報
	var allDeleteElement = userTableRawElement.appendChild(document.createElement("td"));
	allDeleteElement.style.width = "20px";
	var deleteTextElement = allDeleteElement.appendChild(document.createElement("p"));
	setDeleteTextStyle(deleteTextElement);

	deleteTextElement.onclick = (event) => {
		window.event.stopPropagation(); // 親のclickイベントに伝播しないように。
		// 全設定情報を削除
		removeAllChild(userDayActionDivElement);
		onSelectWindowUserItemElement = [];
	};

	var onOpenSelectWindowAllDeleteElement = (element) => {
		allDeleteElement.style.borderLeft = "thin dotted gray"
		allDeleteElement.onclick = (event) => {
			window.event.stopPropagation(); // 親のclickイベントに伝播しないように。
		};

		// 削除text
		deleteTextElement.style.display = "block";
	};
	var onCloseSelectWindowAllDeleteElement = (element) => {
		allDeleteElement.style.borderLeft = "thin none black"
		allDeleteElement.onclick = (event) => {
			window.event.stopPropagation(); // 親のclickイベントに伝播しないように。
			openSelectWindow(userDayActionSelectWindowElement);
		};

		// 削除text
		deleteTextElement.style.display = "none";
	};

	// 最初はcloseしてる状態から開始
	onCloseSelectWindowAllDeleteElement(userDayActionSelectWindowElement);

	// data登録用divの登録
	var userDayActionDivElement = userDayActionElement.appendChild(document.createElement("div"));
	userDayActionDivElement.id = userDayActionDivId;

	// click event
	var onSelectWindowUserItemElement = [];

	var createUserActionData = (user, userActionOneDivElement, isImage) => {

		var deleteElem = () => {
			console.log("element削除" + userActionOneDivElement);
			userActionOneDivElement.remove(); // element破棄
			console.log("配列削除開始->");
			console.log(onSelectWindowUserItemElement);
			onSelectWindowUserItemElement = onSelectWindowUserItemElement.filter(
				(item) => {
					if (item.onOpenSelectWindow != data.onOpenSelectWindow) return true;
					if (item.onCloseSelectWindow != data.onCloseSelectWindow) return true;
					if (item.user != data.user) return true;
					console.log("item machしたので削除" + item);
					return false;
				}
			);
			console.log("配列削除完了->");
			console.log(onSelectWindowUserItemElement);
		};

		// div以下にbutton or image + delete txt追加。
		// select window open時にdelete txtを対応。
		var userInputElement = createUserInputElement(userActionOneDivElement, user, isImage);
		var userDeleteElement = userActionOneDivElement.appendChild(document.createElement("p"));
		setDeleteTextStyle(userDeleteElement);
		userDeleteElement.style.display = "inline-block"; // 最初は表示
		userDeleteElement.onclick = (element) => {
			window.event.stopPropagation(); // 親のclickイベントに伝播しないように。
			deleteElem();
		};

		// data登録
		var data = {
			user: user,
			onOpenSelectWindow: (element) => {
				userDeleteElement.style.display = "inline-block";
			},
			onCloseSelectWindow: (element) => {
				userDeleteElement.style.display = "none";
			},
			updateUser: () => {
				updateUserInputElement(userInputElement, user);
			},
			deleteUser: () => {
				deleteElem(); // 該当要素削除
			},
		};
		onSelectWindowUserItemElement.push(data);
	};

	var onClickSelectUser = (user, isImage) => {
		window.event.stopPropagation(); // 親のclickイベントに伝播しないように。

		// divを追加
		var userActionOneDivElement = userDayActionDivElement.appendChild(document.createElement("div"));
		userActionOneDivElement.style.display = "inline-block";

		// data追加
		createUserActionData(user, userActionOneDivElement, isImage);
	};

	// selected window update
	// select window
	var userDayActionSelectWindowElement = appendChildSelectWindow(userDayActionElement);
	userDayActionSelectWindowElement.onOpen.push((element) => {
		console.log("action day open select window");
		onOpenSelectWindowAllDeleteElement(element);
		for (var i = 0; i < onSelectWindowUserItemElement.length; ++i) {
			onSelectWindowUserItemElement[i].onOpenSelectWindow(element);
		}
	});
	userDayActionSelectWindowElement.onClose.push((element) => {
		console.log("action day close select window");
		onCloseSelectWindowAllDeleteElement(element);
		for (var i = 0; i < onSelectWindowUserItemElement.length; ++i) {
			onSelectWindowUserItemElement[i].onCloseSelectWindow(element);
		}
	});

	// user select create
	createSelectUser(userDayActionSelectWindowElement, onClickSelectUser, userDayActionSelectWindowElement);


	// todo : dayを初期化、user削除時にこの関数をローカル変数として削除するようなコードを記載する必要がある。

	// user update登録
	onUpdateUserFuncs.push((user) => {
		var updateUserElement = onSelectWindowUserItemElement.filter((item)=>{
			return item.user == user;
		});
		console.log(updateUserElement);
		for(var i = 0; i < updateUserElement.length; ++i) {
			updateUserElement[i].updateUser();
		}
	});

	// user delete登録
	onDeleteUserFuncs.push((user) => {
		var deleteUserElement = onSelectWindowUserItemElement.filter((item)=>{
			return item.user == user;
		});
		console.log(deleteUserElement);
		for(var i = 0; i < deleteUserElement.length; ++i) {
			deleteUserElement[i].deleteUser();
		}
	});
}