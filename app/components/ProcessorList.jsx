import React, { Component } from 'react';
import Processor from './Processor';

export default class ProcessorList extends React.Component {
  render() {
    const processors = this.props.processors
    return (
      <table className="table table-hover">
        {processors.length > 0 &&
          <thead>
            <tr>
              <th className="col-6">Nome</th>
              <th>Quantum</th>
              <th>Excluir</th>
            </tr>
          </thead>}
        <tbody>
          {processors.map(processor => (
            <Processor key={processor.id} id={processor.id} name={processor.name} quantum={processor.quantum} onDeleteProcessor={this.props.onDeleteProcessor} />
          ))}
        </tbody>
      </table>
    );
  }
}