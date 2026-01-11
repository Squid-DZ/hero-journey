import { Component, DestroyRef, inject, signal } from '@angular/core';
import { HeroService, Hero } from '../hero.service';
import { FormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-Heroes.component',
  imports: [FormsModule, RouterModule],
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.scss',
})
export class HeroesComponent {
  private readonly HeroService = inject(HeroService);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly heroes = signal<Hero[]>([]);
  protected readonly selectedHero = signal<Hero | null>(null);
  protected readonly heroesLoading = signal(true);
  protected readonly heroesError = signal<string | null>(null);

  constructor() {
    // 从 Observable 取得数据
    this.HeroService.getAll$()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (list) => {
          this.heroes.set(list);
          this.heroesLoading.set(false);
        },
        error: (err) => {
          this.heroesError.set(String(err ?? 'Unknown error'));
          this.heroesLoading.set(false);
        },
      });
  }

  onSelect(hero: Hero) {
    const selectedHero = this.selectedHero();
    this.selectedHero.set(selectedHero === hero ? null : hero);
  }

  updateName(name: string) {
    const selected = this.selectedHero();
    if (!selected) {
      return;
    }

    const updated = this.HeroService.updateName(selected.id, name);
    if (!updated) {
      return;
    }

    this.heroes.update((list) =>
      list.map((hero) => (hero.id === selected.id ? { ...hero, name: updated.name } : hero))
    );
    this.selectedHero.set({ ...selected, name: updated.name });
  }
}
