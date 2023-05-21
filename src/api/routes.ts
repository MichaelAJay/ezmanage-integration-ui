export const API_ROUTES = {
  /**
   * USER routes
   */
  login: () => "/users/login",

  /**
   * ORDER routes
   */
  getOrders: () => "/orders",
  getOrder: (orderId: string) => `/orders/${orderId}`,
};
