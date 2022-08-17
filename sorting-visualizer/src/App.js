import React, { Component } from 'react';
import './App.css';
import './AppDark.css';

import Cont from './components/mol/controls';
import Bar from './components/mainElements/topBar';
import Drawer from './components/mainElements/drawer';
import Visualizer from './components/mainElements/sortVis';

import HeapSort, {
  HeapKey,
  HeapDesc
} from './algo/heapSort';


class App extends Component {
  state = {
    darkMode: false,
    array: [],
    arraySize: 5,
    trace: [],
    algorithm: "Heap Sort",
    appDrawerOpen: false
  };

  ALGORITHM = {
    'Heap Sort': HeapSort
  };

  ALGORITHM_KEY = {
    'Heap Sort': HeapKey
  };

  ALGORITHM_DESC = {
    'Heap Sort': HeapDesc,
  };

  componentDidMount() {
    this.generateRandomArray();
  }

  generateRandomArray = () => {
    // Generate pseudo-random number between 1 and max
    function getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max)) + 1;
    }

    // Generate an array of length max
    const array = Array(this.state.arraySize)
      .fill(0)
      .map(() => getRandomInt(this.state.arraySize * 5));

    this.setState(
      {
        array,
        trace: []
      },
      this.createTrace
    );
  };

  handleAlgorithmChange = (algorithm) => {
    this.setState({ algorithm }, this.generateRandomArray);
  };

  handleArraySizeChange = (size) => {
    size = Number(size);
    size = size > 100 ? 100 : size;
    size = size < 0 ? 0 : size;
    this.setState({ arraySize: size }, this.generateRandomArray);
  };

  createTrace = () => {
    const numbers = [...this.state.array];
    const sort = this.ALGORITHM[this.state.algorithm];
    if (sort) {
      const trace = sort(numbers);
      this.setState({ trace });
    }
  };

  toggleDarkMode = () => {
    this.setState((prevState) => ({ darkMode: !prevState.darkMode }));
  };

  toggleAppDrawer = () => {
    this.setState((prevState) => ({
      appDrawerOpen: !prevState.appDrawerOpen
    }));
  };

  render() {
    let theme = `App`;
    if (this.state.darkMode) theme += ` App_dark`;
    if (this.state.appDrawerOpen) theme += ` App_modal_open`;

    const colorKey = this.ALGORITHM_KEY[this.state.algorithm];
    const desc = this.ALGORITHM_DESC[this.state.algorithm];

    const controls = (
      <Cont
        onGenerateRandomArray={this.generateRandomArray}
        algorithm={this.state.algorithm}
        onAlgorithmChange={this.handleAlgorithmChange}
        arraySize={this.state.arraySize}
        onArraySizeChange={this.handleArraySizeChange}
        onToggleDarkMode={this.toggleDarkMode}
        darkMode={this.state.darkMode}
      />
    );

    return (
      <div className={theme}>
        <Bar
          drawerOpen={this.state.appDrawerOpen}
          toggleDrawer={this.toggleAppDrawer}
        >
          {controls}
        </Bar>

        <Drawer
          open={this.state.appDrawerOpen}
          closeDrawer={this.toggleAppDrawer}
        >
          {controls}
        </Drawer>

        <main className="Alp__Body">
          <Visualizer
            array={this.state.array}
            trace={this.state.trace}
            colorKey={colorKey}
            desc={desc}
          />
        </main>
      </div>
    );
  }
}

export default App;
