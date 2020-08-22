import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private readonly changeDetectorRef: ChangeDetectorRef) { }

  login: boolean;

  ngOnInit(): void {
    if(localStorage.user !== '') {
      this.login = true;
    }
  }

  logout() {
    localStorage.user = '';
    this.login = false;
    this.changeDetectorRef.detectChanges();
  }

}
