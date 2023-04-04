$(function () {
    $("#btnLogin").on("click", () => {
        if (validation() == true) {
            let url = "ValidLogin";
            let params = {
                "UserName": $("#txtEmail").val(),
                "Password": $("#txtPassword").val(),
            };
            $.post(url, params, function (data) {
                window.location.href="SurveyCreation";
            });

            //let UserName= $("#txtEmail").val();
            //let Password = $("#txtPassword").val();
            //let url = "http://salesapi.mendine.co.in/api/Emp/UserNamePwdcheck?uname=" + UserName + "&pwd=" + Password;
            //// API Call 
            //$.post(url, function (data) {
            //    /*console.log(data);*/
            //    window.location.href = "SurveyCreation";
            //});
        }
    });
    function validation() {
        if ($("#txtEmail").val() == '') {
            //alert("User name is missing....");
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'User name is missing !',
                timer: 1500
            });
            $("#txtEmail").focus();
            return false;
        }
        if ($("#txtPassword").val() == '') {
            //alert("User password is missing....");
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'User password is missing !',
                timer:1500
            });
            $("#txtPassword").focus();
            return false;
        }
        return true;
    }
});