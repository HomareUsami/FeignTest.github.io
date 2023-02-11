document.write("<script src=\"src/table/table.js\" charset=\"utf-8\"></script>");
document.write("<script src=\"src/user.js\" charset=\"utf-8\"></script>");
document.write("<script src=\"src/day.js\" charset=\"utf-8\"></script>");

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
    resetAll();
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

///////////////////////////////////////////////////////////////////////////
//
// reset
//
///////////////////////////////////////////////////////////////////////////
// all reset
function resetAll() {
    window.event.stopPropagation(); // 親のclickイベントに伝播しないように。
    console.log("all reset");

    // 日数を初期化
    resetDay();

    // user reset
    resetUser();

    // reset table
    resetTable();
}