export const messageMixin = {
    data() {
        return {
            msg_heading: '',
            msg_content: '',
            error: false,
        }
    },

    methods: {

        async showMessage(msg_heading, msg_content = null, time = 3000) {
            this.msg_heading = msg_heading
            this.msg_content = msg_content
            setTimeout(() => {
                this.msg_heading = ''
                this.msg_content = ''
            }, time)
            return
        },
    }
}