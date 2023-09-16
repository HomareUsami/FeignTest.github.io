class SaveDataConvertString {
	result = false;
	value = "";
};

class SaveData {
	key = "";
	value = "";

	toConvertString() {
		var convertString = new SaveDataConvertString();
		convertString.result = false;
		if(this.key.length == 0) return convertString;

		convertString.value = this.key;
		convertString.value += "=";
		convertString.value += this.value;
		convertString.value += ";";
		convertString.result = true;

		return convertString;
	}
}


class SaveDatas {
	result = true;
	datas = [];

	toConvertString() {
		var convertString = new SaveDataConvertString();
		convertString.result = false;
		if(!this.result) return convertString;
		if(this.datas.length == 0) return convertString;
		for (var i = 0; i < this.datas.length; ++i) {
			if(i != 0) {
				convertString.value += " "; // 空白を設ける
			} 
			var oneDataConvertString = this.datas[i].toConvertString();
			if(!oneDataConvertString.result) continue;
			convertString.value += oneDataConvertString.value;
		}
		convertString.result = true;
		return convertString;
	}
}