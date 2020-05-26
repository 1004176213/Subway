var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Sound = (function () {
    function Sound() {
    }
    Sound.loadsound = function () {
        this.sound = new egret.Sound();
        this.sound.load("resource/assets/Sound/getgoods3.mp3");
        this.sound.addEventListener(egret.Event.COMPLETE, function loadOver(event) {
            this.soundsuccess = true;
        }, this);
    };
    return Sound;
}());
__reflect(Sound.prototype, "Sound");
//# sourceMappingURL=Sound.js.map