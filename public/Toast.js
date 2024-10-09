export class Toast{
    #ToastContainer = document.querySelector("#toastPlacement");
    #body ="Hello, world! This is a toast message.";
    #title;
    constructor(title, body){
        this.#title = title;
        this.#body = body || this.#body;
        console.log(this.#ToastContainer);
        this.render()
        // `    position: fixed !important;
        // width: 100%;
        // top: 0;`
    }
    render(){
        const toast = document.createElement("div");
        toast.classList = "toast toast fade show bg-success text-white"

        const toastHeader = document.createElement("div");
        toastHeader.classList = "toast-header";
        toast.appendChild(toastHeader);

        const img = document.createElement("img");
        img.className ="rounded me-2"
        toastHeader.appendChild(img);

        const strong = document.createElement("strong");
        strong.className = "me-auto";
        strong.textContent = this.#title;
        toastHeader.appendChild(strong);

        const small = document.createElement("small");
        small.className = "";
        small.textContent = "Hace un instante";
        toastHeader.appendChild(small);

        const toastBody = document.createElement("div");
        toastBody.className ="toast-body";
        toastBody.textContent = this.#body;
        toast.appendChild(toastBody);

        this.#ToastContainer.appendChild(toast);
        setTimeout(() => {
            toast.classList.remove("show")
            setTimeout(() => {
                
                this.#ToastContainer.removeChild(toast);
            }, 200);
        }, 2500);

    }
}