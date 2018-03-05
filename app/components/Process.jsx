import React, { Component } from 'react';

export default class Process extends React.Component {
  constructor(props) {
    super(props);

    this.deleteProcess = this.deleteProcess.bind(this);
  }

  deleteProcess(event) {
    this.props.onDeleteProcess(this.props.id);
  }

  render() {
    return (
      <tr>
        <td>{this.props.name}</td>
        <td>{this.props.priority}</td>
        <td>{this.props.quantum}</td>
        <td><button type="button" className="btn btn-danger btn-sm" onClick={this.deleteProcess}>x</button></td>
      </tr>
    );
  }
}