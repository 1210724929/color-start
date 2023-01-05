(function()
{
	var Model = function(canvas)
	{
	
		var me = this;
		me.canvas = canvas;
		me.context = canvas.getContext('2d');
		me.puppleArr = [];
		me.puppleNum = 100;
		for (var i = 0; i < me.puppleNum; i++) 
		{
			me.puppleArr.push(me.Get());
		}
		me.draw();
	};
	
	
//	产生泡泡
	Model.prototype.Get = function()
	{
		return{
			radius:((Math.random() * 10) | 0) || 1,
			r:Math.random() * 256 | 0 ,
			g:Math.random() * 256 | 0 ,
			b:Math.random() * 256 | 0 ,
			a:Math.random(),
			x:this.canvas.width/2 ,
			y:this.canvas.height/2 ,
			v:Math.random()*100 ,//速度
			angle:Math.random()* 2 * Math.PI
		}
	};
	
	
//绘制泡泡
	Model.prototype.draw = function()
	{
		var me = this;
		foo();
		function foo()
		{
			
			//擦除画布上原来的东西
			me.context.clearRect(0,0,me.canvas.width,me.canvas.height);
			
			for(var i = 0; i < me.puppleNum; i++)
			{
				var o = me.puppleArr[i];
				me.context.fillStyle = 'rgba(' + o.r + ',' + o.g + ',' + o.b + ',' + o.a +')';
				me.context.beginPath();
				//画一个圆，位置x,y,,起始角度,结束角度,;
				me.context.arc(o.x,o.y,o.radius,0,360,false);
				me.context.fill();
				me.context.closePath();
				
				//移动
				o.x += o.v * 0.03 * Math.cos(o.angle);
				o.y += o.v * 0.03 * Math.sin(o.angle);
				//增加透明度，完全透明后产生新的泡泡
				o.a += 0.008;
				if (o.a >= 1)
				{
					me.puppleArr[i] = me.Get();
				}
			}
			setTimeout(foo,30);
		}
	};
	
	window.Pupple = Model;
}());