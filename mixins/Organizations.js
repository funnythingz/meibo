import { db } from '~/plugins/firestore.js'

export default {
    methods: {
        //TODO: 組織名一覧をmixins化したいところ
        async organizations() {
            return await db.collection('organizations').get()
        }
    }
}
