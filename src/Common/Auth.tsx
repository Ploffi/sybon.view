import * as React from 'react';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import AuthService, { AuthState } from '../AuthService';
import { isNullOrUndefined } from 'util';

interface IAuthState {
  login: string;
  password: string;
  authState: AuthState;
}

export default class Auth extends React.Component<any, IAuthState> {
  constructor(props) {
    super(props);
    this.state = {
      login: '',
      password: '',
      authState: AuthService.CheckAuth(),
    };
  }

  tryAuthorize = () => {
    AuthService.Auth(this.state.login, this.state.password)
      .then(authState => this.setState({ authState }));
  }

  handleInputKeyPressed = (event) => {
    if (event.key === 13 || event.key === 'Enter') 
      this.tryAuthorize();
  }

  render() {
    if (this.state.authState === AuthState.Success)
      return this.props.children;
    const isFailed = this.state.authState === AuthState.Fail;
    return <Dialog
      className='AuthDialog'
      disableBackdropClick
      disableEscapeKeyDown
      open={true}
    >
      <DialogTitle>Вход</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          fullWidth
          placeholder='Логин'
          value={this.state.login}
          error={isFailed}
          onChange={event => this.setState({ login: event.target.value })}
          onKeyPress={this.handleInputKeyPressed}
          type='text'
        />
        <TextField
          fullWidth         
          placeholder='Пароль'
          value={this.state.password}
          error={isFailed}
          onChange={event => this.setState({ password: event.target.value })}
          onKeyPress={this.handleInputKeyPressed}
          type='password'
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={this.tryAuthorize} color="primary">
          Войти
        </Button>
      </DialogActions>
    </Dialog>
  }
}