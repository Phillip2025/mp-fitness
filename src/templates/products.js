import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/layout'

const ProductPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark

  return (
    <Layout>
      <div className="content">
    
    <h2
      className="has-text-weight-bold is-size-1"
      style={{
        boxShadow: '0.5rem 0 0 #f40, -0.5rem 0 0 #f40',
        backgroundColor: '#f40',
        color: 'white',
        padding: '1rem',
      }}
    >
      {frontmatter.title}
    </h2>
  <section className="section section--gradient">
    <div className="container">
      <div className="section">
        <div className="columns">
          <div className="column is-7 is-offset-1">
            <h3 className="has-text-weight-semibold is-size-2">{frontmatter.description}</h3>
            <p>{frontmatter.price}</p>
            <p>{frontmatter.quantity}</p>
            <p>{frontmatter.category}</p>
            {frontmatter.images.map(image => (
              <img src={image.image.childImageSharp.fluid.src} />
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
</div>
    </Layout>
  )
}

ProductPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default ProductPage

export const productPageQuery = graphql`
  query ProductsPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
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
`
