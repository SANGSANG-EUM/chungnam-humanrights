$(document).ready(function () {

  // 동일 박스 높이
  $(".match_h > *").matchHeight();

  // header 그림자
  // if ($(window).width() > 1025) {
    $(window).scroll(function () {
      if ($(this).scrollTop() > 0) {
        $('.header').addClass('shadow');
      } else {
        $('.header').removeClass('shadow');
      }
    });
  // }

  // header 메뉴 오버
  $('body').on('mouseenter focusin', '.header', function () {
    $('.sitemap').stop().slideDown(200);
  });
  $('body').on('mouseleave focusout', '.header', function () {
    $('.sitemap').stop().slideUp(200);
  });

  // 메인비주얼 슬라이드        
  let mainvisual = new Swiper(".main-slider", {
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    effect: "fade",
    // pagination: {
    //   el: ".main-visual-pagination",
    //   clickable: true,
    // },
    navigation: {
      nextEl: ".slide-btn--main.next",
      prevEl: ".slide-btn--main.prev",
    },
    on: {
      slideChange: function () {
        if (mainvisual.realIndex > 9) {
          $('.slide-page.current').text(mainvisual.realIndex + 1);
        } else {
          $('.slide-page.current').text(`0${mainvisual.realIndex + 1}`)
        }
      },
    },
    a11y: {
      prevSlideMessage: '이전 슬라이드',
      nextSlideMessage: '다음 슬라이드',
      slideLabelMessage: '총 {{slidesLength}}장의 슬라이드 중 {{index}}번 슬라이드 입니다.',
    },
  });

  // praction 커스텀
  $('.slide-page.current').text('01');
  let mainTot = $('.main-slider .main-slide').length;
  if (mainTot > 9) {
    $('.slide-page.total').text(mainTot);
  } else {
    $('.slide-page.total').text(`0${mainTot}`);
  }


  // 메인 비주얼 슬라이드 정지
  $(".slide-btn--main.pause").click(function () {
    mainvisual.autoplay.stop();
    $(this).css('display', 'none');
    $(".slide-btn--main.play").css('display', 'block');
  });

  // 메인 비주얼 슬라이드 다시재생
  $(".slide-btn--main.play").click(function () {
    mainvisual.autoplay.start();
    $(this).css('display', 'none');
    $(".slide-btn--main.pause").css('display', 'block');
  });


  // 메인 인권홍보 소식 슬라이드        
  let mainNews = new Swiper(".main-news-slider", {
    slidesPerView: 4,
    spaceBetween: 30,
    loop: true,
    loopedSlides: 4,
    navigation: {
      nextEl: ".slide-btn--news.next",
      prevEl: ".slide-btn--news.prev",
    },
    a11y: {
      prevSlideMessage: '이전 슬라이드',
      nextSlideMessage: '다음 슬라이드',
      slideLabelMessage: '총 {{slidesLength}}장의 슬라이드 중 {{index}}번 슬라이드 입니다.',
    },
  });

  if ($('.main-news-slide').length < 5) {
    $('.slide-ctr--news').css('display', 'none');
  }
});