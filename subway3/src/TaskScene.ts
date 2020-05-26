class TaskScene extends Scene implements  eui.UIComponent {
	public constructor() {
		super();
        Sound.currentscene = "TaskScene";
        
	}
	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}

	protected childrenCreated(): void {
		super.childrenCreated();
        
        this.addBg(0x20B2AA, this);  //创建背景
        
        //创建标题行（标题图标、文字和退出图标）
        var titleImg:eui.Image = new eui.Image();
        var titleLbl:eui.Label = new eui.Label();
        var backImg:eui.Image = new eui.Image();
        this.addTitle(titleImg, "ic_task_png", titleLbl, "任务中心", backImg, "ic_exit_png", this);

        //布局属性
        var margin = 50;
        var scale = 0.5;
        var groupWidth:number = this.getscreenWidth() - margin*2;//布局宽度
        //布局高度 = 屏幕高度 - 2个间隔 - 标题行高
        var groupHeight:number = this.getscreenHeight() - margin*2 - titleImg.height*scale;
        var groupX:number = margin;//布局横坐标
        //布局纵坐标 = 2个间隔 + 标题行高
        var groupY:number = margin*2 + titleImg.height*scale;
        var groupMargin = margin/2;//布局内的控件边距
        var rowWidth:number = groupWidth - groupMargin*2;//布局内部行宽 = 布局宽度 - 2*布局内控件边距
        var rowHeight:number = 80;//内行高
        var btnWidth = 80;
        var roundDp = 50;//圆角大小

        //任务列表总布局（垂直布局）
        var mainGroup:eui.Group = new eui.Group();
        var mainLayout:eui.VerticalLayout = new eui.VerticalLayout();
        mainLayout.paddingTop = margin;
        mainLayout.paddingBottom = margin;
        mainLayout.paddingLeft = groupMargin;
        mainLayout.paddingRight = groupMargin;
        mainLayout.gap = groupMargin;
        mainGroup.layout = mainLayout;

		//group背景
		var groupBg:egret.Shape = new egret.Shape;
		groupBg.graphics.lineStyle(0,0xffffff);
		groupBg.graphics.beginFill(0xffffff,0.2);
        //groupHeight + roundDp*2 隐藏下方圆角
		groupBg.graphics.drawRoundRect(groupX, groupY, groupWidth, groupHeight + roundDp*2, roundDp*2, roundDp*2);
		groupBg.graphics.endFill();
		this.addChild(groupBg);

        //滚动条控件
        var myScroller = new eui.Scroller();
        myScroller.x = groupX;
        myScroller.y = groupY;
        myScroller.width = groupWidth;
        myScroller.height = groupHeight;
        myScroller.viewport = mainGroup;
        this.addChild(myScroller);

        //任务数组测试
        let taskstr:Array<string> = egret.localStorage.getItem('Task').split(";");
       // alert(egret.localStorage.getItem('Task'));

        // let imgTaskArrayTest:Array<string> = ["ic_settings_png", "ic_personal_png", 
        // "ic_begin_png", "ic_shop_png", "ic_task_png", "ic_tips_png,ic_settings_png", "ic_personal_png", 
        // "ic_begin_png", "ic_shop_png", "ic_task_png", "ic_tips_png"];
        // let nameTaskArrayTest:Array<string> = ["吃", "吃屁", "吃屁屁", "吃吃屁屁", "嘿嘿", "吼吼","吃", "吃屁", "吃屁屁", "吃吃屁屁", "嘿嘿", "吼吼"];
        for(var i = 0; i<taskstr.length-1; i++){

            //内部行布局
            var rowGroup:eui.Group = this.CreatedGroup( 0, 0, rowWidth, rowHeight );
            rowGroup.height = rowHeight;
            mainGroup.addChild(rowGroup);

        
            /**
             * 每行的左半边背景，含点击事件
             */
            var shp1:egret.Shape = new egret.Shape();
            shp1.graphics.beginFill( 0xFFFFFF, 1);
            //宽度 = 布局内部行宽 - 按钮宽 - 按钮左右边距
            shp1.graphics.drawRoundRect( 0, 0, rowWidth - btnWidth - groupMargin*2, rowHeight , roundDp, roundDp);
            shp1.graphics.endFill();
            rowGroup.addChild(shp1);
            shp1.touchEnabled = true;
            shp1.name = "shp" + i.toString();  //赋值名字，目的是在点击事件中获取对象
            shp1.addEventListener(egret.TouchEvent.TOUCH_TAP, function(e){
                let curShp = e.currentTarget;  //获取每个循环中的当下对象
                switch(curShp.name){
                    case "shp0":
                        alert("bg0");
                        break;
                    case "shp1":
                        alert("bg1");
                        break;
                    case "shp2":
                        alert("bg2");
                        break;
                    case "shp3":
                        alert("bg3");
                        break;
                    case "shp4":
                        alert("bg4");
                        break;
                    case "shp5":
                        alert("bg5");
                        break;
                }
            },this)
            //图标
            var img1:eui.Image = new eui.Image();
            img1.source = taskstr[i];
            img1.width = rowHeight - margin*0.4;  //留出边距
            img1.height = rowHeight - margin*0.4;  //留出边距
            img1.verticalCenter = 0;
            img1.x = groupMargin;
            rowGroup.addChild(img1);
            //文字
            var lbl1:eui.Label = new eui.Label();
            lbl1.text = taskstr[i].split(":")[1];
            lbl1.textColor = 0x000000;
            lbl1.verticalCenter = 0;
            //x坐标：图标x坐标 + 图标宽 + 图标右边距
            lbl1.x = img1.x + img1.width + groupMargin;
            rowGroup.addChild(lbl1);
        
            /**
            * 按钮背景
            */
            var shp2:egret.Shape = new egret.Shape();
            shp2.graphics.beginFill( 0xFFFFFF, 0);
            //x坐标和宽度中的roundDp，目的是遮住两个圆角矩形背景中间的圆角
            shp2.graphics.drawRoundRect( 
                //x坐标 = 内行宽 - 按钮宽 - 按钮左右边距 - 圆角
                rowWidth - btnWidth - groupMargin*2 - roundDp, 0, 
                //宽度 = 按钮宽 + 按钮左右边距 + 圆角
                btnWidth + groupMargin*2 + roundDp, rowHeight , roundDp, roundDp);
            shp2.graphics.endFill();
            rowGroup.addChild(shp2);

            var btn1:eui.Button = new eui.Button();
            btn1.label = "确定";
            btn1.width = btnWidth;
            btn1.height = rowHeight - margin*0.6;  //留出边距
            btn1.verticalCenter = 0;
            btn1.addEventListener(egret.TouchEvent.TOUCH_TAP, function(){alert("btn");}, this)
            btn1.x = rowWidth - btnWidth - groupMargin;  //内行宽 - 按钮宽 - 按钮右边距
            rowGroup.addChild(btn1);
            
        }
	}

	onComplete(){Scene.TaskCheck();}
	
}