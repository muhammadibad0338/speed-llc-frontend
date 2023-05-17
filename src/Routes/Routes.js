import React from "react";
//import { Switch, Route, withRouter } from "react-router-dom";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Navigate
} from "react-router-dom";
//import { withRouter } from "react-router";

import { withRouter } from "./WithRouter";
import { ProtectedRoute } from "./ProtectedRoute";
import { PublicRoute } from "./PublicRoute";


import Home from '../Screen/Home/Home'
import Signup from "../Screen/Signup/Signup";
import Login from "../Screen/Login/Login"
import Product from "../Screen/Product/Product";
import Cart from "../Screen/Cart/Cart";
import Checkout from "../Screen/Checkout/Checkout";
import PageNotFound from "../Screen/NotFound/PageNotFound";
import Terms from "../Screen/TermsandCondition/Terms";
import Privacy from "../Screen/Privacy/Privacy";
import Contact from "../Screen/Contact/Contact";



const authRoutesArr = [
  {
    path: "/checkout",
    Component: Checkout,
    hideDrawer: true
  },
  // {
  //   path: "/my-orders",
  //   Component: PreviousOrder,
  //   hideDrawer: true,
  // },
  // {
  //   path: "/my-orders/:id",
  //   Component: Order,
  //   hideDrawer: true,

  // },
  {
    path: "/signup",
    Component: Signup,
    hideDrawer: true,
    hideFooter: true
  },
  {
    path: "/login",
    Component: Login,
    hideDrawer: true,
    hideFooter: true
  },
  {
    path: "/",
    Component: Home,
    hideDrawer: false
  },
];


const routesArr = [
  {
    path: "/terms-and-conditions",
    Component: Terms,
    hideDrawer: true,
  },
  {
    path: "/privacy-policy",
    Component: Privacy,
    hideDrawer: true
  },
  {
    path: "/contact",
    Component: Contact,
    hideDrawer: true
  },
  {
    path: "/product/:id",
    Component: Product,
    hideDrawer: true
  },
  {
    path: "/cart",
    Component: Cart,
    hideDrawer: true
  },
]



const routes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="*" element={<PageNotFound />} />
      {
        routesArr.map((publicRoute) => {
          return (
            <Route
              key={publicRoute.path}
              path={publicRoute.path}
              element={<PublicRoute component={publicRoute.Component} hideDrawer={publicRoute.hideDrawer} hideFooter={publicRoute?.hideFooter} />}
            />
          )
        })
      }
      {authRoutesArr.map((route) => {
        return (
          <Route
            key={route.path}
            //exact={route.exact}
            path={route.path}
            element={<ProtectedRoute component={route.Component} hideDrawer={route.hideDrawer} hideFooter={route?.hideFooter} />}
          //render={(props) => <route.component {...props} />}
          />
        );
      })}
    </Routes>
  )
};

export default withRouter(routes);
//export default routes;