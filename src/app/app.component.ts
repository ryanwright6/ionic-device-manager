import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public keyboardVisible: boolean;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.watchKeyboard();
    });
  }

  watchKeyboard() {
    window.addEventListener('keyboardDidHide', () => {
      setTimeout(() => {
        if (!this.keyboardVisible) {
          window.scrollTo(0, 0);
          window.document.body.scrollTop = 0;
        }
      }, 100);
      this.keyboardVisible = false;
    });

    window.addEventListener('keyboardDidShow', () => {
      window.scrollTo(0, 0);
      window.document.body.scrollTop = 0;
      this.keyboardVisible = true;
    });
  }
}
