import React, {useContext, useEffect} from "react"
import {Context} from "../store/appContext"
import { Link } from "react-router-dom";

export const Card = ()=>{

const {store, actions} = useContext(Context)

useEffect(()=>{
    actions.cargarContactos()
},[]);

return(
<>
{store.contactos.map((contacto, index) =>{
 return(
  <div className="card mb-3"id="carta" key={contacto.id}>
    <div className="row g-0">
      <div className="col-md-2">
        <img src="https://cdn-icons-png.flaticon.com/512/3135/3135768.png" className="foto"/>
      </div>
      <div className="col-md-8">
        <div className="card-body">
          <h5 className="name">{contacto.name}</h5>
          <p className="card-text">{contacto.email}</p>
          <p className="card-text"><small className="text-muted">{contacto.phone}</small></p>
          <p className="card-text"><small className="text-muted">{contacto.address}</small></p>
        </div>
      </div>
      <div className="col-md-2">
        <div className="icons-container">
          <i className="fas fa-pen"id="lapiz"></i>
          <i className="fas fa-times" onClick={()=>actions.borrarContacto(contacto.id)}></i>
        </div>
      </div>
    </div>
  </div>)
})
}
  <div className="añadirC">
    <Link to="/demo">
    <button type="button" className="btn btn-primary">Agregar nuevo contacto</button>
    </Link>
  </div>
</>)
}