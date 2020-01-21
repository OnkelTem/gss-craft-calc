/**
 * @typedef {object} AppLib
 * @property {function} craftCalc
 */

// noinspection JSClosureCompilerSyntax
/**
 * Calculates required craft resources based on a blueprints database and an amount of existing resources.
 *
 * @param {blueprints!A2:H9}  blueprints  The blueprints database in the format: ResourceName|Amount [ResourceName|Amount, ...]
 * @param {A2:B3}             request     The list of requested resources in the format: ResourceName|Amount
 * @param {A5:B6}             [existing]  The list of available resources in the format: Resource Name|Amount
 * @return The resource requirements table
 * @customfunction
 */
function craftCalc(blueprints, request, existing) {
  return AppLib.craftCalc(blueprints, request, existing);
}

// noinspection JSUnusedGlobalSymbols
function testCraftCalc() {
  // For testing we use data from https://wiki.industrial-craft.net/
  craftCalc(
    // blueprints
    [
      ["Electronic Circuit",     1, "Insulated Copper Cable", 6, "Redstone",        2, "Iron Plate", 2],
      ["Electric Motor",         1, "Coil",                   2, "Tin Item Casing", 2, "Iron Ingot", 1],
      ["Insulated Copper Cable", 1, "Rubber",                 1, "Copper Cable",    1],
      ["Coil",                   1, "Copper Cable",           8, "Iron Ingot",      1],
      ["Tin Item Casing",        2, "Tin Plate",              1],
      ["Cooper Cable",           3, "Copper Plate",           1],
      ["Copper Plate",           1, "Copper Ingot",           1],
      ["Iron Plate",             1, "Iron Ingot",             1],
      ["Tin Plate",              1, "Tin Ingot",              1],
      ["Rubber",                 1, "Resin",                  1],
    ],
    // request
    [
      ["Electronic Circuit",     2],
      ["Electric Motor",         3]
    ],
    // existing
    [
      ["Copper Plate",           3],
      ["Cooper Cable",           5],
    ]
  );
}

