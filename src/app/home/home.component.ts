import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild
} from '@angular/core';
import {interval, Subject, timer} from 'rxjs';
import {MatSidenav} from '@angular/material/sidenav';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {

  public isOpened = true;
  public showClose = false;
  public list = ['I develop cool websites', 'I develop Responsive Website'];
  public sk = [
    { name: 'Angular', level: 80 }, { name: 'HTML', level: 80 }, { name: 'CSS', level: 80 },
    { name: 'JavaScript', level: 70 }, { name: 'Java', level: 70 }, { name: 'Jquery', level: 70 },
    { name: 'SpringBoot', level: 60 }, { name: 'MongoDB', level: 30 }, { name: 'MySQL', level: 40 },
    { name: 'Karma', level: 70 }, { name: 'Jest', level: 80 },
    { name: 'JIRA ', level: 90 }, { name: 'GIT ', level: 90 }, { name: 'IntelliJ ', level: 95 },
    { name: 'Visual Studio Code ', level: 95 }, { name: 'Restful Web services ', level: 80 },
    { name: 'Micro Services ', level: 70 }, { name: 'Jenkins', level: 60 },
    { name: 'Postman', level: 90 }, { name: 'Redux', level: 90 }, { name: 'Agile', level: 90 },
    { name: 'Docker', level: 40 }, {name: 'SonarQube', level: 70}
  ];
  @ViewChild('home') homeElement: ElementRef;
  @ViewChild('about') aboutElement: ElementRef;
  @ViewChild('skills') skillsElement: ElementRef;
  @ViewChild('workex') workexElement: ElementRef;
  @ViewChild('contact') contactElement: ElementRef;
  @ViewChild('nameText') nameTextElement: ElementRef;

  @ViewChild('drawer', {static: false}) drawer: MatSidenav;

  public currentActive = 1;
  public homeOffset: Number;
  public aboutOffset: Number;
  public skillsOffset: Number;
  public workekOffset: Number;
  public contactOffset: Number;

  progressbarValue = Array<number>();
  curSec = 0;
  public scroll = 0;
  public screenWidth = 0;
  public screenHeight = 0;
  public menuColor: string;
  public showName = true;
  private killTrigger: Subject<void> = new Subject();
  private refreshInterval$ = timer(0, 1500).pipe(
    takeUntil(this.killTrigger)
  ).subscribe((datas: any) => {
      const name = this.nameTextElement.nativeElement;
      if (name && name.innerText === 'Rishi Shrivastava') {
        name.innerHTML = `<span data-aos="fade-right" class="name-text" style="color: #FFDF6C">Download CV</span>`;
      } else {
        name.innerHTML = `<span data-aos="fade-right" class="name-text" style="color: #FFDF6C">Rishi Shrivastava</span>`;
      }
  });
  constructor(private renderer: Renderer2) {
    this.startTimer(10);
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
  }
  public startTimer(seconds: number): void {
    const time = seconds;
    const timer$ = interval(1000);

    const sub = timer$.subscribe((sec) => {
      for (let i = 0; i < this.sk.length; i++) {
        this.progressbarValue[i] = this.sk[i].level;
      }
      this.curSec = sec;

      if (this.curSec === seconds) {
        sub.unsubscribe();
      }
    });
  }

  public toggleMenu(event: any): void {

  }
  ngOnInit(): void { const statustext$ = this.refreshInterval$; }

  ngOnDestroy(): void {
    this.killTrigger.next();
  }

  public close(): void {
    this.drawer.close();
  }

  @HostListener('window:scroll', ['$event'])
  public checkOffsetTop(): void {
    const pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    const max = document.documentElement.scrollHeight;
    if (window.pageYOffset >= this.homeOffset && window.pageYOffset < this.aboutOffset) {
      this.currentActive = 1;
      this.menuColor = '';
    } else if (window.pageYOffset >= this.aboutOffset && window.pageYOffset < this.skillsOffset) {
      this.currentActive = 2;
      this.menuColor = '';
    } else if (window.pageYOffset >= this.skillsOffset && window.pageYOffset < this.workekOffset) {
      this.currentActive = 3;
      this.menuColor = this.getMenuColor();
    } else if (window.pageYOffset >= this.workekOffset && window.pageYOffset < this.contactOffset) {
      this.currentActive = 4;
      this.menuColor = '';
    } else if (window.pageYOffset >= this.contactOffset) {
      this.currentActive = 5;
      this.menuColor = this.getMenuColor();
      return;
    }
    if (pos.toString().split('.')[0] === max.toString().split('.')[0] )   {
      this.currentActive = 5;
      this.menuColor = this.getMenuColor();
    }
  }

  ngAfterViewInit(): void {
    this.homeOffset = this.homeElement.nativeElement.offsetTop;
    this.aboutOffset = this.aboutElement.nativeElement.offsetTop;
    this.skillsOffset = this.skillsElement.nativeElement.offsetTop;
    this.workekOffset = this.workexElement.nativeElement.offsetTop;
    this.contactOffset = this.contactElement.nativeElement.offsetTop;
  }

  public scrollToView(el: HTMLElement): void {
    if (this.screenWidth <= 768) {
      this.close();
    }
    el.scrollIntoView({ behavior: 'smooth'});
  }

  public openDialler(): void {
    document.location.href = 'tel:+918962162496';
  }

  public composeEmail(): void {
    document.location.href = 'mailto:rishishri07@gmail.com? target="_top';
  }
  public doLogin() {

  }

  private getMenuColor(): string {
    return 'menu-color';
  }
}
