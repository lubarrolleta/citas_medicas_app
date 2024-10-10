import { Citas } from "./Citas.js?ramdom=skk6ssadsasss";
import { Modal } from "./Modal.js?cvssvvssszsdssv";
import { Pacientes } from "./Pacientes.js?sssszsvbd";
import { Toast } from "./Toast.js?sbnnndn";
import { IS_PROD, URL_PROD, URL_TEST } from "./contantes.js?vb";

export class CitasMedicas {
  #main;
  #url = IS_PROD ? URL_PROD : URL_TEST;
  #medicos = [];
  #pacientes = [];
  #modal;
  currentDate;
  showModal = false;
  constructor() {
    this.#main = document.querySelector(`#main`);
    // console.log(this.#main);
    this.#main &&
      (async () => {
        await this.getMedicos();
        await this.getPacientes();
      })();
    this.#modal = new Modal(this.currentDate, this.showModal);
  }
  async getPacientes() {
    try {
      const url = this.#url+"/agendamiento_citas/pacientes/";
      const params = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-type": "pacientes",
        },
        body: null,
      };
      const getData = await this.#cutomFetch(url, params);
      if (!getData.error) {
        const prevData = this.#purificaDataPaciente(getData);
        this.#pacientes = prevData;
        new Pacientes().render(
          this.#pacientes,
          this.#medicos,
          null,
          this.#RenderCard
        );
        // console.log(prevData);
        // this.#RenderCard();
      }
    } catch (error) {
      console.error(error, "getpacientes");
      return undefined;
    }
  }
  async getMedicos() {
    try {
      const params = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-type": "medicos",
        },
        body: null,
      };
      const getData = await this.#cutomFetch(this.#url +"/agendamiento_citas/citas", params);
      if (!getData.error) {
        const prevData = this.#purificaDataMedico(getData);
        this.#medicos = prevData;
        this.#RenderCard();
      }
    } catch (error) {}
  }
  async #cutomFetch(url, params) {
    try {
      console.log(url);
      const paramsTemp = {
        ...params,
        headers: {
          ...params?.headers,
        },
        // body: body
      };

      const consulta = await fetch(url || this.#url, paramsTemp);
      const result = await consulta.json();
      return result;
    } catch (error) {
      console.error(error, "Error");
      return undefined;
    }
  }
  #purificaDataPaciente(data) {
    const prevData = JSON.parse(JSON.stringify(data)).reduce(
      (acc, paciente) => {
        acc[paciente.idPaciente] = {
          ...paciente,
          ["citas"]: JSON.parse(JSON.stringify(data)).filter((m) => {
            if (m.id_paciente === paciente.idPaciente) {
              m.id_turno = Number(m.id_turno);
              delete m.correo;
              delete m.apellido;
              delete m.idPaciente;
              delete m.nombre;
              delete m.telefono;

              return m;
            } else {
              return null;
            }
          }),
        };
        // console.log(acc)
        return acc || null;
      },
      []
    );
    return prevData.filter((c) => c !== "empty");
    //   .map(([key,value])=> value!==null && ({[key]:value}));
  }
  #purificaDataMedico(data) {
    const prevData = JSON.parse(JSON.stringify(data)).reduce((acc, medico) => {
      acc[medico.id] = {
        ...medico,
        ["agendamiento"]: JSON.parse(JSON.stringify(data)).filter((m) => {
          if (m.id_medico === medico.id) {
            delete m.correo;
            delete m.especialidad;
            delete m.id;
            delete m.nombre;
            delete m.telefono;
            return m;
          } else {
            return null;
          }
        }),
        turnosId: JSON.parse(JSON.stringify(data))
          .map((turno) => turno.id === medico.id && Number(turno.id_turno))
          .filter((c) => c !== false),
      };
      return acc || null;
    }, []);
    return prevData.filter((c) => c !== "empty");
  }
  #reload(data, button) {
    setTimeout(() => {
      this.#pacientes = data;
    
    }, 200);
    // console.log(data);

    this.#RenderCard(button);
 
  }
  async #onAgendar(data, button, paciente) {
    // console.log(button);
    console.log(paciente, "data");
    this.urlPacientes = this.#url+"/agendamiento_citas/citas/";
    //
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });
    const params = {
      method: "POST",
      headers: {
        // 'Content-Type':"application/json"
      },
      body: formData,
    };
    const post = await this.#cutomFetch(this.urlPacientes, params);
    if (!post.error) {
      this.getPacientes();
      setTimeout(() => {
        this.#RenderCard(button);
        new Toast(
          "Se creo una nueva cita",
          `Registro exitoso de ${paciente.nombre} ${paciente.apellido}`
        );
        // button && button.click()
      }, 200);
    }
    return post;
  }
  render() {
    this.#RenderCard();
  }
  #RenderCard(button, medicos) {
    

    const containerCard = document.createElement("section");
    const title = document.createElement("h2");
    title.textContent = "Medicos";
    // containerCard.appendChild(title)

    const prevContainer = document.createElement("div");
    prevContainer.className = " d-flex flex-wrap justify-content-center gap-2";
    const containerCards = document.createElement("div");
    containerCards.className = "containerCards container";
    containerCards.appendChild(title);

    this.#medicos.forEach((medico) => {
      let cita;
      let buttonMaster;
      const onAgendar = async (data, hora, currentDate) => {
        this.currentDate = currentDate;
        const prevData = {
          idPaciente: Number(data.idPaciente),
          id_turno: hora.id_turno,
          fecha: hora.fecha,
          hora: hora.hora.toString(),
          estado: "Confirmada",
        };
        this.#onAgendar(prevData, buttonMaster, data);
      };
      const reload = (data, button, currentDateParam) => {
        this.currentDate = currentDateParam;
        this.#reload(data, button);
      };
      // console.log(containerCard);
      // this.#main.insertAdjacentHTML('afterbegin',
      const card = document.createElement("div");
      card.classList.add("card");
      card.setAttribute("style", "width:18rem;");

      const imgCard = document.createElement("img");
      imgCard.classList.add("card-img-top");
      imgCard.src = `public/images/${medico.id}.jpeg`;
      imgCard.alt = `${medico.nombre}`;
      card.appendChild(imgCard);

      const cardBody = document.createElement("div");
      cardBody.classList.add("card-body");

      const cardTitle = document.createElement("h5");
      cardTitle.classList.add("card-title");
      cardTitle.innerHTML = `${medico.nombre} <span class="badge text-bg-success">${medico.especialidad}</span>`;

      const cardText = document.createElement("div");
      cardText.classList.add("card-text");

      // const
      buttonMaster = document.createElement("button");
      buttonMaster.classList.add("btn", "btn-primary");
      buttonMaster.setAttribute("data-bs-toggle", "modal");
      buttonMaster.setAttribute("data-bs-target", "#exampleModal");
      buttonMaster.textContent = "Agendar con";
      buttonMaster.addEventListener(
        "click",
        () => {
          cita = new Citas(
            medico,
            this.#pacientes,
            onAgendar,
            {
              ["pacientes"]: this.#pacientes,
              ["reload"]: reload,
              ["button"]: buttonMaster,
            },
            this.currentDate
          );
          this.#modal.setContent(
            "Agendar con " + medico.nombre,
            cita,
            this.currentDate,
            this.showModal
          );
        },
        false
      );

      const listGroup = document.createElement("ul");
      listGroup.className = "list-group list-group-flush ";
      const listGroupElement = document.createElement("li");
      listGroupElement.className = "list-group-item contacto";

      listGroupElement.innerHTML = `
        <a role="a" href="mailto:${medico.correo}" type="button" class="btn btn-info"><i class="bi bi-envelope-at-fill"></i></a>
        <a type="button" href="tel:${medico.telefono}" class="btn btn-info"><i class="bi bi-telephone-outbound-fill"></i></a>
        
        `;
      listGroup.appendChild(listGroupElement);

      card.append(cardBody);
      card.appendChild(listGroup);
      cardBody.append(cardTitle);
      cardBody.append(cardText);
      cardBody.append(buttonMaster);
      prevContainer.append(card);
      
    });
    containerCards.appendChild(prevContainer);
    containerCard.replaceChildren(containerCards);

    this.#main.replaceChildren(containerCard);
    setTimeout(() => {
      button && button.click();
    }, 200);
 
  }
}
// const init =
new CitasMedicas();
// init();
