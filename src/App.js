import React, { Component } from 'react';
import PropertiesMap from './components/PropertiesMap';
import Navbar from './components/Navbar';
import Hero from './components/Hero'

class App extends Component {
    
    render() { 
        return (
            <div className='App'>
            <React.Fragment>
                <Navbar />
                <Hero />
                <PropertiesMap />
            </React.Fragment>
            <div className='footer'>
            <p> Made by Lucie Baborová for Nomoko </p>
            </div>
          </div>
        );
    }
}

export default App;