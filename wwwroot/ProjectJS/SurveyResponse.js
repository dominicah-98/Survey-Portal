$(function () {
    let localurl = window.location.search;
    const url1 = new URLSearchParams(localurl);
    let idSurvey = url1.get("id");
    let surveyType = url1.get("type");
    Default();
    //let idSurvey = "";
    function Default() {
        let param = {
            IDSurvey: idSurvey,
        };
        let url2 = "Surveylistactivedetails";
        //let param2 = { IDSurvey: idSurvey };
        $.get(url2, param, function (data1) {
            //console.log(data1);
            data1.map(function (y) {
                $("#lblSurveyCode").text(y.code);
                $("#lblSurveyName").text(y.name);
                if (y.totalMarks < 10) {
                    $("#lblFullMarks").text("0" + y.totalMarks);
                }
                else {
                    $("#lblFullMarks").text(y.totalMarks);
                }
                $("#hdSurveyID").val(y.idSurvey);
                $("#hdSurveyCat").val(y.idCategory);
            });
        });
        //console.log(surveyType);
        //Normal Survey
        if (surveyType == 2) {
            $("#divNormalSurvey").removeClass("d-none");
            $("#divNormalSurvey").addClass("d-block");
            $("#divGenericSurvey").addClass("d-none");
            $("#divGenericSurvey").removeClass("d-block");
            $("#divAppraisalSurvey").addClass("d-none");
            $("#divAppraisalSurvey").removeClass("d-block");
            NormalSurvey(idSurvey);
        }
        //Generic Survey
        if (surveyType == 1) {
            $("#divNormalSurvey").addClass("d-none");
            $("#divNormalSurvey").removeClass("d-block");
            $("#divGenericSurvey").addClass("d-block");
            $("#divGenericSurvey").removeClass("d-none");
            $("#divAppraisalSurvey").addClass("d-none");
            $("#divAppraisalSurvey").removeClass("d-block");
            GenericSurvey(idSurvey);
        }
        //Appraisal Survey
        if (surveyType == 3) {
            $("#divNormalSurvey").addClass("d-none");
            $("#divNormalSurvey").removeClass("d-block");
            $("#divGenericSurvey").addClass("d-none");
            $("#divGenericSurvey").removeClass("d-block");
            $("#divAppraisalSurvey").addClass("d-block");
            $("#divAppraisalSurvey").removeClass("d-none");
            AppraisalSurvey(idSurvey);
        }
        //console.log(surveyType);
    }

    function NormalSurvey(idSurvey) {
        let param = {
            IDSurvey: idSurvey,
        };
        let url = "Surveyresponselist";
        $.get(url, param, function (data) {
            //console.log(data);
            data.map(function (x) {
                //console.log(x);
                ShowTable(x.userName, x.userEmail, x.response, x.totalMarksResult);
            });
        });
        let url3 = "SurveyEmpresponselist";
        $.get(url3, param, function (data) {
            //console.log(data);
            data.map(function (x) {
                //console.log(x);
                //ShowEmpTable(x.empID, x.deptID, x.response, x.totalMarksResult);
                let url = "EmpListInfo";
                let param2 = { "empno": x.empID };
                $.get(url, param2, function (data) {
                    //console.log(data);
                    data.map(function (y) {
                        //console.log(x);
                        let name = y.empfirstname + " " + y.empmiddlename + " " + y.emplastname;
                        ShowEmpTable(name, x.empID, x.deptID, x.response, x.retag, x.totalMarksResult);
                    });
                });
            });
        });
    }
    function GenericSurvey(idSurvey) {
        //let txt = "";
        let param = {
            IDSurvey: idSurvey,
        };

        let url2 = "Surveyresponseformquestion";
        $("#ddlQuestions").append("<option>Select</option>");
        $.get(url2, param, function (data) {
            //console.log(data);
            data.map(function (x) {
                //console.log(x);
                $("#ddlQuestions").append("<option value='" + x.questionNo + "'>" + x.questionText + "</option>");
            });
        });
    }
    function AppraisalSurvey(idSurvey) {
        let info2 = {};
        let param = {
            IDSurvey: idSurvey,
        };
        let url3 = "SurveyEmpresponselist";
        let url2 = "ResponsetblApprseeDetail";
        //Survey_Emp_Share
        $.get(url3, param, function (data) {
            //console.log(data);
            data.map(function (x) {
                //console.log(x);
                //ShowEmpTable(x.empID, x.deptID, x.response, x.totalMarksResult);
                info2 = { Appraisee: x.appraisee };
                let apprseeName = "";
                $.get(url2, info2, function (data) {
                    data.map(function (z) {
                        //console.log(z);
                        apprseeName = z.empfirstname + " " + z.empmiddlename + " " + z.emplastname;
                    });
                    let url = "EmpListInfo";
                    let param2 = { "empno": x.empID };
                    //Empbasic
                    $.get(url, param2, function (data) {
                        //console.log(data);
                        data.map(function (y) {
                            //console.log(y);
                            let name = y.empfirstname + " " + y.empmiddlename + " " + y.emplastname;
                            ShowApprEmpTable(name, x.empID, x.deptID, x.response, x.retag, x.totalMarksResult, apprseeName, x.appraisee);
                            //console.log(name, x.empID, x.deptID, x.response, x.retag, x.totalMarksResult, apprseeName, x.appraisee);
                        });
                    });
                });
                //console.log(apprseeName);
            });
        });
    }

    $("#ddlQuestions").on('change', function () {
        let qsnNo = $(this).find('option:selected').val();
        let param2 = {
            IDSurvey: idSurvey,
            QuestionNo: qsnNo
        };

        let url1 = "SurveyGenresponseformquestion";
        let url2 = "GenericSurveyList";

        let radioOpt1Count = 0;
        let radioOpt2Count = 0;
        let radioOpt3Count = 0;
        let radioOpt4Count = 0;

        let chkOpt1Count = 0;
        let chkOpt2Count = 0;
        let chkOpt3Count = 0;
        let chkOpt4Count = 0;

        let linearScaleResp = 0;
        let linearScaleRespBit = false;
        let linearCount = [];
        let objName = "";
        //let linerOptCount = 0;
        $.get(url1, param2, function (data) {
            //console.log(data);
            data.map(function (x) {
                //Questions
                //console.log(x);
                for (let i = x.linearScaleLow; i <= x.linearScaleHigh; i++) {
                    var obj = {};
                    obj["linearOpt"+i] = 0;
                    //objName = "linearOpt" + i;
                    linearCount.push(obj);
                    //if (y.linearScaleResp == i) {

                    //}
                }
                $.get(url2, param2, function (data) {
                    //console.log(data);
                    data.map(function (y) {
                        //Responses
                        console.log(y);

                        //Option
                        if (x.answerRadioText1 == y.answerRadioText) {
                            radioOpt1Count ++;
                        }
                        if (x.answerRadioText2 == y.answerRadioText) {
                            radioOpt2Count ++;
                        }
                        if (x.answerRadioText3 == y.answerRadioText) {
                            radioOpt3Count ++;
                        }
                        if (x.answerRadioText4 == y.answerRadioText) {
                            radioOpt4Count ++;
                        }

                        //CheckBox
                        if (y.answerCheckbox1 == true) {
                            chkOpt1Count++;
                        }
                        if (y.answerCheckbox2 == true) {
                            chkOpt2Count++;
                        }
                        if (y.answerCheckbox3 == true) {
                            chkOpt3Count++;
                        }
                        if (y.answerCheckbox4 == true) {
                            chkOpt4Count++;
                        }

                        //Linear Scale
                        if (y.linearScale == true) {
                            linearScaleRespBit = true;
                        }
                        linearScaleResp = y.linearScaleResp;
                        //console.log(linearScaleResp);
                        if (linearScaleRespBit == true) {
                            let linerOptCount = 0;
                            linearCount.map(function (c) {
                                for (let i = x.linearScaleLow; i <= x.linearScaleHigh; i++) {
                                    objName = "linearOpt" + i;

                                    if (linearScaleResp == i) {
                                        linerOptCount++;
                                        //console.log(linerOptCount);
                                        c[objName] = c[objName] + 1;
                                        //c[objName] += linerOptCount - 1;
                                    }
                                    //c[objName] = linerOptCount;
                                    if (isNaN(c[objName]) || c[objName] == null) {
                                        c[objName] = 0;
                                    }
                                    //if (c[objName] > 0) {
                                    //    console.log(c);
                                    //}
                                }
                                //console.log(linerOptCount);
                                //console.log(c);
                            });

                        }
                    });
                    
                    
                    //console.log(linearCount);
                    ShowGenQuestion(x.questionNo, x.questionType, x.questionText, x.questionDesc, x.answerType, x.answerText, x.answerTextMarks,
                        x.answerTextArea, x.answerTextAreaMarks, x.answerCheckbox1, x.answerCheckbox2,
                        x.answerCheckbox3, x.answerCheckbox4, x.answerCheckboxText1, x.answerCheckboxText2,
                        x.answerCheckboxText3, x.answerCheckboxText4, x.answerCheckbox1Marks, x.answerCheckbox2Marks,
                        x.answerCheckbox3Marks, x.answerCheckbox4Marks, x.answerRadio1, x.answerRadio2, x.answerRadio3, x.answerRadio4,
                        x.answerRadioText1, x.answerRadioText2, x.answerRadioText3, x.answerRadioText4, x.answerRadio1Marks, x.answerRadio2Marks,
                        x.answerRadio3Marks, x.answerRadio4Marks, x.linearScale, x.linearScaleLow, x.linearScaleLowLabel,
                        x.linearScaleHigh, x.linearScaleHighLabel, x.linearScaleMarks, linearScaleResp, 
                        radioOpt1Count, radioOpt2Count, radioOpt3Count, radioOpt4Count,
                        chkOpt1Count, chkOpt2Count, chkOpt3Count, chkOpt4Count, linearCount
                    );
                });
            });
        });


        //let url1 = "GenericSurveyList";
        //$.get(url1, param2, function (data) {
        //    //console.log(data);
        //    data.map(function (x) {
        //        //console.log(x);
        //        ShowGenericQuestion(x.answerText, x.answerTextMarksResult, x.answerTextArea, x.answerTextAreaMarksResult,
        //            x.answerCheckbox1, x.answerCheckbox2
        //        );
        //    });
        //});
    });
    function ShowTable(userName, userEmail, response, totalMarksResult) {
        let txt = "";
        txt = txt + "<tr>";
        //txt = txt + "<td>"+code+"</td>";
        txt = txt + "<td>" + userName +"</td>";
        txt = txt + "<td>" + userEmail + "</td>";
        if (response == 1) {
            txt = txt + "<td class='text-primary fw-bold'>" + response + "</td>";
            txt = txt + "<td>" + totalMarksResult + "</td>";
            txt = txt + "<td><a class='btnShowResponse btn btn-primary btn-sm' data-value=" + userEmail + ">Show Response</a></td>";
        }
        else {
            txt = txt + "<td class='text-danger'>" + response + "</td>";
            txt = txt + "<td>" + totalMarksResult + "</td>";
            txt = txt + "<td><label class='btn btn-light btn-sm text-secondary' disabled data-value=" + userEmail + ">Show Response</label></td>";
        }
        /*txt = txt + "<td><a class='lblShowResponse' href='' data-value=" + userEmail + ">Show Response</a></td>";*/
        //txt = txt + "<td>" + totalMarksResult + "</td>";
        txt = txt + "</tr>";

        $("#tblResponse").append(txt);
    }

    function ShowEmpTable(name, empID, deptID, response, retag, totalMarksResult) {
        
        let txt = "";
        txt = txt + "<tr>";
        //txt = txt + "<td>"+code+"</td>";
        txt = txt + "<td>" + name + "</td>";
        /*txt = txt + "<td>" + deptID + "</td>";*/
        if (response == 1) {
            txt = txt + "<td class='text-primary fw-bold'>" + response + "</td>";
        }
        else {
            txt = txt + "<td class='text-danger'>" + response + "</td>";
        }
        if (retag == 1) {
            txt = txt + "<td class=''><span class='card-icon text-secondary bg-blue px-2 rounded-sm'>Retagged</span></td>";
        }
        else {
            txt = txt + "<td class=''><span class='card-icon text-secondary bg-custom-secondary px-2 rounded-sm d-none'>Not Retagged</span></td>";
        }
        txt = txt + "<td>" + totalMarksResult + "</td>";
        if (response == 1) {
            txt = txt + "<td><a class='btnShowResponse btn btn-primary btn-sm' data-value=" + empID + " id='"+retag+"'>Show Response</a></td>";
        }
        else {
            txt = txt + "<td><label class='btn btn-light btn-sm text-secondary' disabled data-value=" + empID + ">Show Response</label></td>";
        }
        /*txt = txt + "<td><a class='lblShowResponse' href='' data-value=" + userEmail + ">Show Response</a></td>";*/
        //txt = txt + "<td>" + totalMarksResult + "</td>";
        txt = txt + "</tr>";

        $("#tblResponseEmp").append(txt);
    }
    //$("#btnSurveyList").on('click', function () {
    //    let idSurvey = $(this).attr("data-value");
    //    let localurl = window.location.search;
    //    const url = localurl + '/SurveyResponse?id=' + idSurvey;
    //    window.location.href = url;
    //});

    //Response Modal
    //Outside Response
    $("#tblResponse").on('click', '.btnShowResponse', function () {
        let userEmail = $(this).attr("data-value");
        let idSurvey = $("#hdSurveyID").val();
        let param = { IDSurvey: idSurvey };
        let url = "SurveyshowformInfo";
        $.ajaxSetup({ async: false });
        $.get(url, param, function (data) {
            //console.log(data);
            //$("#QuestionContainer").empty();
            //let index = 1;
            //let divName = "";
            data.map(function (x) {
                //divName = "question" + index;
                //console.log(x);
                $("#lblHeaderDetail").text(x.code);
                $("#lblTitle").text(x.name);
                $("#lblDescription").text(x.remarks);
                $("#hdIDSurveyDetail").val(x.idSurvey);
                $("#ModalSurveyResponse").modal('show');

                let url2 = "Surveyresponseformquestion";
                
                let url3 = "Surveyuserresponse";
                let param2 = {
                    UserEmail: userEmail,
                    IDSurvey: idSurvey
                }
                $.get(url3, param2, function (data2) {
                    //console.log(data2);
                    data2.map(function (z) {
                        //console.log(z);
                        $("#UserContainer").empty();
                        ShowResponse(z.userName, z.userEmail);

                        $.get(url2, param, function (data1) {
                            //console.log(data1);
                            $("#QuestionContainer").empty();
                            let index = 1;
                            let divName = "";
                            //UserDetails();
                            data1.map(function (y) {
                                divName = "question" + index;
                                //console.log(y);
                                ShowGenQuestion(y.questionNo, y.questionType, y.questionText, y.questionDesc, y.answerType,
                                    z.answerText, y.answerTextMarks, z.answerTextMarksResult, z.answerTextArea, y.answerTextAreaMarks, z.answerTextAreaMarksResult,
                                    z.answerCheckbox1, z.answerCheckbox2, z.answerCheckbox3, z.answerCheckbox4,
                                    y.answerCheckboxText1, y.answerCheckboxText2, y.answerCheckboxText3, y.answerCheckboxText4,
                                    y.answerCheckbox1Marks, y.answerCheckbox2Marks, y.answerCheckbox3Marks, y.answerCheckbox4Marks,
                                    z.answerCheckbox1MarksResult, z.answerCheckbox2MarksResult, z.answerCheckbox3MarksResult, z.answerCheckbox4MarksResult,
                                    y.answerRadio1, y.answerRadio2, y.answerRadio3, y.answerRadio4,
                                    y.answerRadioText1, y.answerRadioText2, y.answerRadioText3, y.answerRadioText4,
                                    y.answerRadio1Marks, y.answerRadio2Marks, y.answerRadio3Marks, y.answerRadio4Marks,
                                    z.answerRadio, z.answerRadioText, z.answerRadioMarksResult, divName);
                                //if (y.questionNo == 1) {
                                //    console.log('test');
                                //}
                                index++;
                            });
                        });
                    });
                });
            });
        });
    });

    //Employee Response
    $("#tblResponseEmp").on('click', '.btnShowResponse', function () {
        let userEmail = $(this).attr("data-value");
        let retag = $(this).attr("id");
        let idSurvey = $("#hdSurveyID").val();
        let param = { IDSurvey: idSurvey };
        let url = "SurveyshowformInfo";
        $.get(url, param, function (data) {
            //console.log(data);
            //$("#QuestionContainer").empty();
            //let index = 1;
            //let divName = "";
            data.map(function (x) {
                //divName = "question" + index;
                //console.log(x);
                $("#lblHeaderDetail").text(x.code);
                $("#lblTitle").text(x.name);
                $("#lblDescription").text(x.remarks);
                $("#hdIDSurveyDetail").val(x.idSurvey);
                $("#ModalSurveyResponse").modal('show');

                let url2 = "Surveyresponseformquestion";
                
                let url3 = "SurveyEmpuserresponse";
                let param2 = {
                    EmpID: userEmail,
                    IDSurvey: idSurvey,
                    Retag: retag
                }
                //console.log(param2);
                $.get(url3, param2, function (data2) {
                    //console.log(data2);
                    data2.map(function (z) {
                        console.log(z);
                        $("#UserContainer").empty();
                        ShowResponse(z.userName, z.userEmail, userEmail, retag);

                        $.get(url2, param, function (data1) {
                            //console.log(data1);
                            $("#QuestionContainer").empty();
                            let index = 1;
                            let divName = "";
                            //UserDetails();
                            data1.map(function (y) {
                                divName = "question" + index;
                                //console.log(y);
                                ShowQuestion(y.questionNo, y.questionType, y.questionText, y.questionDesc, y.answerType,
                                    z.answerText, y.answerTextMarks, z.answerTextMarksResult, z.answerTextArea, y.answerTextAreaMarks, z.answerTextAreaMarksResult,
                                    z.answerCheckbox1, z.answerCheckbox2, z.answerCheckbox3, z.answerCheckbox4,
                                    y.answerCheckboxText1, y.answerCheckboxText2, y.answerCheckboxText3, y.answerCheckboxText4,
                                    y.answerCheckbox1Marks, y.answerCheckbox2Marks, y.answerCheckbox3Marks, y.answerCheckbox4Marks,
                                    z.answerCheckbox1MarksResult, z.answerCheckbox2MarksResult, z.answerCheckbox3MarksResult, z.answerCheckbox4MarksResult, z.checkBoxRemarks,
                                    y.answerRadio1, y.answerRadio2, y.answerRadio3, y.answerRadio4, z.radioRemarks,
                                    y.answerRadioText1, y.answerRadioText2, y.answerRadioText3, y.answerRadioText4,
                                    y.answerRadio1Marks, y.answerRadio2Marks, y.answerRadio3Marks, y.answerRadio4Marks,
                                    z.answerRadio, z.answerRadioText, z.answerRadioMarksResult, z.linearScale, z.linearScaleResp, z.linearScaleRemarks, z.linearScaleMarksResult,
                                    y.linearScale, y.linearScaleHigh, y.linearScaleHighLabel, y.linearScaleLow, y.linearScaleLowLabel, y.linearScaleMarks, divName);
                                //if (y.questionNo == 1) {
                                //    console.log('test');
                                //}
                                index++;
                            });
                        });
                    });
                });
            });
        });
    });
    function ShowQuestion(questionno, questionType, questionText, questionDesc, answerType, answerTextResp,
        answerTextMarks, answerTextMarksResult, answerTextAreaResp, answerTextAreaMarks, answerTextAreaMarksResult,
        answerCheckbox1, answerCheckbox2, answerCheckbox3, answerCheckbox4,
        answerCheckboxText1, answerCheckboxText2, answerCheckboxText3, answerCheckboxText4,
        answerCheckbox1Marks, answerCheckbox2Marks, answerCheckbox3Marks, answerCheckbox4Marks,
        Checkbox1MarksResult, Checkbox2MarksResult, Checkbox3MarksResult, Checkbox4MarksResult, checkBoxRemarks,
        answerRadio1, answerRadio2, answerRadio3, answerRadio4, radioRemarks, answerRadioText1, answerRadioText2, answerRadioText3,
        answerRadioText4, answerRadio1Marks, answerRadio2Marks, answerRadio3Marks, answerRadio4Marks,
        radioResp, radiotextResp, radiomarksResp, boollinearScale, linearScaleResp, linearScaleRemarks, linearScaleMarksResult,
        mboollinearScale, linearScaleHigh, linearScaleHighLabel, linearScaleLow, linearScaleLowLabel, linearScaleMarks, contentDivID) {
        let txt = "";
        txt = txt + "<div id=question" + questionno + " data-value=" + questionno + ">";
        txt = txt + "<div class='card mb-2'>";
        txt = txt + "<div class='card-body'>";

        txt = txt + "<input type='hidden' id='txtQuestionType' class='form-control form-control-sm'/>";

        txt = txt + "<div class='row mb-2'>";
        txt = txt + "<div class='col-md-2'><label>Question</label></div>";
        txt = txt + "<div class='col-md-10'><label id='lblQuestionText' class='fs-6' style='font-weight: 500;'/></label>";
        txt = txt + "<input type='hidden' id='txtAnswerType' class='form-control form-control-sm'/>";
        txt = txt + "</div>";
        txt = txt + "</div>";

        txt = txt + "<div class='row mb-2'>";
        txt = txt + "<div class='col-md-2'><label>Description</label></div>";
        txt = txt + "<div class='col-md-10'><label id='lblQuestionDesc' class='fs-6'/></label>";
        txt = txt + "<input type='hidden' id='txtAnswerType' class='form-control form-control-sm'/>";
        txt = txt + "</div>";
        txt = txt + "</div>";

        txt = txt + "<input type='hidden' id='txtQuestionDescription' class='form-control form-control-sm'/>";
        txt = txt + "<div id='answer" + questionno + "'>";
        txt = txt + "<select id='ddlAnswerType' class='form-select form-select-sm AnswerType' data-value=" + questionno + " style='display:none;'></select>";
        txt = txt + "<div id='answertype" + questionno + "'>";
        txt = txt + "</div>";
        txt = txt + "</div>";
        txt = txt + "</div>";
        txt = txt + "</div>";
        txt = txt + "</div>";
        txt = txt + "</div>";
        txt = txt + "</div>";
        $("#QuestionContainer").append(txt);

        //console.log($("#" + contentDivID).find("#txtQuestionText"));
        $("#" + contentDivID).find("#lblQuestionText").text(questionText);
        $("#" + contentDivID).find("#lblQuestionDesc").text(questionDesc);
        $("#" + contentDivID).find("#txtAnswerType").val(answerType);
        $("#" + contentDivID).find("#txtQuestionType").val(questionType);

        let txt1 = '';
        let value = answerType;
        let idno = questionno;
        // Answer Type append
        if (value == 'SHORT ANSWER') {
            txt1 = txt1 + "<div class='d-flex align-items-end mt-3 '>";
            txt1 = txt1 + "<input type='text' id='txtAnswer' class='form-control form-control-sm mt-2 fs-6 bg-white' readonly>";
            txt1 = txt1 + "<div id='divMarks' class='ms-2'>";
            txt1 = txt1 + "<label id='lbltxtmarks' class='fs-6' style='font-weight: 500;'>Full Marks:" + answerTextMarks +"</label>";
            txt1 = txt1 + "<input type='number' id='txtmarks1' class='form-control form-control-sm fw-bold' placeholder='Marks'>";
            txt1 = txt1 + "</div>";
            txt1 = txt1 + "</div>";
        }
        else if (value == 'PARAGRAPH') {
            txt1 = txt1 + "<div class='d-flex align-items-end mt-3 '>";
            txt1 = txt1 + "<textarea id='txtParagraph' class='form-control form-control-sm mt-2 fs-6 bg-white' readonly></textarea>";
            txt1 = txt1 + "<div id='divMarks' class='ms-2'>";
            txt1 = txt1 + "<label id='lbltxtmarks' class='fs-6' style='font-weight: 500;'>Full Marks:" + answerTextAreaMarks + "</label>";
            txt1 = txt1 + "<input type='number' id='txtmarks1' class='form-control form-control-sm fw-bold' placeholder='Marks'>";
            txt1 = txt1 + "</div>";
            txt1 = txt1 + "</div>";
        }
        else if (value == 'CHECKBOX') {
            txt1 = txt1 + "<div class='d-flex align-items-center'>";
            txt1 = txt1 + "<div class='mt-3 w-25'>";
            if (answerCheckboxText1 != "") {
                txt1 = txt1 + "<div class='my-1 d-flex align-items-center justify-content-between'>";
                txt1 = txt1 + "<div id='chkdiv1'><input type='checkbox' id='chk1' class='form-check-input me-2 mt-0 opacity-100' disabled><label id='lbl1' class='form-check-label fs-6 opacity-100'>" + answerCheckboxText1 + "</label></div><label id='lblmarks1' class='form-check-label fs-6' style='font-weight: 500;'>" + answerCheckbox1Marks +"</label>";
                txt1 = txt1 + "</div>";
            }
            if (answerCheckboxText2 != "") {
                txt1 = txt1 + "<div class='my-1 d-flex align-items-center justify-content-between'>";
                txt1 = txt1 + "<div id='chkdiv2'><input type='checkbox' id='chk2' class='form-check-input me-2 mt-0 opacity-100' disabled><label id='lbl2' class='form-check-label fs-6 opacity-100'>" + answerCheckboxText2 + "</label></div><label id='lblmarks2' class='form-check-label fs-6' style='font-weight: 500;'>" + answerCheckbox2Marks +"</label>";
                txt1 = txt1 + "</div>";
            }
            if (answerCheckboxText3 != "") {
                txt1 = txt1 + "<div class='my-1 d-flex align-items-center justify-content-between'>";
                txt1 = txt1 + "<div id='chkdiv3'><input type='checkbox' id='chk3' class='form-check-input me-2 mt-0 opacity-100' disabled><label id='lbl3' class='form-check-label fs-6 opacity-100'>" + answerCheckboxText3 + "</label></div><label id='lblmarks3' class='form-check-label fs-6' style='font-weight: 500;'>" + answerCheckbox3Marks +"</label>";
                txt1 = txt1 + "</div>";
            }
            if (answerCheckboxText4 != "") {
                txt1 = txt1 + "<div class='my-1 d-flex align-items-center justify-content-between'>";
                txt1 = txt1 + "<div id='chkdiv4'><input type='checkbox' id='chk4' class='form-check-input me-2 mt-0 opacity-100' disabled><label id='lbl4' class='form-check-label fs-6 opacity-100'>" + answerCheckboxText4 + "</label></div><label id='lblmarks4' class='form-check-label fs-6' style='font-weight: 500;'>" + answerCheckbox4Marks +"</label>";
                txt1 = txt1 + "</div>";
            }
            txt1 = txt1 + "</div>";
            txt1 = txt1 + "<div id='chkdivMarks' class='ms-4'><label class='fs-6' style='font-weight: 500;'>Marks Got:</label>";
            txt1 = txt1 + "<input type='number' id='txtmarks1' class='form-control form-control-sm' style='font-weight: 500;' placeholder='Marks' readonly>";
            txt1 = txt1 + "</div>";
            txt1 = txt1 + "</div>";
            txt1 = txt1 + "<div class='mt-3'>";
            txt1 = txt1 + "<textarea id='txtCheckRemarks' class='form-control form-control-sm mt-2 fs-6 bg-white' readonly></textarea>";
            txt1 = txt1 + "</div>";
        }
        else if (value == 'OPTION') {
            txt1 = txt1 + "<div class='d-flex align-items-center'>";
            txt1 = txt1 + "<div class='mt-3 w-25'>";
            if (answerRadioText1 != '') {
                txt1 = txt1 + "<div class='my-1 d-flex align-items-center justify-content-between'>";
                txt1 = txt1 + "<div id='optdiv1'><input type='radio' id='opt1' class='form-check-input me-2 mt-0 opacity-100' disabled><label id='lbl1' class='form-check-label fs-6 opacity-100'>" + answerRadioText1 +"</label></div><label id='lblmarks1' class='form-check-label fs-6' style='font-weight: 500;'>" + answerRadio1Marks +"</label>";
                txt1 = txt1 + "</div>";
            }
            if (answerRadioText2 != "") {
                txt1 = txt1 + "<div class='my-1 d-flex align-items-center justify-content-between'>";
                txt1 = txt1 + "<div id='optdiv2'><input type='radio' id='opt2' class='form-check-input me-2 mt-0 opacity-100' disabled><label id='lbl2' class='form-check-label fs-6 opacity-100'>" + answerRadioText2 +"</label></div><label id='lblmarks2' class='form-check-label fs-6' style='font-weight: 500;'>" + answerRadio2Marks +"</label>";
                txt1 = txt1 + "</div>";
            }
            if (answerRadioText3 != "") {
                txt1 = txt1 + "<div class='my-1 d-flex align-items-center justify-content-between'>";
                txt1 = txt1 + "<div id='optdiv3'><input type='radio' id='opt3' class='form-check-input me-2 mt-0 opacity-100' disabled><label id='lbl3' class='form-check-label fs-6 opacity-100'>" + answerRadioText3 +"</label></div><label id='lblmarks3' class='form-check-label fs-6' style='font-weight: 500;'>" + answerRadio3Marks +"</label>";
                txt1 = txt1 + "</div>";
            }
            if (answerRadioText4 != "") {
                txt1 = txt1 + "<div class='my-1 d-flex align-items-center justify-content-between'>";
                txt1 = txt1 + "<div id='optdiv4'><input type='radio' id='opt4' class='form-check-input me-2 mt-0 opacity-100' disabled><label id='lbl4' class='form-check-label fs-6 opacity-100'>" + answerRadioText4 +"</label></div><label id='lblmarks4' class='form-check-label fs-6' style='font-weight: 500;'>" + answerRadio4Marks +"</label>";
                txt1 = txt1 + "</div>";
            }
            txt1 = txt1 + "</div>";
            txt1 = txt1 + "<div id='optdivMarks' class='ms-4'><label class='fs-6' style='font-weight: 500;'>Marks Got:</label>";
            txt1 = txt1 + "<input type='number' id='txtmarks1' class='form-control form-control-sm' style='font-weight: 500;' placeholder='Marks'>";
            txt1 = txt1 + "</div>";
            txt1 = txt1 + "</div>";
            txt1 = txt1 + "<div class='mt-3'>";
            txt1 = txt1 + "<textarea id='txtRadioRemarks' class='form-control form-control-sm mt-2 fs-6 bg-white' readonly></textarea>";
            txt1 = txt1 + "</div>";
        }
        else if (value == 'LINEAR SCALE') {
            txt1 = txt1 + "<div class='mt-3'>";
            txt1 = txt1 + "<div class='d-flex align-items-center justify-content-center'>";
            txt1 = txt1 + "<label class='d-block fs-6 me-2'>" + linearScaleLowLabel + "</label>";
            for (let i = linearScaleLow; i <= linearScaleHigh; i++) {
                txt1 = txt1 + "<div class='text-center mx-2'>";
                txt1 = txt1 + "<label id='lbl4' class='form-check-label fs-6 d-block fw-bold'>" + i + "</label>";
                if (linearScaleResp == i) {
                    txt1 = txt1 + "<input type='radio' id='linearopt" + i + "' class='form-check-input mt-0 d-block opacity-100' name='" + questionText + "' value='" + i + "' checked disabled>";
                }
                else {
                    txt1 = txt1 + "<input type='radio' id='linearopt" + i + "' class='form-check-input mt-0 d-block opacity-100' name='" + questionText + "' value='" + i + "' disabled>";
                }
                txt1 = txt1 + "</div>";
            }
            txt1 = txt1 + "<label class='d-block fs-6 ms-2'>" + linearScaleHighLabel + "</label>";
            txt1 = txt1 + "</div>";
            txt1 = txt1 + "<div class='d-flex align-items-end mt-3 '>";
            txt1 = txt1 + "<textarea id='txtRangeRemarks' class='form-control form-control-sm mt-2 fs-6 bg-white' readonly></textarea>";
            txt1 = txt1 + "<div id='divMarks' class='ms-2'>";
            txt1 = txt1 + "<label id='lbltxtmarks' class='fs-6' style='font-weight: 500;'>Full Marks:" + linearScaleMarks + "</label>";
            txt1 = txt1 + "<input type='number' id='txtmarks1' class='form-control form-control-sm fw-bold' placeholder='Marks'>";
            txt1 = txt1 + "</div>";
            txt1 = txt1 + "</div>";
            txt1 = txt1 + "</div>";

        }

        $("#QuestionContainer #answertype" + idno).empty();
        $("#QuestionContainer #answertype" + idno).append(txt1);

        $("#" + contentDivID).find("#txtRangeRemarks").val(linearScaleRemarks);
        $("#" + contentDivID).find("#txtRangeRemarks ~ #divMarks > #txtmarks1").val(linearScaleMarksResult);
        $("#" + contentDivID).find("#txtAnswer").val(answerTextResp);
        $("#" + contentDivID).find("#txtAnswer ~ #divMarks > #txtmarks1").val(answerTextMarksResult);
        $("#" + contentDivID).find("#txtParagraph").val(answerTextAreaResp);
        $("#" + contentDivID).find("#txtRadioRemarks").val(radioRemarks);

        //Radio box value
        if (radioResp == 1) {
            if (radiotextResp == answerRadioText1) {
                $("#" + contentDivID).find("#opt1").attr("checked", "true");
            }
            if (radiotextResp == answerRadioText2) {
                $("#" + contentDivID).find("#opt2").attr("checked", "true");
            }
            if (radiotextResp == answerRadioText3) {
                $("#" + contentDivID).find("#opt3").attr("checked", "true");
            }
            if (radiotextResp == answerRadioText4) {
                $("#" + contentDivID).find("#opt4").attr("checked", "true");
            }
        }

        $("#" + contentDivID).find("#optdivMarks > #txtmarks1").val(radiomarksResp);
        $("#" + contentDivID).find("#optdivMarks > #txtmarks1").val(radiomarksResp);

        //Checkbox value
        if (answerCheckbox1 == 1) {
            $("#" + contentDivID).find("#chk1").attr("checked", "true");
        }
        if (answerCheckbox2 == 1) {
            $("#" + contentDivID).find("#chk2").attr("checked", "true");
        }
        if (answerCheckbox3 == 1) {
            $("#" + contentDivID).find("#chk3").attr("checked", "true");
        }
        if (answerCheckbox4 == 1) {
            $("#" + contentDivID).find("#chk4").attr("checked", "true");
        }

        let checkboxAnswer = Checkbox1MarksResult + Checkbox2MarksResult + Checkbox3MarksResult + Checkbox4MarksResult;
        $("#" + contentDivID).find("#chkdivMarks > #txtmarks1").val(checkboxAnswer);
        $("#" + contentDivID).find("#txtCheckRemarks").val(checkBoxRemarks);
    }
    function ShowResponse(userName, userEmail, userId, retag) {
        //console.log(userId);
        let txt = "";
        txt = txt + "<div class='card mb-2'>";
        txt = txt + "<div class='card-body'>";

        txt = txt + "<div class='row mb-2'>";
        txt = txt + "<div class='col-md-2'><label class=''/>User Full Name</label></div>";
        txt = txt + "<div class='col-md-10'><label id='lblUserName' class='fs-6' style='font-weight: 500;'>" + userName + "</label>";
        txt = txt + "</div>";
        txt = txt + "</div>";

        txt = txt + "</div>";
        txt = txt + "</div>";

        txt = txt + "<div class='card mb-2'>";
        txt = txt + "<div class='card-body'>";

        txt = txt + "<div class='row mb-2'>";
        txt = txt + "<div class='col-md-2'><label>User Mail ID</label></div>";
        txt = txt + "<div class='col-md-10'><label id='lblUserEmail' class='fs-6' style='font-weight: 500;'/>" + userEmail + "</label>";
        txt = txt + "<div class='col-md-10'><input type='hidden' id='txtUserID' /> <label id='lblRetag' class='fs-6 d-none'/>" + retag + "</label>";
        txt = txt + "</div>";
        txt = txt + "</div>";

        txt = txt + "</div>";
        txt = txt + "</div>";
        $("#UserContainer").append(txt);
        $("#txtUserID").val(userId);
    }

    function ShowGenQuestion(questionno, questionType, questionText, questionDesc, answerType, answerText, answerTextMarks,
        answerTextArea, answerTextAreaMarks, answerCheckbox1, answerCheckbox2, answerCheckbox3, answerCheckbox4,
        answerCheckboxText1, answerCheckboxText2, answerCheckboxText3, answerCheckboxText4, answerCheckbox1Marks,
        answerCheckbox2Marks, answerCheckbox3Marks, answerCheckbox4Marks, answerRadio1, answerRadio2, answerRadio3,
        answerRadio4, answerRadioText1, answerRadioText2, answerRadioText3, answerRadioText4, answerRadio1Marks,
        answerRadio2Marks, answerRadio3Marks, answerRadio4Marks, linearScale, linearScaleLow, linearScaleLowLabel,
        linearScaleHigh, linearScaleHighLabel, linearScaleMarks, linearScaleResp, 
        radioOpt1Count, radioOpt2Count, radioOpt3Count, radioOpt4Count,
        chkOpt1Count, chkOpt2Count, chkOpt3Count, chkOpt4Count, linearCount) {
        let txt = "";
        txt = txt + "<div id=question" + questionno + " data-value=" + questionno + ">";
        txt = txt + "<div class='card mb-2'>";
        txt = txt + "<div class='card-body'>";

        txt = txt + "<input type='hidden' id='txtQuestionType' class='form-control form-control-sm'/>";

        txt = txt + "<div class='row mb-2'>";
        txt = txt + "<div class='col-md-2'><label>Question</label></div>";
        txt = txt + "<div class='col-md-10'><label id='lblQuestionText' class='fs-6' style='font-weight: 500;'/></label>";
        txt = txt + "<input type='hidden' id='txtAnswerType' class='form-control form-control-sm'/>";
        txt = txt + "</div>";
        txt = txt + "</div>";

        txt = txt + "<div class='row mb-2'>";
        txt = txt + "<div class='col-md-2'><label>Description</label></div>";
        txt = txt + "<div class='col-md-10'><label id='lblQuestionDesc' class='fs-6'/></label>";
        txt = txt + "<input type='hidden' id='txtAnswerType' class='form-control form-control-sm'/>";
        txt = txt + "</div>";
        txt = txt + "</div>";

        txt = txt + "<input type='hidden' id='txtQuestionDescription' class='form-control form-control-sm'/>";
        txt = txt + "<div id='answer" + questionno + "'>";
        txt = txt + "<select id='ddlAnswerType' class='form-select form-select-sm AnswerType' data-value=" + questionno + " style='display:none;'></select>";
        txt = txt + "<div id='answertype" + questionno + "'>";
        txt = txt + "</div>";
        txt = txt + "</div>";
        txt = txt + "</div>";
        txt = txt + "</div>";
        txt = txt + "</div>";
        txt = txt + "</div>";
        txt = txt + "</div>";
        $("#divQuestionDetails").empty();
        $("#divQuestionDetails").append(txt);

        //console.log($("#" + contentDivID).find("#txtQuestionText"));
        $("#divQuestionDetails").find("#lblQuestionText").text(questionText);
        $("#divQuestionDetails").find("#lblQuestionDesc").text(questionDesc);
        $("#divQuestionDetails").find("#txtAnswerType").val(answerType);
        $("#divQuestionDetails").find("#txtQuestionType").val(questionType);

        let txt1 = '';
        let value = answerType;
        let idno = questionno;
        // Answer Type append
        if (value == 'SHORT ANSWER') {
            txt1 = txt1 + "<div class='d-flex align-items-end mt-3 '>";
            txt1 = txt1 + "<input type='text' id='txtAnswer' class='form-control form-control-sm mt-2 fs-6' readonly>";
            txt1 = txt1 + "<div id='divMarks' class='ms-2'>";
            txt1 = txt1 + "<label id='lbltxtmarks' class='fs-6' style='font-weight: 500;'>Full Marks:" + answerTextMarks + "</label>";
            txt1 = txt1 + "<input type='number' id='txtmarks1' class='form-control form-control-sm fw-bold' placeholder='Marks'>";
            txt1 = txt1 + "</div>";
            txt1 = txt1 + "</div>";
        }
        else if (value == 'PARAGRAPH') {
            txt1 = txt1 + "<div class='d-flex align-items-end mt-3 '>";
            txt1 = txt1 + "<textarea id='txtParagraph' class='form-control form-control-sm mt-2 fs-6' readonly></textarea>";
            txt1 = txt1 + "<div id='divMarks' class='ms-2'>";
            txt1 = txt1 + "<label id='lbltxtmarks' class='fs-6' style='font-weight: 500;'>Full Marks:" + answerTextAreaMarks + "</label>";
            txt1 = txt1 + "<input type='number' id='txtmarks1' class='form-control form-control-sm fw-bold' placeholder='Marks'>";
            txt1 = txt1 + "</div>";
            txt1 = txt1 + "</div>";
        }
        else if (value == 'CHECKBOX') {
            txt1 = txt1 + "<div class='d-flex align-items-center'>";
            txt1 = txt1 + "<div class='mt-3 w-25'>";
            if (answerCheckboxText1 != "") {
                txt1 = txt1 + "<div class='my-1 d-flex align-items-center justify-content-between'>";
                txt1 = txt1 + "<div id='chkdiv1'><input type='checkbox' id='chk1' class='form-check-input me-2 mt-0' readonly><label id='lbl1' class='form-check-label fs-6'>" + answerCheckboxText1 + "</label></div><label id='lblmarks1' class='form-check-label fs-6'>Total <span style='font-weight: 500;'>" + chkOpt1Count + "</span> Response(s)</label>";
                txt1 = txt1 + "</div>";
            }
            if (answerCheckboxText2 != "") {
                txt1 = txt1 + "<div class='my-1 d-flex align-items-center justify-content-between'>";
                txt1 = txt1 + "<div id='chkdiv2'><input type='checkbox' id='chk2' class='form-check-input me-2 mt-0' readonly><label id='lbl2' class='form-check-label fs-6'>" + answerCheckboxText2 + "</label></div><label id='lblmarks2' class='form-check-label fs-6'>Total <span style='font-weight: 500;'>" + chkOpt2Count + "</span> Response(s)</label>";
                txt1 = txt1 + "</div>";
            }
            if (answerCheckboxText3 != "") {
                txt1 = txt1 + "<div class='my-1 d-flex align-items-center justify-content-between'>";
                txt1 = txt1 + "<div id='chkdiv3'><input type='checkbox' id='chk3' class='form-check-input me-2 mt-0' readonly><label id='lbl3' class='form-check-label fs-6'>" + answerCheckboxText3 + "</label></div><label id='lblmarks3' class='form-check-label fs-6'>Total <span style='font-weight: 500;'>" + chkOpt3Count + "</span> Response(s)</label>";
                txt1 = txt1 + "</div>";
            }
            if (answerCheckboxText4 != "") {
                txt1 = txt1 + "<div class='my-1 d-flex align-items-center justify-content-between'>";
                txt1 = txt1 + "<div id='chkdiv4'><input type='checkbox' id='chk4' class='form-check-input me-2 mt-0' readonly><label id='lbl4' class='form-check-label fs-6'>" + answerCheckboxText4 + "</label></div><label id='lblmarks4' class='form-check-label fs-6' >Total <span style='font-weight: 500;'>" + chkOpt4Count + "</span> Response(s)</label>";
                txt1 = txt1 + "</div>";
            }
            txt1 = txt1 + "</div>";
            //txt1 = txt1 + "<div id='chkdivMarks' class='ms-4'><label class='fs-6' style='font-weight: 500;'>Marks Got:</label>";
            //txt1 = txt1 + "<input type='number' id='txtmarks1' class='form-control form-control-sm' style='font-weight: 500;' placeholder='Marks'>";
            txt1 = txt1 + "</div>";
            txt1 = txt1 + "</div>";
            //txt1 = txt1 + "<div class='mt-3'>";
            //txt1 = txt1 + "<textarea id='txtCheckRemarks' class='form-control form-control-sm mt-2 fs-6'></textarea>";
            //txt1 = txt1 + "</div>";
        }
        else if (value == 'OPTION') {
            txt1 = txt1 + "<div class='d-flex align-items-center'>";
            txt1 = txt1 + "<div class='mt-3 w-50'>";
            if (answerRadioText1 != '') {
                txt1 = txt1 + "<div class='my-1 d-flex align-items-center justify-content-between'>";
                txt1 = txt1 + "<div id='optdiv1'><input type='radio' id='opt1' class='form-check-input me-2 mt-0'><label id='lbl1' class='form-check-label fs-6'>" + answerRadioText1 + "</label></div><label id='lblmarks1' class='form-check-label fs-6'>Total <span style='font-weight: 500;'>" + radioOpt1Count + "</span> Response(s)</label>";
                txt1 = txt1 + "</div>";
            }
            if (answerRadioText2 != "") {
                txt1 = txt1 + "<div class='my-1 d-flex align-items-center justify-content-between'>";
                txt1 = txt1 + "<div id='optdiv2'><input type='radio' id='opt2' class='form-check-input me-2 mt-0'><label id='lbl2' class='form-check-label fs-6'>" + answerRadioText2 + "</label></div><label id='lblmarks2' class='form-check-label fs-6'>Total <span style='font-weight: 500;'>" + radioOpt2Count + "</span> Response(s)</label>";
                txt1 = txt1 + "</div>";
            }
            if (answerRadioText3 != "") {
                txt1 = txt1 + "<div class='my-1 d-flex align-items-center justify-content-between'>";
                txt1 = txt1 + "<div id='optdiv3'><input type='radio' id='opt3' class='form-check-input me-2 mt-0'><label id='lbl3' class='form-check-label fs-6'>" + answerRadioText3 + "</label></div><label id='lblmarks3' class='form-check-label fs-6'>Total <span style='font-weight: 500;'>" + radioOpt3Count + "</span> Response(s)</label>";
                txt1 = txt1 + "</div>";
            }
            if (answerRadioText4 != "") {
                txt1 = txt1 + "<div class='my-1 d-flex align-items-center justify-content-between'>";
                txt1 = txt1 + "<div id='optdiv4'><input type='radio' id='opt4' class='form-check-input me-2 mt-0'><label id='lbl4' class='form-check-label fs-6'>" + answerRadioText4 + "</label></div><label id='lblmarks4' class='form-check-label fs-6'>Total <span style='font-weight: 500;'>" + radioOpt4Count + "</span> Response(s)</label>";
                txt1 = txt1 + "</div>";
            }
            txt1 = txt1 + "</div>";
            //txt1 = txt1 + "<div id='optdivMarks' class='ms-4'><label class='fs-6' style='font-weight: 500;'>Marks Got:</label>";
            //txt1 = txt1 + "<input type='number' id='txtmarks1' class='form-control form-control-sm' style='font-weight: 500;' placeholder='Marks'>";
            txt1 = txt1 + "</div>";
            txt1 = txt1 + "</div>";
            //txt1 = txt1 + "<div class='mt-3'>";
            //txt1 = txt1 + "<textarea id='txtRadioRemarks' class='form-control form-control-sm mt-2 fs-6'></textarea>";
            //txt1 = txt1 + "</div>";
        }
        else if (value == 'LINEAR SCALE') {
            txt1 = txt1 + "<div class='mt-3 text-center' id='divlinear'>";
            txt1 = txt1 + "<div class='d-flex align-items-center justify-content-center'>";
            txt1 = txt1 + "<label class='d-block fs-6 me-2'>" + linearScaleLowLabel + "</label>";
            //console.log(linearScaleLow, linearScaleHigh);
            for (let i = linearScaleLow; i <= linearScaleHigh; i++) {
                let objName = "linearOpt" + i;
                txt1 = txt1 + "<div class='text-center mx-2'>";
                txt1 = txt1 + "<label id='lbl" + i + "' class='form-check-label d-block fw-bold'>" + i + "<label id='lblVal" + i + "'></label></label>";
                
                //console.log(linearCount);
                //console.log(i);
                if (linearScaleLow == 0) {
                    if (linearCount[i][objName] > 0) {
                        txt1 = txt1 + "<input type='radio' id='linearopt" + i + "' class='form-check-input mt-0 d-block' value='" + i + "' checked><label class='d-block mt-2 fw-bold'>" + linearCount[i][objName] + "</label>";
                    }
                    else {
                        txt1 = txt1 + "<input type='radio' id='linearopt" + i + "' class='form-check-input mt-0 d-block' value='" + i + "' disabled><label class='d-block mt-2'>" + linearCount[i][objName] + "</label>";
                    }
                }
                else {
                    if (linearCount[i - 1][objName] > 0) {
                        txt1 = txt1 + "<input type='radio' id='linearopt" + i + "' class='form-check-input mt-0 d-block' value='" + i + "' checked><label class='d-block mt-2 fw-bold'>" + linearCount[i - 1][objName] + "</label>";
                    }
                    else {
                        txt1 = txt1 + "<input type='radio' id='linearopt" + i + "' class='form-check-input mt-0 d-block' value='" + i + "' disabled><label class='d-block mt-2'>" + linearCount[i - 1][objName] + "</label>";
                    }
                }
                //console.log(linearCount[linearScaleResp - 1][objName]);
                //console.log(objName);
                txt1 = txt1 + "</div>";
            }
            txt1 = txt1 + "<label class='d-block fs-6 ms-2'>" + linearScaleHighLabel + "</label>";
            txt1 = txt1 + "</div>";
            txt1 = txt1 + "<label class='d-block fs-6 me-2'>[Responses]</label>";
            //txt1 = txt1 + "<div class='d-flex align-items-end mt-3 '>";
            //txt1 = txt1 + "<textarea id='txtRangeRemarks' class='form-control form-control-sm mt-2 fs-6'></textarea>";
            //txt1 = txt1 + "<div id='divMarks' class='ms-2'>";
            //txt1 = txt1 + "<label id='lbltxtmarks' class='fs-6' style='font-weight: 500;'>Full Marks:" + linearScaleMarks + "</label>";
            //txt1 = txt1 + "<input type='number' id='txtmarks1' class='form-control form-control-sm fw-bold' placeholder='Marks'>";
            //txt1 = txt1 + "</div>";
            //txt1 = txt1 + "</div>";
            txt1 = txt1 + "</div>";

        }

        $("#divQuestionDetails #answertype" + idno).empty();
        $("#divQuestionDetails #answertype" + idno).append(txt1);

        //for (let i = linearScaleLow; i <= linearScaleHigh; i++) {
        //    let objName = "linearOpt" + i;
        //    linearCount.map(function (c) {
        //        //if (c[objName] > 0) {
        //            //console.log(c);
        //            //if ($("#answer" + questionno).find("#lbl"+i).val() == i) {
        //            //    $("#answer" + questionno).find("#lbl4 > #lbl4Val").val(c[objName]);
        //            //}
        //            $("#answer" + questionno).find("#lblVal"+i).val(c[objName]);
        //            //console.log(c[objName]);
        //        //}
        //        //$("#answer" + questionno).find("#lbl" + i + " > #lblVal").val(c[objName]);
        //    });
        //}

        
        //console.log(linearCount);

        //$("#divQuestionDetails").empty();
        //$("#divQuestionDetails").append(txt1);

        //$("#" + contentDivID).find("#txtRangeRemarks").val(linearScaleRemarks);
        //$("#" + contentDivID).find("#txtRangeRemarks ~ #divMarks > #txtmarks1").val(linearScaleMarksResult);
        //$("#" + contentDivID).find("#txtAnswer").val(answerTextResp);
        //$("#" + contentDivID).find("#txtAnswer ~ #divMarks > #txtmarks1").val(answerTextMarksResult);
        //$("#" + contentDivID).find("#txtParagraph").val(answerTextAreaResp);
        //$("#" + contentDivID).find("#txtRadioRemarks").val(radioRemarks);

        ////Radio box value
        //if (radioResp == 1) {
        //    if (radiotextResp == answerRadioText1) {
        //        $("#" + contentDivID).find("#opt1").attr("checked", "true");
        //    }
        //    if (radiotextResp == answerRadioText2) {
        //        $("#" + contentDivID).find("#opt2").attr("checked", "true");
        //    }
        //    if (radiotextResp == answerRadioText3) {
        //        $("#" + contentDivID).find("#opt3").attr("checked", "true");
        //    }
        //    if (radiotextResp == answerRadioText4) {
        //        $("#" + contentDivID).find("#opt4").attr("checked", "true");
        //    }
        //}

        //$("#" + contentDivID).find("#optdivMarks > #txtmarks1").val(radiomarksResp);
        //$("#" + contentDivID).find("#optdivMarks > #txtmarks1").val(radiomarksResp);

        ////Checkbox value
        //if (answerCheckbox1 == 1) {
        //    $("#" + contentDivID).find("#chk1").attr("checked", "true");
        //}
        //if (answerCheckbox2 == 1) {
        //    $("#" + contentDivID).find("#chk2").attr("checked", "true");
        //}
        //if (answerCheckbox3 == 1) {
        //    $("#" + contentDivID).find("#chk3").attr("checked", "true");
        //}
        //if (answerCheckbox4 == 1) {
        //    $("#" + contentDivID).find("#chk4").attr("checked", "true");
        //}

        //let checkboxAnswer = Checkbox1MarksResult + Checkbox2MarksResult + Checkbox3MarksResult + Checkbox4MarksResult;
        //$("#" + contentDivID).find("#chkdivMarks > #txtmarks1").val(checkboxAnswer);
        //$("#" + contentDivID).find("#txtCheckRemarks").val(checkBoxRemarks);
    }

    function ShowApprEmpTable(name, empID, deptID, response, retag, totalMarksResult, apprseeName, appraisee) {

        let txt = "";
        txt = txt + "<tr>";
        //txt = txt + "<td>"+code+"</td>";
        txt = txt + "<td>" + name + "</td>";
        /*txt = txt + "<td>" + deptID + "</td>";*/
        if (response == 1) {
            txt = txt + "<td class='text-primary fw-bold'>" + response + "</td>";
        }
        else {
            txt = txt + "<td class='text-danger'>" + response + "</td>";
        }
        if (retag == 1) {
            txt = txt + "<td class=''><span class='card-icon text-secondary bg-blue px-2 rounded-sm'>Retagged</span></td>";
        }
        else {
            txt = txt + "<td class=''><span class='card-icon text-secondary bg-custom-secondary px-2 rounded-sm d-none'>Not Retagged</span></td>";
        }
        if (appraisee == 0) {
            txt = txt + "<td class='text-danger'>Not Applicable</td>";
        }
        else {
            txt = txt + "<td class='text-primary fw-bold'>" + apprseeName + "</td>";
        }
        txt = txt + "<td>" + totalMarksResult + "</td>";
        if (response == 1) {
            txt = txt + "<td><a class='btnShowResponse btn btn-primary btn-sm' data-value=" + empID + " id='" + retag + "'>Show Response</a></td>";
        }
        else {
            txt = txt + "<td><label class='btn btn-light btn-sm text-secondary' disabled data-value=" + empID + ">Show Response</label></td>";
        }
        /*txt = txt + "<td><a class='lblShowResponse' href='' data-value=" + userEmail + ">Show Response</a></td>";*/
        //txt = txt + "<td>" + totalMarksResult + "</td>";
        txt = txt + "</tr>";

        $("#tblApprResponseEmp").append(txt);
    }

    //function ResponseCount(answerRadio, answerRadioText, radioCount) {
    //    //let count = 0;

    //}

    $("#btnCloseResponse").on("click", function () {
        $("#ModalSurveyResponse").modal('hide');
        location.reload(true);
    });

    //Response Marks Save
    $("#btnSaveResponseMarks").on('click', function () {
        let url = "Surveysaveresponsemarks";
        let url2 = "SurveysaveEmpresponsemarks";

        let uname = $("#lblUserName").text();
        let uemail = $("#lblUserEmail").text();
        let uid = $("#txtUserID").val();
        let uretag = $("#lblRetag").text();

        let questionDiv = $("#QuestionContainer").children().last().attr('id');
        var questionDivCount = questionDiv.slice(-1);
        questionno = parseInt(questionDivCount);
        //console.log(questionno);

        let param = [];

        let answertype = '';
        let questiontype = '';
        let anstext = '';
        let anstextmarks = 0;
        let anstextarea = '';
        let anstextareamarks = 0;

        let boolanschk1 = false;
        let boolanschk2 = false;
        let boolanschk3 = false;
        let boolanschk4 = false;

        let anschktext1 = "";
        let anschktext2 = "";
        let anschktext3 = "";
        let anschktext4 = "";
        let anschktext1marks = 0;
        let anschktext2marks = 0;
        let anschktext3marks = 0;
        let anschktext4marks = 0;

        let boolansradio = false;
        let ansradiotext = "";
        let ansradiotextmarks = 0;

        let linearmarks = 0;

        let responsemarks = 0;

        for (let i = 1; i <= questionno; i++) {
            let divQ = "#question" + i;
            //let divA = "#answer" + i;
            //questiontype = $(divQ).find("#ddlQuestionType option:selected").text();
            //console.log(questiontype);
            answertype = $(divQ).find("#txtAnswerType").val();
            if (answertype == 'SHORT ANSWER') {
                anstext = $("#answertype" + i).find("#txtAnswer").val();
                anstextmarks = parseInt($("#answertype" + i).find("#txtmarks1").val());
                responsemarks += anstextmarks;
            }
            else if (answertype == 'PARAGRAPH') {
                anstextarea = $("#answertype" + i).find("#txtParagraph").val();
                anstextareamarks = parseInt($("#answertype" + i).find("#txtmarks1").val());
                responsemarks += anstextareamarks;
            }
            else if (answertype == 'CHECKBOX') {
                if ($("#answertype" + i).find("#chk1").is(":checked")) {
                    anschktext1 = $("#answertype" + i).find("#chk1").val();
                    //anschktext1marks = $("#answertype" + i).find("#lblmarks1").text();
                }
                if ($("#answertype" + i).find("#chk2").is(":checked")) {
                    anschktext2 = $("#answertype" + i).find("#chk2").val();
                    //anschktext2marks = $("#answertype" + i).find("#lblmarks2").text();
                }
                if ($("#answertype" + i).find("#chk3").is(":checked")) {
                    anschktext3 = $("#answertype" + i).find("#chk3").val();
                    //anschktext3marks = $("#answertype" + i).find("#lblmarks3").text();
                }
                if ($("#answertype" + i).find("#chk4").is(":checked")) {
                    anschktext4 = $("#answertype" + i).find("#chk4").val();
                    //anschktext4marks = $("#answertype" + i).find("#lblmarks4").text();
                }
                boolanschk1 = anschktext1 == "" ? false : true;
                boolanschk2 = anschktext2 == "" ? false : true;
                boolanschk3 = anschktext3 == "" ? false : true;
                boolanschk4 = anschktext4 == "" ? false : true;
                responsemarks += parseInt($("#answertype" + i).find("#chkdivMarks > #txtmarks1").val());
            }
            else if (answertype == 'OPTION') {
                if ($("#answertype" + i).find("#opt1").is(":checked")) {
                    ansradiotext = $("#answertype" + i).find("#opt1").val();
                    //ansradiotextmarks = $("#answertype" + i).find("#lblmarks1").text();
                }
                else if ($("#answertype" + i).find("#opt2").is(":checked")) {
                    ansradiotext = $("#answertype" + i).find("#opt2").val();
                    //ansradiotextmarks = $("#answertype" + i).find("#lblmarks2").text();
                }
                else if ($("#answertype" + i).find("#opt3").is(":checked")) {
                    ansradiotext = $("#answertype" + i).find("#opt3").val();
                    //ansradiotextmarks = $("#answertype" + i).find("#lblmarks3").text();
                }
                else if ($("#answertype" + i).find("#opt4").is(":checked")) {
                    ansradiotext = $("#answertype" + i).find("#opt4").val();
                    //ansradiotextmarks = $("#answertype" + i).find("#lblmarks4").text();
                }
                else {
                    ansradiotext = "";
                    //ansradiotextmarks = "";
                }
                boolansradio = ansradiotext == "" ? false : true;
                responsemarks += parseInt($("#answertype" + i).find("#optdivMarks > #txtmarks1").val());
            }
            else if (answertype == 'LINEAR SCALE') {
                linearmarks = parseInt($("#answertype" + i).find("#txtmarks1").val());
                responsemarks += linearmarks;
            }
            param.push({
                "QuestionNo": i,
                "IDSurvey": $("#hdIDSurveyDetail").val(),
                "AnswerTextMarksResult": anstextmarks,
                "AnswerTextAreaMarksResult": anstextareamarks,
                "LinearScaleMarksResult": linearmarks,
                //"AnswerCheckbox1MarksResult": anschktext1marks,
                //"AnswerCheckbox2MarksResult": anschktext2marks,
                //"AnswerCheckbox3MarksResult": anschktext3marks,
                //"AnswerCheckbox4MarksResult": anschktext4marks,
                //"AnswerRadioMarksResult": ansradiotextmarks,
                "UserName": uname,
                "UserEmail": uemail,
                "UserID": uid,
                "Retag": uretag
            });
            
        }
        let info = { "UserResponse": param, "TotalMarksResult": responsemarks };
        //console.log(info);
        //console.log(uid);

        if (uid == "") {
            $.ajax({
                url: url,
                type: "POST",
                data: info,
                success: function (msg) {
                    //alert("Record Successfully Inserted!!");
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Data Successfully Inserted!!',
                        //timer: 1500
                    });
                }
            });
        }
        else {
            $.ajax({
                url: url2,
                type: "POST",
                data: info,
                success: function (msg) {
                    //alert("Record Successfully Inserted!!");
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Data Successfully Inserted!!',
                        //timer: 1500
                    });
                }
            });
        }

    });
});