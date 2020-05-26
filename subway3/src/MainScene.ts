class MainScene extends Scene implements eui.UIComponent {
	public constructor() {
		Sound.currentscene = "MainScene";
		super();
	}
	public backgroundwidth: number;
	public backgroundheight: number;
	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}


	protected childrenCreated(): void {
		super.childrenCreated();
		
		var scenewidth = SceneManager.getInstance().rootLayer.width;
		var sceneheight = SceneManager.getInstance().rootLayer.height;

		var scene: eui.Group = this.CreatedGroup(0, 0, scenewidth, sceneheight);
		//上方新信息栏

		var infowidth = this.getscreenWidth();
		var infoheight = this.getscreenHeight() * 0.1;
		var info: eui.Group = this.CreatedGroup(0, 0, infowidth, infoheight);
		scene.addChild(info);

		// var outline: egret.Shape = new egret.Shape;
		// outline.graphics.lineStyle(0, 0x000000);
		// outline.graphics.beginFill(0x6495ED, 0.5);
		// outline.graphics.drawRoundRect(0, this.getscreenHeight() * 0.03, infowidth, this.getscreenHeight() * 0.07, 45);
		// outline.graphics.endFill();
		// info.addChildAt(outline, 1);

		var exitbtn = new egret.Bitmap(); //左上角退出按钮
		exitbtn.texture = RES.getRes("ic_exit_png");
		exitbtn.anchorOffsetX = this.getscreenHeight() * 0.07 / 2;
		exitbtn.anchorOffsetY = this.getscreenHeight() * 0.07 / 2;
		exitbtn.x = this.getscreenHeight() * 0.03 + this.getscreenHeight() * 0.07 / 2;
		exitbtn.y = this.getscreenHeight() * 0.03 + this.getscreenHeight() * 0.07 / 2;
		exitbtn.width = this.getscreenHeight() * 0.07;
		exitbtn.height = this.getscreenHeight() * 0.07;
		exitbtn.touchEnabled = true;
		exitbtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.IcoClickDown.bind(this,exitbtn), this);
		exitbtn.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.IcoClickUp.bind(this, "StartScene",exitbtn), this);
		exitbtn.addEventListener(egret.TouchEvent.TOUCH_END, this.IcoClickUp.bind(this, "StartScene",exitbtn), this);

		info.addChild(exitbtn);

		var bgc = new egret.Bitmap(); //右上角
		bgc.texture = RES.getRes("ic_energy_png");
		bgc.width = this.getscreenHeight() * 0.23;
		bgc.height = this.getscreenHeight() * 0.07;
		bgc.x = this.getscreenWidth() - this.getscreenHeight() * 0.03 - bgc.width;
		bgc.y = this.getscreenHeight() * 0.03;
		var energy = this.CreatedLabel(this.getscreenWidth() - this.getscreenHeight() * 0.03 - bgc.width * 0.9, this.getscreenHeight() * 0.03, this.getscreenHeight() * 0.21, this.getscreenHeight() * 0.07, "0"); //右上角
		Subway.energynumber = energy;
		energy.size = this.getscreenHeight() * 0.07 * 0.5;

		info.addChild(bgc);
		info.addChild(energy);

		var btnwidthAll = this.getscreenHeight() * 0.07;
		var btnheightAll = this.getscreenHeight() * 0.07;

		//中部内容
		var contentwidth = this.getscreenWidth();
		var contentheight = this.getscreenHeight() * 0.8;
		var content: eui.Group = this.CreatedGroup(0, infoheight, contentwidth, contentheight);
		scene.addChild(content);

		
		//成就
		var achievebtn = new egret.Bitmap();
		achievebtn.texture = RES.getRes("ic_medal_png");
		achievebtn.x = this.getscreenWidth() - this.getscreenHeight() * 0.03 - bgc.width * 0.9 + btnwidthAll * 2;
		achievebtn.y = this.getscreenHeight() * 0.07 + btnheightAll / 2;
		achievebtn.width = this.getscreenHeight() * 0.07;
		achievebtn.height = this.getscreenHeight() * 0.07;
		achievebtn.anchorOffsetX = btnwidthAll / 2;
		achievebtn.anchorOffsetY = btnheightAll / 2;
		achievebtn.touchEnabled = true;
		achievebtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.IcoClickDown.bind(this,achievebtn), this);
		achievebtn.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.IcoClickUp.bind(this, "MedalScene",achievebtn), this);
		achievebtn.addEventListener(egret.TouchEvent.TOUCH_END, this.IcoClickUp.bind(this, "MedalScene",achievebtn), this);
		content.addChild(achievebtn);

		//下方菜单栏
		var menuwidth = this.getscreenWidth();
		var menuheight = this.getscreenHeight() * 0.1;
		var menu: eui.Group = this.CreatedGroup(0, contentheight + infoheight, menuwidth, menuheight);
		scene.addChild(menu);

		// var outline: egret.Shape = new egret.Shape;
		// outline.graphics.lineStyle(0, 0x000000);
		// outline.graphics.beginFill(0x6495ED, 0.5);
		// outline.graphics.drawRoundRect(0, this.getscreenHeight() * 0.03, infowidth, this.getscreenHeight() * 0.07, 45);
		// outline.graphics.endFill();
		// menu.addChildAt(outline, 1);

		var personalbtn = new egret.Bitmap(); //左下角个人主页按钮
		personalbtn.texture = RES.getRes("ic_personal_png");
		personalbtn.anchorOffsetX = btnwidthAll / 2;
		personalbtn.anchorOffsetY = btnheightAll / 2;
		personalbtn.x = this.getscreenHeight() * 0.03 + btnwidthAll / 2;
		personalbtn.y = this.getscreenHeight() * 0.03 + btnheightAll / 2;
		personalbtn.width = this.getscreenHeight() * 0.07;
		personalbtn.height = this.getscreenHeight() * 0.07;
		personalbtn.touchEnabled = true;
		personalbtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.IcoClickDown.bind(this,personalbtn), this);
		personalbtn.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.IcoClickUp.bind(this, "PersonalScene",personalbtn), this);
		personalbtn.addEventListener(egret.TouchEvent.TOUCH_END, this.IcoClickUp.bind(this, "PersonalScene",personalbtn), this);
		menu.addChild(personalbtn);
		//个人中心
		//var personalbtn=new egret.Bitmap();
		//personalbtn.texture=RES.getRes("ic_task_png");
		//personalbtn.anchorOffsetX=btnwidthAll/2;
		//personalbtn.anchorOffsetY=btnheightAll/2;
		//personalbtn.x=this.getscreenHeight() * 0.03+btnwidthAll/2+btnwidthAll*2;
		//personalbtn.y=this.getscreenHeight() * 0.03+btnheightAll/2;
		//personalbtn.width=btnwidthAll;
		//personalbtn.height=btnheightAll;
		//personalbtn.touchEnabled=true;
		//menu.addChild(personalbtn);
		//任务
		var taskbtn = new egret.Bitmap();
		taskbtn.texture = RES.getRes("ic_task_png");
		taskbtn.anchorOffsetX = btnwidthAll / 2;
		taskbtn.anchorOffsetY = btnheightAll / 2;
		taskbtn.x = this.getscreenHeight() * 0.03 + btnwidthAll / 2 + btnwidthAll * 3.1;
		taskbtn.y = this.getscreenHeight() * 0.03 + btnheightAll / 2;
		taskbtn.width = btnwidthAll;
		taskbtn.height = btnheightAll;
		taskbtn.touchEnabled = true;
		taskbtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.IcoClickDown.bind(this,taskbtn), this);
		taskbtn.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.IcoClickUp.bind(this, "TaskScene",taskbtn), this);
		taskbtn.addEventListener(egret.TouchEvent.TOUCH_END, this.IcoClickUp.bind(this, "TaskScene",taskbtn), this);
		menu.addChild(taskbtn);

		var shopbtn = new egret.Bitmap(); //右下角商店按钮
		shopbtn.texture = RES.getRes("ic_shop_png");
		shopbtn.width = this.getscreenHeight() * 0.07;
		shopbtn.height = this.getscreenHeight() * 0.07;
		shopbtn.anchorOffsetX = btnwidthAll / 2;
		shopbtn.anchorOffsetY = btnheightAll / 2;
		shopbtn.x = this.getscreenWidth() - this.getscreenHeight() * 0.03 - shopbtn.width + btnwidthAll / 2;
		shopbtn.y = this.getscreenHeight() * 0.03 + btnwidthAll / 2;
		shopbtn.touchEnabled = true;
		shopbtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.IcoClickDown.bind(this,shopbtn), this);
		shopbtn.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.IcoClickUp.bind(this, "ShopScene",shopbtn), this);
		shopbtn.addEventListener(egret.TouchEvent.TOUCH_END, this.IcoClickUp.bind(this, "ShopScene",shopbtn), this);
		menu.addChild(shopbtn);


		///////////////////////////////////游戏部分
		var game = new GameScene();
		Subway.game = game;
		scene.addChildAt(game, 0);



		//画面左移
		// var goleftbtn = new egret.Bitmap();
		// goleftbtn.texture = RES.getRes("ic_exit_png");
		// goleftbtn.width = btnwidthAll;
		// goleftbtn.height = btnheightAll;
		// goleftbtn.anchorOffsetX = btnwidthAll / 2;
		// goleftbtn.anchorOffsetY = btnheightAll / 2;
		// goleftbtn.x = 10 + btnwidthAll / 2;
		// goleftbtn.y = 400 + btnwidthAll / 2;
		// goleftbtn.touchEnabled = true;
		// content.addChild(goleftbtn);

		// goleftbtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.IcoClickDown.bind(this,goleftbtn), this);
		// goleftbtn.addEventListener(egret.TouchEvent.TOUCH_END, this.IcoClickUp.bind(this,"goleft",goleftbtn), this);
		// goleftbtn.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.IcoClickUp.bind(this,"goleft",goleftbtn), this);

		//画面右移
		// var gorightbtn = new egret.Bitmap();
		// gorightbtn.texture = RES.getRes("ic_exit_png");
		// gorightbtn.width = btnwidthAll;
		// gorightbtn.height = btnheightAll;
		// gorightbtn.anchorOffsetX = btnwidthAll / 2;
		// gorightbtn.anchorOffsetY = btnheightAll / 2;
		// gorightbtn.x = this.getscreenWidth() - this.getscreenHeight() * 0.07 - 10 + btnwidthAll / 2;
		// gorightbtn.y = 400 + btnheightAll / 2;
		// gorightbtn.touchEnabled = true;
		// content.addChild(gorightbtn);
		// gorightbtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.IcoClickDown.bind(this,gorightbtn), this);
		// gorightbtn.addEventListener(egret.TouchEvent.TOUCH_END, this.IcoClickUp.bind(this,"goright",gorightbtn), this);
		// gorightbtn.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.IcoClickUp.bind(this,"goright",gorightbtn), this);

		//////////////////////////////////////


		this.addChildAt(scene, 1);
	}
	onComplete() {

	}
	
	
}