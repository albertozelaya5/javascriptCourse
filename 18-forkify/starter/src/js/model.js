export const state = {
  recipe: {},
};

export const loadRecipe = async function (id) {
  try {
    const res = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
    ); //* El metodo json esta disponible en TODOS los objetos response, y esta promesa es uno de ellos
    const data = await res.json(); //*Que retorna OTRA promesa, que tenemos que esperar con await

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    console.log(res, data);
    const { recipe } = data.data;
    state.recipe = {
      if: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
    console.log(state.recipe);
  } catch (error) {
    alert(error);
  }
};
