import React from 'react';
import ReactDOM from 'react-dom';

import Top from '../src/components/top/top';



const App = () => {
  
  return (
    <div>
      <Top/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))