import { Component } from '@angular/core';
import { TokenService } from './core/services/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'webcam';
  constructor(private tokenService: TokenService) {
  }
}
