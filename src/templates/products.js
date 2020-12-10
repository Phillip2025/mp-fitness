import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import AddToCart from '../components/AddToCart';

import Layout from '../components/layout';
import SEO from '../components/seo';

const ProductPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <Layout>
      <SEO title={frontmatter.title} keywords={[`gatsby`, `application`, `react`]} />
      <div className="container details-page">
        <div className="product-details">
          <div className="Product-Screenshot">
            {frontmatter.images === null ? (
              <div className="no-image">No Image</div>
            ) : (
              <Tabs>
                <TabPanel>
                  <Tab>
                    <img src={frontmatter.images[0].image.childImageSharp.fluid.src} alt="main image" />
                  </Tab>
                </TabPanel>
                <TabList>
                  {frontmatter.images.map((items, idx) => (
                    <Tab key={idx}>
                      <img src={items.image.childImageSharp.fluid.src} alt={idx} />
                    </Tab>
                  ))}
                </TabList>
              </Tabs>
            )}
          </div>
          <div>
            <h2>{frontmatter.title}</h2>
          </div>
          <div className="row buynowinner">
            <div className="col-sm-3">
              <span className="price">Precio: {frontmatter.price}€</span>
            </div>
            <div className="col-sm-9 text-left">
              <a
                href="#"
                className="Product snipcart-add-item"
                // data-item-id={data.data.contentfulProduct.slug}
                // data-item-price={data.data.contentfulProduct.price}
                // data-item-image={data.data.contentfulProduct.image === null ? "" : data.data.contentfulProduct.image.fixed.src}
                // data-item-name={data.data.contentfulProduct.name}
                // data-item-url={`/`}
              >
                <i className="fas fa-tags" />
                Comprar
              </a>
              <AddToCart item={{ ...frontmatter, id: data.markdownRemark.id }} />
            </div>
          </div>
          <div>{frontmatter.description}</div>
        </div>
      </div>
    </Layout>
  );
};

ProductPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      id: PropTypes.string,
      frontmatter: PropTypes.object,
    }),
  }),
};

export default ProductPage;

export const productPageQuery = graphql`
  query ProductsPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      frontmatter {
        title
        description
        images {
          image {
            childImageSharp {
              fluid(maxWidth: 256, quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
        price
        quantity
        category
      }
    }
  }
`;
