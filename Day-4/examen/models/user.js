const users = [];

module.exports = {
    create(user) {
        users.push(user);
        return user;
    },

    findByEmail(email) {
        return users.find(user => user.email === email);
    },

    findById(id) {
        return users.find(user => user.id === id);
    },

    findAll() {
        return [...users];
    },

    deleteById(id) {
        const index = users.findIndex(user => user.id === id);
        if (index !== -1) {
            users.splice(index, 1);
            return true;
        }
        return false;
    }
};