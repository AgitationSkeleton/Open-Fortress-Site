exports.createPages = async ({ actions, graphql, reporter }) => {
  const result = await graphql(`
    query {
      allMdx {
        nodes {
          frontmatter {
            slug
          }
        }
      }
    }
  `);

    if (result.errors) {
      reporter.panic('failed to create posts', result.errors);
    }

    const posts = result.data.allMdx.nodes;

    for (const post of posts) {
      actions.createPage({
        path: 'blog/' + post.frontmatter.slug,
        component: `${__dirname}/src/templates/post.js`,
        context: {
          slug: post.frontmatter.slug
        }
      })
    }
}