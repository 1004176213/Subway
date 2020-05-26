abstract class Scene extends eui.Component {
	public constructor() {
		super();
		var Numberofdriveaway = egret.localStorage.getItem('Numberofdriveaway');
		if (Numberofdriveaway != null) {
			Subway.Numberofdriveaway = Number(Numberofdriveaway);
		}


		if (GetTime.gettime == null) {
			GetTime.gettime = new GetTime();
		}
		if (GetTime.time >= GetTime.threshold) {
			GetTime.time = GetTime.threshold;
		}

		this.addEventListener(eui.UIEvent.COMPLETE, this.onComplete, this);
		this.addEventListener(eui.UIEvent.COMPLETE, this.onCompletePlay, this);
		

	}
	static TaskCheck() {
		let taskstr: Array<string> = egret.localStorage.getItem('Task').split(";");
		let newtaskstr = "";
		for (var i = 0; i < taskstr.length-1; i++) {
			let taskmsg: Array<string> = taskstr[i].split(":")
			newtaskstr = newtaskstr + taskmsg[0] + ":" + taskmsg[1];
			if (taskmsg[2] == "unfinished") {
				switch (taskmsg[0]) {
					case "任务一":
						if (Number(Subway.energynumber.text) >= 100000) {
							newtaskstr = newtaskstr + ":finished";
							alert("任务一:能量收集100000达成");
						} else {
							newtaskstr = newtaskstr + ":unfinished"
						}
						break
					case "任务二":
						if (Subway.Numberofdriveaway >= 5) {
							newtaskstr = newtaskstr + ":finished";
							alert("任务二:发车次数超过5次");
						} else {
							newtaskstr = newtaskstr + ":unfinished"
						}


						break
				}
			}
			newtaskstr = newtaskstr + ";";
		}
		egret.localStorage.setItem("Task", newtaskstr);
	}

	protected abstract onComplete();
	onCompletePlay() {
		// if (Sound.currentscene == "GameScene") {
		// 		Sound.bgm = RES.getRes("test_mp3");
		// 		Sound.soundchannel =Sound.bgm.play();
		// }else{
		// 	if(Sound.bgm != null){
		// 		Sound.soundchannel.stop()
		// 		Sound.bgm = null;
		// 	}
		// }


	}
	goExitScene = () => {
			window.close();
		
	}
	goSettingScene = () => {
		//this.PlayClickSound();
		SceneManager.getInstance().changeScene(new SettingScene())
	}
	goMainScene = () => {
		//this.PlayClickSound();
		SceneManager.getInstance().changeScene(new MainScene())
	}

	public IcoClickDown(imgico, event: egret.Event) {
		this.PlayClickSound();
		// imgico.scaleX = imgico.scaleX + 0.2;
		// imgico.scaleY = imgico.scaleY + 0.2;
		egret.Tween.get(event.target).to({ scaleX: Number(imgico.scaleX) + 0.2, scaleY: Number(imgico.scaleY) + 0.2 }, 50, egret.Ease.sineInOut);

	}
	public IcoClickUp(name, imgico, event: egret.Event) {
		// imgico.scaleX = imgico.scaleX - 0.2;
		// imgico.scaleY = imgico.scaleY - 0.2;
		egret.Tween.get(event.target).to({ scaleX: Number(imgico.scaleX) - 0.2, scaleY: Number(imgico.scaleY) - 0.2 }, 50, egret.Ease.sineInOut);
		var idTimeout: number = egret.setTimeout(function (arg) {
			switch (name) {
				case "StartScene":
					SceneManager.getInstance().changeScene(new StartScene())
					break;
				case "MainScene":
					SceneManager.getInstance().changeScene(new MainScene())
					break;
				case "MedalScene":
					SceneManager.getInstance().changeScene(new MedalScene())
					break;
				case "ShopScene":
					SceneManager.getInstance().changeScene(new ShopScene())
					break;
				case "PersonalScene":
					SceneManager.getInstance().changeScene(new PersonalScene())
					break;
				case "TaskScene":
					SceneManager.getInstance().changeScene(new TaskScene())
					break;
				case "goright":
					egret.Tween.get(Subway.game).to({ x: 0 }, 150, egret.Ease.sineInOut);
					break;
				case "goleft":
					if (Subway.game.x >= this.getscreenWidth() - Subway.background.width) {
						egret.Tween.get(Subway.game).to({ x: Subway.background.width - this.getscreenWidth() }, 150, egret.Ease.sineInOut);
					}
					break;

			}
		}, this, 150, "egret"
		);

	}
	protected CreatedGroup(x: number, y: number, width: number, height: number): eui.Group {
		var group: eui.Group = new eui.Group();
		group.setLayoutBoundsPosition(x, y);
		group.setContentSize(width, height);

		//**************************************显示Group范围 */
		// var outline:egret.Shape = new egret.Shape;
		// outline.graphics.lineStyle(1,0x00ff00);
		// outline.graphics.beginFill(0x000000,0.1);
		// outline.graphics.drawRect(0, 0,width,height);
		// outline.graphics.endFill();
		// group.addChild(outline);
		//*************************************** */
		return group;
	}
	protected CreatedLabel(x: number, y: number, width: number, height: number, text: string): eui.Label {
		var label: eui.Label = new eui.Label();
		label.setLayoutBoundsPosition(x, y);
		label.width = width;
		label.height = height;
		label.text = text;
		label.textColor = 0xFF7F00;
		label.size = 50;
		label.$setFontFamily("fantasy");
		label.textAlign = egret.HorizontalAlign.CENTER;//设置水平对齐方式
		label.verticalAlign = egret.VerticalAlign.MIDDLE;//设置垂直对齐方式
		return label;
	}
	protected CreatedButton(x: number, y: number, width: number, height: number, text: string, vm): eui.Button {

		var btn: eui.Button = new eui.Button();
		//btn.setSkinPart("resource/ButtonSkin.exml",vm);
		btn.setLayoutBoundsPosition(x, y);
		btn.width = width;
		btn.height = height;
		btn.label = text;

		// var label:eui.Label = <eui.Label>btn.getChildAt(1);
		// label.textColor = 0xFFFFFF;

		var outline: egret.Shape = new egret.Shape;
		outline.graphics.beginFill(0xFFFFFF, 0.5);
		outline.graphics.drawRoundRect(x, y, width, height, width * 0.3);
		outline.graphics.endFill();
		vm.addChild(outline)
		return btn;

	}
	protected CreatedImage(x: number, y: number, width: number, height: number, src: string): eui.Image {
		var img: eui.Image = new eui.Image();
		img.x = x;
		img.y = y;
		img.width = width;
		img.height = height;
		img.source = src;
		return img;
	}
	getscreenWidth() {
		return egret.MainContext.instance.stage.stageWidth;
	}
	getscreenHeight() {
		return egret.MainContext.instance.stage.stageHeight;
	}
	PlayClickSound() {
		var sound: egret.Sound = new egret.Sound();
		sound.addEventListener(egret.Event.COMPLETE, function loadOver(event: egret.Event) {
			sound.play(0, 1);
		}, this);
		sound.addEventListener(egret.IOErrorEvent.IO_ERROR, function loadError(event: egret.IOErrorEvent) {
			console.log("loaded error!");
		}, this);
		sound.load("resource/assets/Sound/click.mp3");
	}
	PlayGetGoodsSound() {

		if (Sound.soundsuccess) {
			Sound.sound.play(0, 1);
		}
	}

	/**
	 * 创建页面背景
	 */
	protected addBg(color: number, that) {
		var shp: egret.Shape = new egret.Shape();
		shp.graphics.beginFill(color, 1);
		shp.graphics.drawRect(0, 0, this.getscreenWidth(), this.getscreenHeight());
		shp.graphics.endFill();
		that.addChild(shp);
	}




	/**
	 * 创建标题行（标题图标、文字和退出图标）
	 * titleImg：页面图标对象
	 * titleSrc：页面图标路径
	 * titleLbl：页面Label对象
	 * titleTxt：页面标题内容
	 * backImg：返回图标对象
	 * backSrc：返回图标路径
	 * that：传this
	 */
	protected addTitle(titleImg: eui.Image, titleSrc: string, titleLbl: eui.Label, titleTxt: string, backImg: eui.Image, backSrc: string, that) {
		var margin = 50;  //通用间隔
		var scale = 0.5;  //缩放倍数

		//标题图标
		titleImg.source = titleSrc;
		that.addChild(titleImg);
		titleImg.scaleX = scale;  //缩放
		titleImg.scaleY = scale;
		titleImg.x = margin;
		titleImg.y = margin;

		//标题文字
		titleLbl.text = titleTxt;
		that.addChild(titleLbl);
		titleLbl.size = 40;
		titleLbl.height = titleImg.height * scale;  //文字高度与标题图标高度相同
		titleLbl.verticalAlign = "middle";  //文字垂直居中
		titleLbl.x = margin * 1.5 + titleImg.width * scale;  //横坐标：屏幕边缘到标题图片距离margin + 图片宽度 + 图片到文字距离margin*0.5
		titleLbl.y = margin;

		//返回图片
		backImg.source = backSrc;
		that.addChild(backImg);
		backImg.scaleX = scale;  //缩放
		backImg.scaleY = scale;
		backImg.x = this.getscreenWidth() - margin - backImg.width * scale;  //横坐标：屏幕宽度 - 屏幕边缘到返回图片距离margin - 图片宽度
		backImg.y = margin;
		backImg.touchEnabled = true;
		backImg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.goMainScene, that);
	}





	/**
	 * 创建个人信息group（等级、速度、载客量）
	 * x:横坐标
	 * y:纵坐标
	 * return:网格group
	 */
	protected createPersonalInfo(x: number, y: number): eui.Group {
		var margin = 50;
		var scale = 0.5;
		var groupWidth: number = this.getscreenWidth() - margin * 2;//布局宽度
		var groupMargin = margin / 2;//布局内的控件边距
		var rowHeight: number = 80;//内行高
		var rowWidth: number = groupWidth - groupMargin * 2;//内行宽
		var roundDp = 50;//圆角大小

		// 等级、速度、载客量
		var infoGroup: eui.Group = new eui.Group();
		infoGroup.x = x;
		infoGroup.y = y;
		infoGroup.width = groupWidth;
		infoGroup.height = rowHeight;
		var infoLayout: eui.TileLayout = new eui.TileLayout();  //网格布局
		infoLayout.horizontalGap = groupMargin;  //网格元素水平间隔
		infoLayout.verticalGap = groupMargin;  //网格元素垂直间隔
		infoLayout.columnAlign = eui.ColumnAlign.JUSTIFY_USING_WIDTH;
		infoLayout.rowAlign = eui.RowAlign.JUSTIFY_USING_HEIGHT;
		infoLayout.requestedColumnCount = 4;  //4列
		infoLayout.paddingTop = 10;
		infoLayout.paddingBottom = 10;
		infoLayout.paddingLeft = margin;
		infoGroup.layout = infoLayout;

		//Group背景
		var infoBg: egret.Shape = new egret.Shape;
		infoBg.graphics.lineStyle(0, 0xffffff);
		infoBg.graphics.beginFill(0xffffff, 0.2);
		infoBg.graphics.drawRoundRect(0, 0, groupWidth, rowHeight, roundDp, roundDp);
		infoBg.graphics.endFill();
		infoGroup.addChild(infoBg);

		var levelLbl: eui.Label = new eui.Label("等级:\nLV1");
		levelLbl.verticalCenter = true;
		levelLbl.height = rowHeight;
		infoGroup.addChild(levelLbl);

		var speedLbl: eui.Label = new eui.Label("速度:\n30km/h");
		speedLbl.verticalCenter = true;
		infoGroup.addChild(speedLbl);

		var loadLbl: eui.Label = new eui.Label("载客量:\n30人");
		loadLbl.verticalCenter = true;
		infoGroup.addChild(loadLbl);

		var energyLbl: eui.Label = new eui.Label("能量:\n" + Subway.energynumber.text);
		energyLbl.verticalCenter = true;
		infoGroup.addChild(energyLbl);

		return infoGroup;
	}




	/**
	 * 创建网格布局
	 * x：横坐标
	 * y：纵坐标
	 * width：宽度
	 * height：高度
	 * columns:列数
	 * that：传入this
	 * return:网格group
	 */
	protected createTileGroup(x: number, y: number, width: number, height: number, columns: number, that): eui.Group {
		var margin = 50;
		var scale = 0.5;
		var roundDp = 50;//圆角大小

		//网格布局
		var tGroup: eui.Group = new eui.Group();
		var tLayout: eui.TileLayout = new eui.TileLayout();
		tLayout.horizontalGap = margin;
		tLayout.verticalGap = margin;
		tLayout.columnAlign = eui.ColumnAlign.JUSTIFY_USING_WIDTH;
		tLayout.requestedColumnCount = columns;
		tLayout.paddingTop = margin;
		tLayout.paddingBottom = margin;
		tLayout.paddingLeft = margin;
		tLayout.paddingRight = margin;
		tGroup.layout = tLayout;

		//网格布局背景
		var bg: egret.Shape = new egret.Shape;
		bg.graphics.lineStyle(0, 0xffffff);
		bg.graphics.beginFill(0xffffff, 0.2);
		bg.graphics.drawRoundRect(x, y, width, height, roundDp * 2, roundDp * 2);
		bg.graphics.endFill();
		that.addChild(bg);

		//滚动条控件
		var scroller = new eui.Scroller();
		scroller.x = x;
		scroller.y = y;
		scroller.width = width;
		scroller.height = height;
		scroller.viewport = tGroup;
		that.addChild(scroller);

		return tGroup;
	}
	energyclick(x, y, event: egret.Event) {
		var bitmapnumber = 1200;
		this.PlayGetGoodsSound();
		var energy: Array<egret.Bitmap> = new Array<egret.Bitmap>();
		for (var i = 0; i < bitmapnumber; i++) {
			var bitmap = new egret.Bitmap(); //左下角退出按钮
			bitmap.texture = RES.getRes("energy_png");
			// bitmap.x =x;
			// bitmap.y =y;
			bitmap.width = 25;
			bitmap.height = 25;
			this.addChild(bitmap);
			energy[i] = bitmap;
		}
		for (var i = 0; i < bitmapnumber; i++) {
			var bitmap = energy[i];
			bitmap.x = x;
			bitmap.y = y;
			bitmap.scaleX = 1;
			bitmap.scaleY = 1;
			var radius = this.getRandom(300);

			var d = Math.sqrt(Math.random()) * radius;
			var angle = Math.random() * 2 * Math.PI;
			var bitmapx = d * Math.cos(angle) + x
			var bitmapy = d * Math.sin(angle) + y;
			egret.Tween.get(bitmap)
				.to({ x: bitmapx, y: bitmapy }, this.getRandom2(200, 300), egret.Ease.sineIn)
				.to({}, this.getRandom2(300, 500), egret.Ease.sineIn)
				.to({ x: this.getscreenWidth() - 150, y: 100 }, this.getRandom2(600, 800), egret.Ease.sineInOut).call(
				this.finish, this, [bitmap]
				)
		}


	}
	public finish(bitmap) {
		this.removeChild(bitmap);
		Subway.energynumber.text = (Number(Subway.energynumber.text) + 1).toString();
		egret.localStorage.setItem('energy', Subway.energynumber.text);
	}

	getRandom(xy: number): number {
		return Math.random() * xy + 1;
	}
	getRandom2(x: number, y: number): number {
		return Math.random() * (y - x + 1) + x;
	}
}