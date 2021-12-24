import * as yup from "yup";

const schemaCreate = yup.object().shape({
    email: yup.string().email(),
    is_active: yup.boolean(),
});

console.log(schemaCreate);