export const messageMixin = {
    data() {
        return {
            error_msg: '',
            error: false
        }
    },

    methods: {
        showMessage(msg, time = 3000) {
            this.error_msg = msg
            setTimeout(() => {
                this.error_msg = ''
            }, time)
        },
    }
}