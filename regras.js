//verificação se quarto está ou não  ocupado

module.exports = {
    checkIfAdmin(usersList) {
        usersList.forEach((user) => {
            if (user.ADMIN == 1) {
                user.ADMIN = "Admin"
            }
            else {
                user.ADMIN = "Usuário"
            }
        });
        return usersList;
    }
}