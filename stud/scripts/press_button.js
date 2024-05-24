 // function runOnKeys(func) {
 //        var codes = [].slice.call(arguments, 1);

 //        var pressed = {};

 //        document.onkeydown = function(e) {
 //          e = e || window.event;

 //          pressed[e.keyCode] = true;

 //          for (var i = 0; i < codes.length; i++) { // проверить, все ли клавиши нажаты
 //            if (!pressed[codes[i]]) {
 //              return;
 //            }
 //          }

 //          // во время показа alert, если посетитель отпустит клавиши - не возникнет keyup
 //          // при этом JavaScript "пропустит" факт отпускания клавиш, а pressed[keyCode] останется true
 //          // чтобы избежать "залипания" клавиши -- обнуляем статус всех клавиш, пусть нажимает всё заново
 //          pressed = {};

 //          func();

 //        };

 //        document.onkeyup = function(e) {
 //          e = e || window.event;

 //          delete pressed[e.keyCode];
 //        };

 //      }

 //      runOnKeys(
 //        function() {
 //          alert("Привет!")
 //        },
 //        "Q".charCodeAt(0),
 //        "W".charCodeAt(0)
 //      );



  //  elem.onclick = function(event) {
  //   // вывести тип события, элемент и координаты клика
  //   alert(event.type + " на " + event.currentTarget);
  //   alert(event.clientX + ":" + event.clientY);
  // }

  window.onkeydown = function(event){
  	alert(event.keyCode);
  }