export const path = {
  HOME: "/",
  PRODUCT: "/product/*",
  USER: "/user/*",
  LOGIN: "/login",
  REGISTER: "/register",
  NOT_FOUND: "/not-found",
  FORGOT_PASSWORD: "/forgot-password",
  CHANGE_PASSWORD: "/change-password/:userEmail",

  ADMIN: "/admin/*",
  OVERVIEW_ADMIN: "",
  PRODUCT_ADMIN: "product",
  PRODUCT_TYPE_ADMIN: "product-type",
  PRODUCT_BRAND_ADMIN: "product-brand",
  PRODUCT_SIZE_ADMIN: "product-size",
  PRODUCT_PRODUCTSIZE_ADMIN: "productsize",
  ORDER_DETAIL: "/:orderStatus/:orderId",
  ORDER_ADMIN: "order",
  ORDER_WAITING_ADMIN: "order-waiting",
  ORDER_DELIVERY_ADMIN: "order-delivery",
  ORDER_DONE_ADMIN: "order-done",
  ORDER_CANCELED_ADMIN: "order-canceled",
  USER_ADMIN: "user",
  VOUCHER_ADMIN: "voucher",
  REVENUE_ADMIN: "revenue",
  POST_ADMIN: "create",
  PUT_ADMIN: "edit",
};

export const LIMIT = 10;
export const LIMIT_SEARCH = 12;
export const LIMIT_PRODUCT = 6;
export const LIMIT_ORDER = 5;

export const regex = {
  // eslint-disable-next-line no-useless-escape
  USERNAME: /^[^\d!@#$%^&*()_+{}\[\]:;<>,.?/~\\-]+$/,
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^\d{10,}$/,
  PRICE: /^\d{1,3}(?:\.\d{3})*$/,
  DISCOUNT: /^(?:100|[0-9]|[1-9][0-9])$/,
  QUANTITY: /^[0-9]+$/,
};

export const sortBy = [
  {
    id: `["id", "DESC"]`,
    value: "Mặc định",
  },
  {
    id: `["id", "ASC"]`,
    value: "A → Z",
  },
  {
    id: `["name", "DESC"]`,
    value: "Z → A",
  },
  {
    id: `["price", "ASC"]`,
    value: "Giá tăng dần",
  },
  {
    id: `["price", "DESC"]`,
    value: "Giá giảm dần",
  },
];

export const searchPopular = [
  {
    id: "1",
    value: "Vợt cầu lông",
  },
  {
    id: "2",
    value: "Giày cầu lông",
  },
  {
    id: "3",
    value: "Áo cầu lông",
  },
];
