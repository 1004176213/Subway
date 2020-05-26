class GetTime {
	static gettime = null;
	static timelabel;
	static timer: egret.Timer;
	static threshold = 1000;
	static distance;

	static btn
	static btn2;
	static time = 0;
	public constructor() {

	}
	public TimerControl() {
		if (GetTime.timer == null) {
			GetTime.timer = new egret.Timer(700, 0);
			GetTime.timer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
		}

		if (GetTime.time <= GetTime.threshold) {
			GetTime.timer.start();
		}

	}
	private timerFunc() {
		if (GetTime.time >= GetTime.threshold) {
			GetTime.btn.enabled = true;
			GetTime.btn2.enabled = true;
			this.Drivein(Subway.subway, Subway.subwayX, Subway.subwayY, Subway.subwaywidth, Subway.subwayheight, Subway.space, GetTime.btn, GetTime.btn2);
			GetTime.timer.stop();

			GetTime.time = GetTime.threshold;
			GetTime.timelabel.text = "0:0:0";

		} else {
			GetTime.btn.enabled = false;
			GetTime.btn2.enabled = false;
			GetTime.time = Number(GetTime.timelabelSet());

			var time: number = GetTime.threshold - GetTime.time;
			var hour = Math.floor(time / (60 * 60));
			var minute = Math.floor(time / 60) - hour * 60;
			var second = Math.floor(time) - hour * 60 * 60 - minute * 60;
			GetTime.timelabel.text = hour + ":" + minute + ":" + second;
			//console.log(GetTime.time);
		}

	}
	public static timelabelSet(): String {
		var timestr = egret.localStorage.getItem('timeSet');
		if (timestr == null) {
			let now = new Date();
			egret.localStorage.setItem('timeSet', now.getFullYear() + ":" + now.getMonth() + ":" + now.getDate() + ":" + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds());
		}
		var timestr = egret.localStorage.getItem('timeSet');
		let setdate = new Date();
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

		let now = new Date();
		var secondsnumber = now.getTime() - setdate.getTime();
		return Math.floor((secondsnumber / 1000)).toString();
	}

	public Driveaway(subway, subwayX, subwayY, subwaywidth, subwayheight, space, btn, btn2) {

		btn.enabled = false;
		btn2.enabled = false;
		Subway.subway.x = this.getscreenWidth() - subwaywidth * subway.$getScaleX() - space;
		egret.Tween.get(subway).to({ x: this.getscreenWidth() + subwaywidth * subway.$getScaleX() - space, y: subwayY }, 1000, egret.Ease.sineIn);

	}
	public Drivein(subway, subwayX, subwayY, subwaywidth, subwayheight, space, btn, btn2) {
		Subway.subway.x = Subway.background.x - subwaywidth * subway.scaleX;
		egret.Tween.get(subway).to({ x: this.getscreenWidth() - subwaywidth * subway.$getScaleX() - space, y: subwayY }, 1000, egret.Ease.sineInOut).call(
			function (btn, btn2) {
				btn.enabled = true;
				btn2.enabled = true;
			}, this, [btn, btn2]
		)
	}

	getscreenWidth() {
		return egret.MainContext.instance.stage.stageWidth;
	}
	getscreenHeight() {
		return egret.MainContext.instance.stage.stageHeight;
	}
}