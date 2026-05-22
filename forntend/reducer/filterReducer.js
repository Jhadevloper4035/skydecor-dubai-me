export const initialState = {
  price: [0, 450],

  availability: "All",

  color: "All",
  size: "All",
  productType: "All",
  category: "All",
  subCategory: "All",
  texture: "All",
  thickness: "All",
  width: "All",
  activeFilterOnSale: false,
  brands: [],
  filtered: [],
  sortingOption: "Sort by (Default)",
  sorted: [],
  currentPage: 1,
  itemPerPage: 25,
};

export function reducer(state, action) {
  switch (action.type) {
    case "SET_PRICE":
      return { ...state, price: action.payload };

    case "SET_COLOR":
      return { ...state, color: action.payload };
    case "SET_SIZE":
      return { ...state, size: action.payload };
    case "SET_PRODUCT_TYPE":
      return { ...state, productType: action.payload };
    case "SET_CATEGORY":
      return { ...state, category: action.payload };
    case "SET_SUB_CATEGORY":
      return { ...state, subCategory: action.payload };
    case "SET_TEXTURE":
      return { ...state, texture: action.payload };
    case "SET_THICKNESS":
      return { ...state, thickness: action.payload };
    case "SET_WIDTH":
      return { ...state, width: action.payload };
    case "SET_AVAILABILITY":
      return { ...state, availability: action.payload };
    case "SET_BRANDS":
      return { ...state, brands: action.payload };
    case "SET_FILTERED":
      return { ...state, filtered: [...action.payload] };
    case "SET_SORTING_OPTION":
      return { ...state, sortingOption: action.payload };
    case "SET_SORTED":
      return { ...state, sorted: [...action.payload] };
    case "SET_CURRENT_PAGE":
      return { ...state, currentPage: action.payload };
    case "TOGGLE_FILTER_ON_SALE":
      return { ...state, activeFilterOnSale: !state.activeFilterOnSale };
    case "SET_ITEM_PER_PAGE":
      return { ...state, itemPerPage: action.payload };
    case "CLEAR_FILTER":
      return {
        ...state,
        price: [0, 450],

        availability: "All",

        color: "All",
        size: "All",
        productType: "All",
        category: "All",
        subCategory: "All",
        texture: "All",
        thickness: "All",
        width: "All",

        brands: [],
        activeFilterOnSale: false,
      };
    default:
      return state;
  }
}
