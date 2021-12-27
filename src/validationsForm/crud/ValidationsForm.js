import * as yup from "yup";

export const schemaCreateVal = yup.object().shape({
    name: yup.string().required().min(3).max(50),
    email: yup.string().required().email(),
    is_active: yup.boolean(),
});

export const getErrorsFromYup = ({ arr, err }) => {
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
    console.log("Result getErrorYUP", arr);
    return arr;
};