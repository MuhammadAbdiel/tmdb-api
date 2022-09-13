class Navbar extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <nav class="navbar navbar-dark bg-primary fixed-top">
        <div class="container py-0">
          <span class="navbar-brand mb-0 h1 fs-2">Movies</span>
        </div>
      </nav>
    `;
  }
}

customElements.define("nav-bar", Navbar);
