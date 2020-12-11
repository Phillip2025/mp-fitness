import React from 'react';
import { navigate } from 'gatsby-link';
import { Button } from 'semantic-ui-react';

function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&');
}

export default class CartForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isValidated: false };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const form = e.target;
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': form.getAttribute('name'),
        ...this.state,
        cart: JSON.stringify(this.props.cart),
      }),
    })
      .then(() => {
        this.props.afterSubmit();
        navigate(form.getAttribute('action'));
      })
      .catch(error => alert(error));
  };

  render() {
    return (
      <form
        name="shop"
        method="post"
        action="/cart/completed?no-cache=1"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        onSubmit={this.handleSubmit}
      >
        {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
        <input type="hidden" name="form-name" value="shop" />
        <div hidden>
          <label>
            Don’t fill this out: <input name="bot-field" onChange={this.handleChange} />
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
              onChange={this.handleChange}
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
              onChange={this.handleChange}
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
              onChange={this.handleChange}
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
              onChange={this.handleChange}
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
              onChange={this.handleChange}
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
              onChange={this.handleChange}
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
              onChange={this.handleChange}
              id={'province'}
              required={true}
            />
          </div>
        </div>
        <Button type="submit" content="Enviar" labelPosition="right" icon="checkmark" positive />
      </form>
    );
  }
}
