import React from 'react';
import './AppBody.css';
import { Form, Input, Row, Col, InputGroup, InputGroupText } from 'reactstrap';
import { Timezone } from './Timezone'

const initState = {
  departure: new Date().toISOString().slice(0, -8),

}

class AppBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = initState;

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  subtractHours() {
    console.log(new Date(this.state.arrival).getTime(), new Date({ time: this.state.waitingtime }))
  }

  render() {
    return (
      <div className="App-body">
        <Row>
          <Col>
            <iframe
              id="mapforpcr"
              title="2022年返香港去邊度做PCR"
              width="640"
              height="480"
              src="https://www.google.com/maps/d/embed?mid=1oSh9Ryw6YVFOK8WOxzFa2h1onjLUreFo&hl=en&ehbc=2E312F" />
          </Col>

          <Col></Col>

          <Col>
            <Form>
              <InputGroup>
                <InputGroupText className='InputGroupText-departure'>Last Flight</InputGroupText>
                <Input
                  id="departure"
                  name="departure"
                  type="datetime-local"
                  onChange={this.handleChange}
                  value={this.state.departure} />
              </InputGroup>

              <InputGroup>
                <InputGroupText className='InputGroupText-departure'>TimeZone</InputGroupText>
                <Input
                  id="depart_zone"
                  name="depart_zone"
                  type="select"
                  value={this.state.depart_zone}
                  onChange={this.handleChange}
                >
                  {Timezone.map((zone, index) => (
                    <option key={index}>{zone}</option>
                  ))}
                </Input>
              </InputGroup>

              <br />

              <InputGroup>
                <InputGroupText className='InputGroupText-current'>Current Timezone</InputGroupText>
                <Input
                  id="current_zone"
                  name="current_zone"
                  type="select"
                  value={this.state.current_zone}
                  onChange={this.handleChange}
                >
                  {Timezone.map((zone, index) => (
                    <option key={index}>{zone}</option>
                  ))}
                </Input>
              </InputGroup>
              <InputGroup>
                <InputGroupText className='InputGroupText-pcr'>PCR Taken</InputGroupText>
                <Input
                  disabled
                  id="pcrTaken"
                  name="pcrTaken"
                  type="datetime-local"
                  value={this.state.departure}
                  style={{ color: 'red' }} />
              </InputGroup>

            </Form>

          </Col>
        </Row>

      </div >
    );
  }
}


export default AppBody;
