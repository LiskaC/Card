window.onload = function () {

  var canvas = document.getElementById("myCanvas");
  var ctx = canvas.getContext("2d");
  var cardFront = new Image();
  cardFront.src = 'images/cardFront.jpg';
  var cardBack = new Image();
  cardBack.src = "#"; //remember to upload

  cardHeight = 600;
  cardWidth = cardHeight * (1921 / 2704) /* w/h module*/;
  cardFrontX = ((canvas.width - cardWidth) / 2);
  cardY = 50;
  cardFrontInsideX = ((canvas.width / 2) - cardWidth);
  cardBackInsideX = (canvas.width / 2);

  card = {
    open: "0"
  }
  /*todo: 
  figure out why not visually sliding
  get interior to appear onclick of front,
    then front interior click to stop working
  ditto back for onclick interior
  */


  function drawCardFront() {

    ctx.clearRect(0, 0, 1000, 700);
    ctx.drawImage(cardFront, cardFrontX, cardY, cardWidth, cardHeight);
    card.open = "0";
    console.log(card.open);
  };
  drawCardFront();


  function drawInterior() {

    ctx.clearRect(0, 0, 1000, 700);
    ctx.rect(((canvas.width / 2) - cardWidth), cardY, cardWidth, cardHeight);
    ctx.rect((canvas.width / 2), cardY, cardWidth, cardHeight);
    ctx.strokeStyle = "#CCD";
    ctx.fillStyle = "#FFE";
    ctx.fill();
    ctx.stroke();
    card.open = "1";

    function drawText() {
      ctx.font = "12px serif";
      ctx.fillStyle = '#000'
      ctx.fillText("This be the card", 550, 100);
      //add text
    };
    drawText();
  };


  function drawCardBack() {

    ctx.clearRect(0, 0, 1000, 700);
    cardBack.onload = function () {
      ctx.drawImage(cardBack, cardFrontX, cardY, cardWidth, cardHeight);
    };
    card.open = "2";
  };
  //remember to call onclick of card interior right
  function openCard(ev) {
    if (ev.clientX > cardFrontX
      && ev.clientX < (cardFrontX + cardWidth)  //this doesn't work precisely for some reason
      && ev.clientY > 50 && ev.clientY < 600) {
      console.log("clicked");
      drawInterior();
      // window.requestAnimationFrame(slideRight, 200);
    };
  };

  function flipToFront(ev) {
    if (ev.clientX > cardFrontInsideX
      && ev.clientX < (cardFrontInsideX + cardWidth)  //this doesn't work precisely for some reason
      && ev.clientY > 50 && ev.clientY < 600) {
      console.log("frontInside Clicked");
      console.log(card.open);
      drawCardFront();
    };
  };

  canvas.addEventListener("click", (ev) => {

    //make this work when front or back showing, but not interior    


    if (card.open == 0) {
      openCard(ev);
    } else if (card.open == 1) {
      flipToFront(ev);
      ctx.drawImage(cardFront, cardFrontX, cardY, cardWidth, cardHeight);
    };

    /*   function toBack() {
         if (within right of interior) {
       ctx.clearRect(0, 0, 900, 700);
       drawCardBack();
     };
   };*/

  });

  /* this is not working

  function slideRight() {
    // ctx.clearRect(0, 0, 700, 450);
    drawCardFront(); //cardFrontX is incrementing, but not redrawing in correct place
    cardFrontX += 50;
    console.log(cardFrontX, cardY
  );
  };
  */

};
