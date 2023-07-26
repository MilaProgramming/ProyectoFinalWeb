import React from 'react'
import "../styles/cv.css"

export default function Login() {


    return (
        <section className='login'>
            <div className="form-box">
                <div className="form-value">
                    <form action="" id='formulario'>

                        <h2>Datos Personales</h2>

                        <div className="inputbox">
                            <ion-icon name="lock-closed-outline"></ion-icon>
                            <input type="text" required />
                            <label htmlFor="">Nombre</label>
                        </div>

                        <div className="inputboxsecondname">
                            <ion-icon name="lock-closed-outline"></ion-icon>
                            <input type="text" required />
                            <label htmlFor="">Apellido</label>
                        </div>

                        <div className="inputbox">
                            <ion-icon name="lock-closed-outline"></ion-icon>
                            <input type="text" required />
                            <label htmlFor="">CI</label>
                        </div>

                        <div className="selectbox">
                            <ion-icon name="lock-closed-outline"></ion-icon>
                            <label htmlFor="sexo">Sexo</label>
                            <select id="sexo" required>
                                <option value="">Selecciona una opción</option>
                                <option value="male">Masculino</option>
                                <option value="female">Femenino</option>
                            </select>
                        </div>

                        <div className="selectbox">
                            <ion-icon name="lock-closed-outline"></ion-icon>
                            <label htmlFor="civilstate">Estado Civil</label>
                            <select id="civilstate" required>
                                <option value="">Selecciona una opción</option>
                                <option value="single">Soltero</option>
                                <option value="married">Casado</option>
                                <option value="divorce">Divorciado</option>
                                <option value="freeunion">Union Libre</option>
                            </select>
                        </div>
                        <button>Editar</button>

                    </form>

                    <div id='login-button'>

                    </div>

                </div>
            </div>
        </section>
    )
}
