import { Link, StaticQuery, graphql } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import '../css/font-awesome.css';
import 'bootstrap/dist/css/bootstrap.css';
import '../css/style.css';
import SEO from '../components/seo';
import logo from '../images/oneshopper-logo.png';

const Header = ({ siteTitle }) => (
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
        <SEO></SEO>
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
                    <li className="nav-item">
                      <Link className="nav-link" to={category.node.fields.slug}>
                        {category.node.frontmatter.title}
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="header-cart">
                  <Link className="Header__summary snipcart-summary snipcart-checkout" to="#">
                    <i className="fas fa-cart-plus"></i>
                  </Link>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </header>
    )}
  />
);

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
