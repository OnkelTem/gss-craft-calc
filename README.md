# Craft Calculator for Google Spreadsheets

Implements a Google Spreadsheets extension function `=craftCalc()` for calculating resources required for crafts in games.

It's totally game agnostic so you can use it for ANY game with crafting.

![screenshot-docs google com-2020 01 21-08_48_55](https://user-images.githubusercontent.com/114060/72778778-f0889f80-3c2a-11ea-86c6-caa57dfc8b10.png)

## Documentation

Have a look at this simple example:

![screenshot-docs google com-2020 01 21-09_36_00](https://user-images.githubusercontent.com/114060/72781140-a525bf80-3c31-11ea-8962-05de20c3a78a.png)

Here we have two parts: `Request` and `Result`. Apparently the function takes the former and outputs the latter:

![screenshot-docs google com-2020 01 21-09_36_28](https://user-images.githubusercontent.com/114060/72781139-a48d2900-3c31-11ea-9c50-2a123e02b382.png)

### Request

The `Request` contains three sections: 
* `Blueprints` - the database of recipes.
* `Crafts` - the list of target crafts to process.
* `In-Stock` - the list of existing resources.

#### Blueprints 

Each `Blueprints` row is a recipe. A recipe is a list of pairs. The first pair is the target of the craft, it say *what* we get and *how much* we get. The other pairs are ingredients in the same form: names and amounts.

> In our example the first recipe says: to produce 1 `Table` component or resource you need 1 `Table Top` component plus 4 `Table Leg` components. In their turn, to craft 1 `Table Top` you need 12 `Wooden Plank`s  and to make 1 `Table Leg` you need 2 `Wooden Bar`s. Items w/o recipe are considered *final*, e.g.: `Wooden Plan` and `Wooden Bar`.

#### Crafts

The `Crafts` section is the essence of what you're gonna craft and calculate. It's just a two-columns list of names and amounts. 

> In this example we want to get a furniture set with 1 `Table` and 4 `Chair`s.

#### In-Stock

The `In-Stock` section. Since you may already have some resources at your disposal (e.g. crafted before), you can list them here. Similarly to the previous section, you list here pairs: names and amounts. 

> In our exmaple we already have 3 `Wooden Plank`s and 2 `Wooden Bar`s.

### Result

#### Resources

Finally the `Reply/Resources` section is the result of calculations. It looks similar to the `Blueprints` section but lists only *required* crafts with the *requested* amounts. 

The list is sorted by the number of components in a recipe in the reverse order: the most complex crafts are at the top, while *final* components (i.e. w/o child components) are at the bottom.

> Back to our example. We need to acquire 20 wooden planks and 24 wooden bars to start crafting our furniture set of one table with four chairs.

## Games

### Minecraft / Industrial Craft 2 (IC²)

Obviously, a very good example of `=gameCalc()` application is the Minecraft game itself. As a matter of fact, I created this calculator playing Minecraft :) I haven't created any more of less full database of Minecraft recipes (that would be a tough task!), yet I already use it. 

Here are few recipes from a highly powerfull Minecraft addon: **Industrial Craft 2**:

![screenshot-docs google com-2020 01 21-09_36_58](https://user-images.githubusercontent.com/114060/72781138-a48d2900-3c31-11ea-94ec-2b34522ce72d.png)

I think the output is self-explanatory so won't go into any details.

### Other games

I don't play that often since I have a job and a family and damn - I'm a big boy! - yet I see cleary WHERE and HOW one could use this calculator. 

Off the top of my head I can recall *Witcher 3* for example. No, no that part were you grind creepers or have sex with Yeniffer. I mean crafing good suites.


## Pros and cons

Evident advantage of this calculator: flexibility and ease-of-use. It allows you to be *focused*: you don't need to list ALL the recipes with their details. Instead you list only those recipes that you really need and skip some obvious ones.

Cons are clear two: it's a manual job. From the other hand, once created a database can be shared. So feel free to create one and share with others.

Ok, I'm tired of writing this README.md, now back to my work.

