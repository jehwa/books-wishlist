module.exports = {
    booksList: [
        {id: 'one', title: 'book one', author: 'author one', genre:'comedy one', description: 'description one'},
        {id: 'two', title: 'book two', author: 'author two', genre:'comedy two', description: 'description two'},
        {id: 'three', title: 'book three', author: 'author three', genre:'comedy three', description: 'description three'}
    ],
    initialMockData: {
        books: {
            'one': {id: 'one', title: 'book one', author: 'author one', genre:'comedy one', description: 'description one'},
            'two': {id: 'two', title: 'book two', author: 'author two', genre:'comedy two', description: 'description two'},
            'three': {id: 'three', title: 'book three', author: 'author three', genre:'comedy three', description: 'description three'}
        },
        columns: {
            'column-1': {
                id: 'column-1',
                title: 'Book List',
                bookIds: ['one', 'two', 'three']
            },
            'column-2': {
                id: 'column-2',
                title: 'Wish List',
                bookIds: []
            }
        },
        columnOrder: ['column-1', 'column-2']
    },
    oneBookinWishList: {
        books: {
            'one': {id: 'one', title: 'book one', author: 'author one', genre:'comedy one', description: 'description one'},
            'two': {id: 'two', title: 'book two', author: 'author two', genre:'comedy two', description: 'description two'},
            'three': {id: 'three', title: 'book three', author: 'author three', genre:'comedy three', description: 'description three'}
        },
        columns: {
            'column-1': {
                id: 'column-1',
                title: 'Book List',
                bookIds: ['one', 'two']
            },
            'column-2': {
                id: 'column-2',
                title: 'Wish List',
                bookIds: ['three']
            }
        },
        columnOrder: ['column-1', 'column-2']
    }
}