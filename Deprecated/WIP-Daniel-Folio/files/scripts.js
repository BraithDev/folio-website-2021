// Colour transition change on scroll
/*
$(function() {
   $(window).scroll(function () {
      if ($(this).scrollTop() > 900) {
         $('body').addClass('backgroundChangeColour')
      } else {
         $('body').removeClass('backgroundChangeColour')
      }
   });
});
*/

// Proportional colour change on scroll
const parallaxEndOffset = 900;
const titleFadeCheckpoint = 250;
const backgroundFadeCheckpoint = 500;

// Background colours
const topFadeColour = 26;
const middleFadeColour = 200;

// Parallax elements
//const parallaxElements = document.querySelectorAll('[data-speed]');
 
// Event hooks
window.addEventListener("scroll", processColourChangesOnScroll);
//window.addEventListener("scroll", processParallaxElements);

// Colour and opacity changes as the page is scrolled
function processColourChangesOnScroll() 
{
  const currentScroll = window.pageYOffset;

  // Fade in title when parallax complete
  if ((currentScroll - parallaxEndOffset) <= titleFadeCheckpoint) {
    opacity = 1 - ((currentScroll-parallaxEndOffset) / titleFadeCheckpoint);
  } else {
    opacity = 0;
  }
  document.querySelector(".floating-header-title").style.opacity = 1 - opacity;


  // Fade background to lighter tone when parallax complete
   opacity = ((currentScroll-parallaxEndOffset) / backgroundFadeCheckpoint);

  var col = Math.lerp(topFadeColour, middleFadeColour, Math.clamp(opacity, 0, 1));
  document.body.style.backgroundColor = 'rgb(' + col + ',' + col + ',' + col + ')';
}

// Parallax element handler
function processParallaxElements()
{

   // SimpleParallax usage
   var image = document.getElementsByClassName('thumbnail');
   new simpleParallax(image, {
      orientation: 'down',
      overflow: 'false'
   });

   
   // Find parallax elements
   const parallaxElements = document.getElementsByClassName('parallax-element');

   // Try custom parallax
   console.log(parallaxElements.length)
   // Iterate through all elements with the 'data-speed' parameter
   for (const parallaxEl of parallaxElements) {
      // Convert direction to +ve or -ve
      const direction = parallaxEl.dataset.direction == "up" ? "-" : "";
      const transformY = window.pageYOffset * parallaxEl.dataset.speed;

      // Translate element
      parallaxEl.style.transform = `translate3d(0,${direction}${transformY}px,0)`;
   }
}

// Helper functions
Math.lerp = function(value1, value2, amount)
{
   return (1 - amount) * value1 + amount * value2;
};

Math.clamp = function(value, min, max)
{
   if (value < min)
      return min;
   else if (value > max)
      return max;
   return value;
};