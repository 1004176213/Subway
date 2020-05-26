

class Main extends eui.UILayer {


    protected createChildren(): void {
        super.createChildren();

        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin
        })

        egret.lifecycle.onPause = () => {

            egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
        }

        //inject the custom material parser
        //注入自定义的素材解析器
        let assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());


        this.runGame().catch(e => {
            console.log(e);
        })
    }

    private async runGame() {

        //存储数据
        //    if (egret.localStorage.getItem('timeSet') == null) {
        // egret.localStorage.setItem('timeSet', '');
        //    }
        egret.localStorage.setItem('Level', '1');
        egret.localStorage.setItem('Task', "");
        egret.localStorage.setItem('Numberofdriveaway', "");
        egret.localStorage.setItem('energy', '9999999');
        if (egret.localStorage.getItem('Level') == null) {
            egret.localStorage.setItem('Level', '1');
        }


        await this.loadResource()
        this.createGameScene();
        const result = await RES.getResAsync("description_json")
        await platform.login();
        const userInfo = await platform.getUserInfo();
        console.log(userInfo);

    }

    private async loadResource() {
        try {
            const loadingView = new LoadingUI();
            this.stage.addChild(loadingView);
            await RES.loadConfig("resource/default.res.json", "resource/");

            await this.loadTheme();
            await RES.loadGroup("preload", 0, loadingView);
            this.stage.removeChild(loadingView);
        }
        catch (e) {
            console.error(e);
        }
    }

    private loadTheme() {
        return new Promise((resolve, reject) => {
            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
            //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            let theme = new eui.Theme("resource/default.thm.json", this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, () => {
                resolve();
            }, this);

        })
    }

    protected createGameScene(): void {
        let sceneManager = SceneManager.getInstance();
        // 设置场景管理器的根节点为当前场景
        sceneManager.rootLayer = this;
        let firstScene = new StartScene();
        sceneManager.changeScene(firstScene);

    }


}
