/* eslint-disable camelcase */
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'gatsby';
import { Item, Button, Loader, Message, Responsive } from 'semantic-ui-react';
import _ from 'lodash';
import CartContext from '../Context/CartContext';

export default ({ removeFromCart }) => {
  const { getCart } = useContext(CartContext);

  if (_.values(getCart()).length === 0)
    return (
      <Message warning>
        <Message.Header>Tu carro está vacio!</Message.Header>
        <p>Necesitas añadir algun producto al carro antes de que puedas proceder al checkout</p>
      </Message>
    );
  const mapCartItemsToItems = items =>
    items.map(({ id, title, description, quantity, price, images }) => {
      //const price = meta.display_price.with_tax.unit.formatted || '';
      //const imageUrl = images[0].image.childImageSharp.fluid.src || '/static/moltin-light-hex.svg';
      const imageUrl = '/static/moltin-light-hex.svg';

      const DesktopItemImage = () => (
        <Item.Image src={imageUrl} alt={title} size="small" style={{ background: '#f2f2f2' }} />
      );
      const MobileItemImage = () => (
        <Item.Image src={imageUrl} alt={title} size="small" style={{ background: 'none' }} />
      );

      return {
        childKey: id,
        header: (
          <Item.Header>
            <Link to={`/product/${id}/`}>{title}</Link>
          </Item.Header>
        ),
        image: (
          <React.Fragment>
            <Responsive as={MobileItemImage} {...Responsive.onlyMobile} />
            <Responsive as={DesktopItemImage} minWidth={Responsive.onlyTablet.minWidth} />
          </React.Fragment>
        ),
        meta: `${quantity}x ${price}`,
        description,
        extra: <Button basic icon="remove" floated="right" onClick={() => removeFromCart(id)} />,
      };
    });
  return <Item.Group divided items={mapCartItemsToItems(_.values(getCart()))} />;
};
