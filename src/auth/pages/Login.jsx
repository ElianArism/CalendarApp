import { useEffect } from "react";
import { useAuthStore, useForm } from "../../hooks";
import { usePopup } from "../../hooks/usePopup";
import "./login.css";

const loginForm = {
  email: "",
  password: "",
};

const registerForm = {
  username: "",
  email: "",
  password: "",
  repeatPwd: "",
};

export const Login = () => {
  const {
    email: loginEmail,
    password: loginPassword,
    onInputChange: onLoginFormInputChange,
    onResetForm: resetLoginForm,
  } = useForm(loginForm);

  const {
    username,
    email,
    password,
    repeatPwd,
    onInputChange: onRegisterFormInputChange,
    onResetForm: resetRegisterForm,
  } = useForm(registerForm);

  const { startLogin, startRegister, errorMessage, clearErrors } =
    useAuthStore();
  const { buildErrorPopup } = usePopup();

  const onLoginFormSubmit = async (event) => {
    event.preventDefault();

    await startLogin({
      email: loginEmail,
      password: loginPassword,
    });

    resetLoginForm();
  };

  const onRegisterFormSubmit = async (event) => {
    event.preventDefault();

    if (password !== repeatPwd) {
      buildErrorPopup("Passwords don't match.", clearErrors);
      return;
    }

    await startRegister({
      username,
      password,
      email,
    });

    resetRegisterForm();
  };

  useEffect(() => {
    if (!errorMessage) {
      return;
    }

    buildErrorPopup(errorMessage, clearErrors);
  }, [errorMessage, clearErrors, buildErrorPopup]);

  return (
    <div className="container login-container">
      <div className="row">
        <div className="col-md-6 login-form-1">
          <h3>Ingreso</h3>
          <form onSubmit={onLoginFormSubmit}>
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Correo"
                name="email"
                value={loginEmail}
                onChange={onLoginFormInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                name="password"
                value={loginPassword}
                onChange={onLoginFormInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="submit"
                className="btnSubmit"
                value="Login"
              />
            </div>
          </form>
        </div>

        <div className="col-md-6 login-form-2">
          <h3>Registro</h3>
          <form onSubmit={onRegisterFormSubmit}>
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Nombre"
                name="username"
                value={username}
                onChange={onRegisterFormInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="email"
                className="form-control"
                placeholder="Correo"
                name="email"
                value={email}
                onChange={onRegisterFormInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                name="password"
                value={password}
                onChange={onRegisterFormInputChange}
              />
            </div>

            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Repita la contraseña"
                name="repeatPwd"
                value={repeatPwd}
                onChange={onRegisterFormInputChange}
              />
            </div>

            <div className="form-group mb-2">
              <input
                type="submit"
                className="btnSubmit"
                value="Crear cuenta"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
