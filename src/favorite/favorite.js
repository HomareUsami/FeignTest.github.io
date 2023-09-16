document.write("<script src=\"src/user/user.js\" charset=\"utf-8\"></script>");
document.write("<script src=\"src/table/tableUser/tableUser.js\" charset=\"utf-8\"></script>");
document.write("<script src=\"src/utility.js\" charset=\"utf-8\"></script>");
document.write("<script src=\"src/reset.js\" charset=\"utf-8\"></script>");
document.write("<script src=\"src/utilityElement.js\" charset=\"utf-8\"></script>");
document.write("<script src=\"src/saveData/saveDataUtility.js\" charset=\"utf-8\"></script>");
document.write("<script src=\"src/saveData/loadDataUtility.js\" charset=\"utf-8\"></script>");
document.write("<script src=\"src/cookie/cookieUtility.js\" charset=\"utf-8\"></script>");
//document.write("<script src=\"src/cookie/cookie.js\" charset=\"utf-8\"></script>");

var favorites = [];
var lastLoadFavoriteName = "";

// 外部から設定されることがあるので、何度もinstance化しないように対応
var onSaveFavoriteCookie = onSaveFavoriteCookie == undefined ? null : onSaveFavoriteCookie;

// お気に入りのcookieに保存する
function saveFavoriteCookie() {
	if(onSaveFavoriteCookie != null) {
		onSaveFavoriteCookie();
	} else {
		console.log("cookie save error");
	}
}

// お気に入り情報の保存
function saveFavoriteData(saveDatas) {
	for(var i = 0; i < favorites.length; ++i) {
		var saveData = createSaveData("Favorite" + i.toString(),favorites[i].name + "\n" + favorites[i].userNames);
		saveDatas.datas.push(saveData);
	}
	return true;
}

// cookieへの書き込み前対応
function onSavedCookieFavoriteData() {
	// todo : 一度cookieに登録済みのFavoriteDataを破棄登録する max-ageで-1や0を指定すれば破棄になるはず
	// memo :
	// 存在チェック後、即時削除指定を行う。
	// cookieUtility.jsにて定義予定
	// checkするのは最大お気に入り情報以降の数値でチェックする
	// "Favorite" + favorites.length.toString()以降
	var i = favorites.length;
	while(true) {
		var favoriteKey = "Favorite" + i.toString();
		var isExistKeyResult = isExistKeyLoadData(document.cookie, favoriteKey);
		if(!isExistKeyResult.isEixst) {
			break;
		}
		// cookie削除
		removeCookie(favoriteKey);
	}
}

// お気に入り情報の読み込み
function loadFavoriteData(loadStr) {
	var i = 0;
	while(true) {
		var favoriteKey = "Favorite" + i.toString();
		
		// keyがあるかどうかを判定
		// 無ければループ終了
		var loadData = loadDataByLoadString(loadStr, favoriteKey);

		var isExistKey = loadData.result;
		if(!isExistKey) break;

		userNameDatas = loadData.value.split("\n");
		// todo :
		// 行分割 1行目が名前
		// 2行目がuserNameData
		var favoriteName = "";
		var registFavoriteUserNames = "";

		for(var j = 0; j < userNameDatas.length; ++j) {
			if (j == 0) {
				favoriteName = userNameDatas[j];
			} else {
				if(j != 1) {
					registFavoriteUserNames += "\n";
				}
				registFavoriteUserNames += userNameDatas[j];
			}
		}
		console.log("load favorite value " + i.toString() + " :" + loadData.value);

		favorite = {};
		favorite.name = favoriteName;
		favorite.userNames = registFavoriteUserNames;
		favorites.push(favorite);

		++i;
	}

	// combo boxにデータ反映
	setupFavoriteLoadSelectCombo();

	return true;
}

// お気に入りとして登録できる名前かどうかを確認
function canRegistFavoriteName(favoriteName) {
	if(favoriteName.length == 0) {
		alert("お気に入り名が空です");
		return false;
	}	
	
	return true;
}

// お気に入り登録
function registFavorite(favoriteName) {
	if (!canRegistFavoriteName(favoriteName)) {
		// 登録できない名前だった
		return;
	}

	if (users.length == 0) {
		alert("お気に入り登録するuserが存在しませんでした");
		return;
	}

	// cookieのために保存できる最大数を固定
	if (favorites.length >= 10) {
		alert("お気に入り情報に登録できる最大数に到達しました");
		return;
	}

	// 既に登録済みかどうかをチェック
	// お気に入りに既に登録済みな場合はお気に入り情報を上書きしてもいいかどうかを確認する
	var favorite = null;
	for (var i = 0; i < favorites.length; ++i) {
		if(favorites[i].name == favoriteName) {
			var isOverride = confirm("同じ名前のお気に入りが存在しますが上書きしてもよろしいですか？");
			if(isOverride) {
				favorite = favorites[i];
				break;
			} else {
				alert("お気に入り登録しませんでした");
				return;
			}
		}
	}
	
	// 今のusers情報をお気に入りとして登録する
	var registFavoriteUserNames = "";
	for (var i = 0; i < users.length; ++i) {
		registFavoriteUserNames += users[i].name;
		if((i + 1) != users.length) {
			registFavoriteUserNames += "\n";			
		}
	}
	console.log("お気に入り登録のuser一覧\n" + registFavoriteUserNames);

	
	// お気に入り登録処理
	if(favorite == null) {
		favorite = {};
		favorite.name = favoriteName;
		favorite.userNames = registFavoriteUserNames;
		favorites.push(favorite);
	} else {
		favorite.userNames = registFavoriteUserNames;
	}

	lastLoadFavoriteName = favoriteName;

	// combo boxにデータ反映
	setupFavoriteLoadSelectCombo();

	// cookie情報に保存
	saveFavoriteCookie();
}

// お気に入り情報の読み込み
function loadFavorite(favoriteName) {
	var favorite = null;
	for (var i = 0; i < favorites.length; ++i) {
		if(favorites[i].name == favoriteName) {
			favorite = favorites[i];
			break;
		}
	}
	if(favorite == null) {
		alert(favoriteName + "のloadに失敗しました");
		return;
	}

	// 一度リセットをかける
	resetAll();

	// user情報を登録
	var userNames = favorite.userNames.split("\n");
	for (var i = 0; i < userNames.length; ++i) {
		if(userNames[i].length == 0) {
			continue;
		}
		var user = userRegist(userNames[i]);
		registUserTable(userNames[i], user);
	}
}

// お気に入り情報の読み込み
function renameFavorite(preFavoriteName,afterFavoriteName) {

	if(preFavoriteName == afterFavoriteName) {
		alert("同じ名前にrename出来ません");
		return;
	}

	// 登録できる名前かをチェック
	if (!canRegistFavoriteName(afterFavoriteName)) return;


	// 同じ名前のお気に入り情報が存在しないかをチェック
	for (var i = 0; i < favorites.length; ++i) {
		if(favorites[i].name == afterFavoriteName) {
			alert("既に同じ名前のお気に入り情報が存在します");
			return;
		}
	}

	// 確認
	var isRename = confirm("[" + afterFavoriteName + "]で[" + preFavoriteName + "]をrenameしてもよろしいですか？");
	if(!isRename) return;
	
	// 置き換え
	for (var i = 0; i < favorites.length; ++i) {
		if(favorites[i].name == preFavoriteName) {
			favorites[i].name = afterFavoriteName;
			break;
		}
	}

	// combo boxにデータ反映
	setupFavoriteLoadSelectCombo();

	// cookie情報に保存
	saveFavoriteCookie();
}

// お気に入り機能の削除
function deleteFavorite(deleteFavoriteName) {
	for (var i = favorites.length - 1; i >= 0 ; --i) {
		if(favorites[i].name == deleteFavoriteName) {
			favorites.splice(i, 1);
			break;
		}
	}

	// combo boxにデータ反映
	setupFavoriteLoadSelectCombo();

	// cookie情報に保存
	saveFavoriteCookie();
}

// loadSelectComboを設定する
function setupFavoriteLoadSelectCombo() {
	var isSelect = false;
    var loadSelectCombo = document.getElementById("FavoriteLoadSelect");
	removeAllChild(loadSelectCombo);
	for(var i = 0; i < favorites.length;++i) {
		var optionElement = loadSelectCombo.appendChild(document.createElement("option"));
		optionElement.innerHTML = favorites[i].name;
		if(favorites[i].name == lastLoadFavoriteName && !isSelect) {
			optionElement.selected = true;
			isSelect = true;
		} else {
			optionElement.selected = false;
		}
	}
}