document.write("<script src=\"src/table/tableCommon.js\" charset=\"utf-8\"></script>");
document.write("<script src=\"src/table/tableUser/tableUserCommon.js\" charset=\"utf-8\"></script>");
document.write("<script src=\"src/table/tableUtility.js\" charset=\"utf-8\"></script>");
document.write("<script src=\"src/user.js\" charset=\"utf-8\"></script>");
document.write("<script src=\"src/post.js\" charset=\"utf-8\"></script>");

var userDayResultTableRawId = "userDayResult";

function addUserDayResultElement(userTableRawElement, day, user) {
	var userDayResultElement = userTableRawElement.appendChild(document.createElement("td"));
	userDayResultElement.id = userDayResultTableRawId + day;
	userDayResultElement.style.borderRight = "thin none black"; // 右とのボーダーを削除

	// click時にselectWindowを開く
	userDayResultElement.onclick = (event) => {
		window.event.stopPropagation(); // 親のclickイベントに伝播しないように。
		openSelectWindow(userDayResultSelectWindowElement);
	};

	// データ登録用divを登録
	var userDayResultRegistDivElement = userDayResultElement.appendChild(document.createElement("div"));

	// 削除用のテーブル情報
	var allDeleteElement = userTableRawElement.appendChild(document.createElement("td"));
	allDeleteElement.style.width = defaultSize;

	var deleteTextElement = allDeleteElement.appendChild(document.createElement("p"));
	setDeleteTextStyle(deleteTextElement);
	deleteTextElement.onclick = (elem) => {
		window.event.stopPropagation(); // 親のclickイベントに伝播しないように。
		removeAllChild(userDayResultRegistDivElement);
		onSelectedItemElements = [];
	};

	// selectWindowを開いたときと閉じた時処理
	var onOpenSelectWindowAllDeleteElement = (element) => {
		allDeleteElement.style.borderLeft = "thin dotted gray"
		allDeleteElement.onclick = (event) => {
			window.event.stopPropagation(); // 親のclickイベントに伝播しないように。
		};

		// 削除text
		deleteTextElement.style.display = "block";
	};
	var onCloseSelectWindowAllDeleteElement = (element) => {
		allDeleteElement.style.borderLeft = "thin none black"
		allDeleteElement.onclick = (event) => {
			window.event.stopPropagation(); // 親のclickイベントに伝播しないように。
			openSelectWindow(userDayResultSelectWindowElement);
		};

		// 削除text
		deleteTextElement.style.display = "none";
	};

	onCloseSelectWindowAllDeleteElement(userDayResultSelectWindowElement);

	// select Window
	var userDayResultSelectWindowElement = appendChildSelectWindow(userDayResultElement);
	userDayResultSelectWindowElement.onOpen.push((element) => {
		console.log("result day open select window");
		onOpenSelectWindowAllDeleteElement(element);

		recreateResultSelectWindowElements(userDayResultSWRegistDivElement);

		for(var i = 0; i < onSelectedItemElements.length; ++i) {
			if(onSelectedItemElements[i].onOpenSelectWindow == null) continue;
			onSelectedItemElements[i].onOpenSelectWindow(element);
		}
	});
	userDayResultSelectWindowElement.onClose.push((element) => {
		console.log("result day close select window");
		onCloseSelectWindowAllDeleteElement(element);

		for(var i = 0; i < onSelectedItemElements.length; ++i) {
			if(onSelectedItemElements[i].onCloseSelectWindow == null) continue;
			onSelectedItemElements[i].onCloseSelectWindow(element);
		}
	});


	// 再作成処理関数
	var recreateResultSelectWindowElements = (element) => {
		removeAllChild(element); // 一旦全ての子要素を削除

		// todo : userの役職情報に合わせて並び順を変更
		var resultType = "Result"; // K
		var userType = "User"; // A
		var postType = "Post"; // D

		// 順番切り替え
		var createTypes = [resultType, userType, postType];
		if(user.post == mouse) {
			createTypes = [postType, userType, resultType];
		} else if(user.post == investigator) {
			createTypes = [postType, resultType, userType];
		} else if(user.post == lookout || user.post == provocateur || user.post == stalker || user.post == doctor){
			createTypes = [userType, resultType, postType];
		}

		// 順番事に生成
		for (var i = 0; i < createTypes.length; ++i) {
			var type = createTypes[i];
			if(i != 0) {
				element.appendChild(document.createElement("br"));
			}
			if (type == "Result") {
				createResultSelect(element);
			}
			else if (type == "User") {
				createUserSelect(element);
			}
			else if (type == "Post") {
				createPostSelect(element);
			}
		}
	};

	var createCategory = (element, str) => {
		var title = element.appendChild(document.createElement("p"));
		title.innerHTML = str;
		//title.style.height = "20px";
		title.style.margin = "0px";
	};

	var onSelectedItemElements = [];
	var deleteSelectedItem = (data) => {
		onSelectedItemElements = onSelectedItemElements.filter((item) => {
			if(item.user != data.user) return true;
			if(item.onOpenSelectWindow != data.onOpenSelectWindow) return true;
			if(item.onCloseSelectWindow != data.onCloseSelectWindow) return true;
			if(item.updateUser != data.updateUser) return true;
			if(item.deleteUser != data.deleteUser) return true;
			return false;
		});
	};

	var createResultSelect = (element) => {
		//createCategory(element, "Result");

		// 結果入力時処理
		var onClickResult = (clickData) => {
			window.event.stopPropagation(); // 親のclickイベントに伝播しないように。

			var userResultOneDivElement = userDayResultRegistDivElement.appendChild(document.createElement("div"));
			userResultOneDivElement.style.display = "inline-block";

			var deleteElem = () => {
				userResultOneDivElement.remove();
				deleteSelectedItem(data);
			};

			createResultElement(userResultOneDivElement, clickData.type, clickData.src, false);

			var deleteTextElem = userResultOneDivElement.appendChild(document.createElement("p"));
			setDeleteTextStyle(deleteTextElem);
			deleteTextElem.style.display = "inline-block"; // 最初は表示
			deleteTextElem.onclick = (element) => {
				window.event.stopPropagation(); // 親のclickイベントに伝播しないように。
				deleteElem();
			};

			var data = {
				user:null,
				onOpenSelectWindow: (element) => {
					deleteTextElem.style.display = "inline-block";
				},
				onCloseSelectWindow:(element) => {
					deleteTextElem.style.display = "none";
				},
				updateUser: null,
				deleteUser: null
			};
			onSelectedItemElements.push(data);
		};

		// 選択肢を追加。
		// 選択肢事にクリック対応。
		var setResultCommonElement = (element) => {
		};
		var setResultImageElement = (element) => {
			element.draggable = false;
			element.style.width = element.style.height = defaultSize;
			setResultCommonElement(element);
		};
		var setResultButtonElement = (element) => {
			element.style.width = "auto";
			element.style.height = defaultSize;
			element.style.webkitAppearance = "none";
			element.style.mozAppearance = "none";
			element.style.appearance = "none";
			element.style.border = "1px solid";
			element.style.borderRadius = "0px";
			setResultCommonElement(element);
		};
		var setResultTextElement = (element) => {
			element.style.width = "auto";
			element.style.height = defaultSize;
			element.style.display = "inline-block";
			element.style.margin = "0px";
			setResultCommonElement(element);
		};
		var createResultElement = (parentNode,type,src,isSelect) => {
			var resultElement = null;
			if(type == "img") {
				resultElement = parentNode.appendChild(document.createElement("img"));
				resultElement.src = src;
				setResultImageElement(resultElement);
			} else {
				// button
				resultElement = parentNode.appendChild(document.createElement(isSelect ? "button" : "p"));
				resultElement.innerHTML = src; // ボタン名を入力
				isSelect ? setResultButtonElement(resultElement) : setResultTextElement(resultElement);
			}
			return resultElement;
		};
		var createResultLiElement = (ulElement, type, src) => {
			var liElement = ulElement.appendChild(document.createElement("li"));

			var inputElement = createResultElement(liElement, type, src, true);

			var resultData = {
				type: type,
				src:src
			};
			inputElement.onclick = (clickEvent) => {
				onClickResult(resultData);
			};
		};

		// check関連
		var checkUlElement = element.appendChild(document.createElement("ul"));
		createResultLiElement(checkUlElement, "img", "image/result/check.png");
		createResultLiElement(checkUlElement, "img", "image/result/no.png");
		// kill/exile関連
		var killUlElement = element.appendChild(document.createElement("ul"));
		createResultLiElement(killUlElement, "img", "image/result/kill.png");
		createResultLiElement(killUlElement, "img", "image/result/tuihou.png");
		// そのほか
		var etcUlElement = element.appendChild(document.createElement("ul"));
		createResultLiElement(etcUlElement, "btn", "補導");
		createResultLiElement(etcUlElement, "btn", "在宅");
		createResultLiElement(etcUlElement, "btn", "黙秘");
		createResultLiElement(etcUlElement, "btn", "来客");
		createResultLiElement(etcUlElement, "btn", "蘇生");
	};
	var createUserSelect = (element) => {
		//createCategory(element, "User");
		var onClickUser = (user,isImage) => {
			window.event.stopPropagation(); // 親のclickイベントに伝播しないように。

			var userResultOneDivElement = userDayResultRegistDivElement.appendChild(document.createElement("div"));
			userResultOneDivElement.style.display = "inline-block";

			var deleteElem = () => {
				userResultOneDivElement.remove();
				deleteSelectedItem(data);
			};		

			var userInputElement = createUserInputElement(userResultOneDivElement, user, isImage);
			var deleteTextElem = userResultOneDivElement.appendChild(document.createElement("p"));
			setDeleteTextStyle(deleteTextElem);
			deleteTextElem.style.display = "inline-block"; // 最初は表示
			deleteTextElem.onclick = (element) => {
				window.event.stopPropagation(); // 親のclickイベントに伝播しないように。
				deleteElem();
			};
			var data = {
				user:user,
				onOpenSelectWindow: (element) => {
					deleteTextElem.style.display = "inline-block";
				},
				onCloseSelectWindow:(element) => {
					deleteTextElem.style.display = "none";
				},
				updateUser: () => {
					updateUserInputElement(userInputElement, user);
				},
				deleteUser: () => {
					deleteElem();
				}
			};
			onSelectedItemElements.push(data);
		};
		createSelectUser(element,  onClickUser, userDayResultSelectWindowElement);
	};
	var createPostSelect = (element) => {
		//createCategory(element, "Post");
		var onImageClick = (clickEvent, postImageData) => {
			var userResultOneDivElement = userDayResultRegistDivElement.appendChild(document.createElement("div"));
			userResultOneDivElement.style.display = "inline-block";

			var deleteElem = () => {
				userResultOneDivElement.remove();
				deleteSelectedItem(data);
			};

			// image
			var userImage = userResultOneDivElement.appendChild(document.createElement("img"));
			userImage.src = postImageData.image;
			userImage.draggable = false;
			setPostImageData(userImage, postImageData.image);

			var deleteTextElem = userResultOneDivElement.appendChild(document.createElement("p"));
			setDeleteTextStyle(deleteTextElem);
			deleteTextElem.style.display = "inline-block"; // 最初は表示

			deleteTextElem.onclick = (elem) => {
				window.event.stopPropagation(); // 親のclickイベントに伝播しないように。
				deleteElem();
			};

			var data = {
				user:null,
				onOpenSelectWindow: (element) => {
					deleteTextElem.style.display = "inline-block";
				},
				onCloseSelectWindow:(element) => {
					deleteTextElem.style.display = "none";
				},
				updateUser:null,
				deleteUser:null
			};
			onSelectedItemElements.push(data);
		};
		createSelectPost(element, onImageClick, false);
	};

	// 選択項目の登録
	var userDayResultSWRegistDivElement = userDayResultSelectWindowElement.appendChild(document.createElement("div"));
	userDayResultSWRegistDivElement.style.margin = "0px";

	// todo : dayを初期化、user削除時にこの関数をローカル変数として削除するようなコードを記載する必要がある。

	// user update登録
	onUpdateUserFuncs.push((user) => {
		var updateUserElement = onSelectedItemElements.filter((item)=>{
			return item.user == user;
		});
		for(var i = 0; i < updateUserElement.length; ++i) {
			if(updateUserElement[i].updateUser == null) continue;
			updateUserElement[i].updateUser();
		}
	});

	// user delete登録
	onDeleteUserFuncs.push((user) => {
		var deleteUserElement = onSelectedItemElements.filter((item)=>{
			return item.user == user;
		});
		for(var i = 0; i < deleteUserElement.length; ++i) {
			if(updateUserElement[i].deleteUser == null) continue;
			deleteUserElement[i].deleteUser();
		}
	});
}
