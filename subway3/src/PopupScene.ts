class PopupScene extends Scene implements eui.UIComponent {
    //默认标题、弹窗正文与ok按钮点击事件类型
    private title: string = "提示";
    private content: string = "哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈";
    private okEventType: number = 0;
    private btnType: number = 0;
    /**
     * titleTxt: 标题字符串
     * contentTxt: 弹窗正文字符串
     * okType: ok按钮点击事件，用数字表示类型
     * btnType: 两种弹窗0代表只有确认1代表有确认和取消
     */
    public constructor(titleTxt: string, contentTxt: string, okType: number, btnType: number) {
        super();
        this.title = titleTxt;
        this.content = contentTxt;
        this.okEventType = okType;
        this.btnType = btnType;
    }
    protected partAdded(partName: string, instance: any): void {
        super.partAdded(partName, instance);
    }

    protected childrenCreated(): void {
        super.childrenCreated();

        //布局属性
        var mWidth: number = 500;
        var btnWidth: number = mWidth / 7;
        var margin: number = 60;
        var fontSize: number = 50;

        //背景透明度
        var shadow: egret.Shape = new egret.Shape();
        shadow.graphics.lineStyle(0, 0x000000);
        shadow.graphics.beginFill(0x000000, 0.5);
        shadow.graphics.drawRect(0, 0, this.getscreenWidth(), this.getscreenHeight());
        shadow.graphics.endFill();
        this.addChild(shadow);

        //弹窗主体group
        var group: eui.Group = new eui.Group();
        group.width = mWidth;
        group.height = mWidth;
        group.x = (this.getscreenWidth() - mWidth) / 2;
        group.y = (this.getscreenHeight() - mWidth) / 2;
        this.addChild(group);

        var bg: eui.Image = new eui.Image();
        bg.source = "bg_popup_png";
        bg.width = mWidth;
        bg.height = mWidth;
        group.addChild(bg);

        //弹窗标题
        var titleLbl: eui.Label = new eui.Label();
        titleLbl.text = this.title;
        titleLbl.y = margin;
        titleLbl.width = mWidth;
        titleLbl.height = fontSize;
        titleLbl.textAlign = "center";
        titleLbl.verticalAlign = "middle";
        titleLbl.size = fontSize;
        titleLbl.bold = true;
        group.addChild(titleLbl);

        //弹窗内容
        var contentLbl: eui.Label = new eui.Label();
        contentLbl.text = this.content;
        contentLbl.x = margin;
        contentLbl.y = margin * 2 + fontSize;  //margin*2 + 标题行高
        contentLbl.width = mWidth - margin * 2;
        contentLbl.height = mWidth - margin * 3 - fontSize;  //弹窗高 - margin*3 - 标题行高
        contentLbl.size = fontSize / 2;
        contentLbl.lineSpacing = 1.2;  //正文行间隔
        group.addChild(contentLbl);
        if (this.btnType != 0) {
            //取消按钮及点击事件
            var noImg: eui.Image = new eui.Image();
            noImg.source = "ic_no_png";
            noImg.width = btnWidth;
            noImg.height = btnWidth;
            noImg.x = margin;
            noImg.y = mWidth - margin - btnWidth;
            group.addChild(noImg);
            //关闭弹窗
            noImg.addEventListener(egret.TouchEvent.TOUCH_TAP,
                () => { SceneManager.getInstance().popScene(); }, this);

        }
        //确定按钮及点击事件
        var okImg: eui.Image = new eui.Image();
        okImg.source = "ic_ok_png";
        okImg.width = btnWidth;
        okImg.height = btnWidth;
        if (this.btnType == 0) {
            okImg.x = (mWidth - okImg.width) / 2;
            okImg.y = mWidth - margin - btnWidth;
        } else {
            okImg.x = mWidth - margin - btnWidth;
            okImg.y = mWidth - margin - btnWidth;
        }


        group.addChild(okImg);
        //根据类型确定点击事件
        switch (this.okEventType) {
            case 0:  //关闭弹窗
                okImg.addEventListener(egret.TouchEvent.TOUCH_TAP,
                    () => { SceneManager.getInstance().popScene(); }, this);
                break;
            case 1:  //回到主页
                okImg.addEventListener(egret.TouchEvent.TOUCH_TAP,
                    () => { this.goMainScene() }, this);
                break;
            case 2:  //关闭游戏
                okImg.addEventListener(egret.TouchEvent.TOUCH_TAP,
                    () => { this.goExitScene() }, this);
                break;
            case 3:  //可以技能升级
                okImg.addEventListener(egret.TouchEvent.TOUCH_TAP,
                    () => {
                        var levelstr = egret.localStorage.getItem('Level');
                        var level = Number(levelstr);
                        Subway.energynumber.text = Number(Subway.energynumber.text) - Subway.need;
                        egret.localStorage.setItem('energy', Subway.energynumber.text);
                        egret.localStorage.setItem('Level', (level + 1).toString());
                        Subway.level = level + 1;
                        var levellabel = <eui.Label>Subway.infoGroup.getChildAt(1);
                        levellabel.text = "等级:\nLV" + Subway.level;
                        var energylabel = <eui.Label>Subway.infoGroup.getChildAt(4);
                        energylabel.text = "能量:\n" + Subway.energynumber.text;
                        SceneManager.getInstance().popScene();

                    }, this);
                break;
            case 4:  //能量不够不可以技能升级
                okImg.addEventListener(egret.TouchEvent.TOUCH_TAP,
                    () => {
                        SceneManager.getInstance().popScene();
                    }, this);
                break;
            default:  //回到主页
                okImg.addEventListener(egret.TouchEvent.TOUCH_TAP,
                    () => { this.goMainScene() }, this);
                break;
        }
    }
    onComplete() { }

}