export default {
    async SearchEmployees({ commit }) {
        try {
            const query = await fetch("http://localhost/empleados/");
            const resp = await query.json();
            // console.log("respose SearchEmployees", resp);
            commit("setEmployees", resp);
        } catch (error) {
            console.log(error);
        }
    },

    async SearchEmployeesByID({ commit }, id_employee) {
        const query = await fetch(
            `http://localhost/empleados/?search=${id_employee}`
        );
        const resp = await query.json();
        commit("setEmployees", resp[0]);
    },

    async CreateEmployee({ commit }, sendData) {
        console.log(sendData);
        const query = await fetch("http://localhost/empleados/?create=1", {
            method: "POST",
            body: JSON.stringify(sendData),
        });
        const resp = await query.json();

        console.log("respuesta", resp);
        commit("setEmployees", resp);
    },

    async UpdateEmployee({ commit }, sendData) {
        try {
            const { id } = sendData;
            const query = await fetch(`http://localhost/empleados/?update=${id}`, {
                method: "POST",
                body: JSON.stringify(sendData),
            });
            const resp = query.json();
            console.log(resp);
            console.log(commit);
        } catch (error) {
            console.log(error);
        }
    },

    async DeleteEmployee({ commit }, idEmployee) {
        try {
            const query = await fetch(
                `http://localhost/empleados/?delete=${+idEmployee}`
            );
            const resp = await query.json();
            console.log("Respuesta del action Delete", resp);
            console.log(commit);
        } catch (error) {
            console.log(error);
        }
    },
};