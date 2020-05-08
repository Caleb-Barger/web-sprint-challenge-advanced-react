import React, { Component } from "react";
import axios from "axios";
import { InputGroup, InputGroupAddon, Button, Input, ButtonToggle } from 'reactstrap'

export default class PlantList extends Component {
  // add state with a property called "plants" - initialize as an empty array
  constructor() {
    super()
    this.state = {
      plants: [],
      filteredPlants: [],
      filterText: "",
      reset: false,
      url: ""
    }
  }

  componentDidMount() {
    this.setState({
      url: "http://localhost:3333/plants"
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.url !== prevState.url || this.state.reset === true) {
      axios
        .get(this.state.url)
        .then(res => {
          // console.log(res.data)
          this.setState({ plants: res.data.plantsData, reset: false })

        })
        .catch(err => {
          console.log("Bad request using og url")
          this.setState({ url: prevState.url })
        })
    }
  }


  updateSearchValue = e => {
    this.setState({ filterText: e.target.value })
  }

  filterPlants = e => {
    const term = this.state.filterText
    const newPlants = this.state.plants.filter(plant => {
      if (plant.name === term.trim()) {
        return plant
      }
    })
    this.setState({ plants: newPlants })
    // console.log(this.state.plants)
  }

  resetFilteredPlants = e => {
    this.setState({ reset: true })
  }

  // when the component mounts:
  //   - fetch data from the server endpoint - http://localhost:3333/plants
  //   - set the returned plants array to this.state.plants

  /*********  DON'T CHANGE ANYTHING IN THE RENDER FUNCTION *********/
  render() {
    return (
      <main className="plant-list">
        <div className="filter-bar">
          <InputGroup>
            <Input
              placeholder="Snake Plant..."
              onChange={this.updateSearchValue}
              value={this.state.filterText}
            />
            <InputGroupAddon addonType="append">
              <Button outline className="filter-button" onClick={this.filterPlants}>Filter</Button>
            </InputGroupAddon>
            <InputGroupAddon addonType="append">
              <Button outline className="filter-button" onClick={this.resetFilteredPlants}>Reset</Button>
            </InputGroupAddon>
          </InputGroup>
        </div>
        {this.state?.plants?.map((plant) => (
          <div className="plant-card" key={plant.id}>
            <img className="plant-image" src={plant.img} alt={plant.name} />
            <div className="plant-details">
              <h2 className="plant-name">{plant.name}</h2>
              <p className="plant-scientific-name">{plant.scientificName}</p>
              <p>{plant.description}</p>
              <div className="plant-bottom-row">
                <p>${plant.price}</p>
                <p>☀️ {plant.light}</p>
                <p>💦 {plant.watering}x/month</p>
              </div>
              <button
                className="plant-button"
                onClick={() => this.props.addToCart(plant)}
              >
                Add to cart
              </button>
            </div>
          </div>
        ))}
      </main>
    );
  }
}
