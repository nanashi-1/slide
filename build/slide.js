/** <s-page/> element */
class Page extends HTMLElement {
    constructor() {
        super();
        const src = this.getAttribute("src");
        console.log(src);
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
        console.log(d);
        this.innerHTML = d;
    }
}
customElements.define('s-page', Page);
