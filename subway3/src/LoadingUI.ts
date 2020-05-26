

class LoadingUI extends egret.Sprite implements RES.PromiseTaskReporter {

    public constructor() {
        super();
        this.createView();
    
    }

    private textField: egret.TextField;

    private createView(): void {
        this.textField = new egret.TextField();
        this.addChild(this.textField);
        this.textField.y = this.getscreenHeight()*0.4;
        this.textField.width = this.getscreenWidth();
        this.textField.height = this.getscreenHeight()*0.1;
        this.textField.textAlign = "center";
    }
    public onProgress(current: number, total: number): void {
        this.textField.text = `Loading...${current}/${total}`;
    }


    getscreenWidth(){
        return egret.MainContext.instance.stage.stageWidth;
	}
	getscreenHeight(){
        return egret.MainContext.instance.stage.stageHeight;
	}
}
