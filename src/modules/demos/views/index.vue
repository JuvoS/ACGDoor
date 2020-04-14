<template>
  <div class="container-fluid">
    <div class="row flex-xl-nowrap">
      <div class="col-md-3 col-xl-2 bd-sidebar">
        <form role="search" class="bd-search d-flex align-items-center">
          <span
            class="algolia-autocomplete"
            style="position: relative; display: inline-block; direction: ltr;"
          >
            <input
              type="search"
              class="form-control ds-input"
              id="search-input"
              placeholder="Search..."
              aria-label="Search for..."
              autocomplete="off"
              data-docs-version="4.4"
              spellcheck="false"
              role="combobox"
              aria-autocomplete="list"
              aria-expanded="false"
              aria-owns="algolia-autocomplete-listbox-0"
              dir="auto"
              style="position: relative; vertical-align: top;"
            />
            <pre
              aria-hidden="true"
              style="position: absolute; visibility: hidden; white-space: pre; font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, Arial, &quot;Noto Sans&quot;, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;; font-size: 16px; font-style: normal; font-variant: normal; font-weight: 400; word-spacing: 0px; letter-spacing: normal; text-indent: 0px; text-rendering: auto; text-transform: none;"
            ></pre>
            <span
              class="ds-dropdown-menu"
              role="listbox"
              id="algolia-autocomplete-listbox-0"
              style="position: absolute; top: 100%; z-index: 100; display: none; left: 0px; right: auto;"
            >
              <div class="ds-dataset-1"></div>
            </span>
          </span>
          <button
            class="btn btn-link bd-search-docs-toggle d-md-none p-0 ml-3"
            type="button"
            data-toggle="collapse"
            data-target="#bd-docs-nav"
            aria-controls="bd-docs-nav"
            aria-expanded="false"
            aria-label="Toggle docs navigation"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 30 30"
              role="img"
              focusable="false"
            >
              <title>Menu</title>
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-miterlimit="10"
                stroke-width="2"
                d="M4 7h22M4 15h22M4 23h22"
              />
            </svg>
          </button>
        </form>

        <nav class="collapse bd-links" id="bd-docs-nav" aria-label="Main navigation">
          <div class="bd-toc-item">
            <a class="bd-toc-link" href="/docs/4.4/getting-started/introduction/">Getting started</a>

            <ul class="nav bd-sidenav">
              <li>
                <a href="/docs/4.4/getting-started/introduction/">Introduction</a>
              </li>
              <li>
                <a href="/docs/4.4/getting-started/download/">Download</a>
              </li>
              <li>
                <a href="/docs/4.4/getting-started/contents/">Contents</a>
              </li>
              <li>
                <a href="/docs/4.4/getting-started/browsers-devices/">Browsers &amp; devices</a>
              </li>
              <li>
                <a href="/docs/4.4/getting-started/javascript/">JavaScript</a>
              </li>
              <li>
                <a href="/docs/4.4/getting-started/theming/">Theming</a>
              </li>
              <li>
                <a href="/docs/4.4/getting-started/build-tools/">Build tools</a>
              </li>
              <li>
                <a href="/docs/4.4/getting-started/webpack/">Webpack</a>
              </li>
              <li>
                <a href="/docs/4.4/getting-started/accessibility/">Accessibility</a>
              </li>
            </ul>
          </div>
          <div class="bd-toc-item active">
            <a class="bd-toc-link" href="/docs/4.4/layout/overview/">Layout</a>

            <ul class="nav bd-sidenav">
              <li class="active bd-sidenav-active">
                <a href="/docs/4.4/layout/overview/">Overview</a>
              </li>
              <li>
                <a href="/docs/4.4/layout/grid/">Grid</a>
              </li>
              <li>
                <a href="/docs/4.4/layout/utilities-for-layout/">Utilities for layout</a>
              </li>
            </ul>
          </div>
          <div class="bd-toc-item">
            <a class="bd-toc-link" href="/docs/4.4/content/reboot/">Content</a>

            <ul class="nav bd-sidenav">
              <li>
                <a href="/docs/4.4/content/reboot/">Reboot</a>
              </li>
              <li>
                <a href="/docs/4.4/content/typography/">Typography</a>
              </li>
              <li>
                <a href="/docs/4.4/content/code/">Code</a>
              </li>
              <li>
                <a href="/docs/4.4/content/images/">Images</a>
              </li>
              <li>
                <a href="/docs/4.4/content/tables/">Tables</a>
              </li>
              <li>
                <a href="/docs/4.4/content/figures/">Figures</a>
              </li>
            </ul>
          </div>
          <div class="bd-toc-item">
            <a class="bd-toc-link" href="/docs/4.4/components/alerts/">Components</a>

            <ul class="nav bd-sidenav">
              <li>
                <a href="/docs/4.4/components/alerts/">Alerts</a>
              </li>
              <li>
                <a href="/docs/4.4/components/badge/">Badge</a>
              </li>
              <li>
                <a href="/docs/4.4/components/breadcrumb/">Breadcrumb</a>
              </li>
              <li>
                <a href="/docs/4.4/components/buttons/">Buttons</a>
              </li>
              <li>
                <a href="/docs/4.4/components/button-group/">Button group</a>
              </li>
              <li>
                <a href="/docs/4.4/components/card/">Card</a>
              </li>
              <li>
                <a href="/docs/4.4/components/carousel/">Carousel</a>
              </li>
              <li>
                <a href="/docs/4.4/components/collapse/">Collapse</a>
              </li>
              <li>
                <a href="/docs/4.4/components/dropdowns/">Dropdowns</a>
              </li>
              <li>
                <a href="/docs/4.4/components/forms/">Forms</a>
              </li>
              <li>
                <a href="/docs/4.4/components/input-group/">Input group</a>
              </li>
              <li>
                <a href="/docs/4.4/components/jumbotron/">Jumbotron</a>
              </li>
              <li>
                <a href="/docs/4.4/components/list-group/">List group</a>
              </li>
              <li>
                <a href="/docs/4.4/components/media-object/">Media object</a>
              </li>
              <li>
                <a href="/docs/4.4/components/modal/">Modal</a>
              </li>
              <li>
                <a href="/docs/4.4/components/navs/">Navs</a>
              </li>
              <li>
                <a href="/docs/4.4/components/navbar/">Navbar</a>
              </li>
              <li>
                <a href="/docs/4.4/components/pagination/">Pagination</a>
              </li>
              <li>
                <a href="/docs/4.4/components/popovers/">Popovers</a>
              </li>
              <li>
                <a href="/docs/4.4/components/progress/">Progress</a>
              </li>
              <li>
                <a href="/docs/4.4/components/scrollspy/">Scrollspy</a>
              </li>
              <li>
                <a href="/docs/4.4/components/spinners/">Spinners</a>
              </li>
              <li>
                <a href="/docs/4.4/components/toasts/">Toasts</a>
              </li>
              <li>
                <a href="/docs/4.4/components/tooltips/">Tooltips</a>
              </li>
            </ul>
          </div>
          <div class="bd-toc-item">
            <a class="bd-toc-link" href="/docs/4.4/utilities/borders/">Utilities</a>

            <ul class="nav bd-sidenav">
              <li>
                <a href="/docs/4.4/utilities/borders/">Borders</a>
              </li>
              <li>
                <a href="/docs/4.4/utilities/clearfix/">Clearfix</a>
              </li>
              <li>
                <a href="/docs/4.4/utilities/close-icon/">Close icon</a>
              </li>
              <li>
                <a href="/docs/4.4/utilities/colors/">Colors</a>
              </li>
              <li>
                <a href="/docs/4.4/utilities/display/">Display</a>
              </li>
              <li>
                <a href="/docs/4.4/utilities/embed/">Embed</a>
              </li>
              <li>
                <a href="/docs/4.4/utilities/flex/">Flex</a>
              </li>
              <li>
                <a href="/docs/4.4/utilities/float/">Float</a>
              </li>
              <li>
                <a href="/docs/4.4/utilities/image-replacement/">Image replacement</a>
              </li>
              <li>
                <a href="/docs/4.4/utilities/overflow/">Overflow</a>
              </li>
              <li>
                <a href="/docs/4.4/utilities/position/">Position</a>
              </li>
              <li>
                <a href="/docs/4.4/utilities/screen-readers/">Screen readers</a>
              </li>
              <li>
                <a href="/docs/4.4/utilities/shadows/">Shadows</a>
              </li>
              <li>
                <a href="/docs/4.4/utilities/sizing/">Sizing</a>
              </li>
              <li>
                <a href="/docs/4.4/utilities/spacing/">Spacing</a>
              </li>
              <li>
                <a href="/docs/4.4/utilities/stretched-link/">Stretched link</a>
              </li>
              <li>
                <a href="/docs/4.4/utilities/text/">Text</a>
              </li>
              <li>
                <a href="/docs/4.4/utilities/vertical-align/">Vertical align</a>
              </li>
              <li>
                <a href="/docs/4.4/utilities/visibility/">Visibility</a>
              </li>
            </ul>
          </div>
          <div class="bd-toc-item">
            <a class="bd-toc-link" href="/docs/4.4/extend/approach/">Extend</a>

            <ul class="nav bd-sidenav">
              <li>
                <a href="/docs/4.4/extend/approach/">Approach</a>
              </li>
              <li>
                <a href="/docs/4.4/extend/icons/">Icons</a>
              </li>
            </ul>
          </div>
          <div class="bd-toc-item">
            <a class="bd-toc-link" href="/docs/4.4/migration/">Migration</a>

            <ul class="nav bd-sidenav"></ul>
          </div>
          <div class="bd-toc-item">
            <a class="bd-toc-link" href="/docs/4.4/about/overview/">About</a>

            <ul class="nav bd-sidenav">
              <li>
                <a href="/docs/4.4/about/overview/">Overview</a>
              </li>
              <li>
                <a href="/docs/4.4/about/team/">Team</a>
              </li>
              <li>
                <a href="/docs/4.4/about/brand/">Brand</a>
              </li>
              <li>
                <a href="/docs/4.4/about/license/">License</a>
              </li>
              <li>
                <a href="/docs/4.4/about/translations/">Translations</a>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      <nav class="d-none d-xl-block col-xl-2 bd-toc" aria-label="Secondary navigation">
        <ul class="section-nav">
          <li class="toc-entry toc-h2">
            <a href="#containers">Containers</a>
            <ul>
              <li class="toc-entry toc-h3">
                <a href="#all-in-one">All-in-one</a>
              </li>
              <li class="toc-entry toc-h3">
                <a href="#fluid">Fluid</a>
              </li>
              <li class="toc-entry toc-h3">
                <a href="#responsive">Responsive</a>
              </li>
            </ul>
          </li>
          <li class="toc-entry toc-h2">
            <a href="#responsive-breakpoints">Responsive breakpoints</a>
          </li>
          <li class="toc-entry toc-h2">
            <a href="#z-index">Z-index</a>
          </li>
        </ul>
      </nav>

      <main class="col-md-9 col-xl-8 py-md-3 pl-md-5 bd-content" role="main">
        <h1 class="bd-title" id="content">Overview</h1>
        <p
          class="bd-lead"
        >Components and options for laying out your Bootstrap project, including wrapping containers, a powerful grid system, a flexible media object, and responsive utility classes.</p>

        <div id="carbonads">
          <span>
            <span class="carbon-wrap">
              <a
                href="https://srv.carbonads.net/ads/click/x/GTND42QYCYADPK7WCE7LYKQMFTSD5K3JCKBD4Z3JCWADK27JCKBIE23KC6BIE2JYCVSDTK3EHJNCLSIZ?segment=placement:getbootstrapcom;"
                class="carbon-img"
                target="_blank"
                rel="noopener sponsored"
              >
                <img
                  src="https://cdn4.buysellads.net/uu/1/3386/1525189943-38523.png"
                  alt="ads via Carbon"
                  border="0"
                  style="max-width: 130px;"
                />
              </a>
              <a
                href="https://srv.carbonads.net/ads/click/x/GTND42QYCYADPK7WCE7LYKQMFTSD5K3JCKBD4Z3JCWADK27JCKBIE23KC6BIE2JYCVSDTK3EHJNCLSIZ?segment=placement:getbootstrapcom;"
                class="carbon-text"
                target="_blank"
                rel="noopener sponsored"
              >Limited time offer: Get 10 free Adobe Stock images.</a>
            </span>
            <a
              href="http://carbonads.net/?utm_source=getbootstrapcom&amp;utm_medium=ad_via_link&amp;utm_campaign=in_unit&amp;utm_term=carbon"
              class="carbon-poweredby"
              target="_blank"
              rel="noopener sponsored"
            >ads via Carbon</a>
          </span>
        </div>

        <h2 id="containers">
          <span class="bd-content-title">
            Containers
            <a
              class="anchorjs-link"
              aria-label="Anchor"
              data-anchorjs-icon="#"
              href="#containers"
              style="padding-left: 0.375em;"
            ></a>
          </span>
        </h2>

        <p>
          Containers are the most basic layout element in Bootstrap and are
          <strong>required when using our default grid system</strong>. Containers are used to contain, pad, and (sometimes) center the content within them. While containers
          <em>can</em> be nested, most layouts do not require a nested container.
        </p>

        <p>Bootstrap comes with three different containers:</p>

        <ul>
          <li>
            <code class="highlighter-rouge">.container</code>, which sets a
            <code class="highlighter-rouge">max-width</code> at each responsive breakpoint
          </li>
          <li>
            <code class="highlighter-rouge">.container-fluid</code>, which is
            <code class="highlighter-rouge">width: 100%</code> at all breakpoints
          </li>
          <li>
            <code class="highlighter-rouge">.container-{breakpoint}</code>, which is
            <code class="highlighter-rouge">width: 100%</code> until the specified breakpoint
          </li>
        </ul>

        <p>
          The table below illustrates how each container’s
          <code class="highlighter-rouge">max-width</code> compares to the original
          <code class="highlighter-rouge">.container</code> and
          <code class="highlighter-rouge">.container-fluid</code> across each breakpoint.
        </p>

        <p>
          See them in action and compare them in our
          <a
            href="/docs/4.4/examples/grid/#containers"
          >Grid example</a>.
        </p>

        <table class="table text-left">
          <thead>
            <tr>
              <th></th>
              <th>
                Extra small
                <br />
                <span class="font-weight-normal">&lt;576px</span>
              </th>
              <th>
                Small
                <br />
                <span class="font-weight-normal">≥576px</span>
              </th>
              <th>
                Medium
                <br />
                <span class="font-weight-normal">≥768px</span>
              </th>
              <th>
                Large
                <br />
                <span class="font-weight-normal">≥992px</span>
              </th>
              <th>
                Extra large
                <br />
                <span class="font-weight-normal">≥1200px</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <code>.container</code>
              </td>
              <td class="text-muted">100%</td>
              <td>540px</td>
              <td>720px</td>
              <td>960px</td>
              <td>1140px</td>
            </tr>
            <tr>
              <td>
                <code>.container-sm</code>
              </td>
              <td class="text-muted">100%</td>
              <td>540px</td>
              <td>720px</td>
              <td>960px</td>
              <td>1140px</td>
            </tr>
            <tr>
              <td>
                <code>.container-md</code>
              </td>
              <td class="text-muted">100%</td>
              <td class="text-muted">100%</td>
              <td>720px</td>
              <td>960px</td>
              <td>1140px</td>
            </tr>
            <tr>
              <td>
                <code>.container-lg</code>
              </td>
              <td class="text-muted">100%</td>
              <td class="text-muted">100%</td>
              <td class="text-muted">100%</td>
              <td>960px</td>
              <td>1140px</td>
            </tr>
            <tr>
              <td>
                <code>.container-xl</code>
              </td>
              <td class="text-muted">100%</td>
              <td class="text-muted">100%</td>
              <td class="text-muted">100%</td>
              <td class="text-muted">100%</td>
              <td>1140px</td>
            </tr>
            <tr>
              <td>
                <code>.container-fluid</code>
              </td>
              <td class="text-muted">100%</td>
              <td class="text-muted">100%</td>
              <td class="text-muted">100%</td>
              <td class="text-muted">100%</td>
              <td class="text-muted">100%</td>
            </tr>
          </tbody>
        </table>

        <h3 id="all-in-one">
          <span class="bd-content-title">
            All-in-one
            <a
              class="anchorjs-link"
              aria-label="Anchor"
              data-anchorjs-icon="#"
              href="#all-in-one"
              style="padding-left: 0.375em;"
            ></a>
          </span>
        </h3>

        <p>
          Our default
          <code class="highlighter-rouge">.container</code> class is a responsive, fixed-width container, meaning its
          <code
            class="highlighter-rouge"
          >max-width</code> changes at each breakpoint.
        </p>

        <div class="bd-clipboard">
          <button
            type="button"
            class="btn-clipboard"
            title
            data-original-title="Copy to clipboard"
          >Copy</button>
        </div>
        <figure class="highlight">
          <pre><code class="language-html" data-lang="html"><span class="nt">&lt;div</span> <span class="na">class=</span><span class="s">"container"</span><span class="nt">&gt;</span>
  <span class="c">&lt;!-- Content here --&gt;</span>
<span class="nt">&lt;/div&gt;</span></code></pre>
        </figure>

        <h3 id="fluid">
          <span class="bd-content-title">
            Fluid
            <a
              class="anchorjs-link"
              aria-label="Anchor"
              data-anchorjs-icon="#"
              href="#fluid"
              style="padding-left: 0.375em;"
            ></a>
          </span>
        </h3>

        <p>
          Use
          <code class="highlighter-rouge">.container-fluid</code> for a full width container, spanning the entire width of the viewport.
        </p>

        <div class="bd-clipboard">
          <button
            type="button"
            class="btn-clipboard"
            title
            data-original-title="Copy to clipboard"
          >Copy</button>
        </div>
        <figure class="highlight">
          <pre><code class="language-html" data-lang="html"><span class="nt">&lt;div</span> <span class="na">class=</span><span class="s">"container-fluid"</span><span class="nt">&gt;</span>
  ...
<span class="nt">&lt;/div&gt;</span></code></pre>
        </figure>

        <h3 id="responsive">
          <span class="bd-content-title">
            Responsive
            <a
              class="anchorjs-link"
              aria-label="Anchor"
              data-anchorjs-icon="#"
              href="#responsive"
              style="padding-left: 0.375em;"
            ></a>
          </span>
        </h3>

        <p>
          Responsive containers are new in Bootstrap v4.4. They allow you to specify a class that is 100% wide until the specified breakpoint is reached, after which we apply
          <code
            class="highlighter-rouge"
          >max-width</code>s for each of the higher breakpoints. For example,
          <code
            class="highlighter-rouge"
          >.container-sm</code> is 100% wide to start until the
          <code class="highlighter-rouge">sm</code> breakpoint is reached, where it will scale up with
          <code class="highlighter-rouge">md</code>,
          <code class="highlighter-rouge">lg</code>, and
          <code class="highlighter-rouge">xl</code>.
        </p>

        <div class="bd-clipboard">
          <button
            type="button"
            class="btn-clipboard"
            title
            data-original-title="Copy to clipboard"
          >Copy</button>
        </div>
        <figure class="highlight">
          <pre><code class="language-html" data-lang="html"><span class="nt">&lt;div</span> <span class="na">class=</span><span class="s">"container-sm"</span><span class="nt">&gt;</span>100% wide until small breakpoint<span class="nt">&lt;/div&gt;</span>
<span class="nt">&lt;div</span> <span class="na">class=</span><span class="s">"container-md"</span><span class="nt">&gt;</span>100% wide until medium breakpoint<span class="nt">&lt;/div&gt;</span>
<span class="nt">&lt;div</span> <span class="na">class=</span><span class="s">"container-lg"</span><span class="nt">&gt;</span>100% wide until large breakpoint<span class="nt">&lt;/div&gt;</span>
<span class="nt">&lt;div</span> <span class="na">class=</span><span class="s">"container-xl"</span><span class="nt">&gt;</span>100% wide until extra large breakpoint<span class="nt">&lt;/div&gt;</span></code></pre>
        </figure>

        <h2 id="responsive-breakpoints">
          <span class="bd-content-title">
            Responsive breakpoints
            <a
              class="anchorjs-link"
              aria-label="Anchor"
              data-anchorjs-icon="#"
              href="#responsive-breakpoints"
              style="padding-left: 0.375em;"
            ></a>
          </span>
        </h2>

        <p>
          Since Bootstrap is developed to be mobile first, we use a handful of
          <a
            href="https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries"
          >media queries</a> to create sensible breakpoints for our layouts and interfaces. These breakpoints are mostly based on minimum viewport widths and allow us to scale up elements as the viewport changes.
        </p>

        <p>Bootstrap primarily uses the following media query ranges—or breakpoints—in our source Sass files for our layout, grid system, and components.</p>

        <div class="bd-clipboard">
          <button
            type="button"
            class="btn-clipboard"
            title
            data-original-title="Copy to clipboard"
          >Copy</button>
        </div>
        <figure class="highlight">
          <pre><code class="language-scss" data-lang="scss"><span class="c1">// Extra small devices (portrait phones, less than 576px)</span>
<span class="c1">// No media query for `xs` since this is the default in Bootstrap</span>

<span class="c1">// Small devices (landscape phones, 576px and up)</span>
<span class="k">@media</span> <span class="p">(</span><span class="n">min-width</span><span class="o">:</span> <span class="m">576px</span><span class="p">)</span> <span class="p">{</span> <span class="nc">...</span> <span class="p">}</span>

<span class="c1">// Medium devices (tablets, 768px and up)</span>
<span class="k">@media</span> <span class="p">(</span><span class="n">min-width</span><span class="o">:</span> <span class="m">768px</span><span class="p">)</span> <span class="p">{</span> <span class="nc">...</span> <span class="p">}</span>

<span class="c1">// Large devices (desktops, 992px and up)</span>
<span class="k">@media</span> <span class="p">(</span><span class="n">min-width</span><span class="o">:</span> <span class="m">992px</span><span class="p">)</span> <span class="p">{</span> <span class="nc">...</span> <span class="p">}</span>

<span class="c1">// Extra large devices (large desktops, 1200px and up)</span>
<span class="k">@media</span> <span class="p">(</span><span class="n">min-width</span><span class="o">:</span> <span class="m">1200px</span><span class="p">)</span> <span class="p">{</span> <span class="nc">...</span> <span class="p">}</span></code></pre>
        </figure>

        <p>Since we write our source CSS in Sass, all our media queries are available via Sass mixins:</p>

        <div class="bd-clipboard">
          <button
            type="button"
            class="btn-clipboard"
            title
            data-original-title="Copy to clipboard"
          >Copy</button>
        </div>
        <figure class="highlight">
          <pre><code class="language-scss" data-lang="scss"><span
  class="c1"
>// No media query necessary for xs breakpoint as it's effectively `@media (min-width: 0) { ... }`</span>
<span class="k">@include</span> <span class="nd">media-breakpoint-up</span><span class="p">(</span><span class="n">sm</span><span class="p">)</span> <span class="p">{</span> <span class="nc">...</span> <span class="p">}</span>
<span class="k">@include</span> <span class="nd">media-breakpoint-up</span><span class="p">(</span><span class="n">md</span><span class="p">)</span> <span class="p">{</span> <span class="nc">...</span> <span class="p">}</span>
<span class="k">@include</span> <span class="nd">media-breakpoint-up</span><span class="p">(</span><span class="n">lg</span><span class="p">)</span> <span class="p">{</span> <span class="nc">...</span> <span class="p">}</span>
<span class="k">@include</span> <span class="nd">media-breakpoint-up</span><span class="p">(</span><span class="n">xl</span><span class="p">)</span> <span class="p">{</span> <span class="nc">...</span> <span class="p">}</span>

<span class="c1">// Example: Hide starting at `min-width: 0`, and then show at the `sm` breakpoint</span>
<span class="nc">.custom-class</span> <span class="p">{</span>
  <span class="nl">display</span><span class="p">:</span> <span class="nb">none</span><span class="p">;</span>
<span class="p">}</span>
<span class="k">@include</span> <span class="nd">media-breakpoint-up</span><span class="p">(</span><span class="n">sm</span><span class="p">)</span> <span class="p">{</span>
  <span class="nc">.custom-class</span> <span class="p">{</span>
    <span class="nl">display</span><span class="p">:</span> <span class="nb">block</span><span class="p">;</span>
  <span class="p">}</span>
<span class="p">}</span></code></pre>
        </figure>

        <p>
          We occasionally use media queries that go in the other direction (the given screen size
          <em>or smaller</em>):
        </p>

        <div class="bd-clipboard">
          <button
            type="button"
            class="btn-clipboard"
            title
            data-original-title="Copy to clipboard"
          >Copy</button>
        </div>
        <figure class="highlight">
          <pre><code class="language-scss" data-lang="scss"><span class="c1">// Extra small devices (portrait phones, less than 576px)</span>
<span class="k">@media</span> <span class="p">(</span><span class="n">max-width</span><span class="o">:</span> <span class="m">575</span><span class="mi">.98px</span><span class="p">)</span> <span class="p">{</span> <span class="nc">...</span> <span class="p">}</span>

<span class="c1">// Small devices (landscape phones, less than 768px)</span>
<span class="k">@media</span> <span class="p">(</span><span class="n">max-width</span><span class="o">:</span> <span class="m">767</span><span class="mi">.98px</span><span class="p">)</span> <span class="p">{</span> <span class="nc">...</span> <span class="p">}</span>

<span class="c1">// Medium devices (tablets, less than 992px)</span>
<span class="k">@media</span> <span class="p">(</span><span class="n">max-width</span><span class="o">:</span> <span class="m">991</span><span class="mi">.98px</span><span class="p">)</span> <span class="p">{</span> <span class="nc">...</span> <span class="p">}</span>

<span class="c1">// Large devices (desktops, less than 1200px)</span>
<span class="k">@media</span> <span class="p">(</span><span class="n">max-width</span><span class="o">:</span> <span class="m">1199</span><span class="mi">.98px</span><span class="p">)</span> <span class="p">{</span> <span class="nc">...</span> <span class="p">}</span>

<span class="c1">// Extra large devices (large desktops)</span>
<span class="c1">// No media query since the extra-large breakpoint has no upper bound on its width</span></code></pre>
        </figure>

        <div class="bd-callout bd-callout-info">
          <p>
            Note that since browsers do not currently support
            <a
              href="https://www.w3.org/TR/mediaqueries-4/#range-context"
            >range context queries</a>, we work around the limitations of
            <a
              href="https://www.w3.org/TR/mediaqueries-4/#mq-min-max"
            >
              <code class="highlighter-rouge">min-</code> and
              <code class="highlighter-rouge">max-</code> prefixes
            </a> and viewports with fractional widths (which can occur under certain conditions on high-dpi devices, for instance) by using values with higher precision for these comparisons.
          </p>
        </div>

        <p>Once again, these media queries are also available via Sass mixins:</p>

        <div class="bd-clipboard">
          <button
            type="button"
            class="btn-clipboard"
            title
            data-original-title="Copy to clipboard"
          >Copy</button>
        </div>
        <figure class="highlight">
          <pre><code class="language-scss" data-lang="scss"><span class="k">@include</span> <span class="nd">media-breakpoint-down</span><span class="p">(</span><span class="n">xs</span><span class="p">)</span> <span class="p">{</span> <span class="nc">...</span> <span class="p">}</span>
<span class="k">@include</span> <span class="nd">media-breakpoint-down</span><span class="p">(</span><span class="n">sm</span><span class="p">)</span> <span class="p">{</span> <span class="nc">...</span> <span class="p">}</span>
<span class="k">@include</span> <span class="nd">media-breakpoint-down</span><span class="p">(</span><span class="n">md</span><span class="p">)</span> <span class="p">{</span> <span class="nc">...</span> <span class="p">}</span>
<span class="k">@include</span> <span class="nd">media-breakpoint-down</span><span class="p">(</span><span class="n">lg</span><span class="p">)</span> <span class="p">{</span> <span class="nc">...</span> <span class="p">}</span>
<span class="c1">// No media query necessary for xl breakpoint as it has no upper bound on its width</span>

<span class="c1">// Example: Style from medium breakpoint and down</span>
<span class="k">@include</span> <span class="nd">media-breakpoint-down</span><span class="p">(</span><span class="n">md</span><span class="p">)</span> <span class="p">{</span>
  <span class="nc">.custom-class</span> <span class="p">{</span>
    <span class="nl">display</span><span class="p">:</span> <span class="nb">block</span><span class="p">;</span>
  <span class="p">}</span>
<span class="p">}</span></code></pre>
        </figure>

        <p>There are also media queries and mixins for targeting a single segment of screen sizes using the minimum and maximum breakpoint widths.</p>

        <div class="bd-clipboard">
          <button
            type="button"
            class="btn-clipboard"
            title
            data-original-title="Copy to clipboard"
          >Copy</button>
        </div>
        <figure class="highlight">
          <pre><code class="language-scss" data-lang="scss"><span class="c1">// Extra small devices (portrait phones, less than 576px)</span>
<span class="k">@media</span> <span class="p">(</span><span class="n">max-width</span><span class="o">:</span> <span class="m">575</span><span class="mi">.98px</span><span class="p">)</span> <span class="p">{</span> <span class="nc">...</span> <span class="p">}</span>

<span class="c1">// Small devices (landscape phones, 576px and up)</span>
<span class="k">@media</span> <span class="p">(</span><span class="n">min-width</span><span class="o">:</span> <span class="m">576px</span><span class="p">)</span> <span class="nf">and</span> <span class="p">(</span><span class="n">max-width</span><span class="o">:</span> <span class="m">767</span><span class="mi">.98px</span><span class="p">)</span> <span class="p">{</span> <span class="nc">...</span> <span class="p">}</span>

<span class="c1">// Medium devices (tablets, 768px and up)</span>
<span class="k">@media</span> <span class="p">(</span><span class="n">min-width</span><span class="o">:</span> <span class="m">768px</span><span class="p">)</span> <span class="nf">and</span> <span class="p">(</span><span class="n">max-width</span><span class="o">:</span> <span class="m">991</span><span class="mi">.98px</span><span class="p">)</span> <span class="p">{</span> <span class="nc">...</span> <span class="p">}</span>

<span class="c1">// Large devices (desktops, 992px and up)</span>
<span class="k">@media</span> <span class="p">(</span><span class="n">min-width</span><span class="o">:</span> <span class="m">992px</span><span class="p">)</span> <span class="nf">and</span> <span class="p">(</span><span class="n">max-width</span><span class="o">:</span> <span class="m">1199</span><span class="mi">.98px</span><span class="p">)</span> <span class="p">{</span> <span class="nc">...</span> <span class="p">}</span>

<span class="c1">// Extra large devices (large desktops, 1200px and up)</span>
<span class="k">@media</span> <span class="p">(</span><span class="n">min-width</span><span class="o">:</span> <span class="m">1200px</span><span class="p">)</span> <span class="p">{</span> <span class="nc">...</span> <span class="p">}</span></code></pre>
        </figure>

        <p>These media queries are also available via Sass mixins:</p>

        <div class="bd-clipboard">
          <button
            type="button"
            class="btn-clipboard"
            title
            data-original-title="Copy to clipboard"
          >Copy</button>
        </div>
        <figure class="highlight">
          <pre><code class="language-scss" data-lang="scss"><span class="k">@include</span> <span class="nd">media-breakpoint-only</span><span class="p">(</span><span class="n">xs</span><span class="p">)</span> <span class="p">{</span> <span class="nc">...</span> <span class="p">}</span>
<span class="k">@include</span> <span class="nd">media-breakpoint-only</span><span class="p">(</span><span class="n">sm</span><span class="p">)</span> <span class="p">{</span> <span class="nc">...</span> <span class="p">}</span>
<span class="k">@include</span> <span class="nd">media-breakpoint-only</span><span class="p">(</span><span class="n">md</span><span class="p">)</span> <span class="p">{</span> <span class="nc">...</span> <span class="p">}</span>
<span class="k">@include</span> <span class="nd">media-breakpoint-only</span><span class="p">(</span><span class="n">lg</span><span class="p">)</span> <span class="p">{</span> <span class="nc">...</span> <span class="p">}</span>
<span class="k">@include</span> <span class="nd">media-breakpoint-only</span><span class="p">(</span><span class="n">xl</span><span class="p">)</span> <span class="p">{</span> <span class="nc">...</span> <span class="p">}</span></code></pre>
        </figure>

        <p>Similarly, media queries may span multiple breakpoint widths:</p>

        <div class="bd-clipboard">
          <button
            type="button"
            class="btn-clipboard"
            title
            data-original-title="Copy to clipboard"
          >Copy</button>
        </div>
        <figure class="highlight">
          <pre><code class="language-scss" data-lang="scss"><span class="c1">// Example</span>
<span class="c1">// Apply styles starting from medium devices and up to extra large devices</span>
<span class="k">@media</span> <span class="p">(</span><span class="n">min-width</span><span class="o">:</span> <span class="m">768px</span><span class="p">)</span> <span class="nf">and</span> <span class="p">(</span><span class="n">max-width</span><span class="o">:</span> <span class="m">1199</span><span class="mi">.98px</span><span class="p">)</span> <span class="p">{</span> <span class="nc">...</span> <span class="p">}</span></code></pre>
        </figure>

        <p>The Sass mixin for targeting the same screen size range would be:</p>

        <div class="bd-clipboard">
          <button
            type="button"
            class="btn-clipboard"
            title
            data-original-title="Copy to clipboard"
          >Copy</button>
        </div>
        <figure class="highlight">
          <pre><code class="language-scss" data-lang="scss"><span class="k">@include</span> <span class="nd">media-breakpoint-between</span><span class="p">(</span><span class="n">md</span><span class="o">,</span> <span class="n">xl</span><span class="p">)</span> <span class="p">{</span> <span class="nc">...</span> <span class="p">}</span></code></pre>
        </figure>

        <h2 id="z-index">
          <span class="bd-content-title">
            Z-index
            <a
              class="anchorjs-link"
              aria-label="Anchor"
              data-anchorjs-icon="#"
              href="#z-index"
              style="padding-left: 0.375em;"
            ></a>
          </span>
        </h2>

        <p>
          Several Bootstrap components utilize
          <code class="highlighter-rouge">z-index</code>, the CSS property that helps control layout by providing a third axis to arrange content. We utilize a default z-index scale in Bootstrap that’s been designed to properly layer navigation, tooltips and popovers, modals, and more.
        </p>

        <p>
          These higher values start at an arbitrary number, high and specific enough to ideally avoid conflicts. We need a standard set of these across our layered components—tooltips, popovers, navbars, dropdowns, modals—so we can be reasonably consistent in the behaviors. There’s no reason we couldn’t have used
          <code
            class="highlighter-rouge"
          >100</code>+ or
          <code class="highlighter-rouge">500</code>+.
        </p>

        <p>We don’t encourage customization of these individual values; should you change one, you likely need to change them all.</p>

        <div class="bd-clipboard">
          <button
            type="button"
            class="btn-clipboard"
            title
            data-original-title="Copy to clipboard"
          >Copy</button>
        </div>
        <figure class="highlight">
          <pre><code class="language-scss" data-lang="scss"><span class="nv">$zindex-dropdown</span><span class="p">:</span>          <span class="m">1000</span> <span class="o">!</span><span class="nb">default</span><span class="p">;</span>
<span class="nv">$zindex-sticky</span><span class="p">:</span>            <span class="m">1020</span> <span class="o">!</span><span class="nb">default</span><span class="p">;</span>
<span class="nv">$zindex-fixed</span><span class="p">:</span>             <span class="m">1030</span> <span class="o">!</span><span class="nb">default</span><span class="p">;</span>
<span class="nv">$zindex-modal-backdrop</span><span class="p">:</span>    <span class="m">1040</span> <span class="o">!</span><span class="nb">default</span><span class="p">;</span>
<span class="nv">$zindex-modal</span><span class="p">:</span>             <span class="m">1050</span> <span class="o">!</span><span class="nb">default</span><span class="p">;</span>
<span class="nv">$zindex-popover</span><span class="p">:</span>           <span class="m">1060</span> <span class="o">!</span><span class="nb">default</span><span class="p">;</span>
<span class="nv">$zindex-tooltip</span><span class="p">:</span>           <span class="m">1070</span> <span class="o">!</span><span class="nb">default</span><span class="p">;</span></code></pre>
        </figure>

        <p>
          To handle overlapping borders within components (e.g., buttons and inputs in input groups), we use low single digit
          <code
            class="highlighter-rouge"
          >z-index</code> values of
          <code class="highlighter-rouge">1</code>,
          <code class="highlighter-rouge">2</code>, and
          <code class="highlighter-rouge">3</code> for default, hover, and active states. On hover/focus/active, we bring a particular element to the forefront with a higher
          <code
            class="highlighter-rouge"
          >z-index</code> value to show their border over the sibling elements.
        </p>
      </main>
    </div>
  </div>
</template>
<style lang="less" scoped>
@media (min-width: 1200px) {
  .bd-sidebar {
    -ms-flex: 0 1 320px;
    flex: 0 1 320px;
  }
}
@media (min-width: 768px) {
  .bd-sidebar {
    position: -webkit-sticky;
    position: sticky;
    top: 4rem;
    z-index: 1000;
    height: calc(100vh - 4rem);
  }
}
@media (min-width: 768px) {
  .bd-sidebar {
    border-right: 1px solid rgba(0, 0, 0, 0.1);
  }
  .bd-sidebar {
    -ms-flex-order: 0;
    order: 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }
}

.bd-toc {
  position: sticky;
  top: 4rem;
  height: calc(100vh - 4rem);
  overflow-y: auto;
}
.bd-toc {
  -ms-flex-order: 2;
  order: 2;
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
  font-size: 0.875rem;
}
@media (min-width: 1200px) {
  .d-xl-block {
    display: block !important;
  }
}

.bd-content {
  -ms-flex-order: 1;
  order: 1;
}
@media (min-width: 768px) {
  .pl-md-5,
  .px-md-5 {
    padding-left: 3rem !important;
  }
}
@media (min-width: 768px) {
  .pb-md-3,
  .py-md-3 {
    padding-bottom: 1rem !important;
  }
}
@media (min-width: 768px) {
  .pt-md-3,
  .py-md-3 {
    padding-top: 1rem !important;
  }
}
</style>