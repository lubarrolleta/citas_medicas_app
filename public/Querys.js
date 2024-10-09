// import {CitasMedicas} from "./javascript.js?ramdon=9"

export class Querys{
    #urlCitas = "http://localhost/agendamiento_citas/citas/"
    constructor(){

    }
    async getPacientes(reload,currentDateParam) {
        try {
            const url = "http://localhost/agendamiento_citas/pacientes/"
            const params = {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                    "x-type":"pacientes",
    
                },
                body: null,
              };
              const getData = await this.#cutomFetch(url,params);
          if (!getData.error) {
            const prevData = this.#purificaDataPaciente(getData);
          
            reload.reload && reload.reload(prevData,reload.button,currentDateParam);
            reload.reloadCitas && reload.reloadCitas(prevData,reload.button,reload.medicos,reload.renderCitas,reload.paciente,reload.renderGen)
           
          }
        } catch (error) {
            console.error(error,"getpacientes");
            return undefined;
        }
      }
    async deleteCita(data,id){
        try {
            // const 
            const url = this.#urlCitas;
            const params = {
              method: "DELETE",
              headers: {
                // "Content-Type": "application/x-www-form-urlencoded",
                "Content-Type": "application/json",

                "x-type": id,
              },
            //   body: JSON.stringify(data),
            };
            const consulta = await this.#cutomFetch(url, params);
            return consulta;
        } catch (error) {
            console.error(error,"error-update cita");
            return undefined;
        }
    }
    async updateCita(data,id){
        try {
            // const 
            const url = this.#urlCitas;
            const params = {
              method: "PUT",
              headers: {
                // "Content-Type": "application/x-www-form-urlencoded",
                "Content-Type": "application/json",

                "x-type": id,
              },
              body: JSON.stringify(data),
            };
            const consulta = await this.#cutomFetch(url, params);
            return consulta;
        } catch (error) {
            console.error(error,"error-update cita");
            return undefined;
        }
    }
    async #cutomFetch(url,params) {
        try {
            console.log(url);
          const paramsTemp = {
            ...params,
            headers: {
              ...params?.headers,
            },
            // body: body
          };
    
          const consulta = await fetch(url, paramsTemp);
          const result = await consulta.json();
          return result;
        } catch (error) {
          console.error(error, "Error");
          return undefined;
        }
      }
      #purificaDataPaciente(data) {
        const prevData = JSON.parse(JSON.stringify(data)).reduce((acc, paciente) => {
            acc[paciente.idPaciente] = {
              ...paciente,
              ["citas"]: JSON.parse(JSON.stringify(data)).filter((m) => {
                if (m.id_paciente === paciente.idPaciente) {
                  m.id_turno = Number(m.id_turno)
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
          }, []);
          return prevData.filter(c=>c !== 'empty')
      }
}