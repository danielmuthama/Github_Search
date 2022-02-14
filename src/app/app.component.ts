import { Component, HostBinding, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RepositoryProxy } from 'src/models/repository.proxy';
import { UserProxy } from 'src/models/user.proxy';
import { GithubSearchService } from 'src/services/github/github.service';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private readonly githubService: GithubSearchService,
    private readonly themeService: ThemeService,
    private readonly snackBar: MatSnackBar,
  ) { }

  @HostBinding('class') hostClass: string = 'theme-light';

  public nameToSearchFormControl: FormControl = new FormControl('', [Validators.required]);
  public darkModeToggleFormControl: FormControl = new FormControl(false);

  public showingProfile: UserProxy | null = null;
  public showingProfileRepositories: RepositoryProxy[] = [];

  public isLoadingProfile: boolean = false;

  public ngOnInit(): void {
    const alreadyIsDarkMode = this.themeService.isDarkMode();

    this.darkModeToggleFormControl.setValue(alreadyIsDarkMode);
    this.setHostTheme(alreadyIsDarkMode);

    this.darkModeToggleFormControl.valueChanges.subscribe(isDarkMode => {
      this.setHostTheme(isDarkMode);
      this.themeService.setTheme(isDarkMode);
    });
  }

  public async search(): Promise<void> {
    if (this.nameToSearchFormControl.invalid) {
      return;
    }

    try {
      this.isLoadingProfile = true;
      const showingProfile = await this.githubService.getUsers(this.nameToSearchFormControl.value);
      const showingProfileRepositories = await this.githubService.getRepos(this.nameToSearchFormControl.value);
    } catch (error: unknown) {
      this.snackBar.open('Ok');
    } finally {
      this.isLoadingProfile = false;
    }
  }

  public redirectToProfile(): void {
    window.open('https://www.github.com/' + this.showingProfile?.login, '_blank');
  }

  private setHostTheme(isDarkMode: boolean): void {
    this.hostClass = isDarkMode ? 'theme-dark' : 'theme-light';
  }
}
