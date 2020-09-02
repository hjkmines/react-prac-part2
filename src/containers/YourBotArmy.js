import React, { Component } from "react";
import BotCard from "../components/BotCard";

//Allows each bot placed as a card component 
class YourBotArmy extends Component {
  render() {
    const { army, handleArmyClick } = this.props;
    const bots = army.map((bot, index) => {
      return (
        <div className="ui column" key={index} id={bot.id}>
          <BotCard
            key={index}
            id={bot.id}
            bot={bot}
            handleBotClick={handleArmyClick}
          />
        </div>
      );
    });
    return (
      <div className="ui segment inverted olive bot-army">
        <div className="ui five column grid">
          <div className="row bot-army-row">{bots}</div>
        </div>
      </div>
    );
  }
}

export default YourBotArmy;
