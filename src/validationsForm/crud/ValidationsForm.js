import * as yup from "yup";

export default {
    async schemaCreate() {
        return yup.object().shape({
            name: yup.string().required().min(3).max(50),
            email: yup.string().required().email(),
            is_active: yup.boolean(),
        });
    },

    getErrorsFromYup({ arr, err }) {
        for (const key in arr) {
            arr[key] = [];
        }

        const { inner: errors } = err;
        if (errors) {
            for (const e of errors) {
                const { path, message } = e;
                if (!arr[path]) {
                    arr[path] = [message];
                } else {
                    arr[path].push(message);
                }
            }
        }

        return arr;
    },
};