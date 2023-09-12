import { Component } from "react";

import CardList from "./components/card-list/card-list.component";
import SearchBox from "./components/search-box/search-box.component";
import "./App.css";

class App extends Component {
  constructor() {
    super();

    this.state = {
      monsters: [],
      searchField: "",
    };
    // console.log('constructor');
  }

  async componentDidMount() {
    let response = await fetch("https://jsonplaceholder.typicode.com/users");
    const json = await response.json();
    this.setState(() => {
      return { monsters: json };
    });
    // console.log('mount');
  }

  onSearchChange = (e) => {
    let searchField = e.target.value.toLowerCase();
    this.setState(() => {
      return { searchField };
    });
  };

  render() {
    const { monsters, searchField } = this.state;
    const { onSearchChange } = this;

    const filteredMonsters = monsters.filter((monster) => {
      return monster.name.toLowerCase().includes(searchField);
    });

    return (
      <div className="App">
        <h1 className="app-title">Monsters Rollodex</h1>
        <SearchBox
          onChangeHandler={onSearchChange}
          placeholder={"search monsters"}
          className={"monsters-search-box"}
        />
        <CardList monsters={filteredMonsters} />
      </div>
    );
  }
}

export default App;
