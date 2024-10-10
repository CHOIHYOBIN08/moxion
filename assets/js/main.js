

//헤더 gnb
$('.gnb-item').hover(
    function() {
        $(this).addClass('hover');
    }, 
    function() {
        $(this).removeClass('hover');
    }
);
var gnb = $('#header');
var lastScrollY = $(window).scrollTop();


$(window).on('scroll', function() {
    var currentScrollY = $(this).scrollTop();

    if (currentScrollY > lastScrollY) {
        // 스크롤 내리면 숨기기
        gnb.addClass('hidden');
        gnb.removeClass('show-before');
    } else {
        // 스크롤 올리면 보이기
        gnb.removeClass('hidden');
        gnb.addClass('show-before');
    }

    // 만약 최상단으로 스크롤 되면 배경색 제거
    if (currentScrollY === 0) {
        gnb.removeClass('hidden');
        gnb.removeClass('show-before');
    }

    lastScrollY = currentScrollY;
});

//메뉴버튼
$('#header .menu-btn .title-area').click(function(){
    $('.nav-menu').addClass('show');
  })
  $('.nav-menu .nav-close').click(function(){
    $('.nav-menu').removeClass('show');
  })
  


//모션

imgList=``;
for (let idx = 38; idx < 151; idx++) {
    first=(idx===38)?"on":'';
    imgList+=`<img class="${first}" src="https://d3877099hb8oti.cloudfront.net/home/1600/${idx.toString().padStart(3, '0')}.webp" alt>`
}

$('.sc-motion .no-canvas').html(imgList);


ScrollTrigger.create({
    trigger:".sc-motion .sticky-wrapper",
    start:"0% 0%",
    end:"100% 100%",
    // markers:true,
    onUpdate:function(self){
        idx=Math.floor(self.progress * ($('.no-canvas img').length-1));
        $('.no-canvas img').eq(idx).addClass('on').siblings().removeClass('on')
    }
})

gsap.to('.sc-motion .bottom-group',{
    scrollTrigger:{
        trigger:".sc-motion",
        start:"0% 0%",
        end:"0 -100%",
        scrub:0,
    },
    opacity:0,
})




// GSAP MatchMedia 사용
gsap.matchMedia().add("(min-width: 1025px)", () => {
  
    gsap.fromTo('.sc-intro .bottom-area .char',
      {
        opacity: 0.3,  
      },
      {
        opacity: 1, 
        color: "#2c3733", 
        scrollTrigger: {
          trigger: ".sc-intro .word-area",
          start: "0% 50%",
          end: "100% 50%",
          scrub: 0,
        },
        stagger: {
          from: "center",
          each: 0.3,  
        }
      }
    );
  
   
    gsap.to('.sc-intro .scroll-group', {
      y: -150,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".sc-intro .scroll-group",
        start: "top 50%",
        end: "top 0%",
        scrub: true,
      }
    });
  
    
    gsap.to('.sc-intro .scroll-group .bg-img svg', {
      scale: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".sc-intro .scroll-group",
        start: "top 50%",
        end: "top 0%",
        scrub: true,
      }
    });
  });
  gsap.matchMedia().add("(max-width: 1024px)", () => {
  
    gsap.set('.sc-intro .scroll-group', { y: 0 });  
  });
  








//비디오
let myScrollTrigger;
myScrollTrigger = ScrollTrigger.create({
    trigger:".sc-video",
    start:"0% 0%",
    end:"100% 50%",
    onEnter:function(){
        $('.sc-video .video-wrapper').addClass('active')
    },
    onLeaveBack:function(){
        $('.sc-video .video-wrapper').removeClass('active')
    }
})
const mm = gsap.matchMedia();
mm.add("(min-width: 1025px)", () => {
    // 1024px 이하일 때 ScrollTrigger 설정
    ScrollTrigger.create({
        trigger: ".sc-video",
        start: "100% 100%",  
        end: "100% 100%",  
        marker:true,
        onEnter: function () {
            document.querySelector('.sc-video .video-wrapper').classList.add('active');
        },
        onLeaveBack: function () {
            document.querySelector('.sc-video .video-wrapper').classList.remove('active');
        }
    });
});
mm.add("(max-width: 1024px)", () => {
    if (myScrollTrigger) {
        myScrollTrigger.kill(); // 저장된 인스턴스만 제거
    }
});




//뉴스존
const swiper = new Swiper('.swiper-card-slide', {
    slidesPerView:'auto',
    speed: 800,
    navigation: {
        nextEl: '.sc-news .btn-next',
        prevEl: '.sc-news .btn-prev',
    },

});
function initAnimations() {
    if (window.innerWidth > 890) { 
        // GSAP from 애니메이션
        gsap.from('.sc-news .swiper-slide', {
            scrollTrigger: {
                trigger: ".sc-news .swiper",
                start: "0% 100%",
                end: "0% 80%",
                toggleActions: "none play none reset"
            },
            opacity: 0,
            yPercent: 30,
            stagger: 0.1,
        });
        // GSAP timeline 애니메이션
        const newsTl = gsap.timeline({
            scrollTrigger: {
                trigger: ".sc-news",
                start: "0% 100%",
                end: "100% 50%",
                scrub: 0,
            },
        });
        newsTl.to('.sc-visual', {
            yPercent: 10,
        }, 'a');
        newsTl.to('.sc-news .line-area', {
            xPercent: -20,
        }, 'a');
    }
}

initAnimations();




//서비스
gsap.fromTo('.sc-service .char-area .char',
    {
        opacity: .3,  
    },
    {
        opacity: 1,  
        scrollTrigger: {
            trigger: ".sc-service .char-area",
            start: "0% 50%",
            end: "100% 50%",
            scrub: 0,
        },
        stagger: {
            from: "center",
            each: 0.3,
        }
    }
); 

//비주얼
const arr = ['01 Film', '02 Construction', '03 Events', '04 Utilities', '05 EVFleet'];

function getResponsiveArray() {
    if (window.innerWidth <= 890) { 
        return arr.map(item => item.split(' ')[0]); 
    }
    return arr; 
}

// 스와이퍼 초기화
const asd = new Swiper('.visual-slide', {
    parallax: true,
    speed: 800,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
        renderBullet: function (index, className) {
            const displayArray = getResponsiveArray(); 
            return `<span class="${className}">
                        <span class="text">${displayArray[index]}</span>
                        <span class="bar">
                            <span class="curr"></span>
                        </span>
                    </span>`;
        }
    }
});


window.addEventListener('resize', () => {
    asd.pagination.render(); 
});


//스크린
$('.cta-area').hover(
    function() {
     
        $('.bg-cover').stop().fadeTo(600, 0); 
    },
    function() {
      
        $('.bg-cover').stop().fadeTo(600, 1); 
    }
);








//푸터
gsap.fromTo('#footer .img-group img',
            {
                y: -200,  
            },
            {
                y: 0,  // 최종 y축 위치 (원래 위치)
                scrollTrigger: {
                    trigger: "#footer",
                    start: "top 80%",  // 애니메이션 시작 지점
                    end: "top 20%",  // 애니메이션 끝 지점
                    scrub: true,  // 스크롤에 따라 애니메이션이 진행되도록 설정
                }
            }
        );





















