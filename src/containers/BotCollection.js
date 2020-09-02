import React, { Component } from "react";
import BotCard from "../components/BotCard";

class BotCollection extends Component {

  render() {
    const { handleBotClick, bots } = this.props;
    const allBots = bots.map((bot, index) => {
      return (
        <div className="ui column" key={index} id={bot.id}>
          <BotCard
            key={index}
            id={bot.id}
            bot={bot}
            handleBotClick={handleBotClick}
          />
        </div>
      );
    });
    return (
      <div className="ui four column grid">
        <div className="row">{allBots}</div>
      </div>
    );
  }
}

export default BotCollection;
