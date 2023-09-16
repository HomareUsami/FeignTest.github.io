// table

// table関連javascript
document.write("<script src=\"src/table/tableCommon.js\" charset=\"utf-8\"></script>");
document.write("<script src=\"src/table/tableHeader.js\" charset=\"utf-8\"></script>");
document.write("<script src=\"src/table/tableUser/tableUser.js\" charset=\"utf-8\"></script>");
document.write("<script src=\"src/table/tableUtility.js\" charset=\"utf-8\"></script>");
document.write("<script src=\"src/utilityElement.js\" charset=\"utf-8\"></script>");
document.write("<script src=\"src/table/tableUser/tableUserCommon.js\" charset=\"utf-8\"></script>");

// user
document.write("<script src=\"src/user/user.js\" charset=\"utf-8\"></script>");

document.write("<script src=\"src/day.js\" charset=\"utf-8\"></script>");

// table reset
function resetTable() {

	onUpdateUserFuncs = [];
	onDeleteUserFuncs = [];

    var feignTableElement = document.getElementById(tableId);

    // 全てのchildの削除
    removeAllChild(feignTableElement);

    // Header create
    createTableHeader(feignTableElement);

    // all user table create
    createAllUserTable(feignTableElement);

    // 仮 テスト追加が面倒だったので、削除する
    if (0 && users.length == 0) {
        var userName = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
        var user = userRegist(userName);   // user登録
        // table対応
        registUserTable(userName, user);
        userName = "b";
        user = userRegist(userName);   // user登録
        // table対応
        registUserTable(userName, user);
        userName = "c";
        user = userRegist(userName);   // user登録
        // table対応
        registUserTable(userName, user);
        userName = "d";
        user = userRegist(userName);   // user登録
        // table対応
        registUserTable(userName, user);
    }
}

// 日数
function addRawNowDayElement() {
    var feignTableElement = document.getElementById(tableId);
    var children = feignTableElement.children;
    for (i = 0; i < children.length; ++i) {
        var tableRawElement = children[i];
        if (isHeaderTable(tableRawElement)) {
            // headerの場合
            addRawNowDayElementHeader(tableRawElement);
        } else if (isUserTableRaw(tableRawElement)) {
            // userの場合
            addUserDayElement(tableRawElement,day,tableRawElement.user);
			setUserBackgroundColorTable(tableRawElement.user);
        }
    }
}