writeDocumentPath("src/saveData/loadDataClass.js");

// document.write("<script src=\"src/saveData/loadDataClass.js\" charset=\"utf-8\"></script>");

// 読み込み要求
function requestLoadData(loadString) {
	console.log("load start :" + loadString);
	// お気に入り情報の読み込み
	loadFavoriteData(loadString);
	
}