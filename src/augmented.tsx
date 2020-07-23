import styled, { ThemeProps } from "styled-components";

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
      return augs.join(" ").trim();
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

const getAugOrigins = (props: ThemeProps<AugmentedProps>): (string | null)[] => {
  return ["origin-x", "origin-y"].map((prop) => {
    const origins = { ...props.theme["aug-" + prop], ...props["aug-" + prop] };

    return (
      origins &&
      Object.keys(origins).map((edge: string) => {
        return `--aug-${edge}-${prop}: ${
          props["aug-" + prop][edge]
        }; `;
      })
    ).join(" ");
  });
};

const getAugOffset = (props: ThemeProps<AugmentedProps>): (string | null)[] => {
  const offsets = { ...props.theme["aug-offset"], ...props["aug-offset"] };

  return (
    offsets &&
    Object.keys(offsets).map((edge: string) => {
      return `--aug-${edge}-offset: ${props["aug-offset"][edge]}; `;
    })
  );
};

const getThemeProp = (
  aug: string,
  props: ThemeProps<AugmentedProps>
): string => {
  return props[aug] ? props[aug] : props.theme[aug];
};

export const Augmented = styled.div
  .withConfig({
    shouldForwardProp: (prop, defaultValidatorFn) =>
      ["augmented-ui"].includes(prop) || defaultValidatorFn(prop),
  })
  .attrs((props: AugmentedAttrProps) => ({
    "augmented-ui": `${getAugAttrs(props).join(" ").trim()} exe`
  }))<AugmentedProps>`
  --aug-border: ${(props) => getThemeProp("aug-border", props)};
  --aug-border-bg: ${(props) => getThemeProp("aug-border-bg", props)};
  --aug-border-fallback-color: ${(props) =>
    getThemeProp("aug-border-fallback-color", props)};
  --aug-border-opacity: ${(props) => getThemeProp("aug-border-opacity", props)};
  --aug-inset: ${(props) => getThemeProp("aug-inset", props)};
  --aug-inset-bg: ${(props) => getThemeProp("aug-inset-bg", props)};
  --aug-inset-bg-opacity: ${(props) =>
    getThemeProp("aug-inset-bg-opacity", props)};
  ${getAugSize}
  ${getAugWidthHeight}
  ${getAugOrigins}
  ${getAugOffset}
`;
