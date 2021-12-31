import { ThrowStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { AlertController, IonicSafeString } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  constructor(
    private _alertCtrl: AlertController
  ) { }

  public async simpleAlert(message: string | IonicSafeString, buttons?: any[], header?: string) {
    const alertOpt: {[prop: string]: any} = {
      cssClass: 'my-custom-loader',
      mode: 'ios'
    };
    if(header) alertOpt.header = header;
    if(buttons) alertOpt.buttons = buttons;
    alertOpt.message = message;

    const alert = await this._alertCtrl.create(alertOpt);

    alert.present();

    return alert;
  }

  public async inputAlert(header: string, inputs: any[], buttons?: any[]) {
    if(!header || !inputs) throw new Error('inputAlert requiere obligatoriamente sus parametros definidos');
    const alertOpt: {[prop: string]: any} = {
      cssClass: 'my-custom-loader',
      mode: 'ios'
    };

    alertOpt.header = header;
    alertOpt.inputs = inputs;
    alertOpt.buttons = buttons || [{text: 'cancelar', role: 'CANCEL'}, {text: 'aceptar', role: 'ACCEPT'}];

    const alert = await this._alertCtrl.create(alertOpt);

    alert.present();

    return alert;
  }

}
