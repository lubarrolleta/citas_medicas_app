export class Modal{
    #title;
    #content;
    #modal;
    currentDate
    showModal
    #body
    constructor(currentDate,showModal){
        console.log("modal");
        this.showModal = showModal
        this.currentDate= currentDate
        this.render()
        this.mutation()
        this.#modal = document.querySelector(`#exampleModal`);
        // console.log(this.#modal);
        this.#title = document.querySelector(`h1#exampleModalLabel`);
        this.#content = document.querySelector(`#exampleModal div.modal-body`)
        this.#body = document.querySelector(`#exampleModal .modal-body`)
    }
    Noshow(type){
        const modal = document.querySelector(`#exampleModal`);
        modal && document.removeChild(modal);
    }
    cerrarModal(){
      const modal = new bootstrap.Modal(this.#modal);
      modal.hide()

    }
    getModalBody(){
      return this.#body;
    }
    setContent(title,content,currentDate,showModal) {
      this.showModal = showModal

      this.currentDate= currentDate
      this.mutation()

        this.#title.textContent = title;
        this.#content.replaceChildren(content)
    }
    mutation(){
      const callback = (mutaciones) => {
        mutaciones.forEach((mutacion) => {
          // console.log(mutacion, "MUTACION",this.currentDate);
          // console.log()
          const modalBackdrop = Array.from(document.querySelectorAll('div.modal-backdrop'));// modal-backdrop
  
          if(mutacion.oldValue.includes("show")){
            this.currentDate = undefined;
            this.showModal = false;
            this.#content.innerHTML = ``
            console.log("show")
              modalBackdrop && modalBackdrop.forEach(m=>{ 
              
              });
          }else{
            this.showModal = true;
            this.currentDate = this.currentDate
          }   
        });
      };
      const item = document.querySelector("#exampleModal");
      const objOb = new MutationObserver(callback);
      objOb.observe(item, {
        attributes: true,
        attributeOldValue: true,
        attributeFilter: ["class"],
      });
      // console.log(objOb)
    };
    render(){
        document.body.insertAdjacentHTML('beforeend',`
        <!-- Modal -->
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-xl modal-fullscreen-md-down">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">${this.#title}</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                ${this.#content}
              </div>
              <!-- <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Save changes</button>
              </div> -->
            </div>
          </div>
        </div>
        
        `)
    }
    
} 