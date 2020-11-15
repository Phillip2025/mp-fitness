import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'

export const CategoryPageTemplate = ({
  title,
  description,
  items,
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
              <p>Products</p>
              {items && items.map(i => (
                <p>{i.node.frontmatter.title} - {i.node.frontmatter.price}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
)

CategoryPageTemplate.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
}

const CategoryPage = ({ data }) => (
    <Layout>
      <CategoryPageTemplate
        title={data.category.frontmatter.title}
        description={data.category.frontmatter.description}
        items={data.items.edges}
      />
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
          frontmatter {
            title
            price
          }
        }
      }
    }
  }
`
