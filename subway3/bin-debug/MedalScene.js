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
var MedalScene = (function (_super) {
    __extends(MedalScene, _super);
    function MedalScene() {
        return _super.call(this) || this;
    }
    MedalScene.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    MedalScene.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.addBg(0xB0C4DE, this); //创建背景
        //创建标题行（标题图标、文字和退出图标）
        var titleImg = new eui.Image();
        var titleLbl = new eui.Label();
        var backImg = new eui.Image();
        this.addTitle(titleImg, "ic_medal_png", titleLbl, "成就馆", backImg, "ic_exit_png", this);
        //布局属性
        var margin = 50;
        var scale = 0.5;
        //成就网格布局
        this.cellGroup = this.createTileGroup(margin, margin * 2 + titleImg.height * scale, //2个间隔 + 标题行高 
        this.getscreenWidth() - margin * 2, this.getscreenHeight() - margin * 3 - titleImg.height * scale, //屏幕高度 - 3个间隔 - 标题行高 
        3, this);
        //成就图片数组测试
        var imgArrayTest = ["ic_settings_png", "ic_personal_png",
            "ic_begin_png", "ic_shop_png", "ic_task_png", "ic_tips_png",
            "ic_begin_png", "ic_shop_png", "ic_task_png", "ic_tips_png",
            "ic_begin_png", "ic_shop_png", "ic_task_png", "ic_tips_png",
            "ic_begin_png", "ic_shop_png", "ic_task_png", "ic_tips_png",
            "ic_begin_png", "ic_shop_png", "ic_task_png", "ic_tips_png",
            "ic_begin_png", "ic_shop_png", "ic_task_png", "ic_tips_png"];
        for (var _i = 0, imgArrayTest_1 = imgArrayTest; _i < imgArrayTest_1.length; _i++) {
            var imgName = imgArrayTest_1[_i];
            var img = new eui.Image();
            img.source = imgName;
            this.cellGroup.addChild(img);
        }
    };
    MedalScene.prototype.onComplete = function () { };
    return MedalScene;
}(Scene));
__reflect(MedalScene.prototype, "MedalScene", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=MedalScene.js.map