/* eslint-disable camelcase */
import React, { useState, useContext } from 'react';
import { navigate } from 'gatsby-link';
import _ from 'lodash';
import { Divider, Segment, Button, Modal } from 'semantic-ui-react';

import SEO from '../components/seo';
import CartItemList from '../components/CartItemList';
import Layout from '../components/layout';
import CartContext from '../components/Context/CartContext';

function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&');
}
const Cart = ({ location }) => {
  const { getCart, removeFromCart } = useContext(CartContext);
  const [open, setOpen] = React.useState(false);
  const [botField, setBotField] = useState();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [address, setAddress] = useState();
  const [additional, setAdditional] = useState();
  const [zipCode, setZipCode] = useState();
  const [city, setCity] = useState();
  const [province, setProvince] = useState();

  const calculatePrice = () => {
    let price = 0;
    _.each(getCart(), item => (price += item.price * item.quantity));
    return price;
  };

  const handleRemoveFromCart = itemId => {
    removeFromCart(itemId);
  };

  const handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const form = e.target;
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': form.getAttribute('name'),
        botField,
        cart: JSON.stringify(getCart()),
        name,
        email,
        address,
        additional,
        zipCode,
        city,
        province,
      }),
    })
      .then(() => {
        console.log('onthen');
        navigate(form.getAttribute('action'));
      })
      .catch(error => alert(error));
  };

  return (
    <Layout location={location}>
      <SEO title="Cart" />
      <CartItemList removeFromCart={item => handleRemoveFromCart(item)} />

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
              <form
                name="shop"
                method="post"
                action="/completed?no-cache=1"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                onSubmit={handleSubmit}
              >
                {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
                <input type="hidden" name="form-name" value="shop" />
                <div hidden>
                  <label>
                    Don’t fill this out: <input name="bot-field" onChange={e => setBotField(e.target.value)} />
                  </label>
                </div>
                <div className="field">
                  <label className="label" htmlFor={'name'}>
                    Nombre
                  </label>
                  <div className="control">
                    <input
                      className="input"
                      style={{ width: '100%', marginBottom: '15px' }}
                      type={'text'}
                      name={'name'}
                      onChange={e => setName(e.target.value)}
                      id={'name'}
                      required={true}
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label" htmlFor={'email'}>
                    Email
                  </label>
                  <div className="control">
                    <input
                      className="input"
                      style={{ width: '100%', marginBottom: '15px' }}
                      type={'email'}
                      name={'email'}
                      onChange={e => setEmail(e.target.value)}
                      id={'email'}
                      required={true}
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label" htmlFor={'adress'}>
                    Dirección (Calle / Plaza / Avenida / Etc)
                  </label>
                  <div className="control">
                    <input
                      className="input"
                      style={{ width: '100%', marginBottom: '15px' }}
                      type={'text'}
                      name={'address'}
                      onChange={e => setAddress(e.target.value)}
                      id={'address'}
                      required={true}
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label" htmlFor={'additional'}>
                    Información adicional (Numero, Portal, Piso, Puerta, Etc)
                  </label>
                  <div className="control">
                    <input
                      className="input"
                      style={{ width: '100%', marginBottom: '15px' }}
                      type={'text'}
                      name={'additional'}
                      onChange={e => setAdditional(e.target.value)}
                      id={'additional'}
                      required={true}
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label" htmlFor={'zipCode'}>
                    Código postal
                  </label>
                  <div className="control">
                    <input
                      className="input"
                      style={{ width: '100%', marginBottom: '15px' }}
                      type={'text'}
                      name={'zipCode'}
                      onChange={e => setZipCode(e.target.value)}
                      id={'zipCode'}
                      required={true}
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label" htmlFor={'city'}>
                    Localidad
                  </label>
                  <div className="control">
                    <input
                      className="input"
                      style={{ width: '100%', marginBottom: '15px' }}
                      type={'text'}
                      name={'city'}
                      onChange={e => setCity(e.target.value)}
                      id={'city'}
                      required={true}
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label" htmlFor={'province'}>
                    Provincia
                  </label>
                  <div className="control">
                    <input
                      className="input"
                      style={{ width: '100%', marginBottom: '15px' }}
                      type={'text'}
                      name={'province'}
                      onChange={e => setProvince(e.target.value)}
                      id={'province'}
                      required={true}
                    />
                  </div>
                </div>
                {/* <div className="field">
                <button className="button is-link" type="submit">
                  Enviar
                </button>
              </div> */}
                <Button color="black" onClick={() => setOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit" content="Enviar" labelPosition="right" icon="checkmark" positive />
              </form>
            </Modal.Description>
          </Modal.Content>
        </Modal>
      </div>
    </Layout>
  );
};

export default Cart;
