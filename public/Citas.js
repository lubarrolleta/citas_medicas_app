import { DropDown } from "./DropDown.js?rassssssSSs";

export class Citas {
  #pacientes;
  #data;
  #bodyModal = document.querySelector("modal-body");
  calendarBody;
  btnNext = document.createElement("button");
  btnPrevius = document.createElement("button");
  year;
  weekCurrentBtn;
  today = new Date();
  currentMonth = this.today.getMonth();
  currentYear = this.today.getFullYear();
  prevWeek;
  weekDisplay;
  nextWeek;
  currentDate;
  currentWeekStart;
  //DATA RECIBIDA POR EL CONSTRUCTOR
  funcionAgendar;
  reload;

  // luxon = luxon
  constructor(data, pacientes, funcionAgendar, reload, currentDateParam) {
    this.#pacientes = pacientes;
    this.#data = data;
    this.funcionAgendar = funcionAgendar;
    this.reload = reload;
    // document.addEventListener("DOMContentLoaded",()=>{
    // })
    // console.log(currentDateParam,"currentDateParam");
    this.currentDate = currentDateParam
      ? new Date(currentDateParam)
      : new Date();
    this.currentWeekStart = this.getStartOfWeek(this.currentDate);
    //  console.log(this.currentWeekStart);
    const tabla = this.#renderTables(
      data,
      funcionAgendar,
      reload,
      this.currentWeekStart
    );
    // this.iniCalendar()
    // this.generarCalendario(this.currentMonth, this.currentYear)
    return tabla;
  }
  iniCalendar() {
    const interval = setInterval(() => {
      // console.log(this.calendarioTop);
      // this.calendarBody = document.querySelector('#calendar tbody');
      if (this.calendarioTop) {
        clearInterval(interval);
        this.#bodyModal = document.querySelector(".modal-body");

        // this.weekDisplay = document.getElementById('weekDisplay');
        // this.prevWeek = document.getElementById('prevWeek');
        // this.nextWeek = document.getElementById('nextWeek');
        // Variables para manejar la semana actual

        // Generar el calendario inicial
        // this.generateCalendar(this.currentWeekStart);
        this.updateWeekDisplay(this.currentWeekStart);
        // Eventos para los botones de navegación
        this.weekCurrentBtn.addEventListener("click",()=>{
          console.log("weekCurrentBtn")
          const current = this.getStartOfWeek(new Date());
          // console.log(current);
          this.currentWeekStart = current;
          const tabla = this.#renderTables(
            this.#data,
            this.funcionAgendar,
            this.reload,
            current
          );
          console.log(tabla)
          this.#bodyModal.replaceChildren(tabla);

          // this.generateCalendar(this.currentWeekStart);
          this.updateWeekDisplay(this.currentWeekStart);

        },false);
        this.btnPrevius.addEventListener("click", () => {
          // console.log(this.currentWeekStart);
          const current = this.currentWeekStart;
          // console.log(current, "current");
          current.setDate(current.getDate() - 7);
          // this.generateCalendar(this.currentWeekStart);
          // console.log(this.currentWeekStart, current);
          this.currentWeekStart = current;
          // this.calendarioTop.innerHTML=""

          // console.log(this.#bodyModal)
          const tabla = this.#renderTables(
            this.#data,
            this.funcionAgendar,
            this.reload,
            current
          );
          const parent = this.calendarioTop.parentNode;
          // console.log(tabla,"tabla",this.calendarioTop.parentNode)
          this.#bodyModal.replaceChildren(tabla);
          this.updateWeekDisplay(this.currentWeekStart);
          // this.calendarioTop.replaceChildren(this.calendarioTop)
          // return
        });

        this.btnNext.addEventListener("click", () => {
          // console.log(this.currentWeekStart)
          this.currentWeekStart.setDate(this.currentWeekStart.getDate() + 7);
          const tabla = this.#renderTables(
            this.#data,
            this.funcionAgendar,
            this.reload,
            this.currentWeekStart
          );
          this.#bodyModal.replaceChildren(tabla);

          // this.generateCalendar(this.currentWeekStart);
          this.updateWeekDisplay(this.currentWeekStart);
        });
      }
    }, 200);
  }
  // Función para generar el calendario
  generateCalendar(startOfWeek) {
    // Limpiar el cuerpo del calendario
    this.calendarBody.innerHTML = "";

    // Generar las horas (por ejemplo, de 8 AM a 6 PM)
    const minHora = this.#data.agendamiento
      .map((h) => Number(h.hora_inicio.split(":")[0]))
      .reduce((a, b) => (a < b ? a : b));
    const maxHora = this.#data.agendamiento
      .map((h) => Number(h.hora_fin.split(":")[0]))
      .reduce((a, b) => (a > b ? a : b));
    const startHour = minHora;
    const endHour = maxHora;

    for (let hour = startHour; hour <= endHour; hour++) {
      const row = document.createElement("tr");

      // Celda de hora
      const timeCell = document.createElement("td");
      timeCell.classList.add("time-label");
      timeCell.textContent = this.formatHour(hour);
      row.appendChild(timeCell);

      // Generar celdas para cada día laboral (lunes a viernes)
      for (let i = 0; i < 5; i++) {
        // 5 días laborales
        const agen = { [hour]: `${hour}:00:00` };
        console.log(agen, "hora");
        const day = new Date(startOfWeek);
        day.setDate(startOfWeek.getDate() + i);

        const cell = document.createElement("td");
        cell.classList.add("time-slot");
        cell.dataset.date = day.toISOString().split("T")[0];
        cell.dataset.hour = hour;
        this.#data.agendamiento.forEach((diaSemana) => {
          const horaIni = Number(diaSemana.hora_inicio.split(":")[0]);
          const horaFinal = Number(diaSemana.hora_fin.split(":")[0]);
          // console.log(horaFinal,horaIni);
          // console.log(diaSemana);
          // console.log(diaSemana.hora_inicio,"diaSemana",agen[horaIni])
          // console.log(agen[horaFinal])
          // // console.log(`'${diaSemana.hora_inicio}'`);
          // console.log(agen[horaIni] && agen[horaFinal]);
          // console.log(Number(Object.keys(agen)));
          // const td = document.createElement("td");
          console.log(Object.values(agen));
          this.#validaHorario(
            Number(Object.keys(agen).toString()),
            horaIni,
            horaFinal
          ) &&
            cell.replaceChildren(
              new DropDown(
                this.#pacientes,
                "Selecciona un paciente.",
                this.funcionAgendar,
                {
                  ...diaSemana,
                  hora: Object.values(agen).toString(),
                  ["id_turno"]: Number(diaSemana.id_turno),
                },
                this.#data,
                this.reload //propiedad de app padre
              )
            );
          // trBody.appendChild(td);
        });
        // Opcional: Puedes agregar eventos o citas aquí

        row.appendChild(cell);
      }

      this.calendarBody.appendChild(row);
    }
  }
  // Función para formatear la hora en formato AM/PM
  formatHour(hour) {
    const ampm = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 === 0 ? 12 : hour % 12;
    return `${hour12}:00 ${ampm}`;
  }
  // Función para obtener el inicio de la semana (lunes)
  getStartOfWeek(date) {
    const day = date.getDay();
    const diff = (day === 0 ? -6 : 1) - day; // Ajuste para que lunes sea inicio
    const start = new Date(date);
    start.setDate(date.getDate() + diff);
    start.setHours(0, 0, 0, 0);
    return start;
  }
  // Función para actualizar la visualización de la semana
  updateWeekDisplay(startOfWeek) {
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 4); // Hasta viernes

    const options = { year: "numeric", month: "short", day: "numeric" };
    const startStr = startOfWeek.toLocaleDateString("es-ES", options);
    const endStr = endOfWeek.toLocaleDateString("es-ES", options);

    this.year.textContent = `Del ${startStr} al ${endStr}`;
  }
  // Función para obtener el nombre del mes
  getMonthName(month) {
    const meses = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];
    return meses[month];
  }

  generarCalendario(month, year) {
    const interval = setInterval(() => {
      this.calendarBody = document.querySelector("#calendar tbody");
      if (this.calendarBody) {
        clearInterval(interval);
        this.calendarBody.innerHTML = "";
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        console.log(firstDay, daysInMonth);
        this.year.textContent = `${this.getMonthName(month)} ${year}`;
        let date = 1;
        // Asumimos que las semanas empiezan el domingo
        for (let i = 0; i < 6; i++) {
          // Máximo 6 filas por mes
          let row = document.createElement("tr");

          for (let j = 0; j < 7; j++) {
            let cell = document.createElement("td");
            if (i === 0 && j < firstDay) {
              cell.textContent = "";
            } else if (date > daysInMonth) {
              break;
            } else {
              cell.textContent = date;
              cell.dataset.date = `${year}-${month + 1}-${date}`;
              date++;
            }
            row.appendChild(cell);
          }

          this.calendarBody.appendChild(row);
          if (date > daysInMonth) {
            break;
          }
        }
      }
    }, 200);
  }
  #initCalendario(data) {
    const horas = data.agendamiento.map((h) => (h.hora_inicio, h.hora_fin));
    console.log(horas);
    const interval = setInterval(() => {
      if (window.FullCalendar) {
        clearInterval(interval);
        const calendarioEl = document.getElementById("calendario");
        const calendar = new FullCalendar.Calendar(calendarioEl, {
          //         initialView: 'timeGridWeek',
          //         allDaySlot: false, // Ocultar la franja de todo el día
          //         selectable: true, // Permitir selección de rangos de tiempo
          // selectMirror: true,
          // eventClick: function(info) {
          //     // Opcional: Manejar clic en eventos existentes
          //     alert(`Cita: ${info.event.title}\nFecha: ${info.event.start.toLocaleString()}`);
          // },
          // events: [], // Inicialmente sin eventos
          // headerToolbar: {
          //     left: 'prev,next today',
          //     center: 'title',
          //     right: 'timeGridWeek,timeGridDay'
          // },
          // businessHours: { // Definir días y horas hábiles
          //     daysOfWeek: [1, 2, 3, 4, 5], // Lunes a Viernes
          //     startTime: '08:00',
          //     endTime: '18:00',
          // },
          // nowIndicator: true,
          // editable: false,
          // selectable: true,
          // selectOverlap: false,
          // allDaySlot: false,
          defaultView: "timeGridWeek",
          lang: "es",
          weekends: false,
          columnFormat: "dddd",
          //dayNames: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
          header: {
            left: "prev,next today",
            center: "title",
            right: "month,agendaWeek,agendaDay",
          },
          defaultDate: "2018-11-11",
          editable: true,
          eventLimit: true,
          weekend: true,
          allDaySlot: false,
          minTime: "09:00:00",
          maxTime: "15:00:00",
          slotDuration: "00:20:00",
          slotLabelInterval: "00:20:00",
          events: [
            {
              title: "Titulo Evento",
              start: "2018-11-11T09:00:55.008",
              end: "2018-11-11T09:15:55.008",
            },
          ],
        });
        calendar.render();
      }
    }, 200);
  }
  #secuencia(minHora, maxHora) {
    // console.log(data);
    // const { hora_inicio, hora_fin } = data;

    let ini = minHora;
    // Number(hora_inicio.split(":")[0]);
    let end = maxHora;
    // Number(hora_fin.split(":")[0]);
    const secuencia = [];
    for (let i = ini; i <= end; i++) {
      // console.log(i.toString().length);
      const index = i.toString().length === 1 ? `0${i}` : i;
      secuencia.push({ [i]: `${index}:00:00` });
    }
    return secuencia;
  }
  #validaHorario(num, min, max) {
    // console.log(num,min,max)
    // return num > min && num < max;
    return num >= min && num <= max;
  }
  #renderTables(data, funcionAgendar, reload, current) {
    // console.log(current,"currentcurrent");
    // const horas = data.agendamiento.map(h=>{
    //     console.log(Number(h.hora_inicio.split(":")[0]),Number(h.hora_fin.split(":")[0]))
    //     const min = Math.min(Number(h.hora_inicio.split(":")[0]),Number(h.hora_fin.split(":")[0]))
    //     const max = Math.max(Number(h.hora_inicio.split(":")[0]),Number(h.hora_fin.split(":")[0]))
    //     // return [...min,...max]
    // })
    // console.log(horas);
    const minHora = data.agendamiento
      .map((h) => Number(h.hora_inicio.split(":")[0]))
      .reduce((a, b) => (a < b ? a : b));
    const maxHora = data.agendamiento
      .map((h) => Number(h.hora_fin.split(":")[0]))
      .reduce((a, b) => (a > b ? a : b));
    // console.log(minHora,maxHora);
    const containerCalendario = document.createElement("div");
    containerCalendario.id = "calendario";
    //     containerCalendario.innerHTML = `
    //     <div class="navigation">
    //             <button id="prevWeek">← Semana Anterior</button>
    //             <span id="weekDisplay">Semana Actual</span>
    //             <button id="nextWeek">Semana Siguiente →</button>
    //         </div>
    //     <table id="calendar">
    //     <thead>
    //                 <tr>
    //                     <th>Hora</th>
    //                     <th>Lunes</th>
    //                     <th>Martes</th>
    //                     <th>Miércoles</th>
    //                     <th>Jueves</th>
    //                     <th>Viernes</th>
    //                 </tr>
    //             </thead>
    //     <tbody>
    //         <!-- Las semanas se generarán dinámicamente aquí -->
    //     </tbody>
    // </table>
    //     `
    const containerTabla = document.createElement("div");
    containerTabla.className = "table-responsive";

    const containerNavegacion = document.createElement("div");
    containerNavegacion.className =
      "containerNavegacion d-flex justify-content-evenly flex-wrap align-items-center";
    containerTabla.appendChild(containerNavegacion);

    const table = document.createElement("table");
    table.id = "calendarioTop";
    this.calendarioTop = table;
    table.className = "table caption-top";
    containerTabla.appendChild(containerCalendario);

    const caption = document.createElement("caption");

    this.btnNext = document.createElement("button");
    this.btnNext.className = "btn btn-primary";
    this.btnNext.textContent = "Siguiente semana";

    this.btnPrevius = document.createElement("button");
    this.btnPrevius.className = "btn btn-primary";

    this.btnPrevius.textContent = "Semana anterior";

    // const year = document.createElement("span");
    //   this.this.btnNext = document.createElement("button");
    // this.this.btnPrevius = document.createElement("button");
    this.year = document.createElement("span");
    this.weekCurrentBtn = document.createElement("button");
    this.weekCurrentBtn.className = "btn btn-primary";
    this.weekCurrentBtn.innerHTML = `<i class="bi bi-arrow-clockwise"></i>`;


    containerNavegacion.appendChild(this.btnPrevius);
    containerNavegacion.appendChild(this.year);
    containerNavegacion.appendChild(this.btnNext);
    containerNavegacion.appendChild(this.weekCurrentBtn);


    table.appendChild(caption);

    const tHead = document.createElement("thead");
    // console.log(data);
    const trTHead = document.createElement("tr");

    // const trTHead = document.createElement('tr');
    const th = document.createElement("th");
    th.setAttribute("scope", "col");
    th.setAttribute(
      "style",
      ` position: sticky;
    left: 0;
    z-index: 100;`
    );
    th.textContent = "Horarios";
    trTHead.appendChild(th);
    // renderiza los dias ya creados en la base de datos
    this.#data.agendamiento.forEach((agen, i) => {
      const th = document.createElement("th");
      th.setAttribute("scope", "col");
      th.textContent = agen.dia_semana;
      trTHead.appendChild(th);
    });
    tHead.appendChild(trTHead);
    table.appendChild(tHead);

    const tbody = document.createElement("tbody");
    const secuenciaData = this.#secuencia(minHora, maxHora);

    secuenciaData.forEach((agen) => {
      const trBody = document.createElement("tr");
      const th = document.createElement("th");
      th.setAttribute("scope", "row");
      th.textContent = Object.values(agen);
      trBody.appendChild(th);
      // for (let index = 0; index < this.#data.agendamiento.length; index++) {
      //   const diaSemana = this.#data.agendamiento[index];
      //   console.log(current,"bv")
      //   const day = new Date(current);
      //   day.setDate(current.getDate() + index);
      //   // const fechaObjetivo = current;
      //   // fechaObjetivo.setDate()
      //   console.log(day, "dia",diaSemana);

      // }
      this.#data.agendamiento.forEach((diaSemana, i) => {
        // console.log(i+1,"i",this.currentWeekStart)
        const day = new Date(current);
        day.setDate(this.currentWeekStart.getDate() + i);
        const fecha = day.toISOString().split("T")[0];
        // console.log("day.toISOString()",this.currentWeekStart.getDate()+i);
        const horaIni = Number(diaSemana.hora_inicio.split(":")[0]);
        const horaFinal = Number(diaSemana.hora_fin.split(":")[0]);
        // console.log(diaSemana);
        // console.log(diaSemana.hora_inicio,"diaSemana",agen[horaIni])
        // console.log(agen[horaFinal])
        // // console.log(`'${diaSemana.hora_inicio}'`);
        // console.log(agen[horaIni] && agen[horaFinal]);
        // console.log(Number(Object.keys(agen)));
        const td = document.createElement("td");
        td.classList.add("dia");
        td.dataset.date = day.toISOString().split("T")[0];
        td.dataset.hour = Object.values(agen).toString();
        this.#validaHorario(Number(Object.keys(agen)), horaIni, horaFinal) &&
          td.replaceChildren(
            new DropDown(
              this.#pacientes,
              "Selecciona un paciente.",
              this.funcionAgendar,
              {
                ...diaSemana,
                hora: Object.values(agen).toString(),
                fecha: fecha,
                ["id_turno"]: Number(diaSemana.id_turno),
              },
              this.#data,
              this.reload, //propiedad de app padre
              fecha,
              current
            )
          );
        trBody.appendChild(td);
      });
      tbody.appendChild(trBody);
      // console.log(agen)
    });
    table.appendChild(tbody);
    const prevTabla = document.createElement("div");
    prevTabla.className = "prevTabla";
    prevTabla.replaceChildren(table);
    // this.#initCalendario(data)
    containerTabla.appendChild(prevTabla);
    this.iniCalendar();

    return containerTabla;
  }
}
