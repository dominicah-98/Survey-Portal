/* ---------- Common Function ---------- */
function ElemCreation(elemIDCount, elemType, elemClass, elemID, elemStyle, elemInputType){
  var element = document.createElement(elemType);
  element.setAttribute("class",elemClass);
  element.setAttribute("id",elemID+elemIDCount);
  element.setAttribute("style",elemStyle);
  element.setAttribute("type", elemInputType);
  // element.setAttribute("onclick",elemFunc+"("+elemIDCount+")");

  // var parentDiv = document.getElementById(parentDivID);
  // parentDiv.appendChild(element);
  return element;
}

function GetID(Index){
  var emptyIndex = Index.indexOf(-1);
  if (emptyIndex != -1){
    Index[emptyIndex] = emptyIndex
    
    return emptyIndex
  } 
  else {
    emptyIndex = Index.length
    Index.push(emptyIndex)
    return emptyIndex
  }
}
/* ---------- Common Function End ---------- */

/* ---------- Common Variables ---------- */

// Questions
var quesIndex = [];
quesIndex.push(0);
// quesIndex.push(1);

var quesTxtCount = [];
// quesTxtCount[0]='quesDiv1';

// MCQ Options
var mcqIndex = [];
mcqIndex.push(0);
mcqIndex.push(1);

var mcqTxtCount = [];
mcqTxtCount[0]='txtMCQOpt1';


// Checkbox Options
var checkIndex = [];
checkIndex.push(0);
checkIndex.push(1);

var checkTxtCount = [];
checkTxtCount[0]='txtCheckOpt1';


// Dropdown Options
var dropdownIndex = [];
dropdownIndex.push(0);
dropdownIndex.push(1);

var dropdownTxtCount = [];
dropdownTxtCount[0]='txtMCQRow1';


// MCQ Grid Row
var McqRowIndex = [];
McqRowIndex.push(0);
McqRowIndex.push(1);

var McqRowCount = [];
McqRowCount[0]='txtMCQRow1';


// MCQ Grid Column
var McqColIndex = [];
McqColIndex.push(0);
McqColIndex.push(1);

var McqColCount = [];
McqColCount[0]='txtMCQCol1';

// Checkbox Grid Row
var CheckRowIndex = [];
CheckRowIndex.push(0);
CheckRowIndex.push(1);

var CheckRowCount = [];
CheckRowCount[0]='txtCheckRow1';

// Checkbox Grid Column
var CheckColIndex = [];
CheckColIndex.push(0);
CheckColIndex.push(1);

var CheckColCount = [];
CheckColCount[0]='txtCheckCol1';
/* ---------- Common Variables End ---------- */