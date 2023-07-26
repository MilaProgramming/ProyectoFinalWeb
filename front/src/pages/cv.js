import React from 'react'
import "../styles/cv.css"

export default function CV() {


    return (
        <section className='cv'>
            <div className="form-box1">
                <div className="form-value1">
                    <form action="" id='formulario1'>

                        <h2>Datos Personales</h2>

                        <div className="inputbox1">
                            <ion-icon name="lock-closed-outline"></ion-icon>
                            <input type="text" required />
                            <label htmlFor="">Nombre</label>
                        </div>

                        <div className="inputbox1">
                            <ion-icon name="lock-closed-outline"></ion-icon>
                            <input type="text" required />
                            <label htmlFor="">Nacionalidad</label>
                        </div>
                        
                        <div className="inputboxsecondname1">
                            <ion-icon name="lock-closed-outline"></ion-icon>
                            <input type="text" required />
                            <label htmlFor="">Apellido</label>
                        </div>

                        <div className="inputboxCI1">
                            <ion-icon name="lock-closed-outline"></ion-icon>
                            <input type="text" required />
                            <label htmlFor="">CI</label>
                        </div>

                        <div className="selectbox1">
                            <ion-icon name="lock-closed-outline"></ion-icon>
                            <label htmlFor="sexo">Sexo</label>
                            <select id="sexo" required>
                                <option value="">Selecciona una opción</option>
                                <option value="male">Masculino</option>
                                <option value="female">Femenino</option>
                            </select>
                        </div>

                        <div className="selectbox1">
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

                </div>
            </div>
        </section>
    )
}
