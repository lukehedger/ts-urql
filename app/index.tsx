import { createClient, Provider, useQuery } from "urql";
import React from "react";
import ReactDOM from "react-dom";

const client = createClient({
  url: "https://rickandmortyapi.com/graphql/"
});

interface Character {
  id: number;
  name: string;
}

const Characters = (): React.ReactElement => {
  const [result] = useQuery({
    query: `{
      characters {
        results {
          id
          name
        }
      }
    }`
  });

  const { data, fetching } = result;

  return fetching ? (
    <p>
      Loading characters{" "}
      <span aria-label="cyclone emoji" role="img">
        🌀
      </span>
    </p>
  ) : (
    <ul>
      {data.characters.results.map(
        (character: Character): React.ReactElement => (
          <li key={character.id}>{character.name}</li>
        )
      )}
    </ul>
  );
};

const App = (): React.ReactElement => {
  return (
    <Provider value={client}>
      <Characters />
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
