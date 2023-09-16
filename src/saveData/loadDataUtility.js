writeDocumentPath("src/saveData/loadDataClass.js");
// document.write("<script src=\"src/saveData/loadDataClass.js\" charset=\"utf-8\"></script>");

// load dataにkeyが存在するかどうかをチェック
function isExistKeyLoadData(loadString, key) {
	var result = {
		value : "",
		isEixst : false,
	};

	// todo : 存在チェック
	var isExist = false;
	var value = "";

	loadStrings = loadString.split(/;\s*/);	
	for (var i = 0; i < loadStrings.length; ++i) {
		loadStringValue = loadStrings[i].split("=");
		if (loadStringValue.length != 2) {
			console.log("error loadStringValue");
			continue;
		}
		var loadKey = loadStringValue[0];
		var loadValue = loadStringValue[1];
		if(loadKey == key) {
			value = loadValue;
			isExist = true;
			break;
		}
	}

	// 結果入れ込み
	result.value = value;
	result.isEixst = isExist;
	return result;
}

// loadStringは全ての保存情報が入ったもの
function loadDataByLoadString(loadString, key) {
	var loadData = new LoadData();
	
	// key検索
	var existResult = isExistKeyLoadData(loadString, key);
	if (!existResult.isEixst) {
		console.log("loadDataByLoadString : no key => " + key);
		return loadData;
	}

	// key
	loadData.key = key;
	// デコード
	loadData.value = decodeURIComponent(existResult.value);
	loadData.result = true;

	console.log("loadDataByLoadString :" + key + "=>" + loadData.value);

	return loadData;
}