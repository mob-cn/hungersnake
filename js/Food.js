function Food(x,y,food_img){
	this.row=x;
	this.col=y;
	this.img=food_img;
}


Food.prototype.resetFood=function(row,col){
	this.row=row;
	this.col=col;
}



