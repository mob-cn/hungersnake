/**
 * Game整个游戏类
 * @ctx 画笔
 * @bird 鸟的实例
 * @pipe 管子的实例
 * @land 背景的实例
 * @mountain 背景的实例
 **/
function Game(ctx, bird, pipe, land, mountain,count) {
	this.ctx = ctx;
	this.bird = bird;
	// 由于管子有多根，所以我们将管子存储在数组中
	this.pipeArr = [pipe];
	this.land = land;
	this.mountain = mountain;
	this.iframe=0;
	this.timer=null;
	this.timer2=null;
	this.init();
	this.count=count;
	this.j=4;
	
}
// 初始化
Game.prototype.init = function() {
	this.start();
	this.bindEvent();
}

Game.prototype.renderMountain=function(){

 	var img = this.mountain.img;
 	// 图片移动
	this.mountain.x -= this.mountain.step;
	// 判断边界
	if (this.mountain.x < -img.width) {
		// 说明已经离开cnavas区域了
		this.mountain.x = 0;
	}

 	// 这里渲染的不是this.mountaion, 而是this.mountain.img
	this.ctx.drawImage(img, this.mountain.x, this.mountain.y);
	this.ctx.drawImage(img, this.mountain.x + img.width, this.mountain.y);
	this.ctx.drawImage(img, this.mountain.x + img.width * 2, this.mountain.y);
 }

 // 渲染地面
Game.prototype.renderLand = function() {
	// 获取图片
	var img = this.land.img;
	// 图片移动
	this.land.x -= this.land.step;
	// 边界判断
	if (this.land.x < -img.width) {
		this.land.x = 0;
	}
	// 绘制图片
	this.ctx.drawImage(img, this.land.x, this.land.y);
	this.ctx.drawImage(img, this.land.x + img.width, this.land.y);
	this.ctx.drawImage(img, this.land.x + img.width * 2, this.land.y);
}


// 渲染鸟
Game.prototype.renderBird = function() {
	// 获取鸟的图片
	var img = this.bird.img;
	// 保存状态
	this.ctx.save();
	// 平移坐标系
	this.ctx.translate(this.bird.x, this.bird.y);
	
	// 旋转
	var deg = Math.PI / 180;
	if(this.bird.state=="U"){
		this.ctx.rotate(deg * -this.bird.speed);
		
	}
	else{
		this.ctx.rotate(deg * this.bird.speed);
	}
	//三元表达式旋转
	// var deg = this.bird.state === "D" ? Math.PI / 180 *  this.bird.speed : -Math.PI / 180 *  this.bird.speed;

	
	// 渲染图片
	this.ctx.drawImage(img, -img.width / 2, -img.height / 2);
	// 恢复状态
	this.ctx.restore();
}

Game.prototype.run=function(){
	this.bird.x=100;
	this.bird.y=100;
	this.bird.speed=0;
	this.bird.state="D";
	this.iframe=0;
	end.style.display = 'none';
	this.j=4;
}




Game.prototype.start=function(){

	var me =this;
		me.movePipe();
		me.renderMountain();
		// me.renderPipePoints();
		// 渲染地面
		me.renderLand();
	
	star.onclick=function(){
	//	ready.style.display = 'block';
		me.count=0;
		me.run();
		star.style.display = "none";

		clearInterval(me.timer2);
		me.timer2 = setInterval(jj,800);

		setTimeout(function(){
			// jishu.src="images/"+ 1 + ".png"

			ready.style.display = 'none';

			clearInterval(me.timer);
			me.timer = setInterval(go,20);
		},3000)
				
	    
	}



	function go(){
				// 清屏
			me.iframe++;

			me.clear();

			// 渲染山
			me.movePipe();
			me.renderMountain();
			//me.renderBirdPoints();
			// me.renderPipePoints();
			// 渲染地面
			me.renderLand();
			me.renderBird();
			
			me.renderPipe();


			me.renderPipePoints();
		    me.checkBoom();
			if (!(me.iframe % 60)) {
				//创建管子
				me.createPipe();
			}

			me.clearPipe();

			if (!(me.iframe % 10)) {
				// 鸟煽动翅膀
				me.bird.fly();
			}
			// 鸟的下降
			me.bird.fallDown();
			me.count +=1;
			fs.innerHTML=me.count;
	}

	function jj(){
		jishu.style.display = 'block';
		me.j--;
		if(me.j<1){
			jishu.style.display = 'none';		

		}
		else{
			jishu.src="images/"+ me.j + ".png";
		}
		console.log(me.j);
		
	}


}





Game.prototype.clear = function() {
	this.ctx.clearRect(0, 0, 360, 512);
}




// 绑定事件
Game.prototype.bindEvent = function() {
	// 备份this
	var me = this;
	// 给canvas绑定点击事件
	this.ctx.canvas.onclick = function() {
		// 调用鸟上升的方法
		me.bird.goUp();
	}
	document.onkeydown=function(e){
		if(e.keyCode===32){
			me.bird.goUp();

		}
		console.log(e.key);
	}
	// star.onclick=function(){
	// 	this.go=1;
	// }


}
// 绘制管子
Game.prototype.renderPipe = function() {
	// 备份this
	var me = this;
	// 由于管子存储在数组中， 所以我们要循环渲染
	this.pipeArr.forEach(function(value, index) {
		// 获取上管子的图片
		var img_up = value.pipe_up;
		// 图片的x值
		var img_x = 0;
		// 图片的y值
		var img_y = img_up.height - value.up_height;
		// 图片的宽
		var img_w = img_up.width;
		// 图片的高
		var img_h = value.up_height;
		// 在canvas上的x点
		var canvas_x = me.ctx.canvas.width - value.step * value.count;
		// 在canvas上的y点
		var canvas_y = 0;
		// 在canvas上的图片的宽
		var canvas_w = img_w;
		// 在canvas上的图片的高
		var canvas_h = value.up_height;
		// 绘制图片
		me.ctx.drawImage(img_up, img_x, img_y, img_w, img_h, canvas_x, canvas_y, canvas_w, canvas_h); 

		// 获取下管子的图片
		var img_down = value.pipe_down;
		// 图片的x值
		var img_down_x = 0;
		// 图片的y值
		var img_down_y = 0;
		// 图片的宽
		var img_down_w = img_down.width;
		// 图片的高
		var img_down_h = value.down_height;
		// 在canvas上的x点
		var img_canvas_x = me.ctx.canvas.width - value.step * value.count;
		// 在canvas上的y点
		var img_canvas_y = canvas_h + 150;
		// 在canvas上的宽
		var img_canvas_w = img_down_w;
		// 在canvas上的高
		var img_canvas_h = value.down_height;

		// 绘制图片
		me.ctx.drawImage(img_down, img_down_x, img_down_y, img_down_w, img_down_h, img_canvas_x, img_canvas_y, img_canvas_w, img_canvas_h);

	})
}

// 管子的移动
Game.prototype.movePipe = function() {
	// 备份this
	var me = this;
	this.pipeArr.forEach(function(value) {
		value.count++;
	})
}

// 创建管子
Game.prototype.createPipe = function() {
	var pipe = this.pipeArr[0].createPipe();
	// 将创建出来的实例化对象放入到数组中
	this.pipeArr.push(pipe);
}




// 清除管子
Game.prototype.clearPipe = function() {
	// for (var i = 0; i < this.pipeArr.length; i++) {
	// 	// 获取一根管子
	// 	var pipe = this.pipeArr[i];
	// 	// 判断图片在canvas中的x值
	// 	if (pipe.x - pipe.step * pipe.count < -pipe.pipe_up.width) {
	// 		// console.log("第" + i + "项要被移除了");
	// 		this.pipeArr.splice(i, 1);
	// 		return;
	// 	}
	// }
	if(this.pipeArr.length>=3){
		this.pipeArr.shift();
		//console.log(this.pipeArr);
	}


}


// 绘制鸟的四个点
Game.prototype.renderBirdPoints = function() {
	// 鸟的A点
	var bird_A = {
		x: -this.bird.img.width / 2 + 6 + this.bird.x,
		y: -this.bird.img.height / 2 + 12 + this.bird.y
	}

	// 鸟的B点
	var bird_B = {
		x: bird_A.x + this.bird.img.width - 14,
		y: bird_A.y
	}

	// 鸟的C点
	var bird_C = {
		x: bird_A.x,
		y: bird_A.y + this.bird.img.height - 24
	}

	// 鸟的D点
	var bird_D = {
		x: bird_B.x,
		y: bird_C.y
	}

	// 绘制矩形
	// 开启路径
	this.ctx.beginPath();
	// 移动画笔到某个位置
	this.ctx.moveTo(bird_A.x, bird_A.y);
	this.ctx.lineTo(bird_B.x, bird_B.y);
	this.ctx.lineTo(bird_D.x, bird_D.y);
	this.ctx.lineTo(bird_C.x, bird_C.y);
	// 闭合路径
	this.ctx.closePath();
	// 改变描边色
	this.ctx.strokeStyle = "blue";
	// 描边
	this.ctx.stroke();
}

// 绘制管子的八个点
Game.prototype.renderPipePoints = function() {
	for (var i = 0; i < this.pipeArr.length; i++) {
		// 获取一根管子
		var pipe = this.pipeArr[i];

		// 绘制上管子的四个点
		var pipe_A = {
			x: pipe.x - pipe.step * pipe.count,
			y: 0
		}

		// 管子的B点
		var pipe_B = {
			x: pipe_A.x + pipe.pipe_up.width,
			y: 0
		}

		// 管子的C点
		var pipe_C = {
			x: pipe_A.x,
			y: pipe_A.y + pipe.up_height
		}

		// 管子的D点
		var pipe_D = {
			x: pipe_B.x,
			y: pipe_C.y
		}

		// 绘制矩形
		// 开启路径
		// 开启路径
		this.ctx.beginPath();
		// 移动画笔到某个位置
		this.ctx.moveTo(pipe_A.x, pipe_A.y);
		this.ctx.lineTo(pipe_B.x, pipe_B.y);
		this.ctx.lineTo(pipe_D.x, pipe_D.y);
		this.ctx.lineTo(pipe_C.x, pipe_C.y);
		// 闭合路径
		this.ctx.closePath();
		// 改变描边色
		this.ctx.strokeStyle = "blue";
		// 描边
		this.ctx.stroke();


		// 绘制下管子的四个点
		var pipe_down_A = {
			x: pipe.x - pipe.step * pipe.count,
			y: pipe.up_height + 150
		}
		// 下管子的B点
		var pipe_down_B = {
			x: pipe_A.x + pipe.pipe_up.width,
			y: pipe.up_height + 150
		}

		// 下管子的C点
		var pipe_down_C = {
			x: pipe_A.x,
			y: 400
		}

		// 下管子的D点
		var pipe_down_D = {
			x: pipe_B.x,
			y: 400
		}


		// 绘制矩形
		// 开启路径
		this.ctx.beginPath();
		// 移动画笔到某个位置
		this.ctx.moveTo(pipe_down_A.x, pipe_down_A.y);
		this.ctx.lineTo(pipe_down_B.x, pipe_down_B.y);
		this.ctx.lineTo(pipe_down_D.x, pipe_down_D.y);
		this.ctx.lineTo(pipe_down_C.x, pipe_down_C.y);
		// 闭合路径
		this.ctx.closePath();
		// 改变描边色
		this.ctx.strokeStyle = "blue";
		// 描边
		this.ctx.stroke();
	}
}

// 碰撞检测
Game.prototype.checkBoom = function() {
	for (var i = 0; i < this.pipeArr.length; i++) {
		// 获取一根管子
		var pipe = this.pipeArr[i];

		// 绘制上管子的四个点
		var pipe_A = {
			x: pipe.x - pipe.step * pipe.count,
			y: 0
		}

		// 管子的B点
		var pipe_B = {
			x: pipe_A.x + pipe.pipe_up.width,
			y: 0
		}

		// 管子的C点
		var pipe_C = {
			x: pipe_A.x,
			y: pipe_A.y + pipe.up_height
		}

		// 管子的D点
		var pipe_D = {
			x: pipe_B.x,
			y: pipe_C.y
		}

		// 绘制下管子的四个点
		var pipe_down_A = {
			x: pipe.x - pipe.step * pipe.count,
			y: pipe.up_height + 150
		}
		// 下管子的B点
		var pipe_down_B = {
			x: pipe_A.x + pipe.pipe_up.width,
			y: pipe.up_height + 150
		}

		// 下管子的C点
		var pipe_down_C = {
			x: pipe_A.x,
			y: 400
		}

		// 下管子的D点
		var pipe_down_D = {
			x: pipe_B.x,
			y: 400
		}


		// 鸟的A点
		var bird_A = {
			x: -this.bird.img.width / 2 + 6 + this.bird.x,
			y: -this.bird.img.height / 2 + 12 + this.bird.y
		}

		// 鸟的B点
		var bird_B = {
			x: bird_A.x + this.bird.img.width - 14,
			y: bird_A.y
		}

		// 鸟的C点
		var bird_C = {
			x: bird_A.x,
			y: bird_A.y + this.bird.img.height - 24
		}

		// 鸟的D点
		var bird_D = {
			x: bird_B.x,
			y: bird_C.y
		}


		// 用bird_B与pipe_A的值进行比较
		if (bird_B.x >= pipe_C.x && bird_B.y <= pipe_C.y && bird_A.x <= pipe_D.x) {
			console.log("撞到上管子了");
			// 游戏结束
			this.gameOver();
		}


		// 判断下管子
		if (bird_D.x >= pipe_down_A.x && bird_D.y >= pipe_down_A.y && bird_A.x <= pipe_down_B.x) {
			console.log("撞到下管子了");
			// 游戏结束
			this.gameOver();
		}
	}
}

// 游戏结束
Game.prototype.gameOver = function() {
	// 清除定时器
	clearInterval(this.timer);
	star.style.display = "block";
	end.style.display = 'block';
	if(this.pipeArr.length=1){
		this.createPipe();
		this.pipeArr.shift();

		//console.log(this.pipeArr);
	}
	else{
		this.createPipe();
		this.pipeArr.shift();
		this.pipeArr.shift();
	}
	
}
























