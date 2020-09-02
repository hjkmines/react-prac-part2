import React from "react";
import BotCollection from "./BotCollection";
import Army from "./YourBotArmy";
import BotSpecs from "../components/BotSpecs";

class BotsPage extends React.Component {
  state = {
    bots: [],
    loading: true,
    army: [],
    selected: null
  };

  componentDidMount() {
    fetch("https://bot-battler-api.herokuapp.com/api/v1/bots")
      .then(response => response.json())
      .then(bots => this.setState({ bots, loading: false }));
  }

  handleBotClick = selected => {
    this.setState({ selected });
  };

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
