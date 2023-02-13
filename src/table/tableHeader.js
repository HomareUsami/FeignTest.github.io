document.write("<script src=\"src/day.js\" charset=\"utf-8\"></script>");

var tableHeaderId = "tableHeader";  // table Header id

// header共通追加データ
function addTableHeader(tableRawElement, txt) {
    var tableHeaderElement = tableRawElement.appendChild(document.createElement("th"));
    tableHeaderElement.appendChild(document.createTextNode(txt));
	tableHeaderElement.style.whiteSpace = "nowrap";
    return tableHeaderElement;
}

// headerか？
function isHeaderTable(tableRawElement) {
    return tableRawElement.id == tableHeaderId;
}

// table header create
function createTableHeader(feignTableElement) {

    console.log("create Table Header");

    // Header create
    var tableHeaderRawElement = feignTableElement.appendChild(document.createElement("tr"));
    tableHeaderRawElement.id = tableHeaderId;
    addTableHeader(tableHeaderRawElement, "削除"); // color
    addTableHeader(tableHeaderRawElement, "色"); // color
    addTableHeader(tableHeaderRawElement, "名前"); // name
    addTableHeader(tableHeaderRawElement, "CO役職"); // post
    addTableHeader(tableHeaderRawElement, "確定役職"); // real post

    // 1日目登録
    addRawNowDayElementHeader(tableHeaderRawElement);
}

// headerにday追加
function addRawNowDayElementHeader(tableRawElement) {
    var dayActionElement = addTableHeader(tableRawElement, day + "日目"); // action subject
    dayActionElement.colSpan = "2";
    var dayResultElement = addTableHeader(tableRawElement, (day == 1 ? "結果" : "　　")); // result
    dayResultElement.colSpan = "2";
}