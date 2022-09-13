class SearchInput extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="input-group mt-5 pt-4 mb-5 input-group-lg">
        <input type="text" class="form-control" id="input-search" placeholder="Search Movies">
        <button class="btn btn-outline-primary button-search" type="button"><i
            class="fa-solid fa-magnifying-glass"></i></button>
      </div>
    `;
  }
}

customElements.define("search-input", SearchInput);
