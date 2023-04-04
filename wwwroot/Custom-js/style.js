$(document).ready(function(){
  // For Sidebar
  $('#hamburger-menu').click(() => {
    $('#hamburger-menu').toggleClass('responsive');
    $('.menu-item').toggleClass('d-block');
    // $('#mySidenav').toggleClass('responsive');
    // $('#main').toggleClass('responsive');
    // $('#topnav').toggleClass('responsive');
    // $('.dropdown').toggleClass('responsive');
    // $('.menu').toggleClass('responsive');
  })
  // $('.overlay').click(() => {
  //   $('#hamburger-menu').toggleClass('responsive');
  //   $('#mySidenav').toggleClass('responsive');
  //   $('#main').toggleClass('responsive');
  //   $('#topnav').toggleClass('responsive');
  //   $('.dropdown').toggleClass('responsive');
  //   $('.menu').toggleClass('responsive');
  // })

  // $('.sub-btn').click(function () {
  //   $(this).next('.sub-menu').slideToggle();
  //   $(this).find('.dropdown1').toggleClass('rotate');
  // });

});



var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
})