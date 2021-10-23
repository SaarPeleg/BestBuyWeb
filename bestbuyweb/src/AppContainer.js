import './App.css';
import PaginationComponent from './PaginationComponent';
import DetailsComponent from './DetailsComponent';
import React, { useState, useEffect } from 'react';

function AppContainer() {
  const [tname, setTname] = useState('');
  const [timg, setTimg] = useState('');
  const [tdescription, setTdescription] = useState('');
  const [tprice, setTprice] = useState(0);
  const [tsku, setTsku] = useState('');
  const [refresh,setrefresh]=useState('');
  return (
    <div className="container">
      <div className="left" >
        <PaginationComponent 
        setTname={setTname} 
        setTsku={setTsku}
        setTimg={setTimg}
        setTdescription={setTdescription}
        setTprice={setTprice}
        />
      </div>
      <div className="right">
        <DetailsComponent
          name={tname}
          sku={tsku}
          img={timg}
          description={tdescription}
          price={tprice}
        />
      </div>
    </div>
  );
}

export default AppContainer;
