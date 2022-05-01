module.exports = class Tariff {
    #packages = {
        a : "Entertainment",
        b : "Educational",
        c : "Regional",
        d : "Sports"
    };

    #channels = {
        a : ["Zee", "Colors", "SAB"],
        b : ["Byju", "Youtube", "SONY"],
        c : ["TV9", "Star" ],
        d : ["Ten Sports", "ESPN", "Star Sports"]
    }

    getPackages() {
        return this.#packages;
    }
    
    getChannels(packagename) {
        return this.#channels[packagename];
    }

    getChannelPrice() {
        return 50;
    }
}
