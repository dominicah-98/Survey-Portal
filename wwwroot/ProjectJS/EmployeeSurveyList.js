$(function () {
    Default();
    function Default() {
        let username = $("#hdSessionUname").text();
        let useremail = $("#hdSessionUEmail").text();
        let userid = $("#hdSessionUID").text();
        //console.log(userid);

        let url = "EmpSurveyList";
        let param = {
            EmpID: userid
        };
        let param2 = []
        let info = {};
        let info2 = {};
        let url2 = "EmpSurveyDetail";
        let url3 = "ApprseeDetail";
        //Survey_Emp_Share
        $.get(url, param, function (data) {
            data.map(function (x) {
                //$("#hdIDSurvey").val(x.idSurvey);
                //console.log(x);
                info = { IDSurvey: x.idSurvey };
                info2 = { Appraisee: x.appraisee };
                let apprseeName = "";
                $.get(url3, info2, function (data) {
                    data.map(function (z) {
                        console.log(z);
                        apprseeName = z.empfirstname + " " + z.empmiddlename + " " + z.emplastname;
                    });
                });
                //console.log(info2);
                //Survey_Header
                $.get(url2, info, function (data) {
                    data.map(function (y) {
                        //$("#hdIDSurvey").val(x.idSurvey);
                        //console.log(y);
                        if (x.response == 1) {
                            ShowInactTable(y.name, y.remarks, x.response, x.retag, y.surveyGUID, y.timer, y.startDate, y.endDate, x.idSurvey, apprseeName);
                        }
                        else {
                            ShowTable(y.name, y.remarks, x.response, x.retag, y.surveyGUID, y.timer, y.startDate, y.endDate, x.idSurvey, apprseeName);
                        }
                    });
                    //$('#tblEmpSurveyList').DataTable({
                    //    //order: [[3, 'desc']],
                    //    "order": []
                    //});
                });
            });
        });
    }

    function ShowTable(surveyName, surveyDetails, response, retag, guid, timer, startDate, endDate, idSurvey, apprseeName) {
        let txt = "";
        txt = txt + "<tr>";
        //txt = txt + "<td>"+code+"</td>";
        txt = txt + "<td style='width:15%'>" + surveyName + "</td>";
        txt = txt + "<td style='width:15%'>" + surveyDetails + "</td>";
        if (response == 1) {
            txt = txt + "<td style='width:10%' class='text-primary fw-bold'>Submitted</td>";
            //txt = txt + "<td>" + totalMarksResult + "</td>";
        }
        else {
            txt = txt + "<td style='width:10%' class='text-danger'>Not Submitted</td>";
            //txt = txt + "<td>" + totalMarksResult + "</td>";
        }
        if (retag == 1) {
            txt = txt + "<td style='width:10%' class=''><span class='card-icon text-secondary bg-blue px-2 rounded'>Retagged</span></td>";
        }
        else {
            txt = txt + "<td style='width:10%' class=''><span class='card-icon text-secondary bg-custom-secondary px-2 rounded d-none'>Not Retagged</span></td>";

        }
        if (apprseeName == "") {
            txt = txt + "<td style='width:10%' class='text-danger'>Not Applicable</td>";
        }
        else {
            txt = txt + "<td style='width:10%' class='text-primary fw-bold'>" + apprseeName + "</td>";
        }
        txt = txt + "<td style='width:10%'>" + timer + "</td>";
        txt = txt + "<td style='width:10%'>" + startDate + "</td>";
        txt = txt + "<td style='width:10%'>" + endDate + "</td>";
        txt = txt + "<td style='width:10%'><a class='btn btn-primary btn-sm btnGiveTest' data-value=" + guid + " id='" + retag + "' data-id='" + idSurvey + "'>Give Test</a></td>";
        /*txt = txt + "<td><a class='lblShowResponse' href='' data-value=" + userEmail + ">Show Response</a></td>";*/
        //txt = txt + "<td>" + totalMarksResult + "</td>";
        txt = txt + "</tr>";

        $("#tblSurveyList").append(txt);
    }
    function ShowInactTable(surveyName, surveyDetails, response, retag, guid, timer, startDate, endDate, idSurvey, apprseeName) {
        let txt = "";
        txt = txt + "<tr>";
        //txt = txt + "<td>"+code+"</td>";
        txt = txt + "<td style='width:15%'>" + surveyName + "</td>";
        txt = txt + "<td style='width:15%'>" + surveyDetails + "</td>";
        if (response == 1) {
            txt = txt + "<td style='width:10%' class='text-primary fw-bold'>Submitted</td>";
            //txt = txt + "<td>" + totalMarksResult + "</td>";
        }
        else {
            txt = txt + "<td style='width:10%' class='text-danger'>Not Submitted</td>";
            //txt = txt + "<td>" + totalMarksResult + "</td>";
        }
        if (retag == 1) {
            txt = txt + "<td style='width:10%' class=''><span class='card-icon text-secondary bg-blue px-2 rounded'>Retagged</span></td>";
        }
        else {
            txt = txt + "<td style='width:10%' class=''><span class='card-icon text-secondary bg-custom-secondary px-2 rounded d-none'>Not Retagged</span></td>";

        }
        if (apprseeName == "") {
            txt = txt + "<td style='width:10%' class='text-danger'>Not Applicable</td>";
        }
        else {
            txt = txt + "<td style='width:10%' class='text-primary fw-bold'>" + apprseeName + "</td>";
        }
        txt = txt + "<td style='width:10%'>" + timer + "</td>";
        txt = txt + "<td style='width:10%'>" + startDate + "</td>";
        txt = txt + "<td style='width:10%'>" + endDate + "</td>";
        txt = txt + "<td style='width:10%'><label class='lblShowResponse btn btn-light btn-sm text-secondary' data-value=''>Give Test</label></td>";
        /*txt = txt + "<td><a class='lblShowResponse' href='' data-value=" + userEmail + ">Show Response</a></td>";*/
        //txt = txt + "<td>" + totalMarksResult + "</td>";
        txt = txt + "</tr>";

        $("#tblInactSurveyList").append(txt);
    }

    $("#tblSurveyList").on('click', '.btnGiveTest', function () {
        let guidSurvey = $(this).attr("data-value");
        let idSurvey = $(this).attr("data-id");
        let sdate = "";
        let edate = "";
        let dateFlag = false;
        //console.log(idSurvey);
        let retag = $(this).attr("id");
        let url = "EmpSurveyDetail";
        let info = { IDSurvey: idSurvey };
        $.get(url, info, function (data) {
            data.map(function (y) {
                //console.log(y);
                sdate = y.startDate;
                edate = y.endDate;
            });
            dateFlag = fnDateCheck(sdate, edate);
            //console.log(dateFlag);
            if (dateFlag == true) {
                let localurl = window.location.origin;
                console.log(localurl);
                const url2 = localurl + '/UserSurveyForm?s=' + guidSurvey + "&tag=" + retag;
                console.log(url2);
                window.location.href = url2;
            }
            if (dateFlag == false) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Survey Date Has Passed!',
                    text: 'You won\'t be able to give this survey now.'
                });
            }
        });
    });

    function fnMonthCoverter(month) {
        if (month == "Jan") {
            month = 01;
        }
        if (month == "Feb") {
            month = 02;
        }
        if (month == "Mar") {
            month = 03;
        }
        if (month == "Apr") {
            month = 04;
        }
        if (month == "May") {
            month = 05;
        }
        if (month == "Jun") {
            month = 06;
        }
        if (month == "Jul") {
            month = 07;
        }
        if (month == "Aug") {
            month = 08;
        }
        if (month == "Sep") {
            month = 09;
        }
        if (month == "Oct") {
            month = 10;
        }
        if (month == "Nov") {
            month = 11;
        }
        if (month == "Dec") {
            month = 12;
        }
        return month;
    }
    function fnDateCheck(sdate, edate) {
        //Breaking Dates into array (string)
        let arrsdate = sdate.split('/');
        let arredate = edate.split('/');
        //Date conversion
        let startMonth = fnMonthCoverter(arrsdate[1]);
        let endMonth = fnMonthCoverter(arredate[1]);
        let startDay = parseInt(arrsdate[0]);
        let endDay = parseInt(arredate[0]);
        let startYear = parseInt(arrsdate[2]);
        let endYear = parseInt(arredate[2]);

        var startDate = new Date(startYear, startMonth, startDay);
        var endDate = new Date(endYear, endMonth, endDay);

        //Current Date
        var d = new Date();
        var currmonth = d.getMonth() + 1;
        var currday = d.getDate();
        var curryear = d.getFullYear();
        var currDate = new Date(curryear, currmonth, currday);

        //Date Checking
        if (currDate >= startDate && currDate <= endDate) {
            return true;
        }
        else {
            return false;
        }
    }
});