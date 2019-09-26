const blogs = [
  {
    'likes': 6,
    'title': 'Type wars',
    'url': 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    'author': 'Robert C. Martin',
    'user': {
      'blogs': [
        '5d7a2092988fa380ace68051',
        '5d7a20b1988fa380ace68052',
        '5d7a20bc988fa380ace68053',
        '5d7a20f7988fa380ace68054',
        '5d7a2158988fa380ace68055',
        '5d7a24d3988fa380ace68056',
        '5d7a2528988fa380ace68057',
        '5d7a34f8988fa380ace68058',
        '5d81db9de6e190ec6341e0be',
        '5d81dbcce6e190ec6341e0bf',
        '5d82085554538004836a8aa7'
      ],
      'username': 'anew',
      'name': 'Anne Newmoss',
      'id': '5d68d57b7d0daa69315d1174'
    },
    'id': '5d692386755a238d6ee574a7'
  },
  {
    'likes': 3,
    'title': 'Example blog 7',
    'url': 'http://example.com/blog',
    'author': 'Blog McBlogblog',
    'user': {
      'blogs': [
        '5d6f5e7615856525f045a462',
        '5d6f76e614bde52fda4f4bb6',
        '5d6f808c9b88563335656996',
        '5d6f8128b1303933e00e52cf'
      ],
      'username': 'lubr',
      'name': 'Luce Bree',
      'id': '5d6f5e5d9fa9ec25b2c82fa5'
    },
    'id': '5d6f808c9b88563335656996'
  },
  {
    'likes': 1,
    'title': 'Adding blogs should update the list',
    'url': 'http://localhost:3000/',
    'author': 'Thykkz',
    'user': {
      'blogs': [
        '5d7a2092988fa380ace68051',
        '5d7a20b1988fa380ace68052',
        '5d7a20bc988fa380ace68053',
        '5d7a20f7988fa380ace68054',
        '5d7a2158988fa380ace68055',
        '5d7a24d3988fa380ace68056',
        '5d7a2528988fa380ace68057',
        '5d7a34f8988fa380ace68058',
        '5d81db9de6e190ec6341e0be',
        '5d81dbcce6e190ec6341e0bf',
        '5d82085554538004836a8aa7'
      ],
      'username': 'anew',
      'name': 'Anne Newmoss',
      'id': '5d68d57b7d0daa69315d1174'
    },
    'id': '5d7a20f7988fa380ace68054'
  },
  {
    'likes': 0,
    'title': 'Adding a blog should clear the inputs',
    'url': 'http://localhost:3000/',
    'author': 'Thykkz',
    'user': {
      'blogs': [
        '5d7a2092988fa380ace68051',
        '5d7a20b1988fa380ace68052',
        '5d7a20bc988fa380ace68053',
        '5d7a20f7988fa380ace68054',
        '5d7a2158988fa380ace68055',
        '5d7a24d3988fa380ace68056',
        '5d7a2528988fa380ace68057',
        '5d7a34f8988fa380ace68058',
        '5d81db9de6e190ec6341e0be',
        '5d81dbcce6e190ec6341e0bf',
        '5d82085554538004836a8aa7'
      ],
      'username': 'anew',
      'name': 'Anne Newmoss',
      'id': '5d68d57b7d0daa69315d1174'
    },
    'id': '5d7a2158988fa380ace68055'
  },
  {
    'likes': 0,
    'title': 'Adding a blog should display a notification',
    'url': 'http://localhost:3000/',
    'author': 'Thykkz',
    'user': {
      'blogs': [
        '5d7a2092988fa380ace68051',
        '5d7a20b1988fa380ace68052',
        '5d7a20bc988fa380ace68053',
        '5d7a20f7988fa380ace68054',
        '5d7a2158988fa380ace68055',
        '5d7a24d3988fa380ace68056',
        '5d7a2528988fa380ace68057',
        '5d7a34f8988fa380ace68058',
        '5d81db9de6e190ec6341e0be',
        '5d81dbcce6e190ec6341e0bf',
        '5d82085554538004836a8aa7'
      ],
      'username': 'anew',
      'name': 'Anne Newmoss',
      'id': '5d68d57b7d0daa69315d1174'
    },
    'id': '5d7a24d3988fa380ace68056'
  },
  {
    'likes': 0,
    'title': 'Info -type notification should be green',
    'url': 'http://localhost:3000/',
    'author': 'Thykkz',
    'user': {
      'blogs': [
        '5d7a2092988fa380ace68051',
        '5d7a20b1988fa380ace68052',
        '5d7a20bc988fa380ace68053',
        '5d7a20f7988fa380ace68054',
        '5d7a2158988fa380ace68055',
        '5d7a24d3988fa380ace68056',
        '5d7a2528988fa380ace68057',
        '5d7a34f8988fa380ace68058',
        '5d81db9de6e190ec6341e0be',
        '5d81dbcce6e190ec6341e0bf',
        '5d82085554538004836a8aa7'
      ],
      'username': 'anew',
      'name': 'Anne Newmoss',
      'id': '5d68d57b7d0daa69315d1174'
    },
    'id': '5d7a2528988fa380ace68057'
  },
  {
    'likes': 4,
    'title': 'Everything still works',
    'url': 'http://localhost:3000/',
    'author': 'Thykkz',
    'user': {
      'blogs': [
        '5d7a2092988fa380ace68051',
        '5d7a20b1988fa380ace68052',
        '5d7a20bc988fa380ace68053',
        '5d7a20f7988fa380ace68054',
        '5d7a2158988fa380ace68055',
        '5d7a24d3988fa380ace68056',
        '5d7a2528988fa380ace68057',
        '5d7a34f8988fa380ace68058',
        '5d81db9de6e190ec6341e0be',
        '5d81dbcce6e190ec6341e0bf',
        '5d82085554538004836a8aa7'
      ],
      'username': 'anew',
      'name': 'Anne Newmoss',
      'id': '5d68d57b7d0daa69315d1174'
    },
    'id': '5d7a34f8988fa380ace68058'
  },
  {
    'likes': 2,
    'title': 'Adding a blog should close the new blog form',
    'url': 'http://localhost:3000/',
    'author': 'Thykkz',
    'user': {
      'blogs': [
        '5d7a2092988fa380ace68051',
        '5d7a20b1988fa380ace68052',
        '5d7a20bc988fa380ace68053',
        '5d7a20f7988fa380ace68054',
        '5d7a2158988fa380ace68055',
        '5d7a24d3988fa380ace68056',
        '5d7a2528988fa380ace68057',
        '5d7a34f8988fa380ace68058',
        '5d81db9de6e190ec6341e0be',
        '5d81dbcce6e190ec6341e0bf',
        '5d82085554538004836a8aa7'
      ],
      'username': 'anew',
      'name': 'Anne Newmoss',
      'id': '5d68d57b7d0daa69315d1174'
    },
    'id': '5d81db9de6e190ec6341e0be'
  },
  {
    'likes': 4,
    'title': 'Really long blog titles should not cause the blog controls buttons to wrap to the next line',
    'url': 'http://localhost:3000/',
    'author': 'Thykkz',
    'user': {
      'blogs': [
        '5d7a2092988fa380ace68051',
        '5d7a20b1988fa380ace68052',
        '5d7a20bc988fa380ace68053',
        '5d7a20f7988fa380ace68054',
        '5d7a2158988fa380ace68055',
        '5d7a24d3988fa380ace68056',
        '5d7a2528988fa380ace68057',
        '5d7a34f8988fa380ace68058',
        '5d81db9de6e190ec6341e0be',
        '5d81dbcce6e190ec6341e0bf',
        '5d82085554538004836a8aa7'
      ],
      'username': 'anew',
      'name': 'Anne Newmoss',
      'id': '5d68d57b7d0daa69315d1174'
    },
    'id': '5d82085554538004836a8aa7'
  }
];
export default {
  getAll: () => Promise.resolve(blogs),
  setToken: () => Promise.resolve(),
};
