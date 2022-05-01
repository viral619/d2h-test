module.exports = class Account {
    #amount = 0;
    #package = ["Channel ABC", "Channel PQR", "Channel XYZ"];

    getAmount() {
        return this.#amount;
    }

    addAmount(amount) {
        this.#amount += parseFloat(amount);
    }

    getChannels() {
        return this.#package;
    }

    addChannel(channel) {
        this.#package.push(channel);
    }
    
    removeChannel(channel) {
        const index = this.#package.indexOf(channel);
        if (index > -1) {
            this.#package.splice(index, 1);
        }
    }

    addChannel(channel, packageName, tariff) {
        const channels = tariff.getChannels(packageName);
        const selectedChannel = channels[channel];

        if (!selectedChannel) {
            return "Invalid channel selected...";
        }
        
        if (this.#amount >= tariff.getChannelPrice()) {
            this.#package.push(selectedChannel);
            this.#amount -= tariff.getChannelPrice();

        } else {
            return "You don’t have sufficient balance to add this channel in your tariff plan.";
        }
    }
}
