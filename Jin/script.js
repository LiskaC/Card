window.onload = function () {

  var canvas = document.getElementById("myCanvas");
  var ctx = canvas.getContext("2d");
  var cardFront = new Image();
  cardFront.src = 'images/Takahashi Shotei.png';
  var cardBack = new Image();
  cardBack.src = 'images/Takahashi Shotei back.png';
  var message = new Image();
  message.src = 'images/innertext.png';

  cardHeight = 700;
  cardWidth = cardHeight * (1921 / 2704) /* w/h ratio*/;
  cardFrontX = ((canvas.width - cardWidth) / 2);
  cardY = 25;
  cardFrontInsideX = ((canvas.width / 2) - cardWidth);
  cardBackInsideX = (canvas.width / 2); //page 3 of the card

  card = {
    open: null
  }
  /*todo: 
  figure out why not visually sliding
  add messages
  add back and updated/fully-painted front
  add photo?
  */

  //Section: drawing sides

  function drawCardFront() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(cardFront, cardFrontX, cardY, cardWidth, cardHeight);
    card.open = 0;
  };

  if (card.open === null) {
    cardFront.onload = function () {
      drawCardFront();
    };
  }


  function drawInterior() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.rect(((canvas.width / 2) - cardWidth), cardY, cardWidth, cardHeight);
    ctx.rect((canvas.width / 2), cardY, cardWidth, cardHeight);
    ctx.strokeStyle = "#CCB";
    ctx.fillStyle = "#FFD";
    ctx.fill();
    ctx.stroke();
    card.open = 1;

    function drawText() {
      ctx.clearRect((canvas.width / 2 + 50), 50, 400, message.height);
      ctx.drawImage(message, (canvas.width / 2 + 50), 50, 400, message.height);
      // ctx.font = "12px Verdana";
      // ctx.fillStyle = '#000'
      // ctx.fillText(message, 550, 100);
      //add text - can't get it to format when requesting message text by id and rendering in canvas
    };
    drawText();
  };


  function drawCardBack() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(cardBack, cardFrontX, cardY, cardWidth, cardHeight);
    card.open = 2;
  };



  //Section: Flipping between sides 

  function openCard(ev) {
    if (ev.offsetX > cardFrontX
      && ev.offsetX < (cardFrontX + cardWidth) && ev.offsetY > cardY && ev.offsetY < (cardY + cardHeight)) {
      console.log("clicked");
      drawInterior();
      // window.requestAnimationFrame(slideRight, 200);
    };
  };

  function flipToFront(ev) {
    if (ev.offsetX > cardFrontInsideX
      && ev.offsetX <= cardBackInsideX && ev.offsetY > cardY && ev.offsetY < (cardY + cardHeight)) {
      drawCardFront();
    };
  };

  function flipToBack(ev) {
    if (ev.offsetX > cardBackInsideX
      && ev.offsetX <= (cardBackInsideX + cardWidth) && ev.offsetY > cardY && ev.offsetY < (cardY + cardHeight)) {
      drawCardBack();
    };
  };



  canvas.addEventListener("click", (ev) => {

    if (card.open == 0) {
      openCard(ev);
    } else if (card.open == 1) {
      flipToFront(ev);
      flipToBack(ev);
    } else if (card.open == 2) {
      openCard(ev);
    };
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
