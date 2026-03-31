import styles from './App.module.css';
import { Router, Route } from '@solidjs/router';
import { Show } from 'solid-js';
import CommandCenter from './pages/CommandCenter';
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
          <Route path="/" component={CommandCenter} />
          <Route path="/dashboard" component={Dashboard} />
        </Router>
      </Show>
    </div>
  );
}

export default App;
