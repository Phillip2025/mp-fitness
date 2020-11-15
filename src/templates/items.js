import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'

export const ItemPageTemplate = ({
  title,
  description,
  images,
  price,
  quantity,
  category,
}) => (
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
        {title}
      </h2>
    <section className="section section--gradient">
      <div className="container">
        <div className="section">
          <div className="columns">
            <div className="column is-7 is-offset-1">
              <h3 className="has-text-weight-semibold is-size-2">{description}</h3>
              <p>{price}</p>
              <p>{quantity}</p>
              <p>{category}</p>
              {images.map(image => (
                <img src={image.image} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
)

ItemPageTemplate.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  images: PropTypes.array,
  price: PropTypes.number,
  quantity: PropTypes.number,
  category: PropTypes.string,
}

const ItemPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark

  return (
    <Layout>
      <ItemPageTemplate
        title={frontmatter.title}
        description={frontmatter.description}
        images={frontmatter.images}
        price={frontmatter.price}
        quantity={frontmatter.quantity}
        category={frontmatter.category}
      />
    </Layout>
  )
}

ItemPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default ItemPage

export const itemPageQuery = graphql`
  query ItemsPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        description
        images {
          image
        }
        price
        quantity
        category
      }
    }
  }
`
