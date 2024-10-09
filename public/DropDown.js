import { Acordeon } from "./Acordeon.js?ramdom=9ssasszb";
export class DropDown {
  #title;
  #medico;
  constructor(
    data,
    title,
    funcionAgendar,
    agendamientoHora,
    medico,
    reload, //propiedad de app padre
    fecha,
    currentDate
  ) {
    // console.log(reload,"agendamientoHora");
    this.#title = title;
    this.#medico = medico;
    return this.#render(data, funcionAgendar, agendamientoHora, reload,fecha,currentDate);
  }
  #render(data, funcionAgendar, agendamientoHora, reload,fecha,currentDate) {
    // console.log(fecha,"FECHA")
    const indexUser = data.reduce((acc, user) => {
      acc[user.idPaciente] = user;
      return acc;
    }, {});
    // console.log(indexUser,data);
    // console.log(data.flatMap(c=>(c.citas)).filter(c=>c.length !==0),"data",agendamientoHora);
    const citas = data.flatMap((c) => c.citas).filter((c) => c.length !== 0);
    // .reduce((acc,cita)=> {acc[cita.hora]=cita; return acc},{})
    // console.log("citaa",citas.filter(cu =>cu.id_turno === agendamientoHora.id_turno && cu.hora === agendamientoHora.hora && cu),agendamientoHora,citas);
    const dropdown = document.createElement("div");
    dropdown.className = "dropdown";

    const button = document.createElement("button");
    button.className = "btn btn-secondary dropdown-toggle";
    button.type = "button";
    button.textContent = this.#title;
    button.setAttribute("data-bs-toggle", "dropdown");
    button.setAttribute("aria-expanded", "false");
    dropdown.append(button);

    const ul = document.createElement("ul");
    ul.className = "dropdown-menu";
    // console.log(data);
    data.forEach((paci) => {
      console.log(fecha,"fecha")
      const validaFechaCitasOtrosMedicos = paci.citas.find(c=>c.fecha === fecha && c.hora === agendamientoHora.hora);
      console.log(validaFechaCitasOtrosMedicos,paci);
      // console.log(paci.citas.find(c=>c.id_turno === agendamientoHora.id_turno));
      if (paci.id_turno === agendamientoHora.id_turno) {
      }
      const li = document.createElement("li");
      li.className = "dropdown-item d-flex justify-content-between gap-1";
      li.style.cursor = "pointer";
      validaFechaCitasOtrosMedicos && li.classList.add("disabled")
      li.innerHTML = `${paci.nombre}  ${validaFechaCitasOtrosMedicos ? `<span class="badge text-bg-warning">Agendado con otro medico</span>`:`<span class="badge text-bg-info">${paci.correo}</span>`}`;
      li.addEventListener(
        "click",
        () => funcionAgendar(paci, agendamientoHora,currentDate),
        false
      );
      // const
      // paci.citas.find(c=>c.id_turno === agendamientoHora.id_turno) &&
      ul.appendChild(li);
    });
    dropdown.appendChild(ul);
    // console.log(citas);
    const user = citas.find(
      (cu) =>
        cu.id_turno === agendamientoHora.id_turno &&
        cu.hora === agendamientoHora.hora 
        &&
        cu.fecha === fecha
    );
    // console.log(data)
    // console.log(user?.id_paciente,"user",indexUser[user?.id_paciente]);
    return !user
      ? dropdown
      : new Acordeon(user, indexUser[user?.id_paciente], this.#medico, reload,currentDate);
  }
}
