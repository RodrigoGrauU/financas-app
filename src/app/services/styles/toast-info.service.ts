import { Injectable } from '@angular/core';

export interface ToastInfo {
  header: string;
  body: string;
  delay?: number;
  className?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ToastInfoService {
  toasts: ToastInfo[] = []

  constructor() { }

  showInfo(header: string, body: string) {
    this.toasts.push({ header, body });
  }

  showDanger(header: string, body: string) {
    this.toasts.push({ header, body, className:'bg-danger text-light'});
  }

  showSuccess(header: string, body: string) {
    this.toasts.push({ header, body, className:'bg-success text-light'});
  }

  remove(toast: ToastInfo) {
    this.toasts = this.toasts.filter(t => t != toast);
  }
}
