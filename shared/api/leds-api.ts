export interface ICurrentScene {
    name: string;
}

export interface IChangeScene {
    name: string;
}

export interface ILedsApi {

    ledValues(): Uint32Array;
    sceneNames(): string[];
    currentScene(): ICurrentScene;
    changeScene(req: IChangeScene): ICurrentScene;

}