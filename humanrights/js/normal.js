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

  // header 숨기기
  if ($(window).width() > 1290) {
    let last_scrollTop = 0;
    $(window).scroll(function () {
      if ($(this).scrollTop() > 50) {
        let tmp = $(this).scrollTop();
        if (tmp > last_scrollTop) {
          // scroll down event
          $('.header').addClass('hidden');
        } else {
          // scroll up event
          $('.header').removeClass('hidden');
        }
        last_scrollTop = tmp;
      } else {
        $('.header').removeClass('hidden');
      }
    });
  }

  // header 메뉴 오버
  if ($(window).width() > 1290) {
    $('body').on('mouseenter focusin', '.header', function () {
      $('.sitemap').stop().slideDown(200);
    });
    $('body').on('mouseleave focusout', '.header', function () {
      $('.sitemap').stop().slideUp(200);
    });
  };

  // mobile header
  $('body').on('click', '.header-ham', function(){
    $(this).toggleClass('on');
    $('.sitemap').toggleClass('on');
    $('html, body').toggleClass('scroll-lock');
  });


  //footer 관련사이트
  $("body").on('click', '.foot-rel-btn', function () {
    if ($(this).next('.foot-rel-in').hasClass('on')) {
      $('.foot-rel-btn').removeClass('on');
      $(this).next('.foot-rel-in').removeClass('on');
      $(this).attr('title', '열기');
    } else {
      $('.foot-rel-in').removeClass('on');
      $(this).next('.foot-rel-in').addClass('on');
      $('.foot-rel-btn').removeClass('on');
      $(this).addClass('on');
      $(this).attr('title', '닫기');
    }
  });

  // sub location mobile button
  $('.sub-location-btn').on('click', function(){
    $(this).next('.wrapper').find('.sub-location-ul').stop().slideToggle(200);
  });

  // $("body").on('mouseup focusout', function (e) {
  //   if ($(".foot-rel-ul").has(e.target).length === 0) {
  //     $('.foot-rel-in').removeClass('on');
  //     $('.foot-rel-btn').removeClass('on');
  //     $('.foot-rel-btn').attr('title', '열기');
  //   }
  // });


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

  if (mainTot = 1) {
    $('.slide-ctr--main').css('display', 'none')
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
    slidesPerView: 1,
    spaceBetween: 10,
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
    breakpoints: {
      480: {
        slidesPerView: 2,  //브라우저가 768보다 클 때
        spaceBetween: 15,
      },
      768: {
        slidesPerView: 3,  //브라우저가 768보다 클 때
        spaceBetween: 20,
      },
      1291: {
        slidesPerView: 4,  //브라우저가 1024보다 클 때
        spaceBetween: 30,
      },
    },
  });

  if ($('.main-news-slide').length < 5) {
    $('.slide-ctr--news').css('display', 'none');
  }


  // 충청남도  인권센터 소개 > 활동 영역 박스 탭
  $('.cate-link').on('click', function(){

    let cateLi = $(this).parents('li')
    let cateLink = cateLi.attr('data-link')

    $('.about-history-cate li').removeClass('active');
    $('.about-history-box').removeClass('active');

    $('.about-history-wr').scrollTop();

    cateLi.addClass('active');
    $('#' + cateLink).addClass('active');
  });


  // 상담·구제 신청하기 > 파일첨부
  $(document).ready(function () {
    // 파일 목록을 저장할 배열
    var fileList = [];
    // 최대 파일 갯수
    var maxFiles = 3;

    // 파일 추가 및 삭제 시 파일 목록을 콘솔에 출력하는 함수
    function printFileList() {
      console.log('파일 목록:');
      fileList.forEach(function (file) {
        console.log(file.name);
      });
    }

    // input[type=file]의 변경(파일 선택) 이벤트 핸들러 추가
    $('#file').change(function () {
      var files = $('#file')[0].files; // 선택한 파일 목록 가져오기
      var fileTxtUl = $('.file-txt-ul'); // 파일명 목록을 표시할 <ul> 요소

      // 현재 파일 목록에 추가된 파일 갯수
      var currentFileCount = fileList.length;

      // 선택한 파일 목록을 순회하며 파일명을 <ul>에 추가
      for (var i = 0; i < files.length; i++) {
        if (currentFileCount < maxFiles) {
          var fileName = files[i].name;
          var listItem = $('<li class="file-txt-li"><p>' + fileName +
            '</p><button type="button" class="file-delete-btn"><span></span></button></li>');
          fileTxtUl.append(listItem);

          // 파일 목록에 파일 추가
          fileList.push(files[i]);
          currentFileCount++;

          // 파일 목록 출력
          printFileList();
        } else {
          alert('최대 ' + maxFiles + '개의 파일만 첨부할 수 있습니다.');
          break;
        }
      }

      // input[type=file] 초기화 (같은 파일을 다시 선택할 수 있도록)
      $('#file').val('');
    });

    // 삭제 버튼 클릭 시 해당 파일을 파일 목록에서 삭제
    $('.file-txt-ul').on('click', '.file-delete-btn', function () {
      var deletedFileName = $(this).prev('p').text(); // 삭제된 파일명 가져오기
      $(this).parent().remove();

      // 파일 목록에서 삭제
      fileList = fileList.filter(function (file) {
        return file.name !== deletedFileName;
      });

      // 파일 목록 출력
      printFileList();
    });
  });
});