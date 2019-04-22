function Map(row,col,width,height){
	this.row=row;
	this.col=col;
	this.width=width;
	this.height=height;
	this.arr=[];
	this.dom = document.createElement("div");
}


Map.prototype.fill=function(){
	for(var j=0;j<this.row;j++){
		var row_dom = document.createElement("div");
		var row_arr = [];
		row_dom.className="row";
		for(var i=0;i<this.col;i++){
			var col_dom=document.createElement("span");
			col_dom.className="grid";
			row_dom.appendChild(col_dom);
			row_arr.push(col_dom);
		}
		this.dom.appendChild(row_dom);
		this.arr.push(row_arr);
		this.dom.className="box";

	}
	document.body.appendChild(this.dom);



}
Map.prototype.clear=function(){
	for(var i=0;i<this.arr.length;i++){
		for(var j = 0; j < this.arr[i].length; j++){
			this.arr[i][j].style.backgroundImage="none";
			this.arr[i][j].style.backgroundColor="white";
		}
	}
}