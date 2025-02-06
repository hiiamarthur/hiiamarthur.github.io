import logo from './logo.svg';
import styles from './App.module.css';
import { Router, Route } from '@solidjs/router';
import Home from './pages/Home';
import Experience from './pages/Experience';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <div class={styles.App}>
      <Router>
        <Route path="/" component={Home} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/experience" component={Experience} />
        <Route path="/projects" component={Projects} />
        <Route path="/contact" component={Contact} />
      </Router>
    </div>
  );
}

export default App;
