import React from 'react';
import { navigate } from 'gatsby-link';

import Layout from './../../components/layout';
import SEO from '../../components/seo';

function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&');
}

export default class Index extends React.Component {
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
      }),
    })
      .then(() => navigate(form.getAttribute('action')))
      .catch(error => alert(error));
  };

  render() {
    return (
      <Layout>
        <SEO title="Contact Us" keywords={[`gatsby`, `Contact Us`, `react`]} />
        <div className="Contact-us">
          <div className="container">
            <h1>Contacta con nosotras</h1>
            <form
              name="contact"
              method="post"
              action="/contact/thanks?no-cache=1"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
              onSubmit={this.handleSubmit}
            >
              {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
              <input type="hidden" name="form-name" value="contact" />
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
                    type={'email'}
                    name={'email'}
                    onChange={this.handleChange}
                    id={'email'}
                    required={true}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label" htmlFor={'message'}>
                  Mensaje
                </label>
                <div className="control">
                  <textarea
                    className="textarea"
                    name={'message'}
                    onChange={this.handleChange}
                    id={'message'}
                    required={true}
                  />
                </div>
              </div>
              <div className="field">
                <button className="button is-link" type="submit">
                  Enviar
                </button>
              </div>
            </form>
          </div>
        </div>
      </Layout>
    );
  }
}
