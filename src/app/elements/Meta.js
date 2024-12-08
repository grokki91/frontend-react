import React from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";

const Meta = () => {
  return (
    <HelmetProvider>
      <Helmet>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
      </Helmet>
    </HelmetProvider>
  );
};

export default Meta;
