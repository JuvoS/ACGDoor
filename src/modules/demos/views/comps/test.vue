<template>
  <div>
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
      <button type="button" class="btn-clipboard" title data-original-title="Copy to clipboard">Copy</button>
    </div>
  </div>
</template>