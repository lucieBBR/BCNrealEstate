import React, { Component } from 'react';

import PropertiesMap from './components/PropertiesMap';

class App extends Component {
    render() { 
        return (
            <React.Fragment>
                <div> Properties App</div>
                <PropertiesMap />
            </React.Fragment>
        );
    }
}

export default App;