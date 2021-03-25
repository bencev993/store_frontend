export const messageMixin = {
    data() {
        return {
            error_msg: '',
            error: false
        }
    },

    methods: {
        showMessage(msg) {
            this.error_msg = msg
            setTimeout(() => {
                this.error_msg = ''
            }, 3000)
        },
    }
}