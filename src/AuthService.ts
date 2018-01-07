import { AuthClient } from "./WebApi";

export enum AuthState {
  Success,
  Fail,
  None,
}

const utcNow = () => {
  let now = new Date();
  return new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds());
}

const authCookieExpiresInKey = 'AuthSybonExpires';
const authCookieApiKey = 'AuthSybonApiKey';

const getFromCookies = (paramName: string) =>
  (document.cookie
    .split(';')
    .map(str => str.trimLeft())
    .find(value => value.startsWith(paramName)) || "")
    .substring(1 + paramName.length);

const ticksToDate = ticks => new Date((ticks - 621355968000000000) / 10000); //Слава C#

export default class AuthService {
  static Auth(login: string, password: string): Promise<AuthState> {
    return AuthClient.Auth(login, password)
      .then(authData => {
        AuthClient.SetApiKey(authData.key);
        document.cookie = authCookieExpiresInKey + '=' + authData.expiresIn;
        document.cookie = authCookieApiKey + '=' + authData.key;
        return AuthState.Success;
      })
      .catch(() => Promise.resolve(AuthState.Fail));
  }

  static CheckAuth(): AuthState {
    const expiresIn = getFromCookies(authCookieExpiresInKey);

    if (expiresIn && utcNow() < ticksToDate(expiresIn)) {
      const api_key = getFromCookies(authCookieApiKey);
      AuthClient.SetApiKey(api_key);
      return AuthState.Success;
    }

    return AuthState.None;
  }
}
