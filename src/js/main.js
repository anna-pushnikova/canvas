import Swiper from  'swiper'
import Rellax from 'rellax'
import AOS from 'aos'
import 'flexslider'
import { tns } from "tiny-slider/src/tiny-slider"

$(function() {
  let header = $('#header'),
      introHeight = $('#slider').innerHeight(),
      scrollOffset = $(window).scrollTop(),
      goUp = $("#goUp");

  goUp.on('click', function () {
    $('html, body').animate({
        scrollTop: 0
    }, 500);
  });

  checkScroll(scrollOffset);

  function checkScroll(scrollOffset) {
    if (scrollOffset >= 1) {
      header.addClass("header--dark");
    } else {
      header.removeClass("header--dark");
    }
    if (scrollOffset >= introHeight / 2) {
      header.addClass("header--shrinked");
      goUp.show('fast')
    } else {
      header.removeClass("header--shrinked");
      goUp.hide('fast')
    }
  }

  $('[data-scrollto]').on('click', function(event) {
    const headerHeight = $('#header').innerHeight()
  
    event.preventDefault()

    let $this = $(this),
        elementId = $this.data('scrollto'),
        elementOffset = $(elementId).offset().top - headerHeight;

    $("html, body").animate({
      scrollTop: elementOffset
    }, 1000)
  })

  function introParallax() {
    new Rellax('.rellax', {
      center: true,
      wrapper: null,
      round: true,
      vertical: true,
      horizontal: false
    });

    $(window).scroll(() => {
      $(".slider-caption").css("opacity", 1 - $(window).scrollTop() / 500);

      scrollOffset = $(window).scrollTop();
      checkScroll(scrollOffset);
    });
  }
  
  introParallax()

  $('#iconSearch').on('click', () => {
    $('#headerContent').css('opacity', '0')
    $('#searchForm').show(500)
    $('#iconCross').show(500)
  })

  $('#iconCross').on('click', () => {
    $('#searchForm').hide(500)
    $('#iconCross').hide(500)
    $('#headerContent').css('opacity', '1')
  })

  const swiper = new Swiper('.swiper-container', {
    slidesPerView: 1,
    centeredSlides: true,
    parallax: true,
    loadPrevNext: true,
    navigation: {
      nextEl: '.slider-arrow-right',
      prevEl: '.slider-arrow-left'
    }
  });

  swiper.on('reachEnd', function() {
    $('#logoImage').attr("src","/images/logo/logo.png")
  })

  swiper.on('fromEdge', function() {
    $('#logoImage').attr("src","/images/logo/logo-dark.png")
  })

  $('.slider-title').addClass('animate__animated animate__fadeInUp');
  $('.slider-desc').addClass('animate__animated animate__fadeInUp animate__delay-1s')

  swiper.on('slideChange', function () {
    $('.slider-title').removeClass('animate__animated animate__fadeInUp');
    $('.slider-desc').removeClass('animate__animated animate__fadeInUp animate__delay-1s')
    setTimeout(() => {    
      $('.slider-title').addClass('animate__animated animate__fadeInUp');
      $('.slider-desc').addClass('animate__animated animate__fadeInUp animate__delay-1s')
    }, 100);

  });

  AOS.init({
    disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
    startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
    initClassName: 'aos-init', // class applied after initialization
    animatedClassName: 'aos-animate', // class applied on animation
    useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
    disableMutationObserver: false, // disables automatic mutations' detections (advanced)
    debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
    throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)
    
    // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
    offset: 120, // offset (in px) from the original trigger point
    delay: 0, // values from 0 to 3000, with step 50ms
    duration: 400, // values from 0 to 3000, with step 50ms
    easing: 'ease', // default easing for AOS animations
    once: false, // whether animation should happen only once - while scrolling down
    mirror: false, // whether elements should animate out while scrolling past them
    anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
  });

  $(window).scroll(startStatiscticsCounter);
  $(window).scroll(startFooterCounter);

  function startStatiscticsCounter() {
    let triggerTop = $('#statisticsTrigger').offset().top,
        triggerHeight = $('#statisticsTrigger').outerHeight(),
        windowHeight = $(window).height();
    if ($(window).scrollTop() > triggerTop+triggerHeight-windowHeight) {
      $(window).off("scroll", startStatiscticsCounter);
      $('.count').each(function () {
        var $this = $(this);
        $({ Counter: 0 }).animate({ Counter: $this.text() }, {
          duration: 2000,
          easing: 'swing',
          step: function () {
            $this.text(Math.ceil(this.Counter));
          }
        });
      });
    }
  }

  function startFooterCounter() {
    let triggerTop = $('#footerTrigger').offset().top,
      windowHeight = $(window).height();
    if ($(window).scrollTop() > triggerTop-windowHeight) {
      console.log($(window).scrollTop())
      $(window).off("scroll", startFooterCounter);
      $('.footer_count').each(function () {
        var $this = $(this);
        $({ Counter: 0 }).animate({ Counter: $this.text() }, {
          duration: 2000,
          easing: 'swing',
          step: function () {
            $this.text(new Intl.NumberFormat('en-US').format(Math.ceil(this.Counter)));
          }
        });
      });
    }
  }

  $('.flexslider').flexslider({
    animation: "slide",
    itemWidth: 700,
    maxItems: 1,
    directionNav: false
  });

  tns({
    container: '.my-slider',
    nav: false,
    controls: false,
    items: 6,
    autoplayButtonOutput: false,
    slideBy: 1,
    autoplay: true
  });
})


