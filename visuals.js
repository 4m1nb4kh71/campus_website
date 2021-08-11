const navbar = document.querySelector('.navbar');
const nav = document.querySelector('.tabs-container');
const navfront = document.querySelector('.nav-front');
const navslide= () =>{
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.tabs-container');
    const navbar = document.querySelector('.navbar');

    burger.addEventListener('click',()=>{
        nav.classList.toggle('burger-active');
        navfront.classList.toggle("navfrontactive") ;
      
        navbar.classList.toggle("navbg");
        navbar.classList.toggle("navbaractive");
    })
}
navslide();


window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if(!window.matchMedia("(max-width: 1250px)").matches)
  {
    if (document.body.scrollTop >100 || document.documentElement.scrollTop > 100) {
      document.querySelector(".navbar").style.position = "fixed";
    
      
      navbar.classList.add("navbg");
      
        
        
        
      
       
        
      
      console.log(window.innerWidth);
      
    }

    
    else {
      document.querySelector(".navbar").style.position = "absolute";
    // document.querySelector(".navbar").style.transition = ".4s";
      navbar.classList.remove("navbg");
      nav.classList.remove('burger-active');
      
    }
  }
  else if (window.innerWidth<1250){
    navbar.classList.remove("navbg");
    nav.classList.remove('burger-active');
    navfront.classList.remove("navfrontactive") ;
    navbar.classList.remove("navbaractive");
    document.querySelector(".navbar").style.position = "fixed";
      
    
  }
 
}



/************SCROLL ANIMATION****************** */
const animated = document.querySelectorAll('.animated');
const appearOptions = {

    threshold:0,
    rootMargin:"0px 0px 100px 0px",
};
const appearOnScroll = new IntersectionObserver(function(entries,appearOnScroll){

entries.forEach(entry =>{
   
    if(!entry.isIntersecting){
        
        entry.target.classList.add('disappear');
        entry.target.classList.remove('appear');
    }
    else{
        entry.target.classList.remove('disappear');
        entry.target.classList.add('appear');
        
       
        
    }
})

},appearOptions);

animated.forEach(element =>{
    appearOnScroll.observe(element);
})


/******************Carousel************************************ */
const slides = document.querySelector(".slides");


//when i click left move slides to left
const slide = Array.from(slides.children);
const leftButton = document.querySelector(".left-button") ;
const rightButton = document.querySelector(".right-button") ;
const caroussel__nav = document.querySelector('.caroussel__nav');
const caroussel__indicators =Array.from(caroussel__nav.children) ;

const slidewidth= slide[0].getBoundingClientRect().width;
const setSlidePosition = (slide,index)=>{
  slide.style.left=slidewidth * index + "px";
};
slide.forEach(setSlidePosition);


const moveToSlide =(slides,current_slide,target_slide)=>{
  slides.style.transform = "translateX(-"+target_slide.style.left+")";
  slides.style.transition ='transform .7s ease'
  current_slide.style.transition= "transform 1s ease"
 
  current_slide.classList.remove('current_slide');

  target_slide.classList.add('current_slide');
}
//when i click right move slides to right
rightButton.addEventListener('click',e=>{
  const  current_slide = slides.querySelector(".current_slide");
  const next_slide=current_slide.nextElementSibling;
  const  current_indicator = caroussel__nav.querySelector(".current_slide");
  const  next_indicator = current_indicator.nextElementSibling;
  const amountToMove= next_slide.style.left;
  //move to next slide
  moveToSlide(slides,current_slide,next_slide);
  moveIndicators(current_indicator,next_indicator);

})
// when i click left move slides left
leftButton.addEventListener('click',e=>{
  const  current_slide = slides.querySelector(".current_slide");
  const prev_slide=current_slide.previousElementSibling;
  const  current_indicator = caroussel__nav.querySelector(".current_slide");
  const  prev_indicator = current_indicator.previousElementSibling;
  
  //move to next slide
  moveToSlide(slides,current_slide,prev_slide);
  moveIndicators(current_indicator,prev_indicator);

})

//when clicking indicatiors to move slides
caroussel__nav.addEventListener('click', e=>{
  const target_indicator =e.target.closest('button');
  if(!target_indicator) return;
  const  current_slide = slides.querySelector(".current_slide");
  const  current_indicator = caroussel__nav.querySelector(".current_slide");
  const indicator_index = caroussel__indicators.findIndex(indicator => indicator === target_indicator);
  const target_slide = slide[indicator_index];
  moveToSlide(slides,current_slide,target_slide);

  moveIndicators(current_indicator,target_indicator);
  
  
})

//move indicators
const moveIndicators = (current_indicator,target_indicator)=>{
  current_indicator.classList.remove('current_slide');
  target_indicator.classList.add('current_slide')
}