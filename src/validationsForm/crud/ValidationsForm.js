import * as yup from "yup";

const nameRegExp = new RegExp("[^a-zA-ZñÑ\\s]+", "gs");

// yup.addMethod(yup.string, "name", () => {
//     return this.test("name", (value) => {
//         const { path, createError } = this;

//         const valid = nameRegExp.test(value);
//         if (!valid) {
//             return createError({
//                 path,
//                 params: {
//                     reference: path,
//                     type: "name",
//                 },
//             });
//         }
//         return true;
//     });
// });

// yup.addMethod(yup.string, "name", function(formats, parseStrict) {
//     return this.transform(function(value, originalValue) {
//         if (this.isType(value)) return value;

//         value = Moment(originalValue, formats, parseStrict);

//         return value.isValid() ? value.toDate() : new Date("");
//     });
// });

export const schemaCreate = yup.object().shape({
    name: yup
        .string()
        .required()
        .min(3)
        .max(50)
        .test("name", "Name contain numbers", (value) => !nameRegExp.test(value)),
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