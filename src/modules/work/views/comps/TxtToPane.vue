<template>
  <section class="section section-lg section-shaped overflow-hidden my-0">
    <div class="shape shape-style-1 shape-default shape-skew">
      <span></span><span></span><span></span><span></span><span></span
      ><span></span><span></span><span></span>
    </div>
    <div class="container shape-container py-0 pb-5">
      <div class="row row-grid justify-content-between align-items-center">
        <div class="col-lg-6">
          <h3 class="display-3 text-white">
            A beautiful Design System
            <span class="text-white">completed with examples</span>
          </h3>
          <p class="lead text-white">
            The Design System comes with four pre-built pages to help you get
            started faster. You can change the text and images and you're good
            to go. More importantly, looking at them will give you a picture of
            what you can built with this powerful Bootstrap 4 Design System.
          </p>
          <div class="btn-wrapper">
            <a href="#/login" class="btn btn-success"> Login Page </a
            ><a href="#/register" class="btn btn-success">
              Register Page
            </a>
          </div>
        </div>
        <div class="col-lg-5 mb-lg-auto">
          <div class="transform-perspective-right">
            <div class="card border-0 shadow bg-secondary">
              <div class="card-header pb-5 bg-white">
                <div class="text-muted text-center mb-3">
                  <small>Sign in with</small>
                </div>
                <div class="btn-wrapper text-center">
                  <button type="button" class="btn btn-icon btn-neutral">
                    <span class="btn-inner--icon"
                      ><img src="img/icons/common/github.svg"/></span
                    ><!----><span class="btn-inner--text"> Github </span
                    ><!----></button
                  ><button type="button" class="btn btn-icon btn-neutral">
                    <span class="btn-inner--icon"
                      ><img src="img/icons/common/google.svg"/></span
                    ><!----><span class="btn-inner--text"> Google </span
                    ><!---->
                  </button>
                </div>
              </div>
              <div class="card-body px-lg-5 py-lg-5">
                <div class="text-center text-muted mb-4">
                  <small>Or sign in with credentials</small>
                </div>
                <form role="form">
                  <div class="form-group input-group input-group-alternative">
                    <!---->
                    <div class="input-group-prepend">
                      <span class="input-group-text"
                        ><i class="ni ni-email-83"></i
                      ></span>
                    </div>
                    <input
                      aria-describedby="addon-right addon-left"
                      placeholder="Email"
                      class="form-control"
                    /><!----><!---->
                  </div>
                  <div class="form-group input-group input-group-alternative">
                    <!---->
                    <div class="input-group-prepend">
                      <span class="input-group-text"
                        ><i class="ni ni-lock-circle-open"></i
                      ></span>
                    </div>
                    <input
                      aria-describedby="addon-right addon-left"
                      type="password"
                      placeholder="Password"
                      class="form-control"
                    /><!----><!---->
                  </div>
                  <div class="custom-control custom-checkbox">
                    <input
                      id="XOddvan"
                      type="checkbox"
                      class="custom-control-input"
                    /><label for="XOddvan" class="custom-control-label">
                      Remember me
                    </label>
                  </div>
                  <div class="text-center">
                    <button type="button" class="btn my-4 btn-primary">
                      <!----><!----><!---->Sign In
                    </button>
                  </div>
                </form>
              </div>
              <!----><!---->
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
