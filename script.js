window.onload = function () {

  var canvas = document.getElementById("myCanvas");
  var ctx = canvas.getContext("2d");
  var cardFront = new Image();
  cardFront.src = 'images/cardFront.jpg';

  cardFrontHeight = 600;
  cardFrontWidth = cardFrontHeight * (1921 / 2704);
  cardX = ((canvas.width - cardFrontWidth) / 2);
  cardY = 50;


  function drawCardFront() {

    cardFront.onload = function () {
      ctx.drawImage(cardFront, cardX, cardY, cardFrontWidth, cardFrontHeight);
    };
  };
  drawCardFront();


  function openCard() {
    canvas.addEventListener("click", function (ev) {
      if (ev.clientX > cardX
        && ev.clientX < (cardX + cardFrontWidth)  //this doesn't work for some reason
        && ev.clientY > 50 && ev.clientY < 600) {
        console.log("clicked");
        window.requestAnimationFrame(slideRight);
      };

    }, false);

  };

  openCard();

  function slideRight() {
    cardX += 50;
    drawCardFront(); //cardX is incrementing, but not redrawing in correct place

    console.log(cardX, cardY);
  };
};
