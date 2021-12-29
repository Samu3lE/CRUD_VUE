export default {
    async SearchEmployees({ commit }) {
        return fetch("https://crud-vue-test.herokuapp.com/?list").then(
            async(response) => {
                const resp = await response.json();

                return new Promise((resolve, reject) => {
                    response.ok ? resolve(resp) : reject(resp);
                    commit("setEmployees", resp);
                });
            }
        );
    },

    async SearchEmployeesByID({ commit }, id_employee) {
        try {
            return fetch(
                `https://crud-vue-test.herokuapp.com/?search=${id_employee}`
            ).then(async(response) => {
                const resp = await response.json();
                return new Promise((resolve, reject) => {
                    response.ok ? resolve(resp) : reject(resp);
                    commit("setEmployeeById", resp);
                });
            });
        } catch (error) {
            console.log(error);
        }
    },

    async CreateEmployee({ commit }, sendData) {
        return fetch("https://crud-vue-test.herokuapp.com/?create=1", {
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

        return fetch(`https://crud-vue-test.herokuapp.com/?update=${id}`, {
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
        return fetch(
            `https://crud-vue-test.herokuapp.com/?delete=${idEmployee}`
        ).then(async(response) => {
            const res = await response.json();
            return new Promise((resolve, reject) => {
                response.ok ? resolve(res) : reject(res);
            });
        });
    },
};