# NgxFirebaseAuth
Open Source Library for Angular Web Apps to integrate a simple firebase authentication service.

## Install
`npm install ngx-firebase-auth`

## Peer dependencies
|Package| Version|      
|---|---| 
|` @angular/common` |`>=11.1.x <= 12.2.x` |
| `@angular/core` | `>=11.1.x <= 12.2.x` |
| `@angular/fire` | `6.1.5` |
| `firebase`| `8.1.1` |
| `rxjs`| `>= 6.6.x <= 7.3.x` |

## Features
|Feature| |      
|---|:---:| 
| createUserWithEmailAndPassword | :heavy_check_mark:|
| signInWithEmailAndPassword | :heavy_check_mark: |
| signOut| :heavy_check_mark: |
| sendEmailVerification| :heavy_check_mark: |
| reauthenticateWithCredential| :heavy_check_mark: |

## Usage
 To use the Service just inject it in the constructor like every other service
```
constructor(private authService: NgxFirebaseAuthService) {
    // some code
}
```

**To register**
```
/* 
    Assume that there are two inputs in HTML (email and password) and 
    we call the function on button press with the input values as parameters
*/

private register(emailInput: string, passwordInput: string): void {
    const context: AuthContext = {
      email: emailInput,
      password: passwordInput,
    };
    this.authService.register(context).then((user: UserCredential) => {
      console.log(user);
    }).catch((e) => {
      console.error(e);
    });
  }
```
**To log in**
```
/* 
    Assume that there are two inputs in HTML (email and password) and 
    we call the function on button press with the input values as parameters
*/

private (emailInput: string, passwordInput: string): void {
    const context: AuthContext = {
      email: emailInput,
      password: passwordInput,
    };
    this.authService.login(context).then((user: UserCredential) => {
      console.log(user);
    }).catch((e) => {
      console.error(e);
    });
  }
```

## Functions
**Note**:  
UserCredential = firebase.auth.UserCredential  
FirebaseUser = firebase.User
          
|Type | Name | Description | Return Value |      
|---|---|---|---|
| `getter` | `currentUser$` | Get the current User Observable from AngularFireAuth | `Observable<FirebaseUser>` |
| `getter` |`currentUser` |  Gets the current user if authenticated | `FirebaseUser` or `null` |
| `getter` |`currentUserId` |  Gets the current user id if authenticated | `string` or `null` |
| `getter` |`authenticated` |  Checks if user is authenticated | `boolean` |
| `getter` |`isVerified` |  Checks if user email is verified | `boolean` |
| `function`|`register(context: AuthContext)` |  Register the user | `Promise<UserCredential>` |
| `function`|`login(context: AuthContext)` |  Login the user | `Promise<UserCredential>` |
| `function`|`logout()` |  Logs out the user and clear credentials. | `Promise<void>` |
| `function`|`sendEmailVerification()` |  Sends Email Verification e.g. after registration. | `Promise<void>` |
| `function`|`sendPasswordResetEmail(email: string)` |  Sends reset password mail | `Promise<void>` |
| `function`|`reauthenticateUser(password: string)` |  Reauthenticate an user, e.g. when updating user email | `Promise<FirebaseUser> ` |

# Interfaces
```
interface AuthContext {
  email: string;
  password: string;
}
```


## Build by and for developers

Feel free to provide a PR | open an appropriate issue [here](https://github.com/TdoubleG/ngx-firebase-auth/issues)
If you like this project, support [ngx-firebase-auth](https://github.com/TdoubleG/ngx-firebase-auth) by starring :star: and sharing it :loudspeaker:
