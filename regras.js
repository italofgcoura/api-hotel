//verificação se quarto está ou não  ocupado

module.exports = {
    getAdmin(result) {
        console.log(result)
        result.forEach((element) => {
            if (element.ADMIN == 1) {
                element.ADMIN = "Admin"
            }
            else {
                element.ADMIN = "Usuário"
            }
        });
        return result;
    }
}