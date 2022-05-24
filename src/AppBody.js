import React from 'react';
import './AppBody.css';
import { Form, Input, Row, Col, InputGroup, InputGroupText } from 'reactstrap';
import { Timezone } from './Timezone'
import moment from 'moment-timezone';

const initState = {
  departure: "",
  departZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  currentZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
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
    if (this.state.departure !== "") {
      let departure = new Date(moment.tz(this.state.departure, this.state.departZone).format())
      departure.setHours(departure.getHours() - 48)

      let pcrTakenTime = moment.utc(departure.toISOString().slice(0, -1)).tz(this.state.currentZone)
      return pcrTakenTime.format().substring(0, 16)
    }
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

          <Col>
            <div>
              <h2>Guide</h2>
              <ol type="1">
                <li>Input the take off time of the last flight heading to Hong Kong and select the timezone of that city</li>
                <li>Select the timezone where you are being now</li>
                <li>Take the PCR Test no eariler than the time given in red color. That time has been converted to your local timezone</li>
              </ol>
            </div>

            <div>
              <h2>使用說明</h2>
              <ol type="1">
                <li>輸入最後飛往香港的航班起飛時間, 並選擇當地時區</li>
                <li>選擇你所在地的時區</li>
                <li>留意PCR採檢時間不可早過紅色標註的時間. 該時間已轉換成你選擇的所在地時區</li>
              </ol>
            </div>
          </Col>

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
                  id="departZone"
                  name="departZone"
                  type="select"
                  value={this.state.departZone}
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
                  id="currentZone"
                  name="currentZone"
                  type="select"
                  value={this.state.currentZone}
                  onChange={this.handleChange}
                >
                  {Timezone.map((zone, index) => (
                    <option key={index}>{zone}</option>
                  ))}
                </Input>
              </InputGroup>

              <InputGroup>
                <InputGroupText className='InputGroupText-pcr'>PCR Test Taken</InputGroupText>
                <Input
                  disabled
                  id="pcrTaken"
                  name="pcrTaken"
                  type="datetime-local"
                  value={this.subtractHours()}
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
