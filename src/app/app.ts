import { Component, DestroyRef, inject, signal } from '@angular/core';
import { HeroBadge } from './hero-badge/hero-badge';
import { FormsModule } from '@angular/forms';
import { HeroService } from './hero.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
type Hero = { id: number; name: string; rank?: string };

@Component({
  selector: 'app-root',
  imports: [HeroBadge, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('hero-journey');
}
