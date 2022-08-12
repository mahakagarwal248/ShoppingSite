import joi from "joi";

export default {
  createUser: joi.object({
    body: {
      name: joi.string().max(25).required(),
      email: joi.string().email().required(),
      password: joi.string().min(6).required(),
      mobile: joi
        .string()
        .length(10)
        .required()
        .regex(/^[0-9]*$/),
      address: joi.string(),
      securityQues: joi.string().required(),
      securityAns: joi.string().required(),
    },
  }),
  loginUser: joi.object({
    body: {
      email: joi.string().email().required(),
      password: joi.string().min(6).required(),
    },
  }),
  getSecurityQuestion: joi.object({
    params: {
      email: joi.string().email().required(),
    },
  }),
  forgotPassword: joi.object({
    body: {
      email: joi.string().email().required(),
      ans: joi.string().required(),
    },
  }),
  changePassword: joi.object({
    body:{
        email: joi.string().email().required(),
      newPW: joi.string().required(),
    }
  })
};
