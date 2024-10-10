import { Form } from "./Form.js?ssssssssssssss";
import { Modal } from "./Modal.js?bnssssssssssssn";
import { CitasMedicas } from "./javascript.js?ssm";

export class Pacientes {
  container;
  medicos;
  currentDate;
  pacientes;
  #modal;
  getPacientes;
  constructor() {
    this.container = document.querySelector("#pacientes");
    this.modal;

  }

  renderCitas(paciente, medicos, buttonMaster, renderGen) {
    // console.log(renderGen, "renderGen");

    const reload = (
      prevData,
      buttonReload,
      medicos,
      renderCitas,
      paciente,
      renderGen
    ) => {
    //   console.log(renderGen, "renderGen");
      this.container = document.querySelector("#pacientes");
      this.renderCitas = renderCitas;
      this.medicos = medicos;
      this.modal = new Modal();
      const bodyModal = this.modal.getModalBody();
      const newPaciente = prevData.find(
        (p) => p.idPaciente === paciente.idPaciente
      );
      const citas = this.renderCitas(newPaciente, medicos, buttonReload);
      bodyModal.replaceChildren(citas);
     
      this.pacientes = prevData;
      this.render(this.pacientes, this.medicos, buttonReload, this.renderCitas);
      try {
        // renderGen(null,this.medicos)
        new CitasMedicas().render();
      } catch (error) {
        console.error(error, "Erro-renderGen");
      }
    };
    const containerForm = document.createElement("div");
    const navigateContainer = document.createElement("div");
    const citasContainer = document.createElement("div");
    const citasPrevContainer = document.createElement("div");
    citasPrevContainer.className =
      "d-flex flex-wrap justify-content-center gap-2";
    paciente.citas
      .sort((a, b) => new Date(a.fecha) - new Date(b.fecha))
      .forEach((cita) => {
     
        const medico = medicos.find((m) => m.turnosId.includes(cita.id_turno));
        const { nombre, especialidad } = medico;
        const fechaFormat = moment(`${cita.fecha} ${cita.hora}`).format(
          "dddd, MMMM Do YYYY, h:mm:ss a"
        );
        // console.log(fechaFormat);
        const card = document.createElement("div");
        card.classList.add("card");
        card.setAttribute("style", "width:18rem;");
        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");
        const cardTitle = document.createElement("h5");
        cardTitle.classList.add("card-title");
        cardTitle.textContent = `${nombre} - ${especialidad}`;
        cardBody.appendChild(cardTitle);
        const subTitle = document.createElement("div");
        subTitle.className = "card-subtitle mb-2 text-body-secondary";
        subTitle.textContent = `${fechaFormat}`;
        cardBody.appendChild(subTitle);
        cardBody.appendChild(
          new Form(
            cita,
            paciente,
            medico,
            {
              ["pacientes"]: this.pacientes,
              ["reloadCitas"]: reload,
              ["button"]: buttonMaster,
              ["render"]: this.render,
              ["medicos"]: this.medicos,
              ["renderCitas"]: this.renderCitas,
              ["paciente"]: paciente,
              ["renderGen"]: renderGen,
              // ["modal"]:
            },
            this.currentDate
          )
        );

        card.appendChild(cardBody);
        citasPrevContainer.appendChild(card);
      });
    citasContainer.replaceChildren(citasPrevContainer);
    containerForm.appendChild(navigateContainer);

    containerForm.appendChild(citasContainer);

    const mensaje = document.createElement("h3");
    mensaje.className = "h3";
    mensaje.textContent = "Este paciente no tiene citas agendadas";

    return paciente.citas.length !== 0 ? containerForm : mensaje;
  }
  render(pacientes, medicos, buttonReload, renderGen) {
    // console.log(renderGen, "medicos");
    const renderInModal = () => {
      // this.modal.setContent("Citas de "+paciente.nombre +" " +paciente.apellido,cita,this.currentDate,null);
    };
    this.container = document.querySelector("#pacientes");
    // this.renderCitas = renderCitas || this.renderCitas;
    this.modal = new Modal();

    this.pacientes = pacientes;
    this.medicos = medicos;
    console.log("render");
    let buttonMaster;
    const containerGeneral = document.createElement("div");
    containerGeneral.className = "containerGeneral container";

    const title = document.createElement("h2");
    title.textContent = "Pacientes";
    containerGeneral.appendChild(title);

    const containerCards = document.createElement("div");
    containerCards.className = "containerCards";
    containerGeneral.appendChild(containerCards);

    const containerPrevCards = document.createElement("div");
    containerPrevCards.className =
      " d-flex flex-wrap justify-content-center gap-2";

    // Generando cards
    // console.log(pacientes)
    pacientes.forEach((paciente) => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.setAttribute("style", "width:18rem;");

      const imgCard = document.createElement("img");
      imgCard.classList.add("card-img-top");
      imgCard.src = `public/images/pacientes/${paciente.idPaciente}.jpg`;
      imgCard.alt = `${paciente.nombre}`;
      card.appendChild(imgCard);

      const cardBody = document.createElement("div");
      cardBody.classList.add("card-body");
      const cardTitle = document.createElement("h5");
      cardTitle.classList.add("card-title");
      cardTitle.innerHTML = `${paciente.nombre} ${paciente.apellido} <span class="badge text-bg-success">${paciente.citas.length} citas agendadas</span>`;

      const cardText = document.createElement("div");
      cardText.classList.add("card-text");
      // button
      buttonMaster = document.createElement("button");
      buttonMaster.classList.add("btn", "btn-primary");
      buttonMaster.setAttribute("data-bs-toggle", "modal");
      buttonMaster.setAttribute("data-bs-target", "#exampleModal");
      buttonMaster.textContent = "Ver citas";
      buttonMaster.id = `button_${paciente.idPaciente}`;
      // console.log(this.medicos.filter(m=>m.turnosId.includes()));
      buttonMaster.addEventListener(
        "click",
        () => {
          // console.log(this.renderCitas,"renderCitas","click")
          const btn = document.querySelector(
            `[id="button_${paciente.idPaciente}"]`
          );
          // console.log(btn)
          const cita = this.renderCitas(paciente, this.medicos, btn, renderGen);
          // console.log(cita)
          // cita = new Citas(paciente,this.#pacientes,onAgendar,{["pacientes"]:this.#pacientes,['reload']:reload,["button"]:buttonMaster},this.currentDate)
          // renderInModal()
          this.modal.setContent(
            "Citas de " + paciente.nombre + " " + paciente.apellido,
            cita,
            this.currentDate,
            null
          );
        },
        false
      );
      const listGroup = document.createElement("ul");
      listGroup.className = "list-group list-group-flush ";
      const listGroupElement = document.createElement("li");
      listGroupElement.className = "list-group-item contacto";

      listGroupElement.innerHTML = `
          <a role="a" href="mailto:${paciente.correo}" type="button" class="btn btn-info"><i class="bi bi-envelope-at-fill"></i></a>
          <a type="button" href="tel:${paciente.telefono}" class="btn btn-info"><i class="bi bi-telephone-outbound-fill"></i></a>
          
          `;
      listGroup.appendChild(listGroupElement);

      card.append(cardBody);
      card.appendChild(listGroup);
      cardBody.append(cardTitle);
      cardBody.append(cardText);
      cardBody.append(buttonMaster);
      // prevContainer.append(card);
      containerPrevCards.appendChild(card);
    });

    containerCards.replaceChildren(containerPrevCards);
    this.container.replaceChildren(containerGeneral);
    // console.log(buttonReload,"buton")
    buttonReload &&
      setTimeout(() => {
        console.log(buttonReload, "buttonReload");
        // buttonReload.click()
      }, 400);
  }
}
