writeDocumentPath("src/saveData/saveDataClass.js");

// document.write("<script src=\"src/saveData/saveDataClass.js\" charset=\"utf-8\"></script>");

function createSaveData(key, value) {

	var saveData = new SaveData();
	saveData.key = key;

	// encode
	saveData.value = encodeURIComponent(value);

	// log
	console.log("createSaveData :" + key + "=>" + value /*+ "{byte:" + value.bytes() +  "}"*/);
	console.log("createSaveData impl data :" + saveData.key + "=>" + saveData.value /*+ "{byte:" + saveData.value.bytes() +  "}"*/);

	return saveData;
}
