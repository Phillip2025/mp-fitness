/* eslint-disable camelcase */
import React from 'react';
import { Message } from 'semantic-ui-react';

import SEO from '../../components/seo';
import Layout from '../../components/layout';

const Cart = ({ location }) => {
  return (
    <Layout location={location}>
      <SEO title="Cart" />
      <Message success>
        <Message.Header>Datos enviados!</Message.Header>
        <p>
          Enhorabuena, tu pedido ha sido registrado. En breves nos pondremos en contacto contigo en la dirección
          proporcionada para proceder al pago
        </p>
        <p>Muchas gracias por confiar en nosotras!</p>
      </Message>
    </Layout>
  );
};

export default Cart;
