export default {
    setEmployees(state, entries) {
        state.entries = entries;
    },
    setEmployeeById(state, employee) {
        state.employee = employee;
    },
};