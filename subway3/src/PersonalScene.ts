class PersonalScene extends Scene implements  eui.UIComponent {
	public constructor() {
		super();
        Sound.currentscene = "PersonalScene";
	}
	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}

	protected childrenCreated(): void {
		super.childrenCreated();
        
        this.addBg(0x4798B3, this);  //创建背景
        
        //创建标题行（标题图标、文字和退出图标）
        var titleImg:eui.Image = new eui.Image();
        var titleLbl:eui.Label = new eui.Label();
        var backImg:eui.Image = new eui.Image();
        this.addTitle(titleImg, "ic_personal_png", titleLbl, "个人中心", backImg, "ic_exit_png", this);
        
        //布局属性
        var margin = 50;
        var scale = 0.5;
        var groupWidth:number = this.getscreenWidth() - margin*2;//布局宽度
        var groupMargin = margin/2;//布局内的控件边距
        var rowHeight:number = 80;//内行高
        var rowWidth:number = groupWidth - groupMargin*2;//内行宽
        var roundDp = 50;//圆角大小

        //个人信息group（等级、速度、载客量）
        var infoGroup:eui.Group = this.createPersonalInfo(margin, margin*2 + titleImg.height*scale);
        this.addChild(infoGroup);

        //背包标题行
        var bpImg:eui.Image = new eui.Image();
        var bpLbl:eui.Label = new eui.Label();
        this.addTitle(bpImg, "ic_backpack_png", bpLbl, "背包", new eui.Image(), null, this);
        bpImg.y = margin*3 + titleImg.height*scale + rowHeight;  //3个间隔 + 标题行高 + 个人信息行高
        bpLbl.y = margin*3 + titleImg.height*scale + rowHeight;  //3个间隔 + 标题行高 + 个人信息行高

        //背包网格布局
        var bpGroup:eui.Group = this.createTileGroup(margin, 
            margin*4 + titleImg.height*scale + rowHeight + bpImg.width*scale,   //4个间隔 + 标题行高 + 个人信息行高 + 背包标题行高
            groupWidth, 
            //屏幕高度 - 5个间隔 - 标题行高 - 个人信息行高 - 背包标题行高
            this.getscreenHeight() - margin*5 - titleImg.height*scale - rowHeight - bpImg.width*scale, 
            3, this);

        //背包图片数组测试
        let imgArrayTest:Array<string> = ["ic_settings_png", "ic_personal_png", 
        "ic_begin_png", "ic_shop_png", "ic_task_png", "ic_tips_png"
        , "ic_personal_png", 
        "ic_begin_png", "ic_shop_png", "ic_task_png", "ic_tips_png"
        , "ic_personal_png", 
        "ic_begin_png", "ic_shop_png", "ic_task_png", "ic_tips_png"
        , "ic_personal_png", 
        "ic_begin_png", "ic_shop_png", "ic_task_png", "ic_tips_png"];
        for(let imgName of imgArrayTest){
            var img:eui.Image = new eui.Image();
            img.source = imgName;
            bpGroup.addChild(img);
        }
	}

	onComplete(){}
	
}