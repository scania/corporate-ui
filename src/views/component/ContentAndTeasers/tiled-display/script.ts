Polymer({
  is: name,
  properties: {
    headline: {
      type: String,
      value: 'Some Title'
    },
    description: {
      type: String,
      value: 'some text'
    },
    btnText: {
      type: String,
      value: 'button text'
    }
  },
  // These conditionals takes the images paths and puts into an array. This array is then used as source when building template dom-repeat.
  ready: function() {
    if (this.getAttribute('img1') == null && this.getAttribute('img2') == null) {
      this.imgarray = [
        {first: 'https://static.scania.com/resources/images/demo/Tile1.jpg'},
        {first: 'https://static.scania.com/resources/images/demo/Tile2.jpg'}
      ];

    }
    else if (this.getAttribute('img3') == null && this.getAttribute('img4') == null) {
      this.imgarray = [
        {first: this.getAttribute('img1')},
        {first: this.getAttribute('img2')}
      ];   
    }
    else if (this.getAttribute('img3') != null && this.getAttribute('img4') != null) {  
      this.imgarray = [
        {first: this.getAttribute('img1'), title: this.getAttribute('var2title1'), text: this.getAttribute('var2text1'), btn: this.getAttribute('var2btn1')},
        {first: this.getAttribute('img2'), title: this.getAttribute('var2title1'), text: this.getAttribute('var2text1'), btn: this.getAttribute('var2btn2')},
        {first: this.getAttribute('img3'), title: this.getAttribute('var2title1'), text: this.getAttribute('var2text1'), btn: this.getAttribute('var2btn3')},
        {first: this.getAttribute('img4'), title: this.getAttribute('var2title1'), text: this.getAttribute('var2text1'), btn: this.getAttribute('var2btn4')}
      ];
    }
    this.parentNode.setAttribute('headline', this.attributes.headline.value)
    this.parentNode.setAttribute('description', this.attributes.description.value)
    this.parentNode.setAttribute('btntext', this.attributes.btnText.value)
    this.parentNode.setAttribute('imgarray', JSON.stringify(this.imgarray))
    
  },
  // function for checking variation, builds corresponding dom-if template.
  checkVariation: function(variation) {
    return variation === this.getAttribute('variation');
  },
  //function not used as of this moment, can perhaps add further optimization.
  info: function(headline, description) {
    return headline || description;
  }
});
//function for Slick. Initializes Slick functionality if window size is below 480.  
function createSlick(){
  var windowWidth = $(window).width();
  if(windowWidth < 480){  
    $(".slick-scroll").not('.slick-initialized').slick({
      infinite:true, //these settings are configurable with additional functionality such as autoplay.
      dots:true
    })
    $('.slick-scroll').slick('slickFilter',function(index){ //help function for removing dom-repeat template, as slick considers this its own div element.
      return index < 4;
    })
  }
  else {
    if ($(".slick-scroll").hasClass('slick-initialized')) { //removes slick, but only if it have been initialized before. This conditional removes errors.
      $('.slick-scroll').slick('unslick');
    }
  } 
}
     
$(window).on( 'load resize', createSlick );
createSlick();