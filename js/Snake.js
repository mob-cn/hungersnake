function Snake(pic_obj){
	this.arr=[
		{row:4,col:4},
		{row:4,col:5},
		{row:4,col:6},
		{row:4,col:7},
		{row:4,col:8}
	];
	this.direction=39;
	this.lock=true;
	this.head_pic = pic_obj.head_pic;
	this.body_pic=pic_obj.body_pic;
	this.tail_pic=pic_obj.tail_pic;
	this.head_idx=1;
	this.tail_idx=0;

}


Snake.prototype.move=function(){
	var newHead={
		row:this.arr[this.arr.length-1].row,
		col:this.arr[this.arr.length-1].col
	}
		// 根据蛇移动的方向添加蛇的头部位置
	if (this.direction === 37) {
		// 新的头部要出现在老的头部的左边，行不变，列--
		newHead.col--;
		this.head_idx=0;

	} else if (this.direction === 38) {
		// 新的头部要出现在老的头部的上方，列不变， 行--
		newHead.row--;
		this.head_idx=1;
	} else if (this.direction === 39) {
		// 新的头部要出现在老的头部的右边，行不变， 列++
		newHead.col++;
		this.head_idx=2;
	} else if (this.direction === 40) {
		// 新的头部要出现在老的头部的下方，列不变，行++
		newHead.row++;
		this.head_idx=3;
	}
	// 将蛇的头部放入数组中的最后一项
	this.arr.push(newHead);
	
	// 去掉蛇尾
	this.arr.shift();
	this.lock=true;
}


Snake.prototype.change=function(direction){
	if (!this.lock) {
		return;
	}
	this.lock = false;
	var result = Math.abs(direction - this.direction);
	if (result === 2 || result === 0) {
		return;
	} else {
		this.direction = direction;
	}
}


Snake.prototype.growUp=function(){
	var tail=this.arr[0];
	this.arr.unshift(tail);
}
