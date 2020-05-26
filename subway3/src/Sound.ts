class Sound {
public static currentscene;
	public static bgm: egret.Sound;
	public static soundchannel:egret.SoundChannel;

	public static sound: egret.Sound;
	public static soundsuccess;
	public constructor() {
	}
	public static loadsound(){
		this.sound = new egret.Sound();
		this.sound.load("resource/assets/Sound/getgoods3.mp3");
		this.sound.addEventListener(egret.Event.COMPLETE, function loadOver(event: egret.Event) {
			this.soundsuccess = true;
		}, this);
	}
}