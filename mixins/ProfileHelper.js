export default {
    methods: {
        monthCollection() {
            var collection = [] 
            for(var i = 1; i <= 12; i++) {
                collection.push(i)
            }
            return collection
        },
        dayCollection() {
            var collection = [] 
            for(var i = 1; i <= 31; i++) {
                collection.push(i)
            }
            return collection
        },
        yearCollection() {
            var collection = [] 
            for(var i = 1900; i <= new Date().getFullYear(); i++) {
                collection.push(i)
            }
            return collection.reverse()
        }
    }
}
