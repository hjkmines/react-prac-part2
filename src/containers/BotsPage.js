import React, { Component } from "react";
import BotCollection from "./BotCollection";
import Army from "./YourBotArmy";
import BotSpecs from "../components/BotSpecs";

class BotsPage extends Component {
  //Set State for the robot army 
  state = {
    bots: [], //lists all the bots from the API fetch 
    loading: true,
    army: [], //List of chosen robots for the army 
    selected: null //set default to no selection when first rendering 
  };

  //fetch for the robots after initial render to the bots array, set the loading to initially set to false 
  componentDidMount() {
    fetch("https://bot-battler-api.herokuapp.com/api/v1/bots")
      .then(response => response.json())
      .then(bots => this.setState({ bots, loading: false }));
  }

  handleBotClick = selected => {
    this.setState({ selected });
  };

  //Add chosen robot to the army, if it does exist, they add it twice
  handleArmyClick = bot => {
    let army = [...this.state.army];
    army = army.filter(Bot => Bot.id !== bot.id);
    this.setState({ army });
  };

  handleGoBack = () => this.setState({ selected: null });

  handleEnlist = () => {
    let { selected } = this.state;

    const add = !this.state.army.filter(Bot => Bot.id === selected.id).length;

    if (add) {
      const army = [...this.state.army, selected];
      this.setState({ army });
    }

    this.handleGoBack();
  };

  render() {
    const { selected } = this.state;
    if (selected) {
      return (
        <BotSpecs
          bot={selected}
          handleGoBack={this.handleGoBack}
          handleEnlist={this.handleEnlist}
        />
      );
    }
    return (
      <div>
        {this.state.army.length ? (
          <Army army={this.state.army} handleArmyClick={this.handleArmyClick} />
        ) : null}
        {this.state.loading ? null : (
          <BotCollection
            bots={this.state.bots}
            handleBotClick={this.handleBotClick}
          />
        )}
      </div>
    );
  }
}

export default BotsPage;
