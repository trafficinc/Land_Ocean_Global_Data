import React, { useEffect,useState } from 'react';
import * as d3 from "d3";
import './App.css';
import Accordion from './Accordion/index';
import Toggle from './Accordion/Toggle/index';
import Collapse from './Accordion/Collapse/index';

import Card from './Card/index';
import CardHeader from './Card/CardHeader';
import CardBody from './Card/CardBody';

import Chart from './Chart';

function App() {


  const [activeEventKey, setActiveEventKey] = useState(0);

  const content = [
    {
      title: 'Header Text',
      body: ``
    },
    {
      title: 'This is Long Header Text',
      body: ``
    }];

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    d3.json("https://www.ncdc.noaa.gov/cag/global/time-series/globe/land_ocean/1/10/1880-2020/data.json").then((d) => {
      //console.log(d);
      setData(d);
      setLoading(false);
    });
    return () => undefined;
  }, []);


  return (
    <div className="App container">


 <div className="row">
  <div className="col-sm-12">

          {/* <Chart data={data} /> */}
           {loading && <div>loading...</div>}
          {!loading &&  <Chart data={data} /> }


  </div>
</div>

 <div className="row">



        <div className="col-sm-12 d-lg-none">


          <Accordion activeEventKey={activeEventKey} onToggle={setActiveEventKey}>
            {content.map(({ title, body }, index) => (
              <Card key={index}>
                <Toggle element={CardHeader} eventKey={index}>
                  {title}
                  {activeEventKey !== index && <span className="down-caret">v</span>}
                  {activeEventKey === index && <span>&#94;</span>}
                </Toggle>
                <Collapse eventKey={index} element={CardBody}>
                  {body}
                  <strong>Package Includes:</strong>
                  <ul>
                    <li>Item Name</li>
                    <li>Item Name</li>
                    <li>Item Name</li>
                    <li>Item Name</li>
                    <li>Item Name</li>
                    <li>Item Name</li>
                    <li>Item Name</li>
                  </ul>
                  <a href="#" className="btn btn-primary">BUTTON</a>
                </Collapse>
              </Card>
            ))}
          </Accordion>


        </div>




        <div className="col-sm-6 d-none d-lg-block">

<div className="card">
  <div className="card-body">
    <h5 className="card-title">Header Text</h5>
              <hr />
    <div className="card-text">
    <strong>Package Includes:</strong>
      <ul>
        <li>Item Name</li>
        <li>Item Name</li>
        <li>Item Name</li>
        <li>Item Name</li>
        <li>Item Name</li>
        <li>Item Name</li>
        <li>Item Name</li>
      </ul>
      </div>
    <a href="#" className="btn btn-primary">BUTTON</a>
  </div>
</div>


  </div>
        <div className="col-sm-6 d-none d-lg-block">

<div className="card">
  <div className="card-body">
    <h5 className="card-title">Header Text</h5>
    <hr />
    <div className="card-text">
                <strong>Package Includes:</strong>
      <ul>
        <li>Item Name</li>
        <li>Item Name</li>
        <li>Item Name</li>
        <li>Item Name</li>
        <li>Item Name</li>
        <li>Item Name</li>
        <li>Item Name</li>
      </ul>
    </div>
    <a href="#" className="btn btn-primary">BUTTON</a>
  </div>
</div>

  </div>
</div>


    </div>
  );
}

export default App;
