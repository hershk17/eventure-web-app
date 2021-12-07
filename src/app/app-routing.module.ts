import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
// import { RouteGuardService } from './services/route-guard.service';

import {
  AngularFireAuthGuard,
  redirectLoggedInTo,
  emailVerified,
  AuthPipeGenerator,
  loggedIn,
} from '@angular/fire/compat/auth-guard';
import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';

const redirectAuthorizedTo = (redirect: any[]) =>
  pipe(
    emailVerified,
    // eslint-disable-next-line @typescript-eslint/no-shadow
    map((emailVerified) => (loggedIn && emailVerified) || redirect)
  );
const redirectUnauthorizedToLogin = () => redirectAuthorizedTo(['login']);

const redirectVerifiedTo = (redirect: any[]) =>
  pipe(
    emailVerified,
    // eslint-disable-next-line @typescript-eslint/no-shadow
    map((emailVerified) => !emailVerified || redirect)
  );
const redirectVerifiedToTabs = () => redirectVerifiedTo(['tabs']);

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'tabs',
    loadChildren: () =>
      import('./pages/tabs/tabs.module').then((m) => m.TabsPageModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginPageModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectVerifiedToTabs },
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./pages/register/register.module').then(
        (m) => m.RegisterPageModule
      ),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectVerifiedToTabs },
  },
  {
    path: 'landing',
    loadChildren: () =>
      import('./pages/landing/landing.module').then((m) => m.LandingPageModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectVerifiedToTabs },
  },
  {
    path: 'verify-email',
    loadChildren: () =>
      import('./pages/verify-email/verify-email.module').then(
        (m) => m.VerifyEmailPageModule
      ),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectVerifiedToTabs },
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
