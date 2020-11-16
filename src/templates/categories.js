import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'

import Img from "gatsby-image"
import Layout from "../components/layout"
import SEO from "../components/seo"

const CategoryPage = ({ data }) => (
  <Layout>
    <SEO title="Store" keywords={[`gatsby`, `store`, `react`]} />
    <div className="container store-page">
    <h2>{data.category.frontmatter.title}</h2>
        <p>{data.category.frontmatter.description}</p>
    <div className="row product-main">
          {data.items.edges.map(product => (
            <div className="Catalogue__item col-sm-12 col-md-6 col-lg-4" key={product.node.id}>
              <div className="details_List">
                {product.node.frontmatter.images === null ? <div className="no-image">No Image</div> : <img src={product.node.frontmatter.images[0].image.childImageSharp.fluid.src} />}

                <div className="details_inner">
                  <h2>
                    <Link to={product.node.fields.slug}>{product.node.frontmatter.title}</Link>
                  </h2>
                  <p>{product.node.frontmatter.description.excerpt}</p>
                  <div className="row">
                    <div className="col-sm-4 align-self-center">
                      <span className="price">{product.node.frontmatter.price}€</span>
                    </div>
                    <div className="col-sm-8 text-right align-self-center">
                      <a
                        href="#"
                        className="Product snipcart-add-item"
                        // data-item-id={items.node.slug}
                        // data-item-price={items.node.price}
                        // data-item-image={items.node.image === null ? "" : items.node.image.fixed.src}
                        // data-item-name={items.node.name}
                        // data-item-url={`/`}
                      >
                        <i className="fas fa-shopping-bag" />Añadir al carro
                    </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
    </div>
  </Layout>
);

export default CategoryPage

export const categoryPageQuery = graphql`
  query CategoryPage($id: String!, $title: String!) {
    category: markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        description
      }
    }
    items: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___title] }
      filter: { frontmatter: { category: { eq: $title } } }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            description
            price
            images {
              image {
                childImageSharp {
                  fluid(maxWidth: 256, quality: 100) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`
