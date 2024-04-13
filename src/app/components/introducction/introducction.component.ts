import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-introducction',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './introducction.component.html',
  styleUrl: './introducction.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IntroducctionComponent { }
