# ON-PAGE VISUAL STRUCTURAL ALIGNMENT TEMPLATE CHECKLIST
This checklist outlines how to maintain absolute visual and semantic alignment between your on-page elements and your search engine metadata. Google's site-name algorithm actively checks whether the visible text on your homepage matches your metadata declarations (`WebSite` schema, `og:site_name`, and `<title>`).

## 1. Header Navigation & Brand Logo Layout
- [ ] **Visible Brand Text**: Ensure the main header logo display contains the primary text **MENN** or **MENN Maestro**. 
  - *Example CSS / JSX*:
    ```tsx
    <div className="font-serif text-xl font-medium tracking-tight">
      MENN <span className="italic opacity-50">Maestro</span>
    </div>
    ```
- [ ] **Alt Attribute Alignment**: If using an image for your logo, the `alt` tag must explicitly state your official brand name.
  - *Example image tag*:
    ```html
    <img src="/apple-touch-icon.png" alt="MENN Maestro Logo" className="h-8 w-8" />
    ```

## 2. Heading 1 (H1) Verification
- [ ] **Single Authoritative H1**: There should be exactly one main `<h1>` element on your landing page. This H1 must prominently feature your primary brand keyword.
  - *Example Hero H1*:
    ```tsx
    <h1 className="font-serif text-[12vw] leading-[0.8] tracking-tighter">
      MENN<br />
      <span className="italic opacity-20">Maestro</span>
    </h1>
    ```

## 3. Footer Copyright & Legal Alignment
- [ ] **Matching Footer Branding**: The copyright text must align perfectly with the author, creator, and publisher defined in your `WebSite` and `Person` schemas.
  - *Example copyright*:
    ```tsx
    <footer>
      <span>© 2024 MENN Maestro. All rights reserved.</span>
    </footer>
    ```

## 4. Self-Referential Links & Anchors
- [ ] **Consistent Canonical Links**: Any absolute links back to the home page inside your navigation or footers should point exactly to `https://mennhq.vercel.app/` (with a trailing slash) rather than just `/` to reinforce absolute routing domain authority.
- [ ] **Social Profiles matching JSON-LD**: Ensure links to Instagram, X (Twitter), GitHub, LinkedIn, etc., on your page are identical to the URLs declared in the `sameAs` array of your JSON-LD block. 

## 5. Webmanifest & Meta Viewport Sync
- [ ] **Theme Color Sync**: The `theme-color` meta tag in your HTML head must match the `theme_color` parameter inside your `/site.webmanifest` exactly.
  - In `index.html` / `layout.tsx`: `<meta name="theme-color" content="#000000" />`
  - In `site.webmanifest`: `"theme_color": "#000000"`
