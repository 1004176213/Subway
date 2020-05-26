var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Subway = (function () {
    function Subway() {
    }
    Subway.InitSubway = function () {
        var subway = new egret.Bitmap();
        subway.texture = RES.getRes("z-subway _png");
        var subwaywidth = subway.width;
        var subwayheight = subway.height;
        var subwayX = 0;
        var subwayY = 780;
        subway.x = subwayX;
        subway.y = subwayY;
        subway.width = subwaywidth;
        subway.height = subwayheight;
        subway.scaleX = 0.3;
        subway.scaleY = 0.3;
        subway.x = Subway.background.x - subwaywidth * subway.scaleX;
        subway.anchorOffsetX = 0;
        subway.anchorOffsetY = 0;
        Subway.subwaywidth = subwaywidth;
        Subway.subwayheight = subwayheight;
        Subway.subwayX = subwayX;
        Subway.subwayY = subwayY;
        Subway.subway = subway;
    };
    Subway.task = "";
    Subway.Numberofdriveaway = 0;
    Subway.space = 100;
    return Subway;
}());
__reflect(Subway.prototype, "Subway");
//# sourceMappingURL=Subway.js.map