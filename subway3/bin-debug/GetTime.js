var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GetTime = (function () {
    function GetTime() {
    }
    GetTime.prototype.TimerControl = function () {
        if (GetTime.timer == null) {
            GetTime.timer = new egret.Timer(700, 0);
            GetTime.timer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
        }
        if (GetTime.time <= GetTime.threshold) {
            GetTime.timer.start();
        }
    };
    GetTime.prototype.timerFunc = function () {
        if (GetTime.time >= GetTime.threshold) {
            GetTime.btn.enabled = true;
            GetTime.btn2.enabled = true;
            this.Drivein(Subway.subway, Subway.subwayX, Subway.subwayY, Subway.subwaywidth, Subway.subwayheight, Subway.space, GetTime.btn, GetTime.btn2);
            GetTime.timer.stop();
            GetTime.time = GetTime.threshold;
            GetTime.timelabel.text = "0:0:0";
        }
        else {
            GetTime.btn.enabled = false;
            GetTime.btn2.enabled = false;
            GetTime.time = Number(GetTime.timelabelSet());
            var time = GetTime.threshold - GetTime.time;
            var hour = Math.floor(time / (60 * 60));
            var minute = Math.floor(time / 60) - hour * 60;
            var second = Math.floor(time) - hour * 60 * 60 - minute * 60;
            GetTime.timelabel.text = hour + ":" + minute + ":" + second;
            //console.log(GetTime.time);
        }
    };
    GetTime.timelabelSet = function () {
        var timestr = egret.localStorage.getItem('timeSet');
        if (timestr == null) {
            var now_1 = new Date();
            egret.localStorage.setItem('timeSet', now_1.getFullYear() + ":" + now_1.getMonth() + ":" + now_1.getDate() + ":" + now_1.getHours() + ":" + now_1.getMinutes() + ":" + now_1.getSeconds());
        }
        var timestr = egret.localStorage.getItem('timeSet');
        var setdate = new Date();
        var timeyear = Number(timestr.split(":")[0]);
        var timemonth = Number(timestr.split(":")[1]);
        var timeday = Number(timestr.split(":")[2]);
        var timehour = Number(timestr.split(":")[3]);
        var timeminute = Number(timestr.split(":")[4]);
        var timesecond = Number(timestr.split(":")[5]);
        setdate.setFullYear(timeyear);
        setdate.setMonth(timemonth);
        setdate.setDate(timeday);
        setdate.setHours(timehour);
        setdate.setMinutes(timeminute);
        setdate.setSeconds(timesecond);
        var now = new Date();
        var secondsnumber = now.getTime() - setdate.getTime();
        return Math.floor((secondsnumber / 1000)).toString();
    };
    GetTime.prototype.Driveaway = function (subway, subwayX, subwayY, subwaywidth, subwayheight, space, btn, btn2) {
        btn.enabled = false;
        btn2.enabled = false;
        Subway.subway.x = this.getscreenWidth() - subwaywidth * subway.$getScaleX() - space;
        egret.Tween.get(subway).to({ x: this.getscreenWidth() + subwaywidth * subway.$getScaleX() - space, y: subwayY }, 1000, egret.Ease.sineIn);
    };
    GetTime.prototype.Drivein = function (subway, subwayX, subwayY, subwaywidth, subwayheight, space, btn, btn2) {
        Subway.subway.x = Subway.background.x - subwaywidth * subway.scaleX;
        egret.Tween.get(subway).to({ x: this.getscreenWidth() - subwaywidth * subway.$getScaleX() - space, y: subwayY }, 1000, egret.Ease.sineInOut).call(function (btn, btn2) {
            btn.enabled = true;
            btn2.enabled = true;
        }, this, [btn, btn2]);
    };
    GetTime.prototype.getscreenWidth = function () {
        return egret.MainContext.instance.stage.stageWidth;
    };
    GetTime.prototype.getscreenHeight = function () {
        return egret.MainContext.instance.stage.stageHeight;
    };
    GetTime.gettime = null;
    GetTime.threshold = 1000;
    GetTime.time = 0;
    return GetTime;
}());
__reflect(GetTime.prototype, "GetTime");
//# sourceMappingURL=GetTime.js.map