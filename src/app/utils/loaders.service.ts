import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class LoadersService {
  public readonly spinner = 'dots';

  constructor(private _loaderCtrl: LoadingController) {}

  public async simpleLoader(msg?: string) {
    const loaderOpt: { [prop: string]: any } = {
      spinner: this.spinner,
      cssClass: 'my-custom-loader',
    };
    if (msg) loaderOpt.message = msg;

    const loader = await this._loaderCtrl.create(loaderOpt);
    loader.present();

    return loader;
  }
}
