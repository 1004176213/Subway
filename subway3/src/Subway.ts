class Subway {
	static subway;
	
	static level;
	static task = "";
	static Numberofdriveaway = 0;

	static need:number;
	static infoGroup;
	

	static game;
	static background;

	static subwayX;
	static subwayY;
	static subwaywidth;
	static subwayheight;
	static space = 100;

	static energynumber;
	public constructor() {
	}
	static InitSubway(){
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
		subway.x = Subway.background.x - subwaywidth * subway.scaleX
		subway.anchorOffsetX = 0;
		subway.anchorOffsetY = 0;

		Subway.subwaywidth = subwaywidth;
		Subway.subwayheight = subwayheight;
		Subway.subwayX = subwayX;
		Subway.subwayY = subwayY;

		Subway.subway = subway;
	}
}