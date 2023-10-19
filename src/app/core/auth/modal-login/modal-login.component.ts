import { Component, EventEmitter, Output } from '@angular/core';
import { TabsLogin } from '@shared/models/types/tabs-login';

@Component({
  selector: 'app-modal-login',
  templateUrl: './modal-login.component.html',
  styleUrls: ['./modal-login.component.scss'],
})
export class ModalLoginComponent {
  @Output() close = new EventEmitter<boolean>();
  tabsEnum: typeof TabsLogin = TabsLogin;
  tab: TabsLogin = TabsLogin.LOGIN;
  changeTab(typeTab: TabsLogin): void {
    this.tab = typeTab;
  }

  closeModal(event: any): void {
    this.close.emit(true);
  }
}
