$(function () {
    // Initilize survey counter 
    let surveyno = 0;
    let questionno = 1;
    Default();
    //let username = $("#hdSessionUname").text();
    let username = $("#hdUser").val();
    let useremail = $("#hdSessionUEmail").text();
    let userid = $("#hdSessionUID").text();
    function Default() {
        // Date Format from JQuery UI
        //$("txtStartDate")
        $("#txtStartDate").datepicker({
            dateFormat: 'dd-M-yy',
            minDate: 0
        });
        $("#txtEndDate").datepicker({
            dateFormat: 'dd-M-yy',
            minDate: 0
        });
        $("#txtStartDateFilter").datepicker({
            dateFormat: 'dd-M-yy'
        });
        $("#txtEndDateFilter").datepicker({
            dateFormat: 'dd-M-yy'
        });

        // Max Survey No Generated
        let url = "Surveylistactive";
        $.get(url, function (data) {
            $("#SurveyContainer").empty();
            data.map(function (x) {
                //console.log(x);
                GenerateSurvey(x.idSurvey, x.code, x.name, x.remarks, x.startDate, x.endDate, x.publish, x.idCategory);
                surveyno = x.autono;
                ResponseDatavalue(x.idSurvey);
                ShareDatavalue(x.idSurvey);
            });
            //$('#tblSurveyList').DataTable();
            $('#tblSurveyList').DataTable({
                //order: [[3, 'desc']],
                "order": []
            });
        });
        var body = $('body');
        body.on('mouseover', '[data-bs-toggle="tooltip"]', function (e) {
            e.stopPropagation();
            return new bootstrap.Tooltip(this).show();
        });

        body.on('mouseleave', '[data-bs-toggle="tooltip"]', function (e) {
            $('[role="tooltip"]').fadeOut(function () {
                e.stopPropagation();
                $(this).remove();
            });
        });
    }
    //function GenerateSurvey(IDSurvey, No, Name, Remarks, StartDate, Publish) {
    //    let txt = "";
    //    txt = txt + "<div class='col-md-3 mt-2'>";
    //    txt = txt + "<div class='card surveyCard'>";
    //    txt = txt + "<div class='card-header d-flex justify-content-between align-items-center bg-white'>";
    //    txt = txt + "<div class='d-flex align-items-center justify-content-between w-100'>";
    //    txt = txt + "<span class='card-icon text-secondary bg-blue px-2 d-block rounded'>" + No + "</span>";
    //    txt = txt + "<div class='bg-white'>"
    //    txt = txt + "<span class='small fw-light text-secondary'> Date :" + StartDate + "</span>";
    //    txt = txt + "</div>";
    //    txt = txt + "</div>";
    //    txt = txt + "</div>";
    //    txt = txt + "<div class='card-body bg-custom-light'>";
    //    txt = txt + "<h6 class='card-title mt-2 text-uppercase'>" + Name + "</h6>";
    //    txt = txt + "<p class='card-text mt-2' id='lblRemarks'>" + Remarks + "</p>";
    //    txt = txt + "</div>";
    //    txt = txt + "<div class='card-footer bg-custom-light d-flex align-items-center justify-content-between'>";
    //    txt = txt + "<div class='d-block'>";
    //    txt = txt + "<span class='text-black-50' id='lblResponse" + IDSurvey + "'>Responses: <label id='lblResponseVal' data-value=" + IDSurvey + ">0</label></span>";
    //    txt = txt + "</div>";
    //    txt = txt + "<div class='dropup'>";
    //    txt = txt + "<div class='option-icon d-flex align-items-center justify-content-center rounded' id='dropdownMenuButton1' data-bs-toggle='dropdown' aria-expanded='false'>";
    //    txt = txt + "<i class='fa-solid fa-ellipsis-vertical fs-6'></i>";
    //    txt = txt + "</div>";
    //    txt = txt + "<ul class='dropdown-menu submenu' aria-labelledby='dropdownMenuButton1'>";
    //    txt = txt + "<li><a class='dropdown-item lblEdit' data-value=" + IDSurvey + ">Edit Survey</a></li>";
    //    txt = txt + "<li><a class='dropdown-item lblShare' data-value=" + IDSurvey + ">Share Link</a></li>";
    //    if (Publish == false) {
    //        txt = txt + "<li><a class='dropdown-item lblDetail' data-value=" + IDSurvey + ">Add / Edit Question</label></li>";
    //    }
    //    else {
    //        txt = txt + "<li><label class='dropdown-item bg-light text-muted' data-value=" + IDSurvey + ">Add / Edit Question</label></li>";
    //    }
    //    txt = txt + "<li><a class='dropdown-item lblPublish' data-value=" + IDSurvey + ">Publish</a></li>";
    //    txt = txt + "<li><a class='dropdown-item lblResponse' data-value=" + IDSurvey + ">Responses</a></li>";
    //    txt = txt + "<li><a class='dropdown-item lblRemove' data-value=" + IDSurvey + ">Remove</a></li>";
    //    txt = txt + "</ul>";
    //    txt = txt + "</div>";
    //    txt = txt + "</div>";
    //    txt = txt + "</div>";
    //    txt = txt + "</div>";
    //    $("#SurveyContainer").append(txt);
    //}

    function GenerateSurvey(IDSurvey, No, Name, Remarks, StartDate, EndDate, Publish, idCategory) {
        let txt = "";

        txt = txt + "<tr>";

        txt = txt + "<td style='width: 15%'>";
        txt = txt + "<span class='card-icon text-secondary bg-blue px-2 rounded-sm'>" + No + "</span>";
        txt = txt + "</td>";
        txt = txt + "<td style='width: 30%'>";
        txt = txt + "<span class='text-uppercase fw-bold d-block'>" + Name + "</span>";
        txt = txt + "<span class='d-block' id='lblRemarks'>" + Remarks + "</span>";
        txt = txt + "</td>";

        txt = txt + "<td style='width: 15%'>";
        txt = txt + "<span class='fw-light text-secondary'>" + StartDate + " - " + EndDate +"</span>";
        txt = txt + "</td>";

        txt = txt + "<td style='width: 27%'>";
        if (Publish == false) {
            txt = txt + "<a class='surveyBtn publish px-1 rounded-sm lblPublish d-inline-block' data-value=" + IDSurvey + ">Publish</a>";
        }
        else {
            txt = txt + "<a class='surveyBtn published px-1 rounded-sm lblUnPublish d-inline-block' data-value=" + IDSurvey + ">Published</a>";
        }
        if (Publish == false) {
            txt = txt + "<label class='border text-muted px-1 rounded-sm d-inline-block mx-2' data-value=" + IDSurvey + ">Share Link <label class='px-1 bg-light text-black-50 rounded-circle d-inline ms-1' id='lblShareVal" + IDSurvey + "' data-value=" + IDSurvey + ">0</label></label>";
        }
        else {
            txt = txt + "<a class='surveyBtn text-primary px-1 rounded-sm lblShare d-inline-block mx-2' data-value=" + IDSurvey + " id=" + idCategory + ">Share Link <label class='px-1 bg-light text-black-50 rounded-circle d-inline ms-1' id='lblShareVal" + IDSurvey + "' data-value=" + IDSurvey + ">0</label></a>";
        }
        if (Publish == false) {
            txt = txt + "<label class='border text-muted px-1 rounded-sm d-inline-block' data-value=" + IDSurvey + ">Response <label class='px-1 bg-light text-black-50 rounded-circle d-inline ms-1' id='lblResponseVal" + IDSurvey + "' data-value=" + IDSurvey + ">0</label></a>";
        }
        else {
            txt = txt + "<a class='surveyBtn text-primary px-1 rounded-sm lblResponse d-inline-block' data-value=" + IDSurvey + " id=" + idCategory + ">Response <label class='px-1 bg-light text-black-50 rounded-circle d-inline ms-1' id='lblResponseVal" + IDSurvey + "' data-value=" + IDSurvey + ">0</label></a>";
        }
        txt = txt + "</td>";

        txt = txt + "<td style='width: 8%'>";
        if (Publish == false) {
            txt = txt + "<a class='text-primary lblEdit d-inline-block' data-bs-toggle='tooltip' data-bs-placement='top' title='Edit Survey' data-value=" + IDSurvey + "><i class='fa-regular fa-pen-to-square fs-5'></i></a>";
        }
        else {
            txt = txt + "<span class='text-black-50 d-inline-block' data-bs-toggle='tooltip' data-bs-placement='top' title='Edit Survey' data-value=" + IDSurvey + "><i class='fa-regular fa-pen-to-square fs-5'></i></span>";
        }
        if (Publish == false) {
            txt = txt + "<a class='text-primary lblDetail d-inline-block mx-1' data-bs-toggle='tooltip' data-bs-placement='top' title='Add/Edit Questions' data-value=" + IDSurvey + "><i class='fa-solid fa-plus-minus fs-5'></i></a>";
        }
        else {
            txt = txt + "<span class='text-black-50 d-inline-block mx-1' data-bs-toggle='tooltip' data-bs-placement='top' title='Add/Edit Questions' data-value=" + IDSurvey + "><i class='fa-solid fa-plus-minus fs-5'></i></span>";
        }
        if (Publish == false) {
            txt = txt + "<a class='text-danger lblRemove d-inline-block' data-bs-toggle='tooltip' data-bs-placement='top' title='Remove' data-value=" + IDSurvey + "><i class='fa-regular fa-trash-can fs-5'></i></a>";
        }
        else {
            txt = txt + "<span class='text-muted d-inline-block' data-bs-toggle='tooltip' data-bs-placement='top' title='Remove' data-value=" + IDSurvey + "><i class='fa-regular fa-trash-can fs-5'></i></a>";
        }
        txt = txt + "</td>";

        txt = txt + "</tr>";

        
        $("#SurveyContainer").append(txt);
    }

    //No. of Responses
    function ResponseDatavalue(respID) {
        let url = "Surveylistresponseactive";
        let count = 0;
        $.get(url, function (data) {
            //$("#SurveyContainer").empty();
            data.map(function (x) {
                //console.log(x.idSurvey);
                if (respID == x.idSurvey) {
                    count = count + 1;
                }
            });
            let url = "SurveyEmplistresponseactive";
            let count2 = 0;
            $.get(url, function (data) {
                //$("#SurveyContainer").empty();
                data.map(function (y) {
                    //console.log(x);
                    if (respID == y.idSurvey) {
                        count2 = count2 + 1;
                    }
                });
                count = count + count2;
                //console.log(count);
                $("#lblResponseVal" + respID).text(count);
                if (count != 0) {
                    $("#lblResponseVal" + respID).removeClass("bg-light text-black-50");
                    $("#lblResponseVal" + respID).addClass("bg-primary text-white");
                }
            });
        });
        //console.log(count);
    }

    //No. of Survey Share
    function ShareDatavalue(respID) {
        let url = "Surveylistshare";
        let count = 0;
        $.get(url, function (data) {
            //$("#SurveyContainer").empty();
            data.map(function (x) {
                //console.log(x.idSurvey);
                if (respID == x.idSurvey) {
                    count = count + 1;
                }
            });
            let url = "SurveyEmplistshare";
            let count2 = 0;
            $.get(url, function (data) {
                //$("#SurveyContainer").empty();
                data.map(function (y) {
                    //console.log(x);
                    if (respID == y.idSurvey) {
                        count2 = count2 + 1;
                    }
                });
                count = count + count2;
                //console.log(count);
                $("#lblShareVal" + respID).text(count);
                if (count != 0) {
                    $("#lblShareVal" + respID).removeClass("bg-light text-black-50");
                    $("#lblShareVal" + respID).addClass("bg-primary text-white");
                }
            });
        });
        //console.log(count);
    }

    // Survey Open
    $("#btnAdd").on("click", function () {
        $("#hdIDSurvey").val("0");
        $("#txtName").val("");
        $("#txtRemarks").val("");
        $("#txtStartDate").val("");
        $("#txtEndDate").val("");
        $("#lblHeader").text("");
        $("#ModalSurveyAdd").modal('show');
    });
    // Survey Close
    $("#btnClose").on("click", function () {
        $("#ModalSurveyAdd").modal('hide');
    });
    // Survey Detail show
    $("#btnCloseDetail").on("click", function () {
        $("#ModalSurveyDetail").modal('hide');
        location.reload(true);
    });
    // Individual Survey Save
    $("#btnCreate").on("click", function () {
        if(surveyVal() == true){
            let url = "SaveSurvey";
            let param = {
                IDSurvey: $("#hdIDSurvey").val(),
                Name: $("#txtName").val(),
                Remarks: $("#txtRemarks").val(),
                StartDate: $("#txtStartDate").val(),
                EndDate: $("#txtEndDate").val(),
                EntryUser: useremail
            }
            //console.log(param);
            $.get(url, param, function (data) {
                //console.log(data);
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Survey Successfully Created!!',
                    //timer: 1500
                });
                $("#ModalSurveyAdd").modal('hide');
                Default();
            });
        }
    });

    //$("#txtName").focus(function () {
    //    alert("test");
    //    $(this).blur();
    //});

    // Survey Edit
    $("#SurveyContainer").on('click', '.lblEdit', function () {
        let idSurvey = $(this).attr("data-value");
        //if(surveyVal() == true){
            let url = "SurveyDetail";
            let param = { IDSurvey: idSurvey };
            $.get(url, param, function (data) {
                data.map(function (x) {
                    $("#hdIDSurvey").val(x.idSurvey);
                    $("#txtName").val(x.name);
                    $("#txtRemarks").val(x.remarks);
                    $("#txtStartDate").val(x.startDate);
                    $("#txtEndDate").val(x.endDate);
                    $("#lblHeader").text(x.code);
                    $("#ModalSurveyAdd").modal('show');
                });
            });
        //}
    });
    function surveyVal() {
        if ($("#txtName").val() == '') {
            //alert("User name is missing....");
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Survey name is missing!',
                //timer: 1500
            });
            $("#txtName").focus();
            return false;
        }
        if ($("#txtRemarks").val() == '') {
            //alert("User password is missing....");
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Survey details is missing!',
                timer:1500
            });
            $("#txtRemarks").focus();
            return false;
        }
        if ($("#txtStartDate").val() == '') {
            //alert("User password is missing....");
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Must add a Start Date!',
                timer:1500
            });
            $("#txtStartDate").focus();
            return false;
        }
        if ($("#txtEndDate").val() == '') {
            //alert("User password is missing....");
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Must add an End Date!',
                timer:1500
            });
            $("#txtEndDate").focus();
            return false;
        }
        return true;
    }

    //Survey Remove
    $("#SurveyContainer").on('click', '.lblRemove', function () {
        let idSurvey = $(this).attr("data-value");
        let url = "SurveyRemove";
        let param = {
            IDSurvey: idSurvey,
            EntryUser: useremail
        };
        if (confirm("Do you really want to remove the survey ?") == true) {
            $.get(url, param, function (data) {
                Default();
            });
        }
    });

    //Survey Publish
    $("#SurveyContainer").on('click', '.lblPublish', function () {
        let idSurvey = $(this).attr("data-value");
        let url = "SurveyPublish";
        let param = {
            IDSurvey: idSurvey,
            UpdateUser: useremail
        };
        if (confirm("Do you want to publish the survey ?") == true) {
            //let addOpt = $(this).parent("li").parent().find(".lblDetail");
            $.get(url, param, function (data) {
                Default();
                location.reload(true);
                //addOpt.css({ "display": "none" });
            });
        }
    });
    $("#btnPublish").on("click", function () {
        let idSurvey = $("#hdIDSurveyDetail").val();
        //console.log(idSurvey);
        let url = "SurveyPublish";
        let param = {
            IDSurvey: idSurvey,
            EntryUser: useremail
            //"uemail": useremail
        };
        if (confirm("Do you want to publish the survey ?") == true) {
            //let addOpt = $(this).parent("li").parent().find(".lblDetail");
            $.get(url, param, function (data) {
                Default();
                location.reload(true);
                //addOpt.css({ "display": "none" });
            });
        }
    });

    //Survey UnPublish
    $("#SurveyContainer").on('click', '.lblUnPublish', function () {
        let idSurvey = $(this).attr("data-value");
        let url = "SurveyUnPublish";
        let param = {
            IDSurvey: idSurvey,
            EntryUser: useremail
        };
        if (confirm("Do you want to Unpublish the survey ?") == true) {
            //let addOpt = $(this).parent("li").parent().find(".lblDetail");
            $.get(url, param, function (data) {
                Default();
                location.reload(true);
                //addOpt.css({ "display": "none" });
            });
        }
    });

    //Survey Add Details
    $("#SurveyContainer").on('click', '.lblDetail', function () {
        let idSurvey = $(this).attr("data-value");
        let url = "SurveyDetail";
        let url2 = "SurveyTypeList";
        let param = {
            IDSurvey: idSurvey,
        };
        $.ajaxSetup({ async: false });
        $.get(url, param, function (data) {
            //console.log(data);
            data.map(function (x) {
                //console.log(x);
                $("#hdIDSurveyDetail").val(x.idSurvey);
                $("#lblHeaderDetail").text(x.code);
                $("#txtTitle").val(x.name);
                $("#txtDescription").val(x.remarks);
                $("#txtTime").val(x.timer);
                //Survey Category Append
                $.get(url2, function (data) {
                    //console.log(data);
                    $("#ddlSurveyType").empty();
                    $("#ddlSurveyType").append("<option value='' selected data-value=''>Select Survey Type</option>");
                    data.map(function (y) {
                        //console.log(y);
                        $("#ddlSurveyType").append("<option value='" + y.idCategory + "' data-value='" + y.description + "'>" + y.name + "</option>");
                        if (x.idCategory != 0) {
                            $("#ddlSurveyType").find('option[value="' + x.idCategory + '"]').attr('selected', 'selected');
                            $("#lblSurveyTypeDtls").text("(" + $("#ddlSurveyType").find('option:selected').attr('data-value') + ")");
                        }
                        else {
                            $("#lblSurveyTypeDtls").text("");
                        }
                    });
                });
            });
        });

        let url1 = "Surveycheckdetailinfo";
        let param1 = { "IDSurvey": idSurvey };
        //console.log(param);
        $.get(url1, param1, function (data1) {
            //console.log(data);
            if (data1 == '1') {
                //alert(data);
                let url = "Surveydetailshow";
                $.get(url, param1, function (data2) {
                    //console.log(data2);
                    $("#QuestionContainer").empty();
                    let index = 1;
                    let divName = "";
                    data2.map(function (x) {
                        divName = "question" + index;
                        //console.log(x);
                        ShowQuestion(x.questionNo, x.questionType, x.questionText, x.questionDesc, x.answerType, x.answerText, x.answerTextMarks,
                            x.answerTextArea, x.answerTextAreaMarks, x.answerCheckbox1, x.answerCheckbox2,
                            x.answerCheckbox3, x.answerCheckbox4, x.answerCheckboxText1, x.answerCheckboxText2,
                            x.answerCheckboxText3, x.answerCheckboxText4, x.answerCheckbox1Marks, x.answerCheckbox2Marks,
                            x.answerCheckbox3Marks, x.answerCheckbox4Marks, x.answerRadio1, x.answerRadio2, x.answerRadio3, x.answerRadio4,
                            x.answerRadioText1, x.answerRadioText2, x.answerRadioText3, x.answerRadioText4, x.answerRadio1Marks, x.answerRadio2Marks,
                            x.answerRadio3Marks, x.answerRadio4Marks, x.linearScale, x.linearScaleLow, x.linearScaleLowLabel,
                            x.linearScaleHigh, x.linearScaleHighLabel, x.linearScaleMarks, divName);
                        index++;
                    });
                });
            }
            else {
                $("#QuestionContainer").empty();
            }
        });
        $("#ModalSurveyDetail").modal('show');
    });
    $("#ddlSurveyType").on('change', function () {
        $("#lblSurveyTypeDtls").text("");
        $("#lblSurveyTypeDtls").text("(" + $(this).find('option:selected').attr('data-value') + ")");
        if ($(this).find('option:selected').attr('data-value') == "") {
            $("#lblSurveyTypeDtls").text("");
        }
    });

    function ShowQuestion(questionno, questionType, questionText, questionDesc, answerType, answerText, answerTextMarks,
        answerTextArea, answerTextAreaMarks, answerCheckbox1, answerCheckbox2, answerCheckbox3, answerCheckbox4,
        answerCheckboxText1, answerCheckboxText2, answerCheckboxText3, answerCheckboxText4, answerCheckbox1Marks,
        answerCheckbox2Marks, answerCheckbox3Marks, answerCheckbox4Marks, answerRadio1, answerRadio2, answerRadio3,
        answerRadio4, answerRadioText1, answerRadioText2, answerRadioText3, answerRadioText4, answerRadio1Marks,
        answerRadio2Marks, answerRadio3Marks, answerRadio4Marks, linearScale, linearScaleLow, linearScaleLowLabel,
        linearScaleHigh, linearScaleHighLabel, linearScaleMarks, contentDivID) {
        let txt = "";
        txt = txt + "<div id=question" + questionno + " data-value=" + questionno + ">";
        txt = txt + "<div class='card mb-2'>";
        txt = txt + "<div class='card-body'>";
        txt = txt + "<div class='d-flex justify-content-between'>";
        txt = txt + "<div>";
        txt = txt + "<h6 id='lblQuestionNo'>QUESTION</h6>";
        txt = txt + "</div>";
        txt = txt + "<div>";
        txt = txt + "<input type='button' id='btnRemove' class='btn btn-sm btn-danger' value='Remove' data-value=" + questionno + ">";
        txt = txt + "</div>";
        txt = txt + "</div>";
        txt = txt + "<hr/>";
        txt = txt + "<div class='row mb-2'>";
        txt = txt + "<div class='col-md-2'><label>Type</label></div>";
        txt = txt + "<div class='col-md-10'>";
        txt = txt + "<select id='ddlQuestionType' class='form-select form-select-sm QuestionType' data-value=" + questionno + "></select>";
        txt = txt + "</div>";
        txt = txt + "</div>";

        txt = txt + "<div class='row mb-2'>";
        txt = txt + "<div class='col-md-2'><label>Question</label></div>";
        txt = txt + "<div class='col-md-10'><input type='text' id='txtQuestionText' class='form-control form-control-sm' autocomplete='off'/>";
        
        txt = txt + "</div>";
        txt = txt + "</div>";

        txt = txt + "<div class='row mb-2'>";
        txt = txt + "<div class='col-md-2'><label>Description</label></div>";
        txt = txt + "<div class='col-md-10'><input type='text' id='txtQuestionDescription' class='form-control form-control-sm' autocomplete='off'/>";
        
        txt = txt + "</div>";
        txt = txt + "</div>";

        txt = txt + "<h6 id='lblAnswerNo'>ANSWER</h6>";
        txt = txt + "<hr/>";
        txt = txt + "<div id='answer" + questionno + "'>";
        txt = txt + "<div class='row mb-2'>";
        txt = txt + "<div class='col-md-2'><label>Type</label></div>";
        txt = txt + "<div class='col-md-10'>";
        txt = txt + "<select id='ddlAnswerType' class='form-select form-select-sm AnswerType' data-value=" + questionno + "></select>";
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
        $("#" + contentDivID).find("#txtQuestionText").val(questionText);
        $("#" + contentDivID).find("#txtQuestionDescription").val(questionDesc);

        // Question Type
        let url = "QuestionType";
        $.get(url, function (data) {
            $("#question" + questionno + " .QuestionType").empty();
            $("#question" + questionno + " .QuestionType").append("<option value=''>Select</option>");
            data.map(function (x) {
                $("#question" + questionno + " .QuestionType").append("<option value=" + x.idType + ">" + x.name + "</option>");
                if (x.name == questionType) {
                    $("#question" + questionno + " .QuestionType").find('option:contains("' + questionType + '")').attr("selected", "selected");
                }
            });
        });

        // Answer Type
        url = "AnswerType";
        let txt1 = "";
        $.get(url, function (data) {
            $("#question" + questionno + " .AnswerType").empty();
            $("#question" + questionno + " .AnswerType").append("<option value=''>Select</option>")
            data.map(function (x) {
                if (x.name == answerType) {
                    $("#question" + questionno + " .AnswerType").append("<option value=" + x.idType + " selected>" + x.name + "</option>");
                    let value = $("#question" + questionno + " .AnswerType").find('option:selected').text();
                    //console.log(value);
                    let idno = $("#question" + questionno + " .AnswerType").attr("data-value");

                    // Answer Type append
                    if (value == 'SHORT ANSWER') {
                        txt1 = txt1 + "<div class='d-flex align-items-center mt-3 '>";
                        txt1 = txt1 + "<input type='text' id='txtAnswer' class='form-control form-control-sm mb-2 mt-2' readonly autocomplete='off'><input type='number' id='txtmarks1' class='form-control form-control-sm w-25 ms-2' placeholder='Marks'>";
                        txt1 = txt1 + "</div>";
                    }
                    else if (value == 'PARAGRAPH') {
                        txt1 = txt1 + "<div class='d-flex align-items-center mt-3 '>";
                        txt1 = txt1 + "<textarea id='txtParagraph' class='form-control form-control-sm mb-2 mt-2' readonly></textarea><input type='number' id='txtmarks1' class='form-control form-control-sm w-25 ms-2' placeholder='Marks'>";
                        txt1 = txt1 + "</div>";
                    }
                    else if (value == 'CHECKBOX') {
                        txt1 = txt1 + "<div class='d-flex mt-3 '>";
                        txt1 = txt1 + "<input type='checkbox' id='chk1' class='me-2' disabled><input type='text' id='txt1' class='form-control form-control-sm w-50' placeholder='Caption' autocomplete='off'><input type='number' id='txtmarks1' class='form-control form-control-sm w-25 ms-2' placeholder='Marks'>";
                        txt1 = txt1 + "</div>";
                        txt1 = txt1 + "<div class='d-flex mt-3 '>";
                        txt1 = txt1 + "<input type='checkbox' id='chk2' class='me-2' disabled><input type='text' id='txt2' class='form-control form-control-sm w-50' placeholder='Caption' autocomplete='off'><input type='number' id='txtmarks2' class='form-control form-control-sm w-25 ms-2' placeholder='Marks'>";
                        txt1 = txt1 + "</div>";
                        txt1 = txt1 + "<div class='d-flex mt-3 '>";
                        txt1 = txt1 + "<input type='checkbox' id='chk3' class='me-2' disabled><input type='text' id='txt3' class='form-control form-control-sm w-50' placeholder='Caption' autocomplete='off'><input type='number' id='txtmarks3' class='form-control form-control-sm w-25 ms-2' placeholder='Marks'>";
                        txt1 = txt1 + "</div>";
                        txt1 = txt1 + "<div class='d-flex mt-3 '>";
                        txt1 = txt1 + "<input type='checkbox' id='chk4' class='me-2' disabled><input type='text' id='txt4' class='form-control form-control-sm w-50' placeholder='Caption' autocomplete='off'><input type='number' id='txtmarks4' class='form-control form-control-sm w-25 ms-2' placeholder='Marks'>";
                        txt1 = txt1 + "</div>";
                        txt1 = txt1 + "<div class='d-flex mt-3 '>";
                        txt1 = txt1 + "<textarea id='txtCheckRemarks' class='form-control form-control-sm mb-2 mt-2' readonly></textarea>";
                        txt1 = txt1 + "</div>";
                    }
                    else if (value == 'OPTION') {
                        txt1 = txt1 + "<div class='d-flex mt-3 '>";
                        txt1 = txt1 + "<input type='radio' id='opt1' class='me-2' disabled><input type='text' id='txt1' class='form-control form-control-sm w-50' placeholder='Caption' autocomplete='off'><input type='number' id='txtmarks1' class='form-control form-control-sm w-25 ms-2' placeholder='Marks'>";
                        txt1 = txt1 + "</div>";
                        txt1 = txt1 + "<div class='d-flex mt-3 '>";
                        txt1 = txt1 + "<input type='radio' id='opt2' class='me-2' disabled><input type='text' id='txt2' class='form-control form-control-sm w-50' placeholder='Caption' autocomplete='off'><input type='number' id='txtmarks2' class='form-control form-control-sm w-25 ms-2' placeholder='Marks'>";
                        txt1 = txt1 + "</div>";
                        txt1 = txt1 + "<div class='d-flex mt-3 '>";
                        txt1 = txt1 + "<input type='radio' id='opt3' class='me-2' disabled><input type='text' id='txt3' class='form-control form-control-sm w-50' placeholder='Caption' autocomplete='off'><input type='number' id='txtmarks3' class='form-control form-control-sm w-25 ms-2' placeholder='Marks'>";
                        txt1 = txt1 + "</div>";
                        txt1 = txt1 + "<div class='d-flex mt-3 '>";
                        txt1 = txt1 + "<input type='radio' id='opt4' class='me-2' disabled><input type='text' id='txt4' class='form-control form-control-sm w-50' placeholder='Caption' autocomplete='off'><input type='number' id='txtmarks4' class='form-control form-control-sm w-25 ms-2' placeholder='Marks'>";
                        txt1 = txt1 + "</div>";
                        txt1 = txt1 + "<div class='d-flex mt-3 '>";
                        txt1 = txt1 + "<textarea id='txtRadioRemarks' class='form-control form-control-sm mb-2 mt-2' readonly></textarea>";
                        txt1 = txt1 + "</div>";
                    }
                    else if (value == 'LINEAR SCALE') {
                        //txt1 = txt1 + "hereeeee...............";
                        txt1 = txt1 + "<div class='d-flex align-items-center mt-3 '>";
                        txt1 = txt1 + "<div class='d-block w-50'>";
                        txt1 = txt1 + "<div class='d-flex align-items-center'>";
                        txt1 = txt1 + "<select id='ddlLowRange' class='form-select form-select-sm'>";
                        txt1 = txt1 + "<option value='0' selected>0</option>";
                        txt1 = txt1 + "<option value='1'>1</option>";
                        txt1 = txt1 + "</select>";
                        txt1 = txt1 + "<input type='text' id='txtLowLabel' class='form-control form-control-sm ms-2' autocomplete='off' placeholder='Label (Low)'>";
                        txt1 = txt1 + "</div>";
                        txt1 = txt1 + "<div class='d-flex align-items-center mt-1'>";
                        txt1 = txt1 + "<select id='ddlHighRange' class='form-select form-select-sm'>";
                        txt1 = txt1 + "<option value='1' selected>1</option>";
                        txt1 = txt1 + "<option value='2'>2</option>";
                        txt1 = txt1 + "<option value='3'>3</option>";
                        txt1 = txt1 + "<option value='4'>4</option>";
                        txt1 = txt1 + "<option value='5'>5</option>";
                        txt1 = txt1 + "<option value='6'>6</option>";
                        txt1 = txt1 + "<option value='7'>7</option>";
                        txt1 = txt1 + "<option value='8'>8</option>";
                        txt1 = txt1 + "<option value='9'>9</option>";
                        txt1 = txt1 + "<option value='10'>10</option>";
                        txt1 = txt1 + "</select>";
                        txt1 = txt1 + "<input type='text' id='txtHighLabel' class='form-control form-control-sm ms-2' autocomplete='off' placeholder='Label (High)'>";
                        txt1 = txt1 + "</div>";
                        txt1 = txt1 + "</div>";
                        txt1 = txt1 + "</div>";
                        txt1 = txt1 + "<div class='d-flex align-items-center mt-3 '>";
                        txt1 = txt1 + "<textarea id='txtRangeRemarks' class='form-control form-control-sm mb-2 mt-2' readonly></textarea><input type='number' id='txtmarks1' class='form-control form-control-sm w-25 ms-2' placeholder='Marks'>";
                        txt1 = txt1 + "</div>";
                    }

                    $("#QuestionContainer #answertype" + idno).empty();
                    $("#QuestionContainer #answertype" + idno).append(txt1);

                    $("#" + contentDivID).find("#txtAnswer ~ #txtmarks1").val(answerTextMarks);
                    $("#" + contentDivID).find("#txtParagraph ~ #txtmarks1").val(answerTextAreaMarks);

                    $("#" + contentDivID).find("#opt1 ~ #txt1").val(answerRadioText1);
                    $("#" + contentDivID).find("#opt2 ~ #txt2").val(answerRadioText2);
                    $("#" + contentDivID).find("#opt3 ~ #txt3").val(answerRadioText3);
                    $("#" + contentDivID).find("#opt4 ~ #txt4").val(answerRadioText4);
                    $("#" + contentDivID).find("#opt1 ~ #txtmarks1").val(answerRadio1Marks);
                    $("#" + contentDivID).find("#opt2 ~ #txtmarks2").val(answerRadio2Marks);
                    $("#" + contentDivID).find("#opt3 ~ #txtmarks3").val(answerRadio3Marks);
                    $("#" + contentDivID).find("#opt4 ~ #txtmarks4").val(answerRadio4Marks);

                    $("#" + contentDivID).find("#chk1 ~ #txt1").val(answerCheckboxText1);
                    $("#" + contentDivID).find("#chk2 ~ #txt2").val(answerCheckboxText2);
                    $("#" + contentDivID).find("#chk3 ~ #txt3").val(answerCheckboxText3);
                    $("#" + contentDivID).find("#chk4 ~ #txt4").val(answerCheckboxText4);
                    $("#" + contentDivID).find("#chk1 ~ #txtmarks1").val(answerCheckbox1Marks);
                    $("#" + contentDivID).find("#chk2 ~ #txtmarks2").val(answerCheckbox2Marks);
                    $("#" + contentDivID).find("#chk3 ~ #txtmarks3").val(answerCheckbox3Marks);
                    $("#" + contentDivID).find("#chk4 ~ #txtmarks4").val(answerCheckbox4Marks);

                    $("#" + contentDivID).find("#ddlLowRange option:contains('" + linearScaleLow + "')").attr("selected", "selected");
                    $("#" + contentDivID).find("#ddlHighRange option:contains('" + linearScaleHigh + "')").attr("selected", "selected");
                    $("#" + contentDivID).find("#txtLowLabel").val(linearScaleLowLabel);
                    $("#" + contentDivID).find("#txtHighLabel").val(linearScaleHighLabel);
                    $("#" + contentDivID).find("#txtRangeRemarks ~ #txtmarks1").val(linearScaleMarks);
                }
                $("#question" + questionno + " .AnswerType").append("<option value=" + x.idType + ">" + x.name + "</option>");
            });
        });
    }

    //Survey Add Question
    $("#btnAddQuestion").on('click', function () {
        if ($('#QuestionContainer').is(':empty')) {
            AddQuestion(questionno);
            questionno = questionno + 1;
        }
        else {
            let questionDiv = $("#QuestionContainer").children().last().attr('id');
            var questionDivCount = questionDiv.slice(-1);
            //console.log(questionDivCount);
            questionno = parseInt(questionDivCount) + 1;
            AddQuestion(questionno);
            questionno = questionno + 1;
        }
        let div = document.getElementById("ModalSurveyDetail").getElementsByClassName("modal-body")[0];
        div.scrollTop = div.scrollHeight;
    });
    $("#QuestionContainer").on('click', '#btnRemove', function () {
        let idQuestion = $(this).attr("data-value");
        $("#question" + idQuestion).remove();
        questionno = questionno - 1;
    });
    //Answer Type View
    $("#QuestionContainer").on('change', '.AnswerType', function () {
        let idno = $(this).attr("data-value");
        let value = $(this).find('option:selected').text();
        let txt = "";

        // Answer Type
        if (value == 'SHORT ANSWER') {
            txt = txt + "<div class='d-flex align-items-center mt-3 '>";
            txt = txt + "<input type='text' id='txtAnswer' class='form-control form-control-sm mb-2 mt-2' autocomplete='off' readonly><input type='number' id='txtmarks1' class='form-control form-control-sm w-25 ms-2' placeholder='Marks'>";
            txt = txt + "</div>";
        }
        else if (value == 'PARAGRAPH') {
            txt = txt + "<div class='d-flex align-items-center mt-3 '>";
            txt = txt + "<textarea id='txtParagraph' class='form-control form-control-sm mb-2 mt-2' readonly></textarea><input type='number' id='txtmarks1' class='form-control form-control-sm w-25 ms-2' placeholder='Marks'>";
            txt = txt + "</div>";
        }
        else if (value == 'CHECKBOX') {
            txt = txt + "<div class='d-flex mt-3 '>";
            txt = txt + "<input type='checkbox' id='chk1' class='me-2' disabled><input type='text' id='txt1' autocomplete='off' class='form-control form-control-sm w-50' placeholder='Caption'><input type='number' id='txtmarks1' class='form-control form-control-sm w-25 ms-2' placeholder='Marks'>";
            txt = txt + "</div>";
            txt = txt + "<div class='d-flex mt-3 '>";
            txt = txt + "<input type='checkbox' id='chk2' class='me-2' disabled><input type='text' id='txt2' autocomplete='off' class='form-control form-control-sm w-50' placeholder='Caption'><input type='number' id='txtmarks2' class='form-control form-control-sm w-25 ms-2' placeholder='Marks'>";
            txt = txt + "</div>";
            txt = txt + "<div class='d-flex mt-3 '>";
            txt = txt + "<input type='checkbox' id='chk3' class='me-2' disabled><input type='text' id='txt3' autocomplete='off' class='form-control form-control-sm w-50' placeholder='Caption'><input type='number' id='txtmarks3' class='form-control form-control-sm w-25 ms-2' placeholder='Marks'>";
            txt = txt + "</div>";
            txt = txt + "<div class='d-flex mt-3 '>";
            txt = txt + "<input type='checkbox' id='chk4' class='me-2' disabled><input type='text' id='txt4' autocomplete='off' class='form-control form-control-sm w-50' placeholder='Caption'><input type='number' id='txtmarks4' class='form-control form-control-sm w-25 ms-2' placeholder='Marks'>";
            txt = txt + "</div>";
        }
        else if (value == 'OPTION') {
            txt = txt + "<div class='d-flex mt-3 '>";
            txt = txt + "<input type='radio' id='opt1' class='me-2' disabled><input type='text' id='txt1' autocomplete='off' class='form-control form-control-sm w-50' placeholder='Caption'><input type='number' id='txtmarks1' class='form-control form-control-sm w-25 ms-2' placeholder='Marks'>";
            txt = txt + "</div>";
            txt = txt + "<div class='d-flex mt-3 '>";
            txt = txt + "<input type='radio' id='opt2' class='me-2' disabled><input type='text' id='txt2' autocomplete='off' class='form-control form-control-sm w-50' placeholder='Caption'><input type='number' id='txtmarks2' class='form-control form-control-sm w-25 ms-2' placeholder='Marks'>";
            txt = txt + "</div>";
            txt = txt + "<div class='d-flex mt-3 '>";
            txt = txt + "<input type='radio' id='opt3' class='me-2' disabled><input type='text' id='txt3' autocomplete='off' class='form-control form-control-sm w-50' placeholder='Caption'><input type='number' id='txtmarks3' class='form-control form-control-sm w-25 ms-2' placeholder='Marks'>";
            txt = txt + "</div>";
            txt = txt + "<div class='d-flex mt-3 '>";
            txt = txt + "<input type='radio' id='opt4' class='me-2' disabled><input type='text' id='txt4' autocomplete='off' class='form-control form-control-sm w-50' placeholder='Caption'><input type='number' id='txtmarks4' class='form-control form-control-sm w-25 ms-2' placeholder='Marks'>";
            txt = txt + "</div>";
        }
        else if (value == 'LINEAR SCALE') {
            //txt1 = txt1 + "hereeeee...............";
            txt = txt + "<div class='d-flex align-items-center mt-3 '>";
            txt = txt + "<div class='d-block w-50'>";
            txt = txt + "<div class='d-flex align-items-center'>";
            txt = txt + "<select id='ddlLowRange' class='form-select form-select-sm'>";
            txt = txt + "<option value='0' selected>0</option>";
            txt = txt + "<option value='1'>1</option>";
            txt = txt + "</select>";
            txt = txt + "<input type='text' id='txtLowLabel' class='form-control form-control-sm ms-2' autocomplete='off' placeholder='Label (Low)'>";
            txt = txt + "</div>";
            txt = txt + "<div class='d-flex align-items-center mt-1'>";
            txt = txt + "<select id='ddlHighRange' class='form-select form-select-sm'>";
            txt = txt + "<option value='1' selected>1</option>";
            txt = txt + "<option value='2'>2</option>";
            txt = txt + "<option value='3'>3</option>";
            txt = txt + "<option value='4'>4</option>";
            txt = txt + "<option value='5'>5</option>";
            txt = txt + "<option value='6'>6</option>";
            txt = txt + "<option value='7'>7</option>";
            txt = txt + "<option value='8'>8</option>";
            txt = txt + "<option value='9'>9</option>";
            txt = txt + "<option value='10'>10</option>";
            txt = txt + "</select>";
            txt = txt + "<input type='text' id='txtHighLabel' class='form-control form-control-sm ms-2' autocomplete='off' placeholder='Label (High)'>";
            txt = txt + "</div>";
            txt = txt + "</div>";
            txt = txt + "</div>";
            txt = txt + "<div class='d-flex align-items-center mt-3 '>";
            txt = txt + "<textarea id='txtRangeRemarks' class='form-control form-control-sm mb-2 mt-2' readonly></textarea><input type='number' id='txtmarks1' class='form-control form-control-sm w-25 ms-2' placeholder='Marks'>";
            txt = txt + "</div>";
        }

        $("#QuestionContainer #answertype" + idno).empty();
        $("#QuestionContainer #answertype" + idno).append(txt);
    });
    function AddQuestion(questionno) {
        let txt = "";
        txt = txt + "<div id=question" + questionno + " data-value=" + questionno + ">";
        txt = txt + "<div class='card mb-2'>";
        txt = txt + "<div class='card-body'>";
        txt = txt + "<div class='d-flex justify-content-between'>";
        txt = txt + "<div>";
        txt = txt + "<h6 id='lblQuestionNo'>QUESTION</h6>";
        txt = txt + "</div>";
        txt = txt + "<div>";
        txt = txt + "<input type='button' id='btnRemove' class='btn btn-sm btn-danger' value='Remove' data-value=" + questionno + ">";
        txt = txt + "</div>";
        txt = txt + "</div>";
        txt = txt + "<hr/>";
        txt = txt + "<div class='row mb-2'>";
        txt = txt + "<div class='col-md-2'><label>Type</label></div>";
        txt = txt + "<div class='col-md-10'>";
        txt = txt + "<select id='ddlQuestionType' class='form-select form-select-sm QuestionType' data-value=" + questionno + "></select>";
        txt = txt + "</div>";
        txt = txt + "</div>";

        txt = txt + "<div class='row mb-2'>";
        txt = txt + "<div class='col-md-2'><label>Question</label></div>";
        txt = txt + "<div class='col-md-10'><input type='text' autocomplete='off' id='txtQuestionText' class='form-control form-control-sm'/>";
        txt = txt + "</div>";
        txt = txt + "</div>";

        txt = txt + "<div class='row mb-2'>";
        txt = txt + "<div class='col-md-2'><label>Description</label></div>";
        txt = txt + "<div class='col-md-10'><input type='text' autocomplete='off' id='txtQuestionDescription' class='form-control form-control-sm'/>";
        txt = txt + "</div>";
        txt = txt + "</div>";

        txt = txt + "<h6 id='lblAnswerNo'>ANSWER</h6>";
        txt = txt + "<hr/>";
        txt = txt + "<div id='answer" + questionno + "'>";
        txt = txt + "<div class='row mb-2'>";
        txt = txt + "<div class='col-md-2'><label>Type</label></div>";
        txt = txt + "<div class='col-md-10'>";
        txt = txt + "<select id='ddlAnswerType' class='form-select form-select-sm AnswerType' data-value=" + questionno + "></select>";
        txt = txt + "<div id='answertype" + questionno + "'>";
        txt = txt + "</div>";
        txt = txt + "</div>";
        txt = txt + "</div>";
        txt = txt + "</div>";
        txt = txt + "</div>";
        txt = txt + "</div>";
        txt = txt + "</div>";
        $("#QuestionContainer").append(txt);

        // Question Type
        let url = "QuestionType";
        $.get(url, function (data) {
            $("#question" + questionno + " .QuestionType").empty();
            $("#question" + questionno + " .QuestionType").append("<option value=''>Select</option>")
            data.map(function (x) {
                $("#question" + questionno + " .QuestionType").append("<option value=" + x.idType + ">" + x.name + "</option>");
            });
        });

        // Answer Type
        url = "AnswerType";
        $.get(url, function (data) {
            $("#question" + questionno + " .AnswerType").empty();
            $("#question" + questionno + " .AnswerType").append("<option value=''>Select</option>")
            data.map(function (x) {
                $("#question" + questionno + " .AnswerType").append("<option value=" + x.idType + ">" + x.name + "</option>");
            });
        });
    }
    // Survey Detail Save
    $("#btnSaveDetail").on("click", function () {
        let url = "SaveSurveyDetail";
        let timer = $("#txtTime").val();
        let survCat = $("#ddlSurveyType option:selected").val();
        let questionDiv = $("#QuestionContainer").children().last().attr('id');
        var questionDivCount = questionDiv.slice(-1);
        questionno = parseInt(questionDivCount);
        //console.log(questionno);
        if (Detailvalidation() == true) {
            let param = [];

            let answertype = '';
            let questiontype = '';
            let anstext = false;
            let anstextmarks = 0;
            let anstextarea = false;
            let anstextareamarks = 0;

            let boolanschk1 = false;
            let boolanschk2 = false;
            let boolanschk3 = false;
            let boolanschk4 = false;

            let boolansradio1 = false;
            let boolansradio2 = false;
            let boolansradio3 = false;
            let boolansradio4 = false;

            let anschktext1 = "";
            let anschktext2 = "";
            let anschktext3 = "";
            let anschktext4 = "";
            let anschktext1marks = 0;
            let anschktext2marks = 0;
            let anschktext3marks = 0;
            let anschktext4marks = 0;
            let anschkmarks = 0;

            let ansradiotext1 = "";
            let ansradiotext2 = "";
            let ansradiotext3 = "";
            let ansradiotext4 = "";
            let ansradiotext1marks = 0;
            let ansradiotext2marks = 0;
            let ansradiotext3marks = 0;
            let ansradiotext4marks = 0;
            let ansradiomarks = 0;

            let ansrange = false;
            let anslowrange = "";
            let anslowlabel = "";
            let anshighrange = "";
            let anshighlabel = "";
            let ansrangemarks = 0;

            let totalmarks = 0;
            for (let i = 1; i <= questionno; i++) {
                let divQ = "#question" + i;
                let divA = "#answer" + i;
                questiontype = $(divQ).find("#ddlQuestionType option:selected").text();
                //console.log(questiontype);
                answertype = $(divA).find("#ddlAnswerType option:selected").text();
                if (answertype == 'SHORT ANSWER') {
                    anstext = true;
                    anstextmarks = parseInt($("#answertype" + i).find("#txtmarks1").val());
                    totalmarks += anstextmarks;
                }
                else if (answertype == 'PARAGRAPH') {
                    anstextarea = true;
                    anstextareamarks = parseInt($("#answertype" + i).find("#txtmarks1").val());
                    totalmarks += anstextareamarks;
                }
                else if (answertype == 'CHECKBOX') {
                    anschktext1 = $("#answertype" + i).find("#txt1").val();
                    anschktext2 = $("#answertype" + i).find("#txt2").val();
                    anschktext3 = $("#answertype" + i).find("#txt3").val();
                    anschktext4 = $("#answertype" + i).find("#txt4").val();
                    anschktext1marks = parseInt($("#answertype" + i).find("#txtmarks1").val());
                    anschktext2marks = parseInt($("#answertype" + i).find("#txtmarks2").val());
                    anschktext3marks = parseInt($("#answertype" + i).find("#txtmarks3").val());
                    anschktext4marks = parseInt($("#answertype" + i).find("#txtmarks4").val());
                    boolanschk1 = anschktext1 == "" ? false : true;
                    boolanschk2 = anschktext2 == "" ? false : true;
                    boolanschk3 = anschktext3 == "" ? false : true;
                    boolanschk4 = anschktext4 == "" ? false : true;
                    //checking maximum checkbox marks
                    let chktextmarksarr = [anschktext1marks, anschktext2marks, anschktext3marks, anschktext4marks]; 
                    //anschkmarks = Math.max.apply(Math, chktextmarksarr);
                    anschkmarks = chktextmarksarr.reduce((a, b) => a + b, 0);
                    totalmarks += anschkmarks;
                    //console.log(anschkmarks);
                }
                else if (answertype == 'OPTION') {
                    ansradiotext1 = $("#answertype" + i).find("#txt1").val();
                    ansradiotext2 = $("#answertype" + i).find("#txt2").val();
                    ansradiotext3 = $("#answertype" + i).find("#txt3").val();
                    ansradiotext4 = $("#answertype" + i).find("#txt4").val();
                    ansradiotext1marks = parseInt($("#answertype" + i).find("#txtmarks1").val());
                    ansradiotext2marks = parseInt($("#answertype" + i).find("#txtmarks2").val());
                    ansradiotext3marks = parseInt($("#answertype" + i).find("#txtmarks3").val());
                    ansradiotext4marks = parseInt($("#answertype" + i).find("#txtmarks4").val());
                    boolansradio1 = ansradiotext1 == "" ? false : true;
                    boolansradio2 = ansradiotext2 == "" ? false : true;
                    boolansradio3 = ansradiotext3 == "" ? false : true;
                    boolansradio4 = ansradiotext4 == "" ? false : true;
                    //checking maximum radio marks
                    let radiotextmarksarr = [ansradiotext1marks, ansradiotext2marks, ansradiotext3marks, ansradiotext4marks];
                    ansradiomarks = Math.max.apply(Math, radiotextmarksarr);
                    totalmarks += ansradiomarks;
                }
                else if (answertype == 'LINEAR SCALE') {
                    ansrange = true;
                    anslowrange = $("#ddlLowRange option:selected").text();
                    anshighrange = $("#ddlHighRange option:selected").text();
                    anslowlabel = $("#txtLowLabel").val();
                    anshighlabel = $("#txtHighLabel").val();
                    ansrangemarks = parseInt($("#answertype" + i).find("#txtmarks1").val());

                    totalmarks += ansrangemarks;
                }
                param.push({
                    "QuestionNo": i,
                    "IDSurvey": $("#hdIDSurveyDetail").val(),
                    "FormTitle": $("#txtTitle").val(),
                    "FormDesc": $("#txtDescription").val(),
                    "Marks": $("#txtMarks").val(),
                    "Time": $("#txtTime").val(),
                    "QuestionType": questiontype,
                    "QuestionText": $(divQ).find("#txtQuestionText").val(),
                    "QuestionDesc": $(divQ).find("#txtQuestionDescription").val(),
                    "AnswerType": answertype,
                    "AnswerText": anstext,
                    "AnswerTextMarks": anstextmarks,
                    "AnswerTextArea": anstextarea,
                    "AnswerTextAreaMarks": anstextareamarks,
                    "AnswerCheckbox1": boolanschk1,
                    "AnswerCheckbox2": boolanschk2,
                    "AnswerCheckbox3": boolanschk3,
                    "AnswerCheckbox4": boolanschk4,
                    "AnswerCheckboxText1": anschktext1,
                    "AnswerCheckboxText2": anschktext2,
                    "AnswerCheckboxText3": anschktext3,
                    "AnswerCheckboxText4": anschktext4,
                    "AnswerCheckbox1Marks": anschktext1marks,
                    "AnswerCheckbox2Marks": anschktext2marks,
                    "AnswerCheckbox3Marks": anschktext3marks,
                    "AnswerCheckbox4Marks": anschktext4marks,
                    "AnswerRadio1": boolansradio1,
                    "AnswerRadio2": boolansradio2,
                    "AnswerRadio3": boolansradio3,
                    "AnswerRadio4": boolansradio4,
                    "AnswerRadioText1": ansradiotext1,
                    "AnswerRadioText2": ansradiotext2,
                    "AnswerRadioText3": ansradiotext3,
                    "AnswerRadioText4": ansradiotext4,
                    "AnswerRadio1Marks": ansradiotext1marks,
                    "AnswerRadio2Marks": ansradiotext2marks,
                    "AnswerRadio3Marks": ansradiotext3marks,
                    "AnswerRadio4Marks": ansradiotext4marks,
                    "LinearScale": ansrange,
                    "LinearScaleLow": anslowrange,
                    "LinearScaleLowLabel": anslowlabel,
                    "LinearScaleHigh": anshighrange,
                    "LinearScaleHighLabel": anshighlabel,
                    "LinearScaleMarks": ansrangemarks,
                    "EntryUser": useremail
                });
            }
            //console.log(param);
            let info = { "Questions": param, "IDSurvey": $("#hdIDSurveyDetail").val(), "TotalMarks": totalmarks, "Timer": timer, "IDCategory": survCat };
            //console.log(info);

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
    });
    function Detailvalidation() {
        if ($("#txtTitle").val() == "") {
            alert("Form title is missing....");
            $("#txtTitle").focus();
            return false;
        }
        if ($("#txtDescription").val() == "") {
            alert("Form description is missing....");
            $("#txtDescription").focus();
            return false;
        }
        //if (questionno == 1) {
        //    alert("Question detail not found....");
        //    return false;
        //}
        return true;
    }

    //Test PDF
    $("#btnTestPDF").on("click", function () {
        var element = document.getElementById('QuestionContainer');
        html2pdf(element);
    });

    //Share Survey Modal Open
    $("#SurveyContainer").on('click', '.lblShare', function () {
        let idSurvey = $(this).attr("data-value");
        let surveyCat = $(this).attr("id");
        let url = "SurveyDetail";
        let param = { IDSurvey: idSurvey };
        $.get(url, param, function (data) {
            if (surveyCat == 3) {
                data.map(function (x) {
                    $("#hdIDApprSurveyShare").val(x.idSurvey);
                    $("#lblShareApprSurveyHeader").text(x.code);
                    $("#txtApprSurveyName").text(x.name);
                    $("#ModalSurveyApprShare").modal('show');
                });

                let modalName = "#ModalSurveyApprShare";
                $('#ddlDept').select2({
                    dropdownParent: $('#ModalSurveyApprShare'),
                    tags: true,
                    placeholder: 'Select Department(s)',
                    maximumSelectionLength: 4,
                    allowClear: true,
                });
                $('#ddlEmp').select2({
                    dropdownParent: $('#ModalSurveyApprShare'),
                    tags: true,
                    placeholder: 'Select Employee(s)',
                    maximumSelectionLength: 4,
                    allowClear: true,
                });
                url = "DeptList";
                $.get(url, function (data) {
                    $("#ddlDept").empty();
                    data.map(function (x) {
                        //console.log(x);
                        $("#ddlDept").append("<option value=" + x.departmentId + ">" + x.department + "</option>");
                    });
                });
                $("#ddlDept").on("select2:select select2:unselect", function (e) {
                    //this returns all the selected item
                    var item = $(this).val();
                    //console.log(item);
                    let empDdlID = "#ddlEmp";
                    employeeList(item, modalName, empDdlID);
                });

                $('#ddlApprDept').select2({
                    dropdownParent: $('#ModalSurveyApprShare'),
                    tags: true,
                    placeholder: 'Select Department(s)',
                    maximumSelectionLength: 4,
                    allowClear: true,
                });
                $('#ddlApprEmp').select2({
                    dropdownParent: $('#ModalSurveyApprShare'),
                    tags: true,
                    placeholder: 'Select Employee(s)',
                    maximumSelectionLength: 4,
                    allowClear: true,
                });
                url = "DeptList";
                $.get(url, function (data) {
                    $("#ddlApprDept").empty();
                    data.map(function (x) {
                        //console.log(x);
                        $("#ddlApprDept").append("<option value=" + x.departmentId + ">" + x.department + "</option>");
                    });
                });
                $("#ddlApprDept").on("select2:select select2:unselect", function (e) {
                    //this returns all the selected item
                    var item = $(this).val();
                    //console.log(item);
                    let empDdlID = "#ddlApprEmp";
                    employeeList(item, modalName, empDdlID);
                });
            }
            else {
                data.map(function (x) {
                    $("#hdIDSurveyShare").val(x.idSurvey);
                    $("#lblShareSurveyHeader").text(x.code);
                    $("#txtSurveyName").text(x.name);
                    $("#ModalSurveyShare").modal('show');
                });
            }
        });
    });
    //Share Survey Modal Close
    $("#btnShareClose").on("click", function () {
        $("#ModalSurveyShare").modal('hide');
        location.reload(true);
    });
    $("#btnApprShareClose").on("click", function () {
        $("#ModalSurveyApprShare").modal('hide');
        location.reload(true);
    });
    //Share survey option
    $("#btnSurveyShareopt").on("click", function () {
        let txt = "";
        if ($("#optEmail").is(":checked")) {
            txt += "<textarea class='form-control' rows='3' id='txtEmailID' placeholder='Enter Email ID(s) using'></textarea>";
        }
        else if ($("#optEmp").is(":checked")) {
            txt += "<div class='d-flex align-items-center justify-content-between'>";
            txt += "<div class='w-50 me-2'>";
            txt += "<label class='form-label'>Department:</label>";
            /*txt += "<select class='form-select form-select-sm' id='ddlDept'></select>";*/
            txt += "<select class='form-control form-control-sm' multiple='multiple' id='ddlDept'></select>";            
            txt += "</div>";
            txt += "<div class='w-50 ms-2'>";
            txt += "<label class='form-label'>Employee:</label>";
            txt += "<select class='form-control form-control-sm' multiple='multiple' id='ddlEmp'></select>";
            txt += "</div>";
            txt += "</div>";
        }
        $("#SurveyShareContainer").empty();
        $("#SurveyShareContainer").append(txt);
        $('#ddlDept').select2({
            dropdownParent: $('#ModalSurveyShare'),
            tags: true,
            placeholder: 'Select Department(s)',
            maximumSelectionLength: 4,
            allowClear: true,
        });
        $('#ddlEmp').select2({
            dropdownParent: $('#ModalSurveyShare'),
            tags: true,
            placeholder: 'Select Employee(s)',
            maximumSelectionLength: 4,
            allowClear: true,
        });
        let modalName = "#ModalSurveyShare";

        // Department List
        url = "DeptList";
        $.get(url, function (data) {
            $("#ddlDept").empty();
            data.map(function (x) {
                //console.log(x);
                $("#ddlDept").append("<option value=" + x.departmentId + ">" + x.department + "</option>");
            });
        });
        $("#ddlDept").on("select2:select select2:unselect", function (e) {
            //this returns all the selected item
            var item = $(this).val();
            //console.log(item);
            let empDdlID = "#ddlEmp";
            employeeList(item, modalName, empDdlID);
        });
    });

    

    function employeeList(deptidvalue, modalName, empDdlID) {
        //$('#ddlEmp').select2({
        //    dropdownParent: $(modalName),
        //    tags: true,
        //    placeholder: 'Select Employee(s)',
        //    maximumSelectionLength: 4,
        //    allowClear: true,
        //});
        //console.log(deptidvalue);
        for (var i = 0; i < deptidvalue.length; i++) {
            //console.log(deptidvalue[i]);
            // Employee List
            url = "EmpList";
            let param = { "DepartmentId": deptidvalue[i]};
            $.get(url, param, function (data) {
                data.map(function (x) {
                    //console.log(x);
                    $(empDdlID).append("<option value=" + x.empno + ">" + x.empfirstname + " " + x.empmiddlename + " " + x.emplastname + " " + "</option>");
                });
            });
        }
    }

    //Share Survey
    $("#btnShare").on("click", function () {
        let idSurvey = $("#hdIDSurveyShare").val();
        if ($("#optEmail").is(":checked")) {
            let arrEmail = $("#txtEmailID").val().split(',');
            arrEmail = arrEmail.map(function (el) {
                return el.trim();
            });
            //console.log(arrEmail);
            let url = "ShareLink";
            let info = {
                mToEmail: arrEmail,
                IDSurvey: idSurvey,
            }
            //console.log(info);

            $.ajax({
                url: url,
                type: "POST",
                data: info,
                success: function (msg) {
                    //alert(msg);
                    if (msg == "") {
                        Swal.fire({
                            icon: 'success',
                            title: 'Success',
                            text: 'Email Successfully Send!!',
                            //timer: 1500
                        });
                        $("#ModalSurveyShare").modal('hide');
                        //location.reload(true);
                    }
                    else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error Occured',
                            text: msg,
                            //timer: 1500
                        });
                    }
                }
            });
        }
        else if ($("#optEmp").is(":checked")) {
            let info = [];
            let info2 = [];
            var selected = $('#ddlEmp').val();
            var boolRetag = false;
            //console.log(selected);
            for (var i = 0; i < selected.length; i++) {
                //console.log(selected[i]);
                info.push({
                    "EmpID": selected[i],
                    "IDSurvey": idSurvey,
                    "Retag": boolRetag
                });
            }
            //console.log(info);
            // Employee List
            let url2 = "CheckEmployeeLink";
            let url3 = "SaveEmployeeLink";
            let param = { "EmpShare": info };
            //console.log(param);
            let param3 = { "EmpShare": info, "empemail": useremail };
            let param2 = {};
            //let param2 = { "EmpShare": info, "Retag": boolRetag };
            $.ajax({
                url: url2,
                type: "POST",
                data: param,
                success: function (msg) {
                    //alert(msg);
                    if (msg) {
                        if (msg == "2") {
                            Swal.fire('Employee already tagged twice!!', '', 'error')
                        }
                        else if (msg == "0") {
                            //console.log("test");
                            $.ajax({
                                url: url3,
                                type: "POST",
                                data: param3,
                                success: function (msg) {
                                    //alert(msg);
                                    Swal.fire({
                                        icon: 'success',
                                        title: 'Success',
                                        text: 'Employee Successfully Tagged.'
                                    });
                                }
                            });
                        }
                        else {
                            Swal.fire({
                                icon: 'warning',
                                title: 'Duplicate Tagging Occured!!',
                                html: 'This Employee is already tagged.<br>Do you want to retag them?',
                                showCancelButton: true,
                                showDenyButton: true,
                                confirmButtonText: 'Yes',
                                denyButtonText: 'No'
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    //boolRetag = true;
                                    for (var i = 0; i < selected.length; i++) {
                                        //console.log(selected[i]);
                                        if (selected[i] == msg) {
                                            boolRetag = true;
                                        }
                                        else {
                                            boolRetag = false;
                                        }
                                        //console.log(boolRetag);
                                        info2.push({
                                            "EmpID": selected[i],
                                            "IDSurvey": idSurvey,
                                            "Retag": boolRetag
                                        });
                                    }
                                    param2 = { "EmpShare": info2, "empemail": useremail };
                                    console.log(param2);
                                    $.ajax({
                                        url: url3,
                                        type: "POST",
                                        data: param2,
                                        success: function (msg) {
                                            //alert(msg);
                                            Swal.fire({
                                                icon: 'success',
                                                title: 'Success',
                                                text: 'Employee Successfully Tagged.'
                                            });

                                        }
                                    });
                                }
                                else if (result.isDenied) {
                                    Swal.fire('Changes are not saved', '', 'info')
                                }
                            })
                        }
                    }
                    //else if (msg == "2") {
                    //    Swal.fire('Employee already tagged twice!!', '', 'error')
                    //}
                    //else if (msg == "0") {
                    //    //console.log("test");
                    //    $.ajax({
                    //        url: url3,
                    //        type: "POST",
                    //        data: param,
                    //        success: function (msg) {
                    //            //alert(msg);
                    //            Swal.fire({
                    //                icon: 'success',
                    //                title: 'Success',
                    //                text: 'Employee Successfully Tagged.'
                    //            });
                    //        }
                    //    });
                    //}
                    else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'Error Occured!!!'
                        });
                    }
                }
            });
        }
        else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error Occured!!!'
            });
        }
    });

    $("#btnApprShare").on("click", function () {
        let idSurvey = $("#hdIDApprSurveyShare").val();
        console.log(idSurvey);
        let info = [];
        let info2 = [];
        //let aprseeID = 0;
        var selectedAppraisee = $('#ddlEmp').val();
        var selectedAppraiser = $('#ddlApprEmp').val();
        var boolRetag = false;
        //console.log(selectedAppraisee);
        //console.log(selectedAppraiser);
        //for (var i = 0; i < selectedAppraisee.length; i++) {
        //    //console.log(selected[i]);
        //    aprseeID = selectedAppraisee[i];
        //    info.push({
        //        "EmpID": selectedAppraisee[i],
        //        "IDSurvey": idSurvey,
        //        "Retag": boolRetag,
        //        "Appraisee" : ""
        //    });
        //}
        for (var i = 0; i < selectedAppraiser.length; i++) {
            //console.log(selected[i]);
            info.push({
                "EmpID": selectedAppraiser[i],
                "IDSurvey": idSurvey,
                //"Retag": boolRetag,
                "Appraisee": selectedAppraisee
            });
        }
        info.push({
            "EmpID": selectedAppraisee,
            "IDSurvey": idSurvey,
            //"Retag": boolRetag,
            //"Appraisee": ""
        });

        console.log(info);
        // Employee List
        let url2 = "CheckEmployeeLink";
        let url3 = "SaveApprEmployeeLink";
        let param = { "EmpShare": info, "empemail": useremail };
        //let param2 = {};
        //let param2 = { "EmpShare": info, "Retag": boolRetag };
        $.ajax({
            url: url3,
            type: "POST",
            data: param,
            success: function (msg) {
                //alert(msg);
                if (msg == "") {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Employee Successfully Tagged.'
                    });
                }
                else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error Occured',
                        text: msg
                    });
                }
            }
        });
    });

    //Open Survey Response Page
    $("#SurveyContainer").on('click', '.lblResponse', function () {
        let idSurvey = $(this).attr("data-value");
        let url2 = "SurveyDetail";
        let surveyCat = $(this).attr("id");
        //let param = { IDSurvey: idSurvey };
        //$.get(url2, param, function (data1) {
        //    //console.log(data1);
        //    data1.map(function (y) {
        //        surveyCat = y.idCategory;
        //    });
        //});
        let localurl = window.location.origin;
        //console.log(localurl);
        const url = localurl + '/SurveyResponse?id=' + idSurvey + '&type=' + surveyCat;
        window.location.href = url;
        //console.log(url);
    });
});