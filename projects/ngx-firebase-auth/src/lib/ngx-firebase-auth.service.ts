import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { AuthContext } from './models/authContext';

@Injectable({
  providedIn: 'root',
})
export class NgxFirebaseAuthService {

  /**
   * Get the current User Observable from AngularFireAuth
   * @return Observable<FirebaseUser> if the user is authenticated.
   */
  public get currentUser$(): Observable<firebase.User> {
    return this.afAuth.authState.pipe(shareReplay());
  }

  /**
   * Gets the current user.
   * @return The user or null if the user is not authenticated.
   */
  public get currentUser(): firebase.User {
    return this.authState;
  }

  /**
   * Gets the current user id.
   * @return The user id or null if the user is not authenticated.
   */
  public get currentUserId(): string {
    return this.currentUser ? this.currentUser.uid : '';
  }

  /**
   * Checks is the user is authenticated.
   * @return True if the user is authenticated.
   */
  public get authenticated(): boolean {
    return this.authState != null;
  }

  /**
   * Checks if the user email is verified.
   * @return True if the user is authorized.
   */
  public get isVerified(): boolean {
    return this.currentUser && this.currentUser.emailVerified;
  }

  private authState: firebase.User;


  constructor(private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe((authState: firebase.User) => {
      this.authState = authState;
    });
  }

  /**
   * Register the user.
   * @param context The register parameters.
   * @return The user credentials.
   */
  public register(context: AuthContext): Promise<firebase.auth.UserCredential> {
    return this.afAuth.createUserWithEmailAndPassword(context.email, context.password);
  }

  /**
   * Login the user.
   * @param context The login parameters.
   * @return The user credentials.
   */
  public login(context: AuthContext): Promise<firebase.auth.UserCredential> {
    return this.afAuth.signInWithEmailAndPassword(context.email, context.password);
  }

  /**
   * Logs out the user and clear credentials.
   * @return void
   */
  public logout(): Promise<void> {
    // Customize credentials invalidation here
    return this.afAuth.signOut();
  }

  /**
   * Sends Email Verification e.g. after registration.
   * @return void
   */
  public sendEmailVerification(): Promise<void> {
    return firebase.auth().currentUser.sendEmailVerification();
  }

  /**
   * Sends reset password mail
   * @return void
   */
  public sendPasswordResetEmail(email: string): Promise<void> {
    return this.afAuth.sendPasswordResetEmail(email);
  }

  /**
   * Reauthenticate an user, e.g. when updating user email
   * @return return new firebase user
   */
  public reauthenticateUser(password: string): Promise<firebase.User> {
    const firebaseUser: firebase.User = this.currentUser;
    const credentials = firebase.auth.EmailAuthProvider.credential(firebaseUser.email, password);
    return new Promise((resolve, reject) => {
      firebaseUser.reauthenticateWithCredential(credentials).then(() => {
        resolve(firebaseUser);
      }).catch((err) => {
        console.log(err);
        reject('Verification failed');
      });
    });
  }
}
