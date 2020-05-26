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
var StartScene = (function (_super) {
    __extends(StartScene, _super);
    function StartScene() {
        var _this = this;
        Sound.currentscene = "StartScene";
        _this = _super.call(this) || this;
        return _this;
    }
    StartScene.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    StartScene.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        var outline = new egret.Shape; //设置背景为白色
        outline.graphics.lineStyle(2, 0x000000);
        outline.graphics.beginFill(0xffffff, 1);
        outline.graphics.drawRect(0, 0, this.getscreenWidth(), this.getscreenHeight());
        outline.graphics.endFill();
        this.addChildAt(outline, 0);
        var topmenu = this.CreatedGroup(0, this.getscreenHeight() * 0.03, this.getscreenWidth(), this.getscreenHeight() * 0.1);
        var exitbtn = new egret.Bitmap(); //左上角退出按钮
        exitbtn.texture = RES.getRes("ic_exit_png");
        exitbtn.x = this.getscreenHeight() * 0.03;
        exitbtn.y = 0;
        exitbtn.width = this.getscreenHeight() * 0.07;
        exitbtn.height = this.getscreenHeight() * 0.07;
        exitbtn.touchEnabled = true;
        // exitbtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.IcoClickDown, this);
        // exitbtn.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.IcoClickUp, this);
        // exitbtn.addEventListener(egret.TouchEvent.TOUCH_END, this.IcoClickUp, this);
        topmenu.addChild(exitbtn);
        var settingbtn = new egret.Bitmap(); //右上角设置按钮
        settingbtn.texture = RES.getRes("");
        settingbtn.height = this.getscreenHeight() * 0.07;
        settingbtn.x = this.getscreenWidth() - this.getscreenHeight() * 0.03 - settingbtn.width;
        settingbtn.y = 0;
        settingbtn.touchEnabled = true;
        // settingbtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.IcoClickDown, this);
        // settingbtn.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.IcoClickUp, this);
        // settingbtn.addEventListener(egret.TouchEvent.TOUCH_END, this.IcoClickUp, this);
        topmenu.addChild(settingbtn);
        this.addChild(topmenu);
        var titlegroup = this.CreatedGroup(this.getscreenWidth() * 0.2, this.getscreenHeight() * 0.22, this.getscreenWidth() * 0.6, this.getscreenHeight() * 0.12);
        var titlelabel = this.CreatedLabel(0, 0, this.getscreenWidth() * 0.6, this.getscreenHeight() * 0.12, "Old Subway"); //标题
        titlelabel.touchEnabled = true;
        // titlelabel.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.IcoClickDown, this);
        // titlelabel.addEventListener(egret.TouchEvent.TOUCH_END, this.IcoClickUp, this);
        titlelabel.size = 75;
        titlegroup.addChild(titlelabel);
        this.addChild(titlegroup);
        var btngroupwidth = this.getscreenWidth() * 0.5; //开始设置退出按钮组
        var btngroupheight = this.getscreenHeight() * 0.7;
        var btngroup = this.CreatedGroup(this.getscreenWidth() * 0.25, this.getscreenHeight() * 0.45, btngroupwidth, btngroupheight);
        for (var i = 0; i < 3; i++) {
            var btnwidth = btngroupwidth * 0.6;
            var btnheight = this.getscreenHeight() * 0.07;
            var btn = this.CreatedLabel(btngroupwidth * 0.35, i * 2 * btnheight, btnwidth, btnheight, "");
            btn.size = btnheight * 0.7;
            btn.textColor = 0x000000;
            // btn.$setBackgroundColor(0xffffff);
            var outline = new egret.Shape;
            outline.graphics.lineStyle(10, 0x000000);
            outline.graphics.beginFill(0xffffff, 0);
            outline.graphics.drawRoundRect(btngroupwidth * 0.35, i * 2 * btnheight, btnwidth, btnheight, 45);
            outline.graphics.endFill();
            btngroup.addChildAt(outline, 0);
            var btnico = new egret.Bitmap();
            btnico.x = 0;
            btnico.y = i * 2 * btnheight;
            btnico.width = btnheight;
            btnico.height = btnheight;
            btnico.touchEnabled = true;
            // btnico.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.IcoClickDown, this);
            // btnico.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.IcoClickUp, this);
            // btnico.addEventListener(egret.TouchEvent.TOUCH_END, this.IcoClickUp, this);
            btngroup.addChild(btnico);
            switch (i) {
                case 0:
                    btn.text = "Start";
                    btnico.texture = RES.getRes("ic_begin_png");
                    btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.goMainScene, this);
                    break;
                case 1:
                    btn.text = "Setting";
                    btnico.texture = RES.getRes("ic_exit_png");
                    btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.goSettingScene, this);
                    break;
                case 2:
                    btn.text = "Exit";
                    btnico.texture = RES.getRes("ic_tips_png");
                    btn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () { SceneManager.getInstance().pushScene(new PopupScene("退出", "", 2, 1)); }, this);
                    break;
            }
            btn.name = "btn" + i;
            btngroup.addChild(btn);
        }
        this.addChild(btngroup);
    };
    StartScene.prototype.onComplete = function () {
    };
    return StartScene;
}(Scene));
__reflect(StartScene.prototype, "StartScene", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=StartScene.js.map