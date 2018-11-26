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


  function drawCardFront() {

    cardFront.onload = function () {
      ctx.drawImage(cardFront, cardX, cardY, cardWidth, cardHeight);
    };
  };
  drawCardFront();

  function drawCardBack() {

    cardBack.onload = function () {
      ctx.drawImage(cardBack, cardX, cardY, cardWidth, cardHeight);
    };
  };
  //remember to call onclick of card interior right


  function openCard() {
    canvas.addEventListener("click", function (ev) {
      if (ev.clientX > cardX
        && ev.clientX < (cardX + cardWidth)  //this doesn't work for some reason
        && ev.clientY > 50 && ev.clientY < 600) {
        console.log("clicked");
        window.requestAnimationFrame(slideRight, 200);
      };

    }, false);

  };

  openCard();

  function slideRight() {
    ctx.clearRect(0, 0, 700, 450);
    drawCardFront(); //cardX is incrementing, but not redrawing in correct place
    cardX += 50;
    console.log(cardX, cardY);
  };


  function drawInterior() {
    ctx.rect(((canvas.width / 2) - cardWidth), cardY, cardWidth, cardHeight);
    ctx.rect((canvas.width / 2), cardY, cardWidth, cardHeight);
    ctx.strokeStyle = "#CCD";
    ctx.fillStyle = "#FFE";
    ctx.fill();
    ctx.stroke();

    //add text
  };
  drawInterior();
};
