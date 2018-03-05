import React, { Component } from 'react';


export default class Processor extends React.Component {
  constructor(props) {
    super(props);

    this.deleteProcessor = this.deleteProcessor.bind(this);
  }

  deleteProcessor(event) {
    this.props.onDeleteProcessor(this.props.id);
  }

  render() {
    return (
      <tr>
        <td>{this.props.name}</td>
        <td>{this.props.quantum}</td>
        <td><button type="button" className="btn btn-danger btn-sm" onClick={this.deleteProcessor}>x</button></td>
      </tr>
    );
  }
}