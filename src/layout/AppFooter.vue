<template>
  <div class="container mb-5">
    <hr />
    <div class="row align-items-center justify-content-md-between">
      <div class="col-md-6">
        <div class="copyright">
          &copy; {{ year }}
          <a href="https://www.creative-tim.com" target="_blank" rel="noopener"
            >Creative
          </a>
          &
          <a href="https://www.binarcode.com" target="_blank" rel="noopener">
            Code</a
          >
          By JuvoS
        </div>
      </div>
      <div class="col-md-6">
        <ul class="nav nav-footer justify-content-end">
          <li class="nav-item">
            <span class="nav-link">Creative</span>
          </li>

          <li class="nav-item">
            <a
              href="https://github.com/creativetimofficial/argon-design-system/blob/master/LICENSE.md"
              class="nav-link"
              target="_blank"
              rel="noopener"
              >MIT License</a
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "app-footer",
  data() {
    return {
      year: new Date().getFullYear()
    };
  }
};
</script>
<style></style>
