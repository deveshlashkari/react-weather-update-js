import React, { Component } from "react";
import {
  withRouter,
  Redirect,
} from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import { API_URL } from "../Constants";

import { Button, Container, Grid } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

class Details extends Component {
  constructor() {
    super();
    this.state = {
      countryName: "",
      countryData: [],
      capitalName: "",
    };
  }

  componentDidMount() {
    const name = this.props.match.params.name;
    if (name !== undefined) {
      this.setState({
        countryName: name,
      });
    }

    this.getCountryDataFromApi(name)
      .then((response) => {
        console.log("RESPONSE :::", response);
        this.setState({
          countryData: response.data,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  getCountryDataFromApi = (name) => {
    return axios.get(`${API_URL}${name}?fullText=true`);
  };

  renderTable = (data) => {
    return (
      <>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Population</TableCell>
                <TableCell>Flag</TableCell>
                <TableCell>Lat</TableCell>
                <TableCell>Long</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>{data[0]?.name?.common}</TableCell>
                <TableCell>{data[0]?.population}</TableCell>
                <TableCell>
                  <img
                    style={{ height: "30px" }}
                    src={data[0]?.flags?.png}
                    alt="flag"
                  />
                </TableCell>
                <TableCell>{data[0]?.latlng[0]}</TableCell>
                <TableCell>{data[0]?.latlng[1]}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
  };

  redirectToCapitalWeather = () => {
    const capital = this.state.countryData[0]?.capital[0];
    console.log(capital);
    this.setState({
      capitalName: capital,
      isRedirectToCapitalWeatherPage: true,
    });
  };

  render() {
    const { isRedirectToCapitalWeatherPage, capitalName } = this.state;
    if (isRedirectToCapitalWeatherPage) {
      return <Redirect to={`/weather/${capitalName}`} />;
    }
    return (
      <>
        <Container maxWidth="lg">
          <Grid container spacing={2}>
            {this.state.countryData.length !== 0 ? (
              <>
                <Grid item xs={12}>
                  {this.renderTable(this.state.countryData)}
                </Grid>
              </>
            ) : (
              <h1>Loading...</h1>
            )}
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="outlined"
                color="error"
                onClick={this.redirectToCapitalWeather}
              >
                Show Capital Weather
              </Button>
            </Grid>
          </Grid>
        </Container>
      </>
    );
  }
}

export default withRouter(Details);
