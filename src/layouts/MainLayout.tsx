import { Component, JSX } from "solid-js";
import Header from "../components/Header";
import Footer from "../components/Footer";

interface MainLayoutProps {
  children: JSX.Element;
  class?: string;
}

const MainLayout: Component<MainLayoutProps> = (props) => {
  return (
    <div class="bg-gray-900">
      <div class={`min-h-screen flex flex-col  ${props.class}`}>
        <Header />

        <main class="flex-grow">{props.children}</main>

        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
