import { Form } from "./Form.js?reamdom=2ss";

// import {CitasMedicas} from "./javascript.js?ramdon=9"
export class Acordeon  {
    #data;
    #user;
    #medico;
    #pacientes
    currentDateParam
    constructor(data,user,medico,reload,currentDateParam) {
        // super()
        // console.log(reload,"reload");
        this.#data = data;
        this.#user = user;
        this.#medico = medico;
        this.currentDateParam = currentDateParam;
        // this.#pacientes =pacientes;
       return this.render(reload)
    }
    render(reload) {
        // console.log(this.#data,this.#user);
        const {id} = this.#data;
        const {nombre,apellido} = this.#user;
        // console.log(id);
        const accordion = document.createElement("div");
        accordion.className = "accordion";
        accordion.id ="accordionExample";

        const accordionItem = document.createElement("div");
        accordionItem.className ="accordion-item";

        accordion.appendChild(accordionItem);
        const accordionHeader = document.createElement("h2");
        accordionHeader.className  = "accordion-header";
        accordionHeader.id = "headingOne"+id
        accordionItem.appendChild(accordionHeader);

        const accordionButton = document.createElement("button");
        accordionButton.className = "accordion-button collapsed";
        accordionButton.type = 'button';
        accordionButton.innerHTML =`${nombre} ${apellido} <span class="badge text-bg-warning">${"Agendada"}</span>`;
        accordionButton.setAttribute("data-bs-toggle","collapse");
        accordionButton.setAttribute("data-bs-target","#collapseOne"+id)
        accordionButton.setAttribute("aria-expanded","false");
        accordionButton.setAttribute("aria-controls","collapseOne"+id);
        accordionHeader.appendChild(accordionButton);

        const accordionCollapse = document.createElement("div");
        accordionCollapse.className = "accordion-collapse collapse";
        accordionCollapse.id = "collapseOne"+id;
        accordionCollapse.setAttribute("aria-labelledby","headingOne"+id);
        accordionCollapse.setAttribute("data-bs-parent","#accordionExample");
        accordionItem.appendChild(accordionCollapse);

        const accordionBody = document.createElement("div");
        accordionBody.className = "accordion-body";
        accordionBody.replaceChildren(new Form(this.#data,this.#user,this.#medico,reload,this.currentDateParam))
        accordionCollapse.appendChild(accordionBody);

        return accordion;

    }
}