/* eslint-disable camelcase */
import React, { useState, useContext } from 'react';
import _ from 'lodash';
import { Divider, Segment, Button, Modal } from 'semantic-ui-react';

import SEO from '../../components/seo';
import CartItemList from '../../components/CartItemList';
import Layout from '../../components/layout';
import CartContext from '../../components/Context/CartContext';
import CartForm from '../../components/cartForm';

const Cart = ({ location }) => {
  const { getCart, removeFromCart, clearCart } = useContext(CartContext);
  const [open, setOpen] = React.useState(false);

  const calculatePrice = () => {
    let price = 0;
    _.each(getCart(), item => (price += item.price * item.quantity));
    return price;
  };

  return (
    <Layout location={location}>
      <SEO title="Cart" />
      <CartItemList removeFromCart={item => removeFromCart(item)} />

      <div>
        <Divider />
        <Segment clearing size="large">
          <span>
            <strong>Subtotal:</strong>
            {`${calculatePrice()}`} €
          </span>
          <Button color="black" floated="right" onClick={() => setOpen(true)}>
            Check out
          </Button>
        </Segment>

        <Modal onClose={() => setOpen(false)} onOpen={() => setOpen(true)} open={open}>
          <Modal.Header>Rellena tus datos de envio</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <p>
                De momento solo admitimos el pago <b>por transferencia</b>
              </p>
              <p>
                Una vez rellenes el formulario y comprobemos disponibilidades de los productos, nos pondremos en
                contacto contigo para la información del pago a la mayor brevedad posible
              </p>
              <CartForm
                cart={_.values(getCart()).map(i => ({ title: i.title, quantity: i.quantity, price: i.price }))}
                afterSubmit={() => clearCart()}
              />
              <Button color="black" onClick={() => setOpen(false)}>
                Cancelar
              </Button>
            </Modal.Description>
          </Modal.Content>
        </Modal>
      </div>
    </Layout>
  );
};

export default Cart;
