import React, { useState } from 'react';
import './App.css';
import footerLogo from './footer-logo.png'
import { formatNumber, removeCommas } from './numberFormat.js';

const Calculator = require('./calculator.js');

function App() {
  const [inputs, setInputs] = useState({
    gasRate: '',
    gasMW: '',
    oilRate: '',
    oilDensity: '',
    waterRate: '',
    waterDensity: '',
    separatorPressure: '',
    separatorTemperature: '',
    separatorDiameter: '',
    wallThickness: '',
    separatorHeight: '',
    gasOutletOuterDiameter: '',
    gasOutletInnerDiameter: '',
    gasOutletElevation: '',
    HCOutletOuterDiameter: '',
    HCOutletInnerDiameter: '',
    HCOutletElevation: '',
    vesselInletOuterDiameter: '',
    vesselInletInnerDiameter: '',
    vesselInletElevation: '',
    waterOutletOuterDiameter: '',
    waterOutletInnerDiameter: '',
    waterOutletElevation: '',
    HLSDElevation: ''
  });

  const [selectedTab, setSelectedTab] = useState(0);
  
  const [tabs, setTabs] = useState([]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    // ensure the number is valid and format it to be more readable
    let result = formatNumber(value); 

    setInputs({ ...inputs, [name]: result });
  };

  const handleClearAll = () => {
    setInputs({
      gasRate: '',
      gasMW: '',
      oilRate: '',
      oilDensity: '',
      waterRate: '',
      waterDensity: '',
      separatorPressure: '',
      separatorTemperature: '',
      separatorDiameter: '',
      wallThickness: '',
      separatorHeight: '',
      gasOutletOuterDiameter: '',
      gasOutletInnerDiameter: '',
      gasOutletElevation: '',
      HCOutletOuterDiameter: '',
      HCOutletInnerDiameter: '',
      HCOutletElevation: '',
      vesselInletOuterDiameter: '',
      vesselInletInnerDiameter: '',
      vesselInletElevation: '',
      waterOutletOuterDiameter: '',
      waterOutletInnerDiameter: '',
      waterOutletElevation: '',
      HLSDElevation: ''
  });
  };

  const handleCalculate = () => {
    // ensure the inputs are not empty 
    const inputTuples = Object.entries(inputs);
    let emptyFields = []
    let inputNumbers = {}
    inputTuples.forEach(([key, value]) => {
      if (value === '') {
        emptyFields.push(key);
      } else {
        inputNumbers[key] = removeCommas(value);
      }

    });
    // TODO fix the empty field problem
    //console.log(emptyFields);
    console.log(inputNumbers);

    const results = new Calculator(inputNumbers);

    const tabData = {
      userInput: {...inputNumbers},
      calcResults: {...results}
    };

    console.log(tabData);

    setTabs([...tabs, tabData]);
  };


  const selectTab = (index) => {
    setSelectedTab(index);
  }

  const removeTab = (index) => {
    console.log(tabs);
  }

  return (
    <div className='App'>
      <div className='header'> 
        <h1>Separator Sizing </h1>
      </div>
      <div className='input-section'>
        <div className='row-container'> 

          <div className='input-grouping'>
            <span className='input-header'>Gas Properties</span>
            <div className='input'> 
              <p>Gas rate [Sm<sup>3</sup>/day]:</p>
              <input
                className='input-field'
                name='gasRate'
                type='decimal'
                value={inputs.gasRate}
                onChange={handleInputChange}
              />
            </div>

            <div className='input'> 
              <p>Gas [MW]:</p>
              <input
                className='input-field'
                name='gasMW'
                type='decimal'
                value={inputs.gasMW}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className='input-grouping'>
            <span className='input-header'>Oil Properties</span>
            <div className='input'>
              <p>Oil rate [m<sup>3</sup>/day]:</p>
              <input
                className='input-field'
                name='oilRate'
                type='decimal'
                value={inputs.oilRate}
                onChange={handleInputChange}
              />
            </div>

            <div className='input'> 
              <p>Oil density [kg/m<sup>3</sup>]:</p>
              <input
                className='input-field'
                name='oilDensity'
                type='decimal'
                value={inputs.oilDensity}
                onChange={handleInputChange}
              />
            </div>
          </div>
            
          <div className='input-grouping'>
            <span className='input-header'>Water Properties</span>
            <div className='input'> 
              <p>Water rate [m<sup>3</sup>/day]:</p>
              <input
                className='input-field'
                name='waterRate'
                type='decimal'
                value={inputs.waterRate}
                onChange={handleInputChange}
              />
            </div>

            <div className='input'> 
              <p>Water density [kg/m<sup>3</sup>]:</p>
              <input
                className='input-field'
                name='waterDensity'
                type='decimal'
                value={inputs.waterDensity}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
      
        <div className='row-container'> 
          <div className='input-grouping'>
            <span className='input-header'>Separator Properties</span>
            <div className='row-container'>
              <div className='input'> 
                <p>Separator Outer Diameter [mm]:</p>
                <input
                  className='input-field'
                  name='separatorDiameter'
                  type='decimal'
                  value={inputs.separatorDiameter}
                  onChange={handleInputChange}
                />
              </div>

              <div className='input'> 
                <p>Wall thickness [mm]:</p>
                <input
                  className='input-field'
                  name='wallThickness'
                  type='decimal'
                  value={inputs.wallThickness}
                  onChange={handleInputChange}
                />
              </div>

              <div className='input'> 
                <p>Separator height (seam-seam) [mm]:</p>
                <input
                  className='input-field'
                  name='separatorHeight'
                  type='decimal'
                  value={inputs.separatorHeight}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className='row-container'>
              <div className='input'> 
                <p>Separator operating pressure [kPag]:</p>
                <input
                  className='input-field'
                  name='separatorPressure'
                  type='decimal'
                  value={inputs.separatorPressure}
                  onChange={handleInputChange}
                />
              </div>

              <div className='input'> 
                <p>Separator operating temperature [<sup>o</sup>C]:</p>
                <input
                  className='input-field'
                  name='separatorTemperature'
                  type='decimal'
                  value={inputs.separatorTemperature}
                  onChange={handleInputChange}
                />
              </div>
            </div>

          </div>
        </div>
          
        <div className='row-container'> 
          <div className='input-grouping'>
            <span className='input-header'>Gas Outlet Nozzle Dimensions</span>
            <div className='input'> 
              <p>Outer diameter [mm]:</p>
              <input
                className='input-field'
                name='gasOutletOuterDiameter'
                type='decimal'
                value={inputs.gasOutletOuterDiameter}
                onChange={handleInputChange}
              />
            </div>

            <div className='input'> 
              <p>Inner diameter [mm]:</p>
              <input
                className='input-field'
                name='gasOutletInnerDiameter'
                type='decimal'
                value={inputs.gasOutletInnerDiameter}
                onChange={handleInputChange}
              />
            </div>

            <div className='input'> 
              <p>Elevation [mm]:</p>
              <input
                className='input-field'
                name='gasOutletElevation'
                type='decimal'
                value={inputs.gasOutletElevation}
                onChange={handleInputChange}
              />
            </div>

          </div>

          <div className='input-grouping'>
            <span className='input-header'>HC Outlet Nozzle Dimensions</span>
            <div className='input'> 
              <p>Outer diameter [mm]:</p>
              <input
                className='input-field'
                name='HCOutletOuterDiameter'
                type='decimal'
                value={inputs.HCOutletOuterDiameter}
                onChange={handleInputChange}
              />
            </div>

            <div className='input'> 
              <p>Inner diameter [mm]:</p>
              <input
                className='input-field'
                name='HCOutletInnerDiameter'
                type='decimal'
                value={inputs.HCOutletInnerDiameter}
                onChange={handleInputChange}
              />
            </div>

            <div className='input'> 
              <p>Elevation [mm]:</p>
              <input
                className='input-field'
                name='HCOutletElevation'
                type='decimal'
                value={inputs.HCOutletElevation}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className='input-grouping'>
            <span className='input-header'>Vessel Inlet Nozzle Dimensions</span>
            <div className='input'> 
              <p>Outer diameter [mm]:</p>
              <input
                className='input-field'
                name='vesselInletOuterDiameter'
                type='decimal'
                value={inputs.vesselInletOuterDiameter}
                onChange={handleInputChange}
              />
            </div>

            <div className='input'> 
              <p>Inner diameter [mm]:</p>
              <input
                className='input-field'
                name='vesselInletInnerDiameter'
                type='decimal'
                value={inputs.vesselInletInnerDiameter}
                onChange={handleInputChange}
              />
            </div>

            <div className='input'> 
              <p>Elevation [mm]:</p>
              <input
                className='input-field'
                name='vesselInletElevation'
                type='decimal'
                value={inputs.vesselInletElevation}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className='input-grouping'>
            <span className='input-header'>Water Outlet Nozzle Dimensions</span>
            <div className='input'> 
              <p>Outer diameter [mm]:</p>
              <input
                className='input-field'
                name='waterOutletOuterDiameter'
                type='decimal'
                value={inputs.waterOutletOuterDiameter}
                onChange={handleInputChange}
              />
            </div>

            <div className='input'> 
              <p>Inner diameter [mm]:</p>
              <input
                className='input-field'
                name='waterOutletInnerDiameter'
                type='decimal'
                value={inputs.waterOutletInnerDiameter}
                onChange={handleInputChange}
              />
            </div>

            <div className='input'> 
              <p>Elevation [mm]:</p>
              <input
                className='input-field'
                name='waterOutletElevation'
                type='decimal'
                value={inputs.waterOutletElevation}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        <div className='row-container'> 
          <div className='input-grouping'>
            <div className='input'> 
              <p>Elevation of HLSD [mm]:</p>
              <input
                className='input-field'
                name='HLSDElevation'
                type='decimal'
                value={inputs.HLSDElevation}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

      </div>

      <div className='row-container'>
        <button className='clear-all-button' onClick={handleClearAll}>Clear All</button>
        <button className='show-button' onClick={handleClearAll}>Show Nozzle Sizing</button>
        <button className='show-button' onClick={handleClearAll}>Show Compressability Table</button>
        <button className='calculate-button' onClick={handleCalculate}>Calculate</button>
      </div>

      <div className='result-section'>

        <div className='tabs-top'> 
          {tabs.map((tab, index) => (
            <button 
            onClick={() => selectTab(index)} 
            key={`tab-${index}`}
            className={selectedTab === index ? 'tab-header tab-selected' : 'tab-header'}
            >result {index + 1}
            </button>
          ))}
        </div>
        

        {tabs.map((tab, index) => (
          <div 
          key={`content-${index}`}
          className={selectedTab === index ? 'tab-content tab-content-active' : 'tab-content'}>
            <div className='content-header'> 
              <span className='header-text'>Inputs</span>
              <span className='header-text'>Results</span>
            </div>
            <div className='content-body'>
              <div className='content'> 
                <div className='input-col'>

                  <div className='result-group'>
                    <span className='result-header'>Gas Properties</span>
                    <div className='result-row'>
                      <span className='result-text left'>Gas rate:</span> 
                      <span className='result-text right'> {tab.userInput.gasRate} Sm<sup>3</sup>/day</span>
                    </div>
                    <div className='result-row'>
                      <span className='result-text left'>Gas: </span> 
                      <span className='result-text right'> {tab.userInput.gasMW} MW</span>
                    </div>
                  </div>

                  <div className='result-group'>
                    <span className='result-header'>Oil Properties</span>
                    <div className='result-row'>
                      <span className='result-text left'>Oil rate: </span> 
                      <span className='result-text right'> {tab.userInput.oilRate} m<sup>3</sup>/day</span>
                    </div>
                    <div className='result-row'>
                      <span className='result-text left'>Oil density: </span> 
                      <span className='result-text right'> {tab.userInput.oilDensity} kg/m<sup>3</sup></span>
                    </div>
                  </div>

                  <div className='result-group'>
                    <span className='result-header'>Water Properties</span>
                    <div className='result-row'>
                      <span className='result-text left'>Water rate: </span> 
                      <span className='result-text right'> {tab.userInput.waterRate} m<sup>3</sup>/day</span>
                    </div>
                    <div className='result-row'>
                      <span className='result-text left'>Water density: </span> 
                      <span className='result-text right'> {tab.userInput.waterDensity} kg/m<sup>3</sup></span>
                    </div>
                  </div>

                  <div className='result-group'>
                    <span className='result-header'>Gas Outlet Nozzle Dimensions</span>
                    <div className='result-row'>
                      <span className='result-text left'>Outer diameter: </span> 
                      <span className='result-text right'> {tab.userInput.gasOutletOuterDiameter} mm</span>
                    </div>
                    <div className='result-row'>
                      <span className='result-text left'>Inner diameter: </span> 
                      <span className='result-text right'> {tab.userInput.gasOutletInnerDiameter} mm</span>
                    </div>
                    <div className='result-row'>
                      <span className='result-text left'>Elevation: </span> 
                      <span className='result-text right'> {tab.userInput.gasOutletElevation} mm</span>
                    </div>
                  </div>

                  <div className='result-group'>
                    <span className='result-header'>HC Outlet Nozzle Dimensions</span>
                    <div className='result-row'>
                      <span className='result-text left'>Outer diameter: </span> 
                      <span className='result-text right'> {tab.userInput.HCOutletOuterDiameter} mm</span>
                    </div>
                    <div className='result-row'>
                      <span className='result-text left'>Inner diameter: </span> 
                      <span className='result-text right'> {tab.userInput.HCOutletInnerDiameter} mm</span>
                    </div>
                    <div className='result-row'>
                      <span className='result-text left'>Elevation: </span> 
                      <span className='result-text right'> {tab.userInput.HCOutletElevation} mm</span>
                    </div>
                  </div>

                </div>

                <div className='input-col'>
                  <div className='result-group '>
                    <span className='result-header'>Separator Properties</span>
                    <div className='result-row'>
                      <span className='result-text left'>Separator Outer Diameter: </span> 
                      <span className='result-text right'> {tab.userInput.separatorDiameter} mm</span>
                    </div>
                    <div className='result-row'>
                      <span className='result-text left'>Wall thickness: </span> 
                      <span className='result-text right'> {tab.userInput.wallThickness} mm</span>
                    </div>
                    <div className='result-row'>
                      <span className='result-text left'>Separator height (seam-seam): </span> 
                      <span className='result-text right'> {tab.userInput.separatorHeight} mm</span>
                    </div>
                    <div className='result-row'>
                      <span className='result-text left'>Separator operating pressure: </span> 
                      <span className='result-text right'> {tab.userInput.separatorPressure} kPag</span>
                    </div>
                    <div className='result-row'>
                      <span className='result-text left'>Separator operating temperature: </span> 
                      <span className='result-text right'> {tab.userInput.separatorTemperature}<sup>o</sup>C</span>
                    </div>
                  </div>
                  <div className='result-group'>
                    <span className='result-header'>Vessel Inlet Nozzle Dimensions</span>
                    <div className='result-row'>
                      <span className='result-text left'>Outer diameter: </span> 
                      <span className='result-text right'> {tab.userInput.vesselInletOuterDiameter} mm</span>
                    </div>
                    <div className='result-row'>
                      <span className='result-text left'>Inner diameter: </span> 
                      <span className='result-text right'> {tab.userInput.vesselInletInnerDiameter} mm</span>
                    </div>
                    <div className='result-row'>
                      <span className='result-text left'>Elevation: </span> 
                      <span className='result-text right'> {tab.userInput.vesselInletElevation} mm</span>
                    </div>
                  </div>
                  
                  <div className='result-group'>
                    <span className='result-header'>Water Outlet Nozzle Dimensions</span>
                    <div className='result-row'>
                      <span className='result-text left'>Outer diameter: </span> 
                      <span className='result-text right'> {tab.userInput.waterOutletOuterDiameter} mm</span>
                    </div>
                    <div className='result-row'>
                      <span className='result-text left'>Inner diameter: </span> 
                      <span className='result-text right'> {tab.userInput.waterOutletInnerDiameter} mm</span>
                    </div>
                    <div className='result-row'>
                      <span className='result-text left'>Elevation: </span> 
                      <span className='result-text right'> {tab.userInput.waterOutletElevation} mm</span>
                    </div>
                  </div>
                  
                  <div className='result-group'>
                    <div className='result-row'>
                      <span className='result-text left'>Elevation of HLSD: </span> 
                      <span className='result-text right'> {tab.userInput.HLSDElevation} mm</span>
                    </div>
                  </div>
                </div>
              </div>


              <div className='content'>
                <div className='input-col'>

                  <div className='result-group'>
                    <span className='result-header'>Oil Retention Time</span>
                    <div className='result-row'>
                      <span className='result-text left'>Height of seal layer above HC out nozzle: </span> 
                      <span className='result-text right'> {tab.calcResults.sealLayerHeighAboveHCOutlet.toFixed(4)} mm</span>
                    </div>
                    <div className='result-row'>
                      <span className='result-text left'>Vessel oil volume: </span> 
                      <span className='result-text right'> {tab.calcResults.vesselOilVolume.toFixed(4)} m<sup>3</sup></span>
                    </div>
                    <div className='result-row'>
                      <span className='result-text left'>Oil retention time: </span> 
                      <span className='result-text right'> {tab.calcResults.oilRetentionTime.toFixed(4)} minutes</span>
                    </div>
                  </div>

                  <div className='result-group'>
                    <span className='result-header'>Water Retention Time</span>
                    <div className='result-row'>
                      <span className='result-text left'>Height of seal layer above water in nozzle: </span> 
                      <span className='result-text right'> {tab.calcResults.sealLayerHeightAboveWaterOutlet.toFixed(4)} mm</span>
                    </div>
                    <div className='result-row'>
                      <span className='result-text left'>Vessel water volume: </span> 
                      <span className='result-text right'> {tab.calcResults.vesselWaterVolume.toFixed(4)} m<sup>3</sup></span>
                    </div>
                    <div className='result-row'>
                      <span className='result-text left'>Water retention time: </span> 
                      <span className='result-text right'> {tab.calcResults.waterRetentionTime.toFixed(4)} minutes</span>
                    </div>
                  </div>

                  <div className='result-group'>
                    <span className='result-header'>Vessel Data</span>
                    <div className='result-row'>
                      <span className='result-text left'>Vessel inner diameter: </span> 
                      <span className='result-text right'> {tab.calcResults.vesselInnerDiameter.toFixed(4)} mm</span>
                    </div>
                    <div className='result-row'>
                      <span className='result-text left'>Vessel cross-sectional area: </span> 
                      <span className='result-text right'> {tab.calcResults.vesselCrossSectionArea.toFixed(4)} mm<sup>2</sup></span>
                    </div>
                    <div className='result-row'>
                      <span className='result-text left'>Gas velocity in vessel: </span> 
                      <span className='result-text right'> {tab.calcResults.gasVelocityInVessel.toFixed(4)} m/s</span>
                    </div>
                    <div className='result-row'>
                      <span className='result-text left'>Q<sub>g</sub> at separator conditions: </span> 
                      <span className='result-text right'> {tab.calcResults.QgSeparator.toFixed(4)} m<sup>3</sup>/d</span>
                    </div>
                  </div>

                  <div className='result-group'>
                    <span className='result-header'>Rates</span>
                    <div className='result-row'>
                      <span className='result-text left'>Gas rate: </span> 
                      <span className='result-text right'> {tab.calcResults.gasRate.toFixed(4)} kg/day</span>
                    </div>
                    <div className='result-row'>
                      <span className='result-text left'>Oil rate: </span> 
                      <span className='result-text right'> {tab.calcResults.oilRate.toFixed(4)} kg/day</span>
                    </div>
                    <div className='result-row'>
                      <span className='result-text left'>Emulsion density: </span> 
                      <span className='result-text right'> {tab.calcResults.emulsionDensity.toFixed(4)} kg/m<sup>3</sup></span>
                    </div>
                    <div className='result-row'>
                      <span className='result-text left'>Water rate: </span> 
                      <span className='result-text right'> {tab.calcResults.waterRate.toFixed(4)} kg/day</span>
                    </div>
                  </div>
                </div>

                <div className='input-col'>

                  <div className='result-group'>
                    <span className='result-header'>Inlet Nozzle</span>
                    <div className='result-row'>
                      <span className='result-text left'>Mixture density: </span> 
                      <span className='result-text right'> {tab.calcResults.inletNozzleMixtureDensity.toFixed(4)} kg/m<sup>3</sup></span>
                    </div>
                    <div className='result-row'>
                      <span className='result-text left'>Area of inlet nozzle: </span> 
                      <span className='result-text right'> {tab.calcResults.inletNozzleArea.toFixed(4)} m<sup>2</sup></span>
                    </div>
                    <div className='result-row'>
                      <span className='result-text left'>Mixture velocity: </span> 
                      <span className='result-text right'> {tab.calcResults.inletNozzleMixtureVelocity.toFixed(4)} m/s</span>
                    </div>
                    <div className='result-row'>
                      <span className='result-text left'>P<sub>m</sub> * V<sub>m</sub><sup>2</sup>: </span> 
                      <span className='result-text right'> {tab.calcResults.inletNozzlePV.toFixed(4)}</span>
                    </div>
                  </div>

                  <div className='result-group'>
                    <span className='result-header'>Outlet Nozzle</span>
                    <div className='result-row'>
                      <span className='result-text left'>Area of outlet nozzle: </span> 
                      <span className='result-text right'> {tab.calcResults.outletNozzleArea.toFixed(4)} m<sup>2</sup></span>
                    </div>
                    <div className='result-row'>
                      <span className='result-text left'>Vapour velocity (V<sub>g</sub>): </span> 
                      <span className='result-text right'> {tab.calcResults.outletNozzleVapourVelocity.toFixed(4)} m/s</span>
                    </div>
                    <div className='result-row'>
                      <span className='result-text left'>P<sub>g</sub> * V<sub>g</sub><sup>2</sup>: </span> 
                      <span className='result-text right'> {tab.calcResults.outletNozzlePV.toFixed(4)}</span>
                    </div>
                  </div>

                  <div className='result-group'>
                    <span className='result-header'>Liquid Outlet Nozzle</span>
                    <div className='result-row'>
                      <span className='result-text left'>Area of liquid outlet nozzle: </span> 
                      <span className='result-text right'> {tab.calcResults.liquidOutletNozzleArea.toFixed(4)} m<sup>2</sup></span>
                    </div>
                    <div className='result-row'>
                      <span className='result-text left'>Liquid velocity in nozzle: </span> 
                      <span className='result-text right'> {tab.calcResults.liquidOutletNozzleVelocity.toFixed(4)} m/s</span>
                    </div>
                  </div>

                  <div className='result-group'>
                    <span className='result-header'>Gas Data</span>
                    <div className='result-row'>
                      <span className='result-text left'>Reference conditions compressibility (Z<sub>1</sub>): </span> 
                      <span className='result-text right'> {tab.calcResults.gasCompressabilityReference.toFixed(4)}</span>
                    </div>
                    <div className='result-row'>
                      <span className='result-text left'>Separator conditions compressibility (Z<sub>2</sub>): </span> 
                      <span className='result-text right'> {tab.calcResults.gasCompressabilitySeparator.toFixed(4)}</span>
                    </div>
                    <div className='result-row'>
                      <span className='result-text left'>Gas density at separator conditions: </span> 
                      <span className='result-text right'> {tab.calcResults.gasDensitySeparator.toFixed(4)} kg/m<sup>3</sup></span>
                    </div>
                    <div className='result-row'>
                      <span className='result-text left'>V<sub>gmax</sub>: </span> 
                      <span className='result-text right'> {tab.calcResults.Vgmax.toFixed(4)} m/s</span>
                    </div>
                    <div className='result-row'>
                      <span className='result-text left'>Ks: </span> 
                      <span className='result-text right'> {tab.calcResults.Ks.toFixed(4)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>


      <div className='footer'> 
        <h3>Powered By</h3>
        <img src={footerLogo} alt='Logo' /> 
      </div>
    </div>
  );
}

export default App;
