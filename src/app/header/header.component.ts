import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private readonly dataService: DataService, private readonly changeDetectorRef: ChangeDetectorRef) { }

  login: boolean;

  ngOnInit(): void {
      this.dataService.loginSubject.subscribe((data) => {
        this.login = data;
        this.changeDetectorRef.detectChanges();
      });
  }

  logout() {
    localStorage.user = '';
    this.login = false;
    this.dataService.loginSubject.next(false);
  }

}
