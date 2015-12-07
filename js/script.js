(function(){
	App = function(c){
		t = this;
		t.canvas = c;
		t.ctx = t.canvas.getContext("2d");
		t.vida1 = 100;
		t.vida2 = 100;
		t.board();
		t.load_image();
		t.aleatorio();
		t.tabla();
		t.estados_de_juego("Iniciando");
	}
	App.prototype.board = function(){
		t.stage = new Image();
		t.stage.src = "img/battle.png";
		t.pikachu = new Image();
		t.pikachu.src = "img/pikachu.gif";
		t.scizor = new Image();
		t.scizor.src = "img/scizor.gif";
	}
	App.prototype.load_image =function(){
		t.stage.onload = function(){t.draw(t.stage,0,0,400,250,false);}
		t.pikachu.onload = function(){t.draw(t.pikachu,70,185,65,60,false);}
		t.scizor.onload = function(){t.draw(t.scizor,260,60,67,93,true);}
	}
	App.prototype.draw = function(i,x,y,an,al,b){
		t.ctx.drawImage(i,x,y,an,al);		
		if(b == true){t.barra_jugador1();t.barra_jugador2();}
	}
	//
	App.prototype.barra_jugador1 = function(){
		t.ctx.beginPath();
		t.ctx.strokeStyle= "#000";
		t.ctx.fillStyle = "#fff";
		t.ctx.lineWidth = 10;
		t.ctx.lineCap = "round";
		t.ctx.moveTo(10,10);
		t.ctx.lineTo(200,10);
		t.ctx.lineTo(200,50);
		t.ctx.lineTo(10,50);
		t.ctx.lineTo(10,10);
		t.ctx.lineCap = "round";
		t.ctx.lineJoin = "round";
		t.ctx.stroke();
		t.ctx.fill();
		t.ctx.closePath();
		///
		t.ctx.beginPath();
		t.ctx.fillStyle = "#000";
		t.ctx.font = "15px pika";
		t.ctx.fillText("Szisor",25,25);
		t.ctx.closePath();
		
		t.ctx.save();
		t.ctx.beginPath();
		t.ctx.lineWidth = 2;
		roundedRect(t.ctx,60,34,100,12,6,true);
		t.ctx.closePath();

		t.ctx.beginPath();
		t.ctx.fillStyle = "green";
		t.ctx.lineWidth = 2;
		roundedRect(t.ctx,60,35,t.vida1,10,6,false);
		t.ctx.closePath();
		t.ctx.restore();
	}
	App.prototype.barra_jugador2 = function(){
		t.ctx.beginPath();
		t.ctx.strokeStyle= "#000";
		t.ctx.fillStyle = "#fff";
		t.ctx.lineWidth = 10;
		t.ctx.lineCap = "round";
		t.ctx.moveTo(200,200);
		t.ctx.lineTo(390,200);
		t.ctx.lineTo(390,240);
		t.ctx.lineTo(200,240);
		t.ctx.lineTo(200,200);
		t.ctx.lineCap = "round";
		t.ctx.lineJoin = "round";
		t.ctx.stroke();
		t.ctx.fill();
		t.ctx.closePath();
		///
		t.ctx.beginPath();
		t.ctx.fillStyle = "#000";
		t.ctx.font = "15px pika";
		t.ctx.fillText("Pikachu",210,215);
		t.ctx.closePath();
		
		t.ctx.save();
		t.ctx.beginPath();
		t.ctx.lineWidth = 2;
		roundedRect(t.ctx,250,224,100,12,6,true);
		t.ctx.closePath();

		t.ctx.beginPath();
		t.ctx.fillStyle = "green";
		t.ctx.lineWidth = 2;
		roundedRect(t.ctx,250,225,t.vida2,10,6,false);
		t.ctx.closePath();
		t.ctx.restore();
	}
	function roundedRect(ctx,x,y,width,height,radius,b){
		t.ctx.beginPath();
		t.ctx.moveTo(x,y+radius);
		t.ctx.lineTo(x,y+height-radius);
		t.ctx.quadraticCurveTo(x,y+height,x+radius,y+height);
		t.ctx.lineTo(x+width-radius,y+height);
		t.ctx.quadraticCurveTo(x+width,y+height,x+width,y+height-radius);
		t.ctx.lineTo(x+width,y+radius);
		t.ctx.quadraticCurveTo(x+width,y,x+width-radius,y);
		t.ctx.lineTo(x+radius,y);
		t.ctx.quadraticCurveTo(x,y,x,y+radius);
		if(b)t.ctx.stroke();
		else t.ctx.fill();
	}
	App.prototype.aleatorio = function(){
		t.numero = Math.floor((Math.random()*2));
		if(t.numero == 0){
			t.jugador1 = 1;
			t.jugador2 = 2;
			t.bolean = true;
		}
		else if(t.numero != 0) {
			t.jugador1 = 2;
			t.jugador2 = 1;
			t.bolean = false;
		}
	}
	App.prototype.tabla = function(){
		t.ctx.clearRect(0,250,400,350);
		t.ctx.save();
		t.ctx.fillStyle = "#161616";
		t.ctx.fillRect(0,250,t.canvas.width,t.canvas.height);
		t.ctx.restore();
		t.ctx.save();
		t.ctx.fillStyle = "#DDDDDD";
		t.ctx.fillRect(10,260,380,80);
		t.ctx.restore();
	}
	App.prototype.estados_de_juego = function(e){
		if(e == "Iniciando"){
			t.ctx.fillStyle = "#000";
			t.ctx.font = "15px pika";
			t.ctx.fillText("Pikachu tiene el turno: "+t.jugador1,20,290)
			t.ctx.fillText("Scizor tiene el turno: " + t.jugador2,20,320);
			setInterval("t.estados_de_juego(t.bolean)",2000);
		}
		else if(e == true){
			t.tabla();
			t.cruz("Impactrueno","Gruñido","Látigo","Onda trueno");
			turno.textContent = "Le toca a pikachu";
		}
		else if(e == false){
			t.tabla();
			t.cruz("Contraataque","Mimético","Doble filo","Aguante");
			turno.textContent = "Le toca a scizor";
		}
		else if (e == "v"){
			if(t.vida1<= 0) t.victory("Pikachu");
			if(t.vida2<= 0) t.victory("Scizor");
		}
	}
	App.prototype.victory = function(v){
		t.tabla();
		console.log("ganador " +v);
		t.ctx.beginPath()
		t.ctx.font = "30px pokemon";
		t.ctx.fillText(v +" Gano", 100,300);
		t.ctx.closePath();
	}
	App.prototype.cruz = function(a1,a2,a3,a4){
		t.ctx.beginPath();
		t.ctx.strokeStyle = "#161616";
		t.ctx.lineWidth = 2;
		t.ctx.moveTo(200,250);
		t.ctx.lineTo(200,t.canvas.height);
		t.ctx.moveTo(0,300);
		t.ctx.lineTo(t.canvas.width,300);
		t.ctx.font = "15px pika";
		t.ctx.fillText(a1,20,290);
		t.ctx.fillText(a2,20,320);
		t.ctx.fillText(a3,220,290);
		t.ctx.fillText(a4,220,320);
		t.ctx.stroke();
		t.ctx.closePath();
	}
}());