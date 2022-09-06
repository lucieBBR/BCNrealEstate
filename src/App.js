import React, { Component } from 'react';

import PropertiesMap from './components/PropertiesMap';
import Navbar from './components/Navbar';

class App extends Component {
    render() { 
        return (
            <React.Fragment>
                <Navbar />
                <PropertiesMap />
            </React.Fragment>
        );
    }
}

export default App;