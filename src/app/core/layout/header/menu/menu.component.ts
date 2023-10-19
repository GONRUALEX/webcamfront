import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TokenService } from 'src/app/core/services/token.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnDestroy {
  @ViewChild('modalTabs', { static: false }) modalTabs: ElementRef;
  isLogged: boolean = false;
  subscription: Subscription[] = [];
  constructor(
    private tokenService: TokenService,
    private router: Router,
    private renderer: Renderer2
  ) {}
  ngOnDestroy(): void {
    this.subscription.map((subscription) => subscription.unsubscribe());
  }
  ngOnInit(): void {
    this.subscription.push(
      this.tokenService.getLogged().subscribe((data: boolean) => {
        this.isLogged = data;
      })
    );
  }

  onLogout(): void {
    this.tokenService.logOut();
    setTimeout(() => this.router.navigate(['/']), 1000);
  }

  closeModal(event: any) {
    this.renderer.selectRootElement('#modalClose').click();
  }
}
