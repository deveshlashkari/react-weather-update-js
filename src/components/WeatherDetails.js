import axios from "axios";
import React, { Component } from "react";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
import { API_KEY } from "../Constants";

class WeatherDetails extends Component {
  constructor() {
    super();
    this.state = {
      capitalName: "",
    };
  }

  componentDidMount() {
    const name = this.props.match.params.name;
    if (name !== undefined) {
      this.setState({
        capitalName: name,
      });

      this.getWeatherDataFromApi(name)
        .then((response) => {
          console.log("RESPONSE :::", response);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  getWeatherDataFromApi = (name) => {
    return axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${API_KEY}`
    );
  };

  render() {
    return <div>WeatherDetails</div>;
  }
}

export default withRouter(WeatherDetails);
