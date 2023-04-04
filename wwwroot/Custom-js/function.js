/* ---------- Question Div Addition & Deletion ---------- */
var QidCount = GetID(quesIndex);
// alert(QidCount)
function addQuestion(){
  var container = ElemCreation(QidCount,"div","container border shadow-sm rounded my-4 px-3 py-2 w-75","quesDiv","","");

  var parentDiv = document.getElementById('frmSurveyNew');
  parentDiv.appendChild(container);

  var div1 = ElemCreation(QidCount,"div","row","quesRow_Qno","","");
  var divider = document.createElement("hr")
  var div2 = ElemCreation(QidCount,"div","d-md-flex d-block align-items-center justify-content-center","quesOptions_Qno","","");
  parentDiv = document.getElementById("quesDiv"+QidCount)
  parentDiv.appendChild(div1)
  parentDiv.appendChild(divider)
  parentDiv.appendChild(div2)

  // Question
  var colDiv1 = ElemCreation(QidCount,"div","col-md-6","quesCol_Qno","","");
  var colDiv2 = ElemCreation(QidCount,"div","col-md-6 mt-3 mt-md-0","quesTypeCol_Qno","","");
  var Div3 = ElemCreation(QidCount,"div","","divQuestion_Qno","","");
  parentDiv = document.getElementById("quesRow_Qno"+QidCount)
  parentDiv.appendChild(colDiv1)
  parentDiv.appendChild(colDiv2)
  parentDiv.appendChild(Div3)

  var txtQuestion = ElemCreation(QidCount,"input","form-control","txtQuestion_Qno","","text");
  txtQuestion.setAttribute("placeholder","Write Question...")
  parentDiv = document.getElementById("quesCol_Qno"+QidCount)
  parentDiv.appendChild(txtQuestion)

  var qtypeRow = ElemCreation(QidCount,"div","row","qtypeRow_Qno","","");
  parentDiv = document.getElementById("quesTypeCol_Qno"+QidCount)
  parentDiv.appendChild(qtypeRow)

  colDiv1 = ElemCreation(QidCount,"div","col-10","quesTypeOptCol_Qno","","");
  colDiv2 = ElemCreation(QidCount,"div","col-2 text-end","quesfileCol_Qno","","");
  parentDiv = document.getElementById("qtypeRow_Qno"+QidCount)
  parentDiv.appendChild(colDiv1)
  parentDiv.appendChild(colDiv2)

  var qtypeSelect = ElemCreation(QidCount,"select","form-select me-2","QType_Qno","","");
  qtypeSelect.setAttribute("onchange","quesType()")
  parentDiv = document.getElementById("quesTypeOptCol_Qno"+QidCount)
  parentDiv.appendChild(qtypeSelect)

  var opt1 = document.createElement("option")
  opt1.setAttribute("value","")
  opt1.innerHTML = "Select Question Type"
  var opt2 = document.createElement("option")
  opt2.setAttribute("value","qtypemcq")
  opt2.innerHTML = "Multiple Choice"
  var opt3 = document.createElement("option")
  opt3.setAttribute("value","qtypecheckbox")
  opt3.innerHTML = "Checkbox"
  var opt4 = document.createElement("option")
  opt4.setAttribute("value","qtypedropdown")
  opt4.innerHTML = "Dropdown"
  var opt5 = document.createElement("option")
  opt5.setAttribute("value","qtypeshort")
  opt5.innerHTML = "Short Answer"
  var opt6 = document.createElement("option")
  opt6.setAttribute("value","qtypelong")
  opt6.innerHTML = "Long Answer"
  var opt7 = document.createElement("option")
  opt7.setAttribute("value","qtypefile")
  opt7.innerHTML = "File Upload"
  var opt8 = document.createElement("option")
  opt8.setAttribute("value","qtypelinear")
  opt8.innerHTML = "Linear Scale"
  var opt9 = document.createElement("option")
  opt9.setAttribute("value","qtypemcqgrid")
  opt9.innerHTML = "Multiple Choice Grid"
  var opt10 = document.createElement("option")
  opt10.setAttribute("value","qtypecheckgrid")
  opt10.innerHTML = "Checkbox Grid"
  var opt11 = document.createElement("option")
  opt11.setAttribute("value","qtypedate")
  opt11.innerHTML = "Date"
  var opt12 = document.createElement("option")
  opt12.setAttribute("value","qtypetime")
  opt12.innerHTML = "Time"
  parentDiv = document.getElementById("QType_Qno"+QidCount)
  parentDiv.appendChild(opt1)
  parentDiv.appendChild(opt2)
  parentDiv.appendChild(opt3)
  parentDiv.appendChild(opt4)
  parentDiv.appendChild(opt5)
  parentDiv.appendChild(opt6)
  parentDiv.appendChild(opt7)
  parentDiv.appendChild(opt8)
  parentDiv.appendChild(opt9)
  parentDiv.appendChild(opt10)
  parentDiv.appendChild(opt11)
  parentDiv.appendChild(opt12)

  var fileUploadLabel = ElemCreation(QidCount,"label","custom-file-upload","qFileUploadLabel_Qno","","");
  fileUploadLabel.setAttribute("for","txtfile-upload_Qno"+QidCount)
  var txtFileUpload = ElemCreation(QidCount,"input","","txtfile-upload_Qno","","file");
  parentDiv = document.getElementById("quesfileCol_Qno"+QidCount)
  parentDiv.appendChild(fileUploadLabel)
  parentDiv.appendChild(txtFileUpload)

  var fileUploadIcon = document.createElement("i")
  fileUploadIcon.setAttribute("class","fa-solid fa-image fa-2x")
  parentDiv = document.getElementById("qFileUploadLabel_Qno"+QidCount)
  parentDiv.appendChild(fileUploadIcon)

  var divMarks = ElemCreation(QidCount,"div","d-flex align-items-center","divMarks_Qno","","");
  var span1 = ElemCreation("","span","d-md-block d-none mx-2 fs-4","","","");
  span1.innerHTML = "|"
  var divRequired = ElemCreation(QidCount,"div","form-check form-switch mx-2 fs-6","divRequired_Qno","","");
  var span2 = ElemCreation(QidCount,"span","d-block mx-2 text-danger fs-5","quesSpanDelete","","");
  span2.innerHTML = '<i class="fa-solid fa-trash-can"></i>'
  parentDiv = document.getElementById("quesOptions_Qno"+QidCount)
  parentDiv.appendChild(divMarks)
  parentDiv.appendChild(span1)
  parentDiv.appendChild(divRequired)
  parentDiv.appendChild(span1)
  parentDiv.appendChild(span2)

  var marksSwitch = ElemCreation(QidCount,"div","form-check form-switch mx-2 fs-6","divMarks_Qno","","");
  var marksDiv = ElemCreation(QidCount,"div","","marksDiv","","");
  parentDiv = document.getElementById("divMarks_Qno"+QidCount)
  parentDiv.appendChild(marksSwitch)
  parentDiv.appendChild(marksDiv)

  var marksCheck = ElemCreation(QidCount,"input","form-check-input","chckMark_Qno","","checkbox");
  marksCheck.setAttribute("onclick","markFunc()")
  var marksLabel = ElemCreation(QidCount,"label","form-check-label","","","");
  marksLabel.innerHTML = "Marks"
  parentDiv = document.getElementById("divMarks_Qno"+QidCount)
  parentDiv.appendChild(marksCheck)
  parentDiv.appendChild(marksLabel)
}

/* ---------- MCQ Textbox Addition & Deletion ---------- */
function addMCQOption(){
  var idCount = GetID(mcqIndex);

  var div = ElemCreation(idCount,"div","d-flex align-items-center mt-2","mcqoptdiv","","");
  var parentDiv = document.getElementById("mcqoption");
  parentDiv.appendChild(div);

  var element = ElemCreation(idCount,"input","d-block form-control","txtMCQOpt","","text");
  element.setAttribute("placeholder","MCQ Option...");

  var delIcon = ElemCreation(idCount,"i","fa-solid fa-xmark","delDiv","","");
  delIcon.setAttribute("onclick","delMCQOption("+idCount+")");
  
  var divID = "mcqoptdiv"+idCount;
  var foo = document.getElementById(divID);
  foo.appendChild(element);
  foo.appendChild(delIcon);
  
  mcqTxtCount.push(element.getAttribute("id"));

  // var test = document.getElementById("txtMCQOpt2");
  // test.value="test purpose";
}

function delMCQOption(id) {
  try{
    var element = document.getElementById("mcqoptdiv"+id)
    var txtID = "txtMCQOpt"+id
    element.parentNode.removeChild(element);
    mcqIndex[id] = -1;
    
    for( var i = 0; i < mcqTxtCount.length; i++){ 
                                   
      if ( mcqTxtCount[i] === txtID) { 
        mcqTxtCount.splice(i, 1); 
        i--; 
      }
    }
  }
  catch(err){
    alert("id: txtMCQOpt"+id)
    alert(err)
  }
}  
/* ---------- End MCQ Textbox Addition & Deletion ---------- */

/* ---------- Checkbox Textbox Addition & Deletion ---------- */
function addCheckOption(){
  var idCount = GetID(checkIndex);

  var div = ElemCreation(idCount,"div","d-flex align-items-center mt-2","checkoptdiv","","");
  var parentDiv = document.getElementById("checkoption");
  parentDiv.appendChild(div);

  var element = ElemCreation(idCount,"input","d-block form-control","txtCheckOpt","","text");
  element.setAttribute("placeholder","Option...");

  var delIcon = ElemCreation(idCount,"i","fa-solid fa-xmark","delDiv","","");
  delIcon.setAttribute("onclick","delCheckOption("+idCount+")");
  
  divID = "checkoptdiv"+idCount;
  var foo = document.getElementById(divID);
  foo.appendChild(element);
  foo.appendChild(delIcon);
  
  checkTxtCount.push(element.getAttribute("id"));
}

function delCheckOption(id) {
  try{
    var element = document.getElementById("checkoptdiv"+id)
    var txtID = "txtCheckOpt"+id
    element.parentNode.removeChild(element);
    checkIndex[id] = -1;
    
    for( var i = 0; i < checkTxtCount.length; i++){ 
                                   
      if ( checkTxtCount[i] === txtID) { 
        checkTxtCount.splice(i, 1); 
        i--; 
      }
    }
  }
  catch(err){
    alert("id: txtCheckOpt"+id)
    alert(err)
  }
}
/* ---------- End MCQ Textbox Addition & Deletion ---------- */

/* ---------- Dropdown Textbox Addition & Deletion ---------- */
function addDropOption(){
  var idCount = GetID(dropdownIndex);

  var div = ElemCreation(idCount,"div","d-flex align-items-center mt-2","dropdownoptdiv","","");
  var parentDiv = document.getElementById("dropdownoption");
  parentDiv.appendChild(div);

  var element = ElemCreation(idCount,"input","d-block form-control","txtDropOpt","","text");
  element.setAttribute("placeholder","Dropdown Option");

  var delIcon = ElemCreation(idCount,"i","fa-solid fa-xmark","delDiv","","");
  delIcon.setAttribute("onclick","delDropOption("+idCount+")");
  
  divID = "dropdownoptdiv"+idCount;
  var foo = document.getElementById(divID);
  foo.appendChild(element);
  foo.appendChild(delIcon);
  
  checkTxtCount.push(element.getAttribute("id"));
}

function delDropOption(id) {
  try{
    var element = document.getElementById("dropdownoptdiv"+id)
    var txtID = "txtDropOpt"+id
    element.parentNode.removeChild(element);
    dropdownIndex[id] = -1;
    
    for( var i = 0; i < dropdownTxtCount.length; i++){ 
                                   
      if ( dropdownTxtCount[i] === txtID) { 
        dropdownTxtCount.splice(i, 1); 
        i--; 
      }
    }
  }
  catch(err){
    alert("id: txtCheckOpt"+id)
    alert(err)
  }
}
/* ---------- End Dropdown Textbox Addition & Deletion ---------- */

/* ---------- MCQ Grid Row Addition & Deletion ---------- */
function addMcqRow(){
  var idCount = GetID(McqRowIndex);

  var li = ElemCreation(idCount,"li","d-flex align-items-center mt-2","MCQRowLi","","");
  var parentDiv = document.getElementById("McqRow");
  parentDiv.appendChild(li);

  var element = ElemCreation(idCount,"input","form-control","txtMCQRow","","text");
  element.setAttribute("placeholder","Enter Row Name");

  var delIcon = ElemCreation(idCount,"i","fa-solid fa-xmark ms-3","delRow","","");
  delIcon.setAttribute("onclick","delMcqRow("+idCount+")");
  
  liID = "MCQRowLi"+idCount;
  var foo = document.getElementById(liID);
  foo.appendChild(element);
  foo.appendChild(delIcon);
  
  McqRowCount.push(element.getAttribute("id"));
}

function delMcqRow(id) {
  try{
    var element = document.getElementById("MCQRowLi"+id)
    var txtID = "txtMCQRow"+id
    element.parentNode.removeChild(element);
    McqRowIndex[id] = -1;
    
    for( var i = 0; i < McqRowCount.length; i++){ 
                                   
      if ( McqRowCount[i] === txtID) { 
        McqRowCount.splice(i, 1); 
        i--; 
      }
    }
  }
  catch(err){
    alert("id: txtMCQRow"+id)
    alert(err)
  }
}
/* ---------- End MCQ Grid Row Addition & Deletion ---------- */

/* ---------- MCQ Grid Column Addition & Deletion ---------- */
function addMcqCol(){
  var idCount = GetID(McqColIndex);

  var li = ElemCreation(idCount,"li","d-flex align-items-center mt-2","MCQColLi","","");
  var parentDiv = document.getElementById("McqCol");
  parentDiv.appendChild(li);

  var element = ElemCreation(idCount,"input","form-control","txtMCQCol","","text");
  element.setAttribute("placeholder","Enter Column Name");

  var delIcon = ElemCreation(idCount,"i","fa-solid fa-xmark ms-3","delCol","","");
  delIcon.setAttribute("onclick","delMcqCol("+idCount+")");
  
  liID = "MCQColLi"+idCount;
  var foo = document.getElementById(liID);
  foo.appendChild(element);
  foo.appendChild(delIcon);
  
  McqColCount.push(element.getAttribute("id"));
}

function delMcqCol(id) {
  try{
    var element = document.getElementById("MCQColLi"+id)
    var txtID = "txtMCQCol"+id
    element.parentNode.removeChild(element);
    McqColIndex[id] = -1;
    
    for( var i = 0; i < McqColCount.length; i++){ 
                                   
      if (McqColCount[i] === txtID) { 
        McqColCount.splice(i, 1); 
        i--; 
      }
    }
  }
  catch(err){
    alert("id: txtMCQCol"+id)
    alert(err)
  }
}
/* ---------- End MCQ Grid Column Addition & Deletion ---------- */

/* ---------- Checkbox Grid Row Addition & Deletion ---------- */
function addCheckRow(){
  var idCount = GetID(CheckRowIndex);

  var li = ElemCreation(idCount,"li","d-flex align-items-center mt-2","CheckRowLi","","");
  var parentDiv = document.getElementById("CheckRow");
  parentDiv.appendChild(li);

  var element = ElemCreation(idCount,"input","form-control","txtCheckRow","","text");
  element.setAttribute("placeholder","Enter Row Name");

  var delIcon = ElemCreation(idCount,"i","fa-solid fa-xmark ms-3","delRow","","");
  delIcon.setAttribute("onclick","delCheckRow("+idCount+")");
  
  liID = "CheckRowLi"+idCount;
  var foo = document.getElementById(liID);
  foo.appendChild(element);
  foo.appendChild(delIcon);
  
  CheckRowCount.push(element.getAttribute("id"));
}

function delCheckRow(id) {
  try{
    var element = document.getElementById("CheckRowLi"+id)
    var txtID = "txtCheckRow"+id
    element.parentNode.removeChild(element);
    CheckRowIndex[id] = -1;
    
    for( var i = 0; i < CheckRowCount.length; i++){ 
                                   
      if (CheckRowCount[i] === txtID) { 
        CheckRowCount.splice(i, 1); 
        i--; 
      }
    }
  }
  catch(err){
    alert("id: txtMCQRow"+id)
    alert(err)
  }
}
/* ---------- End MCQ Grid Row Addition & Deletion ---------- */

/* ---------- MCQ Grid Column Addition & Deletion ---------- */
function addCheckCol(){
  var idCount = GetID(CheckColIndex);

  var li = ElemCreation(idCount,"li","d-flex align-items-center mt-2","CheckColLi","","");
  var parentDiv = document.getElementById("CheckCol");
  parentDiv.appendChild(li);

  var element = ElemCreation(idCount,"input","form-control","txtCheckCol","","text");
  element.setAttribute("placeholder","Enter Column Name");

  var delIcon = ElemCreation(idCount,"i","fa-solid fa-xmark ms-3","delCol","","");
  delIcon.setAttribute("onclick","delCheckCol("+idCount+")");
  
  liID = "CheckColLi"+idCount;
  var foo = document.getElementById(liID);
  foo.appendChild(element);
  foo.appendChild(delIcon);
  
  CheckColCount.push(element.getAttribute("id"));
}

function delCheckCol(id) {
  try{
    var element = document.getElementById("CheckColLi"+id)
    var txtID = "txtCheckCol"+id
    element.parentNode.removeChild(element);
    CheckColIndex[id] = -1;
    
    for( var i = 0; i < CheckColCount.length; i++){ 
                                   
      if (CheckColCount[i] === txtID) { 
        CheckColCount.splice(i, 1); 
        i--; 
      }
    }
  }
  catch(err){
    alert("id: txtMCQCol"+id)
    alert(err)
  }
}
/* ---------- End MCQ Grid Column Addition & Deletion ---------- */

/* ---------- File Type Checkboxes for File Input ---------- */
function checkFileType(){
  var checkBox = document.getElementById("chckFileType");
  if(checkBox.checked == true){
    // Document Check Box
    var divCol1 = ElemCreation("","div","col-md-6","filetypeCol1","","");
    var rowDiv = document.getElementById("filetypeRow");
    rowDiv.appendChild(divCol1);

    var divCheck = ElemCreation("","div","form-check","checkdiv1","","");
    var colDiv1 = document.getElementById("filetypeCol1");
    colDiv1.appendChild(divCheck);

    var documentCheckBox = ElemCreation("","input","form-check-input","chckDoc1","","checkbox");
    var documentLabel = ElemCreation("","label","form-check-label","","","");
    var parentDiv = document.getElementById("checkdiv1");
    parentDiv.appendChild(documentCheckBox);
    parentDiv.appendChild(documentLabel);
    documentLabel.innerHTML="Document"
    // End Document Check Box

    // Presentation Check Box
    var divCol2 = ElemCreation("","div","col-md-6","filetypeCol2","","");
    rowDiv.appendChild(divCol2);

    var divCheck = ElemCreation("","div","form-check","checkdiv2","","");
    var colDiv2 = document.getElementById("filetypeCol2");
    colDiv2.appendChild(divCheck);

    var pptCheckBox = ElemCreation("","input","form-check-input","chckDoc2","","checkbox");
    var pptLabel = ElemCreation("","label","form-check-label","","","");
    var parentDiv = document.getElementById("checkdiv2");
    parentDiv.appendChild(pptCheckBox);
    parentDiv.appendChild(pptLabel);
    pptLabel.innerHTML="Presentation"
    // End Presentation Check Box

    // Spreadsheet Check Box
    var divCol3 = ElemCreation("","div","col-md-6","filetypeCol3","","");
    rowDiv.appendChild(divCol3);

    var divCheck = ElemCreation("","div","form-check","checkdiv3","","");
    var colDiv3 = document.getElementById("filetypeCol3");
    colDiv3.appendChild(divCheck);

    var excelCheckBox = ElemCreation("","input","form-check-input","chckDoc3","","checkbox");
    var excelLabel = ElemCreation("","label","form-check-label","","","");
    var parentDiv = document.getElementById("checkdiv3");
    parentDiv.appendChild(excelCheckBox);
    parentDiv.appendChild(excelLabel);
    excelLabel.innerHTML="Spreadsheet"
    // End Spreadsheet Check Box

    // Drawing Check Box
    var divCol4 = ElemCreation("","div","col-md-6","filetypeCol4","","");
    rowDiv.appendChild(divCol4);

    var divCheck = ElemCreation("","div","form-check","checkdiv4","","");
    var colDiv4 = document.getElementById("filetypeCol4");
    colDiv4.appendChild(divCheck);

    var drawCheckBox = ElemCreation("","input","form-check-input","chckDoc4","","checkbox");
    var drawLabel = ElemCreation("","label","form-check-label","","","");
    var parentDiv = document.getElementById("checkdiv4");
    parentDiv.appendChild(drawCheckBox);
    parentDiv.appendChild(drawLabel);
    drawLabel.innerHTML="Drawing"
    // End Drawing Check Box

    // PDF Check Box
    var divCol5 = ElemCreation("","div","col-md-6","filetypeCol5","","");
    rowDiv.appendChild(divCol5);

    var divCheck = ElemCreation("","div","form-check","checkdiv5","","");
    var colDiv5= document.getElementById("filetypeCol5");
    colDiv5.appendChild(divCheck);

    var pdfCheckBox = ElemCreation("","input","form-check-input","chckDoc5","","checkbox");
    var pdfLabel = ElemCreation("","label","form-check-label","","","");
    var parentDiv = document.getElementById("checkdiv5");
    parentDiv.appendChild(pdfCheckBox);
    parentDiv.appendChild(pdfLabel);
    pdfLabel.innerHTML="PDF"
    // End PDF Check Box

    // Image Check Box
    var divCol6 = ElemCreation("","div","col-md-6","filetypeCol6","","");
    rowDiv.appendChild(divCol6);

    var divCheck = ElemCreation("","div","form-check","checkdiv6","","");
    var colDiv6= document.getElementById("filetypeCol6");
    colDiv6.appendChild(divCheck);

    var imgCheckBox = ElemCreation("","input","form-check-input","chckDoc6","","checkbox");
    var imgLabel = ElemCreation("","label","form-check-label","","","");
    var parentDiv = document.getElementById("checkdiv6");
    parentDiv.appendChild(imgCheckBox);
    parentDiv.appendChild(imgLabel);
    imgLabel.innerHTML="Image"
    // End Image Check Box

    // Audio Check Box
    var divCol7 = ElemCreation("","div","col-md-6","filetypeCol7","","");
    rowDiv.appendChild(divCol7);

    var divCheck = ElemCreation("","div","form-check","checkdiv7","","");
    var colDiv7= document.getElementById("filetypeCol7");
    colDiv7.appendChild(divCheck);

    var audioCheckBox = ElemCreation("","input","form-check-input","chckDoc7","","checkbox");
    var audioLabel = ElemCreation("","label","form-check-label","","","");
    var parentDiv = document.getElementById("checkdiv7");
    parentDiv.appendChild(audioCheckBox);
    parentDiv.appendChild(audioLabel);
    audioLabel.innerHTML="Audio"
    // End Audio Check Box

    // Video Check Box
    var divCol8 = ElemCreation("","div","col-md-6","filetypeCol8","","");
    rowDiv.appendChild(divCol8);

    var divCheck = ElemCreation("","div","form-check","checkdiv8","","");
    var colDiv8= document.getElementById("filetypeCol8");
    colDiv8.appendChild(divCheck);

    var videoCheckBox = ElemCreation("","input","form-check-input","chckDoc8","","checkbox");
    var videoLabel = ElemCreation("","label","form-check-label","","","");
    var parentDiv = document.getElementById("checkdiv8");
    parentDiv.appendChild(videoCheckBox);
    parentDiv.appendChild(videoLabel);
    videoLabel.innerHTML="Video"
    // End Video Check Box
  }
  else{
    var colDiv1 = document.getElementById("filetypeCol1");
    var colDiv2 = document.getElementById("filetypeCol2");
    var colDiv3 = document.getElementById("filetypeCol3");
    var colDiv4 = document.getElementById("filetypeCol4");
    var colDiv5 = document.getElementById("filetypeCol5");
    var colDiv6 = document.getElementById("filetypeCol6");
    var colDiv7 = document.getElementById("filetypeCol7");
    var colDiv8 = document.getElementById("filetypeCol8");
    colDiv1.parentNode.removeChild(colDiv1);
    colDiv2.parentNode.removeChild(colDiv2);
    colDiv3.parentNode.removeChild(colDiv3);
    colDiv4.parentNode.removeChild(colDiv4);
    colDiv5.parentNode.removeChild(colDiv5);
    colDiv6.parentNode.removeChild(colDiv6);
    colDiv7.parentNode.removeChild(colDiv7);
    colDiv8.parentNode.removeChild(colDiv8);
  }
}
/* ---------- End File Type Checkboxes for File Input ---------- */

/* ---------- Timer ---------- */
function timerFunc(){
  var timerChekBox = document.getElementById("chckTimer")
  var colTimer = document.getElementById("colTimer")
  if(timerChekBox.checked == true){
    var timerTextBox = ElemCreation("","input","form-control ms-3","txtTimer","","number");
    timerTextBox.setAttribute("placeholder","Timer (in seconds)");
    colTimer.appendChild(timerTextBox);
  }
  else{
    var timerTextBox = document.getElementById("txtTimer");
    timerTextBox.parentNode.removeChild(timerTextBox);
  }
}
/* ---------- End Timer ---------- */

/* ---------- Marks ---------- */
function markFunc(){
  var markChekBox = document.getElementById("chckMark_Qno"+QidCount)
  var marksDiv = document.getElementById("marksDiv"+QidCount)
  if(markChekBox.checked == true){
    var markTextBox = ElemCreation("","input","form-control me-2 fs-6","txtMark","width: 140px;","number");
    markTextBox.setAttribute("placeholder","Marks");
    marksDiv.appendChild(markTextBox);
  }
  else{
    var markTextBox = document.getElementById("txtMark");
    markTextBox.parentNode.removeChild(markTextBox);
  }
}
/* ---------- End Marks ---------- */

/* ---------- Question Type Dropdown ---------- */
function quesType(){
  var qDiv = document.getElementById("divQuestion_Qno"+QidCount)
  var typeDropdown = document.getElementById("QType_Qno"+QidCount)
  var value = typeDropdown.value
  // var text = typeDropdown.options[typeDropdown.selectedIndex].text;
  if(value == "qtypemcq"){
    qDiv.innerHTML="";

    var parentDiv = ElemCreation("","div","col-12 input-type mt-3","qtypemcq","","");
    qDiv.appendChild(parentDiv);

    var rowDiv = ElemCreation("","div","row","mcqrowDiv","","");
    var parentDiv = document.getElementById("qtypemcq")
    parentDiv.appendChild(rowDiv);

    var col6Div1 = ElemCreation("","div","col-6","mcqoption","","");
    var col6Div2 = ElemCreation("","div","col-6 text-end","mcqAddoption","","");
    var rowDiv = document.getElementById("mcqrowDiv")
    rowDiv.appendChild(col6Div1);
    rowDiv.appendChild(col6Div2);

    var OptDiv = ElemCreation("","div","d-flex align-items-center","mcqoptdiv1","","")
    var col6Div1 = document.getElementById("mcqoption");
    col6Div1.appendChild(OptDiv)

    var element = ElemCreation("","input","d-block form-control","txtMCQOpt1","","text");
    element.setAttribute("placeholder","Enter MCQ Option...");
    var foo = document.getElementById("mcqoptdiv1");
    foo.appendChild(element);

    var element = ElemCreation("","input","btn btn-primary p-1 btn-sm","btnAddCheckOpt","","button");
    element.setAttribute("value","Add Option");
    element.setAttribute("onclick","addMCQOption()");
    var foo = document.getElementById("mcqAddoption");
    foo.appendChild(element);
  }

  if(value == "qtypecheckbox"){
    qDiv.innerHTML="";

    var parentDiv = ElemCreation("","div","col-12 input-type mt-3","qtypecheckbox","","");
    qDiv.appendChild(parentDiv);

    var rowDiv = ElemCreation("","div","row","checkrowDiv","","");
    var parentDiv = document.getElementById("qtypecheckbox")
    parentDiv.appendChild(rowDiv);

    var col6Div1 = ElemCreation("","div","col-6","checkoption","","");
    var col6Div2 = ElemCreation("","div","col-6 text-end","checkAddoption","","");
    var rowDiv = document.getElementById("checkrowDiv")
    rowDiv.appendChild(col6Div1);
    rowDiv.appendChild(col6Div2);

    var OptDiv = ElemCreation("","div","d-flex align-items-center","checkoptdiv1","","")
    var col6Div1 = document.getElementById("checkoption");
    col6Div1.appendChild(OptDiv)

    var element = ElemCreation("","input","d-block form-control","txtCheckOpt1","","text");
    element.setAttribute("placeholder","Enter Checkbox Option...");
    var foo = document.getElementById("checkoptdiv1");
    foo.appendChild(element);

    var element = ElemCreation("","input","btn btn-primary p-1 btn-sm","btnAddCheckOpt","","button");
    element.setAttribute("value","Add Option");
    element.setAttribute("onclick","addCheckOption()");
    var foo = document.getElementById("checkAddoption");
    foo.appendChild(element);
  }

  if(value == "qtypedropdown"){
    qDiv.innerHTML="";

    var parentDiv = ElemCreation("","div","col-12 input-type mt-3","qtypedropdown","","");
    qDiv.appendChild(parentDiv);

    var rowDiv = ElemCreation("","div","row","droprowDiv","","");
    var parentDiv = document.getElementById("qtypedropdown")
    parentDiv.appendChild(rowDiv);

    var col6Div1 = ElemCreation("","div","col-6","dropdownoption","","");
    var col6Div2 = ElemCreation("","div","col-6 text-end","dropAddoption","","");
    var rowDiv = document.getElementById("droprowDiv")
    rowDiv.appendChild(col6Div1);
    rowDiv.appendChild(col6Div2);

    var OptDiv = ElemCreation("","div","d-flex align-items-center","dropdownoptdiv1","","")
    var col6Div1 = document.getElementById("dropdownoption");
    col6Div1.appendChild(OptDiv)

    var element = ElemCreation("","input","d-block form-control","txtDropOpt1","","text");
    element.setAttribute("placeholder","Dropdown Option...");
    var foo = document.getElementById("dropdownoptdiv1");
    foo.appendChild(element);

    var element = ElemCreation("","input","btn btn-primary p-1 btn-sm","btnAddDropOpt","","button");
    element.setAttribute("value","Add Option");
    element.setAttribute("onclick","addDropOption()");
    var foo = document.getElementById("dropAddoption");
    foo.appendChild(element);
  }

  if(value == "qtypeshort"){
    qDiv.innerHTML="";

    var parentDiv = ElemCreation("","div","col-12 input-type mt-3","qtypeshort","","");
    qDiv.appendChild(parentDiv);

    var element = ElemCreation("","input","form-control bg-transparent","txtShortAnswer","","text");
    element.setAttribute("placeholder","Short Answer Type...");
    element.setAttribute("disabled","disabled");
    var foo = document.getElementById("qtypeshort");
    foo.appendChild(element);
  }

  if(value == "qtypelong"){
    qDiv.innerHTML="";

    var parentDiv = ElemCreation("","div","col-12 mt-3","qtypelong","","");
    qDiv.appendChild(parentDiv);

    var element = ElemCreation("","textarea","form-control bg-transparent","txtLongAnswer","","");
    element.setAttribute("placeholder","Long Answer Type...");
    element.setAttribute("rows","1");
    element.setAttribute("disabled","disabled");
    var foo = document.getElementById("qtypelong");
    foo.appendChild(element);
  }

  if(value == "qtypefile"){
    qDiv.innerHTML="";

    var parentDiv = ElemCreation("","div","col-md-4 mt-3","qtypefile","","");
    qDiv.appendChild(parentDiv);

    var fileTypeDiv = ElemCreation("","div","d-flex align-items-center","fileTypeCheckDiv","","");
    var fileTypeRow = ElemCreation("","div","row mt-2","filetypeRow","","");
    var fileNumDiv = ElemCreation("","div","d-flex align-items-end justify-content-between mt-2","filenumDiv","","");
    var fileSizeDiv = ElemCreation("","div","d-flex align-items-end justify-content-between mt-2","filesizeDiv","","");
    parentDiv = document.getElementById("qtypefile")
    parentDiv.appendChild(fileTypeDiv);
    parentDiv.appendChild(fileTypeRow);
    parentDiv.appendChild(fileNumDiv);
    parentDiv.appendChild(fileSizeDiv);

    var span = ElemCreation("","span","","","","");
    parentDiv = document.getElementById("fileTypeCheckDiv")
    parentDiv.appendChild(span);
    span.innerHTML="Allow Only Specific File Type";

    var checkDiv = ElemCreation("","div","form-check form-switch mx-2","checkDiv","","");
    parentDiv = document.getElementById("fileTypeCheckDiv")
    parentDiv.appendChild(checkDiv);

    var check = ElemCreation("","input","form-check-input","chckFileType","","checkbox");
    check.setAttribute("onclick","checkFileType()")
    parentDiv = document.getElementById("checkDiv")
    parentDiv.appendChild(check);

    var maxNumSpan = ElemCreation("","span","d-block me-4","maxFileTitle","","");
    var maxNumSelect = ElemCreation("","select","form-select w-25","maxFileNum","","");
    parentDiv = document.getElementById("filenumDiv")
    parentDiv.appendChild(maxNumSpan);
    parentDiv.appendChild(maxNumSelect);
    maxNumSpan.innerHTML="Maximum Number of Files";

    var maxNumSelectOpt1 = document.createElement("option")
    maxNumSelectOpt1.setAttribute("value","1")
    maxNumSelectOpt1.innerHTML="1"
    var maxNumSelectOpt2 = document.createElement("option")
    maxNumSelectOpt2.setAttribute("value","2")
    maxNumSelectOpt2.innerHTML="2"
    var maxNumSelectOpt3 = document.createElement("option")
    maxNumSelectOpt3.setAttribute("value","3")
    maxNumSelectOpt3.innerHTML="3"
    var maxNumSelectOpt4 = document.createElement("option")
    maxNumSelectOpt4.setAttribute("value","4")
    maxNumSelectOpt4.innerHTML="4"
    parentDiv = document.getElementById("maxFileNum")
    parentDiv.appendChild(maxNumSelectOpt1);
    parentDiv.appendChild(maxNumSelectOpt2);
    parentDiv.appendChild(maxNumSelectOpt3);
    parentDiv.appendChild(maxNumSelectOpt4);

    var FileSizeSpan = ElemCreation("","span","d-block me-4","FileSizeTitle","","");
    var sizeSelect = ElemCreation("","select","form-select w-25","fileSizeNum","","");
    parentDiv = document.getElementById("filesizeDiv")
    parentDiv.appendChild(FileSizeSpan);
    parentDiv.appendChild(sizeSelect);
    FileSizeSpan.innerHTML="Maximum File Size";

    var sizeSelectOpt1 = document.createElement("option")
    sizeSelectOpt1.setAttribute("value","1mb")
    sizeSelectOpt1.innerHTML="1 mb"
    var sizeSelectOpt2 = document.createElement("option")
    sizeSelectOpt2.setAttribute("value","10mb")
    sizeSelectOpt2.innerHTML="10 mb"
    parentDiv = document.getElementById("fileSizeNum")
    parentDiv.appendChild(sizeSelectOpt1);
    parentDiv.appendChild(sizeSelectOpt2);
  }

  if(value == "qtypelinear"){
    qDiv.innerHTML="";

    var parentDiv = ElemCreation("","div","col-12 mt-3","qtypelinear","","");
    qDiv.appendChild(parentDiv);
    
    var divRangeOpt = ElemCreation("","div","w-50 d-flex align-items-center","divRangeOpt","","");
    var divRangeLabel = ElemCreation("","div","w-50 d-flex align-items-center mt-3","divRangeLabel","","");
    parentDiv = document.getElementById("qtypelinear")
    parentDiv.appendChild(divRangeOpt);
    parentDiv.appendChild(divRangeLabel);

    var selectLow = ElemCreation("","select","form-select me-5","selectLow","","");
    var selectHigh = ElemCreation("","select","form-select ms-5","selectHigh","","");
    parentDiv = document.getElementById("divRangeOpt")
    parentDiv.appendChild(selectLow)
    parentDiv.appendChild(selectHigh)

    var lowSelectOpt1 = document.createElement("option")
    lowSelectOpt1.setAttribute("value","0")
    lowSelectOpt1.innerHTML="0"
    var lowSelectOpt2 = document.createElement("option")
    lowSelectOpt2.setAttribute("value","1")
    lowSelectOpt2.innerHTML="1"
    parentDiv = document.getElementById("selectLow")
    parentDiv.appendChild(lowSelectOpt1);
    parentDiv.appendChild(lowSelectOpt2);

    var highSelectOpt1 = document.createElement("option")
    highSelectOpt1.setAttribute("value","1")
    highSelectOpt1.innerHTML="1"
    var highSelectOpt2 = document.createElement("option")
    highSelectOpt2.setAttribute("value","2")
    highSelectOpt2.innerHTML="2"
    var highSelectOpt3 = document.createElement("option")
    highSelectOpt3.setAttribute("value","3")
    highSelectOpt3.innerHTML="3"
    var highSelectOpt4 = document.createElement("option")
    highSelectOpt4.setAttribute("value","4")
    highSelectOpt4.innerHTML="4"
    var highSelectOpt5 = document.createElement("option")
    highSelectOpt5.setAttribute("value","5")
    highSelectOpt5.innerHTML="5"
    var highSelectOpt6 = document.createElement("option")
    highSelectOpt6.setAttribute("value","6")
    highSelectOpt6.innerHTML="6"
    var highSelectOpt7 = document.createElement("option")
    highSelectOpt7.setAttribute("value","7")
    highSelectOpt7.innerHTML="7"
    var highSelectOpt8 = document.createElement("option")
    highSelectOpt8.setAttribute("value","8")
    highSelectOpt8.innerHTML="8"
    var highSelectOpt9 = document.createElement("option")
    highSelectOpt9.setAttribute("value","9")
    highSelectOpt9.innerHTML="9"
    var highSelectOpt10 = document.createElement("option")
    highSelectOpt10.setAttribute("value","10")
    highSelectOpt10.innerHTML="10"
    parentDiv = document.getElementById("selectHigh")
    parentDiv.appendChild(highSelectOpt1);
    parentDiv.appendChild(highSelectOpt2);
    parentDiv.appendChild(highSelectOpt3);
    parentDiv.appendChild(highSelectOpt4);
    parentDiv.appendChild(highSelectOpt5);
    parentDiv.appendChild(highSelectOpt6);
    parentDiv.appendChild(highSelectOpt7);
    parentDiv.appendChild(highSelectOpt8);
    parentDiv.appendChild(highSelectOpt9);
    parentDiv.appendChild(highSelectOpt10);

    var element1 = ElemCreation("","input","form-control me-5","txtLinearLow","","text");
    element1.setAttribute("placeholder","Label (Optional)");
    var element2 = ElemCreation("","input","form-control ms-5","txtLinearHigh","","text");
    element2.setAttribute("placeholder","Label (Optional)");
    var foo = document.getElementById("divRangeLabel");
    foo.appendChild(element1);
    foo.appendChild(element2);
  }

  if(value == "qtypedate"){
    qDiv.innerHTML="";

    var parentDiv = ElemCreation("","div","col-12 input-type mt-3","qtypedate","","");
    qDiv.appendChild(parentDiv);

    var element = ElemCreation("","input","form-control bg-transparent w-25","txtShortAnswer","","date");
    element.setAttribute("disabled","disabled");
    var foo = document.getElementById("qtypedate");
    foo.appendChild(element);
  }

  if(value == "qtypetime"){
    qDiv.innerHTML="";

    var parentDiv = ElemCreation("","div","col-12 input-type mt-3","qtypetime","","");
    qDiv.appendChild(parentDiv);

    var element = ElemCreation("","input","form-control bg-transparent w-25","txtShortAnswer","","time");
    element.setAttribute("disabled","disabled");
    var foo = document.getElementById("qtypetime");
    foo.appendChild(element);
  }

  if(value == "qtypemcqgrid"){
    qDiv.innerHTML="";

    var parentDiv = ElemCreation("","div","col-12 input-type mt-3","qtypemcqgrid","","");
    qDiv.appendChild(parentDiv);

    parentDiv = ElemCreation("","div","row","divMCQGridClassRow","","");
    var divRow = document.getElementById("qtypemcqgrid")
    divRow.appendChild(parentDiv)
    
    var divCol1 = ElemCreation("","div","col-md-6 my-2 my-md-0","divMCQGridRows","","");
    var divCol2 = ElemCreation("","div","col-md-6 my-2 my-md-0","divMCQGridCols","","");
    divRow = document.getElementById("divMCQGridClassRow")
    divRow.appendChild(divCol1)
    divRow.appendChild(divCol2)

    var spanRow = ElemCreation("","span","d-block fw-bold","","","");
    spanRow.innerHTML = "Rows"
    var rowtxtOL = ElemCreation("","ol","ps-2","McqRow","","");
    var btnAddRow = ElemCreation("","input","btn btn-primary p-1 btn-sm","","","button");
    btnAddRow.setAttribute("onclick","addMcqRow()")
    btnAddRow.setAttribute("value","Add Row")
    parentDiv = document.getElementById("divMCQGridRows")
    parentDiv.appendChild(spanRow)
    parentDiv.appendChild(rowtxtOL)
    parentDiv.appendChild(btnAddRow)

    var rowtxtLI = ElemCreation("","li","d-flex align-items-center","MCQRowLi1","","");
    parentDiv = document.getElementById("McqRow")
    parentDiv.appendChild(rowtxtLI)

    var element = ElemCreation("","input","form-control","txtMCQRow1","","text");
    element.setAttribute("placeholder","Enter Row Name");
    var foo = document.getElementById("MCQRowLi1");
    foo.appendChild(element);

    var spanCol = ElemCreation("","span","d-block fw-bold","","","");
    spanCol.innerHTML = "Columns"
    var coltxtOL = ElemCreation("","ol","ps-2","McqCol","","");
    var btnAddCol = ElemCreation("","input","btn btn-primary p-1 btn-sm","","","button");
    btnAddCol.setAttribute("onclick","addMcqCol()")
    btnAddCol.setAttribute("value","Add Column")
    parentDiv = document.getElementById("divMCQGridCols")
    parentDiv.appendChild(spanCol)
    parentDiv.appendChild(coltxtOL)
    parentDiv.appendChild(btnAddCol)

    var coltxtLI = ElemCreation("","li","d-flex align-items-center","MCQColLi1","","");
    parentDiv = document.getElementById("McqCol")
    parentDiv.appendChild(coltxtLI)

    var element1 = ElemCreation("","input","form-control","txtMCQCol1","","text");
    element1.setAttribute("placeholder","Enter Column Name");
    var foo1 = document.getElementById("MCQColLi1");
    foo1.appendChild(element1);
  }

  if(value == "qtypecheckgrid"){
    qDiv.innerHTML="";

    var parentDiv = ElemCreation("","div","col-12 input-type mt-3","qtypecheckgrid","","");
    qDiv.appendChild(parentDiv);

    parentDiv = ElemCreation("","div","row","divcheckGridClassRow","","");
    var divRow = document.getElementById("qtypecheckgrid")
    divRow.appendChild(parentDiv)
    
    var divCol1 = ElemCreation("","div","col-md-6 my-2 my-md-0","divcheckGridRows","","");
    var divCol2 = ElemCreation("","div","col-md-6 my-2 my-md-0","divcheckGridCols","","");
    divRow = document.getElementById("divcheckGridClassRow")
    divRow.appendChild(divCol1)
    divRow.appendChild(divCol2)

    var spanRow = ElemCreation("","span","d-block fw-bold","","","");
    spanRow.innerHTML = "Rows"
    var rowtxtOL = ElemCreation("","ol","ps-2","CheckRow","","");
    var btnAddRow = ElemCreation("","input","btn btn-primary p-1 btn-sm","","","button");
    btnAddRow.setAttribute("onclick","addCheckRow()")
    btnAddRow.setAttribute("value","Add Row")
    parentDiv = document.getElementById("divcheckGridRows")
    parentDiv.appendChild(spanRow)
    parentDiv.appendChild(rowtxtOL)
    parentDiv.appendChild(btnAddRow)

    var rowtxtLI = ElemCreation("","li","d-flex align-items-center","CheckRowLi1","","");
    parentDiv = document.getElementById("CheckRow")
    parentDiv.appendChild(rowtxtLI)

    var element = ElemCreation("","input","form-control","txtCheckRow1","","text");
    element.setAttribute("placeholder","Enter Row Name");
    var foo = document.getElementById("CheckRowLi1");
    foo.appendChild(element);

    var spanCol = ElemCreation("","span","d-block fw-bold","","","");
    spanCol.innerHTML = "Columns"
    var coltxtOL = ElemCreation("","ol","ps-2","CheckCol","","");
    var btnAddCol = ElemCreation("","input","btn btn-primary p-1 btn-sm","","","button");
    btnAddCol.setAttribute("onclick","addCheckCol()")
    btnAddCol.setAttribute("value","Add Column")
    parentDiv = document.getElementById("divcheckGridCols")
    parentDiv.appendChild(spanCol)
    parentDiv.appendChild(coltxtOL)
    parentDiv.appendChild(btnAddCol)

    var coltxtLI = ElemCreation("","li","d-flex align-items-center","CheckColLi1","","");
    parentDiv = document.getElementById("CheckCol")
    parentDiv.appendChild(coltxtLI)

    var element1 = ElemCreation("","input","form-control","txtCheckCol1","","text");
    element1.setAttribute("placeholder","Enter Column Name");
    var foo1 = document.getElementById("CheckColLi1");
    foo1.appendChild(element1);
  }
}
/* ---------- End Question Type Dropdown ---------- */

function test(){
  alert(mcqTxtCount);
  // alert(checkTxtCount);
}