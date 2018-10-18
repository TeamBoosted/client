import auth0 from 'auth0-js'
import EventEmitter from 'EventEmitter';
const redirectUri = process.env.REDIRECT_URI || 'http://localhost:8080/';

export default class AuthService {

  authenticated = this.isAuthenticated();
  authNotifier = new EventEmitter();

  constructor() {
    this.login = this.login.bind(this);
    this.setSession = this.setSession.bind(this);
    this.logout = this.logout.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
  }

  auth0 = new auth0.WebAuth({
    domain: 'boostedsearch.auth0.com',
    clientID: 'Q7hNTc_gnIGYk3cVe8ewkTnUvd_5PEYA',
    redirectUri: redirectUri,
    responseType: 'token id_token',
    scope: 'openid'
  });

  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult)
      } else if (err) {
        console.log(err);
      }
    })
  }

  login() {
    // console.log('Login from class being fired');
    this.auth0.authorize()
  }

  logout() {
    // Clear Access Token and ID Token from local storage
    localStorage.removeItem('access_token')
    localStorage.removeItem('expires_at')
    this.userProfile = null
    this.authNotifier.emit('authChange', false)
    // navigate to the home route
  }
  setSession(authResult) {
    // Set the time that the Access Token will expire at
    let expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    )
    localStorage.setItem('access_token', authResult.accessToken)
    localStorage.setItem('expires_at', expiresAt)
    if (!localStorage.id_token) {
      localStorage.setItem('id_token', authResult.idToken)
    }
    if (!localStorage.moviesSaved) {
      localStorage.setItem('moviesSaved', 0)
    }
    this.authNotifier.emit('authChange', { authenticated: true })
  }
  isAuthenticated() {
    // Check whether the current time is past the
    // Access Token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'))
    return new Date().getTime() < expiresAt
  }
}


