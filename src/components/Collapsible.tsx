import { Component, Show, createSignal, createEffect } from "solid-js";
import { Motion } from "@motionone/solid";

interface CollapsibleProps {
  title: string;
  description?: string;
  children: any;
  isExpanded?: boolean;
  onToggle?: (isExpanded: boolean) => void;
  class?: string;
}

const Collapsible: Component<CollapsibleProps> = (props) => {
  const [isExpanded, setIsExpanded] = createSignal(props.isExpanded || false);
  const [contentHeight, setContentHeight] = createSignal("0px");
  let contentRef: HTMLDivElement | undefined;

  createEffect(() => {
    if (props.isExpanded !== undefined) {
      setIsExpanded(props.isExpanded);
    }
  });

  createEffect(() => {
    if (contentRef) {
      setContentHeight(isExpanded() ? `${contentRef.scrollHeight}px` : "0px");
    }
  });

  const toggleCollapse = () => {
    const newState = !isExpanded();
    setIsExpanded(newState);
    props.onToggle?.(newState);
  };

  return (
    <div class={`collapsible-container ${props.class || ""}`}>
      <button
        onClick={toggleCollapse}
        class="w-full p-4 flex items-center justify-between bg-black/30 backdrop-blur-sm border border-cyan-500/30 rounded-lg hover:bg-cyan-500/10 transition-all duration-300"
      >
        <div class="flex flex-col gap-2  text-left">
          <span class="text-cyan-400 font-semibold">{props.title}</span>
          {/* <span class=" p-3">{props.description}</span> */}
        </div>
        <div class="relative w-6 h-6">
          <Motion.div
            class="absolute inset-0 w-6 h-0.5 bg-cyan-400 rounded-full top-1/2 -translate-y-1/2"
            animate={{
              rotate: isExpanded() ? 180 : 0,
            }}
            transition={{ duration: 0.3 }}
          />
          <Motion.div
            class="absolute inset-0 w-6 h-0.5 bg-cyan-400 rounded-full top-1/2 -translate-y-1/2"
            animate={{
              rotate: isExpanded() ? 0 : 90,
            }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </button>

      <Motion.div
        class="overflow-hidden bg-black/20 rounded-b-lg"
        animate={{
          height: contentHeight(),
        }}
        transition={{
          duration: 0.3,
          easing: "ease-out",
        }}
      >
        <div
          ref={contentRef}
          class="p-4 border-x border-b border-cyan-500/30 rounded-b-lg"
        >
          {isExpanded() && props.children}
        </div>
      </Motion.div>

      <Show when={isExpanded()}>
        <div class="absolute -inset-[1px] bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg blur-lg -z-10" />
      </Show>
    </div>
  );
};

export default Collapsible;
