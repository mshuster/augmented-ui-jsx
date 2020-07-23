# augmented-ui-jsx
Typed JSX implementation of the [augmented-ui](https://github.com/propjockey/augmented-ui) CSS API built with [styled-components](https://styled-components.com/)

### https://github.com/propjockey/augmented-ui

* Home: http://augmented-ui.com/
* Docs: http://augmented-ui.com/docs/

## Todo

- [ ] Write Visual test suite
- [ ] Write Unit test suite
- [ ] Add knobs for Storybook
- [ ] Publish Storybook
- [ ] Compose examples for interactives

## Examples
```
// Supports styled-components ThemeProvider
<ThemeProvider
  theme={{
    "aug-border": "3px",
    "aug-border-bg": "grey",
  }}
>
  <Augmented
    aug-clip-x={{ b: true, t: true }}
    aug-round={{ br: true }}
    aug-size={{ b: "10px",t:"20px" }}
    aug-width={{b: "33%", t:"50px"}}
    aug-height={{b: "10px", t: "5px"}}
  >
    <span>test</span>
  </Augmented>
</ThemeProvider>
```