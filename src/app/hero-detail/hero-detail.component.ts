import { Component, DestroyRef, effect, inject, input, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterModule } from '@angular/router';
import { Hero, HeroService } from '@app/hero.service';

@Component({
  selector: 'app-hero-detail.component',
  imports: [RouterModule],
  templateUrl: './hero-detail.component.html',
  styleUrl: './hero-detail.component.scss',
})
export class HeroDetailComponent {
  readonly id = input.required<number>();

  private readonly heroService = inject(HeroService);
  private readonly destroyRef = inject(DestroyRef);

  readonly hero = signal<Hero | null>(null);
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);

  constructor() {
    // 类似vue的watchEffect
    effect(() => {
      const curId = Number(this.id());
      this.loading.set(true);
      this.error.set(null);

      // 以 Observable 取得
      const sub = this.heroService
        .getById$(curId)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: (h) => {
            console.log('hero', h);
            this.hero.set(h ?? null);
            this.loading.set(false);
          },
          error: (e) => {
            this.error.set(String(e ?? 'Unknown error'));
            this.loading.set(false);
          },
        });

      return () => sub.unsubscribe();
    });
  }
}
