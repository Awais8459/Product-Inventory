const allcategories = {
    fruit: [],
    vegetable: [],
    admin: ['getUsers', 'manageUsers'],
  };
  
  const category = Object.keys(allcategories);
  const categoryRights = new Map(Object.entries(allcategories));
  
  module.exports = {
    category,
    categoryRights,
  };
  