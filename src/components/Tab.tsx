import { Component, createSignal, For, JSX } from 'solid-js';

interface Tab {
  id: string;
  label: string;
  content: JSX.Element | string;
}

interface SciFiTabProps {
  tabs: Tab[];
  defaultTab?: string;
}

const SciFiTab: Component<SciFiTabProps> = (props) => {
  const [activeTab, setActiveTab] = createSignal(props.defaultTab || props.tabs[0].id);

  return (
    <div class="relative bg-gray-900 p-6 rounded-lg border border-cyan-500/30 shadow-lg animate-glow">
      <div class="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-lg blur-xl" />
      
      {/* Tab Headers */}
      <div class="relative flex gap-4 mb-6 border-b border-cyan-500/30">
        <For each={props.tabs}>
          {(tab) => (
            <button
              onClick={() => setActiveTab(tab.id)}
              class={`
                px-4 py-2 text-sm uppercase tracking-wider transition-all duration-300
                ${activeTab() === tab.id ? 
                  'text-cyan-400 border-b-2 border-cyan-400 translate-y-[1px]' : 
                  'text-gray-400 hover:text-cyan-300'}
              `}
            >
              <span class="relative z-10">{tab.label}</span>
              {activeTab() === tab.id && (
                <div class="absolute inset-0 bg-cyan-400/10 blur-sm" />
              )}
            </button>
          )}
        </For>
      </div>

      {/* Tab Content */}
      <div class="relative min-h-[200px]">
        <div class="animate-slide-in">
          {props.tabs.find(tab => tab.id === activeTab())?.content}
        </div>
      </div>
    </div>
  );
};

export default SciFiTab; 