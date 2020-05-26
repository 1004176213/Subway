class MedalScene extends Scene implements  eui.UIComponent {
	public constructor() {
		super();
	}
	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}

    private cellGroup:eui.Group;

	protected childrenCreated(): void {
		super.childrenCreated();
        
        this.addBg(0xB0C4DE, this);  //创建背景
        
        //创建标题行（标题图标、文字和退出图标）
        var titleImg:eui.Image = new eui.Image();
        var titleLbl:eui.Label = new eui.Label();
        var backImg:eui.Image = new eui.Image();
        this.addTitle(titleImg, "ic_medal_png", titleLbl, "成就馆", backImg, "ic_exit_png", this);
        
        //布局属性
        var margin = 50;
        var scale = 0.5;

        //成就网格布局
        this.cellGroup = this.createTileGroup(margin, 
            margin*2 + titleImg.height*scale,   //2个间隔 + 标题行高 
            this.getscreenWidth() - margin*2, 
            this.getscreenHeight() - margin*3 - titleImg.height*scale,   //屏幕高度 - 3个间隔 - 标题行高 
            3, this);

        //成就图片数组测试
        let imgArrayTest:Array<string> = ["ic_settings_png", "ic_personal_png", 
        "ic_begin_png", "ic_shop_png", "ic_task_png", "ic_tips_png", 
        "ic_begin_png", "ic_shop_png", "ic_task_png", "ic_tips_png", 
        "ic_begin_png", "ic_shop_png", "ic_task_png", "ic_tips_png", 
        "ic_begin_png", "ic_shop_png", "ic_task_png", "ic_tips_png", 
        "ic_begin_png", "ic_shop_png", "ic_task_png", "ic_tips_png", 
        "ic_begin_png", "ic_shop_png", "ic_task_png", "ic_tips_png"];
        for(let imgName of imgArrayTest){
            var img:eui.Image = new eui.Image();
            img.source = imgName;
            this.cellGroup.addChild(img);
        }
	}

	onComplete(){}
	
}