export const productMixin = {
    computed: {
        imgUrl() {
            return 'http://127.0.0.1:8000/images/'
        },
        inStock() {
            return this.product.stock > 0
        },
    },

    methods: {
        productImage(product, number = 0) {
            return product.images[number] 
            ? this.imgUrl + product.images[number].image
            : 'https://via.placeholder.com/400'
        },
    }
}