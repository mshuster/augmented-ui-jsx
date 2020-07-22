import styled, { ThemeProps } from "styled-components";
import classnames from "classnames";
export interface AugmentedProps extends AugmentedAttrProps {
  "aug-border"?: string;
  "aug-border-bg"?: string;
  "aug-border-fallback-color"?: string;
  "aug-border-opacity"?: number;
  "aug-inset"?: string;
  "aug-inset-bg"?: string;
  "aug-inset-bg-opacity"?: number;
  "aug-width"?: AugmentedEdge & AugmentedCorner;
  "aug-height"?: AugmentedEdge & AugmentedCorner;
  "aug-origin-x"?: { t?: string; b?: string };
  "aug-origin-y"?: { l?: string; r?: string };
  "aug-offset"?: AugmentedEdge;
  "aug-size"?: AugmentedEdge & AugmentedCorner;
}

export interface AugmentedAttrProps {
  "aug-clip"?: AugmentedAttrEdge & AugmentedAttrCorner;
  "aug-clip-x"?: AugmentedAttrEdge & AugmentedAttrCorner;
  "aug-clip-y"?: AugmentedAttrEdge & AugmentedAttrCorner;
  "aug-round"?: AugmentedAttrCorner;
  "aug-rect"?: AugmentedAttrEdge & AugmentedAttrCorner;
}

export interface AugmentedAttrEdge {
  t?: boolean;
  r?: boolean;
  b?: boolean;
  l?: boolean;
}

export interface AugmentedAttrCorner {
  tl?: boolean;
  tr?: boolean;
  br?: boolean;
  bl?: boolean;
}

export interface AugmentedEdge {
  t?: string;
  r?: string;
  b?: string;
  l?: string;
}

export interface AugmentedCorner {
  tl?: string;
  tr?: string;
  br?: string;
  bl?: string;
}

const getAugAttrs = (props: AugmentedAttrProps): (string | null)[] => {
  return Object.keys(props).map((aug) => {
    const augAttr = aug.split("aug-")[1];
    if (["clip", "clip-x", "clip-y", "round", "rect"].includes(augAttr)) {
      let augs: string[] = [];
      Object.keys(props[aug]).forEach((edgeOrCorner) => {
        props[aug] && augs.push(edgeOrCorner + "-" + augAttr);
      });
      return classnames(augs);
    }
    return null;
  });
};

const getAugSize = (props: ThemeProps<AugmentedProps>): (string | null)[] => {
  const sizes = { ...props.theme["aug-size"], ...props["aug-size"] };

  return (
    sizes &&
    Object.keys(sizes).map((edgeOrCorner: string) => {
      return `--aug-${edgeOrCorner}: ${props["aug-size"][edgeOrCorner]}; `;
    })
  );
};

const getAugWidthHeight = (
  props: ThemeProps<AugmentedProps>
): (string | null)[] => {
  return ["width", "height"].map((prop) => {
    const sizes = { ...props.theme["aug-" + prop], ...props["aug-" + prop] };
    console.log(sizes);

    return (
      sizes &&
      Object.keys(sizes).map((edgeOrCorner: string) => {
        return `--aug-${edgeOrCorner}-${prop}: ${
          props["aug-" + prop][edgeOrCorner]
        }; `;
      })
    ).join(" ");
  });
};
export const Augmented = styled.div
  .withConfig({
    shouldForwardProp: (prop, defaultValidatorFn) =>
      ["augmented-ui"].includes(prop) || defaultValidatorFn(prop),
  })
  .attrs((props: AugmentedAttrProps) => ({
    "augmented-ui": classnames(getAugAttrs(props), "exe"),
  }))<AugmentedProps>`
  --aug-border: ${(props) =>
    props["aug-border"] ? props["aug-border"] : props.theme["aug-border"]};
  --aug-border-bg: ${(props) =>
    props["aug-border-bg"]
      ? props["aug-border-bg"]
      : props.theme["aug-border-bg"]};
  --aug-border-fallback-color: ${(props) => props["aug-border-fallback-color"]};
  --aug-border-opacity: ${(props) => props["aug-border-opacity"]};
  --aug-inset: ${(props) => props["aug-inset"]};
  --aug-inset-bg: ${(props) => props["aug-inset-bg"]};
  --aug-inset-bg-opacity: ${(props) => props["aug-inset-bg-opacity"]};
  ${getAugSize};
  ${getAugWidthHeight};
`;
