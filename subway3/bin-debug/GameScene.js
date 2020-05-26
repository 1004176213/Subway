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
var GameScene = (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        var _this = _super.call(this) || this;
        _this.initialPoin = 0;
        Sound.currentscene = "GameScene";
        return _this;
    }
    GameScene.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    GameScene.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.CreateScene();
    };
    GameScene.prototype.onComplete = function () {
    };
    GameScene.prototype.CreateScene = function () {
        var energystr = egret.localStorage.getItem('energy');
        if (energystr != null) {
            Subway.energynumber.text = energystr;
        }
        var level = egret.localStorage.getItem('Level');
        if (level != null) {
            Subway.level = level;
        }
        var background = new egret.Bitmap();
        background.texture = RES.getRes("subwaybackground3_png");
        background.x = this.getscreenWidth() - background.width;
        this.width = background.width;
        background.touchEnabled = true;
        background.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.move, this);
        background.addEventListener(egret.TouchEvent.TOUCH_END, this.TouchEnd, this);
        this.addChildAt(background, 0);
        var btn = this.CreatedButton(10, 900, 80, 80, "发车", this);
        GetTime.btn = btn;
        btn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            Subway.Numberofdriveaway = Subway.Numberofdriveaway + 1;
            egret.localStorage.setItem("Numberofdriveaway", Subway.Numberofdriveaway.toString());
            GetTime.time = 0;
            var now = new Date();
            egret.localStorage.setItem('timeSet', now.getFullYear() + ":" + now.getMonth() + ":" + now.getDate() + ":" + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds());
            GetTime.timer = null;
            GetTime.gettime.TimerControl();
            this.Driveaway(Subway.subway, Subway.subwayX, Subway.subwayY, Subway.subwaywidth, Subway.subwayheight, Subway.space, btn, btn2);
        }, this);
        this.addChild(btn);
        var btn2 = this.CreatedButton(10, 980, 80, 80, "收集", this);
        GetTime.btn2 = btn2;
        btn2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.energyclick.bind(this, 200, 800), this);
        this.addChild(btn2);
        var btn3 = this.CreatedButton(10, 820, 80, 80, "时间快进100s", this);
        btn3.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            var timestr = egret.localStorage.getItem('timeSet');
            var timeyear = Number(timestr.split(":")[0]);
            var timemonth = Number(timestr.split(":")[1]);
            var timeday = Number(timestr.split(":")[2]);
            var timehour = Number(timestr.split(":")[3]);
            var timeminute = Number(timestr.split(":")[4]);
            var timesecond = Number(timestr.split(":")[5]);
            var setdate = new Date();
            setdate.setFullYear(timeyear);
            setdate.setMonth(timemonth);
            setdate.setDate(timeday);
            setdate.setHours(timehour);
            setdate.setMinutes(timeminute);
            setdate.setSeconds(timesecond - 100);
            egret.localStorage.setItem('timeSet', setdate.getFullYear() + ":" + setdate.getMonth() + ":" + setdate.getDate() + ":" + setdate.getHours() + ":" + setdate.getMinutes() + ":" + setdate.getSeconds());
            GetTime.time = Number(GetTime.timelabelSet());
        }, this);
        this.addChild(btn3);
        var btn4 = this.CreatedButton(10, 740, 80, 80, "log", this);
        btn4.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            var timestr = egret.localStorage.getItem('timeSet');
            if (timestr != null) {
                var timeyear = Number(timestr.split(":")[0]);
                var timemonth = Number(timestr.split(":")[1]);
                var timeday = Number(timestr.split(":")[2]);
                var timehour = Number(timestr.split(":")[3]);
                var timeminute = Number(timestr.split(":")[4]);
                var timesecond = Number(timestr.split(":")[5]);
                console.log("timeyear:" + timeyear + ",timemonth:" + timemonth + ",timeday:" + timeday + ",hour:" + timehour + ",timeminute:" + timeminute + ",timesecond:" + timesecond);
            }
        }, this);
        this.addChild(btn4);
        var btn5 = this.CreatedButton(10, 660, 80, 80, "时间快进1天", this);
        btn5.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            var timestr = egret.localStorage.getItem('timeSet');
            var timeyear = Number(timestr.split(":")[0]);
            var timemonth = Number(timestr.split(":")[1]);
            var timeday = Number(timestr.split(":")[2]);
            var timehour = Number(timestr.split(":")[3]);
            var timeminute = Number(timestr.split(":")[4]);
            var timesecond = Number(timestr.split(":")[5]);
            var setdate = new Date();
            setdate.setFullYear(timeyear);
            setdate.setMonth(timemonth);
            setdate.setDate(timeday - 1);
            setdate.setHours(timehour);
            setdate.setMinutes(timeminute);
            setdate.setSeconds(timesecond);
            egret.localStorage.setItem('timeSet', setdate.getFullYear() + ":" + setdate.getMonth() + ":" + setdate.getDate() + ":" + setdate.getHours() + ":" + setdate.getMinutes() + ":" + setdate.getSeconds());
            GetTime.time = Number(GetTime.timelabelSet());
        }, this);
        this.addChild(btn5);
        /**********************倒计时*************************************/
        var time = GetTime.threshold - Number(GetTime.timelabelSet());
        if (time < 0) {
            time = 0;
            GetTime.time = GetTime.threshold;
        }
        var hour = Math.floor(time / (60 * 60));
        var minute = Math.floor(time / 60) - hour * 60;
        var second = Math.floor(time) - hour * 60 * 60 - minute * 60;
        var timelabel = this.CreatedLabel(0, 200, 200, 50, hour + ":" + minute + ":" + second);
        timelabel.size = 50;
        timelabel.textColor = 0xffffff;
        GetTime.timelabel = timelabel;
        this.addChild(timelabel);
        GetTime.timelabel = timelabel;
        this.addChild(timelabel);
        /******************************************************************/
        var distancelabel = this.CreatedLabel(0, 250, 200, 50, "10km");
        distancelabel.size = 50;
        distancelabel.textColor = 0xffffff;
        this.addChild(distancelabel);
        var speedlabel = this.CreatedLabel(0, 300, 200, 50, "1m/s");
        speedlabel.size = 50;
        speedlabel.textColor = 0xffffff;
        this.addChild(speedlabel);
        GetTime.gettime.TimerControl();
        Subway.background = background;
        Subway.InitSubway();
        this.addChildAt(Subway.subway, 1);
        var data = RES.getRes("cat_json");
        var png = RES.getRes("cat_png");
        var maFac = new egret.MovieClipDataFactory(data, png);
        var neko = new egret.MovieClip(maFac.generateMovieClipData("cat"));
        this.addChild(neko);
        neko.gotoAndPlay(1, -1);
        neko.x = 400;
        neko.y = 400;
    };
    GameScene.prototype.move = function (evt) {
        if (this.initialPoin != 0 && this.x >= 0 && this.x <= this.width - this.getscreenWidth()) {
            this.x += evt.stageX - this.initialPoin;
        }
        if (this.x < 0) {
            this.x = 0;
        }
        if (this.x > this.width - this.getscreenWidth()) {
            this.x = this.width - this.getscreenWidth();
        }
        this.initialPoin = evt.stageX;
    };
    GameScene.prototype.TouchEnd = function () {
        this.initialPoin = 0;
    };
    GameScene.prototype.Driveaway = function (subway, subwayX, subwayY, subwaywidth, subwayheight, space, btn, btn2) {
        btn.enabled = false;
        btn2.enabled = false;
        Subway.subway.x = this.getscreenWidth() - subwaywidth * subway.$getScaleX() - space;
        egret.Tween.get(subway).to({ x: this.getscreenWidth() + subwaywidth * subway.$getScaleX() - space, y: subwayY }, 1000, egret.Ease.sineIn);
    };
    GameScene.prototype.Drivein = function (subway, subwayX, subwayY, subwaywidth, subwayheight, space, btn, btn2) {
        Subway.subway.x = Subway.background.x - subwaywidth * subway.scaleX;
        egret.Tween.get(subway).to({ x: this.getscreenWidth() - subwaywidth * subway.$getScaleX() - space, y: subwayY }, 1000, egret.Ease.sineInOut).call(function (btn, btn2) {
            btn.enabled = true;
            btn2.enabled = true;
        }, this, [btn, btn2]);
    };
    return GameScene;
}(Scene));
__reflect(GameScene.prototype, "GameScene", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=GameScene.js.map