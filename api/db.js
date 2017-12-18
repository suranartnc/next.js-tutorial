var faker = require('faker')

function nlToBr(str) {
  return str.replace(/(?:\r\n|\r|\n)/g, '<br />')
}

function generatePosts(limit) {
  var posts = []

  for (var i = 0; i < limit; ++i) {
    var title = faker.lorem.sentence()

    posts.push({
      id: i + 1,
      title: title,
      excerpt: nlToBr(faker.lorem.paragraphs(2)),
      body: nlToBr(faker.lorem.paragraphs(10)),
      author: {
        name: faker.name.firstName() + ' ' + faker.name.lastName(),
        avatar: faker.image.avatar()
      },
      tags: title.replace('.', '').split(' '),
      pubDate: (function() {
        return new Date(faker.date.recent(7)).getTime()
      })()
    })
  }

  return posts
}

function generateData() {
  return {
    posts: generatePosts(20)
  }
}

module.exports = generateData
