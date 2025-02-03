import { render } from 'solid-js/web';
import { Route, Router } from '@solidjs/router';
import './styles/index.css';
import './styles/main.scss';
import App from './App';

// import './styles/main.scss';
import Home from './pages/Home';

render(
  () => (
    <Router root={App}>
      {/* <App /> */}
    </Router>
  ),
  document.getElementById('root')!
); 