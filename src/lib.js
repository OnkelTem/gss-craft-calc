class Defs {

  #defs = [];
  #remainders = {};

  constructor(blueprints) {
    this.#defs = this.#readDefs(blueprints);
  }

  /**
   * Reads all blueprints from a sheet
   * @param {array} blueprints
   */
  #readDefs(blueprints) {
    const defs = [];
    for (let i = 0; i < blueprints.length; i++) {
      const def = Defs.#parseDef(blueprints[i]);
      if (def === false) continue;
      if (this.#defByName(def.name) !== false) {
        throw new Error("Blueprints error: found duplicate definition: " + def.name);
      }
      defs.push(def);
    }
    return defs;
  }

  /**
   * Returns definition as an object
   * @param multiplier
   * @param name
   * @param rest
   */
  static #parseDef([name, multiplier, ...rest]) {
    if (multiplier === "" || name === "") {
      return false;
    }
    const def = {
      name: name,
      multiplier: multiplier,
      children: [],
    };
    for (let i = 0; i < rest.length; i++) {
      if ( i > 0 && i % 2 !== 0) {
        if (rest[i] !== "") {
          def.children.push({name: rest[i - 1], multiplier: rest[i]});
        }
      }
    }
    return def;
  }

  /**
   * Returns a definition by its name
   * @param name
   * @returns {boolean|*}
   */
  #defByName(name) {
    const res = this.#defs.filter(function(el) {
      return el.name === name;
    });
    if (res.length > 0) {
      return res[0];
    }
    else {
      return false;
    }
  }

  calculate(request, existing) {
    let results = [];
    Defs.#validateInput(request);
    Defs.#validateInput(existing);
    for (let i = 0; i < existing.length; i++) {
      if (existing[i][1] > 0) {
        this.#remainders[existing[i][0]] = existing[i][1];
      }
    }
    for (let i = 0; i < request.length; i++) {
      if (request[i][1] > 0) {
        results = results.concat(this.#calculateInternal(request[i][0], request[i][1]));
      }
    }
    const aggregatedResults = [];
    for (let i = 0; i < results.length; i++) {
      const resultsRowIndex = aggregatedResults.findIndex(el => el.name === results[i].name);
      if (resultsRowIndex === -1) {
        aggregatedResults.push({...results[i], children: results[i].children.map(el => ({...el}))});
      }
      else {
        aggregatedResults[resultsRowIndex].multiplier += results[i].multiplier;
        aggregatedResults[resultsRowIndex].children.forEach((part, index, array) => {
          array[index].multiplier += results[i].children[index].multiplier;
        });
      }
    }
    return aggregatedResults.sort((a, b) => {
      return b.children.length - a.children.length;
    });
  }

  static #validateInput(input) {
    for (let i = 0; i < input.length; i++) {
      const amount = input[i][1];
      if (isNaN(amount)) {
        throw new Error(`Amount is not a number: "${amount}" in the row: "${input[i].join(", ")}"`);
      }
      if (amount < 0) {
        throw new Error(`Amount < 0: "${amount}" in the row: "${input[i].join(", ")}"`);
      }
    }
  }

  #calculateInternal(name, amount) {
    const results = [];

    // Get the blueprint
    const def = this.#defByName(name);
    const result = def ? {...def} : {name: name, multiplier: 1, children: []};

    // Use the remainder if we have it
    const rem = this.#remainders[name];
    if (rem != null && rem > 0) {
      if (amount > rem) {
        amount = amount - rem;
        this.#remainders[name] = 0;
      }
      else {
        this.#remainders[name] = rem - amount;
        amount = 0;
      }
    }

    const factor = Math.ceil(amount / result.multiplier);
    result.multiplier = factor * result.multiplier;
    result.children = result.children.map(el => ({
      name: el.name,
      multiplier: el.multiplier * factor,
    }));
    results.push(result);

    // Check if we have have any remainders
    if (result.multiplier > 0 && amount % result.multiplier !== 0) {
      // Place the remainder in the buffer
      this.#remainders[name] = result.multiplier - amount;
    }

    return results.concat(...result.children.map(el =>
      this.#calculateInternal(el.name, el.multiplier)
    ));
  }

}

// noinspection JSUnusedGlobalSymbols
export function craftCalc(blueprints, request, existing) {
  // Check params
  if (blueprints == null || blueprints.length === 0) {
    throw new Error("Blueprints database is empty, nothing to do, existing.");
  }
  if (request == null || request.length === 0) {
    throw new Error("Request is empty, nothing to do, existing.");
  }
  const defs = new Defs(blueprints);
  const results = defs.calculate(request, existing != null && request.length > 0 ? existing : []);
  //return JSON.stringify(results, null, ' ');
  if (results.length === 0) {
    return "<Nothing to do>";
  }
  return results.map(el => {
    return [
      el.name,
      el.multiplier,
      ...el.children.reduce((accum, el) => {
        accum.push(el.name);
        accum.push(el.multiplier);
        return accum;
      }, [])
    ]
  });
}
