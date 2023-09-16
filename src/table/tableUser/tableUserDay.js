// table共通javascript
writeDocumentPath("src/table/tableCommon.js");
writeDocumentPath("src/table/tableUser/tableUserActionDay.js");
writeDocumentPath("src/table/tableUser/tableUserResultDay.js");

// document.write("<script src=\"src/table/tableCommon.js\" charset=\"utf-8\"></script>");
// document.write("<script src=\"src/table/tableUser/tableUserActionDay.js\" charset=\"utf-8\"></script>");
// document.write("<script src=\"src/table/tableUser/tableUserResultDay.js\" charset=\"utf-8\"></script>");


// user day element
function addUserDayElement(userTableRawElement, day, user) {
    // action subject
    addUserDayActionElement(userTableRawElement, day, user);
    // result
    addUserDayResultElement(userTableRawElement, day, user);
}