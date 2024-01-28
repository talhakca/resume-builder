import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Build Your Resume in Minutes!';

  constructor(private router: Router) { }

  goToMainPage() {
    this.router.navigateByUrl('');
  }
}
