import React, { Component } from 'react';
import Header from './components/Header';
import Formulario from './components/Formulario';
import Eventos from './components/Eventos';


class App extends Component {

  token = 'XHUGBHGVLPJ2XI3K3C7U';

  state = {
    categorias: [],
    eventos: []
  }

  componentDidMount(){
    this.obtenerCategorias();
  }

  obtenerCategorias = async() =>{
    let url = `https://www.eventbriteapi.com/v3/categories/?token=${this.token}&locale=es_ES`
  
    await fetch(url)
    .then(respuesta =>{
      return respuesta.json()
    })
    .then(categorias =>{
      this.setState({
        categorias: categorias.categories
      })
    })
  }

  obtenerEventos = async(busqueda) =>{
    let url= `https://www.eventbriteapi.com/v3/events/search/?q=${busqueda.nombre}&sort_by=date&categories=${busqueda.categoria}&token=${this.token}&locale=es_ES`

    await fetch(url)
    .then(respuesta =>{
      return respuesta.json()
    })
    .then(eventos =>{
      this.setState({
        eventos: eventos.events
      })
    })
  }

  render() {
    return (
      <div className="App">
        <Header/>
        <div className="uk-container">
          <Formulario
            categorias={this.state.categorias}
            obtenerEventos={this.obtenerEventos}
          />
          <Eventos 
          eventos = {this.state.eventos}
          />
        </div>
      </div>
    );
  }
}

export default App;
