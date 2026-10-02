# Design System — Color Tokens

Color tokens are organized in three layers. Each layer references only the layer before it:

```
Primitive  →  Semantic  →  Component
(value)       (intent)     (component-specific decision)
```

- **Primitive**: raw visual values. No intent.
- **Semantic**: reusable decisions with a clear purpose. They reference primitives or other semantic tokens.
- **Component**: decisions specific to one component or group of components. They reference semantic tokens.

UI code consumes semantic or component tokens. It never uses a primitive when an equivalent semantic token exists.

---

## General naming rules

- Every token starts with `color-` and is written in lowercase. As a CSS variable, it is `--color-...`.
- Segments are separated by `-`. **Each segment is a single word**: multi-word names are joined (`BadgeStatus` → `badgestatus`, "config button" → `configbutton`).
- **The segment order is fixed.** Never reorder segments to fit a specific combination.
- **Segments are optional.** Use only the ones the token needs. Omit the others; never fill them with placeholders like `default`, `base` or `root`.
- A token with a **state** repeats its base token exactly and appends the state:
  `color-modal-text-secondary` → `color-modal-text-secondary-hover`, not `color-modal-text-hover`.

---

## Primitive tokens

**Convention:** `color-primitive-[family]-[theme]-[step]`

| Segment  | Meaning                                                                                                   | Examples                                                |
| -------- | --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| `family` | A hue, or a neutral family named by its tone                                                              | `orange`, `purple`, `green`, `neutral`, `light`, `dark` |
| `theme`  | The theme the scale was tuned for. Omitted when the family serves both themes or belongs to one by nature | `light`, `dark`                                         |
| `step`   | Position in the family's scale                                                                            | `50` … `950`                                            |

```css
--color-primitive-orange-light-400: oklch(0.696 0.197 44);
--color-primitive-orange-dark-400: oklch(0.812 0.164 78.92);
--color-primitive-neutral-450: oklch(0.6167 0 0);
--color-primitive-light-300: oklch(0.9818 0.0013 106.4);
```

- The `primitive` segment marks the layer. Semantic and component tokens have no layer marker.
- The step scale does not need to be the same for every family. It only has to progress consistently within its family (for example, `neutral` uses steps of 50: `50, 100, 150 … 950`).
- Values without a hue or scale use a simplified name: `color-primitive-black`, `color-primitive-white`, `color-primitive-transparent`.
- Names describe the visual value, never its use (`orange-light-400`, not `orange-button`).

---

## Semantic tokens

**Convention:** `color-[concept]-[property]-[variant]-[intensity]-[state]-[context]`

Each segment answers one question:

| Segment     | Question                                     |
| ----------- | -------------------------------------------- |
| `concept`   | What is the purpose of the color?            |
| `property`  | Where is it applied?                         |
| `variant`   | Which semantic variation within the concept? |
| `intensity` | How strong is it within that variation?      |
| `state`     | What state is the element in?                |
| `context`   | In which visual context does it appear?      |

### Concept

The main grouping. It represents an intent, not a visual characteristic. It should be broad enough to group tokens that share an intent, but not so specific that every use case becomes a new concept.

| Concept         | Purpose                                                          |
| --------------- | ---------------------------------------------------------------- |
| `brand`         | Visual identity and brand-owned elements                         |
| `content`       | Content and structure, and their levels of emphasis or hierarchy |
| `neutral`       | Content and structure with no additional semantic intent         |
| `action`        | Actions, interactive elements and selections                     |
| `feedback`      | States, messages and results communicated to the user            |
| `accent`        | Visual emphasis that doesn't represent a state or result         |
| `visualization` | Data, categories and visual information (charts, legends)        |
| `focus`         | Focus indicators for keyboard and assistive navigation           |

### Property

Where or how the color is applied. **Optional** in semantic tokens: use it only when the concept needs to distinguish between applications (for example, `brand` has none: `color-brand-primary`).

Property is a **closed vocabulary**, shared by the semantic and component layers:

`text` · `icon` · `background` · `border` · `outline` · `fill` · `overlay`

- `text` is the foreground color of any text, including titles. It does not mean "body text".
- Each concept exposes only the properties that make sense for it: `feedback` uses `text`, `icon`, `background` and `border`, while `visualization` mostly uses `fill` and `text`.

### Variant

A variation within the concept. **Variants belong to their concept's vocabulary.** There is no global list, and the same word can mean different things in different concepts.

| Concept         | Variants                                                                |
| --------------- | ----------------------------------------------------------------------- |
| `brand`         | `primary`, `secondary`                                                  |
| `content`       | `primary`, `secondary`, `tertiary`, `quaternary`, `quinary`, `featured` |
| `action`        | `primary`, `secondary`, `tertiary`                                      |
| `feedback`      | `success`, `warning`, `error`, `information`, `new`, `neutral`          |
| `visualization` | `positive`, `negative`, `neutral`, `comparison`                         |

Ask "which variation matters inside this concept?", not "which generic variant can I reuse?".

### Intensity

The degree of a variant: `weakest` · `weaker` · `weak` · _(base)_ · `strong` · `stronger` · `strongest`

- The base token has no intensity segment.
- Optional, and not a mandatory scale: a concept uses only the levels it needs.
- Add it only when there is a real semantic need for different degrees. A difference that is only visual belongs in the primitive layer.

```
color-brand-primary-weakest
color-brand-primary
color-brand-primary-strong
```

### State

Changes caused by interaction or condition: `hover` · `active` · `focus` · `disabled` · `selected` · `visited`

Add it only when the color actually changes in that state.

```
color-action-background-primary
color-action-background-primary-hover
color-action-background-primary-disabled
```

### Context

The visual context the color appears in: `inverse`

Use it when the same intent needs a different value depending on the surrounding context. It is always the last segment.

```
color-action-text-primary-inverse
color-action-background-secondary-hover-inverse
```

### Semantic referencing semantic

A semantic token may reference another semantic token when its intent is literally "the same as that other role". Both then follow any future change together.

```css
--color-feedback-background-neutral: var(--color-content-background-quaternary);
```

---

## Component tokens

**Convention:** `color-[component]-[element]-[property]-[variant]-[state]-[context]`

| Segment     | Question                                                        | Required |
| ----------- | --------------------------------------------------------------- | -------- |
| `component` | Which component or component group does the decision belong to? | Yes      |
| `element`   | Which internal part of the component?                           | No       |
| `property`  | Where or how is the color applied?                              | **Yes**  |
| `variant`   | Which semantic variation of that part?                          | No       |
| `state`     | What state is the element in?                                   | No       |
| `context`   | In which visual context does it appear?                         | No       |

Property, variant, state and context follow the semantic definitions above.

### Component

The component's name in lowercase, with its words joined: `badgestatus`, `menumain`, `technologiesgrid`.

**A token is named after the component that consumes it.**

- Used by one component → that component's name.
- Used only by a subcomponent that exists exclusively inside a parent → element of the parent (`MenuItem` inside `MenuMain` → `color-menumain-item-...`).
- Shared by several components → a [Component Group](#component-groups).

This way, the token name tells you what is affected when it changes.

### Element

An internal part of the component. **Optional: no element means the component as a whole** or its main element.

- Words are joined into a single segment: `configbutton`, `iconbox`, `closebutton`.
- **Property words are never used as elements.** `text`, `icon`, `background`, `border`… always mean a property. This is what keeps the token readable: whatever follows the component and isn't a property is the element.

```
color-technologiesgrid-background-selected           → the card itself
color-technologiesgrid-iconbox-background-selected   → the box around the icon
color-technologiesgrid-icon-selected                 → the icon (property: icon)
color-menumain-item-background-hover
```

**Icons:** `icon` is always a property. A container around an icon is an element (`iconbox`). When a component has several icons, the element states the position: `color-input-leading-icon`, `color-input-trailing-icon`.

### Element vs variant

- **Element**: _different parts_ that appear together in the component (a label and a title).
- **Variant**: _different versions of the same part_ (a badge that is `success` or `error`).

```
✗ color-section-text-primary      ✓ color-section-title-text
✗ color-section-text-secondary    ✓ color-section-label-text
```

### Relationship with semantic tokens

Component tokens reference semantic tokens, never primitives.

```css
--color-button-background-primary: var(--color-action-background-primary);
--color-button-text-primary: var(--color-action-text-primary);
```

**Component or semantic?** Ask: _"Does this decision describe an intent that can be reused regardless of the component?"_

- Yes → semantic token. `color-action-background-primary` serves Button, Link, Tab and Navigation.
- No, it depends on the component's structure, appearance or behavior → component token. `color-button-icon`.

A component token is not created just because a color is used inside a component. If the color represents a shared intent, use the semantic token directly.

### Component groups

A decision shared by several related components, but still specific to that group:

`forms` · `navigation` · `overlays` · `dropdown` · `datadisplay`

```
color-forms-border
color-dropdown-item-text-hover
```

Promote a decision to a group only when several components actually share it.

### Start local, then promote

```
color-input-border  →  color-forms-border  →  semantic token
(one component)        (a group)              (broad intent)
```

Start with the most local scope and promote a token only once its reuse is evident. Don't create global abstractions before they are needed.

---

## Themes (light / dark)

| Layer     | Behavior across themes                                                                           |
| --------- | ------------------------------------------------------------------------------------------------ |
| Primitive | Defines separate scales per theme (`orange-light-*`, `orange-dark-*`). Never redefined.          |
| Semantic  | **The only layer redefined per theme.** Each theme maps the same token to a different primitive. |
| Component | Defined once. It follows the theme through the semantic tokens it references.                    |

```css
:root {
  --color-brand-primary: var(--color-primitive-orange-light-400);
}
:root[data-theme='dark'] {
  --color-brand-primary: var(--color-primitive-orange-dark-400);
}
```

If a component needs a different value in a specific theme, express that through a semantic token instead of redefining the component token.

---

## Transparency

Derive translucent colors from an existing token with relative color syntax, instead of creating a new primitive:

```css
--color-modal-background-hover: oklch(
  from var(--color-brand-primary-weakest) l c h / 10%
);
```

The derived color keeps following the source token, including across themes.

---

## Usage with Tailwind

1. Declare the token in the tokens stylesheet (`tokens.css`).
2. Register it in the `@theme inline` block of the Tailwind entry stylesheet (`globals.css`) so a utility class is generated for it:
   ```css
   @theme inline {
     --color-content-text-primary: var(--color-content-text-primary);
   }
   ```
3. Use it with the utility that matches the token's property. The class is the utility prefix followed by the token name without `color-`:

| Token property | Utility    | Example                                                   |
| -------------- | ---------- | --------------------------------------------------------- |
| `background`   | `bg-`      | `bg-content-background-primary`                           |
| `text`, `icon` | `text-`    | `text-content-text-primary`, `text-technologiesgrid-icon` |
| `border`       | `border-`  | `border-feedback-border-error`                            |
| `outline`      | `outline-` | `outline-focus-outline`                                   |
| `fill`         | `fill-`    | `fill-visualization-fill-positive`                        |

The theme is switched with `data-theme="dark"` on the root element. The `dark:` variant is mapped to it with `@custom-variant dark (&:where([data-theme=dark], [data-theme=dark] *));`.

---

## Checklist for a new token

1. **Does an existing semantic token already express this intent?** Use it.
2. **Is it a reusable intent, regardless of the component?** Create a semantic token: pick the concept, then the property, variant and intensity/state/context it needs.
3. **Is it specific to a component?** Create a component token named after the consuming component, and reference a semantic token.
4. **Is it shared by several related components?** Promote it to a component group.
5. Check the name:
   - Segments are in the fixed order, and each segment is a single word.
   - A component token has a property.
   - No property word is used as an element.
   - Parts are elements; versions are variants.
   - State tokens repeat their base token.
6. Define semantic values for every theme.
7. Register the token in `@theme inline`.
