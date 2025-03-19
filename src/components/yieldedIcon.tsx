import { Component } from "solid-js";
import * as simpleIcons from "simple-icons";
import * as featherIcons from "feather-icons";
import { si1password as PW, SimpleIcon } from "simple-icons";
interface DynamicSimpleIconProps {
  keyword: string;
  size?: number;
  color?: string;
  children?: string;
}


const YieldedIcon: Component<DynamicSimpleIconProps> = (props) => {
  const convertSpecialChars = (str: string): string => {
    return str
      .replace(/\./g, "dot")
      .replace(/#/g, "sharp")
      .replace(/\+\+/g, "plusplus")
      .replace(/\+/g, "plus")
      .replace(/@/g, "at")
      .replace(/&/g, "and")
      .replace(/\$/g, "dollar")
      .replace(/!/g, "bang")
      .replace(/\*/g, "star")
      .replace(/\?/g, "query")
      .replace(/=/g, "equals")
      .replace(/~/g, "tilde")
      .replace(/</g, "less")
      .replace(/>/g, "greater")
      .replace(/\^/g, "caret")
      .replace(/\|/g, "pipe")
      .replace(/\\/g, "backslash")
      .replace(/\//g, "slash")
      .replace(/-/g, "dash")
      .replace("native", "");
  };

  // Calculate the contrasting color (black or white) based on background color
  const getContrastColor = (hexcolor: string) => {
    // Convert hex to RGB
    const r = parseInt(hexcolor.slice(0, 2), 16);
    const g = parseInt(hexcolor.slice(2, 4), 16);
    const b = parseInt(hexcolor.slice(4, 6), 16);

    // Calculate relative luminance
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    // Return black for light colors, white for dark colors
    return luminance > 0.5 ? "#000000" : "#ffffff";
  };

  // Calculate similarity between two strings
  const calculateSimilarity = (str1: string, str2: string): number => {
    str1 = str1.toLowerCase();
    str2 = str2.toLowerCase();

    if (str1 === str2) return 1;
    if (str1.includes(str2) || str2.includes(str1)) return 0.8;

    const set1 = new Set(str1);
    const set2 = new Set(str2);
    const intersection = new Set([...set1].filter((char) => set2.has(char)));
    return (2.0 * intersection.size) / (set1.size + set2.size);
  };

  // Find the best matching icon
  const findBestMatch = (
    keyword: string
  ): { key: string; similarity: number } => {
    let bestMatch = { key: "", similarity: 0 };

    Object.keys(simpleIcons).forEach((key) => {
      // Remove 'si' prefix for comparison
      const iconName = key.replace(/^si/, "").toLowerCase();
      const similarity = calculateSimilarity(keyword.toLowerCase(), iconName);

      if (similarity > bestMatch.similarity) {
        bestMatch = { key, similarity };
      }
    });

    return bestMatch;
  };

  // Try exact match first with converted keyword
  const convertedKeyword = convertSpecialChars(props.keyword);
  let iconKey = `si${
    convertedKeyword.charAt(0).toUpperCase() + convertedKeyword.slice(1)
  }` as keyof typeof simpleIcons;
  let icon = simpleIcons[iconKey];

  // If no exact match, try database default case
  if (
    !icon &&
    (props.keyword.toLowerCase().includes("db") ||
      props.keyword.toLowerCase().includes("database")
    || props.keyword.toLowerCase()== "mssql"
    )
  ) {
    iconKey = "siDatabase" as keyof typeof simpleIcons;
    icon = simpleIcons[iconKey];
  }

  if(!icon && props.keyword.toLowerCase().includes("java")){
    
    icon = simpleIcons[iconKey];
  }

  // If still no match, find the closest match
  if (!icon) {
    const bestMatch = findBestMatch(convertedKeyword);
    if (bestMatch.similarity > 0.3) {
      iconKey = bestMatch.key as keyof typeof simpleIcons;
      icon = simpleIcons[iconKey];
    }
    console.log("icon", bestMatch.key);
  }

  if (!icon) {
    return <p>No icon found for "{props.keyword}"</p>;
  }

  icon = icon as SimpleIcon;
  const backgroundColor = `#${props.color || icon.hex}`;
  const textColor = getContrastColor(props.color || icon.hex);

  // Create a new DOMParser to parse the SVG string
  const parser = new DOMParser();
  const svgDoc = parser.parseFromString(icon.svg, "image/svg+xml");
  const svgElement = svgDoc.querySelector("svg");

  // Set the fill color for the SVG and all its children
  if (svgElement) {
    svgElement.setAttribute("fill", textColor);
    const paths = svgElement.querySelectorAll("path");
    paths.forEach((path) => {
      path.setAttribute("fill", textColor);
    });
  }

  return (
    <span
      class="tech-tag animate-fade-in-up "
      style={{
        "background-color": backgroundColor,
      }}
    >
      <div
        class={`flex flex-row bg-[${backgroundColor}] items-center justify-center rounded-full`}
      >
        <div innerHTML={svgElement?.outerHTML} class="w-7 h-7 my-1 mr-1" />
        <div class="my-1 text-xl" style={{ color: textColor }}>
          {props.children}
        </div>
      </div>
    </span>
  );
};

export default YieldedIcon;
