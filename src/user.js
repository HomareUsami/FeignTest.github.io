
// user struct array
// name
// color
// user list index
// table element
// character image : usedCharacter setting
var users = [];

// user reset
function resetUser() {
	console.log("user reset");
	users = [];
	onUpdateUserFuncs = [];
	onDeleteUserFuncs = [];
}

// user regist
function userRegist(userName) {
	console.log("user登録 : " + userName);

	var user = {};
	var userIndex = users.push(user) - 1;
	user = users[userIndex];
	// common
	user.name = userName;
	user.index = userIndex; // index登録
	// image
	user.characterImage = "";
	// 役職
	user.post = "";
	user.postType = "";

	return user;
}

var onDeleteUserFuncs = [];
// user delete
function deleteUser(userName) {
	var isFindUserName = false;
	var deleteUser = null;
	// user削除
	// 削除するuserから前詰めしていく
	for (var i = 0; i < users.length; ++i) {
		if (!isFindUserName && users[i].name == userName) {
			isFindUserName = true;
			deleteUser = users[i];
		}
		if (isFindUserName && ((i + 1) < users.length)) {
			users[i] = users[i + 1];
			--users[i].index; // indexを変更。
		}
	}

	// array pop
	if (isFindUserName) {
		users.pop();
		onDeleteUser(deleteUser);
		return true;
	}

	return false;
}

function onDeleteUser(user) {
	console.log("user削除 : " + user.name);
	for (var i = 0; i < onDeleteUserFuncs.length; ++i) {
		onDeleteUserFuncs[i](user);
	}
}

// user取得
function getUser(userName) {
	for (var i = 0; i < users.length; ++i) {
		if (users[i].name == userName) {
			return users[i];
		}
	}
	return null;
}

// 順番変更
function changeOrderUser(insertFromUserName, insertToUserName, isBefore) {
	var logStr = "change user order : ";
	for (var i = 0; i < users.length; ++i) {
		if (i != 0) {
			logStr += ",";
		}
		logStr += users[i].name;
	}
	logStr += " -> ";
	changeOrderUserImpl(insertFromUserName, insertToUserName, isBefore);
	for (var i = 0; i < users.length; ++i) {
		if (i != 0) {
			logStr += ",";
		}
		logStr += users[i].name;
	}
	console.log(logStr);
}

// userの入れ替え
function changeOrderUserImpl(insertFromUserName, insertToUserName, isBefore) {
	// abc
	// aの順序を変える場合
	// abcd bacd bcad bcda

	// abcd
	// abcd -> abad -> acad -> bcad
	// abcd -> aacd -> bacd
	// abcd -> abcd
	// abcd -> aacd -> bacd
	// abcd -> abad -> acad -> bcad
	// abcd -> abca -> abda -> acda -> bcda

	var fromUser = getUser(insertFromUserName);
	var toUser = getUser(insertToUserName);

	var insertIndex = isBefore ? toUser.index : toUser.index + 1;
	var fromIndex = fromUser.index;

	// 入れ替え元の要素削除
	users.splice(fromIndex, 1);

	// index追加
	insertIndex = insertIndex > fromIndex ? insertIndex - 1 : insertIndex;

	// 入れ替え元の要素追加
	users.splice(insertIndex, 0, fromUser);

	// index置き換え
	for (var i = 0; i < users.length; ++i) {
		users[i].index = i;
	}
}

var onUpdateUserFuncs = [];
function updateUser(user) {
	for (var i = 0; i < onUpdateUserFuncs.length; ++i) {
		onUpdateUserFuncs[i](user);
	}
}