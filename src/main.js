document.write("<script src=\"src/table/table.js\" charset=\"utf-8\"></script>");
document.write("<script src=\"src/user/user.js\" charset=\"utf-8\"></script>");
document.write("<script src=\"src/day.js\" charset=\"utf-8\"></script>");
document.write("<script src=\"src/reset.js\" charset=\"utf-8\"></script>");
document.write("<script src=\"src/version/versionUtility.js\" charset=\"utf-8\"></script>");
document.write("<script src=\"src/favorite/favorite.js\" charset=\"utf-8\"></script>");
document.write("<script src=\"src/cookie/cookie.js\" charset=\"utf-8\"></script>");

// window load event listner regist
window.addEventListener("load", onLoadedWindow);

///////////////////////////////////////////////////////////////////////////
//
// Window
//
///////////////////////////////////////////////////////////////////////////
// loaded window
function onLoadedWindow() {
    console.log("window loaded");
	console.log(document.cookie);
	loadCookie();
    resetAll();
    var versionInfo = document.getElementById("version_info");
	versionInfo.innerHTML = getVersionInfoString();
    var windowElement = document.getElementById("window");
    windowElement.onclick = (event) => {
        window.event.stopPropagation(); // 親のclickイベントに伝播しないように。
        closeOtherSelectWindow(null);
    };
}

///////////////////////////////////////////////////////////////////////////
//
// 外部関数
//
///////////////////////////////////////////////////////////////////////////
// 外部から呼ばれるreset
function callReset() {
    window.event.stopPropagation(); // 親のclickイベントに伝播しないように。
    var isReset = confirm("本当に全てをresetしていいですか？");
    if (!isReset) return; // cancelしてる
    resetAll(); // all Reset
}

// 外部からの呼ばれる日数リセット
function callResetDay() {
    window.event.stopPropagation(); // 親のclickイベントに伝播しないように。
    var isReset = confirm("本当に日数をresetしていいですか？");
    if (!isReset) return; // cancelしてる
    resetDay();         // 日数リセット
	onResetDayUser();
    resetTable();   // tableリセット
}

// 外部から呼ばれるUser登録 
function callUserRegist() {
    window.event.stopPropagation(); // 親のclickイベントに伝播しないように。
    var userName = getInputRegistUserName();
    if (userName.length == 0) {
        alert("無名でのuser登録は出来ません。");
        return;
    }
    for (var i = 0; i < users.length; ++i) {
        if (users[i].name == userName) {
            alert("user登録済みのuserでした");
            return;
        }
    }
    var user = userRegist(userName);   // user登録
    // table対応
    registUserTable(userName, user);
}
// 外部から呼ばれるUser一括登録
function callUserRegistArray() {
    window.event.stopPropagation(); // 親のclickイベントに伝播しないように。
    var userArrayName = getInputRegistUserArrayName();
    var userNames = [];
    if (userArrayName.length == 0) {
        alert("何も入力されてません");
        return;
    }
    // 名前を分割
    var userIndex = 0;
    for (var i = 0; i < userArrayName.length; ++i) {
        if (userArrayName[i] == "\n") {
            if (userNames.length == userIndex || userNames[userIndex].length == 0) { continue; }
            ++userIndex;
            continue;
        }
        if(userNames.length == userIndex){
            userNames.push("");
        }
        userNames[userIndex] += userArrayName[i];
    }

    // 登録済みのuserがいないかチェック。
    var errorUserIndexArray = [];
    var errorUserIndexAdd = (errorUserIndexArray, index) => {
        for(var i = 0; i < errorUserIndexArray.length; ++i) {
            if(errorUserIndexArray[i] == index) return;
        }
        errorUserIndexArray.push(index);
    };
    for (var i = 0; i < userNames.length; ++i) {
        for (var j = 0; j < users.length; ++j) {
            if (users[j].name == userNames[i]) {
                errorUserIndexAdd(errorUserIndexArray, i);
                continue;
            }
        }
        for (var j = i + 1; j < userNames.length; ++j) {
            if (userNames[j] == userNames[i]) {
                errorUserIndexAdd(errorUserIndexArray, j);
                continue;
            }
        }
    }

    if (errorUserIndexArray.length != 0) {
        var errorString = "";
        for (var i = 0; i < errorUserIndexArray.length; ++i) {
            if(i != 0) {
                errorString += ",";
            }
            errorString += userNames[errorUserIndexArray[i]];
        }
        errorString += "のUser登録でエラーが発生しました。\nエラーが出たため登録できませんでした\n名前がかぶったり、既に登録されてたりしませんか？";
        alert(errorString);
        return;
    }

    for (var i = 0; i < userNames.length; ++i) {
        var user = userRegist(userNames[i]);   // user登録
        // table対応
        registUserTable(userNames[i], user);
    }
}

// 外部から呼ばれる次の日処理
function callAddDay() {
    window.event.stopPropagation(); // 親のclickイベントに伝播しないように。
    addDay(); // 日数増加
    addRawNowDayElement(); // table対応
}

// 外部から呼ばれるお気に入り登録処理
function callFavoriteRegist() {
    window.event.stopPropagation(); // 親のclickイベントに伝播しないように。
    var favoriteRegistName = document.getElementById("FavoriteRegist");
	registFavorite(favoriteRegistName.value);
}

// 外部から呼ばれるお気に入り読み込み処理
function callFavoriteLoad() {
	window.event.stopPropagation(); // 親のclickイベントに伝播しないように。
	var favoriteLoadSelected = document.getElementById("FavoriteLoadSelect");
	var selectedIndex = favoriteLoadSelected.selectedIndex;
	if (selectedIndex < 0 || favoriteLoadSelected.options.length <= selectedIndex) {
		alert("読み込み出来るお気に入りが選択されていません");
		return;
	}
	loadFavorite(favoriteLoadSelected.options[selectedIndex].text);
}
// 外部から呼ばれるお気に入りリネーム処理
function callFavoriteRename() {
    window.event.stopPropagation(); // 親のclickイベントに伝播しないように。

    var favoriteRegistName = document.getElementById("FavoriteRegist");

	var favoriteLoadSelected = document.getElementById("FavoriteLoadSelect");
	var selectedIndex = favoriteLoadSelected.selectedIndex;
	if (selectedIndex < 0 || favoriteLoadSelected.options.length <= selectedIndex) {
		alert("rename出来るお気に入りが選択されていません");
		return;
	}
	var selectFavoriteName = favoriteLoadSelected.options[selectedIndex].text;

	renameFavorite(selectFavoriteName,favoriteRegistName.value);
}
// 外部から呼ばれるお気に入り削除処理
function callFavoriteDelete() {
    window.event.stopPropagation(); // 親のclickイベントに伝播しないように。

	var favoriteLoadSelected = document.getElementById("FavoriteLoadSelect");
	var selectedIndex = favoriteLoadSelected.selectedIndex;
	if (selectedIndex < 0 || favoriteLoadSelected.options.length <= selectedIndex) {
		alert("rename出来るお気に入りが選択されていません");
		return;
	}
	var selectFavoriteName = favoriteLoadSelected.options[selectedIndex].text;

	deleteFavorite(selectFavoriteName);
}