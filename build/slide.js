/** <s-page/> element */
class Page extends HTMLElement {
    constructor() {
        super();
        const src = this.getAttribute("src");
        if (src != null)
            fetch(src).
                then(r => r.text()).
                then(d => this.render(d));
    }
    nothing() { }
    error(message) {
        console.error(message);
        return "";
    }
    render(d) {
        const id = this.hasAttribute("id") ?
            this.getAttribute("id") :
            "";
        const top = this.hasAttribute("top");
        const style = this.hasAttribute("style") ? this.getAttribute("style") : "";
        this.outerHTML = `<div class="page" id="${id}" style="${style}" ${top ? "top" : ""}>${d}</div>`;
    }
}
customElements.define('s-page', Page);
let previous_page_id = "";
const change_page = (page_id, in_class, out_class) => {
    const top_page = document.querySelector("div.page[top]");
    const next_page = document.getElementById(page_id);
    next_page.classList.add(in_class);
    top_page.classList.add(out_class);
    next_page.addEventListener("animationend", () => {
        next_page.classList.remove(in_class);
        top_page.classList.remove(out_class);
        next_page.setAttribute("top", "");
        top_page.removeAttribute("top");
    });
};
