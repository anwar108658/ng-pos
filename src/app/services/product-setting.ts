import { effect, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductSetting {
  darkMode = signal(false)
  toggle() {
    this.darkMode.update(v => !v);
    const element:any = document.querySelector('html');
      element.classList.toggle('my-app-dark');
  }
}
