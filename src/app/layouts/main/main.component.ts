import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';


@Component({
  selector: 'main',
  standalone: true,
  imports: [
    RouterModule,
    RouterOutlet,
    CommonModule,
    SidebarComponent
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent { }
