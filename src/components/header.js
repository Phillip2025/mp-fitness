import { Link, StaticQuery, graphql, withPrefix } from 'gatsby';
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import '../css/font-awesome.css';
import 'bootstrap/dist/css/bootstrap.css';
import '../css/style.css';
import SEO from '../components/seo';
import logo from '../images/oneshopper-logo.png';
import CartContext from './Context/CartContext';
import { Menu, Container, Icon } from 'semantic-ui-react';
import _ from 'lodash';

const Header = ({ siteTitle }) => {
  const { count } = useContext(CartContext);
  //const [activeItem, setActiveItem] = useState(pathname);

  return (
    <StaticQuery
      query={graphql`
        query HeaderQuery {
          allMarkdownRemark(
            sort: { order: ASC, fields: [frontmatter___title] }
            filter: { frontmatter: { templateKey: { eq: "categories" } } }
          ) {
            edges {
              node {
                id
                fields {
                  slug
                }
                frontmatter {
                  title
                }
              }
            }
          }
        }
      `}
      render={data => (
        <header className="site-header">
          {/* <SEO></SEO> */}
          <div className="container">
            <div className="row">
              <div className="col-sm-12 col-md-4 align-self-center">
                <Link className="header-logo" to="/">
                  <img src={logo} alt="logo"></img>
                </Link>
              </div>
              <div className="col-sm-12 col-md-8 align-self-center">
                <nav>
                  <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                      <Link className="nav-link" to="/">
                        Inicio
                      </Link>
                    </li>
                    {data.allMarkdownRemark.edges.map(category => (
                      <li className="nav-item" key={category.node.id}>
                        <Link className="nav-link" to={category.node.fields.slug}>
                          {category.node.frontmatter.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <div className="header-cart">
                    {/* <Menu.Item as={Link} to="/cart/" active={activeItem === withPrefix('/cart/')}> */}
                    <Menu.Item as={Link} to="/cart/">
                      <div>
                        <Icon name="cart" />
                        Cart
                        {count > 9 ? (
                          <span style={{ fontSize: 'smaller' }}>
                            9<sup>+</sup>
                          </span>
                        ) : (
                          `(${count})`
                        )}
                      </div>
                    </Menu.Item>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </header>
      )}
    />
  );
};

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
