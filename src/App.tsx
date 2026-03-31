import styles from './App.module.css';
import { Router, Route } from '@solidjs/router';
import { Show } from 'solid-js';
import Home from './pages/Home';
import Experience from './pages/Experience';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboard';
import SystemBootLoader from './components/SystemBootLoader';
import { commandState } from './store/commandStore';

function App() {
  return (
    <div class={styles.App}>
      {/* Boot loader renders on top — unmounts completely once bootPhase is 'complete' */}
      <Show when={commandState.bootPhase !== 'complete'}>
        <SystemBootLoader />
      </Show>

      {/* Main app — mounts only after boot, preventing wasted renders */}
      <Show when={commandState.bootPhase === 'complete'}>
        <Router>
          <Route path="/" component={Home} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/experience" component={Experience} />
          <Route path="/projects" component={Projects} />
          <Route path="/contact" component={Contact} />
        </Router>
      </Show>
    </div>
  );
}

export default App;
