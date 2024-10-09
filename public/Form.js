import { Querys } from "./Querys.js?byffsszzsssss";
import { Toast } from "./Toast.js?nffsssznn";

export class Form {
  #data;
  #user;
  #medico;
#pacientes
  #spinner = `<div class="spinner-border spinner-border-sm text-white" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>`;
  currentDateParam
  constructor(data, user,medico,reload,currentDateParam) {
    // console.log(reload,"reload");
    this.currentDateParam = currentDateParam;
    this.#data = data;
    this.#user = user;
    this.#medico=medico;
    // this.#pacientes = pacientes;
    return this.render(reload);
  }
  render(reload) {
    // console.log(this.currentDateParam,"currentDateParam")
    // console.log(this.#medico,"medico",this.#pacientes);
    // console.log(this.#data,this.#user);
    // const {estado}
    const container = document.createElement("div");
    container.className = "";
    const containerFloating = document.createElement("form");
    containerFloating.name = `form_${this.#data.id}`;
    containerFloating.hidden = true;

    const selectFloting = document.createElement("div");
    selectFloting.className = "form-floating mb-1";
    // selectFloting.hidden = true;
    const select = document.createElement("select");
    select.className = "form-select m1";
    select.id = "floatingSelectGrid";
    select.name = "estado";
    select.setAttribute("aria-label", "Floating label select example");
    // console.log(["Confirmada", "Cancelada"]);
    const options = ["Confirmada", "Cancelada"]
    options.forEach((estado) => {
      // console.log(estado);
      // console.log(this.#user.estado === estado)
      const option = document.createElement("option");
      // option.selected
      this.#user.estado === estado && option.setAttribute("selected", "true");
      option.value = estado;
      option.textContent = estado;
      select.appendChild(option);
    });
    const label = document.createElement("label");
    label.setAttribute("for", "floatingSelectGrid");
    label.textContent = "Estado de la cita";

    const containerBtnsFloating = document.createElement("div");
    containerBtnsFloating.className = "d-flex justify-content-between mb-1";

    const btnUpdates = document.createElement("button");
    btnUpdates.type = "submit";
    btnUpdates.className = "btn btn-primary btn-sm";
    btnUpdates.textContent = "Actualizar";
    btnUpdates.addEventListener(
      "click",
      async (e) => {
        const currentLabel = e.target.textContent;
        e.target.innerHTML = this.#spinner;
        disabled();
        e.preventDefault();
        const formData = Object.fromEntries(new FormData(containerFloating));
        // console.log(formData);
        const update = await new Querys().updateCita(formData, this.#data.id);
        if (!update.error) {
          disabled("remove");
          e.target.textContent = currentLabel;
          containerFloating.hidden = true;
            console.log(reload.pacientes,formData.estado)
            this.#data.estado = formData.estado
            console.log(reload.pacientes.find(p=>p.idPaciente === this.#user.idPaciente))
            const dataUserPrev = reload.pacientes.find(p=>p.idPaciente === this.#user.idPaciente)
            const positionCita = dataUserPrev.citas.findIndex(c=>c.id===this.#data.id);
            dataUserPrev.citas[positionCita]['estado'] = formData.estado.toString();
            console.log(positionCita,dataUserPrev);
            const positionUser = reload.pacientes.findIndex(p=>p.idPaciente === this.#user.idPaciente)
            reload.pacientes[positionUser] = dataUserPrev;
            console.log(reload.pacientes)
            reload.reloadCitas && reload.reloadCitas(reload.pacientes,reload.button,reload.medicos,reload.renderCitas,reload.paciente)
            new Toast("Se ejecuto con exito!",`La cita ID:${this.#data.id}, Se Actualizo con exito`)
        //   alert("Cita Actualizada");
            
        //   console.log(update);
        }
      },
      false
    );
    const btnCancelar = document.createElement("button");
    btnCancelar.type = "button";
    btnCancelar.className = "btn btn-danger btn-sm";
    btnCancelar.textContent = "Cancelar";
    btnCancelar.addEventListener("click", () => {
      containerFloating.hidden = true;
    });

    containerBtnsFloating.appendChild(btnCancelar);

    containerBtnsFloating.appendChild(btnUpdates);

    selectFloting.appendChild(select);
    selectFloting.appendChild(label);

    containerFloating.appendChild(selectFloting);
    containerFloating.appendChild(containerBtnsFloating);

    const containerBtns = document.createElement("div");
    containerBtns.className = "d-flex justify-content-between mb-1";

    const btnDelete = document.createElement("button");
    btnDelete.className = "btn btn-danger btn-sm";
    btnDelete.textContent = "Eliminar";
    btnDelete.addEventListener("click", async(e) => {
        e.preventDefault();
        const currentLabel = e.target.textContent;
        e.target.innerHTML = this.#spinner;
        disabled();
        if(confirm("Deseas eliminar esta cita?")){
            const deleteCita = await new Querys().deleteCita(null,this.#data.id)
            if(!deleteCita.error){
                disabled("remove");
                e.target.textContent = currentLabel;
                // console.log(reload,"reload")
                new Toast("Se ejecuto con exito!",`La cita ID:${this.#data.id}, Se elimino con exito`)
                // alert("Cita eliminada con exito!")
               await new Querys().getPacientes(reload,this.currentDateParam) 
                // console.log(reload)
                // reload
            }
        }else{
            disabled("remove");
            e.target.textContent = currentLabel;
        }
    },false);

    const btnMod = document.createElement("button");
    btnMod.className = "btn btn-info btn-sm";
    btnMod.textContent = "Modificar";
    btnMod.addEventListener("click", () => {
      // console.log(selectFloting,"selectFloting");
      containerFloating.hidden = false;
    });
    function disabled(type) {
      // btnMod.classList.add("disabled")
      !type
        ? btnMod.classList.add("disabled")
        : btnMod.classList.remove("disabled");
      !type
        ? btnDelete.classList.add("disabled")
        : btnDelete.classList.remove("disabled");
      !type
        ? btnCancelar.classList.add("disabled")
        : btnCancelar.classList.remove("disabled");
      !type
        ? btnUpdates.classList.add("disabled")
        : btnUpdates.classList.remove("disabled");
    }

    containerBtns.appendChild(btnDelete);
    containerBtns.appendChild(btnMod);

    container.appendChild(containerBtns);
    container.appendChild(containerFloating);
    return container;
  }
}
