writeDocumentPath("src/favorite/favorite.js");
writeDocumentPath("src/saveData/saveData.js");
writeDocumentPath("src/saveData/loadData.js");
// document.write("<script src=\"src/favorite/favorite.js\" charset=\"utf-8\"></script>");
// document.write("<script src=\"src/saveData/saveData.js\" charset=\"utf-8\"></script>");
// document.write("<script src=\"src/saveData/loadData.js\" charset=\"utf-8\"></script>");

function saveCokkie() {
	if(navigator.cookieEnabled) {
		console.log("cookie enable");
	} else {
		console.log("cookie no enable");
	}
	console.log("prev save cookie:\n" + document.cookie);

	var saveDatas = requestSaveData();
	if (!saveDatas.result) {
		console.log("cookieの保存失敗");
		return;
	}

	// cookieに保存
	for (var i = 0; i < saveDatas.datas.length; ++i) {
		var convertString = saveDatas.datas[i].toConvertString();
		if(!convertString.result) continue;
		document.cookie = convertString.value + " max-age=31536000;"; // 一旦1年計算
	}
	onSavedCookieFavoriteData();
	
	console.log("saved cookie:\n" + document.cookie);

	console.log("save data:\n" + saveDatas.toConvertString().value);
}
if(onSaveFavoriteCookie != null && onSaveFavoriteCookie == undefined) {
	alert("onSaveFavoriteCookie undefined");
} else {
	onSaveFavoriteCookie = saveCokkie;
}

function loadCookie() {
	console.log("prev load cookie:\n" + document.cookie);
	requestLoadData(document.cookie);
	console.log("loaded cookie:\n" + document.cookie);
}