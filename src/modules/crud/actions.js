export default {
    async SearchEmployees({ commit }) {
        return fetch("http://localhost/empleados/?list").then(async(response) => {
            const resp = await response.json();
            return new Promise((resolve, reject) => {
                response.ok ? resolve(resp) : reject(resp);
                commit("setEmployees", resp);
            });
        });
    },

    async SearchEmployeesByID({ commit }, id_employee) {
        return fetch(`http://localhost/empleados/?search=${id_employee}`).then(
            async(response) => {
                const resp = await response.json();
                return new Promise((resolve, reject) => {
                    response.ok ? resolve(resp) : reject(resp);
                    commit("setEmployeeById", resp[0]);
                });
            }
        );
    },

    async CreateEmployee({ commit }, sendData) {
        return fetch("http://localhost/empleados/?create=1", {
            method: "POST",
            body: JSON.stringify(sendData),
        }).then(async(response) => {
            const res = await response.json();
            return new Promise((resolve, reject) => {
                response.ok ? resolve(res) : reject(res);
                console.log(commit);
            });
        });
    },

    async UpdateEmployee({ commit }, sendData) {
        const { id } = sendData;
        console.log("fetchUpdate:", `http://localhost/empleados/?update=${id}`);

        return fetch(`http://localhost/empleados/?update=${id}`, {
            method: "POST",
            body: JSON.stringify(sendData),
        }).then(async(response) => {
            const resp = await response.json();

            return new Promise((resolve, reject) => {
                response.ok ? resolve(resp) : reject(resp);
                console.log(commit);
            });
        });
    },

    async DeleteEmployee({ commit }, idEmployee) {
        console.log("Commit", commit);
        return fetch(`http://localhost/empleados/?delete=${idEmployee}`).then(
            async(response) => {
                const res = await response.json();
                return new Promise((resolve, reject) => {
                    response.ok ? resolve(res) : reject(res);
                });
            }
        );
    },
};