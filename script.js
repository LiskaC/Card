window.onload = function () {

  var canvas = document.getElementById("myCanvas");
  var ctx = canvas.getContext("2d");
  var cardFront = new Image();
  cardFront.src = 'images/cardFront.jpg';
  var cardBack = new Image();
  cardBack.src = "#"; //remember to upload

  cardHeight = 600;
  cardWidth = cardHeight * (1921 / 2704);
  cardX = ((canvas.width - cardWidth) / 2);
  cardY = 50;

  /*todo: 
  figure out why not visually sliding
  add text to card interior
  get interior to appear onclick of front,
    then front interior click to stop working
  ditto back for onclick interior
  */


  function drawCardFront() {

    cardFront.onload = function () {
      ctx.drawImage(cardFront, cardX, cardY, cardWidth, cardHeight);
    };
  };
  drawCardFront();


  function drawInterior() {
    ctx.rect(((canvas.width / 2) - cardWidth), cardY, cardWidth, cardHeight);
    ctx.rect((canvas.width / 2), cardY, cardWidth, cardHeight);
    ctx.strokeStyle = "#CCD";
    ctx.fillStyle = "#FFE";
    ctx.fill();
    ctx.stroke();

    //add text
  };


  function drawCardBack() {

    cardBack.onload = function () {
      ctx.drawImage(cardBack, cardX, cardY, cardWidth, cardHeight);
    };
  };
  //remember to call onclick of card interior right



  canvas.addEventListener("click", function (ev) {

    //make this work when front or back showing, but not interior    
    function openCard() {
      if (ev.clientX > cardX
        && ev.clientX < (cardX + cardWidth)  //this doesn't work precisely for some reason
        && ev.clientY > 50 && ev.clientY < 600) {
        console.log("clicked");
        drawInterior();
        // window.requestAnimationFrame(slideRight, 200);
      };
    };
    openCard();

    /*    
        function toFront() {
          if (within left of interior) {
            ctx.clearRect(0, 0, 900, 700);
            drawCardFront();
          };
        };
    
        function toBack() {
          if (within right of interior) {
            ctx.clearRect(0, 0, 900, 700);
            drawCardBack();
          };
        };
        */

  }, false);

  /* this is not working

  function slideRight() {
    // ctx.clearRect(0, 0, 700, 450);
    drawCardFront(); //cardX is incrementing, but not redrawing in correct place
    cardX += 50;
    console.log(cardX, cardY);
  };
  */

};
