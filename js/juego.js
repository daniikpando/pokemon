(function(){
	Juego = function(c){
		th = this;
		this.b = true;
		this.interfaz = new App(c);
		this.añadirEvento();
	}
	Juego.prototype.añadirEvento = function(){
		if(this.b){
			this.interfaz.canvas.addEventListener("mouseup",listener)
		}
	}
	function listener(e){
		var c = e;
		th.interfaz.canvas.addEventListener("click",function(c){
			listener2(c);
		});
	}
	function listener2(e){
		var c = e.layerX;
		var c1 = e.layerY;
		//console.log(c);
		//console.log(c1);
		if(c >= 10 && c <= 200 && c1 >= 260 && c1 <= 300){
			th.evaluar("a1");
			//console.log("a1");
		}
		else if(c >= 10 && c <= 200 && c1 >= 301 && c1 <= 350){
			th.evaluar("b1");
			//console.log("b1");
		}
		else if(c >= 201 && c <= 400 && c1 >= 260 && c1 <= 300){
			th.evaluar("a2");
			//console.log("a2");
		}
		else if(c >= 201 && c <= 400 && c1 >= 301 && c1 <= 350){
			th.evaluar("b2");
			//console.log("b2");
		}
	}
	Juego.prototype.evaluar = function(s){
		//inpactrueno
		if(th.b){
			th.interfaz.canvas.removeEventListener("mouseup",listener);
			if(s == "a1" && th.interfaz.bolean){
				th.interfaz.vida1 -=21;
			}
			// contraataque
			if(s == "a1" && !th.interfaz.bolean){
				th.interfaz.vida2-=22;
			}
			// latigo
			if(s == "a2" && th.interfaz.bolean){
				th.interfaz.vida1-= 24;
			}
			//doble filo
			if(s == "a2" && !th.interfaz.bolean){
				th.interfaz.vida2 -= 23;
			}
			//gruñido
			if(s == "b1" && th.interfaz.bolean){
				th.interfaz.vida2 += 20;
				if(th.interfaz.vida2 >= 100) th.interfaz.vida2 =100;
			}
			if(s == "b1" && !th.interfaz.bolean){
				th.interfaz.vida2 -= 20;
			}
			if(s == "b2" && th.interfaz.bolean){
				th.interfaz.vida1 -= 19;
			}
			if(s == "b2" && !th.interfaz.bolean){
				th.interfaz.vida1 += 19;
				if(th.interfaz.vida1 >= 100) th.interfaz.vida1 -=19;
			}
			
			//Victoria
			if(th.interfaz.vida1 <= 0 || th.interfaz.vida2 <= 0){
				if(th.interfaz.vida1 < 0) th.interfaz.vida1 = 0;
				if(th.interfaz.vida2 < 0) th.interfaz.vida2 = 0;
				th.b = false;
				th.interfaz.bolean = "v";
			}
			pika.textContent = "Szisor: " + th.interfaz.vida1;
			sci.textContent = "Pikachu: " + th.interfaz.vida2;
			//
			if(th.interfaz.bolean == true){
				th.interfaz.bolean = false;
			}
			else if(th.interfaz.bolean == false){
				th.interfaz.bolean = true;
			}
			th.interfaz.barra_jugador1();
			th.interfaz.barra_jugador2();
			th.interfaz.estados_de_juego(th.interfaz.bolean);
		}
	}
}());
// pikachu => true,vida2
// scizor => false,vida1