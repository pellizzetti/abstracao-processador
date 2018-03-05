import React, { Component } from 'react';
import Process from './Process';

export default class ProcessList extends React.Component {
  render() {
    const processes = this.props.processes
    return (
      <table className="table table-hover">
        {processes.length > 0 &&
          <thead>
            <tr>
              <th>Nome</th>
              <th>Prioridade</th>
              <th>Quantum</th>
              <th>Excluir</th>
            </tr>
          </thead>}
        <tbody>
          {processes.map(process => (
            <Process key={process.id} id={process.id} name={process.name} priority={process.priority} quantum={process.quantum} onDeleteProcess={this.props.onDeleteProcess} />
          ))}
        </tbody>
      </table>
    );
  }
}