



class UserData {
    constructor(db_data) {
        this.db_data = db_data;
    }
    set() {
        return {
            ...this.db_data
        }
    }

}

module.exports = UserData;





