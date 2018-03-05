import React, { Component } from 'react';
import ProcessList from './ProcessList';
import ProcessorList from './ProcessorList';

export default class ProcessAbstApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      processes: [],
      processors: [],
      ready: [],
      running: [],
      blocked: [],
      count: 0,
      countProcessor: 0,
      name: "",
      nameProcessor: "",
      scheduling: "priority", // priority or round-robin
      priority: 1,
      quantum: 1,
      quantumProcessor: 1
    };

    this.handlePriorityChange = this.handlePriorityChange.bind(this);
    this.handleQuantumChange = this.handleQuantumChange.bind(this);
    this.handleQuantumProcessorChange = this.handleQuantumProcessorChange.bind(this);
    this.handleAddProcess = this.handleAddProcess.bind(this);
    this.handleAddProcessor = this.handleAddProcessor.bind(this);
    this.handleDeleteProcess = this.handleDeleteProcess.bind(this);
    this.handleDeleteProcessor = this.handleDeleteProcessor.bind(this);
    this.handleStartProcessing = this.handleStartProcessing.bind(this);
  }

  handlePriorityChange(event) {
    this.setState({
      priority: event.target.value
    });
  }

  handleQuantumChange(event) {
    this.setState({
      quantum: event.target.value
    });
  }

  handleQuantumProcessorChange(event) {
    this.setState({
      quantumProcessor: event.target.value
    });
  }

  handleAddProcess(event) {
    event.preventDefault();

    var newProcess = {
      id: Date.now(),
      name: `P${this.state.count + 1}`,
      priority: this.state.priority,
      quantum: this.state.quantum
    };

    this.setState((prevState) => ({
      processes: prevState.processes.concat(newProcess),
      count: this.state.count + 1,
      name: "",
      priority: 1,
      quantum: 1
    }));
  }

  handleAddProcessor(event) {
    event.preventDefault();

    var newProcessor = {
      id: Date.now(),
      name: `N${this.state.countProcessor + 1}`,
      quantum: this.state.quantumProcessor
    };

    this.setState((prevState) => ({
      processors: prevState.processors.concat(newProcessor),
      countProcessor: this.state.countProcessor + 1,
      nameProcessor: "",
      quantumProcessor: 1
    }));
  }

  handleDeleteProcess(processId) {
    var updatedProcesses = this.state.processes.filter(process => process.id !== processId);

    this.setState({
      processes: [].concat(updatedProcesses)
    });
  }

  handleDeleteProcessor(processorId) {
    var updatedProcessors = this.state.processors.filter(processor => processor.id !== processorId);

    this.setState({
      processors: [].concat(updatedProcessors)
    });
  }

  handleStartProcessing() {

  }

  render() {
    return (
      <div className="p-2">
        <h3 className="apptitle text-center">Abstração de processador</h3>
        <div className="row">
          <form className="col-6">
            <div className="form-group">
              <h4>Processos</h4>
            </div>
            <div className="form-group">
              <label htmlFor="priority">Prioridade (1- Baixa, 10- Alta)</label>
              <input type="number" id="priority" className="form-control" min="1" max="10" onChange={this.handlePriorityChange} value={this.state.priority} />
            </div>
            <div className="form-group">
              <label htmlFor="quantum">Quantum</label>
              <input type="number" id="quantum" className="form-control" min="1" max="50" onChange={this.handleQuantumChange} value={this.state.quantum} />
            </div>
            <div className="form-group">
              <button className="btn btn-primary" onClick={this.handleAddProcess}>{"Add processo #" + (this.state.processes.length + 1)}</button>
            </div>
          </form>
          <div className="col-6">
            <ProcessList processes={this.state.processes} onDeleteProcess={this.handleDeleteProcess} />
          </div>
        </div>

        {this.state.processes.length > 0 &&
          <div className="row">
            <form className="col-6">
              <div className="form-group">
                <h4>Processadores</h4>
              </div>
              <div className="form-group">
                <label htmlFor="quantumProcessor">Quantum</label>
                <input type="number" id="quantumProcessor" className="form-control" min="1" max="50" onChange={this.handleQuantumProcessorChange} value={this.state.quantumProcessor} />
              </div>
              <div className="form-group">
                <button className="btn btn-primary" onClick={this.handleAddProcessor}>{"Add processador #" + (this.state.processors.length + 1)}</button>
              </div>
            </form>
            <div className="col-6">
              <ProcessorList processors={this.state.processors} onDeleteProcessor={this.handleDeleteProcessor} />
            </div>
          </div>}
        {this.state.processes.length > 0 && this.state.processors.length > 0 &&
          <div className="row">
            <form className="col-12 text-center form-inline">
              <select value={this.state.scheduling} onChange={this.handleSchedulingChange}>
                <option value="priority">Prioridade</option>
                <option value="round-robin">Round Robin</option>
              </select>
            </form>
            <div className="col-12 text-center">
              <button className="btn btn-success btn-lg btn-block" onClick={this.handle}>Iniciar processamento</button>
            </div>
          </div>}
      </div>
    );
  }
}
