/** <s-page/> element */

class Page extends HTMLElement {
    constructor() {
        super()
        const src: string = this.getAttribute("src")
        console.log(src)
        if (src != null) fetch(src).
                            then(r => r.text()).
                            then(d => this.render(d))
    }

    nothing(): void {}

    error(message: string): string {
        console.error(message)
        return ""
    }
    render(d: string): void {
        const id: string = this.hasAttribute("id") ? 
                        this.getAttribute("id") : 
                        ""
        const top = this.hasAttribute("top")
        console.log(d)
        this.innerHTML = d
    }
}

customElements.define('s-page', Page)