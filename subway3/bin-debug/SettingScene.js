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
var SettingScene = (function (_super) {
    __extends(SettingScene, _super);
    function SettingScene() {
        var _this = _super.call(this) || this;
        Sound.currentscene = "SettingScene";
        return _this;
    }
    SettingScene.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    SettingScene.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        var top = this.CreatedGroup(this.getscreenWidth() * 0.02, this.getscreenHeight() * 0.02, this.getscreenWidth() * 0.96, this.getscreenHeight() * 0.1);
        this.addChild(top);
        var setexitbtn = new egret.Bitmap(); //左上角退出按钮
        setexitbtn.texture = RES.getRes("ic_exit_png");
        setexitbtn.x = this.getscreenHeight() * 0.03 + this.getscreenHeight() * 0.07 / 2;
        setexitbtn.y = this.getscreenHeight() * 0.03 + this.getscreenHeight() * 0.07 / 2;
        setexitbtn.anchorOffsetX = this.getscreenHeight() * 0.07 / 2;
        setexitbtn.anchorOffsetY = this.getscreenHeight() * 0.07 / 2;
        setexitbtn.width = this.getscreenHeight() * 0.07;
        setexitbtn.height = this.getscreenHeight() * 0.07;
        setexitbtn.touchEnabled = true;
        setexitbtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.IcoClickDown.bind(this, setexitbtn), this);
        setexitbtn.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.IcoClickUp.bind(this, "StartScene", setexitbtn), this);
        setexitbtn.addEventListener(egret.TouchEvent.TOUCH_END, this.IcoClickUp.bind(this, "StartScene", setexitbtn), this);
        this.addChild(setexitbtn);
        var mains = this.CreatedGroup(this.getscreenWidth() * 0.1, this.getscreenHeight() * 0.2, this.getscreenWidth() * 0.8, this.getscreenHeight() * 0.6);
        var mapx = this.getscreenWidth() * 0.01;
        var mapy = this.getscreenHeight() * 0.05;
        var map1 = new egret.Bitmap();
        map1.texture = RES.getRes("ic_exit_png");
        map1.x = mapx;
        map1.y = mapy;
        mains.addChild(map1);
        var setting1 = this.CreatedGroup(mapx * 25, mapy * 1.1, this.getscreenWidth() * 0.92 * 0.5, this.getscreenHeight() * 0.1);
        var hSlider1 = new eui.HSlider();
        hSlider1.width = 300;
        hSlider1.minimum = 0; //定义最小值
        hSlider1.maximum = 100; //定义最大值
        hSlider1.value = 10; //定义默认值
        setting1.addChild(hSlider1);
        mains.addChild(setting1);
        var map2 = new egret.Bitmap();
        map2.texture = RES.getRes("ic_begin_png");
        map2.x = mapx;
        map2.y = mapy * 4;
        mains.addChild(map2);
        var setting2 = this.CreatedGroup(mapx * 25, mapy * 1.04 * 4, this.getscreenWidth() * 0.92 * 0.5, this.getscreenHeight() * 0.1);
        mains.addChild(setting2);
        var map3 = new egret.Bitmap();
        map3.texture = RES.getRes("ic_begin_png");
        map3.x = mapx;
        map3.y = mapy * 7;
        mains.addChild(map3);
        var setting3 = this.CreatedGroup(mapx * 25, mapy * 1.02 * 7, this.getscreenWidth() * 0.92 * 0.5, this.getscreenHeight() * 0.1);
        mains.addChild(setting3);
        this.addChild(mains);
    };
    SettingScene.prototype.onComplete = function () {
    };
    return SettingScene;
}(Scene));
__reflect(SettingScene.prototype, "SettingScene", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=SettingScene.js.map