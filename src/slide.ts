/** <s-page/> element */

class Page extends HTMLElement {
    constructor() {
        super()
        const src: string = this.getAttribute("src")
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
        const style = this.hasAttribute("style") ? this.getAttribute("style") : ""
        this.outerHTML = `<div class="page" id="${id}" style="${style}" ${top ? "top" : ""}>${d}</div>`
    }
}

customElements.define('s-page', Page)

let previous_page_id: string = ""

const change_page = (page_id: string): void => {
    const top_page = document.querySelector("div.page[top]")
    const next_page = document.getElementById(page_id)
    next_page.classList.add("in")
    top_page.classList.add("out")
    next_page.addEventListener("animationend", () => {
        next_page.classList.remove("in")
        top_page.classList.remove("out")
        next_page.setAttribute("top", "")
        top_page.removeAttribute("top")
    })
}