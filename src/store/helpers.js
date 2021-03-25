import { mapGetters } from 'vuex'

export const authComputed = {
    ...mapGetters({
        loggedIn: 'user/loggedIn',
        isAdmin: 'user/isAdmin'
    })
}