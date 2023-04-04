$(function () {
    let guid = "";
    let retag = "";
    let timer = "";

    Default();
    var referrer = document.referrer;
    //console.log(referrer);

    function Default() {
        viewSurvey();
    }
    function viewSurvey() {
        let localurl = window.location.search;
        const url1 = new URLSearchParams(localurl);
        guid = url1.get("s");
        retag = url1.get("tag");
        //if (retag != null) {
        //    console.log(retag);
        //}
        if (retag == null) {
            retag = false;
        }
        let username = $("#hdSessionUname").text();
        let useremail = $("#hdSessionUEmail").text();
        let userid = $("#hdSessionUID").text();
        //console.log(username);
        let param = { SurveyGUID: guid };
        let url = "Surveyshowform";
        $.get(url, param, function (data) {
            //console.log(data);
            //$("#QuestionContainer").empty();
            //let index = 1;
            //let divName = "";
            data.map(function (x) {
                //divName = "question" + index;
                //console.log(x);
                $("#lblSurveyName").text(x.name);
                $("#lblDescription").text(x.remarks);
                $("#hdIDSurveyDetail").val(x.idSurvey);
                timer = x.timer;
                Timer(timer);

                let url2 = "Surveyshowformquestion";
                $.get(url2, param, function (data1) {
                    //console.log(data1);
                    $("#QuestionContainer").empty();
                    let index = 1;
                    let divName = "";
                    UserDetails(username, useremail, userid);
                    data1.map(function (y) {
                        divName = "question" + index;
                        //console.log(y);
                        ShowQuestion(y.questionNo, y.questionType, y.questionText, y.questionDesc, y.answerType, y.answerText, y.answerTextMarks, y.answerTextArea, y.answerTextAreaMarks, y.answerCheckbox1, y.answerCheckbox2, y.answerCheckbox3, y.answerCheckbox4, y.answerCheckboxText1, y.answerCheckboxText2, y.answerCheckboxText3, y.answerCheckboxText4, y.answerCheckbox1Marks, y.answerCheckbox2Marks, y.answerCheckbox3Marks, y.answerCheckbox4Marks, y.answerRadio1, y.answerRadio2, y.answerRadio3, y.answerRadio4, y.answerRadioText1, y.answerRadioText2, y.answerRadioText3, y.answerRadioText4, y.answerRadio1Marks, y.answerRadio2Marks, y.answerRadio3Marks, y.answerRadio4Marks, y.linearScaleLow, y.linearScaleLowLabel, y.linearScaleHigh, y.linearScaleHighLabel, y.linearScaleMarks, divName);
                        index++;
                    });
                });
            });
        });
    }
    function UserDetails(username, useremail, userid) {
        let txt = "";
        txt = txt + "<div class='card mb-2 border-primary'>";
        txt = txt + "<div class='card-body'>";

        txt = txt + "<div class='row mb-2'>";
        /*txt = txt + "<div class='col-md-2'><label>Question</label></div>";*/
        txt = txt + "<div class='col-md-12'><label id='lblUserName' class='fs-6' style='font-weight: 500;'/>Your Full Name</label>";
        txt = txt + "<input type='text' id='txtUserName' class='form-control form-control-sm mt-2'/>";
        txt = txt + "</div>";
        txt = txt + "</div>";

        txt = txt + "</div>";
        txt = txt + "</div>";

        txt = txt + "<div class='card mb-2 border-primary'>";
        txt = txt + "<div class='card-body'>";

        txt = txt + "<div class='row mb-2'>";
        /*txt = txt + "<div class='col-md-2'><label>Question</label></div>";*/
        txt = txt + "<div class='col-md-12'><label id='lblUserEmail' class='fs-6' style='font-weight: 500;'/>Your Mail ID</label>";
        txt = txt + "<input type='text' id='txtUserEmail' class='form-control form-control-sm mt-2'/>";
        txt = txt + "<input type='hidden' id='txtUserID'/>";
        txt = txt + "</div>";
        txt = txt + "</div>";

        txt = txt + "</div>";
        txt = txt + "</div>";

        $("#QuestionContainer").append(txt);

        if (username != "" && useremail != "" && userid != "") {
            $("#txtUserName").val(username);
            $("#txtUserEmail").val(useremail);
            $("#txtUserID").val(userid);

            $("#txtUserName").attr("disabled", true)
            $("#txtUserEmail").attr("disabled", true)
        }
    }
    function ShowQuestion(questionno, questionType, questionText, questionDesc, answerType, answerText, answerTextMarks, answerTextArea, answerTextAreaMarks, answerCheckbox1, answerCheckbox2, answerCheckbox3, answerCheckbox4, answerCheckboxText1, answerCheckboxText2, answerCheckboxText3, answerCheckboxText4, answerCheckbox1Marks, answerCheckbox2Marks, answerCheckbox3Marks, answerCheckbox4Marks, answerRadio1, answerRadio2, answerRadio3, answerRadio4, answerRadioText1, answerRadioText2, answerRadioText3, answerRadioText4, answerRadio1Marks, answerRadio2Marks, answerRadio3Marks, answerRadio4Marks, linearScaleLow, linearScaleLowLabel, linearScaleHigh, linearScaleHighLabel, linearScaleMarks, contentDivID) {
        let txt = "";
        txt = txt + "<div id=question" + questionno + " data-value=" + questionno + ">";
        txt = txt + "<div class='card mb-2 border-primary'>";
        txt = txt + "<div class='card-body'>";

        txt = txt + "<input type='hidden' id='txtQuestionType' class='form-control form-control-sm'/>";

        txt = txt + "<div class='row mb-1'>";
        //txt = txt + "<div class='col-md-2'><label>Question</label></div>";
        txt = txt + "<div class='col-md-12'><label id='lblQuestionText' class='fs-6' style='font-weight: 500;'/></label>";
        txt = txt + "<input type='hidden' id='txtAnswerType' class='form-control form-control-sm'/>";
        txt = txt + "</div>";
        txt = txt + "</div>";

        txt = txt + "<div class='row mb-2'>";
        //txt = txt + "<div class='col-md-2'><label>Description</label></div>";
        txt = txt + "<div class='col-md-12'><label id='lblQuestionDesc' class='fs-6'/></label>";
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
            txt1 = txt1 + "<div class='d-flex align-items-center mt-2'>";
            txt1 = txt1 + "<input type='text' id='txtAnswer' class='form-control form-control-sm mb-2 mt-2'><input type='number' id='txtmarks1' class='form-control form-control-sm w-25 ms-2 d-none' placeholder='Marks'>";
            txt1 = txt1 + "</div>";
        }
        else if (value == 'PARAGRAPH') {
            txt1 = txt1 + "<div class='d-flex align-items-center mt-3 '>";
            txt1 = txt1 + "<textarea id='txtParagraph' class='form-control form-control-sm mb-2 mt-2'></textarea><input type='number' id='txtmarks1' class='form-control form-control-sm w-25 ms-2 d-none' placeholder='Marks'>";
            txt1 = txt1 + "</div>";
        }
        else if (value == 'CHECKBOX') {
            txt1 = txt1 + "<div class='mt-3'>";
            if (answerCheckboxText1 != "") {
                txt1 = txt1 + "<div class='my-1 d-flex align-items-center'>";
                txt1 = txt1 + "<input type='checkbox' id='chk1' class='form-check-input me-2 mt-0'><label id='lbl1' class='form-check-label fs-6'></label><label id='lblmarks1' class='ms-2 d-none'></label>";
                txt1 = txt1 + "</div>";
            }
            if (answerCheckboxText2 != "") {
                txt1 = txt1 + "<div class='my-1 d-flex align-items-center'>";
                txt1 = txt1 + "<input type='checkbox' id='chk2' class='form-check-input me-2 mt-0'><label id='lbl2' class='form-check-label fs-6'></label><label id='lblmarks2' class='ms-2 d-none'></label><br>";
                txt1 = txt1 + "</div>";
            }
            if (answerCheckboxText3 != "") {
                txt1 = txt1 + "<div class='my-1 d-flex align-items-center'>";
                txt1 = txt1 + "<input type='checkbox' id='chk3' class='form-check-input me-2 mt-0'><label id='lbl3' class='form-check-label fs-6'></label><label id='lblmarks3' class='ms-2 d-none'></label><br>";
                txt1 = txt1 + "</div>";
            }
            if (answerCheckboxText4 != "") {
                txt1 = txt1 + "<div class='my-1 d-flex align-items-center'>";
                txt1 = txt1 + "<input type='checkbox' id='chk4' class='form-check-input me-2 mt-0'><label id='lbl4' class='form-check-label fs-6'></label><label id='lblmarks4' class='ms-2 d-none'></label><br>";
                txt1 = txt1 + "</div>";
            }
            txt1 = txt1 + "<div class='mt-3'>";
            txt1 = txt1 + "<textarea id='txtCheckRemarks' class='form-control form-control-sm mb-2 mt-2'></textarea>";
            txt1 = txt1 + "</div>";
            txt1 = txt1 + "</div>";
        }
        else if (value == 'OPTION') {
            txt1 = txt1 + "<div class='mt-3'>";
            if (answerRadioText1 != '') {
                txt1 = txt1 + "<div class='my-1 d-flex align-items-center'>";
                txt1 = txt1 + "<input type='radio' id='opt1' class='form-check-input me-2 mt-0'><label id='lbl1' class='form-check-label fs-6'></label><label id='lblmarks1' class='ms-2 d-none'></label><br>";
                txt1 = txt1 + "</div>";
            }
            if (answerRadioText2 != "") {
                txt1 = txt1 + "<div class='my-1 d-flex align-items-center'>";
                txt1 = txt1 + "<input type='radio' id='opt2' class='form-check-input me-2 mt-0'><label id='lbl2' class='form-check-label fs-6'></label><label id='lblmarks2' class='ms-2 d-none'></label><br>";
                txt1 = txt1 + "</div>";
            }
            if (answerRadioText3 != "") {
                txt1 = txt1 + "<div class='my-1 d-flex align-items-center'>";
                txt1 = txt1 + "<input type='radio' id='opt3' class='form-check-input me-2 mt-0'><label id='lbl3' class='form-check-label fs-6'></label><label id='lblmarks3' class='ms-2 d-none'></label><br>";
                txt1 = txt1 + "</div>";
            }
            if (answerRadioText4 != "") {
                txt1 = txt1 + "<div class='my-1 d-flex align-items-center'>";
                txt1 = txt1 + "<input type='radio' id='opt4' class='form-check-input me-2 mt-0'><label id='lbl4' class='form-check-label fs-6'></label><label id='lblmarks4' class='ms-2 d-none'></label><br>";
                txt1 = txt1 + "</div>";
            }
            txt1 = txt1 + "<div class='mt-3 '>";
            txt1 = txt1 + "<textarea id='txtRadioRemarks' class='form-control form-control-sm mb-2 mt-2'></textarea>";
            txt1 = txt1 + "</div>";
            txt1 = txt1 + "</div>";
        }
        else if (value == "LINEAR SCALE") {
            txt1 = txt1 + "<div class='mt-3'>";
            txt1 = txt1 + "<div class='d-flex align-items-center justify-content-center'>";
            txt1 = txt1 + "<label class='d-block'>" + linearScaleLowLabel +"</label>";
            for (let i = linearScaleLow; i <= linearScaleHigh; i++) {
                txt1 = txt1 + "<div class='text-center mx-2'>";
                txt1 = txt1 + "<label id='lbl4' class='form-check-label fs-6 d-block fw-bold'>" + i + "</label>";
                txt1 = txt1 + "<input type='radio' id='linearopt" + i + "' class='form-check-input mt-0 d-block' name='" + questionText +"' value='"+i+"'>";
                txt1 = txt1 + "</div>";
            }
            txt1 = txt1 + "<label class='d-block'>" + linearScaleHighLabel + "</label>";
            txt1 = txt1 + "</div>";
            txt1 = txt1 + "<textarea id='txtRangeRemarks' class='form-control form-control-sm mb-2 mt-2'></textarea>";
            txt1 = txt1 + "</div>";
        }

        $("#QuestionContainer #answertype" + idno).empty();
        $("#QuestionContainer #answertype" + idno).append(txt1);

        $("#" + contentDivID).find("#txtAnswer ~ #txtmarks1").val(answerTextMarks);
        $("#" + contentDivID).find("#txtParagraph ~ #txtmarks1").val(answerTextAreaMarks);

        $("#" + contentDivID).find("#opt1").val(answerRadioText1);
        $("#" + contentDivID).find("#opt1").attr("name", questionText);
        $("#" + contentDivID).find("#opt1 ~ #lbl1").text(answerRadioText1);
        $("#" + contentDivID).find("#opt1 ~ #lblmarks1").text(answerRadio1Marks);

        $("#" + contentDivID).find("#opt2").val(answerRadioText2);
        $("#" + contentDivID).find("#opt2").attr("name", questionText);
        $("#" + contentDivID).find("#opt2 ~ #lbl2").text(answerRadioText2);
        $("#" + contentDivID).find("#opt2 ~ #lblmarks2").text(answerRadio2Marks);

        $("#" + contentDivID).find("#opt3").val(answerRadioText3);
        $("#" + contentDivID).find("#opt3").attr("name", questionText);
        $("#" + contentDivID).find("#opt3 ~ #lbl3").text(answerRadioText3);
        $("#" + contentDivID).find("#opt3 ~ #lblmarks3").text(answerRadio3Marks);

        $("#" + contentDivID).find("#opt4").val(answerRadioText4);
        $("#" + contentDivID).find("#opt4").attr("name", questionText);
        $("#" + contentDivID).find("#opt4 ~ #lbl4").text(answerRadioText4);
        $("#" + contentDivID).find("#opt4 ~ #lblmarks4").text(answerRadio4Marks);


        $("#" + contentDivID).find("#chk1").val(answerCheckboxText1);
        //$("#" + contentDivID).find("#chk1").attr("name", questionText);
        $("#" + contentDivID).find("#chk1 ~ #lbl1").text(answerCheckboxText1);
        $("#" + contentDivID).find("#chk1 ~ #lblmarks1").text(answerCheckbox1Marks);

        $("#" + contentDivID).find("#chk2").val(answerCheckboxText2);
        //$("#" + contentDivID).find("#chk2").attr("name", questionText);
        $("#" + contentDivID).find("#chk2 ~ #lbl2").text(answerCheckboxText2);
        $("#" + contentDivID).find("#chk2 ~ #lblmarks2").text(answerCheckbox2Marks);

        $("#" + contentDivID).find("#chk3").val(answerCheckboxText3);
        //$("#" + contentDivID).find("#chk3").attr("name", questionText);
        $("#" + contentDivID).find("#chk3 ~ #lbl3").text(answerCheckboxText3);
        $("#" + contentDivID).find("#chk3 ~ #lblmarks3").text(answerCheckbox3Marks);

        $("#" + contentDivID).find("#chk4").val(answerCheckboxText4);
        //$("#" + contentDivID).find("#chk4").attr("name", questionText);
        $("#" + contentDivID).find("#chk4 ~ #lbl4").text(answerCheckboxText4);
        $("#" + contentDivID).find("#chk4 ~ #lblmarks4").text(answerCheckbox4Marks);
    }

    //Save Survey
    $("#btnSubmitDetail").on('click', function () {
        SaveSurveyResponse();
    });
    
    function SaveSurveyResponse() {
        let url = "Surveysaveresponse";

        let uname = $("#txtUserName").val();
        let uemail = $("#txtUserEmail").val();
        let uid = $("#txtUserID").val();

        if (uname == "" && uemail == "") {
            Swal.fire({
                icon: 'warning',
                title: 'Warning',
                text: 'Please enter your Name and Email!!'
            });
            return false;
        }

        let questionDiv = $("#QuestionContainer").children().last().attr('id');
        var questionDivCount = questionDiv.slice(-1);
        questionno = parseInt(questionDivCount);
        //console.log(questionno);

        let param = [];

        let answertype = '';
        let questiontype = '';
        let anstext = '';
        let anstextmarks = '';
        let anstextfullmarks = '';
        let anstextarea = '';
        let anstextareamarks = '';
        let anstextareafullmarks = '';

        let boolanschk1 = false;
        let boolanschk2 = false;
        let boolanschk3 = false;
        let boolanschk4 = false;

        let anschktext1 = "";
        let anschktext2 = "";
        let anschktext3 = "";
        let anschktext4 = "";
        let anschktext1marks = "";
        let anschktext2marks = "";
        let anschktext3marks = "";
        let anschktext4marks = "";
        let anschkremarks = "";

        let boolansradio = false;
        let ansradiotext = "";
        let ansradiotextmarks = "";
        let ansradioremarks = "";

        let ansrange = false;
        let ansrangeval = "";
        let ansrangemarks = "";
        let ansrangeremarks = "";

        for (let i = 1; i <= questionno; i++) {
            let divQ = "#question" + i;
            //let divA = "#answer" + i;
            //questiontype = $(divQ).find("#ddlQuestionType option:selected").text();
            //console.log(questiontype);
            answertype = $(divQ).find("#txtAnswerType").val();
            if (answertype == 'SHORT ANSWER') {
                anstext = $("#answertype" + i).find("#txtAnswer").val();
                anstextfullmarks = $("#answertype" + i).find("#txtmarks1").val();
            }
            else if (answertype == 'PARAGRAPH') {
                anstextarea = $("#answertype" + i).find("#txtParagraph").val();
                anstextareafullmarks = $("#answertype" + i).find("#txtmarks1").val();
            }
            else if (answertype == 'CHECKBOX') {
                if ($("#answertype" + i).find("#chk1").is(":checked")) {
                    anschktext1 = $("#answertype" + i).find("#chk1").val();
                    anschktext1marks = $("#answertype" + i).find("#lblmarks1").text();
                }
                if ($("#answertype" + i).find("#chk2").is(":checked")) {
                    anschktext2 = $("#answertype" + i).find("#chk2").val();
                    anschktext2marks = $("#answertype" + i).find("#lblmarks2").text();
                }
                if ($("#answertype" + i).find("#chk3").is(":checked")) {
                    anschktext3 = $("#answertype" + i).find("#chk3").val();
                    anschktext3marks = $("#answertype" + i).find("#lblmarks3").text();
                }
                if ($("#answertype" + i).find("#chk4").is(":checked")) {
                    anschktext4 = $("#answertype" + i).find("#chk4").val();
                    anschktext4marks = $("#answertype" + i).find("#lblmarks4").text();
                }
                boolanschk1 = anschktext1 == "" ? false : true;
                boolanschk2 = anschktext2 == "" ? false : true;
                boolanschk3 = anschktext3 == "" ? false : true;
                boolanschk4 = anschktext4 == "" ? false : true;
                anschkremarks = $("#answertype" + i).find("#txtCheckRemarks").val();
            }
            else if (answertype == 'OPTION') {
                if ($("#answertype" + i).find("#opt1").is(":checked")) {
                    ansradiotext = $("#answertype" + i).find("#opt1").val();
                    ansradiotextmarks = $("#answertype" + i).find("#lblmarks1").text();
                }
                else if ($("#answertype" + i).find("#opt2").is(":checked")) {
                    ansradiotext = $("#answertype" + i).find("#opt2").val();
                    ansradiotextmarks = $("#answertype" + i).find("#lblmarks2").text();
                }
                else if ($("#answertype" + i).find("#opt3").is(":checked")) {
                    ansradiotext = $("#answertype" + i).find("#opt3").val();
                    ansradiotextmarks = $("#answertype" + i).find("#lblmarks3").text();
                }
                else if ($("#answertype" + i).find("#opt4").is(":checked")) {
                    ansradiotext = $("#answertype" + i).find("#opt4").val();
                    ansradiotextmarks = $("#answertype" + i).find("#lblmarks4").text();
                }
                else {
                    ansradiotext = "";
                    ansradiotextmarks = "";
                }
                boolansradio = ansradiotext == "" ? false : true;
                ansradioremarks = $("#answertype" + i).find("#txtRadioRemarks").val();
            }
            else if (answertype == 'LINEAR SCALE') {
                if ($("#answertype" + i).find("input[type='radio']").is(":checked")) {
                    ansrangeval = $("#answertype" + i).find("input[type='radio']:checked").val();
                   // ansradiotextmarks = $("#answertype" + i).find("#lblmarks1").text();
                }
                else {
                    ansrangeval = "";
                    //ansradiotextmarks = "";
                }
                ansrange = ansrangeval == "" ? false : true;
                ansrangeremarks = $("#txtRangeRemarks").val();
            }
            param.push({
                "QuestionNo": i,
                "IDSurvey": $("#hdIDSurveyDetail").val(),
                //"QuestionType": questiontype,
                "QuestionText": $(divQ).find("#lblQuestionText").text(),
                "QuestionDesc": $(divQ).find("#lblQuestionDesc").text(),
                "AnswerType": answertype,
                "AnswerText": anstext,
                "AnswerTextMarksResult": anstextmarks,
                //"AnswerTextFullMarks": anstextfullmarks,
                "AnswerTextArea": anstextarea,
                "AnswerTextAreaMarksResult": anstextareamarks,
                //"AnswerTextAreaFullMarks": anstextareafullmarks,
                "AnswerCheckbox1": boolanschk1,
                "AnswerCheckbox2": boolanschk2,
                "AnswerCheckbox3": boolanschk3,
                "AnswerCheckbox4": boolanschk4,
                "AnswerCheckboxText1": anschktext1,
                "AnswerCheckboxText2": anschktext2,
                "AnswerCheckboxText3": anschktext3,
                "AnswerCheckboxText4": anschktext4,
                "AnswerCheckbox1MarksResult": anschktext1marks,
                "AnswerCheckbox2MarksResult": anschktext2marks,
                "AnswerCheckbox3MarksResult": anschktext3marks,
                "AnswerCheckbox4MarksResult": anschktext4marks,
                "CheckBoxRemarks": anschkremarks,
                "AnswerRadio": boolansradio,
                "AnswerRadioText": ansradiotext,
                "AnswerRadioMarksResult": ansradiotextmarks,
                "RadioRemarks": ansradioremarks,
                "LinearScale": ansrange,
                "LinearScaleResp": ansrangeval,
                "LinearScaleResp": ansrangeval,
                "LinearScaleRemarks": ansrangeremarks,
                "LinearScaleMarksResult": ansrangemarks,
                "UserName": uname,
                "UserEmail": uemail,
                "UserID": uid,
                "Retag": retag
            });
        }
        let info = { "UserResponse": param, "UserEmail": uemail, "IDSurvey": $("#hdIDSurveyDetail").val(), "EmpID": uid };
        //console.log(info);

        $.ajax({
            url: url,
            type: "POST",
            data: info,
            success: function (msg) {
                //debugger;
                //console.log(msg);
                if (msg != "") {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error Occured',
                        text: msg,
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                        confirmButtonText: 'Ok'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            $("#QuestionContainer").empty();
                            //console.log(referrer);
                            if (referrer != "") {
                                //window.location.replace("https://crm.mendine.co.in/EmployeeSurveyList");
                                window.location.replace(referrer);
                            }
                        }
                    })
                }
                else {
                    Swal.fire({
                        icon: 'success',
                        title: 'Survey Successfully Submitted!!',
                        //text: 'Do you want to download your feedback??',
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                        //showDenyButton: true,
                        confirmButtonText: 'Ok',
                        //denyButtonText: 'No'
                    }).then((result) => {
                        if (result.isConfirmed) {

                            if (referrer != "") {
                                //window.location.replace("https://crm.mendine.co.in/EmployeeSurveyList");
                                window.location.replace(referrer);
                            }
                            else {
                                window.top.close();
                            }
                        }
                        //else if (result.isDenied) {
                        //    if (referrer != "") {
                        //        //window.location.replace("https://crm.mendine.co.in/EmployeeSurveyList");
                        //        window.location.replace(referrer);
                        //    }
                        //    else {
                        //        window.top.close();
                        //    }
                        //}
                    })
                    //$("#QuestionContainer").empty();
                    //window.top.close().delay(5000);
                }

            }
        });
    }

    //Timer
    function Timer(timer) {
        //Checking timer is null or not
        if (timer) {
            Swal.fire({
                icon: 'question',
                title: 'Do you want to start the Survey?',
                text: 'This survey is time bound. Clicking "Yes" will start the timer. End the survey before time ends.',
                allowOutsideClick: false,
                allowEscapeKey: false,
                showDenyButton: true,
                confirmButtonText: 'Yes',
                denyButtonText: 'No'
            }).then((result) => {
                if (result.isConfirmed) {
                    //Confirmation of starting the survey (to visualize)
                    Swal.fire({
                        icon: 'success',
                        title: 'Survey has started...',
                        timer: 2000
                    })
                    //Countdown
                    var timer2 = timer + ":01";
                    var interval = setInterval(function () {
                        var timerCount = timer2.split(':');
                        var minutes = parseInt(timerCount[0], 10);
                        var seconds = parseInt(timerCount[1], 10);
                        --seconds;
                        minutes = (seconds < 0) ? --minutes : minutes;
                        if (minutes < 0) {
                            clearInterval(interval);
                            minutes = 0;
                            seconds = 0;
                        }
                        seconds = (seconds < 0) ? 59 : seconds;
                        seconds = (seconds < 10) ? '0' + seconds : seconds;
                        minutes = (minutes < 10) ? '0' + minutes : minutes;
                        $('#lblTimerCountdown').text(minutes + ':' + seconds);
                        timer2 = minutes + ':' + seconds;
                    }, 1000);

                    //For counting the timer
                    let countdown = parseInt(timer) * 60 * 1000;
                    if (countdown > 0) {
                        window.setTimeout(CheckTimer, countdown + 1000);
                    }
                }
                else if (result.isDenied) {
                    //if denied
                    if (referrer != "") {
                        window.location.replace(referrer);
                    }
                    else {
                        window.top.close();
                    }
                }
            })
        }
        //console.log(countdown);
    }
    function CheckTimer() {
        //alert("Test");
        Swal.fire({
            icon: 'warning',
            title: 'Time is Up!',
            text: 'Your time is up for submitting this Survey.',
            allowOutsideClick: false,
            allowEscapeKey: false,
            confirmButtonText: 'Ok'
        }).then((result) => {
            if (result.isConfirmed) {
                //Save survey after completing survey
                SaveSurveyResponse();
                if (referrer != "") {
                    window.location.replace(referrer);
                }
                else {
                    window.top.close();
                }
            }
        })
    }
});