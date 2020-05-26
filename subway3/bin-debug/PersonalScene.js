var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var PersonalScene = (function (_super) {
    __extends(PersonalScene, _super);
    function PersonalScene() {
        var _this = _super.call(this) || this;
        Sound.currentscene = "PersonalScene";
        return _this;
    }
    PersonalScene.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    PersonalScene.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.addBg(0x4798B3, this); //创建背景
        //创建标题行（标题图标、文字和退出图标）
        var titleImg = new eui.Image();
        var titleLbl = new eui.Label();
        var backImg = new eui.Image();
        this.addTitle(titleImg, "ic_personal_png", titleLbl, "个人中心", backImg, "ic_exit_png", this);
        //布局属性
        var margin = 50;
        var scale = 0.5;
        var groupWidth = this.getscreenWidth() - margin * 2; //布局宽度
        var groupMargin = margin / 2; //布局内的控件边距
        var rowHeight = 80; //内行高
        var rowWidth = groupWidth - groupMargin * 2; //内行宽
        var roundDp = 50; //圆角大小
        //个人信息group（等级、速度、载客量）
        var infoGroup = this.createPersonalInfo(margin, margin * 2 + titleImg.height * scale);
        this.addChild(infoGroup);
        //背包标题行
        var bpImg = new eui.Image();
        var bpLbl = new eui.Label();
        this.addTitle(bpImg, "ic_backpack_png", bpLbl, "背包", new eui.Image(), null, this);
        bpImg.y = margin * 3 + titleImg.height * scale + rowHeight; //3个间隔 + 标题行高 + 个人信息行高
        bpLbl.y = margin * 3 + titleImg.height * scale + rowHeight; //3个间隔 + 标题行高 + 个人信息行高
        //背包网格布局
        var bpGroup = this.createTileGroup(margin, margin * 4 + titleImg.height * scale + rowHeight + bpImg.width * scale, //4个间隔 + 标题行高 + 个人信息行高 + 背包标题行高
        groupWidth, 
        //屏幕高度 - 5个间隔 - 标题行高 - 个人信息行高 - 背包标题行高
        this.getscreenHeight() - margin * 5 - titleImg.height * scale - rowHeight - bpImg.width * scale, 3, this);
        //背包图片数组测试
        var imgArrayTest = ["ic_settings_png", "ic_personal_png",
            "ic_begin_png", "ic_shop_png", "ic_task_png", "ic_tips_png",
            "ic_personal_png",
            "ic_begin_png", "ic_shop_png", "ic_task_png", "ic_tips_png",
            "ic_personal_png",
            "ic_begin_png", "ic_shop_png", "ic_task_png", "ic_tips_png",
            "ic_personal_png",
            "ic_begin_png", "ic_shop_png", "ic_task_png", "ic_tips_png"];
        for (var _i = 0, imgArrayTest_1 = imgArrayTest; _i < imgArrayTest_1.length; _i++) {
            var imgName = imgArrayTest_1[_i];
            var img = new eui.Image();
            img.source = imgName;
            bpGroup.addChild(img);
        }
    };
    PersonalScene.prototype.onComplete = function () { };
    return PersonalScene;
}(Scene));
__reflect(PersonalScene.prototype, "PersonalScene", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=PersonalScene.js.map