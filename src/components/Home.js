import React, { Component } from "react";

import { Container, Grid, Button, TextField } from "@mui/material";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      countryName: "",
      isRedirectToDetailsPage: false,
    };
  }

  handleCountryNameChange = (event) => {
    this.setState(
      {
        countryName: event.target.value,
      },
      () => {
        console.log("COUNTRY NAME :::", this.state.countryName);
      }
    );
  };

  redirectToDetailsPage = () => {
    this.setState({
      isRedirectToDetailsPage: true,
    });
  };

  render() {
    const { countryName, isRedirectToDetailsPage } = this.state;
    if (isRedirectToDetailsPage) {
      return <Redirect to={`/details/${countryName}`} />;
    }

    return (
      <>
        <Container style={{ marginTop: "100px" }} maxWidth="md">
          <Grid spacing={2} container>
            <Grid item xs="12">
              <TextField
                fullWidth
                placeholder="Enter Country"
                value={countryName}
                onChange={this.handleCountryNameChange}
              />
            </Grid>
            <Grid item xs="12">
              <Button
                fullWidth
                variant="outlined"
                color="error"
                disabled={countryName.length !== 0 ? false : true}
                onClick={this.redirectToDetailsPage}
              >
                Search
              </Button>
            </Grid>
          </Grid>
        </Container>
      </>
    );
  }
}
