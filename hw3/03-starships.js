const fetchData = async () => {
  try {
    const response = await fetch("https://swapi.dev/api/starships/");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching starships:", error);
  }
};

const createSpaceshipComponent = (spaceship) => {
  const container = document.createElement("section"); // do not modify this line
  container.className = "starships";

  const header_Container = document.createElement("header");
  header_Container.className = "starshipsheader";

  const title = document.createElement("h2");
  title.textContent = spaceship.name;
  header_Container.appendChild(title);

  const starshipCost = document.createElement("span");
  starshipCost.className = "cost";
  starshipCost.textContent = `${parseInt(
    spaceship.cost_in_credits,
    10
  ).toLocaleString("en")} credits`;
  header_Container.appendChild(starshipCost);

  container.appendChild(header_Container);

  const starshipManufacturer = document.createElement("p");
  starshipManufacturer.className = "manufacturer";
  starshipManufacturer.textContent = `Manufactured by ${spaceship.manufacturer}`;
  container.appendChild(starshipManufacturer);

  const starshipSpecs = document.createElement("div");
  starshipSpecs.className = "specs";

  const speedSpec = createSpecElement(
    spaceship.max_atmosphering_speed,
    "Max atmosphering speed"
  );
  starshipSpecs.appendChild(speedSpec);

  const divider = document.createElement("div");
  divider.className = "divider";
  starshipSpecs.appendChild(divider);

  const cargoSpec = createSpecElement(
    parseInt(spaceship.cargo_capacity, 10).toLocaleString("en"),
    "Cargo capacity"
  );
  starshipSpecs.appendChild(cargoSpec);

  container.appendChild(starshipSpecs);
  return container;
};

function createSpecElement(value, label) {
  const specElement = document.createElement("div");
  specElement.className = "spec";

  const valueElement = document.createElement("span");
  valueElement.className = "specs-value";
  valueElement.textContent = value;
  specElement.appendChild(valueElement);

  const labelElement = document.createElement("p");
  labelElement.className = "specs-label";
  labelElement.textContent = label;
  specElement.appendChild(labelElement);

  return specElement;
}

const main = document.getElementsByTagName("main")[0];

const filterStarships = (starships) => {
  return starships.filter(
    (ship) => parseInt(ship.passengers, 10) < 10 && parseInt(ship.crew, 10) > 1
  );
};

const reduceStarships = (starships) => {
  const totalCost = starships.reduce((acc, ship) => {
    const cost = parseInt(ship.cost_in_credits, 10);
    if (!isNaN(cost)) {
      return acc + cost;
    }
    return acc;
  }, 0);

  return `The cost of all starships is ${totalCost.toLocaleString(
    "en"
  )} credits`;
};

document.addEventListener("DOMContentLoaded", async () => {
  let starships = await fetchData();

  // do not modify the code below
  let displayAllButton = document.getElementById("all");
  displayAllButton.addEventListener("click", () => {
    displayShipComponents(starships);
  });

  let filterButton = document.getElementById("filter");
  filterButton.addEventListener("click", () => {
    const filteredShips = filterStarships(starships);
    displayShipComponents(filteredShips);
  });

  let reduceButton = document.getElementById("reduce");
  reduceButton.addEventListener("click", () => {
    const totalCost = reduceStarships(starships);
    displayText(totalCost);
  });
});

const clearAndReset = () => {
  let app = document.getElementById("results");
  app.remove();
  app = document.createElement("div");
  app.id = "results";
  app.style.display = "flex";
  app.style.flexWrap = "wrap";
  app.style.justifyContent = "center";
  main.append(app);
};

const displayShipComponents = (starships) => {
  clearAndReset();
  let app = document.getElementById("results");
  for (const ship in starships) {
    const shipComponent = createSpaceshipComponent(starships[ship]);
    app.appendChild(shipComponent);
  }
};

const displayText = (text) => {
  clearAndReset();
  let app = document.getElementById("results");
  let paragraph = document.createElement("p");
  paragraph.textContent = text;
  paragraph.style.backgroundColor = "white";
  paragraph.style.borderRadius = "10px";
  paragraph.style.padding = "30px";
  app.appendChild(paragraph);
};
