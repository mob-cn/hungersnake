function Game(map,food,snake,block,count){
	this.map=map;
	this.food=food;
	this.snake=snake;
	this.block=block;
	this.timer=null;
	this.flag=null;
	this.init();
	this.count=count;


}


Game.prototype.init=function(){
	this.renderMap();
	this.renderFood();
	this.renderSnake();
	this.renderBlock();
	this.start();
	this.bindEvent();
}



Game.prototype.renderMap=function(){
	this.map.fill();
}



Game.prototype.renderFood=function(){
	var row=this.food.row;
	var col=this.food.col;
	this.map.arr[row][col].style.backgroundImage = "url(" + this.food.img+ ")";
	this.map.arr[row][col].style.backgroundSize = "cover";
	// console.log(this.arr[row][col]);

}


Game.prototype.renderSnake=function(){
	var head = this.snake.arr[this.snake.arr.length-1];
	this.map.arr[head.row][head.col].style.backgroundImage = "url(" + this.snake.head_pic[this.snake.head_idx] + ")";
	for(var i = 0;i < this.snake.arr.length-1;i++){
		var row=this.snake.arr[i].row;
		var col=this.snake.arr[i].col;
		
		this.map.arr[row][col].style.backgroundImage="url("+ this.snake.body_pic[0]+")";
	}
	var tail = this.snake.arr[0];

	if (tail.row === this.snake.arr[1].row) {
		// 说明是在同一行， 比较列的关系
		this.snake.tail_idx = tail.col > this.snake.arr[1].col ? 2 : 0;
	} 
	else {
		// 说明是在同一列， 比较行的关系
		this.snake.tail_idx = tail.row >this.snake.arr[1].row ? 3 : 1;
	}
	this.map.arr[tail.row][tail.col].style.backgroundImage = "url(" + this.snake.tail_pic[this.snake.tail_idx] + ")";
}

Game.prototype.renderBlock=function(){
	
	for(var i=0;i<this.block.arr.length-1;i++)
	{
		var row=this.block.arr[i].row;
		var col=this.block.arr[i].col;
		this.map.arr[row][col].style.backgroundImage = "url(" + this.block.img+ ")";
		this.map.arr[row][col].style.backgroundSize = "cover";
	}
	
}

Game.prototype.start=function(){
	this.flag=true;
	var me=this;
	
	this.timer=setInterval(function(){
		
		me.snake.move();
		me.checkFood();
		me.checkMap();
		me.checkBlock();
		me.checkSnake();
		if(me.flag){ 
		me.map.clear();
		me.renderBlock();
		me.renderFood();
		me.renderSnake();
		}
		me.count++;
		num.innerHTML=me.count;
	},150)
	
}

Game.prototype.bindEvent = function() {

	var me = this;
	document.onkeydown = function(e) {

		var code = e.keyCode;


		if (code === 37 || code === 38 || code === 39 || code === 40) {

			me.snake.change(code);
		}
	}
}


Game.prototype.gameOver=function(){
	this.flag=false;
	clearInterval(this.timer);
}


Game.prototype.checkFood=function(){
	var head=this.snake.arr[this.snake.arr.length-1];
	var food=this.food;
	if(head.row===food.row&&head.col === food.col)
	{
		this.snake.growUp();
		this.resetFood();
	}


}
Game.prototype.checkMap=function(){
	var head=this.snake.arr[this.snake.arr.length-1];
	if(head.row<0||head.row>=this.map.row|| head.col < 0 || head.col >= this.map.col){
		this.gameOver();
		console.log("你没了");
		alert("you die ");
	}
}
Game.prototype.checkSnake = function() {
	// 获取蛇的头部
	var head = this.snake.arr[this.snake.arr.length - 1];
	// 循环与蛇的每一节身体进行比较
	for (var i = 0; i < this.snake.arr.length - 1; i++) {
		// 获取蛇的一节身体
		var one = this.snake.arr[i];
		if (head.row === one.row && head.col === one.col) {
			// 说明吃到自己了
			console.log("吃到自己了");
			// 游戏结束
			alert("ni si le ");
			this.gameOver();
		}
	}
}

Game.prototype.checkBlock = function() {
	// 获取蛇的头部
	var head = this.snake.arr[this.snake.arr.length - 1];
	// 循环判断是否撞到障碍物
	for (var i = 0; i < this.block.arr.length; i++) {
		// 获取障碍物的一节
		var one = this.block.arr[i];
		if (head.row === one.row && head.col === one.col) {
			// 说明撞到障碍物了
			// console.log("撞到障碍物了");
			// 调用游戏结束的方法
			this.gameOver();
		}
	}
}


Game.prototype.resetFood=function(){
	var row = parseInt(Math.random() * this.map.row);//html赋的值20
	var col = parseInt(Math.random() * this.map.col);
	for (var i = 0; i < this.snake.arr.length; i++) {
		// 获取蛇的一节身体
		var one = this.snake.arr[i];
		if (one.row === row && one.col === col) {
			//alert("重合到蛇的身上了");
			this.resetFood();
			return;
		}
	}
	for (var i = 0; i < this.block.arr.length; i++) {
		// 获取蛇的一节身体
		var one = this.block.arr[i];
		if (one.row === row && one.col === col) {
			//alert("重合到障碍物中了");
			this.resetFood();
			return;
		}
	}

	this.food.resetFood(row, col);
}












